<template>
  <div class="flex flex-col w-full">
    <div
      class="w-full p-4 px-8 my-6 text-3xl leading-snug text-black bg-white lg:text4xl"
      v-if="banner"
    >
      <div class="mb-2 text-6xl">{{ index * 2 }}</div>
      {{ banner.content }}
    </div>
    <div class="relative flex flex-col w-full md:flex-row" v-if="row">
      <div class="absolute right-0 font-xl bottom-2">
        {{ isStep ? index * 2 : '' }}
      </div>
      <div
        class="py-2 text-3xl leading-relaxed md:w-1/2 lg:text2xl"
        v-for="story in row.stories"
        v-bind:key="story.id"
        :class="{ 'border-b': isStep }"
      >
        <component
          :is="
            story.isExternal && story.externalLink
              ? 'a'
              : story.url
              ? 'router-link'
              : 'div'
          "
          :class="{
            'text-gray-400': !story.url,
            'hover:text-gray-400': story.url,
          }"
          :to="story.url"
          :href="story.externalLink"
          :target="story.isExternal ? '_blank' : '_self'"
          >{{ story.title }}
        </component>
      </div>
    </div>
  </div>
</template>

<script>
    const STEPS = [
      50,
      100,
      200,
      300,
      400,
      500,
      600,
      700,
      800,
      900,
      1000,
      2000,
      3000,
      4000,
      5000,
      6000,
      7000,
      8000,
      9000,
      10000,
      15000,
      20000,
      25000,
      30000,
      35000,
      40000,
      45000,
      50000,
      55000,
      60000,
      65000,
      70000,
    ];

    export default {
      name: 'Item',
      props: {
        row: {
          type: Object,
          default: {
            stories: [],
          },
        },
        banner: {
          type: Object,
          default: null,
        },
        index: {
          type: Number,
          default: 0,
        },
      },
      computed: {
        isStep() {
          for (let step in STEPS) {
            if (STEPS[step] === this.index * 2) {
              return true;
            }
          }
        },
      },
    };
</script>
