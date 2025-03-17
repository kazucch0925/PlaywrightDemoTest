import { resolve } from "path";

export function getDate(): string{

    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate())
    const timeStamp: string = year + "/" + month + "/" + day;

    return timeStamp
}

export  function sleep(seconds: number){
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}