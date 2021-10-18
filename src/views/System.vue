<template>
  <div>
    <div style="display: flex">
      <div class="title">
        <span style="text-align: center">{{this.$route.query.systemName}}</span>
      </div>
      <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini"
                 style="width: auto" @click="addDetailSystem">
        增加
      </el-button>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 20px">
      <el-table-column width="100px"
          prop="detailName"
          label="名字">
      </el-table-column>
      <el-table-column
          prop="desc"
          label="简介">
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  name: "system",
  data(){
    return {
      tableData: [{
        detailName: '',
        desc: '',
      }],
      json:{
        t:{
          bookName:this.$route.query.bookName,
          systemName:this.$route.query.systemName,
        }
      },
    }
  },
  created() {
    const _this = this
    axios.post('http://localhost:8087/findSystemByBookNameAndSystemName', this.json).then((resp) => {
      console.log(resp.data)
      _this.tableData = resp.data
    })
  },
  methods:{
    handleEdit(row) {
      this.$router.push({
        path: '/updateSystem',
        query:{
          id:row.id,
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.post('http://localhost:8087/delSystemById', {id: row.id})
        // window.location.reload()
        this.reload()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addDetailSystem(){
      this.$router.push({
        path: '/AddSystem',
        query:{
          systemName: this.$route.query.systemName,
          bookName: this.$route.query.bookName,
        }
      })
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  align-items: center;        /* 垂直居中 */
  justify-content: center;    /* 水平居中 */
  width: 90%;
  font-family: 华文新魏;
  font-size: 32px;
}
.bg{
  background-image: url("http://qzivuragp.hn-bkt.clouddn.com/4.jpeg");
  backgroundRepeat:"no-repeat";
  backgroundSize:"100% 100%";
}
</style>
