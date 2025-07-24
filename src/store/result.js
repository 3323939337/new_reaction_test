import { defineStore } from "pinia";
const useRes = defineStore('res',{
    state:()=>({
        res:0,
        desc:''
    }),
    actions:{
        updateRes(a,b){
            this.res = a
            this.desc = b
        },
    }
})

export {useRes}