import Http from './require'

export const login = (params?: any) => {
    let body: request = {
        action: "login",
        action_info: {
            user:params.user,
            passwd:params.passwd,
            action_token: "",
            priority: 0,
            time: "",
            task: "",
            task_id: ""
        }
    }
    return Http.post('http://yishiyu.world:2345/action/login', {},body)
}

export const logout = (params?: any) => {
    let body: request = {
        action: "logout",
        action_info: {
            user:"",
            passwd:"",
            action_token: params.action_token,
            priority: 0,
            time: "",
            task: "",
            task_id: ""
        }
    }
    return Http.post('http://yishiyu.world:2345/action/logout', {},body)
}

export const query = (params?: any) => {
    let body: request = {
        action: "query",
        action_info: {
            user:"",
            passwd:"",
            action_token: params.action_token,
            priority: 0,
            time: "",
            task: "",
            task_id: ""
        }
    }
    return Http.post('http://yishiyu.world:2345/action/query', {},body)
}
export const update = (params?: any) => {
    let body: request = {
        action: "update",
        action_info: {
            user:"",
            passwd:"",
            action_token: params.action_token,
            priority: 0,
            time: params.time,
            task: params.task,
            task_id: params.task_id
        }
    }
    return Http.post('http://yishiyu.world:2345/action/update', {},body)
}

export const del = (params?: any) => {
    let body: request = {
        action: "delete",
        action_info: {
            user:"",
            passwd:"",
            action_token: params.action_token,
            priority: 0,
            time: "",
            task: "",
            task_id: params.task_id
        }
    }
    return Http.post('http://yishiyu.world:2345/action/delete', {},body)
}

export const add = (params?: any) => {
    let body: request = {
        action: "add",
        action_info: {
            user:"",
            passwd:"",
            action_token: params.action_token,
            priority: params.priority,
            time: params.time,
            task: params.task,
            task_id: ""
        }
    }
    return Http.post('http://yishiyu.world:2345/action/add', {},body)
}