<template>
    <client-only>
        <!-- <client-only> -->
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
            <el-menu-item index="1">
                <nuxt-link to="/">泰姆莱恩</nuxt-link>
            </el-menu-item>
            <!-- <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
                <el-sub-menu index="2-4">
                    <template #title>item four</template>
                    <el-menu-item index="2-4-1">item one</el-menu-item>
                    <el-menu-item index="2-4-2">item two</el-menu-item>
                    <el-menu-item index="2-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-sub-menu> -->
            <el-menu-item index="3" v-if="!isLogin">
                <nuxt-link to="/login">登录</nuxt-link>
            </el-menu-item>
            <el-menu-item index="3" @click="logout" v-if="isLogin">
                登出
            </el-menu-item>
            <el-menu-item index="4">
                <nuxt-link to="/dashboard">控制台</nuxt-link>
            </el-menu-item>
        </el-menu>
        <!-- </client-only> -->
    </client-only>


</template>

<script setup lang="ts">
import { is } from '@babel/types';
import { ref,computed } from 'vue';
import { tokenState } from "~~/composables/state"

const token = tokenState();
let isLogin = ref(false);
isLogin = computed(()=>{
    return !(token.value=="");
})

const activeIndex = ref('1');
const activeIndex2 = ref('1');
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
}

const logout = async()=>{
    token.value = "";
    navigateTo('/');
}
</script>

<style scoped>

</style>