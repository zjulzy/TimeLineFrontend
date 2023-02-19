# 功能列表

## 界面功能

- `/` 自动转到 `/login.html` 进行登录
  - 输入账号密码
  - 登录/新用户自动注册登陆
  - 登录后跳转到 `/index.html`

- `/index.html`
  - 退出账号按钮
  - timeline 表格
    - 记录项: 时间-任务-重要性
      - 添加事件 按钮
      - 修改事件 按钮
      - 删除事件 按钮

## 通信方式

全部用 json 通信

- 事件描述:

    ```json
    {   
        // 由服务器生成的唯一id
        "task_id": "xxx",
        "user_id": "xxx",
        "time": "时间戳",
        "task": "xxx",
        "priority": "0-10(越大越重要)"
    }
    ```

- 总体框架
  - 登陆之后,服务器回复浏览器一个 `action_token` 作为浏览器的身份凭证
  - 浏览器断开链接/主动退出登录后 `action_token` 销毁

  - 浏览器发送内容

    ```json
    {
        "action": "login/logout/query/add/update/delete",
        "action_info": {
            // action 为 xxx 时需要的信息
            // login:
            "user": "xxx",
            "passwd": "xxx",
            // logout:
            "action_token": "xxx",
            // query:
            "action_token": "xxx",
            // add:
            "action_token": "xxx",
            "time": "时间戳",
            "task": "xxx",
            "priority": "0-10(越大越重要)",
            // update:
            "action_token": "xxx",
            "task_id": "xxx",
            "time": "时间戳",
            "task": "xxx",
            "priority": "0-10(越大越重要)",
            // delete
            "action_token": "xxx",
            "task_id": "xxx", 
        },
    }
    ```

  - 服务器回复内容

      ```json
      {
          "action_result": "true/false",
          "result_info": {
              // login: 
              "action_token": "xxx",
              // add:
              // task id 是数据库自动生成的,不太好返回,在add之后重新执行一下querry算了
              // "task_id": "xxx",
              // query:
              "tasks": [
                {
                  "task_id": "xxx",
                  "time": "时间戳",
                  "task": "xxx",
                  "priority": "0-10(越大越重要)"
                }
              ]
              
              // 发生错误时
              "error_message" :"xxx",
          }
      }
      ```

## 数据库设计

- 用户账号密码表(users)

  - user_id: BIGINT
  - user_name: VARCHAR(40)
  - user_passwd: VARCHAR(40)

  ```shell
  CREATE TABLE IF NOT EXISTS users(
      user_id BIGINT(20) UNSIGNED AUTO_INCREMENT,
      user_name VARCHAR(40) NOT NULL,
      user_passwd VARCHAR(40) NOT NULL,
      PRIMARY KEY (user_id)
  );
  ```

- 待办事项表

  - task_id: BIGINT
  - user_id: BIGINT
  - time: DATE
  - task: VARCHAR(300)
  - priority: INT

  ```shell
  CREATE TABLE IF NOT EXISTS tasks(
      task_id BIGINT(20) UNSIGNED AUTO_INCREMENT,
      user_id BIGINT(20) UNSIGNED NOT NULL,
      time DATE NOT NULL,
      task VARCHAR(300) NOT NULL,
      priority INT DEFAULT 0 NOT NULL,
      PRIMARY KEY (task_id)
  );
  ```

# 整体测试方法

## VSCode

- `.vscode/launch.json`

    ```json
    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Overall Debug",
                "type": "cppdbg",
                "request": "launch",
                "program": "${workspaceFolder}/build/TimelineServer",
                "args": [],
                "stopAtEntry": false,
                "cwd": "${workspaceFolder}/build",
                "environment": [],
                "externalConsole": false,
                "MIMode": "gdb",
                "setupCommands": [
                    {
                        "description": "为 gdb 启用整齐打印",
                        "text": "-enable-pretty-printing",
                        "ignoreFailures": true
                    },
                    {
                        "description": "将反汇编风格设置为 Intel",
                        "text": "-gdb-set disassembly-flavor intel",
                        "ignoreFailures": true
                    }
                ]
            }
        ]
    }
    ```

## Chrome

F12 打开控制台输命令来调试

- login 动态路由

    ```js
    fetch(new Request('action/login',{
        method:'POST', 
        headers: {'Content-Type': 'application/json'},
        body:"{\"action\":\"login\", \"action_info\": {\"user\":\"user\", \"passwd\": \"passwd\"}}"
    })).then((resp)=>{console.log(resp)})
    ```

- logout 动态路由

    ```js
    fetch(new Request('action/logout',{
        method:'POST', 
        headers: {'Content-Type': 'application/json'},
        body:"{\"action\":\"logout\", \"action_info\": {\"action_token\":\"PKdhtXMmr29n3L0K99eM\"}}"
    })).then((resp)=>{console.log(resp)})
    ```

- query 动态路由

    ```js
    fetch(new Request('action/query',{
        method:'POST', 
        headers: {'Content-Type': 'application/json'},
        body:"{\"action\":\"query\", \"action_info\": {\"action_token\":\"PKdhtXMmr29n3L0K99eM\"}}"
    })).then((resp)=>{console.log(resp)})
    ```

- add 动态路由

    ```js
    fetch(new Request('action/add',{
        method:'POST', 
        headers: {'Content-Type': 'application/json'},
        body:"{\"action\":\"add\", \"action_info\": {\"action_token\":\"PKdhtXMmr29n3L0K99eM\",\"time\":\"2024-01-01\",\"task\":\"test task\",\"priority\": 3}}"
    })).then((resp)=>{console.log(resp)})
    ```

- update 动态路由

    ```js
    fetch(new Request('action/update',{
        method:'POST', 
        headers: {'Content-Type': 'application/json'},
        body:"{\"action\":\"update\", \"action_info\": {\"action_token\":\"PKdhtXMmr29n3L0K99eM\",\"task_id\": 4, \"time\":\"2099-01-01\",\"task\":\"test task\",\"priority\": 3}}"
    })).then((resp)=>{console.log(resp)})
    ```

- delete 动态路由

    ```js
    fetch(new Request('action/delete',{
        method:'POST', 
        headers: {'Content-Type': 'application/json'},
        body:"{\"action\":\"delete\", \"action_info\": {\"action_token\":\"PKdhtXMmr29n3L0K99eM\",\"task_id\": 9}}"
    })).then((resp)=>{console.log(resp)})
    ```

