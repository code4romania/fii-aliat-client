<template>
  <div class="card flex flex-col rounded border-gray-400 mb-4 w-full md:w-1/3 lg:w-1/4">
      <div
        class="px-4 py-4 leading-relaxed text-center lg:px-16  border-2 border-grey rounded"
        v-bind:key="'story-' + item.id"
      >
          <div class="text-2xl mb-2">
            {{ item.name }}<span v-show="item.age" class="font-thin">, {{ item.age }}</span>
            <span v-show="item.occupation">
              , {{ item.occupation }}
            </span>
          </div>
          <img :src="'/assets/' + item.id % 55 + '.png'" class="w-20 mx-auto rounded-full" />
          <div>{{item.content}}</div>
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
