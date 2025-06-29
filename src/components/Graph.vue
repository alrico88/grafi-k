<template lang="pug">
highcharts(:options='chartOptions', ref='chart')
</template>

<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '../store/index';
import { downloadEmitter } from '../helpers/emitter';
import is from '@sindresorhus/is';

const store = useStore();

const { chartData, chartType, axisColumns } = storeToRefs(store);

const chartOptions = computed(() => ({
  chart: {
    type: chartType.value,
  },
  exporting: {
    enabled: false,
  },
  title: {
    text: store.chartTitle.title,
  },
  subtitle: {
    text: store.chartTitle.subtitle,
  },
  xAxis: {
    categories: chartData.value.labels,
    title: {
      text: axisColumns.value.x,
    },
  },
  yAxis: {
    title: {
      text: axisColumns.value.y,
    },
    max: is.nonEmptyStringAndNotWhitespace(store.yAxisOptions.max)
      ? Number(store.yAxisOptions.max)
      : undefined,
  },
  series: chartData.value.series,
  legend: {
    verticalAlign: 'top',
  },
}));

const chart = useTemplateRef('chart');

downloadEmitter.on('download', () => {
  chart.value.chart.exportChart('image/png');
});
</script>
