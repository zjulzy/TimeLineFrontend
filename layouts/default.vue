<!--default.vue文件-->
<template>
    <main class="py-2 px-10 text-center">
        <Topbar />
        <slot />
        <div class="mt-5 mx-auto text-center opacity-25 text-sm">
        </div>
        <Footer></Footer>
    </main>
</template>

<script setup lang="ts">
import Topbar from '../componenets/topbar.vue';
import Footer from '../componenets/footer.vue';
</script>
