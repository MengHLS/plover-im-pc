import request from '@/utils/request'


// 登录方法
export function login(username: string, password: string, code: string, uuid: string) {
    return request({
        url: '/auth/login',
        headers: {
            isToken: false,
            repeatSubmit: false
        },
        method: 'post',
        data: { username, password, code, uuid }
    })
}


// 获取用户详细信息
export function getInfo() {
    return request({
        url: '/system/user/getInfo',
        method: 'get'
    })
}


// 退出方法
export function logout() {
    return request({
        url: '/auth/logout',
        method: 'delete'
    })
}