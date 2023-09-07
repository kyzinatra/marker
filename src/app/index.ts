import { startDialog } from "../bot/dialogs/start";
import { stopDialog } from "../bot/dialogs/stop";
import { onlineDialog } from "../bot/dialogs/online";
import { checkDialog } from "../bot/dialogs/check";

export async function init() {
	startDialog();
	stopDialog();
	onlineDialog();
	checkDialog();
}
