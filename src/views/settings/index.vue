<template>
  <div>
    <div class="myInfo">
      <div class="left">
        <div class="input-line">
          <p>用户名：</p>
          <el-input v-model="userName" disabled />
        </div>
        <div class="input-line">
          <p>姓名：</p>
          <el-input v-model="realName" disabled />
        </div>
        <div class="input-line">
          <p>性别：</p>
          <el-input v-model="gender" disabled />
        </div>
        <div class="input-line">
          <p>手机号：</p>
          <el-input v-model="phone" disabled />
        </div>
        <div class="input-line">
          <p>身份证：</p>
          <el-input v-model="idNumber" disabled />
        </div>
        <div class="input-line">
          <p>工号：</p>
          <el-input v-model="workerNumber" disabled />
        </div>
        <div class="input-line">
          <p>身份：</p>
          <el-select v-model="value" @change="valueChange" disabled>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="input-line" v-if="value === 'enterprise'">
          <p>所属企业：</p>
          <el-select v-model="enterprise1" @change="enterprise1Change">
            <el-option
              v-for="item in enterprise1Options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="input-line" v-if="value === 'driver'">
          <p>所属企业：</p>
          <el-select v-model="enterprise2" multiple @change="enterprise2Change">
            <el-option
              v-for="item in enterprise1Options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="right">
        <img class="avatar" src="../../assets/x.jpg" />
      </div>
    </div>
    <el-button class="submit" type="primary" auto-insert-space>提交</el-button>
  </div>
</template>

<script>
import { setToken, getToken } from "@/utils/auth";
import { getData, setData } from "@/utils/global";
export default {
  data() {
    return {
      userName: "",
      realName: "姓名",
      gender: "性别",
      phone: "",
      value: getToken(),
      workerNumber: "",
      idNumber: "",
      enterprise: "",
      enterprise1: getData("enterprise1"),
      enterprise2: getData("enterprise2"),
      enterprise1Options: [
        { value: "1001", label: "企业1" },
        { value: "1002", label: "企业2" },
        { value: "1003", label: "企业3" },
        { value: "1004", label: "企业4" },
      ],
      options: [
        { value: "admin", label: "管理员" },
        { value: "driver", label: "司机" },
        { value: "enterprise", label: "企业" },
        { value: "tax", label: "税务" },
      ],
    };
  },
  created() {
    this.userName = this.$bus.account;
    this.phone = this.$bus.account;
  },
  methods: {
    valueChange(val) {
      switch (val) {
        case "driver":
          setData("driver", "d1");
          break;
      }
      setToken(val);
    },
    enterprise1Change(val) {
      setData("enterprise1", val);
    },
    enterprise2Change(val) {
      setData("enterprise2", val);
    },
  },
};
</script>

<style scoped>
.myInfo {
  display: flex;
  justify-content: space-between;
}
.left {
  padding-left: 100px;
}
.input-line {
  width: 500px;
  display: flex;
  margin-bottom: 20px;
}
.input-line p {
  width: 110px;
  font-size: 18px;
}
.input-line .el-input {
  font-size: 18px;
}
.input-line .el-select {
  width: 100%;
}
.avatar {
  width: 180px;
  height: 180px;
  margin-right: 300px;
  border-radius: 50% 50%;
  margin-top: 100px;
}
.submit {
  position: fixed;
  bottom: 120px;
  font-size: 22px;
  padding: 22px 42px;
  left: 50%;
  transform: translateX(-50%);
}
</style>