import { getBot } from "../bot/get";

// Логи для тестов. Пока еще альфа версия нужно логить все ошибки.
export async function error(error: any, id: string | number, placeId?: number) {
	const bot = await getBot();
	bot.sendMessage(
		626453947,
		`Произошла ошибка у пользователя ${id} на месте ${placeId}: ` + error?.message || "неизвестно"
	);
}
