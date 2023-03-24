import Cookies from "js-cookie";

const DataKey = "d2b8994b7c2b4100-0";

export function getData(key: string) {
	let Data = JSON.parse(Cookies.get(DataKey) || "{}");
	if (key) {
		return Data[key];
	}
	return Data;
}

export function setData(key: string, data: any) {
	let Data = getData("");
	Data[key] = data;
	return Cookies.set(DataKey, JSON.stringify(Data));
}

export function removeData() {
	return Cookies.remove(DataKey);
}
