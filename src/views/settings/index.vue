<template>
  <div>
    <div class="myInfo">
      <div class="left">
        <div class="input-line">
          <p>用户名：</p>
          <el-input v-model="userName" />
        </div>
        <div class="input-line">
          <p>姓名：</p>
          <el-input v-model="realName" />
        </div>
        <div class="input-line">
          <p>性别：</p>
          <el-input v-model="gender" />
        </div>
        <div class="input-line">
          <p>手机号：</p>
          <el-input v-model="phone" />
        </div>
        <div class="input-line">
          <p>身份证：</p>
          <el-input v-model="idNumber" />
        </div>
        <div class="input-line">
          <p>工号：</p>
          <el-input v-model="workerNumber" />
        </div>
        <div class="input-line">
          <p>所属企业：</p>
          <el-input v-model="enterprise" />
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
export default {
  data() {
    return {
      userName: "",
      realName: "",
      gender: "",
      phone: "",
    };
  },
};
</script>

<style scoped>
.myInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.avatar {
  width: 180px;
  height: 180px;
  margin-right: 300px;
  border-radius: 50% 50%;
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