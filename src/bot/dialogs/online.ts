import puppeteer from "puppeteer";
import { getBot } from "../get";
import { error } from "../../utils/error";
import { goPoint } from "../../app/goPoint";
import { login } from "../../app/login";
import { Users } from "../../service/users";
import { User } from "../../service/user";
import { check } from "./check";

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

		const browser = await puppeteer.launch({
			headless: process.argv[2] === "--dev" ? false : "new",
			executablePath: process.argv[2] === "--dev" ? undefined : "/usr/bin/google-chrome",
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});

		const page = await browser.newPage();
		const isLogin = await login(id, page).catch((e) => error(e, id));
		if (!isLogin) return await browser.close();
		await goPoint(id, page).catch((e) => error(e, id));

		const intervalId = setInterval(() => {
			check(id, intervalId);
		}, 45 * 60 * 1000);

		Users.addUser(new User(page, browser, intervalId, id));

		await bot.sendMessage(id, "Браузер успешно создан");
		await check(id, intervalId);
	});
}
