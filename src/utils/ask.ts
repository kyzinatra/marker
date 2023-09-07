import TelegramBot from "node-telegram-bot-api";
import { getBot } from "../bot/get";

export async function ask(id: number, question: string, isSecret = false): Promise<string> {
	return new Promise(async (r) => {
		const BOT = await getBot();
		const message = await BOT.sendMessage(id, question);
		function listener(user: TelegramBot.Message) {
			r(user.text || "");
			if (isSecret) {
				BOT.deleteMessage(id, user.message_id);
				BOT.deleteMessage(id, message.message_id);
			}
			BOT.removeListener("message", listener);
		}

		BOT.addListener("message", listener);
	});
}
