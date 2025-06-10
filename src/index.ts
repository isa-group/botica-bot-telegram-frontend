import botica from "botica-lib-node";
import logger, { formatError } from "./logger.js";
import { subscribedUsers } from "./storage.js";
import { createTelegramBot } from "./telegramBot.js";
import { InputFile } from "grammy";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TELEGRAM_BOT_TOKEN) {
  throw new Error(
    "no TELEGRAM_BOT_TOKEN environment variable was specified for this bot!",
  );
}

const bot = await botica();
const telegramBot = createTelegramBot(TELEGRAM_BOT_TOKEN);

interface SendMessageProps {
  recipient: "broadcast";
  content: string;
}

bot.on("send_message", async (message) => {
  const { content } = JSON.parse(message) as SendMessageProps;

  for (const userId of subscribedUsers) {
    try {
      await telegramBot.api.sendMessage(userId, content);
    } catch (error) {
      logger.error(
        `Failed to send message to ${userId}: ${formatError(error)}`,
      );
    }
  }
});

interface SendDocumentProps {
  recipient: "broadcast";
  type?: "document" | "picture";
  localPath?: string;
  url?: string;
  caption?: string;
}

bot.on("send_document", async (message) => {
  const {
    type = "document",
    localPath,
    url,
    caption,
  } = JSON.parse(message) as SendDocumentProps;

  let file: InputFile;

  if (localPath) {
    file = new InputFile(localPath);
  } else if (url) {
    file = new InputFile(new URL(url));
  } else {
    logger.error(
      `No localPath or url property defined: ${message} ${JSON.stringify(JSON.parse(message))}`,
    );
    return;
  }

  const api = telegramBot.api;
  const methodName = type === "picture" ? "sendPhoto" : "sendDocument";

  for (const userId of subscribedUsers) {
    try {
      await api[methodName](userId, file, { caption });
    } catch (error) {
      logger.error(
        `Failed to send message to ${userId}: ${formatError(error)}`,
      );
    }
  }
});

telegramBot.start(); // promise never resolves
logger.info("Telegram bot started.");

await bot.start();
logger.info("Botica bot started.");
