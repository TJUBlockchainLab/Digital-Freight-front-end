<template>
  <div>
    <div class="myInfo">
      <div class="left">
        <div class="input-line">
          <p>开始时间：</p>
          <el-date-picker v-model="startTime" type="datetime" />
        </div>
        <div class="input-line">
          <p>结束时间：</p>
          <el-date-picker v-model="endTime" type="datetime" />
        </div>
      </div>
    </div>
    <el-button class="submit" type="primary" auto-insert-space>提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
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