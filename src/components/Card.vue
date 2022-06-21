<template>
  <div class="w-full flex flex-col">
    <div v-if="row">
      <div
        class="text-center px-4 lg:px-16 leading-relaxed py-4 mb-12"
        v-for="story in row.stories"
        v-bind:key="'story-' + story.id"
      >
        <div class="mb-4 tracking-wide text-sm text-gray-400 font-sans uppercase">
          {{ story.address }}
        </div>
        <component
          :is="story.isExternal && story.externalLink ? 'a' : story.url ? 'router-link' : 'div'"
          :class="story.url ? 'cursor-pointer hover:text-gray-400' : 'text-gray-400'"
          :to="story.url"
          :href="story.externalLink"
          :target="story.isExternal ? '_blank' : '_self'"
        >
          <div class="text-6xl">
            {{ story.title }}<span v-show="story.age" class=" font-thin">, {{ story.age }}</span>
          </div>
        </component>
        <div v-show="story.occupation" class="text-2xl mt-2.5">{{ story.occupation }}</div>
        <component
          :is="story.isExternal && story.externalLink ? 'a' : story.url ? 'router-link' : 'div'"
          class="inline-block py-3 text-2xl font-light lg:text-xl xl:text-2xl underline"
          :to="story.url"
          :href="story.externalLink"
          :target="story.isExternal ? '_blank' : '_self'"
        >
          <span>Citește mai mult</span>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    row: {
      type: Object,
      default: null
    }
  }
};
</script>
