import is from '@sindresorhus/is';
import { ArraySorter } from 'arr-helper-functions';
import dayjs from 'dayjs';
import { calcDomain } from 'math-helper-functions';

const dateFormats = {
  day: 'YYYYMMDD',
  month: 'YYYYMM',
  year: 'YYYY',
};

const endFormats = {
  day: 'ddd DD MMM YYYY',
  month: 'MMM YYYY',
  year: 'YYYY',
};

type xAxisType = 'default' | 'day' | 'month' | 'year';

function formatLabels(labels: string[], type: xAxisType): unknown[] {
  if (type === 'default') {
    return labels;
  }

  const inFormat = dateFormats[type];
  const outFormat = endFormats[type];
  return labels.map((label) => dayjs(label, inFormat).format(outFormat));
}

export function prepareDataForChart(
  array: Record<string, unknown>[],
  axis: {
    x: string;
    y: string;
    series: string;
    xAxisType: xAxisType;
    xAxisSorted: boolean;
  },
  operation: (
    array: Record<string, unknown>[],
    prop: string,
  ) => number | undefined,
) {
  let mapped: unknown[] = [];

  if (axis.xAxisType === 'default') {
    mapped = [...new Set(array.map((d) => d[axis.x]))];
  } else {
    const format = dateFormats[axis.xAxisType];

    const [min, max] = calcDomain([
      ...new Set(array.map((d) => Number(d[axis.x]))),
    ]);

    let current = String(min);

    const end = dayjs(String(max), format);

    while (
      dayjs(current, format).isBefore(end) ||
      dayjs(current, format).isSame(end)
    ) {
      current = dayjs(current).add(1, axis.xAxisType).format(format);
      mapped.push(current);
    }
  }

  const labels = axis.xAxisSorted ? new ArraySorter(mapped).sort() : mapped;

  if (is.emptyString(axis.series)) {
    const singleSerie = {
      name: 'All',
      data: labels.map((label) => {
        const forLabel = array.filter((d) => d[axis.x] === label);

        return operation(forLabel, axis.y);
      }),
    };

    const series = [singleSerie];

    return {
      labels: formatLabels(labels, axis.xAxisType),
      series,
    };
  }

  const seriesNames = new ArraySorter([
    ...new Set(array.map((d) => d[axis.series])),
  ]).sort();

  const series = seriesNames.reduce((agg, serieName) => {
    const serie = {
      name: serieName,
      data: labels.map((label) => {
        const labelData = array.filter(
          (d) => d[axis.series] === serieName && d[axis.x] === label,
        );

        return operation(labelData, axis.y);
      }),
    };

    agg.push(serie);

    return agg;
  }, []);

  return {
    series,
    labels: formatLabels(labels, axis.xAxisType),
  };
}
