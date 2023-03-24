import http from "@/utils/request";

export function getOrder<T>() {
	return http.get<T>({
		url: "/digitalfreight/order/getall",
	});
}
export function getOrderByCompany<T>(params: any) {
	return http.get<T>({
		url: "/digitalfreight/order/companyorder",
		params,
	});
}
export function getOrderByDriver<T>(params: any) {
	return http.get<T>({
		url: "/digitalfreight/order/driverorder",
		params,
	});
}
export function addOrder<T>(params: any) {
	return http.get<T>({
		url: "/digitalfreight/order/addorder",
		params,
	});
}
export function setOrderStatus<T>(params: any) {
	return http.get<T>({
		url: "/digitalfreight/order/setorderstatus",
		params,
	});
}
export function setOrderBegin<T>(params: any) {
	return http.get<T>({
		url: "/digitalfreight/order/setorderbegin",
		params,
	});
}
export function addGasBill<T>(params: any) {
	return http.get<T>({
		url: "/digitalfreight/gasbill/addgasbill",
		params,
	});
}
export function orderGasBill<T>(params: any) {
	return http.get<T>({
		url: "/digitalfreight/gasbill/ordergasbill",
		params,
	});
}
export function setOrderApproved<T>(params: any) {
	return http.get<T>({
		url: "/digitalfreight/order/setorderapproved",
		params,
	});
}
