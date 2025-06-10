# botica-bot-telegram-frontend

A Telegram bot frontend for your Botica bots.
This bot allows other bots to send information, ask for input, or request confirmation from human
users via Telegram.

## Setup

- This bot requires the `TELEGRAM_BOT_TOKEN` environment variable to function. Create a bot using
  the `@BotFather` bot in Telegram and get your token from there.

- If you want to persist subscribed users between runs, you must link the `/app/.telegram-bot-data`
  directory to your host machine.

Example configuration section to integrate this bot into a Botica environment:

```yml
  telegram:
    image: "botica-bot-telegram-frontend"
    mount:
      - source: ".telegram-bot-data"
        target: "/app/.telegram-bot-data"
        createHostPath: true
    subscribe:
      - key: "telegram_bot"
    environment:
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
```

## Available orders for your bots

### send_message

Sends a text message to all subscribed Telegram users.

#### Properties

| Property    | Type     | Required? | Description                                                                                                 |
|:------------|:---------|:----------|:------------------------------------------------------------------------------------------------------------|
| `content`   | `string` | Yes       | The text content of the message to be sent.                                                                 |
| `recipient` | `string` | No        | Defines the target audience. Currently, only `broadcast` is supported, which sends to all subscribed users. |

#### Usage Example

```ts
await bot.publishOrder(
    "telegram_bot",
    "send_message",
    {
      content: "Hi there! This is a broadcast message from another bot."
    },
);
```

### send_document

Sends a document or a photo to all subscribed Telegram users from a local path or a URL.

#### Properties

| Property    | Type                        | Required?   | Description                                                                                                |
|:------------|:----------------------------|:------------|:-----------------------------------------------------------------------------------------------------------|
| `caption`   | `string`                    | No          | The caption to include with the file.                                                                      |
| `type`      | `"document"` \| `"picture"` | No          | Specifies whether to send the file as a generic document or as a photo. **Defaults to `document`**.        |
| `localPath` | `string`                    | Conditional | The absolute path to the file on the bot's local filesystem. You must provide either `localPath` or `url`. |
| `url`       | `string`                    | Conditional | A public URL pointing to the file. You must provide either `localPath` or `url`.                           |
| `recipient` | `string`                    | No          | Defines the target audience. Currently, only `broadcast` is supported.                                     |

#### Usage Examples

**Sending a local PDF file:**

```ts
await bot.publishOrder(
    "telegram_bot",
    "send_document",
    {
      localPath: "/app/reports/report-Q2.pdf", // Path must be accessible by the bot container
      caption: "Here is the latest report.",
    },
);
```

**Sending a picture from a URL:**

```ts
await bot.publishOrder(
    "telegram_bot",
    "send_document",
    {
      url: "https://www.nasa.gov/sites/default/files/thumbnails/image/j2m-shareable.jpg",
      type: "picture",
      caption: "Check out this cool picture from NASA!",
    },
);
```
