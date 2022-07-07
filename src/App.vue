<template>
  <div class="flex flex-col sm:h-screen sm:overflow-hidden">
    <div class="inset-x-0 top-0 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
      <div class="inset-x-0 top-0 col-span-2 bg-white md:col-span-3 md:row-span-4 xl:row-span-3">
        <router-view v-slot="{ Component }">
          <transition name="route" mode="out-in">
            <component class="max-w-3xl ml-auto" :is="Component"></component>
          </transition>
        </router-view>
      </div>

      <div v-for="(item, index) in assetsIds" :key="index" class="aspect-square">
        <a v-if="index % Math.ceil(Math.random() * 15)  === 0" :href="'/mesaje/' + item">
          <img :src="'/assets/' + item + '.png'" :height="(item * 2).toString() + 'px'" class="w-full" loading="lazy" />
        </a>

        <div v-else class="grid grid-cols-2 aspect-square">
          <a v-for="(item, index) in assetsIds.sort(() => 0.5 - Math.random() ).slice(0, 4)" :key="index" :href="'/mesaje/' + item" class="aspect-square">
            <img :src="'/assets/' + item + '.png'" :height="(item * 2).toString() + 'px'" class="w-full" loading="lazy" />
          </a>
        </div>
      </div>
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
