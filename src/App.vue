<template lang="pug">
main.d-flex.flex-column.vh-100
  div
    .container-fluid
      .row.g-0
        .col-lg-3
          .py-4
            img(src="/logo.png", height="35")
          .card.shadow
            .card-body
              form
                .form-group.mb-2.auto-marginator
                  label.form-label #[load-icon] {{ t('params.loadData') }}
                  input.form-control.bg-white(type="file", @change="handleFile")
                .form-group.mb-2.auto-marginator
                  label.form-label #[title-icon] {{ t('params.chartTitle') }}
                  input.form-control.bg-white(
                    type="text",
                    v-model="chartTitle",
                    :placeholder="t('ui.optional')"
                  )
                .form-group.mb-2.auto-marginator
                  label.form-label #[subtitle-icon] {{ t('params.chartSubtitle') }}
                  input.form-control.bg-white(
                    type="text",
                    v-model="chartSubtitle",
                    :placeholder="t('ui.optional')"
                  )
                .form-group.mb-2.auto-marginator
                  label.form-label #[x-axis-icon] {{ t('params.xAxis') }}
                  .input-group
                    chart-select(:options="columns", v-model:selected="xAxis")
                    .input-group-text
                      .form-check.form-switch
                        input.form-check-input(type="checkbox", v-model="sortXAxis")
                        label.form-check-label {{ t('params.sort') }}
                .form-group.mb-2.auto-marginator
                  label.form-label #[y-axis-icon] {{ t('params.yAxis') }}
                  chart-select(:options="columns", v-model:selected="yAxis")
                  .form-text {{ t('params.yAxisHelp') }}
                .form-group.mb-2.auto-marginator
                  .row.g-2
                    .col
                      label.form-label #[series-icon] {{ t('params.series') }}
                      chart-select(:options="columns", v-model:selected="seriesAxis")
                    .col
                      label.form-label #[operation-icon] {{ t('params.operation') }}
                      operation-select(v-model:operation="operation")
                .form-group.mb-2.auto-marginator
                  chart-type
                .form-group.mb-2.auto-marginator
                  button.btn.btn-success.w-100(
                    role="button",
                    @click.prevent="downloadGraph"
                  ) #[download-icon] {{ t('ui.downloadChart') }}
          author-info
        .col-lg-9.vh-100
          .ps-4.pt-4.pb-4.pe-2.h-100
            graph.brad.h-100.shadow
</template>

<script setup>
import { readAsText } from 'promise-file-reader';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import ChartSelect from './components/ChartSelect.vue';
import ChartType from './components/ChartType.vue';
import OperationSelect from './components/OperationSelect.vue';
import Graph from './components/Graph.vue';
import { downloadEmitter } from './helpers/emitter';
import { useStore } from './store';
import DownloadIcon from '~icons/uil/image-download';
import LoadIcon from '~icons/ic/round-file-open';
import TitleIcon from '~icons/mdi/format-text';
import SubtitleIcon from '~icons/mdi-light/dots-horizontal';
import XAxisIcon from '~icons/ph/arrows-out-line-horizontal';
import YAxisIcon from '~icons/ph/arrows-out-line-vertical';
import SeriesIcon from '~icons/clarity/blocks-group-line';
import OperationIcon from '~icons/ph/math-operations';
import AuthorInfo from './components/AuthorInfo.vue';

const { t } = useI18n();

const store = useStore();

const {
  columns, xAxis, yAxis, seriesAxis, chartTitle, chartSubtitle, operation, chartType, sortXAxis,
} = storeToRefs(store);

async function handleFile(event) {
  const text = await readAsText(event.target.files[0]);
  store.resetValues();
  store.processText(text);
}

function downloadGraph() {
  downloadEmitter.emit('download');
}
</script>

<style lang="scss" scoped>
.chart-height {
  height: 90%;
}
</style>
