<!--suppress ALL -->
<script setup lang="ts">

import {computed, handleError, nextTick, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useRes} from '@/store/result'

const isShow = ref(false);
const isShow2 = ref(false);
const randerTime = ref();
const result = ref()
const showButton1 = ref( true)
const showButton2 = ref( false)
const showRes = ref(false)
const isClick = ref(false)
let timer = ref()
const isCheat = ref(false)
const fuck = ref('作弊的和狗一桌')

const router = useRouter();
const storeRes = useRes();

function showBlock(){
  isShow.value = true;
  const random = Math.random() * 4 + 1;
  showButton1.value = false
  timer.value = setTimeout(()=>{
    isShow.value = false;
    isShow2.value = true;
    randerTime.value = performance.now()
  },random*1000)
}

function handleClick(){
  if (isClick.value === false){
    const clickTime = performance.now()
    if (randerTime.value !== null) {
      const diff = clickTime - randerTime.value
      result.value = diff.toFixed(0)
      // result.value  = (result.value - 40)
      // showRes.value = true
      // showButton2.value = true
      isClick.value = true
      let desc = ''
      if (result.value <= 100 && result.value > 0) {
        desc = '要不你去天禄青训试试？'
      } else if (result.value > 100 && result.value <= 150) {
        desc = '对你来说上S只是时间问题'
      }else if (result.value > 150 && result.value <= 250) {
        desc = '有时候也能比肩双汇火腿肠desuwa'
      }else if (result.value > 250 && result.value <= 350) {
        desc = '没事，记住，CS他姓C!'
      } else {
        desc = '你和地图里的鸡有什么区别 反正都开不出来枪'
      }
      storeRes.updateRes(result.value,desc)
      router.push({
        path: '/testRes',
      })
    }
  }
}

function retest(){
  isShow.value = false;
  isShow2.value = false;
  showButton1.value = true
  showButton2.value = false
  showRes.value = false
  randerTime.value = null
  result.value = null
  isClick.value = false
  isCheat.value = false
}

const desc = computed(()=>{
  let res

  return res
})
function showCheat(){
  clearTimeout(timer.value)
  isShow.value = false
  showButton1.value = false
  showButton2.value = true
  isCheat.value = true
}

</script>

<template>
 <div class="container flex">
   <div class="pic1"></div>
   <div class="mid">
     <div class="title">反应测试</div>
     <div class="title2">你是donk？还是advent？</div>
     <div class="title3"  v-if="showButton1">点击开始测试出现方块</div>
     <div class="title4"  v-if="!showButton1">方块变色后点击</div>
     <el-button type="primary" class="button" @click="showBlock" v-if="showButton1" >开始测试</el-button>
     <el-button type="primary" class="button" @click="retest" v-if="showButton2" >再测一次</el-button>
     <div class="block1" v-show="isShow" @click="showCheat"></div>
     <div class="block2" v-show="isShow2" @mousedown="handleClick" ></div>
<!--     <div class="result" v-if="showRes">-->
<!--       <div class="number">{{result}}</div>-->
<!--       <div class="unit">ms</div>-->
<!--     </div>-->
<!--     <div class="desc" v-if="showRes">-->
<!--       <div>{{desc}}</div>-->
<!--     </div>-->
     <div class="desc" v-if="isCheat">
       <div>等红了再点！</div>
       <div>{{fuck}}</div>
     </div>
   </div>
   <div class="pic2"></div>
 </div>
</template>

<style scoped>
.container{
  display: flex;
  width: 1920px;
  .mid{
    width: 640px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title{
      font-size: 50px;
      letter-spacing: 10px;
      margin-top: 280hpx;
      margin-bottom: 10hpx;
    }
    .title2{
      font-size: 30px;
      letter-spacing: 5px;
      margin-bottom: 10hpx;
    }
    .title3{
      font-size: 30px;
      letter-spacing: 5px;
      margin-bottom: 10hpx;
    }
    .title4{
      font-size: 30px;
      letter-spacing: 5px;
      margin-bottom: 10hpx;
    }
    .button{
      width: 100px;
      height: 30hpx;
      cursor: pointer;
      margin-bottom: 20hpx;
      font-size: 14px;
    }
    .block1{
      width: 300px;
      height: 300hpx;
      background-color: aqua;
    }
    .block2{
      width: 300px;
      height: 300hpx;
      background-color: red;
    }
    .result{
      position: absolute;
      display: flex;
      top: 200hpx;
      .number{
        font-size: 50px;
        color: red;
      }
      .unit{
        font-size: 30px;
        margin-top: 22hpx;
        margin-left: 10px;
      }
    }
    .desc{
      position: absolute;
      top: 50hpx;
      font-size: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .pic1{
    width: 640px;
    height: 1080hpx;
    background-image: url("@/assets/img/donk.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .pic2{
    width: 640px;
    height: 1080hpx;
    background-image: url("@/assets/img/chicken.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>