<template lang="pug">
select.form-select.bg-white(v-model="selectedBind")
  option(value="") --
  option(v-for="option of options", :value="option", :key="option") {{ option }}
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: false,
    default: () => [],
  },
  selected: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:selected']);

const selectedBind = computed({
  get() {
    return props.selected;
  },
  set(val) {
    emit('update:selected', val);
  },
});
</script>
