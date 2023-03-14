<template>
  <div class="navTree noSelect">
    <div class="fixedNav">
      <div class="navItems" @mouseleave="handleOut">
        <div
          class="navItem"
          v-for="(item, i) in navList"
          :key="i"
          @mouseover="handleHover(i)"
          @click="clickItem(item.url)"
        >
          <p
            class="navText"
            :style="hoverItem == i || currentItem == i ? 'color:#1976d2' : ''"
          >
            {{ item.title }}
          </p>
        </div>
        <div :class="'capsule' + (isResizing ? ' noTrans' : '')" ref="capsule">
          <Transition duration="550" name="nested">
            <div
              class="menu"
              v-if="showMenu && navList[hoverItem].children.length"
            >
              <div class="trueMenu">
                <p
                  class="menuItem"
                  v-for="(subItem, j) in navList[hoverItem].children"
                  :key="j"
                  @click="clickItem(subItem.url)"
                  :style="$route.path === subItem.url ? 'color:#1976d2' : ''"
                >
                  <span
                    :style="
                      $route.path.includes === subItem.url
                        ? 'color:#1976d2;font-weight:700'
                        : 'font-weight:700'
                    "
                  >
                    · </span
                  >{{ subItem.title }}
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
    <div class="settings">
      <div class="navItem settingText" @click="toSettings">
        <p class="navText">
          {{ pageState === "settings" ? "返回" : "个人信息设置" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import require from "@/utils/pub-use";
export default {
  data() {
    return {
      defaultActive: "",
      currentItem: 0,
      hoverItem: 0,
      showMenu: false,
      isResizing: false,
      pageState: "",
      allNavList: {
        admin: [
          {
            title: "货运企业审核",
            url: "/admin/enterpriseAudit",
            children: [],
          },
          {
            title: "司机信息审核",
            url: "/admin/driverAudit",
            children: [],
          },
          {
            title: "已处理（企业）",
            url: "/admin/enterprise",
            children: [],
          },
          {
            title: "已处理（司机）",
            url: "/admin/driver",
            children: [],
          },
        ],
        settings: [
          {
            title: "基本信息",
            url: "/settings",
            children: [],
          },
        ],
        tax: [
          {
            title: "油票抵扣",
            url: "/tax/notApproved",
            children: [
              {
                title: "未审核订单",
                url: "/tax/notApproved",
                children: [],
              },
              {
                title: "已审核订单",
                url: "/tax/approved",
                children: [],
              },
            ],
          },
        ],
        enterprise: [
          {
            title: "油票抵扣",
            url: "/enterprise/orderUpload",
            children: [
              {
                title: "货运企业订单上传",
                url: "/enterprise/orderUpload",
                children: [],
              },
              {
                title: "已上传订单",
                url: "/enterprise/order",
                children: [],
              },
            ],
          },
        ],
        driver: [
          {
            title: "油票抵扣",
            url: "/driver/order",
            children: [
              {
                title: "订单查看",
                url: "/driver/order",
                children: [],
              },
              {
                title: "油票信息上传",
                url: "/driver/oilTicketUpload",
                children: [],
              },
              {
                title: "已上传信息",
                url: "/driver/oilTicket",
                children: [],
              },
            ],
          },
        ],
      },
      navList: [],
    };
  },
  methods: {
    toSettings() {
      if (this.pageState === "settings") {
        if (this.$router.options.history.state.back) {
          this.$router.back();
        } else {
          this.$router.push("/");
        }
      } else this.$router.push("/settings");
    },
    handleHover(val) {
      this.hoverItem = val;
      this.showMenu = true;
      this.updatePlace();
    },
    handleOut() {
      this.hoverItem = this.currentItem;
      this.showMenu = false;
      this.updatePlace();
    },
    require(url) {
      return require(url);
    },
    clickItem(url) {
      this.currentItem = this.hoverItem;
      this.showMenu = false;
      this.$router.push(url);
    },
    updatePlace(val = false) {
      if (val) {
        this.isResizing = true;
        this.$refs.capsule.style.opacity = "0";
        this.$nextTick(() => {
          this.$refs.capsule.style.top = 5 * this.hoverItem + "rem";
          this.$refs.capsule.style.opacity = "1";
          setTimeout(() => {
            this.isResizing = false;
          }, 0);
        });
      } else {
        this.$refs.capsule.style.opacity = "1";
        this.$refs.capsule.style.top = 5 * this.hoverItem + "rem";
      }
    },
    updateItem() {
      for (let i = 0; i < this.navList.length; i++) {
        if (this.$route.path === this.navList[i].url) {
          this.currentItem = i;
          this.hoverItem = i;
        }
        for (let j = 0; j < this.navList[i].children.length; j++) {
          if (this.$route.path === this.navList[i].children[j].url) {
            this.currentItem = i;
            this.hoverItem = i;
          }
        }
      }
    },
  },
  mounted() {
    this.pageState = this.$route.path.split("/")[1];
    this.navList = this.allNavList[this.pageState] || [];
    this.updateItem();
    this.updatePlace(true);
  },
  watch: {
    $route(to, from) {
      this.pageState = this.$route.path.split("/")[1];
      this.navList = this.allNavList[this.pageState] || [];
      this.updateItem();
      this.updatePlace(from.path === "/");
    },
  },
};
</script>

<style scoped>
.navTree {
  background-color: #ffffff;
  position: relative;
}
.fixedNav {
  position: fixed;
  width: 300px;
}
.logo {
  width: 234px;
  margin: 20px auto;
  margin-bottom: 60px;
  display: block;
  cursor: pointer;
}
.navItems {
  position: relative;
  margin-top: 100px;
}
.navItem {
  height: 60px;
  display: flex;
  align-items: center;
  cursor: pointer;
  box-sizing: content-box;
  margin: 20px 24px;
  border-radius: 4px;
}
.navItem:hover {
  background-color: #1976d224;
}
.navLogo {
  width: 32px;
  height: 32px;
  margin-left: 40px;
  margin-right: 24px;
}
.navText {
  font-size: 20px;
  margin-left: 30px;
}
.capsule {
  width: 8px;
  height: 60px;
  background-color: #1976d27c;
  border-radius: 8px 0 0 8px;
  margin: 0;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: all 0.5s;
}
.menu {
  padding-left: 40px;
  transform: translateY(-50%);
  top: 50%;
  position: relative;
}
.trueMenu {
  min-width: 220px;
  padding: 18px 0;
  background-color: #ffffff;
  transition: all 0.5s;
  border-radius: 8px;
}
.menuItem {
  font-size: 20px;
  margin: 10px;
  padding-left: 24px;
  cursor: pointer;
}
.menuItem:hover {
  color: #1976d2;
}
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}
.nested-leave-active {
  transition-delay: 0.15s;
}
.nested-enter-from,
.nested-leave-to {
  transform: translateY(-50%) translateX(30px);
  opacity: 0;
}
.noTrans {
  transition: opacity 0.5s !important;
}
.settings {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.settingText:hover {
  color: #1976d2;
}
</style>

