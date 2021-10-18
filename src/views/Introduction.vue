<template>
  <div style="display: flex;justify-content: space-around">
    <div style="text-align:center;width:20px; line-height:30px; font-size: 24px;
                font-family: 华文新魏">
      {{leftMsg}}
    </div>
    <div class="bg">
      <el-image :src=img fit="contain"></el-image>
      <div style="position: absolute;top:46%; left:40%">
        <div class="title">
          {{bookName}}
        </div>
      </div>
    </div>
    <div style="text-align:center;width:20px; line-height:30px; font-size: 24px;
                font-family: 华文新魏">
      {{rightMsg}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'Introduction',
  data(){
    return {
      bookName:'',
      leftMsg:'',
      rightMsg:'',
      img:'',
      json:{
        t:{
          authorId:this.$store.state.authorId,
          authorIdName:this.$store.state.authorName
        }
      }
    }
  },
  created() {
    const _this = this
    axios.post('http://localhost:8087/getIntroductionByAuthorId', this.json).then(function(resp){
      console.log(resp.data)
      _this.bookName = resp.data.bookName
      _this.leftMsg = resp.data.leftMsg
      _this.rightMsg = resp.data.rightMsg
      _this.img = resp.data.img
    })
  }
}
</script>

<style scoped>
.bg{
  position:relative;
  width: 720px;
  height: 450px;
}
.title{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-family: 华文新魏;
  color: aqua;
}

</style>
