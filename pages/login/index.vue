<template>
    <NuxtLayout>
        <el-card shadow="always" id="center-box">
            <el-form  :model="form" label-width="120px">
                <el-form-item label="用户名">
                    <el-input v-model="form.user" />
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="form.passwd" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submit_login">邓露</el-button>

                </el-form-item>
            </el-form> 
        </el-card>

    </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { tokenState } from "~~/composables/state"
import { ElNotification, ElMessageBox } from 'element-plus'
import {login} from '~~/utils/api'
const token = tokenState();

definePageMeta({
    layout: 'login'
})

// do not use same name with ref
const form = reactive({
    user: "",
    passwd: ""
})
ElNotification({ message: "请先登录捏！没有账户的话先注册捏！" });

const submit_login = async () => {
    const { data, pending, error, refresh } = await login({
        user: form.user,
        passwd: form.passwd
    })
    let result: response = JSON.parse(data.value)
    if (result.action_result) {
        console.log("登陆成功：",result)
        token.value = result.result_info.action_token;
        navigateTo("./dashboard");
    } else {
        console.log("登陆失败：",result);
        ElNotification({ message: "傻逼记错密码了" });
        form.user = "";
        form.passwd = "";
    }


}

</script>

<style scoped>
#center-box {
    background-color: white;
    min-width: 40%;
    align-self:center;
}
</style>