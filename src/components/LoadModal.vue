<template lang="pug">
.modal.fade#loadModal
  .modal-dialog
    .modal-content
      .modal-header {{ t('params.loadData') }}
        button.btn.btn-close(
          data-bs-dismiss="modal",
          data-bs-target="#loadModal"
        )
      .modal-body
        form.form(@submit.prevent="handleSubmit")
          .form-group.mb-2.auto-marginator
            label.form-label #[load-icon] {{ t('loadData.fromFile') }}
            input.form-control.bg-white(type="file", @change="handleFile")
          .form-group.mb-2.auto-marginator
            label.form-label #[clip-icon] {{ t('loadData.fromText') }}
            textarea.form-control.bg-white(v-model="text", rows="10")
      .modal-footer
        button.btn.btn-success.w-100(
          @click="handleSubmit",
          :disabled="notReady",
          data-bs-dismiss="modal",
          data-bs-target="#loadModal"
        ) {{ t('loadData.ok') }}
  </template>

<script setup>
import { readAsText } from 'promise-file-reader';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '../store';
import LoadIcon from '~icons/ic/round-file-open';
import ClipIcon from '~icons/bi/clipboard-plus';

const { t } = useI18n();

const store = useStore();

const text = ref('');
const notReady = computed(() => text.value === '');

async function handleFile(event) {
  text.value = await readAsText(event.target.files[0]);
}

function handleSubmit() {
  store.resetValues();
  store.processText(text.value);
}
</script>
