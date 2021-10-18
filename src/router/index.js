import Vue from 'vue'
import VueRouter from 'vue-router'
import AddSetting from '@/views/AddSetting'
import Author from '@/views/Author'
import BookStructure from '@/views/BookStructure'
import ExistingSystem from '@/views/ExistingSystem'
import Introduction from '@/views/Introduction'
import NovelDownload from '@/views/NovelDownload'
import NovelTimeline from '@/views/NovelTimeline'
import Index from '@/views/Index'
import System from "@/views/System";
import UpdateSystem from "@/views/UpdateSystem";
import Login from "@/views/Login";
import RecommendPage from "@/views/RecommendPage";
import AddSystem from "@/views/AddSystem";


Vue.use(VueRouter)

const routes = [
  {
    path: '/Index',
    name: '简介',
    component: Index,
    redirect: '/Introduction',
    children: [
      {
        path: '/Introduction',
        name: '小说简介',
        component: Introduction
      },
      {
        path: '/NovelTimeline',
        name: '小说时间线',
        component: NovelTimeline
      },
      {
        path: '/BookStructure',
        name: '全书体系',
        component: BookStructure,
        children: [
          {
            path: '/ExistingSystem',
            name: '现存体系',
            component: ExistingSystem
          },
          {
            path: '/AddSetting',
            name: '新增设定',
            component: AddSetting
          }
        ]
      },
      {
        path: '/Author',
        name: '作者简介',
        component: Author,
      },
      {
        path: '/NovelDownload',
        name: '小说下载',
        component: NovelDownload,
      },
      {
        path: '/System/:systemName',
        name: '体系',
        component: System,
      },
      {
        path: '/UpdateSystem',
        name: '更新体系',
        component: UpdateSystem,
      },
      {
        path: '/AddSystem',
        name: '新增详细体系',
        component: AddSystem,
      },
    ]
  },
  {
    path: '/',
    name: '登录',
    component: Login,
  },
  {
    path: '/RecommendPage',
    name: '推荐页面',
    component: RecommendPage,
  },
]

const router = new VueRouter({
  routes
})

export default router
