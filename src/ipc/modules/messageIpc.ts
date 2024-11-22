import {Message} from "@/models/Message";

interface window{
    api:{
        getLastMessage(): Promise<any>
    }
}

