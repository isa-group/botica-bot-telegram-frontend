import botica from "botica-lib-node";
import logger, { formatError } from "./logger.js";
import { subscribedUsers } from "./storage.js";
import { createTelegramBot } from "./telegramBot.js";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
if (!TELEGRAM_BOT_TOKEN) {
  throw new Error(
    "no TELEGRAM_BOT_TOKEN environment variable was specified for this bot!",
  );
}

const bot = await botica();
const telegramBot = createTelegramBot(bot, TELEGRAM_BOT_TOKEN);

bot.onOrderReceived(async (message) => {
  for (const userId of subscribedUsers) {
    try {
      await telegramBot.api.sendMessage(userId, message);
    } catch (error) {
      logger.error(
        `Failed to send message to ${userId}: ${formatError(error)}`,
      );
    }
  }
}, "broadcast_message");

telegramBot.start(); // promise never resolves
logger.info("Telegram bot started.");

await bot.start();
logger.info("Botica bot started.");
