<template>
  <v-card>
    <v-container>
      <!-- Text row -->
      <v-row>
        <v-col>
          <v-card-title> Your active tracker </v-card-title>
        </v-col>
      </v-row>

      <div>
        <progressbar :timeObject="timeStats.days" color="blue"></progressbar>
        <progressbar :timeObject="timeStats.hours" color="blue"></progressbar>
        <progressbar :timeObject="timeStats.minutes" color="blue"></progressbar>
        <progressbar :timeObject="timeStats.seconds" color="blue"></progressbar>
      </div>

      <v-row>
        <v-col>
          <div v-if="timeStarted">Elapsed time: {{ elapsedVal }}</div>
        </v-col>
        <v-col>
          <div v-if="timeStoped && !timeStarted">
            End time: {{ dayjs(currTime).format("DD MMMM YYYY HH:mm:ss") }}
          </div>
        </v-col>
        <v-col>
          <div v-if="timeStarted">
            Started time: {{ dayjs(startTime).format("DD MMMM YYYY HH:mm:ss") }}
          </div>
        </v-col>
      </v-row>

      <!-- Action row -->
      <v-row>
        <v-col>
          <v-card-actions>
            <v-btn v-if="!timeStarted" @click="startCal()">Start Timer</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card-actions>
            <v-btn v-if="timeStarted" @click="stopTime()">Stop Timer</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <!-- layout example -->
  <!-- <div> -->
  <!-- nurvarande tid -->
  <!-- <div>mån</div>
    <div>veck</div>
    <div>dag</div>
    <div>tim</div>
    <div>min</div>
    <div>sek</div> -->

  <!-- nästa rank -->
  <!-- <div>rank namn</div>
    <div>antal timmar kvar</div>
    <div>progress bar</div> -->

  <!-- övrigt -->
  <!-- <div>startdatum</div>
    <div>historik</div>
  </div> -->

  <div v-if="timeStarted">
    Started time: {{ dayjs(startTime).format("DD MMMM YYYY HH:mm:ss") }}
  </div>
  <div v-if="timeStarted">Elapsed time: {{ elapsedVal }}</div>
  <div v-if="timeStoped">
    End time: {{ dayjs(currTime).format("DD MMMM YYYY HH:mm:ss") }}
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import dayjs from "dayjs";
import realtiveTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import { ranks } from "@/data/ranks";
import progressbar from "./progress-bar.vue";
import { computed } from "vue";

const elapsedTime = ref("");
const timeStarted = ref(false);
const timeStoped = ref(false);
const startTime = ref();
const currTime = ref();

const timeStats = ref({
  days: {
    name: "days",
    value: 0,
    max: 30,
  },
  hours: {
    name: "hours",
    value: 0,
    max: 24,
  },
  minutes: {
    name: "minutes",
    value: 0,
    max: 60,
  },
  seconds: {
    name: "seconds",
    value: 0,
    max: 60,
  },
});

let timeoutId: ReturnType<typeof setTimeout> | null = null;

dayjs.extend(realtiveTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/Berlin");

function startCal() {
  timeStarted.value = true;
  startTime.value = dayjs();
  updateTime();
}

function updateTime() {
  currTime.value = dayjs();
  if (timeStarted.value) {
    timeoutId = setTimeout(updateTime, 1000);

    const timeSeconds = currTime.value.diff(startTime.value, "seconds");
    const timeMinutes = Math.floor(timeSeconds / 60);
    const timeHours = Math.floor(timeMinutes / 60);
    const timeDays = Math.floor(timeHours / 24);

    timeStats.value.seconds.value = timeSeconds;
    timeStats.value.minutes.value = timeMinutes;
    timeStats.value.hours.value = timeHours;
    timeStats.value.days.value = timeDays;
  }
}

function stopTime() {
  timeStarted.value = false;
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
    // console.log("finalVal", elapsedTime.value);
    // console.log("finalVal", currTime.value);
  }
}

const elapsedVal = computed(() => {
  elapsedTime.value = currTime.value.diff(startTime.value, "second");

  return elapsedTime.value;
});

//  TODO: Implement local storage saving
// // Retrieve your data from locaStorage
// var saveData = JSON.parse(localStorage.saveData || null) || {};

// // Store your data.
// function saveStuff(obj) {
//   saveData.obj = obj;
//   // saveData.foo = foo;
//   saveData.time = new Date().getTime();
//   localStorage.saveData = JSON.stringify(saveData);
// }

// // Do something with your data.
// function loadStuff() {
//   return saveData.obj || "default";
// }

// TODO: Use this to format dates
// function formatDate (date: dayjs.Dayjs) {
//     dayjs(date).format("DD MMMM YYYY HH:mm:ss")
// }
</script>
