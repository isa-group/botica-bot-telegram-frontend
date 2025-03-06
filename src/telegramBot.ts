import { Bot } from "grammy";
import { Bot as BoticaBot } from "botica-lib-node";
import { saveSubscribers, subscribedUsers } from "./storage.js";

export const createTelegramBot = (boticaBot: BoticaBot, token: string) => {
  const telegramBot = new Bot(token);

  telegramBot.command("start", async (ctx) => {
    if (!subscribedUsers.has(ctx.chat.id)) {
      subscribedUsers.add(ctx.chat.id);
      saveSubscribers();
      await ctx.reply("Subscribed to notifications!");
    } else {
      await ctx.reply("You are already subscribed!");
    }
  });

  return telegramBot;
};
