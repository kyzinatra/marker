import { Page, Browser } from "puppeteer";

export class User {
	constructor(
		public page: Page,
		public browser: Browser,
		public intervalId: NodeJS.Timeout,
		public id: number | string
	) {}
}
