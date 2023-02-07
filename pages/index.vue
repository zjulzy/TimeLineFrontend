<template>
    <div id ='container'>
        <mainpanel />
        <Footer></Footer>
    </div>
</template>

<script setup lang="ts">
import Footer from '~~/componenets/footer.vue';
import mainpanel from '~~/componenets/mainpanel.vue';
</script>

<style scoped>
    #container{
        margin-left: 20%;
        margin-right: 20%;
    }
</style>