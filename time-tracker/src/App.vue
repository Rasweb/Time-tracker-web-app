<template>
  <v-app>
    <v-app-bar color="#EBE3D0" dense promient app>
      <v-toolbar-title style="color: #a4770d">Time Tracker</v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-for="item in items" :key="item.id">
        <v-btn color="#a4770d" @click="navigateToPath(item.path)">
          {{ item.title }}
        </v-btn>
      </div>
      <v-btn>s</v-btn>
      <v-btn>s</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const items = reactive([
  { title: "Home", icon: "", path: "/", id: 1 },
  { title: "Tracker", icon: "", path: "/tracker", id: 2 },
]);

function navigateToPath(path: string) {
  router.push(path);
}

// {
//         title: "Dashboard",
//         icon: "fal fa-objects-column",
//         path: "/",
//         addPath: "",
//         accessibility: "",
//       },
</script>
<style>
html {
  overflow-y: hidden !important;
}
</style>
