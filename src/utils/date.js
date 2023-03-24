export function handleDate(timestamp) {
    let date = new Date(parseInt(timestamp));
    return `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
		.getHours()
		.toString()
		.padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
		.getSeconds()
		.toString()
		.padStart(2, "0")}`;
}
export function handleDateObject(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
		.getHours()
		.toString()
		.padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
		.getSeconds()
		.toString()
		.padStart(2, "0")}`;
}
export function generateDateUUID() {
    let now = new Date();
    let uuid = `${now.getFullYear()}-${(now.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}-${now
		.getHours()
		.toString()
		.padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}-${now
		.getSeconds()
		.toString()
		.padStart(2, "0")}`;
    return uuid;
}