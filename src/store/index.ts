import { defineStore } from 'pinia';
import is from '@sindresorhus/is';
import { calcMean, calcMedian, calcSum } from 'math-helper-functions';
import { parseInput } from '../helpers/parser';
import { prepareDataForChart } from '../helpers/chart';
import { computed, reactive, ref, shallowRef } from 'vue';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export const useStore = defineStore('index', () => {
  const availableColumns = shallowRef<string[]>([]);

  const axisColumns = reactive({
    x: '',
    y: '',
    series: '',
  });
  const isReady = computed(
    () => !is.emptyString(axisColumns.x) && !is.emptyString(axisColumns.y),
  );

  const Operations = {
    sum: calcSum,
    mean: calcMean,
    median: calcMedian,
  } as const;

  const operation = ref<keyof typeof Operations>('sum');
  const chartType = ref('column');

  const parsedData = shallowRef<Record<string, unknown>[]>([]);
  const dataIsReady = computed(() => is.nonEmptyArray(parsedData.value));

  const chartTitle = reactive({
    title: '',
    subtitle: '',
  });

  const xAxisOptions = reactive({
    title: '',
    sort: false,
    type: 'default' as 'default' | 'day' | 'month' | 'year',
  });

  const yAxisOptions = reactive({
    title: '',
    max: undefined as number | undefined,
  });

  const chartData = computed(() => {
    const baseData = {
      series: [],
      labels: [],
    };

    if (!isReady.value) {
      return baseData;
    }

    return prepareDataForChart(
      parsedData.value,
      {
        x: axisColumns.x,
        y: axisColumns.y,
        series: axisColumns.series,
        xAxisType: xAxisOptions.type,
        xAxisSorted: xAxisOptions.sort,
      },
      Operations[operation.value],
    );
  });

  function resetValues() {
    axisColumns.x = '';
    axisColumns.y = '';
    axisColumns.series = '';

    parsedData.value = [];
    operation.value = 'sum';
  }

  function processText(text: string) {
    const { columns, data } = parseInput(text);

    availableColumns.value = columns;
    parsedData.value = data;
  }

  function downloadData() {
    const data = chartData.value;
    const dataForExport: Record<string, unknown>[] = [];

    data.labels.forEach((label, index) => {
      const labelData = {
        label,
      };

      data.series.forEach((serie: { name: string; data: number[] }) => {
        Reflect.set(labelData, serie.name, serie.data[index]);
      });

      dataForExport.push(labelData);
    });

    saveAs(
      new Blob([
        Papa.unparse(dataForExport, {
          header: true,
        }),
      ]),
      'grafi-k.csv',
    );
  }

  return {
    availableColumns,
    axisColumns,
    operation,
    chartType,
    chartTitle,
    parsedData,
    xAxisOptions,
    yAxisOptions,
    chartData,
    resetValues,
    dataIsReady,
    processText,
    downloadData,
  };
});
