import { getBot } from "../get";
import { helloMessage } from "../../selectors/messages";

export async function startDialog() {
	const BOT = await getBot();

	BOT.onText(/\/start/gi, async (user) => {
		const id = user.chat.id;

		BOT.sendMessage(id, helloMessage, { parse_mode: "MarkdownV2" });
	});
}
