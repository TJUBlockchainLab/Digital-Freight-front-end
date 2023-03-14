<template>
  <div>
    <el-input
      v-model="search"
      placeholder="搜索关键词"
      size="large"
      class="topSearch"
    />
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.orderNo.includes(search) ||
            data.state.includes(search)
        )
      "
      style="width: 100%"
      stripe
      border
    >
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column align="center" label="订单编号" prop="orderNo" />
      <el-table-column align="center" label="开始时间" prop="startTime" />
      <el-table-column align="center" label="结束时间" prop="endTime" />
      <el-table-column align="center" label="匹配情况" prop="state" />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button
            auto-insert-space
            type="primary"
            @click="handleConfirm(scope.$index)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="centerDialogVisible"
      title="订单详情"
      width="30%"
      center
      :show-close="false"
    >
      <div class="input-line">
        <p>订单编号：</p>
        <span>{{ detail.orderNo }}</span>
      </div>
      <div class="input-line">
        <p>开始时间：</p>
        <span>{{ detail.startTime }}</span>
      </div>
      <div class="input-line">
        <p>结束时间：</p>
        <span>{{ detail.endTime }}</span>
      </div>
      <div class="input-line">
        <p>匹配情况：</p>
        <span>{{ detail.state }}</span>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="confirmBtn"
            type="primary"
            @click="centerDialogVisible = false"
            auto-insert-space
          >
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      centerDialogVisible: false,
      search: "",
      reason: "",
      detail: {},
      tableData: [
        {
          id: 1,
          orderNo: "Admin1",
          state: "A",
          startTime: "2020-12-12 12:12:12",
          endTime: "2020-12-12 12:12:12",
        },
        {
          id: 2,
          orderNo: "Boss2",
          state: "B",
          startTime: "2020-12-12 12:12:12",
          endTime: "2020-12-12 12:12:12",
        },
        {
          id: 3,
          orderNo: "Cat3",
          state: "C",
          startTime: "2020-12-12 12:12:12",
          endTime: "2020-12-12 12:12:12",
        },
        {
          id: 4,
          orderNo: "Dog4",
          state: "D",
          startTime: "2020-12-12 12:12:12",
          endTime: "2020-12-12 12:12:12",
        },
      ],
    };
  },
  methods: {
    handleConfirm(id) {
      this.reason = "";
      this.detail = this.tableData[id];
      this.centerDialogVisible = true;
    },
    handleCancel(id) {
      console.log(id);
    },
  },
};
</script>

<style scoped>
.topSearch {
  width: 320px;
  height: 40px;
  font-size: 17px;
  margin-bottom: 20px;
}
.input-line {
  width: 500px;
  display: flex;
  margin: 0 20px;
  margin-bottom: 20px;
}

.input-line .el-input {
  width: 300px;
  font-size: 18px;
}
.input-line p {
  width: 110px;
  font-size: 18px;
}
.input-line span {
  font-size: 18px;
}
</style>