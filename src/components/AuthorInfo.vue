<template lang="pug">
.row.py-3
  .col.vstack.gap-2
    div #[icon-laptop] {{ t('madeBy') }} #[a(href='https://alrico.es', target='_blank') Alberto Rico]
    div #[icon-github] {{ t('codeOn') }} #[a(:href='url', target='_blank') Github]
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import IconGithub from '~icons/bi/github';
import IconLaptop from '~icons/bi/laptop';

const { t } = useI18n();

const url = 'https://github.com/alrico88/grafi-k';
</script>

<i18n lang="yaml">
en:
  madeBy: Made by
  codeOn: Code on
es:
  madeBy: Hecho por
  codeOn: Código disponible en
</i18n>
