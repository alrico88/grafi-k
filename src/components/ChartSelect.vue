<template lang="pug">
b-form-select(v-model='selected')
  b-form-select-option(value='') --
  b-form-select-option(
    v-for='option of options',
    :value='option',
    :key='option'
  ) {{ option }}
</template>

<script setup lang="ts">
import { BFormSelect, BFormSelectOption } from 'bootstrap-vue-next';

const props = withDefaults(
  defineProps<{
    options?: string[];
  }>(),
  {
    options: () => [],
  },
);

const selected = defineModel('selected');
</script>
