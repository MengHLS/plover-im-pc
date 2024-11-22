// 获取用户基础信息
import request from "@/utils/request";

export function getBaseInfo(userId) {
    return request({
        url: '/system/user/info/base/'+userId,
        method: 'get'
    })
}