<template>
  <div>
    <el-container>
      <el-aside class="aside" width="200px">
        <img :src="logo_url" onclick="javascript:location.href='http://www.baidu.com'" style="height: 200px;border-radius: 15%"/>
        <el-button class="class_bt" @click="bt_class='全部';selectAllBook()">全部</el-button>
        <el-button class="class_bt" @click="bt_class='都市';class_bt(1)">都市</el-button>
        <el-button class="class_bt" @click="bt_class='武侠';class_bt(2)">武侠</el-button>
        <el-button class="class_bt" @click="bt_class='修真';class_bt(3)">修真</el-button>
        <el-button class="class_bt" @click="bt_class='搞笑';class_bt(4)">搞笑</el-button>
        <el-button class="class_bt" @click="bt_class='玄幻';class_bt(5)">玄幻</el-button>
        <el-button class="class_bt" @click="bt_class='科幻';class_bt(6)">科幻</el-button>
        <el-button class="class_bt" @click="bt_class='末日';class_bt(7)">末日</el-button>
        <el-button class="class_bt" @click="bt_class='恐怖';class_bt(8)">恐怖</el-button>
      </el-aside>
      <el-container>
        <el-header class="main">
          <!--热度排序-->
          <div style="display: inline-block;">
            <el-button  class="head_bt" @click="sortByHot();drawer_hot=true" type="danger" style="margin-left: 16px;">
              热度排序
            </el-button>
            <el-drawer
                title="热度排序"
                :visible.sync="drawer_hot"
                :direction="direction_hot"
                :before-close="handleClose">
              <el-table
                  :data="book_list_hot"
                  style="width: 100%">
                <el-table-column
                    prop="pic_url"
                    label="图片"
                    width="120">
                  <template slot-scope="scope">
                    <img :src="scope.row.pic_url" style="height: 80px;border-radius: 50%"/>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="名字"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="hot"
                    label="热度"
                    width="80">
                </el-table-column>
              </el-table>
            </el-drawer>
          </div>
          <!--新增书籍-->
          <div class="table">
            <div class="handle-box">
              <el-button class="el-icon-upload2" type="primary" size="mini" @click="DialogVisible = true">新增书籍</el-button>
            </div>
            <el-dialog title="新增书籍" :visible.sync="DialogVisible" width="400px" center>
              <el-form ref="ExistingSystem" label-width="80px"
                       action="" id="tf">
                <div style="margin-bottom: 15px">
                  <label>作者编号</label>
                  <el-input clearable style="width: 250px;"></el-input>
                </div>
                <div style="margin-bottom: 15px">
                  <label>作者名字 </label>
                  <el-input clearable style="width: 250px;"></el-input>
                </div>
                <div style="margin-bottom: 15px">
                  <label>书籍名称 </label>
                  <el-input clearable style="width: 250px;"></el-input>
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
              </el-form>
              <span class="center">
                <el-button size="mini" type="success" @click="addExistingSystem();DialogVisible = false">确定</el-button>
                <el-button size="mini" type="info" @click="DialogVisible = false">取消</el-button>
              </span>
            </el-dialog>
          </div>
          <!--字数排序-->
          <div style="display: inline-block;">
            <el-button class="head_bt" @click="sortByCount();drawer_count = true" type="success" style="margin-left: 16px;">
              字数排序
            </el-button>
            <el-drawer
                title="字数排序"
                :visible.sync="drawer_count"
                :direction="direction_count"
                :before-close="handleClose">
              <el-table
                  :data="book_list_count"
                  style="width: 100%">
                <el-table-column
                    prop="pic_url"
                    label="图片"
                    width="120">
                  <template slot-scope="scope">
                    <img :src="scope.row.pic_url" style="height: 80px;border-radius: 50%"/>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="名字"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="author"
                    label="作者"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="count"
                    label="字数(k)"
                    width="80">
                </el-table-column>
              </el-table>
            </el-drawer>
          </div>
        </el-header>
        <el-main class="main">
          <div style="display: flex; justify-content: center; flex-wrap: wrap">
            <div v-for="item in book_list_all" style="display: flex;
                                                      width: 25%;
                                                      margin-top: 25px;
                                                      margin-bottom: 25px;
                                                      align-items: center;
                                                      justify-content: center">
              <div class="vfor-div">
                <img class="book_picture" :src="item.pic_url" @click="picture_jump(item.authorId,item.author,item.name)"/>
                <span style="font-size: 2vw">{{item.name}}</span>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {genUpToken} from "@/assets/js/qiniuToken";

  export default {
  data() {
    return {
      drawer_hot: false,
      drawer_count: false,
      DialogVisible: false,       //添加弹窗是否显示
      editVisible: false,         //编辑弹窗是否显示
      direction_hot: 'ltr',
      direction_count: 'rtl',
      bt_class: "全部",
      currentPage: 1, //初始页
      pagesize: 4, //每页显示的数据
      logo_url: "http://qzivuragp.hn-bkt.clouddn.com/logo_tq.png",
      book_list_hot:[{
        name: "XXXX",
        author: "XXX",
        hot: "X",
        pic_url: "XXX",
      }],
      book_list_count:[{
        name: "XXXX",
        author: "XXX",
        hot: "X",
        pic_url: "XXX",
      }],
      book_list_all:[{
        id: "XX",
        name: "XXX",
        author: "XX",
        authorId: "X",
        hot: "----",
        count: "----",
        pic_url: "pic_url",
        down_url: "down_url",
        category: "XXX"
      }],
      postData: {
        token:  "",
      },
    };
  },
  created() {
    this.selectAllBook()
  },
  methods: {
    //抽屉弹窗关闭
    handleClose(done) {
      done();
    },
    selectAllBook(){
      const _this = this
      axios.get('http://localhost:8087/book/findAll').then((response)=>{
        _this.book_list_all = response.data
      })
    },
    sortByHot(){
      const _this = this
      console.log(this.bt_class)
      let params = new URLSearchParams();
      params.append("bt_class",this.bt_class)
      axios.post('http://localhost:8087/book/sortByHot',params).then((response)=>{
        console.log(response.data)
        _this.book_list_hot = response.data
      })
    },
    sortByCount(){
      const _this = this
      console.log(this.bt_class)
      let params = new URLSearchParams();
      params.append("bt_class",this.bt_class)
      axios.post('http://localhost:8087/book/sortByCount',params).then((response)=>{
        _this.book_list_count = response.data
      })
    },
    class_bt(int){
      if(int==1){this.selectBookByClass("都市")}
      else if(int==2){this.selectBookByClass("武侠")}
      else if(int==3){this.selectBookByClass("修真")}
      else if(int==4){this.selectBookByClass("搞笑")}
      else if(int==5){this.selectBookByClass("玄幻")}
      else if(int==6){this.selectBookByClass("科幻")}
      else if(int==7){this.selectBookByClass("末日")}
      else if(int==8){this.selectBookByClass("恐怖")}
    },
    selectBookByClass(string){
      let params = new URLSearchParams();
      params.append("class",string)
      const _this = this
      axios.post('http://localhost:8087/book/selectBookByClass',params).then((response)=>{
        _this.book_list_all = response.data
      })
    },
    picture_jump(authorId,author,name){
      this.$store.commit('saveAuthorId', authorId)
      this.$store.commit('saveAuthorName', author)
      this.$store.commit('saveBookName', name)
      this.$router.push('/Index')
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
    },
    addExistingSystem(){
      console.log('成功')
    },
  }
};
</script>

<style scoped>
.aside{
  height: 100vh;
  background-image: url("http://qzivuragp.hn-bkt.clouddn.com/bg_tq1.png");
}
.main{
  height: 80vh;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("http://qzivuragp.hn-bkt.clouddn.com/bg_tq2.jpg");
}
.head_bt{
  margin-top: 10px;
}
.class_bt{
  margin: 10px;
  border: 0px;
  background-color: #008CBA;
  color: white;
  font-size: 15px;

  position: relative;
  /*隐藏溢出的径向渐变背景*/
  overflow: hidden;
}
.class_bt:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  /*设置径向渐变*/
  background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform .3s, opacity .5s;
}
.class_bt:active:after {
  transform: scale(0, 0);
  opacity: .3;
  /*设置初始状态*/
  transition: 0s;
}
.class_bt:hover{
  background-color: #045158;
}

.book_picture{
  margin-top: 10px;
  width: 40%;
  border-radius: 50%
}
.book_picture:hover{
  transform: scale(1.2) rotate(360deg);/*设置缩放、旋转角度*/
  transition: all 0.225s linear 0.2s;/*设置动画时间*/
}

.vfor-div{
  display: flex ;
  /*display: inline-block;*/
  margin: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /*background-color: #008CBA;*/
}
.center{
  display: flex;
  align-items: center;        /* 垂直居中 */
  justify-content: center;    /* 水平居中 */
  margin-top: 30px;
}
</style>
