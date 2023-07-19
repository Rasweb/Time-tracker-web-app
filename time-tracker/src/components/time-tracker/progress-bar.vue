<template>
  <div class="py-2">
    <v-progress-linear
      :model-value="props.timeObject.value"
      :max="props.timeObject.max"
      height="30"
      :color="props.color"
    >
      <template v-slot:default>
        <strong
          >{{ props.timeObject.value }} {{ props.timeObject.name }}</strong
        >
      </template>
    </v-progress-linear>
  </div>
</template>
<script lang="ts" setup>
interface TimeObjInt {
  name: string;
  value: number;
  max: number;
}

const props = defineProps<{
  timeObject: TimeObjInt;
  color: string;
}>();

// Default value for props
// const props = withDefaults(defineProps<Props>(), {
//   msg: 'hello'
// })
</script>
<style lang="sass"></style>
