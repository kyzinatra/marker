import { Users } from "../../service/users";
import { getBot } from "../get";

export async function screenDialog() {
	const bot = await getBot();
	bot.onText(/\/screen/gi, async (user) => {
		const id = user.chat.id;
		const userPage = Users.getUser(id);
		if (!userPage) return bot.sendMessage(id, "Браузер не найден");
		await bot.sendPhoto(id, await userPage.page.screenshot());
	});
}
