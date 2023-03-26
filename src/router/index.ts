import { createRouter, createWebHashHistory } from "vue-router";
import { getToken } from "@/utils/auth";

const routes = [
	{
		path: "/",
		component: () => import("@/views/home.vue"),
		redirect: "/admin",
		meta: {
			title: "主页",
			requireAuth: true,
		},
		children: [
			{
				path: "/admin",
				redirect: "/admin/enterpriseAudit",
				meta: {
					title: "管理",
					requireAuth: true,
					userType: "admin",
				},
				children: [
					{
						path: "/admin/enterpriseAudit",
						component: () => import("@/views/admin/enterpriseAudit.vue"),
						meta: {
							title: "货运企业审核",
						},
					},
					{
						path: "/admin/driverAudit",
						component: () => import("@/views/admin/driverAudit.vue"),
						meta: {
							title: "司机审核",
						},
					},
					{
						path: "/admin/enterprise",
						component: () => import("@/views/admin/enterprise.vue"),
						meta: {
							title: "已处理（企业）",
						},
					},
					{
						path: "/admin/driver",
						component: () => import("@/views/admin/driver.vue"),
						meta: {
							title: "已处理（司机）",
						},
					},
				],
			},
			{
				path: "/driver",
				redirect: "/driver/order",
				meta: {
					title: "司机",
					requireAuth: true,
					userType: "driver",
				},
				children: [
					{
						path: "/driver/order",
						component: () => import("@/views/driver/order.vue"),
						meta: {
							title: "订单查看",
						},
					},
					{
						path: "/driver/oilTicketUpload",
						component: () => import("@/views/driver/oilTicketUpload.vue"),
						meta: {
							title: "油票信息上传",
						},
					},
					{
						path: "/driver/oilTicket",
						component: () => import("@/views/driver/oilTicket.vue"),
						meta: {
							title: "已上传信息",
						},
					},
				],
			},
			{
				path: "/enterprise",
				redirect: "/enterprise/orderUpload",
				meta: {
					title: "企业",
					requireAuth: true,
					userType: "enterprise",
				},
				children: [
					{
						path: "/enterprise/orderUpload",
						component: () => import("@/views/enterprise/orderUpload.vue"),
						meta: {
							title: "货运企业订单上传",
						},
					},
					{
						path: "/enterprise/order",
						component: () => import("@/views/enterprise/order.vue"),
						meta: {
							title: "已上传订单",
						},
					},
				],
			},
			{
				path: "/tax",
				redirect: "/tax/notApproved",
				meta: {
					title: "税务",
					requireAuth: true,
					userType: "tax",
				},
				children: [
					{
						path: "/tax/approved",
						component: () => import("@/views/tax/approved.vue"),
						meta: {
							title: "未审核订单",
						},
					},
					{
						path: "/tax/notApproved",
						component: () => import("@/views/tax/notApproved.vue"),
						meta: {
							title: "已审核订单",
						},
					},
				],
			},
			{
				path: "/settings",
				component: () => import("@/views/settings/index.vue"),
				meta: {
					title: "设置",
					requireAuth: true,
				},
			},
		],
	},
	{
		path: "/login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录",
			requireAuth: false,
		},
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
	scrollBehavior: () => ({ top: 0 }),
});
router.beforeEach(async (to, from, next) => {
	let token = getToken();

	if (to.meta.requireAuth && !token) {
		next({
			path: "/login",
			query: {
				from: to.path,
			},
		});
	} else {
		console.log(token);

		if (to.meta.userType && to.meta.userType !== token) {
			next({
				path: "/" + token,
			});
		} else {
			window.document.title =
				to.meta.title == undefined
					? "TJU网络货运平台"
					: `${to.meta.title} - TJU网络货运平台`;
			next();
		}
	}
});
export default router;
