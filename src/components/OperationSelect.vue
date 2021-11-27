<template lang="pug">
select.form-select(v-model="operation")
  option(
    v-for="option of operations",
    :key="option.value",
    :value="option.value"
  ) {{ option.text }}
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useStore } from '../store';

const { t } = useI18n();

const store = useStore();
const { operation } = storeToRefs(store);

const operations = [
  {
    text: t('operations.sum'),
    value: 'sum',
  },
  {
    text: t('operations.mean'),
    value: 'mean',
  },
  {
    text: t('operations.median'),
    value: 'median',
  },
];
</script>
