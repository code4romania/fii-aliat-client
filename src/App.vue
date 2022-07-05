<template>
  <div class="min-h-screen flex flex-col">


    <div class="fixed top-0 left-0 right-0 bottom-0">
      <div class="absolute bg-white left-0 right-0 md:right-2/4 md:h-1/2 text-transparent">
        <router-view v-slot="{ Component }">
          <div class="bg-white">
            <component class="opacity-0 select-none pointer-events-none pb-12" :is="Component"></component>
          </div>
        </router-view>
      </div>
      <masonry-wall class="w-full" :items="assetsIds" :column-width="280">
        <template #default="{ item, index }">
          <a :href="'/message/' + item">
            <img :src="'/assets/' + item + '.png'" :height="(item * 2).toString() + 'px'" /></a>
        </template>
      </masonry-wall>
    </div>
    <div class="absolute left-1/4 right-0 md:right-1/4 lg:right-1/3">
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component class="z-10" :is="Component"></component>
      </transition>
    </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    assetsIds: [...Array(50)].map((x, i)=> ++i)
  })
}
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
