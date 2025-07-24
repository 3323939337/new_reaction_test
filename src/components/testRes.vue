<script setup>

import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useRes} from '@/store/result'
import * as echarts from 'echarts';
import {useRouter} from "vue-router";
import {toVw} from "@/assets/js/adaptSum.js";

const storeRes = useRes();
const router = useRouter();
const chartDom = ref(null);

const res = computed(()=>{
  return storeRes.res
})
const desc = computed(()=>{
  return storeRes.desc
})

const level = computed(()=>{
  let result
  if (res.value <= 100 && res.value > 0) {
    result = 'pro'
  } else if (res.value > 100 && res.value <= 150) {
    result = 's'
  }else if (res.value > 150 && res.value <= 250) {
    result = 'a'
  }else if (res.value > 250 && res.value <= 350) {
    result = 'c'
  } else {
    result = 'd'
  }
  return result
})

const picComputed = computed(()=>{
  let a
  if(level.value === 'pro'){
    a = 'pic-pro'
  }else if(level.value === 's'){
    a = 'pic-s'
  }else if(level.value === 'a'){
    a = 'pic-a'
  }else if(level.value === 'c'){
    a = 'pic-c'
  }else{
    a = 'pic-d'
  }
  return a
})

function initDom(){
  const myChart = echarts.init(chartDom.value);
  let split = []
  if(res.value >0 && res.value <= 25){
    split = [
      {
        gt: 0,
        lt: 1,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 25 && res.value <= 50){
    split = [
      {
        gt: 1,
        lt: 2,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 50 && res.value <= 75){
    split = [
      {
        gt: 2,
        lt: 3,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 75 && res.value <= 100){
    split = [
      {
        gt: 3,
        lt: 4,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 100 && res.value <= 125){
    split = [
        {
          gt: 4,
          lt: 5,
          color: '#3487D1'
        }
    ]
  }else if (res.value > 125 && res.value <= 150){
    split = [
      {
        gt: 5,
        lt: 6,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 150 && res.value <= 175){
    split = [
      {
        gt: 6,
        lt: 7,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 175 && res.value <= 200){
    split = [
        {
          gt: 7,
          lt: 8,
          color: '#3487D1'
        }
    ]
  }else if (res.value > 200 && res.value <= 225){
    split = [
      {
        gt: 8,
        lt: 9,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 225 && res.value <= 250){
    split = [
      {
        gt: 9,
        lt: 10,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 250 && res.value <= 275){
    split = [
      {
        gt: 10,
        lt: 11,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 275 && res.value <= 300){
    split = [
        {
          gt: 11,
          lt: 12,
          color: '#3487D1'
        }
    ]
  }else if (res.value > 300 && res.value <= 325){
    split = [
      {
        gt: 12,
        lt: 13,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 350 && res.value <= 375){
    split = [
      {
        gt: 13,
        lt: 14,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 375 && res.value <= 400){
    split = [
        {
          gt: 14,
          lt: 15,
          color: '#3487D1'
        }
    ]
  }else if (res.value > 400 && res.value <= 425){
    split = [
      {
        gt: 16,
        lt: 17,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 425 && res.value <= 450){
    split = [
      {
        gt: 17,
        lt: 18,
        color: '#3487D1'
      }
    ]
  }else if (res.value > 450 && res.value <= 475){
    split = [
      {
        gt: 18,
        lt: 19,
        color: '#3487D1'
      }
    ]
  }
  let option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data:['0ms','25ms','50ms','75ms','100ms','125ms','150ms','175ms','200ms','225ms','250ms','275ms','300ms','325ms','350ms','375ms','400ms','425ms','450ms','475ms'],
      axisTick: {
        show: false
      },
      axisLabel:{
        interval:0,
        rotate:45
      },
      splitLine:{
        show:true
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '30%'],
      show:false
    },
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: split
    },
    series: [
      {
        type: 'line',
        smooth: 0.6,
        lineStyle: {
          color: '#3487D1',
          width: 2
        },
        symbol:'circle',
        symbolSize:10,
        itemStyle: {
          color: '#04a56e'
        },
        // markLine: {
        //   symbol: ['none', 'none'],
        //   label: { show: false },
        //   data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
        // },
        areaStyle: {},
        data: [0, 0.01, 0.08, 0.53, 2.42, 7.53, 16.03, 22.40, 24.40, 16.03, 7.53, 2.42, 2.42, 0.53, 0.08, 0.01, 0, 0, 0, 0]
      }
    ],
    grid:{
      top:'10%',
      bottom:'10%',
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: function (value) {
        console.info(value)
        return '人类反应占比' + value + '%';
      }
    },
  };
  option && myChart.setOption(option);
}

function testAgain(){
  router.push({
    path:'/HomeView'
  })
}

const word = ref('')
const showWord = ref(false)
const audio = ref()

function playW(){
  if (word.value !== ''){
    audio.value.currentTime = 0;
    audio.value.play();
  }else{
    let a = Math.floor(Math.random()*2)
    showWord.value = false
    if (level.value === 'pro'){
      if (a === 0){
        audio.value = new Audio('/static/辕门射戟.wav')
        audio.value.currentTime = 0;
        audio.value.play();
        word.value = '辕门射戟！！好快！好准！你确实拿他没有办法！这是TOP1啊！'
      }else if (a === 1){
        audio.value = new Audio('/static/你敢和他作对啊.wav')
        audio.value.currentTime = 0;
        audio.value.play();
        word.value = '这是donk啊！你敢跟他作对啊！'
      }
    }else if (level.value === 's'){
      if (a === 0){
        audio.value = new Audio('/static/人类极限是这样的.wav')
        audio.value.currentTime = 0;
        audio.value.play();
        word.value = '人类极限是这样的~~~'
      }else if (a === 1){
        audio.value = new Audio('/static/钢铁般的左键.wav')
        audio.value.currentTime = 0;
        audio.value.play();
        word.value = '钢铁般的左键！无解的直架'
      }
    }else if (level.value === 'a') {
      if (a === 0){
        audio.value = new Audio('/static/这何尝不是一种救赎呢.wav')
        audio.value.currentTime = 0;
        audio.value.play();
        word.value = '这何尝不是一种救赎呢！！'
      }else if (a === 1){
        audio.value = new Audio('/static/那也行吧.wav')
        audio.value.currentTime = 0;
        audio.value.play();
        word.value = '那也行吧~'
      }
    }else if (level.value === 'c') {
      if (a === 0){
        audio.value = new Audio('/static/0蛋.wav')
        audio.value.currentTime = 0;
        audio.value.play();
        word.value = '唉~0蛋！！！！'
      }else if (a === 1){
        audio.value = new Audio('/static/别让这枪成为遗憾.wav')
        audio.value.currentTime = 0;
        audio.value.play();
        word.value = '贴脸空枪！！别让这枪成为遗憾呐~~~~不是！这怎么空的呀！！！！'
      }
    }else{
      if (a === 0){
        audio.value = new Audio('/static/降档补油.wav')
        audio.value.currentTime = 0;
        audio.value.play();
        word.value = '啊~~~device~~啊！！！！这是人类啊！！！'
      }else if (a === 1){
        audio.value = new Audio('/static/尿.wav')
        audio.value.currentTime = 0;
        audio.value.play();
        word.value = '你的裤子里面是汗还是尿呢！我的天呐！！！是尿啊！！！全都是尿啊！！！没有一滴汗！！卧槽'
      }
    }
    showWord.value = true
  }
}

onMounted(()=>{
  initDom()
})
onBeforeUnmount(() => {
  storeRes.updateRes(0,'');
  testAgain();
  audio.value = null
  word.value = ''
});

</script>

<template>
<div class="testRes flex-c">
  <div class="title flex-aa">测试结果</div>
  <div class="detail flex">
    <div class="left flex-ca">
      <div class="pic bg-fill" :class="picComputed"></div>
      <div class="desc">{{ desc }}</div>
      <div class="chartDom" ref="chartDom"></div>
    </div>
    <div class="right flex-ca">
      <div class="result flex">
        <div class="number">{{res}}</div>
        <div class="unit">ms</div>
      </div>
      <el-button class="backBtn" @click="testAgain" type="primary" >再次测试</el-button>
      <div class="ps">或者</div>
      <div class="text flex-a">
        <div class="t1">听听</div>
        <div class="t2">玩机器、machine</div>
        <div class="t3">怎么评价你</div>
      </div>
      <el-icon :size="toVw(50)" style="cursor: pointer;margin-top: 2vh" color="#71ABDF" @click="playW" ><VideoPlay /></el-icon>
      <div class="word animate__animated animate__zoomInDown" v-if="showWord">
        {{word}}
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.testRes{
  width: 1920px;
  .title{
    width: 100%;
    height: 50px;
    font-size: 35px;
    letter-spacing: 5px;
    margin-bottom: 20hpx;
  }
  .detail{
    width: 100%;
    .left{
      width: 50%;
      .pic{
        width: 300px;
        height: 300hpx;
        z-index: 9999;
        &-pro{
          background-image: url('@/assets/img/donkRes.png');
        }
        &-s{
          background-image: url('@/assets/img/sRes.png');
        }
        &-a{
          background-image: url('@/assets/img/dank1ngRes.png');
        }
        &-c{
          background-image: url('@/assets/img/cRes.png');
        }
        &-d{
          background-image: url('@/assets/img/chickenRes.png');
        }
      }
      .desc{
        margin-top: 20hpx;
        font-size: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .chartDom{
        width: 100%;
        height: 400hpx;
      }
    }
    .right{
      width: 50%;
      .result{
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
      .backBtn{
        margin-top: 10hpx;
      }
      .ps{
        margin-top: 20hpx;
        font-size: 55px;
        color: red;
      }
      .text{
        font-size: 25px;
        .t2{
          margin-left: 5px;
          font-size: 30px;
          color: #4000ff;
          margin-right: 5px;
          font-family: 新宋体,sans-serif;
        }
      }
      .word{
        font-family: 新宋体,sans-serif;
        margin-top: 20hpx;
        font-size: 25px;
        color: black;
      }
    }
  }
}
</style>