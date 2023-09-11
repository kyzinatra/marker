import puppeteer from "puppeteer";
import { getBot } from "../get";
import { goPoint } from "../../app/goPoint";
import { login } from "../../app/login";
import { Users } from "../../service/users";
import { User } from "../../service/user";
import { check } from "./check";
import { isAvalible } from "../../constants/isAvalible";
import { error } from "../../utils/error";

export async function onlineDialog() {
	const bot = await getBot();
	bot.onText(/\/online/gi, async (user) => {
		const id = user.chat.id;
		const isUserLast = Users.getUser(id);
		if (isUserLast) {
			await bot.sendMessage(id, "Браузер уже создан");
			return;
		}

		bot.sendMessage(id, "Создаем для вас браузер");
		isAvalible.state = false;
		const browser = await puppeteer.launch({
			headless: process.argv[2] === "--dev" ? false : "new",
			executablePath: process.argv[2] === "--dev" ? undefined : "/usr/bin/google-chrome",
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});

		const page = await browser.newPage();
		const userPage = new User(page, browser, 0, id);
		Users.addUser(userPage);
		isAvalible.state = true;

		const isLogin = await login(id, page).catch((e) => error(e, id, 5));

		if (!Users.getUser(id)) return; // Проверяем не закрыл ли пользователя бота по пути
		if (!isLogin) return await browser.close().catch((e) => error(e, id, 6));

		await goPoint(id, page).catch((e) => error(e, id, 7));
		if (!Users.getUser(id)) return; // Проверяем не закрыл ли пользователя бота по пути

		const intervalId = setInterval(() => {
			check(id, intervalId).catch((e) => error(e, id, 8));
		}, 45 * 60 * 1000);
		userPage.intervalId = intervalId;

		await bot.sendMessage(id, "Браузер успешно создан");
		isAvalible.state = false;
		await check(id).catch((e) => error(e, id, 9));
		isAvalible.state = true;
	});
}
