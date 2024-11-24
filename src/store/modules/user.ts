import {defineStore} from "pinia";
import {getInfo, login, logout, refreshToken} from "@/api/login";
import {removeToken, setToken} from "@/utils/auth";

export const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            token: '',
            id: '',
            name: '',
            avatar: '',
        }),
        actions: {
            async login(userInfo: any) {

                const username = userInfo.username.trim()
                const password = userInfo.password
                const code = userInfo.code
                const uuid = userInfo.uuid
                const token = await window.api.getValueByKey('token')
                if (token!=null) {
                    this.token = token
                    //刷新token
                    refreshToken().then(res=> {
                        console.log("刷新token成功")
                    })
                    setToken(token)
                    return Promise.resolve(token)
                }
                return new Promise((resolve, reject) => {
                    login(username, password, code, uuid).then(res => {
                        let data = res.data
                        window.api.setValueByKey("token", data.access_token)
                        setToken(data.access_token)
                        this.token = data.access_token
                        resolve(res)
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            getInfo() {
                return new Promise((resolve, reject) => {
                    getInfo().then(res => {
                        const user = res.data.user

                        this.id = user.userId
                        this.name = user.userName
                        this.avatar = user.avatar
                        resolve(res)
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            logOut() {
                return new Promise((resolve, reject) => {
                    logout().then(async () => {
                        await window.api.deleteValueByKey('token')
                        this.token = ''
                        this.roles = []
                        removeToken()
                        resolve(resolve)
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            async auth(){
                const token = await window.api.getValueByKey('token')
                if (token!=null) {
                    this.token = token
                    //刷新token
                    refreshToken().then(res=> {
                        console.log("刷新token成功")
                    })
                    setToken(token)
                    return Promise.resolve(token)
                }else {
                    return Promise.reject("请先登录")
                }
            }
        }
    }
)
