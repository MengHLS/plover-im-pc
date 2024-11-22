import {getBaseInfo} from "@/api/user";
import {defineStore} from "pinia";


export const useAvatarStore = defineStore(
    'avatarStore',
    {
        state: ()=>({
            list:[]
        }),
        actions:{
            async getUserAvatar(userId){
                let userAvatar = this.list.find(user=> user.userId==userId)
                console.log(userAvatar)
                if (userAvatar){
                    return userAvatar;
                }
                userAvatar = await getBaseInfo(userId).then(res => {
                    const userAvatar = {
                        userId:userId,
                        userName:res.user.userName,
                        userAvatar: res.user.avatar,
                    }
                    this.list.push(userAvatar)
                    return userAvatar;
                })
                console.log(userAvatar)
                return userAvatar;
            }
        }
    }
)