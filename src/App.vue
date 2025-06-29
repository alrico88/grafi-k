<template lang="pug">
main.d-flex.flex-column.vh-100.overflow-y-auto
  .row.g-0.h-100
    .col-lg-3.h-100.overflow-y-auto
      .px-2
        .py-3
          h1.fw-bolder.mb-0.text-uppercase Grafi-k
        b-card
          template(#header)
            b-button.w-100(type='button', @click='() => show()') #[load-icon] {{ t('loadData') }}
          b-alert.mb-2.p-2(variant='success', v-if='store.dataIsReady', show) #[ok-icon] {{ t('dataReady') }}
          b-form.vstack.gap-2
            separator(text='Chart options')
            chart-type
            b-form-group
              template(#label) #[title-icon] {{ t('chartTitle') }}
              b-form-input(
                v-model='store.chartTitle.title',
                :placeholder='t("optional")'
              )
            b-form-group
              template(#label) #[subtitle-icon] {{ t('chartSubtitle') }}
              b-form-input(
                v-model='store.chartTitle.subtitle',
                :placeholder='t("optional")'
              )
            separator(:text='t("xAxis")')
            b-form-group
              template(#label) #[x-axis-icon] {{ t('column') }}
              chart-select(
                :options='store.availableColumns',
                v-model:selected='store.axisColumns.x'
              )
            .hstack.gap-2.align-items-start
              b-form-group.flex-grow-1(:label='t("xAxisType")')
                axis-type-select(v-model='store.xAxisOptions.type')
              b-form-group.flex-grow-1(
                v-if='store.xAxisOptions.type === "default"',
                :label='t("sort")'
              )
                b-form-checkbox(v-model='store.xAxisOptions.sort') {{ t('enabled') }}
            separator(:text='t("yAxis")')
            b-form-group(:description='t("yAxisHelp")')
              template(#label) #[y-axis-icon] {{ t('column') }}
              chart-select(
                :options='store.availableColumns',
                v-model:selected='store.axisColumns.y'
              )
            b-form-group(
              :label='t("axisMax")',
              :description='t("axisMaxDesc")'
            )
              b-form-input(v-model='store.yAxisOptions.max')
            separator(:text='t("series")')
            b-form-group
              .row.row-cols-lg-2.row-cols-1.g-2
                .col
                  b-form-group
                    template(#label) #[series-icon] {{ t('series') }}
                    chart-select(
                      :options='store.availableColumns',
                      v-model:selected='store.axisColumns.series'
                    )
                .col
                  b-form-group
                    template(#label) #[operation-icon] {{ t('operation') }}
                    operation-select(v-model:operation='store.operation')
            separator(:text='t("actions")')
            b-button.w-100(
              variant='primary',
              role='button',
              @click.prevent='downloadGraph'
            ) #[download-chart-icon] {{ t('downloadChart') }}
            b-button.w-100(
              variant='primary',
              role='button',
              @click.prevent='store.downloadData'
            ) #[download-data-icon] {{ t('downloadData') }}
        author-info
    .col-lg-9.h-100
      .p-3.ps-2.h-100
        graph.brad.h-100.shadow
load-modal
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import ChartSelect from './components/ChartSelect.vue';
import ChartType from './components/ChartType.vue';
import OperationSelect from './components/OperationSelect.vue';
import Graph from './components/Graph.vue';
import { downloadEmitter } from './helpers/emitter';
import { useStore } from './store';
import LoadIcon from '~icons/ic/round-file-open';
import DownloadChartIcon from '~icons/uil/image-download';
import DownloadDataIcon from '~icons/uil/file-download';
import TitleIcon from '~icons/mdi/format-text';
import SubtitleIcon from '~icons/mdi-light/dots-horizontal';
import XAxisIcon from '~icons/ph/arrows-out-line-horizontal';
import YAxisIcon from '~icons/ph/arrows-out-line-vertical';
import SeriesIcon from '~icons/clarity/blocks-group-line';
import OperationIcon from '~icons/ph/math-operations';
import AuthorInfo from './components/AuthorInfo.vue';
import LoadModal from './components/LoadModal.vue';
import OkIcon from '~icons/bi/check-circle-fill';
import {
  BButton,
  BForm,
  BFormGroup,
  BFormInput,
  BCard,
  BAlert,
  useModal,
  BFormCheckbox,
} from 'bootstrap-vue-next';
import AxisTypeSelect from './components/AxisTypeSelect.vue';
import Separator from './components/Separator.vue';

const { t } = useI18n();

const store = useStore();

const { show } = useModal('loadModal');

const { chartType } = storeToRefs(store);

function downloadGraph() {
  downloadEmitter.emit('download');
}
</script>

<style lang="scss" scoped>
.chart-height {
  height: 90%;
}
</style>

<i18n lang="yaml">
en:
  ok: Ok
  loadData: Load data
  dataReady: Data ready
  chartTitle: Chart title
  chartSubtitle: Chart subtitle
  optional: Optional
  xAxis: X Axis
  yAxis: Y Axis
  sort: Sort
  yAxisHelp: Must resolve to a numeric value
  series: Series
  operation: Operation
  downloadChart: Download chart
  xAxisType: X Axis Type
  enabled: Enabled
  export: Export
  downloadData: Download data
  axisMax: Max. axis value
  axisMaxDesc: If left empty, the axis Max. will be automatically calculated
  actions: Actions
  column: Column
es:
  ok: Ok
  loadData: Cargar datos
  dataReady: Datos listos
  chartTitle: Título de la gráfica
  chartSubtitle: Subtítulo de la gráfica
  optional: Opcional
  xAxis: Eje X
  yAxis: Eje Y
  sort: Ordenar
  yAxisHelp: Debe resolver a un valor numérico
  series: Series
  operation: Operación
  downloadChart: Descargar gráfica
  xAxisType: Tipo de eje X
  enabled: Habilitado
  export: Exportar
  downloadData: Descargar datos
  axisMax: Valor máximo del eje
  axisMaxDesc: Si se deja vacío, el máximo del eje será calculado automáticamente
  actions: Acciones
  column: Columna
</i18n>
