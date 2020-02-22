import axios from 'axios'




//get方法
export const getRequest = (url) => {
    return axios({
      method: 'get',
      url: url
    });
};

//post
export const postRequest = (url, params) => {
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


