<template>
  <div style="display: flex; flex-direction: column">
    <div style="display: flex;height: 225px">
      <div>
        <el-image style="width: 150px;height: 225px"
                  :src="authorImg"></el-image>
      </div>
      <div style="margin-left: 10px;display: flex; flex-direction: column;justify-content: space-around">
        <div style="font-size: 20px">
          <span>作者名字:{{authorName}}</span>
          <a :href=baidubaikeUrl style="margin-left: 500px">百度百科-{{authorName}}</a>
        </div>
        <div>{{msg1}}</div>
        <div>{{msg2}}</div>
        <div>{{msg3}}</div>
        <div>{{msg4}}</div>
      </div>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 20px">
      <el-table-column
          prop="time"
          label="创作时间">
      </el-table-column>
      <el-table-column
          prop="bookName"
          label="书籍名称">
      </el-table-column>
      <el-table-column
          prop="type"
          label="书籍类型">
      </el-table-column>
      <el-table-column
          prop="status"
          label="书籍状态">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Author',
  data(){
    return {
      authorName:'',
      baidubaikeUrl:'',
      msg1:'',
      msg2:'',
      msg3:'',
      msg4:'',
      authorImg:'',
      tableData: [{
        time: '',
        bookName: '',
        type: '',
        status: ''
      }],
      jsonAuthorMsg:{
        t:{
          authorId:this.$store.state.authorId,
          authorName:this.$store.state.authorName
        }
      },
      jsonAuthorBook:{
        t:{
          authorId:this.$store.state.authorId,
          authorName:this.$store.state.authorName
        }
      }
    }
  },
  created() {
    const _this = this
    axios.post('http://localhost:8087/findAuthorMsgByAuthorId', this.jsonAuthorMsg).then(function(resp){
      _this.msg1 = resp.data.msg1
      _this.msg2 = resp.data.msg2
      _this.msg3 = resp.data.msg3
      _this.msg4 = resp.data.msg4
      _this.authorImg = resp.data.authorImg
      _this.authorName = resp.data.authorName
      _this.baidubaikeUrl = resp.data.baidubaikeUrl
    })
    axios.post('http://localhost:8087/findAuthorBookByAuthorId', this.jsonAuthorBook).then(function(resp){
      console.log(resp)
      _this.tableData = resp.data
    })
  }
}
</script>

<style scoped>

</style>
