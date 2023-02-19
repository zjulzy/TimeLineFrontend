<template>
    <NuxtLayout>
        <div>
            <mainpanel ref="panel"></mainpanel>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { query } from '@/utils/api'
import { provide, reactive } from 'vue';
import mainpanel from '../../componenets/mainpanel.vue';
import { tokenState } from "~~/composables/state";

definePageMeta({
    middleware: 'auth',
    layout: 'default'
})

let task_table: task[] = reactive([]);
const token = tokenState();
const action_token = token.value;

// 初始化页面人物列表
const { data, pending, error, refresh } = await query({
    action_token: action_token
})
let result:response = JSON.parse(data.value);

console.log("query结果",result);
task_table = reactive(result.result_info.tasks);

provide("tasks", task_table);

</script>

<style scoped>
/* #container {
    background-color:rgba(246,244,245,1);
} */
</style>