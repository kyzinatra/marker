export async function wait(m: number) {
	return new Promise((r) => setTimeout(r, m));
}
