<template>
  <ul class="todo-main">
    <TodolistItem
      v-for="todoObj in todos"
      :key="todoObj.task_id"
      :item="todoObj"
      :CheckTodoItem="CheckTodoItem"
      :DeleteTodoItem="DeleteTodoItem"
      :CheckAllItems="CheckAllItems"
    />
  </ul>
</template>

<script>
import TodolistItem from "./TodolistItem.vue";

export default {
  name: "TodolistList",
  components: { TodolistItem },
  props: [
    "todos",
    "CheckTodoItem",
    "DeleteTodoItem",
    "CheckAllItems",
  ],
};
</script>

<style scoped>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
