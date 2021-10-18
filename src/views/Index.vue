<template>
  <div>
    <el-container style="height: 577px; border: 1px solid #eee">
      <el-header height="56px" class="el-header">
        <div class="logo_div" style="background-color: black">
          <el-image class="logo"
                    fit="contain"
                    src="http://qzivuragp.hn-bkt.clouddn.com/logo2.png"></el-image>
          <span style="font-size: 30px; font-family:华文新魏;color: white">云书</span>
        </div>
        <el-image class="zd_img" src="http://qzivuragp.hn-bkt.clouddn.com/zd1.png"
                  fit="contain" @click="collapseStatus"></el-image>
        <div class="yonghulan">
          <div class="sousuo">
            <i class="el-icon-search"></i>
          </div>
          <div class="xiaoxizhongxin">
            <el-image class="xiaoxizhongxin_img"
                      src="http://qzivuragp.hn-bkt.clouddn.com/xxzx3.png" fit="contain"></el-image>
          </div>
          <div class="yonghu">
            <el-image class="user_img" src="http://qzivuragp.hn-bkt.clouddn.com/lzc.jpg" fit="contain"></el-image>
            绿荫树
          </div>
          <div class="yuyan">
            <el-image class="yuyan_img" src="http://qzivuragp.hn-bkt.clouddn.com/yuyan2.png" fit="contain"></el-image>
            简体中文
          </div>
        </div>

      </el-header>
      <el-container>
        <el-aside class="el-aside" width="auto">
          <el-menu router
                   :default-active="$route.path"
                   :collapse="isCollapse"
                   background-color="#137b50"
                   text-color="#fff"
                   active-text-color="#f31bae"
                   class="el-menu">
            <el-submenu :index="1">
              <template slot="title">
                <el-image style="width: 32px;height: 32px;margin-right: 15px"
                          src="http://qzivuragp.hn-bkt.clouddn.com/grjj.png"></el-image>
                <span>简介</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/Introduction">
                  <el-image style="width: 24px;height: 24px;margin-right: 15px"
                            src="http://qzivuragp.hn-bkt.clouddn.com/xsjj.png"></el-image>
                  小说简介
                </el-menu-item>
                <el-menu-item index="/NovelTimeline">
                  <el-image style="width: 24px;height: 24px;margin-right: 15px"
                            src="http://qzivuragp.hn-bkt.clouddn.com/sjx.png"></el-image>
                  小说时间线
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu :index="2">
              <template slot="title">
                <el-image style="width: 32px;height: 32px;margin-right: 15px"
                          src="http://qzivuragp.hn-bkt.clouddn.com/xytx.png"></el-image>
                <span>全书体系</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/ExistingSystem">
                  <el-image style="width: 24px;height: 24px;margin-right: 15px"
                            src="http://qzivuragp.hn-bkt.clouddn.com/xytx2.png"></el-image>
                  现存体系
                </el-menu-item>
                <el-menu-item index="/AddSetting">
                  <el-image style="width: 24px;height: 24px;margin-right: 15px"
                            src="http://qzivuragp.hn-bkt.clouddn.com/xzsd.png"></el-image>
                  新增设定
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/Author">
              <el-image style="width: 32px;height: 32px;margin-right: 15px"
                        src="http://qzivuragp.hn-bkt.clouddn.com/zzjj.png"></el-image>
              <span slot="title">作者简介</span>
            </el-menu-item>
            <el-menu-item index="/NovelDownload">
              <el-image style="width: 32px;height: 32px;border-radius:50%;margin-right: 15px"
                        src="http://qzivuragp.hn-bkt.clouddn.com/xsxz.png"></el-image>
              <span slot="title">小说下载</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="el-main">
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.yuyan{
  display: flex;
  align-items: center;        /* 垂直居中 */
  justify-content: center;    /* 水平居中 */
  height: 100%;
  width: 100px;
  background-color: white;
  font-size: 16px;
  margin-right: -20px;
  font-family: "华文新魏";
}
.xiaoxizhongxin{
  display: flex;
  align-items: center;        /* 垂直居中 */
  justify-content: center;    /* 水平居中 */
  width: 50px;
  margin-right: 15px;
}
.xiaoxizhongxin_img{
  background-color: white;
  height: 24px;
  width: 24px;
}
.logo_div{
  display: flex;
  align-items: center;        /* 垂直居中 */
  justify-content: center;    /* 水平居中 */
  height: 56px;
  width: 200px;
  margin-left: -20px;
}
.zd_img{
  width: 36px;
  height: 36px;
  margin-left: -650px;
}
.logo{
  width: 36px;
  height: 36px;
  border-radius:50%;
  margin-right: 15px
}
.sousuo{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  margin-right: 15px;
}

.user_img{
  width: 24px;
  height: 24px;
  border-radius:50%;
  margin-right: 5px;
}
.yuyan_img{
  width: 24px;
  height: 24px;
  border-radius:50%;
}
.yonghu{
  display: flex;
  background-color: white;
  height: 100%;
  width: 100px;
  align-items: center;        /* 垂直居中 */
  justify-content: center;    /* 水平居中 */
  font-size: 16px;
  margin-right: 15px;
  font-family: "华文新魏";
}

.yonghulan{
  display: flex;
  justify-content:flex-end;
}

.el-header {
  display: flex;
  justify-content:space-between;
  align-items: center;        /* 垂直居中 */
  background-color: white;
}

.el-aside{
  background-color: #137b50;
}

.el-menu:not(.el-menu--collapse) {
  width: 200px;
}

.el-main{
  background-color: white;
}
</style>

<script>
export default {
  provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      isCollapse: false,
      isRouterAlive: true,
    }
  },
  methods: {
    collapseStatus() {
      this.isCollapse = !this.isCollapse;
    },
    reload(){
      this.isRouterAlive = false
      const _this = this
      this.$nextTick(function (){
        _this.isRouterAlive = true
      })
    }
  }
}
</script>
