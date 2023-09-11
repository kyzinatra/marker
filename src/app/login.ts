import { Page } from "puppeteer";
import { LOGIN } from "../selectors/uri";
import { LOGIN_FIELDS, LOGIN_SUBMIT } from "../selectors/selectors";
import { ask } from "../utils/ask";
import { getBot } from "../bot/get";
import { error } from "../utils/error";

const questions = ["Введите почту от личного кабинета", "Введите пароль"];

export async function login(id: number, page: Page) {
	const bot = await getBot();
	await page.goto(LOGIN).catch((e) => error(e, id, 10));
	await page.waitForSelector(LOGIN_FIELDS).catch((e) => error(e, id, 11));
	const fields = await page.$$(LOGIN_FIELDS).catch((e) => error(e, id, 12));
	for (let i = 0; i < questions.length; i++) {
		const answer = await ask(id, questions[i], true);
		if (fields?.[i]) await fields[i].type(answer);
	}

	await (await page.$(LOGIN_SUBMIT))?.click();
	await page.waitForNetworkIdle().catch((e) => error(e, id, 13));
	if ((await page.$(LOGIN_SUBMIT)) && (await page.$$(LOGIN_FIELDS)).length) {
		bot.sendMessage(id, "Неверный логин или пароль. Попробуйте еще раз написать /online");
		return false;
	}

	return true;
}
