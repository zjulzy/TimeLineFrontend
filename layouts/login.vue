<!--login.vue文件-->
<template>
    <el-container>
        <el-header class="head" style="padding: 0;">
            <Topbar />
        </el-header>
        <el-main id='center-form'>
            <slot />
        </el-main>
    </el-container>
</template>
<script setup lang="ts">
import Topbar from '../componenets/topbar.vue';

</script>

<style scoped>
#center-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 80vh;
}

</style>
