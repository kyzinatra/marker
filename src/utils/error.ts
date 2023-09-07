import { getBot } from "../bot/get";

export async function error(error: any, id: string | number) {
	const bot = await getBot();
	bot.sendMessage(id, "Произошла ошибка: " + error?.message || "неизвестно");
}
