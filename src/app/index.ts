import { startDialog } from "../bot/dialogs/start";
import { stopDialog } from "../bot/dialogs/stop";
import { onlineDialog } from "../bot/dialogs/online";
import { checkDialog } from "../bot/dialogs/check";
import { screenDialog } from "../bot/dialogs/screen";
import { Users } from "../service/users";
import { getBot } from "../bot/get";

export async function init() {
	const bot = await getBot();
	Users.getAllChats().forEach((chat) => {
		bot.sendMessage(chat, "Вышло новое обновление бота. Необходима повторная авторизация командой /online");
	});

	startDialog();
	stopDialog();
	onlineDialog();
	checkDialog();
	screenDialog();
}
