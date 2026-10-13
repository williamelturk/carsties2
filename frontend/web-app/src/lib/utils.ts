import {format} from "date-fns";

export { cn } from "cn"

export function toDatetimeLocal(date:string){
    return format(new Date(date), "yyyy-MM-dd'T'HH:mm")
}

export function formatDateTime(date:string){
    return format(date, "dd MMM yyyy h:mm:ss a")
}


export function splitPascalCase(value:string){
    return value.replace(/([a-z])([A-Z])/g, "$1 $2")
}



export const usdFormatter = new Intl.NumberFormat('en-US',{
    style: 'currency',
    currency: 'USD'
})
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
    func: F,
    waitFor: number,
){
    let timeout: ReturnType<typeof setTimeout>;

    const debounced = (...args: Parameters<F>): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), waitFor);
    };
    debounced.cancel = ()=> clearTimeout(timeout);
    return debounced;
}
