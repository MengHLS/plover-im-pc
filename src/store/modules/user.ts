import {defineStore} from "pinia";
import defaultAvatar from '@/assets/images/profile.jpg'

export const useUserStore = defineStore(
    'user',
    {
        state: ()=>({
            token: '',
            id: '',
            name: '',
            avatar: defaultAvatar,
        }),
        actions:{
            login(userinfo: any){
                const username = userinfo.username.trim()
            },
            getInfo(){
                const user = {avatar:''}
                this.avatar = (user.avatar == "" || user.avatar == null) ? defaultAvatar : user.avatar;
            }
        }
    }
)
