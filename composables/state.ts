import { useState, useCookie } from "nuxt/app";


export const tokenState = () => useState<string>("token", () => {
    const action_token = ref("");
    if(process.client){
        action_token.value = ""
    }else{
        // 服务器端验证
    }
    return  action_token;
})


