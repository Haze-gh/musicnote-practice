<template>
  <div class="record-box">
    <div class="text-box">
      <div>
        <h3>{{ curTime.toFixed(2) }} s</h3>
      </div>
      <div>
        <div>
          <span>Count: {{ clickCount }}</span>
        </div>
        <div>
          <span>AvgTime:
            {{ clickCount != 0 ? (countTime / clickCount).toFixed(2) : 0 }}
            s</span>
        </div>
        <div>
          <span>Correct: {{ rightCount }}</span>
        </div>
        <div>
          <span>Accuracy:
            {{ clickCount != 0 ? ((rightCount / clickCount) * 100).toFixed(2) : 0 }}
            %
          </span>
        </div>
      </div>
      <div>
        <button @click="stopRecord" v-if="recordTimeCor != null">Stop</button>
        <button @click="clearRecord" v-if="recordTimeCor == null">Clear</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightCount: 0, //正确次数
      curTime: 0, //当前音符未点击时间
      countTime: 0, //总经过时间
      clickCount: 0, //点击次数
      recordTimeCor: null,
    };
  },
  methods: {
    Add(correct) {
      this.rightCount += correct ? 1 : 0;
      this.clickCount++;
      this.countTime += this.curTime;
      this.curTime = 0;
    },
    startRecord() {
      if (this.recordTimeCor == null) {
        this.recordTimeCor = setInterval(this.countTimeCor, 50);
      }
    },
    clearRecord() {
      this.rightCount = 0;
      this.curTime = 0;
      this.countTime = 0;
      this.clickCount = 0;
    },
    stopRecord() {
      clearInterval(this.recordTimeCor);
      this.recordTimeCor = null;
    },
    countTimeCor() {
      this.curTime += 0.05;
    },
  },
};
</script>

<style scoped>
.record-box *,
.btn-box * {
  margin-right: 15px;
}

.text-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-box>* {}

.btn-box {
  margin-top: 5px;
}
</style>