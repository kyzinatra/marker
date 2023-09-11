import { Page } from "puppeteer";
import { MAIN_URI, SCHEDULE } from "../selectors/uri";
import { ENTER_BUTTON, LK_BUTTONS } from "../selectors/selectors";
import { error } from "../utils/error";

export async function goPoint(id: number, page: Page) {
	await page.goto(MAIN_URI, { waitUntil: "load" }).catch((e) => error(e, id, 14));
	await page.waitForSelector(LK_BUTTONS).catch((e) => error(e, id, 15));
	await page.goto(SCHEDULE, { waitUntil: "load" }).catch((e) => error(e, id, 16));
	await page.waitForSelector(ENTER_BUTTON).catch((e) => error(e, id, 17));
	(await page.$(ENTER_BUTTON))?.click().catch((e) => error(e, id, 18));
	await page.waitForNavigation({ waitUntil: "load" }).catch((e) => error(e, id, 19));
}
