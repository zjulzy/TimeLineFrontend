<template>
  <li class="task-li">
    <input
      type="checkbox"
      :checked="item.checked"
      @click="HandleCheck(item.task_id)"
    />
    <div class="task-content">
      <div class="task-text">{{ item.task }}</div>
      <div class="task-time">{{ item.time }}</div>
      <div class="task-priority" :class="priority_class">
        {{ priorities[item.priority] }}
      </div>
    </div>

    <button class="btn btn-danger" @click="HandleDelete(item.task_id)">
      删除
    </button>
  </li>
</template>

<script>
export default {
  name: "TodolistItem",
  props: ["item", "CheckTodoItem", "DeleteTodoItem"],
  data() {
    return {
      priorities: ["不急", "一般", "很急"],
    };
  },

  computed: {
    priority_class() {
      return "priority-" + this.item.priority;
    },
  },
  methods: {
    HandleCheck(task_id) {
      this.CheckTodoItem(task_id);
    },
    HandleDelete(task_id) {
      this.DeleteTodoItem(task_id);
    },
  },
};
</script>

<style scoped>

.task-li {
  margin-left: 10px;
}

.task-content {
  width: 450px;
  height: 36px;
  margin-left: 20px;
  display: flex;
}

.task-text {
  width: 340px;
  height: 36px;
}

.task-time {
  width: 100px;
  height: 36px;
}

.task-priority {
  align-self: center;
  text-align: center;
  width: 50px;
  height: 36px;
  margin-top: 4px;

  font-size: medium;
  font-weight: 800;
  font-style: normal;
}

.priority-0 {
  color: rgb(255, 255, 255);
  background-color: rgb(100, 220, 220);
}

.priority-1 {
  color: rgb(97, 97, 200);
  background-color: rgb(255, 255, 100);
}

.priority-2 {
  color: rgb(0, 0, 0);
  background-color: rgb(255, 70, 70);
}

li {
  list-style: none;
  height: 40px;
  line-height: 37px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
  display: flex;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  margin-left: 12px;
  float: right;
  display: none;
  margin-top: 3px;
}

li:hover {
  background-color: #ddd;
}

li:hover button {
  display: block;
}
</style>
