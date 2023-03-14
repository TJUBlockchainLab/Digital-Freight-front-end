<template>
  <div>
    <div class="myInfo">
      <div class="left">
        <div class="input-line">
          <p>订单编号：</p>
          <el-input v-model="orderNo" />
        </div>
        <div class="input-line">
          <p>油票编号：</p>
          <el-input v-model="oilTicketNo" />
        </div>
        <div class="input-line">
          <p>发票图片：</p>
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
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <el-button class="submit" type="primary" auto-insert-space>提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      fileList: [],
      orderNo: "",
      oilTicketNo: "",
    };
  },
  methods: {
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