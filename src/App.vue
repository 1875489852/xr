<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<style>

</style>

<script>
export default {
  created() {
    //在页面加载时读取sessionStorage里的状态信息
    sessionStorage.getItem("Msg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(sessionStorage.getItem("Msg"))));

    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("Msg",JSON.stringify(this.$store.state))
    })
  }
}
</script>
