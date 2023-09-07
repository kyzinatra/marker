import { Page } from "puppeteer";
import { MAIN_URI, SCHEDULE } from "../selectors/uri";
import { ENTER_BUTTON, LK_BUTTONS } from "../selectors/selectors";

export async function goPoint(id: number, page: Page) {
	await page.goto(MAIN_URI, { waitUntil: "load" });
	await page.waitForSelector(LK_BUTTONS);
	await page.goto(SCHEDULE, { waitUntil: "load" });
	await page.waitForSelector(ENTER_BUTTON);
	(await page.$(ENTER_BUTTON))?.click();
	await page.waitForNavigation({ waitUntil: "load" });
}
