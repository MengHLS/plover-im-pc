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
            isLogin: false,
            isFetching: false,
            isLogging: false,
        }),
        actions: {
            async login(userInfo: any) {
                this.isLogging = true
                const username = userInfo.username.trim()
                const password = userInfo.password
                const code = userInfo.code
                const uuid = userInfo.uuid
                return new Promise((resolve, reject) => {
                    login(username, password, code, uuid).then(res => {
                        let data = res.data
                        window.api.setValueByKey("token", data.access_token)
                        setToken(data.access_token)
                        this.token = data.access_token
                        this.isLogging = false
                        resolve(res)
                    }).catch(error => {
                        this.isLogging = false
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
                this.isLogging = true
                return new Promise<any>((resolve, reject) => {
                    const token =  window.api.getValueByKey('token')
                    if (!token) {
                        this.token = token
                        //刷新token
                        refreshToken().then(res=> {
                            this.isLogin = true
                            console.log("刷新token成功"+":"+token)
                            setToken(token)
                            this.isLogging = false
                            resolve(res)
                        }).catch(error => {
                            this.isLogging = false
                            reject(error)
                        })
                    }else {
                        this.isLogging = false
                        reject("重新登录")
                    }
                })
            },
            afterLogin(){
                return new Promise<any>((resolve, reject) => {
                    const token =  window.api.getValueByKey('token')
                    setToken(token)
                    resolve(token)
                })
            }
        }
    }
)
