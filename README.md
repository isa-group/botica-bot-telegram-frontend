# botica-bot-telegram-frontend

A Telegram bot frontend for your Botica bots. 
This bot allows other bots to send information, ask for input, or request confirmation from human 
users via Telegram.

## Setup

- This bot requires the `TELEGRAM_BOT_TOKEN` environment variable to function. Create a bot using the
`@BotFather` bot in Telegram and get your token from there.

- If you want to persist subscribed users between runs, you must link the `/app/.telegram-bot-data`
directory to your host machine.

Example configuration section to integrate this bot into a Botica environment:

```yml
  telegram:
    image: "botica-bot-telegram-frontend"
    lifecycle:
      type: reactive
    mount:
      - source: ".telegram-bot-data"
        target: "/app/.telegram-bot-data"
        createHostPath: true
    subscribe:
      - key: "user_interaction"
    instances:
      telegram:
        environment:
          - TELEGRAM_BOT_TOKEN=TOKEN
```

## Available orders for your bots

### notify_users
Sends a message to all subscribed Telegram users. For example:
```ts
await bot.publishOrder("Hello there!", "user_interaction", "notify_users");
```
