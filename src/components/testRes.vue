<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import * as echarts from "echarts";
import { storeToRefs } from "pinia";

import { useRes } from "@/store/result";
import { toVw } from "@/assets/js/adaptSum.js";

const storeRes = useRes();
const { res, desc } = storeToRefs(storeRes);

const router = useRouter();
const chartDom = ref(null);
let chart = null;

// 1) 等级：用阈值表简化
const LEVEL_RULES = [
  { max: 100, level: "pro" },
  { max: 150, level: "s" },
  { max: 250, level: "a" },
  { max: 350, level: "c" },
  { max: Infinity, level: "d" }
];

const level = computed(() => {
  const v = Number(res.value) || 0;
  if (v <= 0) return "d";
  return LEVEL_RULES.find(r => v <= r.max)?.level ?? "d";
});

// 2) 图片 class：规则统一
const picComputed = computed(() => `pic-${level.value}`);

// 3) xAxis：自动生成 0ms~475ms（20 个点）
const X_LABELS = Array.from({ length: 20 }, (_, i) => `${i * 25}ms`);

// 4) 根据 res 生成 visualMap pieces（按 25ms 分桶）
//    原来那一串 if/else 本质就是：res 落在哪个 25ms 区间 -> 高亮哪个桶
function buildPieces(v) {
  const val = Number(v) || 0;
  if (val <= 0) return [];
  // 1~25 => 0, 26~50 => 1 ... 476+ 也会被 clamp 到最后
  const idx = Math.min(Math.max(Math.floor((val - 1) / 25), 0), X_LABELS.length - 1);
  return [{ gt: idx, lt: idx + 1, color: "#3487D1" }];
}

// 5) ECharts option：拆成函数更清晰
const SERIES_DATA = [0, 0.01, 0.08, 0.53, 2.42, 7.53, 16.03, 22.4, 24.4, 16.03, 7.53, 2.42, 2.42, 0.53, 0.08, 0.01, 0, 0, 0, 0];

function buildOption(v) {
  return {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: X_LABELS,
      axisTick: { show: false },
      axisLabel: { interval: 0, rotate: 45 },
      splitLine: { show: true }
    },
    yAxis: { type: "value", boundaryGap: [0, "30%"], show: false },
    visualMap: {
      type: "piecewise",
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: buildPieces(v)
    },
    series: [
      {
        type: "line",
        smooth: 0.6,
        lineStyle: { color: "#3487D1", width: 2 },
        symbol: "circle",
        symbolSize: 10,
        itemStyle: { color: "#04a56e" },
        areaStyle: {},
        data: SERIES_DATA
      }
    ],
    grid: { top: "10%", bottom: "10%" },
    tooltip: {
      trigger: "axis",
      valueFormatter: (value) => `人类反应占比${value}%`
    }
  };
}

function initChart() {
  if (!chartDom.value) return;
  chart = echarts.init(chartDom.value);
  chart.setOption(buildOption(res.value));
}

// res 变了就更新（不重建图表）
watch(
    res,
    (v) => {
      if (!chart) return;
      chart.setOption(
          { visualMap: { pieces: buildPieces(v) } },
          { notMerge: false }
      );
    },
    { immediate: false }
);

function testAgain() {
  router.push("/HomeView");
}

// 6) 语音 + 文案：用配置表收纳
const VOICE_MAP = {
  pro: [
    { src: "/static/辕门射戟.wav", text: "辕门射戟！！好快！好准！你确实拿他没有办法！这是TOP1啊！" },
    { src: "/static/你敢和他作对啊.wav", text: "这是donk啊！你敢跟他作对啊！" }
  ],
  s: [
    { src: "/static/人类极限是这样的.wav", text: "人类极限是这样的~~~" },
    { src: "/static/钢铁般的左键.wav", text: "钢铁般的左键！无解的直架" }
  ],
  a: [
    { src: "/static/这何尝不是一种救赎呢.wav", text: "这何尝不是一种救赎呢！！" },
    { src: "/static/那也行吧.wav", text: "那也行吧~" }
  ],
  c: [
    { src: "/static/0蛋.wav", text: "唉~0蛋！！！！" },
    { src: "/static/别让这枪成为遗憾.wav", text: "贴脸空枪！！别让这枪成为遗憾呐~~~~不是！这怎么空的呀！！！！" }
  ],
  d: [
    { src: "/static/降档补油.wav", text: "啊~~~device~~啊！！！！这是人类啊！！！" },
    { src: "/static/尿.wav", text: "你的裤子里面是汗还是尿呢！我的天呐！！！是尿啊！！！全都是尿啊！！！没有一滴汗！！卧槽" }
  ]
};

const word = ref("");
const showWord = ref(false);
let audioObj = null;

function playW() {
  // 已经生成过一次，就只重播
  if (word.value && audioObj) {
    audioObj.currentTime = 0;
    audioObj.play();
    return;
  }

  const list = VOICE_MAP[level.value] ?? VOICE_MAP.d;
  const pick = list[Math.floor(Math.random() * list.length)];

  showWord.value = false;
  word.value = pick.text;

  audioObj = new Audio(pick.src);
  audioObj.currentTime = 0;
  audioObj.play();

  showWord.value = true;
}

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  // 清理图表
  if (chart) {
    chart.dispose();
    chart = null;
  }

  // 清理 store + 音频
  storeRes.updateRes(0, "");
  if (audioObj) {
    audioObj.pause();
    audioObj = null;
  }
  word.value = "";
  showWord.value = false;

  // 保持你原来的逻辑：卸载时返回首页
  testAgain();
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
          <div class="number">{{ res }}</div>
          <div class="unit">ms</div>
        </div>

        <el-button class="backBtn" @click="testAgain" type="primary">再次测试</el-button>

        <div class="ps">或者</div>

        <div class="text flex-a">
          <div class="t1">听听</div>
          <div class="t2">玩机器、machine</div>
          <div class="t3">怎么评价你</div>
        </div>

        <el-icon
            :size="toVw(50)"
            style="cursor: pointer; margin-top: 2vh"
            color="#71ABDF"
            @click="playW"
        >
          <VideoPlay />
        </el-icon>

        <div class="word animate__animated animate__zoomInDown" v-if="showWord">
          {{ word }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 你的样式我没动（保持原样） */
.testRes {
  width: 1920px;
  .title {
    width: 100%;
    height: 50px;
    font-size: 35px;
    letter-spacing: 5px;
    margin-bottom: 20hpx;
  }
  .detail {
    width: 100%;
    .left {
      width: 50%;
      .pic {
        width: 300px;
        height: 300hpx;
        z-index: 9999;
        &-pro { background-image: url("@/assets/img/donkRes.png"); }
        &-s { background-image: url("@/assets/img/sRes.png"); }
        &-a { background-image: url("@/assets/img/dank1ngRes.png"); }
        &-c { background-image: url("@/assets/img/cRes.png"); }
        &-d { background-image: url("@/assets/img/chickenRes.png"); }
      }
      .desc {
        margin-top: 20hpx;
        font-size: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .chartDom {
        width: 100%;
        height: 400hpx;
      }
    }
    .right {
      width: 50%;
      .result {
        .number { font-size: 50px; color: red; }
        .unit { font-size: 30px; margin-top: 22hpx; margin-left: 10px; }
      }
      .backBtn { margin-top: 10hpx; }
      .ps { margin-top: 20hpx; font-size: 55px; color: red; }
      .text {
        font-size: 25px;
        .t2 {
          margin-left: 5px;
          font-size: 30px;
          color: #4000ff;
          margin-right: 5px;
          font-family: 新宋体, sans-serif;
        }
      }
      .word {
        font-family: 新宋体, sans-serif;
        margin-top: 20hpx;
        font-size: 25px;
        color: black;
      }
    }
  }
}
</style>