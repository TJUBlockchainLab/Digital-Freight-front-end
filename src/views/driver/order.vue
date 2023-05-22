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
      <el-table-column align="center" label="订单编号" prop="uuid" />
      <el-table-column align="center" label="出发地" prop="original" />
      <el-table-column align="center" label="目的地" prop="destination" />
      <el-table-column align="center" label="开始时间">
        <template #default="scope">
          <div>
            {{
              scope.row.start_time ? handleDate(scope.row.start_time) : "暂无"
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="截止日期" prop="deadline" />
      <el-table-column align="center" label="状态">
        <template #default="scope">
          <div>{{ stateMap[parseInt(scope.row.status)] }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核状态">
        <template #default="scope">
          <div>{{ scope.row.is_approved ? "已审核" : "未审核" }}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <div class="flex-no-wrap">
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
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="centerDialogVisible"
      title="订单详情"
      width="40%"
      center
      :show-close="false"
    >
      <div class="input-line">
        <p>订单编号：</p>
        <span>{{ detail.uuid }}</span>
      </div>
      <div class="input-line">
        <p>出发地：</p>
        <span>{{ detail.original }}</span>
      </div>
      <div class="input-line">
        <p>目的地：</p>
        <span>{{ detail.destination }}</span>
      </div>
      <div class="input-line">
        <p>开始时间：</p>
        <span>{{
          detail.start_time ? handleDate(detail.start_time) : "暂无"
        }}</span>
      </div>
      <div class="input-line">
        <p>结束时间：</p>
        <span>{{ detail.deadline }}</span>
      </div>
      <div class="input-line">
        <p>状态：</p>
        <span>{{ stateMap[parseInt(detail.status)] }}</span>
      </div>
      <div class="input-line">
        <p>审核状态：</p>
        <span>{{ detail.is_approved ? "已审核" : "未审核" }}</span>
      </div>
      <div class="input-line">
        <p>订单txid：</p>
<a target="_blank" v-bind:href="'http://121.36.90.112:8001/tx/' + detail.tx_hash">{{ detail.tx_hash }}</a>
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
import { getOrderByDriver, setOrderBegin, setOrderStatus } from "@/api/index";
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
      p: "123"
    };
  },
  methods: {
    eClick(hash){
      let url="http://121.36.90.112:8001/tx/"
      let path=url+hash
      window.location.href=path
    },
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
      this.tableData = res.orderlist || [];
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
