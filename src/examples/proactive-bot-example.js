import botica from "botica-lib-node";
import { randomUUID } from "crypto";

const bot = await botica();

// Executes the proactive action for this bot. This method will run periodically
// following the initial delay and period specified in the botica configuration
// file for this bot.
bot.proactive(async () => {
  // Perform a long blocking task
  const longBlockingTaskResult = await runLongBlockingTask();

  // Publish the result using the key and order specified in the configuration file for this bot
  await bot.publishOrder(longBlockingTaskResult);

  // You can also publish a message with a custom key and order
  await bot.publishOrder(longBlockingTaskResult, "my_key", "my_order");
});

async function runLongBlockingTask() {
  return new Promise(
      (resolve) => setTimeout(() => resolve(randomUUID()), 5000));
}

await bot.start();
