import axios from "axios"
import { Message } from 'element-ui'


//要请求的后台地址
//axios.defaults.baseURL = "http://frp.ego1st.cn"

//默认超时时间
axios.defaults.timeout = 30000;

//post请求的默认请求头
axios.defaults.headers.post['Content-Type'] ='application/json';
axios.defaults.headers['userId'] = '1';

//request拦截
axios.interceptors.request.use(config => {
    if (config.isToken) {
        config.headers.common['Authorization'] = 'Bearer ' + localStorage.accessToken
    }
    return config
})

//response拦截
axios.interceptors.response.use(data => {
    return data;
}, err => {
    if (err.response.status == 500) {
        Message.error({message:err.response.data.message,duration:3000});
    }
    return Promise.reject(err);
})

/**
    * get方法，对应get请求
    * @param {String} url [请求的url地址]
    * @param {Object} params [请求时携带的参数]
*/
export function getRequest(url, isToken ,params) {
    return new Promise((resolve, reject) =>{
        axios.get(getRestfulParams(url, params), {
            isToken: isToken
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
        })
    });
}

export function getKvRequest(url, isToken ,params) {
    return new Promise((resolve, reject) =>{
        axios.get(getKvParam(url, params), {
            isToken: isToken
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
        })
    });
}

export function postRequest(url, isToken ,params) {
    return new Promise((resolve, reject) =>{
        axios.post(getRestfulParams(url, params), {
            isToken: isToken
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
        })
    });
}

export function postKvRequest(url, isToken ,params) {
    return new Promise((resolve, reject) =>{
        axios.post(getKvParam(url, params), {
            isToken: isToken
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
        })
    });
}

export function postForJson(url, isToken ,params) {
    return new Promise((resolve, reject) =>{
        axios.post(url,params,{isToken:isToken}).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
        })
    });
}

export function patchRequest(url, isToken ,params) {
    return new Promise((resolve, reject) =>{
        axios.patch(getRestfulParams(url, params), {
            isToken: isToken
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
        })
    });
}

export function patchForJson(url, isToken ,params) {
    return new Promise((resolve, reject) =>{
        axios.patch(url,params,{isToken: isToken}).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
        })
    });
}

export function deleteRequest(url, isToken ,params) {
    return new Promise((resolve, reject) =>{
        axios.delete(getRestfulParams(url, params), {
            isToken: isToken
            }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
        })
    });
}

function getRestfulParams(url, params) {
    if (params == null) return url;
    for (const item of params) {
        url += "/" + item;
    }
    return url;
}

function getKvParam(url, params){
    let data = '';
    for(var k in params){
        let value = params[k] !==undefined ? params[k] : '';
        data += `&${k}=${encodeURIComponent(value)}`
    }
    return data ? url + '?' + data.substring(1) : ''
}