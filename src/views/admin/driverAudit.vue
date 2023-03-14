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
            data.name.includes(search) ||
            data.idNumber.includes(search)
        )
      "
      style="width: 100%"
      stripe
      border
    >
      <el-table-column align="center" type="index" label="序号" width="50" />
      <el-table-column align="center" label="姓名" prop="name" />
      <el-table-column align="center" label="身份证" prop="idNumber" />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-popconfirm
            title="您确定要同意吗？"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleConfirm(scope.row.id)"
          >
            <template #reference>
              <el-button auto-insert-space type="primary">同意</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
            title="您确定要驳回吗？"
            confirm-button-text="确认"
            cancel-button-text="取消"
            @confirm="handleCancel(scope.row.id)"
          >
            <template #reference>
              <el-button auto-insert-space>驳回</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      tableData: [
        {
          id: 1,
          name: "Admin司机",
          idNumber: "123456789012345678",
        },
        {
          id: 2,
          name: "Boss司机",
          idNumber: "234567890123456789",
        },
        {
          id: 3,
          name: "Cat司机",
          idNumber: "345678901234567890",
        },
        {
          id: 4,
          name: "Dog司机",
          idNumber: "456789012345678901",
        },
      ],
    };
  },
  methods: {
    handleConfirm(id) {
      console.log(id);
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
</style>