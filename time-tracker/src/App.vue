<template>
  <v-app>
    <v-app-bar color="primary" promient app>
      <v-toolbar-title>Time Tracker app</v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-for="item in items" :key="item.id">
        <v-btn @click="navigateToPath(item.path)">
          {{ item.title }}
        </v-btn>
      </div>
      <v-btn>s</v-btn>
      <v-btn>s</v-btn>

    </v-app-bar>
      <div>Welcome to my Time tracker app</div>

      
      <v-main>
        <router-view />
      </v-main>
    </v-app>

</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const items = reactive([
   { title: "Home", icon: "", path: "/", id: 1 },
   { title: "Tracker", icon: "", path: "/tracker", id: 2},
  ])

  function navigateToPath(path: string){
    router.push(path)
  }

  // {
  //         title: "Dashboard",
  //         icon: "fal fa-objects-column",
  //         path: "/",
  //         addPath: "",
  //         accessibility: "",
  //       },

</script>
