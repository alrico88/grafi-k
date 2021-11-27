<template lang="pug">
highcharts(:options="chartOptions", ref="chart")
</template>

<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '../store/index';
import { downloadEmitter } from '../helpers/emitter';

const store = useStore();

const {
  chartData, chartType, chartTitle, chartSubtitle, xAxis, yAxis,
} = storeToRefs(store);

const chartOptions = computed(() => ({
  chart: {
    type: chartType.value,
  },
  exporting: {
    enabled: false,
  },
  title: {
    text: chartTitle.value,
  },
  subtitle: {
    text: chartSubtitle.value,
  },
  xAxis: {
    categories: chartData.value.labels,
    title: {
      text: xAxis.value,
    },
  },
  yAxis: {
    title: {
      text: yAxis.value,
    },
  },
  series: chartData.value.series,
}));

const chart = ref(null);

downloadEmitter.on('download', () => {
  chart.value.chart.exportChart('image/png');
});
</script>
