<template>
  <div class="login">
    <div class="login-bg">
      <img :src="imgUrl" width="100%" height="100%" alt="背景图片"/>
    </div>
    <div class="login-part">
      <div class="yunshu">云    书</div>
      <el-form>
        <div class="inputElement">
          <el-input prefix-icon="el-icon-s-custom" v-model="loginForm.name" placeholder="用户名"></el-input>
        </div>
        <br/>
        <div class="inputElement">
          <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </div>
        <br/>
        <div style="display: flex;align-items: center;justify-content: center;">
          <el-button class="login-bt" type="primary" @click="submit">进  入</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      imgUrl: 'http://qzivuragp.hn-bkt.clouddn.com/login-bg.jpg',
      loginForm:{
        name: "xr",
        password: "xr"
      }
  }
  },
  created() {
  },
  methods:{
    submit(){
      let params = new URLSearchParams();
      params.append("name",this.loginForm.name)
      params.append("password",this.loginForm.password)
      axios.post('http://localhost:8087/login',params).then((response)=>{
        if(response.data.code === 200){
          // localStorage.setItem('name',_this.loginForm.name)
          this.$router.push("/RecommendPage");
          this.$notify({
            message: '登录成功!',
            type: 'success'
          });
        }else {
          this.$notify({
            message: '用户名或密码错误,登录失败!',
            type: 'warning'
          });
        }
      })
    }
  }
}
</script>

<style scoped>
.login-part{
  position:absolute;
  /*定位方式绝对定位absolute*/
  top:50%;
  left:50%;
  /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
  transform:translate(-50%,-50%);
  /*实现块元素百分比下居中*/
  width:450px;
  padding:50px;
  background: rgba(0,0,0,.5);
  /*背景颜色为黑色，透明度为0.8*/
  box-sizing:border-box;
  /*box-sizing设置盒子模型的解析模式为怪异盒模型，
  将border和padding划归到width范围内*/
  box-shadow: 0px 15px 25px rgba(0,0,0,.5);
  /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
  border-radius:15px;
  /*边框圆角，四个角均为15px*/
}
.login-part .yunshu{
  margin:0 0 30px;
  padding:0;
  color: #88cdc7;
  font-family: "华文行楷";
  font-size: 60px;
  text-align:center;
  /*文字居中*/
}
.login-part .inputbox{
  position:relative;
}
.login-part .inputElement input{
  width: 100%;
  padding:10px 0;
  font-size:16px;
  color:#fff;
  letter-spacing: 3px;
  /*字符间的间距1px*/
  margin-bottom: 30px;
  border:none;
  border-bottom: 1px solid #fff;
  outline:none;
  /*outline用于绘制元素周围的线
  outline：none在这里用途是将输入框的边框的线条使其消失*/
  background: transparent;
  /*背景颜色为透明*/
}

.login{
  width:100%;
  height:100%;
}
.login-bg{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
/*改变input里的字体颜色*/
/deep/input::-webkit-input-placeholder {
 color: #8de8c5;
 font-size: 15px;
}
/*改变input框颜色*/
/deep/.el-input__inner {
  background-color: transparent !important;
  border: 0;
  color: #B5FFF8;
  border-bottom: 2px solid#B5FFF8;
}
.login-bt{
  /*font-family:"Hiragino Sans GB";*/
  font-family: "华文行楷";
  font-size: 30px;
  color: #8de8c5;
  background-color: transparent !important;
  border: 0;
  border-left: 2px solid#B5FFF8;
  border-right: 2px solid#B5FFF8;
}

</style>
