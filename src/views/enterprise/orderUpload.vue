<template>
  <div>
    <div class="myInfo">
      <div class="left">
        <div class="input-line">
          <p>始发地：</p>
          <el-input v-model="from" />
        </div>
        <div class="input-line">
          <p>目的地：</p>
          <el-input v-model="to" />
        </div>
        <div class="input-line">
          <p>公里数：</p>
          <el-input v-model="distance" />
        </div>
        <div class="input-line">
          <p>司机UUID：</p>
          <el-input v-model="driver" placeholder="（例如d1、d2，目前默认d1）" />
        </div>
        <div class="input-line">
          <p>时间：</p>
          <el-date-picker v-model="time" type="datetimerange" />
        </div>
      </div>
    </div>
    <el-button
      class="submit"
      type="primary"
      auto-insert-space
      @click="submit"
      :loading="loading"
      >提交</el-button
    >
  </div>
</template>

<script>
import { getData } from "@/utils/global";
import { generateDateUUID, handleDateObject } from "@/utils/date";
import { addOrder, setOrderBegin } from "@/api/index";
export default {
  data() {
    return {
      from: "",
      to: "",
      time: "",
      distance: "",
      driver: "",
      endTime: "",
      loading: false,
    };
  },
  methods: {
    submit() {
      if (!this.from) {
        ElMessage.warning("请输入始发地");
        return;
      }
      if (!this.to) {
        ElMessage.warning("请输入目的地");
        return;
      }
      if (!this.time) {
        ElMessage.warning("请输入截止时间");
        return;
      }
      this.endTime = this.time[1];
      this.loading = true;
      let uuid = generateDateUUID();
      addOrder({
        uuid: uuid,
        destination: this.to,
        original: this.from,
        deadline: handleDateObject(this.endTime),
        company_uuid: getData("enterprise1") || "1000",
        driver_uuid: this.driver || "d1",
        distance: parseFloat(this.distance),
      })
        .then(({ code: code, msg: msg }) => {
          if (code === "200") {
            ElMessage.success("上传成功");
            setOrderBegin({
              timestamp: this.time[0].getTime(),
              uuid: uuid,
            });
            this.from = "";
            this.to = "";
            this.endTime = "";
            this.time = "";
            this.distance = "";
            this.driver = "";
          } else {
            ElMessage.error(msg);
          }
        })
        .catch((err) => {
          ElMessage.error(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
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
  width: 600px;
  display: flex;
  margin-bottom: 20px;
}
.input-line p {
  width: 150px;
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