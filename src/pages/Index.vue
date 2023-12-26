<template>
  <div class="page">
    <recordboxVue ref="record" />
    <div class="room" style="margin-top: 75px">
      <div class="beat-box">
        <img src="../assets/icon-G-clef.png" class="G-clef" width="60" />
        <div class="beat">
          <span>4</span>
          <br />
          <span>4</span>
        </div>
      </div>
      <div class="bar" v-for="barIndex in gNotes.length" :key="barIndex">
        <notebox v-for="item in gNotes[barIndex - 1]" :key="item" :noteIndex="item.noteIndex" :mode="'G'" :class="
          (item.id == curId ? 'hight ' : '') +
          (item.status == 1 ? 'right' : item.status == -1 ? 'wrong' : '')
        " :id="item.id" />
      </div>
    </div>
    <div class="room">
      <div class="beat-box">
        <img src="../assets/icon-F-clef.png" class="F-clef" width="35" />
      </div>
      <div class="bar" v-for="barIndex in fNotes.length" :key="barIndex">
        <notebox v-for="item in fNotes[barIndex - 1]" :key="item" :noteIndex="item.noteIndex" :mode="'F'" :class="
          (item.id == curId ? 'hight ' : '') +
          (item.status == 1 ? 'right' : item.status == -1 ? 'wrong' : '')
        " :id="item.id" />
      </div>
    </div>
    <keyboradVue @onKeyKnock="keyClick" :highLightKeyIndex="rightKey"></keyboradVue>
  </div>
</template>

<script>
import haze from "../utils/hazecore";
import keyboradVue from "../components/keyborad.vue";
import recordboxVue from "../components/recordbox.vue";
import notebox from "../components/notebox.vue";
import comm from "../common/comm";

export default {
  name: "Gclef-single",
  components: {
    keyboradVue,
    recordboxVue,
    notebox,
  },
  data() {
    return {
      notes: [],
      gNotes: [],
      fNotes: [],
      curId: -1,
      rightKey: -1
    };
  },
  created() {
    this.notes = comm.notes;
    this.clearStaff();
  },
  methods: {
    createRandomNote() {
      let noteId = 0;
      for (let b = 0; b < 4; b++) {
        let gArr = [],
          fArr = [];
        for (let i = 0; i < 4; i++) {
          let noteIndex = haze.randomValue(0, this.notes.length - 1); //防止生成到小子四组的c
          let mode = "G";
          if (noteIndex > 18) {
            mode = "G";
          } else if (noteIndex < 10) {
            mode = "F";
          } else {
            mode = haze.randomValue(0, 100) > 50 ? "G" : "F";
          }
          if (mode == "G") {
            gArr.push({
              noteIndex,
              id: noteId++,
              status: 0,
            });
            fArr.push({
              noteIndex: -1,
              id: -2,
              status: 0,
            });
          } else {
            fArr.push({
              noteIndex,
              id: noteId++,
              status: 0,
            });
            gArr.push({
              noteIndex: -1,
              id: -2,
              status: 0,
            });
          }
        }
        this.gNotes.push(gArr);
        this.fNotes.push(fArr);
      }
    },
    clearStaff() {
      this.curId = 0;
      this.gNotes.splice(0, this.gNotes.length);
      this.fNotes.splice(0, this.fNotes.length);
      this.createRandomNote();
    },
    keyClick(index) {
      this.$refs.record.startRecord();
      let correct = false;
      if (this.curId > 15) {
        return;
      }
      for (let i = 0; i < this.gNotes.length; i++) {
        for (let n = 0; n < this.gNotes[i].length; n++) {
          let item = this.gNotes[i][n];
          if (item.id == this.curId) {
            //先找到当前高亮的音符，再判断按下的键索引与音符索引是否一致
            if (item.noteIndex == index) {
              this.gNotes[i][n].status = 1;
              correct = true;
            } else {
              this.gNotes[i][n].status = -1;
            }
            this.rightKey = item.noteIndex;
          }
        }
      }
      for (let i = 0; i < this.fNotes.length; i++) {
        for (let n = 0; n < this.fNotes[i].length; n++) {
          let item = this.fNotes[i][n];
          if (item.id == this.curId) {
            //先找到当前高亮的音符，再判断按下的键索引与音符索引是否一致
            if (item.noteIndex == index) {
              correct = true;
              this.fNotes[i][n].status = 1;
            } else {
              this.fNotes[i][n].status = -1;
            }
            this.rightKey = item.noteIndex;
          }
        }
      }
      this.$refs.record.Add(correct);
      this.curId++;
      if (this.curId > 15) {
        let that = this;
        this.$refs.record.stopRecord();
        setTimeout(() => {
          that.$refs.record.startRecord();
          that.clearStaff();
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
.hight {
  background: rgba(207, 207, 207, 0.37);
}

.right {
  background: rgba(5, 94, 153, 0.247);
}

.wrong {
  background: rgba(255, 0, 0, 0.37);
}
</style>
