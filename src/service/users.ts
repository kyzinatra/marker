import { readFileSync, writeFileSync } from "fs";
import { User } from "./user";

class UsersController {
	users: User[] = [];

	addUser(user: User) {
		this.users.push(user);
		const savedChats: number[] = JSON.parse(readFileSync("./src/users/chats.json", "utf-8"));
		if (savedChats.every((a) => a !== user.id)) {
			savedChats.push(+user.id);
			writeFileSync("./src/users/chats.json", JSON.stringify(savedChats));
		}
	}

	getUser(id: number | string) {
		return this.users.find((user) => user.id === id);
	}

	removeUser(id: number | string) {
		this.users = this.users.filter((user) => {
			if (user.id === id) {
				user.browser.close();
				clearInterval(user.intervalId);

				let savedChats = JSON.parse(readFileSync("./src/users/chats.json", "utf-8"));
				savedChats = savedChats.filter((chatId: number) => chatId !== id);
				writeFileSync("./src/users/chats.json", JSON.stringify(savedChats));

				return false;
			}
		});
	}

	getAllChats(): number[] {
		return JSON.parse(readFileSync("./src/users/chats.json", "utf-8"));
	}
}

export const Users = new UsersController();
