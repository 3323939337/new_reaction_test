<!--suppress ALL -->
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRes } from "@/store/result";

const testState = ref("idle");
const startTime = ref<number | null>(null);
const result = ref<string>();
let timer: ReturnType<typeof setTimeout> | null = null;

const router = useRouter();
const storeRes = useRes();

let resultPagePromise: Promise<unknown> | null = null;

function preloadResultPage() {
  if (!resultPagePromise) {
    resultPagePromise = import("@/components/testRes.vue");
  }
  return resultPagePromise;
}

function startTest() {
  preloadResultPage();
  testState.value = "waiting";
  startTime.value = null;
  result.value = null;

  const random = Math.random() * 4 + 1;
  timer = setTimeout(() => {
    testState.value = "ready";
    requestAnimationFrame(() => {
      startTime.value = performance.now();
    });
  }, random * 1000);
}

function handlePadPress() {
  if (testState.value === "idle" || testState.value === "tooSoon") {
    startTest();
    return;
  }

  if (testState.value === "waiting") {
    if (timer) clearTimeout(timer);
    testState.value = "tooSoon";
    return;
  }

  if (testState.value === "ready" && startTime.value !== null) {
    const diff = performance.now() - startTime.value;
    result.value = diff.toFixed(0);

    let desc = "";
    if (result.value <= 100 && result.value > 0) {
      desc = "要不你去天禄青训试试？";
    } else if (result.value > 100 && result.value <= 150) {
      desc = "对你来说上S只是时间问题";
    } else if (result.value > 150 && result.value <= 250) {
      desc = "有时候也能比肩双汇火腿肠desuwa";
    } else if (result.value > 250 && result.value <= 350) {
      desc = "没事，记住，CS他姓C!";
    } else {
      desc = "你和地图里的鸡有什么区别 反正都开不出来枪";
    }

    storeRes.updateRes(result.value, desc);
    preloadResultPage();
    router.push({
      path: "/testRes",
    });
  }
}

onMounted(() => {
  const requestIdle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 300));
  requestIdle(() => preloadResultPage());
});

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div class="container flex">
    <div class="pic1"></div>
    <div class="mid">
      <div class="title">反应测试</div>
      <div class="title2">你是donk？还是advent？</div>
      <div class="title3" v-if="testState === 'idle'">点击色块开始，保持鼠标不动</div>
      <div class="title4" v-if="testState === 'waiting'">等它变绿</div>
      <div class="title4" v-if="testState === 'ready'">点！</div>
      <div
        class="test-pad"
        :class="`test-pad--${testState}`"
        @pointerdown="handlePadPress"
      >
        <div v-if="testState === 'idle'">开始测试</div>
        <div v-if="testState === 'waiting'">等待绿色...</div>
        <div v-if="testState === 'ready'">点击！</div>
        <div v-if="testState === 'tooSoon'">
          <div>太早了！</div>
          <div>等绿了再点！</div>
        </div>
      </div>
    </div>
    <div class="pic2"></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  width: 1920px;
  .mid {
    width: 640px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .title {
      font-size: 50px;
      letter-spacing: 10px;
      margin-top: 280hpx;
      margin-bottom: 10hpx;
    }
    .title2 {
      font-size: 30px;
      letter-spacing: 5px;
      margin-bottom: 10hpx;
    }
    .title3 {
      font-size: 30px;
      letter-spacing: 5px;
      margin-bottom: 10hpx;
    }
    .title4 {
      font-size: 30px;
      letter-spacing: 5px;
      margin-bottom: 10hpx;
    }
    .test-pad {
      width: 520px;
      height: 320hpx;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      cursor: pointer;
      user-select: none;
      border-radius: 6px;
      color: #fff;
      font-size: 42px;
      line-height: 1.4;
      transition: background-color 0.08s linear;
    }
    .test-pad.test-pad--idle {
      background-color: #2f80ed;
    }
    .test-pad.test-pad--waiting {
      background-color: #ce2636;
    }
    .test-pad.test-pad--ready {
      background-color: #18a058;
    }
    .test-pad.test-pad--tooSoon {
      background-color: #2f80ed;
    }
  }
  .pic1 {
    width: 640px;
    height: 1080hpx;
    background-image: url("@/assets/img/donk.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .pic2 {
    width: 640px;
    height: 1080hpx;
    background-image: url("@/assets/img/chicken.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>
