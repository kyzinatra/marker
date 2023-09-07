import { Page } from "puppeteer";
import { LOGIN } from "../selectors/uri";
import { LOGIN_FIELDS, LOGIN_SUBMIT } from "../selectors/selectors";
import { ask } from "../utils/ask";
import { getBot } from "../bot/get";

const questions = ["Введите почту от личного кабинета", "Введите пароль"];

export async function login(id: number, page: Page) {
	const bot = await getBot();
	await page.goto(LOGIN);
	await page.waitForSelector(LOGIN_FIELDS);
	const fields = await page.$$(LOGIN_FIELDS);
	for (let i = 0; i < questions.length; i++) {
		const answer = await ask(id, questions[i], true);
		await fields[i].type(answer);
	}

	await (await page.$(LOGIN_SUBMIT))?.click();
	await page.waitForNetworkIdle();
	if ((await page.$(LOGIN_SUBMIT)) && (await page.$$(LOGIN_FIELDS)).length) {
		bot.sendMessage(id, "Неверный логин или пароль. Попробуйте еще раз написать /online");
		return false;
	}

	return true;
}
