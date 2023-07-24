<template>
  <v-card>
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <slot name="credentials"></slot>
          </v-col>
          <v-col cols="12"></v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>
const props = defineProps<{}>();
</script>
<style></style>
