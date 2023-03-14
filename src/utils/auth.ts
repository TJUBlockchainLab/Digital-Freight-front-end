import Cookies from "js-cookie";

const TokenKey = "d2b8994b7c2b4100";

export function getToken() {
	return Cookies.get(TokenKey);
}

export function setToken(token: string) {
	return Cookies.set(TokenKey, token);
}

export function removeToken() {
	return Cookies.remove(TokenKey);
}
