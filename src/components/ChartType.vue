<template lang="pug">
b-form-group
  template(#label) #[type-icon] {{ t('chartType') }}
  b-form-select(v-model='store.chartType', :options='types')
</template>

<script setup lang="ts">
import { BFormGroup, BFormSelect } from 'bootstrap-vue-next';
import { useI18n } from 'vue-i18n';
import { useStore } from '../store';
import TypeIcon from '~icons/mdi/chart-bar';

const { t } = useI18n();

const store = useStore();

const types = [
  {
    text: t('line'),
    value: 'line',
  },
  {
    text: t('column'),
    value: 'column',
  },
  {
    text: t('area'),
    value: 'area',
  },
];
</script>

<i18n lang="yaml">
en:
  chartType: Chart type
  line: Line
  column: Column
  area: Area
es:
  chartType: Tipo de gráfica
  line: Línea
  column: Columna
  area: Area
</i18n>
