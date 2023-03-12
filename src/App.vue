<template>
  <div id="root">
    <div class="login-container" v-show="!status.has_logged">
      <a href="https://github.com/yishiyu/TimelineServer" >
        <img
          src="http://img.yishiyu.world/timelineserver/background/016.jpg"
          alt="TimelineServer"
          class="head-image"
        />
      </a>

      <div>
        <div class="login-wrap">
          <span>账号: </span>
          <input
            class="login-input"
            type="text"
            v-model="account.user_name"
            placeholder="User name"
          />
        </div>
        <div class="login-wrap">
          <span>密码: </span>
          <input
            class="login-input"
            type="text"
            v-model="account.user_passwd"
            placeholder="Password"
          />
        </div>
        <div class="login-wrap">
          <button class="btn btn-login" @click="Login">登录</button>
        </div>
      </div>
    </div>

    <div v-show="status.has_logged">
      <button class="btn btn-logout" @click="Logout">退出</button>
      <div class="todo-container">
        <div class="todo-wrap">
          <TodolistHeader :AddTodoItem="AddTodoItem" />
          <TodolistList
            :todos="todos"
            :CheckTodoItem="CheckTodoItem"
            :DeleteTodoItem="DeleteTodoItem"
          />
          <TodolistFooter
            :todos="todos"
            :CheckAllItems="CheckAllItems"
            :ClearCheckedItems="ClearCheckedItems"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TodolistFooter from "./components/TodoListFooter.vue";
import TodolistList from "./components/TodolistList.vue";
import TodolistHeader from "./components/TodolistHeader.vue";

import axios from "axios";

export default {
  name: "App",
  components: { TodolistHeader, TodolistList, TodolistFooter },
  data() {
    return {
      todos: [
        {
          task_id: "001",
          time: "2023-04-04",
          task: "task 1",
          priority: "0",
          checked: "true",
        },
      ],
      account: {
        user_id: "user id",
        user_name: "",
        action_token: "action token",
        user_passwd: "",
      },
      API_URL: "/",

      status: {
        has_logged: false,
      },
    };
  },

  computed: {},

  methods: {
    AddTodoItem(todoObj) {
      this.AddData(todoObj);
    },

    CheckTodoItem(task_id) {
      this.todos.forEach((todo) => {
        if (todo.task_id == task_id) todo.checked = !todo.checked;
        console.log(todo.task_id + ":" + todo.checked);
      });
    },

    DeleteTodoItem(task_id) {
      if (confirm("确定删除吗")) {
        this.DeleteData(task_id);
      }
    },

    CheckAllItems(check) {
      this.todos.forEach((todo) => {
        todo.checked = check;
      });
    },

    ClearCheckedItems() {
      if (confirm("确定删除吗")) {
        this.todos.forEach((todo) => {
          if (todo.checked) {
            this.DeleteData(todo.task_id);
          }
        });
      }
    },

    Login() {
      axios
        .post(this.API_URL + "/action/login", {
          action: "login",
          action_info: {
            user: this.account.user_name,
            passwd: this.account.user_passwd,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.action_result) {
              alert("Login successfully!");
              this.account.action_token =
                response.data.result_info.action_token;
              this.account.user_id = response.data.result_info.user_id;

              this.status.has_logged = true;
              this.FetchData();
            } else {
              alert(response.data.result_info.error_info);
            }
          } else {
            alert("network error,status: " + response.status);
          }
        });
    },

    Logout() {
      axios
        .post(this.API_URL + "/action/logout", {
          action: "logout",
          action_info: {
            action_token: this.account.action_token,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.action_result) {
              this.status.has_logged = false;
              alert("Logout successfully!");
            } else {
              alert(response.data.result_info.error_info);
            }
            this.todos = [];
          } else {
            alert("network error,status: " + response.status);
          }
        });
    },

    FetchData() {
      axios
        .post(this.API_URL + "/action/query", {
          action: "query",
          action_info: {
            action_token: this.account.action_token,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.action_result) {
              this.todos = [];
              response.data.result_info.tasks.forEach((task) => {
                this.todos.unshift({
                  task_id: task.task_id,
                  time: task.time,
                  task: task.task,
                  priority: task.priority,
                  checked: false,
                });
              });
            } else {
              alert(response.data.result_info.error_info);
            }
          } else {
            alert("network error,status: " + response.status);
          }
        });
    },

    AddData(todoObj) {
      axios
        .post(this.API_URL + "/action/add", {
          action: "add",
          action_info: {
            action_token: this.account.action_token,
            time: todoObj.time,
            task: todoObj.task,
            priority: todoObj.priority,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.action_result) {
              todoObj.checked = false;
              todoObj.task_id = response.data.result_info.task_id;

              this.todos.unshift(todoObj);
            } else {
              alert(response.data.result_info.error_info);
            }
          } else {
            alert("network error,status: " + response.status);
          }
        });
    },

    DeleteData(task_id) {
      axios
        .post(this.API_URL + "/action/delete", {
          action: "delete",
          action_info: {
            action_token: this.account.action_token,
            task_id: task_id,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.action_result) {
              this.todos = this.todos.filter((todo) => {
                return todo.task_id != task_id;
              });
            } else {
              alert(response.data.result_info.error_info);
            }
          } else {
            alert("network error,status: " + response.status);
          }
        });
    },
  },
};
</script>

<style>
.head-image {
  width: 600px;
  height: auto;
}

.login-input {
  width: 400px;
  height: 34px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
  margin-left: 20px;
}

.login-wrap {
  text-align: center;
  margin: 20px 10px;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 #ffffff33, 0 1px 2px #0000000d;
  border-radius: 4px;
}

.btn-login {
  width: 150px;
  color: #5d25f7;
  background-color: #ffffff;
  border: 1px solid #3ca4ff;
}

.btn-login:hover {
  color: #5d25f7;
  background-color: #e6d8f5;
}

.btn-logout {
  color: #5d25f7;
  background-color: #ffffff;
  border: 1px solid #3ca4ff;
}

.btn-logout:hover {
  color: #5d25f7;
  background-color: #e6d8f5;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}

.login-container {
  width: 600px;
  margin: 0 auto;
  border: 1px solid #a6b2c3;
  border-radius: 5px;
  margin-top: 5%;
}

.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
