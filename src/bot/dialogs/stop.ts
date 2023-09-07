import { isAvalible } from "../../constants/isAvalible";
import { Users } from "../../service/users";
import { getBot } from "../get";

export async function stopDialog() {
	const bot = await getBot();
	bot.onText(/\/stop/gi, async (user) => {
		const id = user.chat.id;

		if (!isAvalible.state) {
			await bot.sendMessage(id, "К сожалению сейчас нельзя выполнить эту команду. Попробуйте позже");
			return;
		}
		await bot.sendMessage(id, "Останавливаем бота");
		Users.removeUser(id);
		await bot.sendMessage(id, "Бот остановлен");
	});
}
