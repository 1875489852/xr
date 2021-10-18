<template>
  <div style="display: flex; justify-content: center; flex-wrap: wrap;">
    <div v-for="item in ExistingSystem_list" style="display: flex;width: 25%;
         margin-top: 25px; margin-bottom: 25px; align-items: center;
         justify-content: center">
      <div style="display: flex ;flex-direction: column;
                  align-items: center; justify-content: center">
        <el-image class="donghua" :src="item.systemImg" @click="img_jump(item.systemName, item.bookName)"
                  style="width: 50%;border-radius: 50%;"/>
        <span style="font-size: 1.5vw; margin-top: 5px">{{item.systemName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExistingSystem',
  data(){
    return {
      ExistingSystem_list:[{
        systemName: '',
        authorName: '',
        systemImg: '',
        bookName: ''
      }],
      json:{
        t:{
          bookName:this.$store.state.bookName,
        }
      }
    }
  },
  created() {
    const _this = this
    axios.post('http://localhost:8087/findExistingSystemByBookName', this.json).then((resp) => {
      console.log(resp.data)
      _this.ExistingSystem_list = resp.data
    })
  },
  methods: {
    img_jump(systemName, bookName){
      this.$router.push({
        path:'/System/' + systemName,
        query:{
          systemName: systemName,
          bookName: bookName,
        }
      })
    }
  }
}
</script>

<style scoped>
.donghua:hover{
  transform: scale(1.1);/*设置缩放、旋转角度*/
  transition: all 0.2s linear 0.1s;/*设置动画时间*/
}

</style>
