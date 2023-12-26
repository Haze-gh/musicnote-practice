<template>
  <div class="key-box">
    <div class="whitekeys">
      <div
        v-for="(item, index) in keyNotes"
        :key="index"
        @mouseenter="hoverKeyIndex = index"
        @mouseleave="hoverKeyIndex = -1"
        @click="keyClick(note, index)"
        :class="yellowKeyIndex == index ? 'high-light-key' : ''"
      >
        <span v-show="hoverKeyIndex == index || index == 14">
          {{ item }}
        </span>
      </div>
    </div>
    <div class="blackkeys">
      <div class="group" v-for="i in 5" :key="i">
        <div v-for="i in 5" :key="i"></div>
      </div>
    </div>
  </div>
</template>

<script>
import comm from "../common/comm";

export default {
  props: {
    clef: { type: String, default: "G" },
    highLightKeyIndex: { type: Number, default: -1 },
  },
  data() {
    return {
      keyNotes: [],
      hoverKeyIndex: -1,
      yellowKeyIndex: -1,
    };
  },
  created() {
    this.keyNotes = comm.notes;
  },
  watch: {
    highLightKeyIndex() {
      let that = this;
      this.yellowKeyIndex = this.highLightKeyIndex;
      setTimeout(() => {
        that.yellowKeyIndex = -1;
      }, 500);
    },
  },
  methods: {
    keyClick(note, index) {
      this.$emit("onKeyKnock", index);
    },
  },
};
</script>
<style scoped>
.key-box {
  position: relative;
}
.whitekeys {
  display: flex;
  width: 100%;
  justify-content: center;
}
.whitekeys div {
  background: white;
  border: 1px solid black;
  width: 35px;
  height: 170px;
  line-height: 290px;
  font-weight: bolder;
  font-size: 20px;
  user-select: none;
}
.whitekeys div.high-light-key {
  background-color: orange !important;
}
.whitekeys div:hover {
  background: gainsboro;
}
.blackkeys {
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: center;
  top: 0px;
  left: -23px;
}
.blackkeys .group {
  padding-left: 22px;
}
.blackkeys .group div {
  display: inline-block;
  background: black;
  border: 1px solid black;
  width: 30px;
  height: 110px;
  margin-right: 10px;
}
.blackkeys .group div:nth-of-type(2) {
  margin-right: 35px;
}
</style>