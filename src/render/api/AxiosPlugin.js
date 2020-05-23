import axios from 'axios'
import { Message } from 'element-ui'

//axios.defaults.baseURL = "http://frp.ego1st.cn"

const Axios = axios.create({
    timeout: 5000,
})


//请求拦截器
Axios.interceptors.request.use(config => {
    // if(localStorage.accessToken) {
    //     config.headers.common['Authorization'] = 'Bearer ' + localStorage.accessToken
    // }
    if (config.isToken) {
        config.headers.common['Authorization'] = 'Bearer ' + localStorage.accessToken
    }
    return config
})

Axios.interceptors.response.use(data => {
    return data;
}, err => {
    if (err.response.status == 504 || err.response.status == 503) {
        Message.error({message:"服务器异常，请联系管理员！",duration:1000});
    } else if (err.response.status == 401) {
        Message({message:"请先登录~",duration:1000});
    } else if (err.response.status == 400) {
        Message.error(err.response.data.error_description);
    } else if (err.response.status == 405) {
        Message.error({message:err.response.data.msg,duration:1000});
    } else {
        Message.error({message:"服务器异常，请联系管理员！",duration:1000});
    }
    // return Promise.resolve(err);

})


export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, 'getRequest', { value: getRequest })
        Object.defineProperty(Vue.prototype, 'postRequest', { value: postRequest })
        Object.defineProperty(Vue.prototype, 'patchRequest', { value: patchRequest })
        Object.defineProperty(Vue.prototype, 'delRequest', { value: delRequest })
        Object.defineProperty(Vue.prototype, 'oauthRequest', { value: oauthRequest })
        Object.defineProperty(Vue.prototype, '$http', { value: axios })
    }
}

//get方法
const getRequest = (url, istoken) => {
    return Axios({
        method: 'get',
        url: url,
        isToken: istoken
    });
};

//post方法
const postRequest = (url, istoken, params) => {
    return Axios({
        method: 'post',
        url: url,
        isToken: istoken,
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

//delete
const delRequest = (url, istoken, params) => {
    return Axios({
        method: 'delete',
        url: url,
        isToken: istoken,
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
//patch
const patchRequest = (url, istoken, params) => {
    return Axios({
        method: 'patch',
        url: url,
        isToken: istoken,
        data: params,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


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