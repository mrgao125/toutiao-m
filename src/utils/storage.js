/* 
封装本地存储模块

 */
// 存储数据
export const setItem = (key, value) => {
    if (typeof value === 'object') {
        // 将数组或者对象类型数据,转成json格式字符串存储
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = key => {
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}

// 删除数据

export const removeItem = key => {
    window.localStorage.removeItem(key)
}