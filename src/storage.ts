import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".telegram-bot-data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "subscribers.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export let subscribedUsers: Set<number>;
try {
  const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
  subscribedUsers = new Set(JSON.parse(data));
} catch {
  subscribedUsers = new Set();
}

export const saveSubscribers = () => {
  fs.writeFileSync(
    SUBSCRIBERS_FILE,
    JSON.stringify([...subscribedUsers]),
    "utf-8",
  );
};
