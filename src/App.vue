<template>
  <aside class="bg-gray-100">
    <div class="flex items-center px-4 py-3 md:px-8">
      <img src="/code4romania.svg" class="h-6" alt="" />

      <div class="ml-6 text-sm font-medium text-gray-700">
        <span>O soluție Code for Romania.</span>
        <a
          href="https://www.code4.ro/"
          target="_blank"
          rel="noopener"
          class="text-blue-600 hover:underline whitespace-nowrap"
        >
          Află mai multe
        </a>
      </div>
    </div>
  </aside>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
    .route-enter-from,
    .route-leave-to {
      opacity: 0;
    }

    .route-enter-active {
      transition: opacity 0.6s ease;
    }

    .route-leave-active {
      transition: opacity 0.2s ease;
    }
</style>
