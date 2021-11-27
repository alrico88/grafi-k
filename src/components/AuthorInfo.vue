<template lang="pug">
.row.py-3
  .col
    .d-flex.justify-content-between.align-items-center
      div
        p.mb-0 #[b-icon-laptop] {{ t('author.madeBy') }} #[a.font-weight-bold(href="https://alrico.es", target="_blank") Alberto Rico]
      div
        p.mb-0 {{ t('author.codeOn') }}
          a.ms-2(:href="url", target="_blank") #[icon-github] Github
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import IconGithub from '~icons/bi/github';

const { t } = useI18n();

const url = 'https://github.com/alrico88/grafi-k';
</script>
