<!-- <template>
    <div id='windows'>
        <p v-for="task in schedule">
            "任务名"{{task.task}};"优先级"{{task.priority}};
            "id"{{task.task_id}};"时间"{{task.time}};
        </p>
    </div>
</template> -->

<template>
    <div class="demo-collapse">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(task, index) in schedule" :title="task.task" :name="index">
          <div>
            "优先级"{{ task.priority }};"id"{{ task.task_id }};"时间"{{ task.time }}
            <el-button type="success" onclick="delete_task(task.task_id,'success')">完成任务</el-button>
            <el-button type="danger" onclick="delete_task(task.task_id,'fail')">没完成我也要删除</el-button>
  
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </template>
    
  <script setup lang="ts">
  import { tokenState } from '~~/composables/state';
  import { ref, reactive, onMounted } from 'vue'
  import { ElNotification } from 'element-plus'
  import {del} from "~~/utils/api"


  const activeName = ref('1')
  const action_token = tokenState().value;
  const schedule: task[] = inject("tasks", reactive([]))
  const delete_task = async (id: string,res:string) => {
    // console.log(form.date)
    const { data, pending, error, refresh } = await del({
      action_token: action_token,
      task_id: id
    })
    const result: response = JSON.parse(data.value);
    console.log("delete返回结果:", result);
    if (result.action_result) {
      for (let i = 0; i < schedule.length; i++) {
        if (schedule[i].task_id == id) {
          schedule.splice(i, 1);
          break;
        }
      }
      if(res=='success'){
        ElNotification("真腻害，介个任务没了捏");
      }else{
        ElNotification("傻逼");
      }
      
  
    } else {
      navigateTo('/login');
    }
  }
  
  </script>
  
  <style scoped lang="scss">
  #windows {
    min-height: 20vh;
  }
  
  .demo-collapse {
    background-color: rgba(246, 244, 245, 0);
  
    :deep(div) {
      background-color: rgba(246, 244, 245, 0);
    }
  }
  </style>