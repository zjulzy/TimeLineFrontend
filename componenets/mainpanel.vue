<template>
    <Window />
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="add" name="first">
            <div>

                <el-form :model="form" label-width="120px">
                    <el-form-item label="任务名称">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="任务优先级">
                        <el-select v-model="form.priority" placeholder="plebu'cuoase select your zone">
                            <el-option label="慢条斯理" value=0 />
                            <el-option label="平波缓进" value=1 />
                            <el-option label="当要之务" value=2 />
                            <el-option label="急急急急" value=3 />
                            <el-option label="十万火急" value=4 />

                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务截止时间">
                        <el-col :span="11">
                            <el-date-picker v-model="form.date" type="date" placeholder="Pick a date" style="width: 100%" />
                        </el-col>
                    </el-form-item>
                    <!-- <el-form-item label="Activity type">
                                            <el-checkbox-group v-model="form.type">
                                                <el-checkbox label="Online activities" name="type" />
                                                <el-checkbox label="Promotion activities" name="type" />
                                                <el-checkbox label="Offline activities" name="type" />
                                                <el-checkbox label="Simple brand exposure" name="type" />
                                            </el-checkbox-group>
                                        </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="add_task">Create</el-button>
                        <el-button>Cancel</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="update" name="second">
            <div>

                <el-form :model="form" label-width="120px">
                    <el-form-item label="修改任务id">
                        <el-input v-model="update_form.task_id" />
                    </el-form-item>
                    <el-form-item label="任务名称">
                        <el-input v-model="update_form.name" />
                    </el-form-item>
                    <el-form-item label="任务优先级">
                        <el-select v-model="update_form.priority" placeholder="plebu'cuoase select your zone">
                            <el-option label="慢条斯理" value=0 />
                            <el-option label="平波缓进" value=1 />
                            <el-option label="当要之务" value=2 />
                            <el-option label="急急急急" value=3 />
                            <el-option label="十万火急" value=4 />

                        </el-select>
                    </el-form-item>
                    <el-form-item label="任务截止时间">
                        <el-col :span="11">
                            <el-date-picker v-model="update_form.date" type="date" placeholder="Pick a date"
                                style="width: 100%" />
                        </el-col>
                    </el-form-item>
                    <!-- <el-form-item label="Activity type">
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox label="Online activities" name="type" />
                                <el-checkbox label="Promotion activities" name="type" />
                                <el-checkbox label="Offline activities" name="type" />
                                <el-checkbox label="Simple brand exposure" name="type" />
                            </el-checkbox-group>
                        </el-form-item> -->
                    <el-form-item>
                        <el-button type="primary" @click="update_task">update</el-button>
                        <el-button>Cancel</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
</el-tabs>
</template>

<script lang="ts">
import { reactive, ref } from 'vue';
import Window from './window.vue';
import { add, update, del } from '~~/utils/api';
import { tokenState } from "~~/composables/state";
import { formContextKey, TabsPaneContext ,ElNotification} from 'element-plus';
export default {
    setup() {

        const activeName = ref('first')
        const handleClick = (tab: TabsPaneContext, event: Event) => {
            console.log(tab, event)
        }
        const token = tokenState();
        const action_token: string = token.value;
        const schedule: task[] = inject("tasks", reactive([]))
        let form = reactive({
            name: '',
            priority: 0,
            date: new Date()
        });

        let update_form = reactive({
            name: '',
            priority: 0,
            date: new Date(),
            task_id: ""
        })
        let delete_form = reactive({
            task_id: ""
        })

        const add_task = async () => {
            // console.log(form.date)
            console.log(form.date.toISOString().split('T')[0])
            const { data, pending, error, refresh } = await add({
                action_token: action_token,
                priority: form.priority,
                task: form.name,
                time: form.date.toISOString().split('T')[0]
                // time:form.date
            })
            const result: response = JSON.parse(data.value);
            console.log("add返回结果",result);
            if (result.action_result) {
                ElNotification("增加了捏");
                schedule.push({
                    task: form.name,
                    priority: form.priority,
                    time: form.date.toISOString().split('T')[0],
                    task_id: result.result_info.task_id
                })

            } else {
                navigateTo('/login');
            }
        }

        const update_task = async () => {
            // console.log(form.date)
            console.log(form.date.toISOString().split('T')[0])
            const { data, pending, error, refresh } = await update({
                action_token: action_token,
                priority: update_form.priority,
                task: update_form.name,
                time: update_form.date.toISOString().split('T')[0],
                task_id: update_form.task_id
            })
            const result: response = JSON.parse(data.value);
            console.log("update返回结果",result);
            if (result.action_result) {
                ElNotification("更改了捏");

                for (let item of schedule) {
                    if (item.task_id == update_form.task_id) {
                        item.priority = update_form.priority;
                        item.task = update_form.name;
                        item.time = update_form.date.toISOString().split('T')[0];
                        break;
                    }
                }
            } else {
                navigateTo('/login');
            }
        }


        return {
            form,
            update_form,
            add_task,
            delete_form,
            update_task,
            activeName,
            handleClick
        }
    },
    components: {
        Window
    }
}

</script>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

<style scoped></style>