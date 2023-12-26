<template>
  <div class="page">
    <recordbox ref="record" />
    <div class="room" style="margin-top: 75px">
      <div class="bar">
        <div class="line-group">
          <hr v-for="h in 5" :key="h" style="width: 100%;" />
        </div>
        <img src="../assets/icon-G-clef.png" class="G-clef" width="60" />
      </div>
      <div class="bar" v-for="(item, index) in gNotes" :key="index" :class="
        (item.id == curId ? 'highLight ' : '') +
        (item.status == 1 ? 'right' : item.status == -1 ? 'wrong' : '')
      ">
        <div class="line-group">
          <hr v-for="h in 5" :key="h" style="width: 100%;" />
        </div>
        <notebox :noteIndex="item.noteIndex" :mode="'G'" />
      </div>
    </div>
    <div class="room">
      <div class="bar">
        <div class="line-group">
          <hr v-for="h in 5" :key="h" style="width: 100%;" />
        </div>
        <img src="../assets/icon-F-clef.png" class="F-clef" width="35" />
      </div>
      <div class="bar" v-for="(item, index) in fNotes" :key="index" :class="
        (item.id == curId ? 'highLight ' : '') +
        (item.status == 1 ? 'right' : item.status == -1 ? 'wrong' : '')
      ">
        <div class="line-group">
          <hr v-for="h in 5" :key="h" style="width: 100%;" />
        </div>
        <notebox :noteIndex="item.noteIndex" :mode="'F'" />
      </div>
    </div>
    <h3>{{ rightNote }}</h3>
    <div class="btn-group">
      <button @click="groupClick(0)">大字一组</button>
      <button @click="groupClick(1)">大字组</button>
      <button @click="groupClick(2)">小字组</button>
      <button @click="groupClick(3)">小字一组</button>
      <button @click="groupClick(4)">小字二组</button>
      <button @click="groupClick(5)">小字三组</button>
    </div>
    <div style="margin-top: 20px;" class="btn-group">
      <button v-for="(item, index) in noteOptions" :key="index" @click="keyClick(index + 1)">{{ item }}</button>
    </div>
  </div>
</template>

<script>
import haze from "../utils/hazecore";
import recordbox from "../components/recordbox.vue";
import notebox from "../components/notebox.vue";
import comm from "../common/comm";

export default {
  name: "H5",
  components: {
    recordbox,
    notebox
  },
  data() {
    return {
      gNotes: [],
      fNotes: [],
      curId: -1,
      rightKey: -1,
      recordGroupIndex: 0,
      noteOptions: [],
      rightNote: "-",
    };
  },
  created() {
    this.reset();
  },
  methods: {
    reset() {
      this.curId = 0;
      this.gNotes.splice(0);
      this.fNotes.splice(0);
      setTimeout(this.createRandomNoteGroup, 250);
    },
    createRandomNoteGroup() {
      for (let i = 0; i < 8; i++) {
        let noteIndex = haze.randomValue(6, comm.notes.length);
        let mode = "G";
        if (noteIndex > 26) {
          mode = "G";
        } else if (noteIndex < 18) {
          mode = "F";
        } else {
          mode = haze.randomValue(0, 100) > 50 ? "G" : "F";
        }
        const item = {
          id: i,
          status: 0,
          noteIndex,
          name: comm.notes[noteIndex]
        };
        const emptyItem = {
          id: -2,
          status: 0,
          noteIndex: -1,
          name: "",
        };
        if (mode == "G") {
          this.gNotes.push(item);
          this.fNotes.push(emptyItem);
        } else {
          this.fNotes.push(item);
          this.gNotes.push(emptyItem);
        }
      }
    },
    groupClick(index) {
      this.$refs.record.startRecord();
      this.recordGroupIndex = index;
      this.noteOptions.splice(0);
      if (index <= 1) {
        this.noteOptions.push("C", "D", "E", "F", "G", "A", "B");
        if (index == 0) {
          this.noteOptions = this.noteOptions.map(x => {
            return x + "1";
          });
        }
      } else {
        this.noteOptions.push("c", "d", "e", "f", "g", "a", "b");
        if (index > 2) {
          const label = index - 2;
          this.noteOptions = this.noteOptions.map(x => {
            return x + label;
          });
        }
      }
    },
    keyClick(index) {
      let correct = false;
      if (this.curId > 15) {
        return;
      }
      let curItem = this.gNotes.find(x => x.id == this.curId);
      if (curItem == null) {
        curItem = this.fNotes.find(x => x.id == this.curId);
      }
      if (curItem == null) {
        return;
      }
      const key = this.recordGroupIndex * 7 + index;
      correct = key == curItem.noteIndex;
      if (correct) {
        curItem.status = 1;
      } else {
        curItem.status = -1;
      }
      this.$refs.record.Add(correct);
      this.curId++;
      this.noteOptions.splice(0);
      this.rightNote = curItem.name;
      if (this.curId >= 8) {
        let that = this;
        this.$refs.record.stopRecord();
        setTimeout(() => {
          that.$refs.record.startRecord();
          that.reset();
        }, 1000);
      }
    },
  },
};
</script>

<style>
.add-line {
  left: 4px !important;
}
</style>

<style scoped>
.highLight {
  background: rgba(207, 207, 207, 0.37);
}

.right {
  background: rgba(5, 94, 153, 0.247);
}

.wrong {
  background: rgba(255, 0, 0, 0.37);
}

.btn-group {
  text-align: center;
}

.btn-group>* {
  min-width: 75px;
  height: 40px;
  margin: 5px 10px;
  border-radius: 0px !important;
  background: var(--el-color-info-light-9);
  border-color: var(--el-color-info-light-5);
}

.btn-group>*:hover {
  background: rgb(135, 135, 255);
  color: white;
}
</style>
