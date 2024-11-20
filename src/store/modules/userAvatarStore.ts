import {defineStore} from "pinia";

export const useUserStore = defineStore(
    'userAvatar',
    {
        state: ()=>({
            id: '',
            name: '',
            avatar: '',
        }),
        actions:{
            login(userinfo: any){
                const username = userinfo.username.trim()
            },
            getInfo(){
                const user = {avatar:''}
            }
        }
    }
)