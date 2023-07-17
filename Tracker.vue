<template>
    <div>Tracker</div>
    <v-btn @click="startCal()">Start Timer</v-btn>
    <v-btn @click="stopTime()">Stop Timer</v-btn>

    <div v-if="timeStarted">Started time: {{ dayjs(startTime).format("DD MMMM YYYY HH:mm:ss")}}</div>
    <div v-if="timeStarted">Elapsed time: {{  elapsedVal }}</div>
    <div v-if="timeStoped">End time: {{  dayjs(currTime).format("DD MMMM YYYY HH:mm:ss") }}</div>


</template>
<script lang="ts" setup>
import {ref} from "vue"
import dayjs from "dayjs";
import realtiveTime from "dayjs/plugin/relativeTime"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

import { computed } from "vue";

const elapsedTime = ref("");
const timeStarted = ref(false)
const timeStoped = ref(false)
const startTime = ref();
const currTime = ref();
let timeoutId: ReturnType<typeof setTimeout> | null = null;

dayjs.extend(realtiveTime);
dayjs.extend(utc);
dayjs.extend(timezone)
dayjs.tz.setDefault("Europe/Berlin")

 function startCal () {
    timeStarted.value = true
    startTime.value = dayjs()
    updateTime();
 }

 
 function updateTime () {
  currTime.value = dayjs();
     if(timeStarted.value){
         timeoutId = setTimeout(updateTime, 1000)
        }
}

function stopTime () {
    timeStarted.value = false;
    if(timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
        console.log("finalVal", elapsedTime.value);
        console.log("finalVal", currTime.value);
        timeStoped.value = true

    }
}

const elapsedVal = computed(() => {
    elapsedTime.value = currTime.value.diff(startTime.value, "second")

    return elapsedTime.value
})

// TODO: Use this to format dates
// function formatDate (date: dayjs.Dayjs) {
//     dayjs(date).format("DD MMMM YYYY HH:mm:ss")
// }

</script>