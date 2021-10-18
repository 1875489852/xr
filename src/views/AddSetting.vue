<template>
  <div class="table">
    <div class="handle-box">
      <el-button class="el-icon-upload2" type="primary" size="mini" @click="DialogVisible = true">新增设定</el-button>
    </div>
    <el-dialog title="新增设定" :visible.sync="DialogVisible" width="400px" center>
      <el-form :model="ExistingSystem" ref="ExistingSystem" label-width="80px"
               action="" id="tf">
        <div style="margin-bottom: 15px">
          <label>作者编号 </label>
          <el-input v-model="ExistingSystem.authorId" clearable style="width: 250px;"></el-input>
        </div>
        <div style="margin-bottom: 15px">
          <label>作者名字 </label>
          <!--filterable可搜索  clearable可删除  multiple可多选-->
          <el-select v-model="AAA" filterable clearable style="width: 250px;" @change="" placeholder="请选择">
            <el-option
                v-for="item in options1"
                :key="item.author"
                :label="item.author"
                :value="item.author">
            </el-option>
          </el-select>
        </div>
        <div style="margin-bottom: 15px">
          <label>书籍名称 </label>
          <el-select v-model="BBB" filterable clearable style="width: 250px;" @change="" placeholder="请选择">
            <el-option
                v-for="item in options2"
                :key="item.book"
                :label="item.book"
                :value="item.book">
            </el-option>
          </el-select>
        </div>
        <div style="margin-bottom: 15px">
          <label>设定名称 </label>
          <el-input v-model="ExistingSystem.systemName" style="width: 250px;" clearable></el-input>
        </div>
        <div style="margin-bottom: 15px; text-align: center">
          <el-upload
              action="http://upload-z2.qiniup.com"
              :on-success="uploadSuccess"
              :limit="1"
              list-type="picture"
              :data="postData"
              accept=".png, .jpg, .jpeg">
            <el-button size="small" type="primary">图片上传</el-button>
          </el-upload>
        </div>
<!--        <div style="margin-bottom: 10px">-->
<!--          <label>图片地址 </label>-->
<!--          <el-input v-model="imageUrl" style="width: 250px;" readOnly></el-input>-->
<!--        </div>-->
      </el-form>
      <span class="center">
        <el-button size="mini" type="success" @click="addExistingSystem();DialogVisible = false">确定</el-button>
        <el-button size="mini" type="info" @click="DialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {genUpToken} from "../assets/js/qiniuToken";
export default {
  data(){
    return{
      DialogVisible: false,       //添加弹窗是否显示
      editVisible: false,         //编辑弹窗是否显示
      ExistingSystem:{      //添加框
        authorId: '',
        authorName: '',
        systemName: '',
        systemImg: '',
        bookName: '',
      },
      options1: [{
        authorId: '1',
        author: '天蚕土豆'
      }, {
        authorId: '2',
        author: '唐家三少'
      }, {
        authorId: '3',
        author: '齐佩甲'
      }, {
        authorId: '4',
        author: '爱潜水的乌贼'
      }, {
        authorId: '5',
        author: '咬狗'
      }, {
        authorId: '6',
        author: '伟岸蟑螂'
      }, {
        authorId: '7',
        author: '刘慈欣'
      }, {
        authorId: '8',
        author: '跃千愁'
      }],
      options2: [{
        bookId: '1',
        book: '斗破苍穹'
      }, {
        bookId: '2',
        book: '斗罗大陆'
      }],
      AAA: '',
      BBB: '',
      imageUrl: "",
      postData: {
        token:  "",
      },
    }
  },
  created() {
    this.makeToken()
  },
  methods:{
    addExistingSystem(){
      this.ExistingSystem.authorName = this.AAA;
      this.ExistingSystem.bookName = this.BBB;
      this.ExistingSystem.systemImg = this.imageUrl;
      console.log(this.ExistingSystem)
      axios.post('http://localhost:8087/addExistingSystem',this.ExistingSystem).then((response)=>{
        this.$notify({
          message: "添加成功",
          type: 'success'
        });
      })
    },
    makeToken(){
      var token;
      var policy = {};
      var bucketName = '2018tq';
      var AK ='8LTVNBnNCAD9toFxYOpw2gaiS5q3FuqSjN9cYmZW';
      var SK = 'NtCVNWoPXtQBK0CJmWGLT1Ay9_vovPzYfXKhdVZ3';
      var deadline = Math.round(new Date().getTime() / 1000) + 3600;
      policy.scope = bucketName;
      policy.deadline = deadline;
      token=genUpToken(AK, SK, policy);
      this.postData.token=token;
    },
    uploadSuccess(res) {
      this.imageUrl = "http://qziqr0xjv.hn-bkt.clouddn.com/" + res.key;
      console.log(this.imageUrl)
      this.EncodedEntryURI = res.key;
    }
  }
}
</script>

<style scoped>
.center{
  display: flex;
  align-items: center;        /* 垂直居中 */
  justify-content: center;    /* 水平居中 */
  margin-top: 30px;
}
</style>
