<template>
    <NuxtLayout>
        <div>
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                    <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>

            <p style="font-size:medium;">
                欢迎来到我们的在线时间管理网站！
                我们为您提供了一种简单有效的方法来管理您的时间。通过设置待办事项的时间和优先程度，您可以轻松构建出自己的日程表。
                我们的网站提供了清晰易用的界面，让您能够轻松访问您的待办事项，并跟踪您的进展。
                不再为繁重的工作和生活计划感到困惑，让我们的在线时间管理网站帮助您获得更多的时间和效率！
            </p>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})
</script>

<style scoped>

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>