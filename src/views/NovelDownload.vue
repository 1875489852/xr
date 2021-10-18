<template>
  <div class="novelDown">
    <div class="img">
      <el-image style="width: 850px;height: 400px"
                :src="img"></el-image>
    </div>
    <div style="margin-top: 30px; display: flex; align-items: center;
                justify-content: center">
      <el-link :href=downloadUrl icon="el-icon-download" style="font-size: 20px">正版小说全本TXT下载</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NovelDownload',
  data(){
    return {
      downloadUrl:'',
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
    axios.post('http://localhost:8087/findNovelDownloadByAuthorId', this.json).then(function(resp){
      console.log(resp.data.url)
      _this.downloadUrl = resp.data.downloadUrl
      _this.img = resp.data.img
    })
  }
}
</script>

<style scoped>
.novelDown{
  display: flex;
  flex-direction: column;
}
.img{
  display: flex;
  justify-content: center;    /* 水平居中 */
  align-items: center;        /* 垂直居中 */
}
</style>
