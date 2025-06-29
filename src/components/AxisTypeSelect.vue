<template lang="pug">
b-form-select(:options='options', v-model='modelValue')
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { BFormSelect } from 'bootstrap-vue-next';

const modelValue = defineModel('default');

const { t } = useI18n();

const options = [
  {
    text: t('normal'),
    value: 'default',
  },
  {
    text: `${t('day')} (YYYYMMDD)`,
    value: 'day',
  },
  {
    text: `${t('month')} (YYYYMM)`,
    value: 'month',
  },
  {
    text: `${t('year')} (YYYY)`,
    value: 'year',
  },
];
</script>

<i18n lang="yaml">
en:
  type: Type of Axis
  normal: Normal
  day: Day
  month: Month
  year: Year
es:
  type: Tipo de eje
  normal: Normal
  day: Día
  month: Mes
  year: Año
</i18n>
