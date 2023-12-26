<template>
  <div class="bar-item">
    <img src="../assets/icon-quarter-note.png" width="25" class="note" :style="'top:' + top + 'px'"
      :alt="noteIndex + mode" v-show="noteIndex >= 0" />
    <hr v-for="h in topAddLine" :key="h" class="add-line" :style="'top:' + (-h * 10) + 'px;'" />
    <hr v-for="h in bottomAddLine" :key="h" class="add-line" :style="'top:' + (40 + h * 10) + 'px;'" />
  </div>
</template>

<script>
export default {
  props: {
    noteIndex: { type: Number, default: 0 },
    mode: { type: String, default: "G" },
  },
  data() {
    return {
      top: 0,
      topAddLine: 0,
      bottomAddLine: 0,
    };
  },
  methods: {
    computeG() {
      let noteIndex = this.noteIndex;
      let topAddLine, bottomAddLine;
      this.top = (noteIndex - 12) * -5;
      if (noteIndex == 18) {
        bottomAddLine = 3;
      }
      if (noteIndex == 19 || noteIndex == 20) {
        bottomAddLine = 2;
      }
      if (noteIndex == 21 || noteIndex == 22) {
        bottomAddLine = 1;
      }
      if (noteIndex >= 32) {
        let number = noteIndex - 32;
        topAddLine = Math.floor(number / 2);
      }
      this.bottomAddLine = bottomAddLine;
      this.topAddLine = topAddLine;
    },
    computeF() {
      let noteIndex = this.noteIndex;
      let topAddLine, bottomAddLine;
      this.top = noteIndex * -5;
      if (noteIndex == 6) {
        bottomAddLine = 3;
      }
      if (noteIndex == 7 || noteIndex == 8) {
        bottomAddLine = 2;
      }
      if (noteIndex == 9 || noteIndex == 10) {
        bottomAddLine = 1;
      }
      if (noteIndex >= 20) {
        let number = noteIndex - 20;
        topAddLine = Math.floor(number / 2);
      }
      this.bottomAddLine = bottomAddLine;
      this.topAddLine = topAddLine;
    },
  },
  mounted() {
    if (this.noteIndex < 0) {
      return;
    }
    if (this.mode == "G") {
      this.computeG();
    } else {
      this.computeF();
    }
  },
};
</script>

<style scoped>
.bar-item {
  position: absolute;
  left: 0;
  top: 0;
}

.note {
  position: relative;
  z-index: 1;
  left: 7px;
  transform: translateY(90px);
}

.add-line {
  position: absolute;
  width: 30px;
  left: 70px;
}

.line-group {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
