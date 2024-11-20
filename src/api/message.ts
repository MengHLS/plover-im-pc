import request from "@/utils/request";

export function messageSync(params: any) {
    return request({
        url: '/im/message/sync',
        method: 'get',
        params: params
    })
}