import { readFileSync } from "fs";
import TelegramBot from "node-telegram-bot-api";

let BotInstance: TelegramBot | null = null;

export async function getBot() {
	if (BotInstance) return BotInstance;

	const token = readFileSync("./src/BOT_TOKEN.txt")
		.toString()
		.trim()
		.replace(/[\n\s\t]/gi, "");
	BotInstance = new TelegramBot(token, { polling: true });
	return BotInstance;
}
