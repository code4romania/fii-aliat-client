<template>
  <div class="md:p-4 lg:p-8">
    <Nav />
    <router-link
      to="/"
      class="relative inline-block py-3 my-5 font-light pl-14 text-7xl"
      v-if="title"
    >
      <span
        class="absolute top-0 bottom-0 my-auto transform rotate-45 border-b-2 border-l-2 border-white left-2 w-9 h-9"
      ></span>
      {{ title }}
    </router-link>

    <div class="mb-8 text-2xl font-thin content-wrap">
      <Markdown :source="content" />
    </div>

    <div class="mb-8">
      <Switch :list="list" :gallery="gallery" @switchView="onSwitchView" />
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

    <MadeBy class="hidden lg:block" />
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
