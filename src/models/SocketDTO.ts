
export class SocketDTO{
    action: number;
    data: any;
    constructor(
        action: number,
        data: any,
    ) {
        this.action = action;
        this.data = data;
    }
}