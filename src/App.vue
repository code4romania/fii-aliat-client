<template>
  <div class="min-h-screen flex flex-col">
    <div class="fixed top-0 left-0 right-0 bottom-0">
      <div v-masonry="containerId" transition-duration="0.3s" item-selector=".item" origin-left="false">
        <div v-masonry-tile class="item" v-for="(item, index) in assetsIds">
          <a :href="'/mesaje/' + item"><img :src="'/assets/' + item + '.png'" :height="(item * 2).toString() + 'px'" /></a>
        </div>
      </div>
    </div>
    <div class="absolute left-0 right-0 md:right-1/3 lg:right-1/3 top-0 bg-white">
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
          <component class="max-w-3xl ml-auto" :is="Component"></component>
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
