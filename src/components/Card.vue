<template>
  <div class="card flex flex-col rounded border-gray-400 mb-8 w-full md:w-1/3 lg:w-1/4">
      <div
        class="leading-relaxed border-2 border-grey rounded"
        v-bind:key="'story-' + item.id"
      >
        <img class="mx-auto -mt-5" src="/assets/rainbow.png" loading="lazy" />
        <div class="text-2xl my-4 px-8 text-center">
            {{ item.name }}<span v-show="item.age" class="font-thin">, {{ item.age }}</span>
            <span v-show="item.occupation">
              , {{ item.occupation }}
            </span>
          </div>
          <img :src="'/assets/' + item.id % 55 + '.png'" class="w-20 mx-auto rounded-full" />
          <div class="bg-neutral-100 p-8 mt-4 text-neutral-500">
            <p>{{item.content}}</p>
            <ShareNetwork
              class="block bg-blue-500 mt-8 text-white text-center rounded-lg py-2"
              network="facebook"
              :url="'https://fiialiat.ro/mesaje/' + item.id"
              title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
              description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
              quote="The hot reload is so fast it\'s near instant. - Evan You"
              hashtags="vuejs,vite"
            >
              Share on social media
            </ShareNetwork>
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
