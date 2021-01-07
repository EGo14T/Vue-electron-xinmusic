/**
 * 
 * @param {arr} 列表 
 * @param {*} key 设定的key值
 * @param {*} value 设定的value
 * @param {*} ans 通过 key值 取 value
 */
export const getDataName = (arr,key,value,ans) => {
    if (Array.isArray(arr) && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] == ans) {
          ans = arr[i][value]
        }
      }
    }
    return ans
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.user)
}