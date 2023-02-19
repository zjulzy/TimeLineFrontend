import { tokenState } from "~~/composables/state"
import { ElNotification, ElMessageBox } from 'element-plus'

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = tokenState();
    console.log("token is", token.value)
    if (token.value == "") {
      ElNotification("请先登录捏")

      return navigateTo("/login")
    }
    return 
  }
  else{
    return navigateTo('/')
  }
})