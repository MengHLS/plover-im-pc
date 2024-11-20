import {defineStore} from "pinia";
import {getInfo, login, logout} from "@/api/login";
import {removeToken, setToken} from "@/utils/auth";

export const useUserStore = defineStore(
    'user',
    {
        state: ()=>({
            token: '',
            id: '',
            name: '',
            avatar: '',
        }),
        actions:{
             login(userInfo: any){
                const username = userInfo.username.trim()
                const password = userInfo.password
                const code = userInfo.code
                const uuid = userInfo.uuid
                return new Promise((resolve, reject)=>{
                    login(username, password, code, uuid).then(res => {
                        let data = res.data
                        console.log(data)
                        setToken(data.access_token)
                        this.token = data.access_token
                        resolve(res)
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            getInfo(){
                const user = {avatar:''}
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
                    logout().then(() => {
                        this.token = ''
                        this.roles = []
                        removeToken()
                        resolve(resolve)
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        }
    }
)
