<template lang="pug">
.form-floating
  select.form-select.bg-white#chartTypeSelect(v-model="chartType")
    option(v-for="option of types", :value="option.value", :key="option.value") {{ option.text }}
  label.form-label(for="chartTypeSelect") #[type-icon] {{ t('params.chartType') }}
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useStore } from '../store';
import TypeIcon from '~icons/mdi/chart-bar';

const { t } = useI18n();

const store = useStore();

const { chartType } = storeToRefs(store);

const types = [
  {
    text: t('chartTypes.line'),
    value: 'line',
  },
  {
    text: t('chartTypes.column'),
    value: 'column',
  },
  {
    text: t('chartTypes.area'),
    value: 'area',
  },
];
</script>
