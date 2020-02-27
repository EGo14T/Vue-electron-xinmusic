import axios from 'axios'
import qs from "qs";

//get方法
export const getRequest = (url) => {
    return axios({
      method: 'get',
      url: url
    });
};


//post方法
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

//post for oauth
export const oauthRequest = (url, params) => {
    return axios({
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


