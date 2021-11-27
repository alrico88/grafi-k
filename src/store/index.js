import { defineStore } from 'pinia';
import is from '@sindresorhus/is';
import { calcMean, calcMedian, calcSum } from 'math-helper-functions';
import parseText from '../helpers/parser';
import { prepareDataForChart } from '../helpers/chart';

export const useStore = defineStore('index', {
  state() {
    return {
      xAxis: '',
      yAxis: '',
      seriesAxis: '',
      operation: 'sum',
      chartType: 'column',
      parsedData: [],
      chartTitle: '',
      chartSubtitle: '',
      sortXAxis: false,
    };
  },
  getters: {
    isReady(state) {
      return !is.emptyString(state.xAxis) && !is.emptyString(state.yAxis);
    },
    selectedOperation(state) {
      const ops = {
        sum: calcSum,
        mean: calcMean,
        median: calcMedian,
      };
      return ops[state.operation];
    },
    columns(state) {
      const cols = state.parsedData.reduce((agg, row) => {
        Object.keys(row).forEach((prop) => {
          agg.add(prop);
        });

        return agg;
      }, new Set());

      return Array.from(cols);
    },
    chartData(state) {
      const baseData = {
        series: [],
        labels: [],
      };

      if (!this.isReady) {
        return baseData;
      }

      return prepareDataForChart(state.parsedData, {
        x: state.xAxis,
        y: state.yAxis,
        series: state.seriesAxis,
      }, this.selectedOperation, this.sortXAxis);
    },
  },
  actions: {
    processText(text) {
      this.parsedData = parseText(text);
    },
    resetValues() {
      this.parsedData = [];
      this.xAxis = '';
      this.yAxis = '';
      this.seriesAxis = '';
      this.operation = 'sum';
    },
  },
});
