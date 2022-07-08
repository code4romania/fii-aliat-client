<template>
  <div class="w-full p-6 pb-8 card">
    <div class="flex flex-col border-gray-400 rounded bg-white">
      <div
        class="leading-relaxed border-2 rounded border-grey"
        v-bind:key="'story-' + item.id"
      >
        <div class="flex items-center justify-center h-8 -mt-4">
          <img class="max-w-[75%]" src="/assets/rainbow.png" loading="lazy" />
        </div>
        <div class="px-8 my-4 text-2xl text-center">
          {{ item.name
          }}<span v-show="item.age" class="font-thin">, {{ item.age }}</span>
          <span v-show="item.occupation">, {{ item.occupation }} </span>
        </div>
        <img
          :src="'/assets/' + ((item.id % 55) + 1) + '.png'"
          class="w-20 mx-auto rounded-full"
        />
        <div class="p-8 mt-4 bg-neutral-100 text-neutral-500">
          <p>{{ item.content }}</p>
          <ShareNetwork
            class="block py-2 mt-8 text-center text-white bg-blue-500 rounded-lg"
            network="facebook"
            :url="'https://fiialiat.ro/mesaje/' + item.id"
          >
            Share on social media
          </ShareNetwork>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
};
</script>
