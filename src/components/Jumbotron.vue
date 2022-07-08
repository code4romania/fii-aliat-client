<template>
  <div class="px-4 pt-6 md:px-8">
    <Nav :inverted="false" />
    <router-link
      to="/"
      class="relative inline-block py-3 mt-16 mb-4 text-2xl font-light sm:text-3xl md:text-4xl"
      v-if="title"
    >
      {{ title }}
    </router-link>

    <div class="mb-8 text-2xl font-thin content-wrap">
      <Markdown :source="content" />
    </div>

    <ul v-if="buttons" class="mb-8 lg:mb-16">
      <li v-for="button in buttons" v-bind:key="button.id">
        <router-link
          v-if="button.href"
          :to="button.href"
          class="inline-block py-3 text-2xl font-light lg:text-xl xl:text-2xl"
          ><span class="underline">{{ button.text }}</span></router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it';

import MadeBy from '@/components/MadeBy';
import Nav from '@/components/Nav';
import Switch from '@/components/Switch';

export default {
  name: 'Jumbotron',
  components: {
    Markdown,
    Switch,
    MadeBy,
    Nav,
  },
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    buttons: {
      type: Array,
    },
    onSwitchView: {
      type: Function,
    },
    list: {
      type: Boolean,
    },
    gallery: {
      type: Boolean,
    },
  },
};
</script>
