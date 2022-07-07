<template>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
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
