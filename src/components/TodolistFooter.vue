<template>
  <div class="todo-footer" v-show="total_count" @click="HandleCheckAll">
    <label>
      <input type="checkbox" :checked="checked_all" />
    </label>
    <span>
      <span>已完成 {{ checked_count }} </span> / 全部{{ total_count }}
    </span>
    <button class="btn btn-danger" @click="HandleClearChecked">
      清除已完成任务
    </button>
  </div>
</template>

<script>
export default {
  name: "TodolistFooter",
  props: ["todos", "CheckAllItems", "ClearCheckedItems"],
  computed: {
    total_count() {
      return this.todos.length;
    },
    checked_count() {
      return this.todos.reduce(
        (count, todo) => count + (todo.checked ? 1 : 0),
        0
      );
      //   return this.todos.filter((todo) => todo.checked).length;
    },
    checked_all() {
      return this.checked_count == this.todos.length;
    },
  },
  methods: {
    HandleCheckAll() {
      this.CheckAllItems(!this.checked_all);
    },
    HandleClearChecked() {
      this.ClearCheckedItems();
    },
  },
};
</script>

<style scoped>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
