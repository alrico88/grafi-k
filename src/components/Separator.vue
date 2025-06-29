<template lang="pug">
.hstack.gap-2.align-items-center.w-100
  .me-2
    h5.mb-0.fw-bold #[slot(name='icon')] {{ text }}
  .flex-grow-1
    hr
  .ms-2(v-if='$slots.right')
    slot(name='right')
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>
