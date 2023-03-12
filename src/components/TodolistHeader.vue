<template>
  <div class="todo-header">
    <div class="todo-config">
      <span>截止时间:</span>
      <input
        class="todo-time"
        type="date"
        v-model="task_date"
        max="10"
        min="0"
      />

      <span>任务优先级:</span>
      <!-- <input class="todo-priority" type="number" v-model="task_priority" /> -->
      <span class="todo-priority">
        <span class="todo-priority-radio">
          <label for="zero">不急: </label>
          <input type="radio" id="zero" value="0" v-model="task_priority" />
        </span>
        <span class="todo-priority-radio">
          <label for="one">一般: </label>
          <input type="radio" id="one" value="1" v-model="task_priority" />
        </span>
        <span class="todo-priority-radio">
          <label for="two">很急: </label>
          <input type="radio" id="two" value="2" v-model="task_priority" />
        </span>
      </span>
    </div>
    <input
      class="todo-text"
      type="text"
      placeholder="请输入你的任务名称，按回车键确认(最多20字)"
      v-model="task_text"
      @keyup.enter="HandleAddItem"
      maxlength="20"
    />
  </div>
</template>

<script>
export default {
  name: "TodolistHeader",
  data() {
    return {
      task_text: "",
      task_date: this.GetDate(),
      task_priority: "0",
    };
  },
  props: ["AddTodoItem"],
  methods: {
    HandleAddItem(event) {
      // 校验
      if (!this.task_text.trim()) {
        return alert("任务不能为空");
      }

      // 添加任务
      const todoObj = {
        task_id: "",
        time: this.task_date,
        task: this.task_text,
        priority: this.task_priority,
        checked: false,
      };
      this.task_text = "";
      this.AddTodoItem(todoObj);
    },

    GetDate() {
      const now = new Date();
      const date = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      };

      date.month = date.month > 9 ? date.month : "0" + date.month;
      date.day = date.day > 9 ? date.day : "0" + date.day;
      return date.year + "-" + date.month + "-" + date.day;
    },
  },
};
</script>

<style scoped>
.todo-header {
  margin-top: 10px;
  margin-bottom: 10px;
}

.todo-header .todo-config {
  margin-left: 0px;
}

.todo-header .todo-time {
  width: 120px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px 4px 7px;

  margin-left: 10px;
  margin-right: 30px;
}

.todo-header .todo-priority {
  width: 120px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px 4px 7px;

  margin-left: 10px;
}

.todo-header .todo-priority .todo-priority-radio {
  width: 100px;
  height: 24px;
  font-size: 14px;
  border-radius: 4px;
  padding: 4px 7px 4px 7px;

  margin-left: 10px;
}

.todo-header .todo-text {
  width: 580px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
  margin-top: 6px;
  margin-bottom: 5px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
