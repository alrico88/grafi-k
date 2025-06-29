<template lang="pug">
b-form-select(v-model='store.operation', :options='operations')
</template>

<script setup lang="ts">
import { BFormSelect } from 'bootstrap-vue-next';
import { useI18n } from 'vue-i18n';
import { useStore } from '../store';

const { t } = useI18n();

const store = useStore();

const operations = [
  {
    text: t('sum'),
    value: 'sum',
  },
  {
    text: t('mean'),
    value: 'mean',
  },
  {
    text: t('median'),
    value: 'median',
  },
];
</script>

<i18n lang="yaml">
en:
  sum: Sum
  mean: Mean
  median: Median
es:
  sum: Suma
  mean: Media
  median: Mediana
</i18n>
