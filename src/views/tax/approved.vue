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
            data.is_approved &&
            (!search ||
              data.uuid.includes(search) ||
              data.deadline.includes(search) ||
              data.status.includes(search))
        )
      "
      style="width: 100%"
      stripe
      border
    >
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column align="center" label="订单编号" prop="uuid" />
      <el-table-column align="center" label="油票状态">
        <template #default="scope">
          <div>
            {{
              scope.row.bill_uploaded
                ? `已上传（${scope.row.gasBills.length}张）`
                : "未上传"
            }}
          </div>
        </template>
      </el-table-column>
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
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button
            auto-insert-space
            type="primary"
            @click="handleConfirm(scope.row)"
            >查看</el-button
          >
          <el-popconfirm
            :title="'您确定要驳回该订单吗？'"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleCancel(scope.row)"
          >
            <template #reference>
              <el-button auto-insert-space>驳回</el-button>
            </template>
          </el-popconfirm>
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
        <p>油票状态：</p>
        <span>{{
          detail.bill_uploaded
            ? `已上传（${detail.gasBills.length}张）`
            : "未上传"
        }}</span>
      </div>
      <div class="input-line" v-for="(item, i) in detail.gasBills" :key="i">
        <p>第{{ i + 1 }}张油票：</p>
        <span>
          {{ item.cost }}（单位为分，类型为{{
            type[parseInt(item.type)]
          }}）</span
        >
      </div>
      <div class="input-line">
        <p>订单txid：</p>
        <span>{{ detail.tx_hash }}</span>
      </div>
      <div class="input-line" v-for="(item, i) in detail.gasBills" :key="i">
        <p>第{{ i + 1 }}张油票txid：</p>
        <span>{{ detail.gasBills[i].tx_hash }}</span>
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
import { getOrder, setOrderApproved, orderGasBill } from "@/api/index";
import { handleDate } from "@/utils/date";
export default {
  data() {
    return {
      centerDialogVisible: false,
      search: "",
      detail: {},
      tableData: [],
      type: ["油票", "电票"],
      stateMap: ["未开始", "进行中", "已完成"],
    };
  },
  methods: {
    handleDate(date) {
      return handleDate(date);
    },
    handleConfirm(item) {
      this.detail = item;
      this.centerDialogVisible = true;
    },
    handleCancel(item) {
      setOrderApproved({
        uuid: item.uuid,
        status: false,
      }).then(({ code: code }) => {
        if (code === "200") {
          ElMessage.success({
            message: "驳回成功!",
          });
          item.is_approved = false;
          this.$forceUpdate();
        } else {
          ElMessage.error({
            message: "驳回失败!",
          });
        }
      });
    },
  },
  created() {
    getOrder().then(({ data: res }) => {
      let data = res.orderlist || [];
      let promiseArr = [];
      data.map((item) => {
        promiseArr.push(
          orderGasBill({
            order_uuid: item.uuid,
          }).then(({ data: res }) => {
            item.gasBills = res.gasBills || [];
          })
        );
      });
      Promise.all(promiseArr).then(() => {
        this.tableData = data;
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