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
            data.uuid.includes(search) ||
            data.deadline.includes(search) ||
            data.status.includes(search)
        )
      "
      style="width: 100%"
      stripe
      border
    >
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column align="center" label="油票编号" prop="uuid" />
      <el-table-column align="center" label="订单编号" prop="order_uuid" />
      <el-table-column align="center" label="钱数（分）" prop="cost" />
      <el-table-column align="center" label="日期" prop="timestamp" />
      <el-table-column align="center" label="类型">
        <template #default="scope">
          <div>{{ scope.row.type === "0" ? "油票" : "电票" }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button
            auto-insert-space
            type="primary"
            @click="handleConfirm(scope.$index)"
            >查看</el-button
          >
          <el-popconfirm
            :title="
              '您确定' +
              (scope.row.status === '0' ? '要开始' : '已完成') +
              '该订单吗？'
            "
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleCancel(scope.$index, scope.row.status)"
            v-if="scope.row.status !== '2'"
          >
            <template #reference>
              <el-button auto-insert-space>{{
                scope.row.status === "0" ? "开始" : "完成"
              }}</el-button>
            </template>
          </el-popconfirm>
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
        <p>油票编号：</p>
        <span>{{ detail.uuid }}</span>
      </div>
      <div class="input-line">
        <p>订单编号：</p>
        <span>{{ detail.order_uuid }}</span>
      </div>
      <div class="input-line">
        <p>钱数（分）：</p>
        <span>{{ detail.cost }}</span>
      </div>
      <div class="input-line">
        <p>日期：</p>
        <span>{{ detail.timestamp }}</span>
      </div>
      <div class="input-line">
        <p>类型：</p>
        <span>{{ detail.type === "0" ? "油票" : "电票" }}</span>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="confirmBtn"
            type="primary"
            @click="centerDialogVisible = false"
          >
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getOrderByDriver,
  setOrderBegin,
  setOrderStatus,
  orderGasBill,
} from "@/api/index";
import { getData } from "@/utils/global";
import { handleDate } from "@/utils/date";
export default {
  data() {
    return {
      centerDialogVisible: false,
      search: "",
      detail: {},
      tableData: [],
      stateMap: ["未开始", "进行中", "已完成"],
    };
  },
  methods: {
    handleDate(date) {
      return handleDate(date);
    },
    handleConfirm(id) {
      this.detail = this.tableData[id];
      this.centerDialogVisible = true;
    },
    handleCancel(id, status) {
      if (status === "0") {
        let stamp = new Date().getTime();
        setOrderBegin({
          uuid: this.tableData[id].uuid,
          timestamp: stamp,
        }).then(({ code: code }) => {
          if (code === "200") {
            this.tableData[id].start_time = stamp;
          }
        });
      }
      setOrderStatus({
        uuid: this.tableData[id].uuid,
        status: status === "0" ? "1" : "2",
      }).then(({ code: code }) => {
        if (code === "200") {
          ElMessage.success({
            type: "success",
            message: "操作成功",
          });
          this.tableData[id].status = status === "0" ? "1" : "2";
        } else {
          ElMessage.error({
            type: "error",
            message: "操作失败",
          });
        }
      });
    },
  },
  created() {
    getOrderByDriver({
      driver_uuid: getData("driver"),
    }).then(({ data: res }) => {
      let order = res.orderlist || [];
      order.map((item) => {
        orderGasBill({
          order_uuid: item.uuid,
        }).then(({ data: res }) => {
          this.tableData.push(...res.gasBills);
        });
      });
    });
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
.input-line p {
  width: 110px;
  font-size: 18px;
}
.input-line span {
  font-size: 18px;
}
</style>