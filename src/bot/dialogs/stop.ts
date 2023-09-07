import { Users } from "../../service/users";
import { getBot } from "../get";

export async function stopDialog() {
	const bot = await getBot();
	bot.onText(/\/stop/gi, async (user) => {
		const id = user.chat.id;
		await bot.sendMessage(id, "Останавливаем бота");
		Users.removeUser(id);
		await bot.sendMessage(id, "Бот остановлен");
	});
}
