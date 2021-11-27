import is from '@sindresorhus/is';
import { ArraySorter } from 'arr-helper-functions';
import uniq from 'lodash/uniq';

export function prepareDataForChart(array, axis, operation, sortLabels) {
  const mapped = uniq(array.map((d) => d[axis.x]));
  const labels = sortLabels ? new ArraySorter(mapped).sort() : mapped;

  if (is.emptyString(axis.serie)) {
    const singleSerie = {
      name: 'All',
      data: labels.map((label) => {
        const forLabel = array.filter((d) => d[axis.x] === label);

        return operation(forLabel, axis.y);
      }),
    };

    const series = [singleSerie];

    return {
      labels,
      series,
    };
  }

  const seriesNames = new ArraySorter(uniq(array.map((d) => d[axis.series]))).sort();

  const series = seriesNames.reduce((agg, serieName) => {
    const serie = {
      name: serieName,
      data: labels.map((label) => {
        const labelData = array.filter((d) => d[axis.series] === serieName && d[axis.x] === label);

        return operation(labelData, axis.y);
      }),
    };

    agg.push(serie);

    return agg;
  }, []);

  return {
    series,
    labels,
  };
}
