import { AsyncData } from 'nuxt/dist/app/composables/asyncData'
//import baseUrl from './baseUrl'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useFetch } from 'nuxt/app'

let baseUrl = 'http://time.yishiyu.world';

const fetch = (url: string, args: any) => {

    return useFetch(url, {
        
        method: args.method,
        
        body:args.body
    })
}

export default new class Http {

    get(url: string, params?: any): Promise<any> {
        return fetch(url, { method: 'get', params })
    }

    post(url: string, params?: any,body?:any): Promise<any> {
        return fetch(url, { method: 'post', params,body })
    }

    put(url: string, body?: any): Promise<any> {
        return fetch(url, { method: 'put', body })
    }

    delete(url: string, body?: any): Promise<any> {
        return fetch(url, { method: 'delete', body })
    }
}

