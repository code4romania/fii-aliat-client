<template>
  <div class="flex flex-col gap-8 lg:flex-row lg:items-center xl:gap-16 bg-white">
    <div class="flex items-end w-full gap-3 lg:w-auto shrink-0">
      <router-link to="/" class="block">
        <img src="/fiialiat.png" class="block w-[68px] h-10" alt="" />
      </router-link>
      <span class="leading-none">by</span>
      <a href="https://code4.ro/" class="block h-10">
        <img src="/code4romania.svg" class="block h-10" alt="" />
      </a>
    </div>

    <div class="flex w-full space-x-5 md:space-x-10">
      <router-link
        to="/despre"
        class="font-medium text-gray-500 hover:text-gray-900"
      >
        Despre proiect
      </router-link>

      <a
        href="https://code4.ro/ro/doneaza"
        class="font-medium text-gray-500 hover:text-gray-900"
      >
        Donează
      </a>

      <router-link
        v-show="nextStoryId"
        :to="`/poveste/${nextStoryId}`"
        class="font-medium text-gray-500 hover:text-gray-900"
      >
        Altă poveste
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    inverted: {
      type: Boolean,
      default: true,
    },
    nextStoryId: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped>
    .router-link-active {
      --tw-text-opacity: 1;
    }
</style>
