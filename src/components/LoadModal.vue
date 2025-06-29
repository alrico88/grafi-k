<template lang="pug">
b-modal#loadModal(fade, :title='t("loadData")')
  b-form.vstack.gap-2(@submit.prevent='handleSubmit')
    b-form-group
      template(#label) #[load-icon] {{ t('fromFile') }}
      b-form-file(type='file', @change='handleFile')
    b-form-group
      template(#label) #[clip-icon] {{ t('fromText') }}
      b-form-textarea(v-model='text', rows='10')
  template(#footer)
    b-button.w-100(
      variant='success',
      @click='handleSubmit',
      :disabled='notReady'
    ) {{ t('ok') }}
</template>

<script setup lang="ts">
import { readAsText } from 'promise-file-reader';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '../store';
import LoadIcon from '~icons/ic/round-file-open';
import ClipIcon from '~icons/bi/clipboard-plus';
import {
  BModal,
  BFormGroup,
  BFormFile,
  BFormTextarea,
  BButton,
  useModal,
} from 'bootstrap-vue-next';

const { t } = useI18n();

const store = useStore();
const { hide } = useModal('loadModal');

const text = ref('');
const notReady = computed(() => text.value === '');

async function handleFile(event: InputEvent) {
  console.log(event);
  const files = (event.target as HTMLInputElement).files;

  if (files && files?.length > 0) {
    const cosa = await readAsText(files[0] as Blob);
    console.log({ cosa });
    text.value = cosa;
  }
}

function handleSubmit() {
  store.resetValues();
  store.processText(text.value);

  hide();
}
</script>

<i18n lang="yaml">
en:
  loadData: Load data
  fromFile: From a file
  fromText: From text
  ok: Ok
es:
  loadData: Cargar datos
  fromFile: Desde un archivo
  fromText: Desde texto
  ok: Ok
</i18n>
