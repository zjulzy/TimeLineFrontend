<!--default.vue文件-->
<template>
    <el-container >
        <el-header class="head" style="padding: 0;">
            <Topbar />
        </el-header>
        <el-main id='container'>
            <slot />
        </el-main>

        <el-footer style="background-color: gray;">
            <Footer></Footer>
        </el-footer>

    </el-container>
</template>

<script setup lang="ts">
import Topbar from '../componenets/topbar.vue';
import Footer from '../componenets/footer.vue';

</script>
<style scoped>
#container{
    margin-left: 10%;
    margin-right: 10%;
    min-height: 100vh;
    background-color:rgba(246,244,245,0.8);
}
body{
    min-height: 100vh;
}
</style>