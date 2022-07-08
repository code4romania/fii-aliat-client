<template>
  <div
    class="fixed top-0 left-0 z-50  items-center justify-center w-full h-full text-black bg-white bg-opacity-75	overflow-auto"
  >
    <div v-if="storyLoading" class="my-16">
      <Spinner />
    </div>
    <div
      v-if="story"
      class="flex justify-center mt-24 md:mt-0 md:items-center h-full max-w-3xl mx-auto"
    >
        <div class="col-span-full">
          <div class="p-4 lg:p-8">
            <div class="flex items-center justify-end -mb-16 mr-10">
              <router-link
                to="/mesaje"
                class="relative w-6 h-6 cursor-pointer"
              >
                <span
                  class="absolute top-0 left-0 bottom-0 right-0 m-auto transform origin-center block w-full h-0.5 bg-black rotate-45"
                ></span>
                <span class="block w-0 h-0 overflow-hidden">Închide</span>
                <span
                  class="absolute top-0 left-0 bottom-0 right-0 m-auto transform origin-center block w-0.5 h-full bg-black rotate-45"
                ></span>
              </router-link>
            </div>
            <Card :item="story" />
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it';

import api from '@/api';

import Card from '@/components/Card';
import Heading from '@/components/Heading';
import MadeBy from '@/components/MadeBy';
import Nav from '@/components/Nav';
import Spinner from '@/components/Spinner';

export default {
  components: {
    Markdown,
    Heading,
    MadeBy,
    Nav,
    Spinner,
    Card
  },
  name: 'Detail',
  props: {
    nextStoryId: {
      type: String,
    },
  },
  data: () => ({
    story: null,
    storyError: null,
    storyLoading: false,
  }),
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData',
  },
  methods: {
    fetchData() {
      this.story = null;
      this.storyError = null;
      this.storyLoading = true;
      if (this.$route.params.storyId) {
        api.getStory(this.$route.params.storyId, (err, story) => {
          this.storyLoading = false;
          if (err) {
            this.storyError = err.toString();
          } else {
            this.story = story;
          }
        });
      }
    },
  },
};
</script>
