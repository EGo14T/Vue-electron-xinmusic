import axios from 'axios'

//axios.defaults.baseURL = "http://frp.ego1st.cn"

const Axios = axios.create({
    timeout: 5000,
})


Axios.interceptors.request.use(config => {
    // if(localStorage.accessToken) {
    //     config.headers.common['Authorization'] = 'Bearer ' + localStorage.accessToken
    // }
    if(config.isToken){
        config.headers.common['Authorization'] = 'Bearer ' + localStorage.accessToken
    }
    return config
})


export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, 'getRequest', { value: getRequest })
        Object.defineProperty(Vue.prototype, 'postRequest', { value: postRequest })
        Object.defineProperty(Vue.prototype, 'oauthRequest', { value: oauthRequest })
        Object.defineProperty(Vue.prototype, '$http', {value: axios})
    }
}

//get方法
const getRequest = (url,istoken) => {
    return Axios({
        method: 'get',
        url: url,
        isToken: istoken
    });
};

//post方法
const postRequest = (url, params) => {
    return Axios({
        method: 'post',
        url: url,
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

//delete
//patch

//post for oauth
const oauthRequest = (url, params) => {
    return Axios({
        method: 'post',
        url: url,
        data: params,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}