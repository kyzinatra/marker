import { User } from "./user";

class UsersController {
	users: User[] = [];

	addUser(user: User) {
		this.users.push(user);
	}

	getUser(id: number | string) {
		return this.users.find((user) => user.id === id);
	}

	removeUser(id: number | string) {
		this.users = this.users.filter((user) => {
			if (user.id === id) {
				user.browser.close();
				clearInterval(user.intervalId);
				return false;
			}
		});
	}
}

export const Users = new UsersController();
