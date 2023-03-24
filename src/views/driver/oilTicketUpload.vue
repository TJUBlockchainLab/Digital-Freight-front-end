<template>
  <div>
    <div class="myInfo">
      <div class="left">
        <div class="input-line">
          <p>订单编号：</p>
          <el-input v-model="orderNo" />
        </div>
        <div class="input-line">
          <p>钱数：</p>
          <el-input v-model="cost" placeholder="油票上的钱数，单位为分" />
        </div>
        <div class="input-line">
          <p>时间：</p>
          <el-date-picker v-model="time" type="datetime" />
        </div>
        <div class="input-line">
          <p>油票类型：</p>
          <el-select v-model="type">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="input-line">
          <p>发票图片：</p>
          <div style="width: 100%">
            <el-upload
              :file-list="fileList"
              action=""
              :auto-upload="false"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
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
import { generateDateUUID, handleDateObject } from "@/utils/date";
import { addGasBill } from "@/api/index";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      fileList: [],
      orderNo: "",
      cost: "",
      time: "",
      type: "",
      loading: false,
      options: [
        { value: "0", label: "油票" },
        { value: "1", label: "电票" },
      ],
    };
  },
  methods: {
    submit() {
      this.loading = true;
      if (this.time === "") this.time = new Date();
      addGasBill({
        cost: this.cost,
        order_uuid: this.orderNo,
        timestamp: handleDateObject(this.time),
        type: this.type,
        uuid: generateDateUUID(),
      })
        .then(({ code: code }) => {
          if (code === "200") {
            ElMessage.success({
              message: "上传成功",
            });
            this.cost = "";
            this.orderNo = "";
            this.time = "";
            this.type = "";
          } else {
            ElMessage.error({
              message: "上传失败",
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
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
  padding-left: 50px;
}
.input-line {
  width: 500px;
  display: flex;
  margin-bottom: 20px;
}
.input-line .el-input {
  width: 300px;
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