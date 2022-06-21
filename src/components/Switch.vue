<template>
  <button
    class="inline-block border border-white p-3 text-base leading-4 uppercase font-thin tracking-widest"
    :class="{ 'opacity-60 border-r-0': list }"
    @click="switchView"
  >
    Poveștile
  </button>
  <button
    class="inline-block border border-white p-3 text-base leading-4 uppercase font-thin tracking-widest"
    :class="{ 'opacity-60 border-l-0': gallery }"
    @click="switchView"
  >
    Oamenii
  </button>
</template>

<script>
export default {
  name: "Switch",
  props: {
    list: {
      type: Boolean
    },
    gallery: {
      type: Boolean
    }
  },
  methods: {
    switchView() {
      this.$emit("switchView", { list: !this.list, gallery: !this.gallery });

      this.$gtag.event("switchView", {
        "event_category": "UI",
        "event_label": this.list ? "list" : "gallery",
        "value": this.list || this.gallery
      });
    }
  }
};
</script>
