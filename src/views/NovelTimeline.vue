<template>
  <div style="height: 480px" @click="create">
    <happy-scroll color="rgba(0,0,0,0.6)" size="4" resize bigger-move-h="end"
                  style="height: 100%; ">
      <div>
        <div ref="main">
          <div ref="content" v-for="item in list"
               class="myDiv">
            <div style="text-align:center; line-height:34px; width: 100%">
              {{ date_thing[item.id]['时间'] }}:&nbsp;{{ date_thing[item.id]['事件'] }}
            </div>
          </div>
        </div>
      </div>
    </happy-scroll>
  </div>
</template>

<script>
import { HappyScroll } from 'vue-happy-scroll'
import 'vue-happy-scroll/docs/happy-scroll.css'
export default{
  data () {
    return {
      tableData: [],
      fileContent: '',
      file: '',
      data: '',
      date_thing:[],
      list: [{
        id: "0"
      }],
      num: 0,
    }
  },
  created() {
    this.axios.get('http://qzivuragp.hn-bkt.clouddn.com/date_thing2.json').then(res=>{
      console.log(res.data);
      this.date_thing=res.data;
    })
  },
  methods: {
    create() {
      this.num++;
      this.list.push({
        id: this.num
      });
    }
  },
  components:{
    'happy-scroll': HappyScroll
  }
}
</script>

<style>
.myDiv{
  height: 34px;
  width:1030px;
  margin-top: 10px;
  margin-bottom: 10px;
  user-select: none;
  box-shadow: 2px 2px 2px 2px #e5e5e5   /*上边阴影 */
}
</style>
