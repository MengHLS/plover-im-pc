
// 创建axios实例
import axios from "axios";
import cache from "@/plugins/cache";
import {getToken} from "@/utils/auth";
import {tansParams} from "@/utils/common";
import errorCode from "@/utils/errorCode";
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {useUserStore} from "@/store/modules/user";


axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
export let isReLogin = { show: false };

const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: "http://localhost:30000/dev-api/",
    // 超时
    timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
    // 是否需要设置 token
    const isToken = (config.headers as { isToken?: boolean }|| {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers as { repeatSubmit ?: boolean }|| {}).repeatSubmit === false
    if (getToken() && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
        const requestObj = {
            url: config.url,
            data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
            time: new Date().getTime()
        }
        const requestSize = Object.keys(JSON.stringify(requestObj)).length; // 请求数据大小
        const limitSize = 5 * 1024 * 1024; // 限制存放数据5M
        if (requestSize >= limitSize) {
            console.warn(`[${config.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。')
            return config;
        }
        const sessionObj = cache.session.getJSON('sessionObj')
        if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
            cache.session.setJSON('sessionObj', requestObj)
        } else {
            const s_url = sessionObj.url;                // 请求地址
            const s_data = sessionObj.data;              // 请求数据
            const s_time = sessionObj.time;              // 请求时间
            const interval = 1000;                       // 间隔时间(ms)，小于此时间视为重复提交
            if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
                const message = '数据正在处理，请勿重复提交';
                console.warn(`[${s_url}]: ` + message)
                return Promise.reject(new Error(message))
            } else {
                cache.session.setJSON('sessionObj', requestObj)
            }
        }
    }
    return config
}, error => {
    Promise.reject(error).then(r => console.log(error))
})

// 响应拦截器
service.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200;
        // 获取错误信息
        let msg = res.data.msg || errorCode['default']
        if (errorCode[code]) {
            msg = errorCode[code]
        }
        // 二进制数据则直接返回
        if (res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer') {
            return res.data
        }
        if (code === 401) {
            if (!isReLogin.show) {
                isReLogin.show = true;
                ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', { confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning' }).then(() => {
                    isReLogin.show = false;

                }).catch(() => {
                    isReLogin.show = false;
                });
            }
            useUserStore().logOut().then(() => {
                location.href = '/login';
            })
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            ElMessage({ message: msg, type: 'error' })
            return Promise.reject(new Error(msg))
        } else if (code === 601) {
            ElMessage({ message: msg, type: 'warning' })
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            ElNotification.error({ title: msg })
            return Promise.reject('error')
        } else {
            return  Promise.resolve(res.data)
        }
    },
    error => {
        console.log('err' + error)
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
        return Promise.reject(error)
    }
)
export default service
