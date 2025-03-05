import botica from "botica-lib-node";
import { randomUUID } from "crypto";

const bot = await botica();

// Handles the reactive action for this bot. This method is triggered when an
// order is received.
bot.onOrderReceived(async (order, incomingMessage) => {
  // Perform a long blocking task
  const longBlockingTaskResult = await runLongBlockingTask(incomingMessage);

  // Publish the result using the key and order specified in the configuration file for this bot
  await bot.publishOrder(longBlockingTaskResult);

  // You can also publish a message with a custom key and order
  await bot.publishOrder(longBlockingTaskResult, "my_key", "my_order");
});

async function runLongBlockingTask(base) {
  return new Promise(
      (resolve) => setTimeout(() => resolve(base + randomUUID()), 5000));
}

await bot.start();