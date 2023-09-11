import { MARK_BUTTON } from "../../selectors/selectors";
import { Users } from "../../service/users";
import { error } from "../../utils/error";
import { getBot } from "../get";

export async function check(id: string | number, intervalId?: NodeJS.Timeout) {
	const user = Users.getUser(id);
	const bot = await getBot();
	if (!user) {
		bot.sendMessage(id, "Была инициирована проверка, но браузер найден не был. Попробуйте команду /online");
		return Users.removeUser(id);
	}
	const { page } = user;

	await page.reload({ waitUntil: "load" }).catch((e) => error(e, id, 0));
	await page.waitForSelector(MARK_BUTTON, { timeout: 10000 }).catch((e) => null);
	const markers = await page.$$(MARK_BUTTON).catch((e) => error(e, id, 2));
	markers?.forEach((el) => el.click().catch((e) => error(e, id, 3)));
}

export async function checkDialog() {
	const bot = await getBot();

	bot.onText(/\/check/gi, async (user) => {
		const id = user.chat.id;
		bot.sendMessage(id, "Инициирована проверка");
		await check(id).catch((e) => error(e, id, 4));
		bot.sendMessage(id, "Проверка завершена");
	});
}
