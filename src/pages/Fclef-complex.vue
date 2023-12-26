<template>
  <div class="page">
    <h2 @click="to">低音谱号 - 单音符</h2>
    <div class="record-box">
      <span>{{ record.curTime.toFixed(2) }} s</span>
      <span>Count: {{ record.clickCount }}</span>
      <span
        >AvgTime:
        {{
          record.clickCount != 0
            ? (record.countTime / record.clickCount).toFixed(2)
            : 0
        }}
        s</span
      >
      <span>Correct: {{ record.rightCount }}</span>
      <span
        >Correct(rate):
        {{
          record.clickCount != 0
            ? ((record.rightCount / record.clickCount) * 100).toFixed(2)
            : 0
        }}
        %
      </span>
    </div>
    <div class="btn-box">
      <button @click="startRecord" v-if="recordTimeCor == null">Start</button>
      <button @click="stopRecord" v-if="recordTimeCor != null">Stop</button>
      <button @click="clearRecord" v-if="recordTimeCor == null">Clear</button>
    </div>
    <div class="room">
      <div class="step">
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <img src="../assets/icon-F-clef.png" class="F-clef" width="35" />
        <div class="beat">
          <span>4</span>
          <br />
          <span>4</span>
        </div>
      </div>
    </div>
    <keyboradVue
      @onKeyKnock="keyClick"
      :highLightKeyIndex="rightKeyIndex"
      :clef="'F'"
    ></keyboradVue>
  </div>
</template>

<script>
import haze from "../utils/hazecore";
import keyboradVue from "../components/keyborad.vue";

export default {
  name: "Gclef-single",
  components: {
    keyboradVue,
  },
  data() {
    return {
      noteIndex: -1,
      overLineCount: 0,
      marks: ["c", "d", "e", "f", "g", "a", "b"],
      group: 0,
      hoverKeyIndex: -1,
      rightKeyIndex: -1,
      record: {
        rightCount: 0,
        curTime: 0,
        countTime: 0,
        clickCount: 0,
      },
      recordTimeCor: null,
    };
  },
  created() {
    this.randomNote();
  },
  methods: {
    to() {
      this.$emit("titleClick", 2);
    },
    randomNote() {
      let newIndex = haze.randomValue(0, 22); //C - a1
      while (this.noteIndex == newIndex || newIndex < 2) {
        newIndex = haze.randomValue(0, 22);
      }
      this.noteIndex = newIndex;
      if (newIndex > 14) {
        if (newIndex % 2 != 0) {
          newIndex--;
        }
        this.overLineCount = (newIndex - 14) / 2;
      }
      if (newIndex < 6) {
        if (newIndex % 2 != 0) {
          newIndex++;
        }
        this.overLineCount = (6 - newIndex) / 2;
      }
    },
    keyClick(index) {
      if (this.recordTimeCor == null) {
        this.startRecord();
      }
      this.rightKeyIndex = this.noteIndex + 1;
      if (index == this.rightKeyIndex) {
        this.record.rightCount++;
      }
      this.record.clickCount++;
      this.record.countTime += this.record.curTime;
      this.record.curTime = 0;
      this.randomNote();
      setTimeout(() => {
        this.rightKeyIndex = -1;
      }, 250);
    },
    startRecord() {
      this.recordTimeCor = setInterval(this.countTime, 50);
    },
    clearRecord() {
      this.record = {
        rightCount: 0,
        curTime: 0,
        countTime: 0,
        clickCount: 0,
      };
    },
    stopRecord() {
      clearInterval(this.recordTimeCor);
      this.recordTimeCor = null;
    },
    countTime() {
      this.record.curTime += 0.05;
    },
  },
};
</script>

<style scoped>
</style>
