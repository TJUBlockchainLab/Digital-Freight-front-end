<template>
  <div class="login-container">
    <div :class="'login'">
      <div class="left-content">
        <img src="../../assets/logo.jpg" />
      </div>
      <div class="right-content">
        <p class="title">TJU网络货运平台</p>
        <p class="label">手机号/邮箱：</p>
        <el-input
          class="input"
          v-model="account"
          placeholder="请输入您的手机号或邮箱"
        />
        <p class="label">{{ type ? "密码：" : "验证码：" }}</p>
        <el-input
          v-if="!type"
          class="input"
          v-model="code"
          placeholder="请输入您获取的验证码"
          @keyup.enter="
            () => {
              state ? register() : login();
            }
          "
          ><template #append>
            <el-button>获取验证码</el-button>
          </template> </el-input
        ><el-input
          v-else
          class="input"
          v-model="password"
          placeholder="请输入您的密码"
          type="password"
          show-password
          @keyup.enter="
            () => {
              state ? register() : login();
            }
          "
        />
        <div class="links">
          <span @click="() => (type = !type)"
            >切换至{{ type ? "验证码" : "密码"
            }}{{ statue ? "注册" : "登录" }}</span
          >
          <span @click="() => (statue = !statue)">{{
            statue ? "去登录" : "去注册"
          }}</span>
        </div>
        <el-button class="loginBtn" v-if="!statue" @click="login"
          ><span>登录</span> </el-button
        ><el-button v-else class="registerBtn" @click="register"
          >注册</el-button
        >
      </div>
      <div class="copyright-line-1"></div>
      <div class="copyright-text">Copyright</div>
      <div class="copyright-line-2"></div>
    </div>
  </div>
</template>

<script>
import { setToken } from "@/utils/auth";
import { getData, setData } from "@/utils/global";
export default {
  data() {
    return {
      account: "",
      code: "",
      password: "",
      type: true,
      statue: false,
      accounts: [
        {
          account: "13117239483",
          password: "admin111",
        },
        {
          account: "18627391126",
          password: "enterprise1",
        },
        {
          account: "13637264983",
          password: "enterprise2",
        },
        {
          account: "15138275403",
          password: "driver1",
        },
        {
          account: "18927364098",
          password: "driver2",
        },
        {
          account: "13827492367",
          password: "taxtax1",
        },
        {
          account: "18548294727",
          password: "taxtax2",
        },
      ],
    };
  },
  methods: {
    validate() {
      this.account = this.account.trim();
      this.password = this.password.trim();
      this.code = this.code.trim();
      if (!this.account) {
        ElMessage.warning("请输入您的手机号或邮箱");
        return false;
      }
      let regPhone = /^1[3456789]\d{9}$/,
        regEMail =
          /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!regPhone.test(this.account) && !regEMail.test(this.account)) {
        ElMessage.warning("请输入有效的手机号或邮箱");
        return false;
      }
      if (this.type && !this.password) {
        ElMessage.warning("请输入您的密码");
        return false;
      }
      if (this.type && this.password.length < 6) {
        ElMessage.warning("密码长度不能少于6位");
        return false;
      }
      if (!this.type && !this.code) {
        ElMessage.warning("请输入验证码");
        return false;
      }
      return true;
    },
    checkUserType() {
      let index = -1;
      this.accounts.map((item, i) => {
        if (item.account === this.account) {
          index = i;
        }
      });
      if (index === -1) {
        ElMessage.warning("账户不存在");
        return false;
      }
      let str = this.password || this.code;
      if (str === this.accounts[index].password) {
        if (str.slice(0, 5) === "admin") {
          setToken("admin");
          setData("admin", 1);
          this.$router.push("/admin");
          return "管理员";
        } else if (str.slice(0, 6) === "driver") {
          setToken("driver");
          setData("driver", "d" + str.slice(6, 7));
          this.$router.push("/driver");
          return "司机";
        } else if (str.slice(0, 3) === "tax") {
          setToken("tax");
          setData("tax", str.slice(6, 7));
          this.$router.push("/tax");
          return "税务局";
        } else if (str.slice(0, 10) === "enterprise") {
          setToken("enterprise");
          setData("enterprise1", str.slice(10, 11));
          this.$router.push("/enterprise");
          return "企业用户";
        }
      } else {
        ElMessage.warning("密码或验证码错误");
        return false;
      }
    },
    register() {
      if (!this.validate()) return;
      if (!this.checkUserType()) return;
      ElMessage.success("注册成功！即将为您自动登录~");
    },
    login() {
      if (!this.validate()) return;
      let type = this.checkUserType();
      if (!type) return;
      this.$bus.account = this.account;
      ElMessage.success("登录成功，欢迎您：" + type + "！");
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #f9f9f9;
  height: 100vh;
  overflow-x: hidden;
}
.login {
  position: relative;
  width: max-content;
  top: 50%;
  transform: translateY(-50%);
  background: #ffffff;
  box-shadow: 0px 0px 67px 6px rgba(0, 32, 40, 0.22);
  border-radius: 15px;
  margin: 0 auto;
  transition: height 0.5s;
  padding: 100px;
  display: flex;
  align-items: center;
}
.left-content {
  width: 300px;
  height: 300px;
  margin-right: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.left-content img {
  width: 100%;
  height: 100%;
}
.right-content {
  width: 350px;
}
.title {
  font-size: 36px;
  font-weight: 700;
  color: #657eda;
  text-align: center;
}
.label {
  margin-top: 15px;
  font-size: 18px;
  color: #a3a3a3;
}
.input {
  margin-top: 5px;
  font-size: 19px;
  height: 50px;
}
.links {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
}
.links span {
  cursor: pointer;
  color: #657eda;
  font-size: 16px;
}

.loginBtn {
  margin-top: 20px;
  width: 100%;
  height: 50px;
  background: #657eda;
  box-shadow: 0px 0px 17px 1px rgba(11, 11, 11, 0.11);
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 2px;
  transition: all 0.4s;
}
.loginBtn:hover,
.loginBtn:focus,
.loginBtn:active {
  background: #657eda !important;
  color: #ffffff !important;
}

.loginBtn span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.4s;
}

.loginBtn span:after {
  content: "开始使用";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.7s;
}

.loginBtn:hover span {
  padding-right: 85px;
}

.loginBtn:hover span:after {
  opacity: 4;
  right: 0;
}
.registerBtn {
  margin-top: 20px;
  width: 100%;
  height: 50px;
  background: #657eda;
  box-shadow: 0px 0px 17px 1px rgba(11, 11, 11, 0.11);
  border-radius: 5px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  transform: perspective(200px);
  letter-spacing: 2px;
  margin-left: 0;
  will-change: transform;
  transition: all 0.3s;
}
.registerBtn:hover {
  transform: perspective(180px) rotateX(10deg) translateY(2px);
}

.registerBtn:hover,
.registerBtn:focus,
.registerBtn:active {
  background: #657eda !important;
  color: #ffffff !important;
}

.registerBtn:active {
  transform: perspective(170px) rotateX(16deg) translateY(5px);
}
.copyright-line-1 {
  height: 1px;
  background-color: #a3a3a3;
  width: 150px;
  position: absolute;
  bottom: 30px;
  right: 50%;
  transform: translateX(calc(50% - 150px));
}
.copyright-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  color: #a3a3a3;
  text-align: center;
}
.copyright-line-2 {
  height: 1px;
  background-color: #a3a3a3;
  width: 150px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(calc(-50% + 150px));
}
</style>
