<template>
  <div>
    <div v-if="loading" class="my-16">
      <Spinner />
    </div>
    <div v-if="page">
      <div v-for="component in page.components" v-bind:key="component.id">
        <div class="container px-4 mx-auto">
          <div class="grid grid-cols-8 lg:gap-16">
            <div class="col-span-full">
              <div class="p-4 lg:p-8">
                <div class="flex items-center justify-between mb-8">
                  <Nav :inverted="false" />
                </div>

                <div class="max-w-6xl mb-32">
                  <h1
                    class="relative block py-3 mt-16 mb-4 text-2xl font-light sm:text-3xl md:text-4xl"
                  >
                    {{ component.title }}
                  </h1>

                  <MadeBy
                    v-if="this.$route.meta.featured"
                    :inverted="false"
                    class="mb-8"
                  />

                  <Markdown
                    :source="component.content"
                    class="mb-8 prose md:prose-lg"
                    :class="{
                      'lg:prose-xl': this.$route.meta.featured,
                    }"
                  />

                  <ul v-if="component.buttons" class="mb-16">
                    <li
                      v-for="button in component.buttons"
                      v-bind:key="button.id"
                    >
                      <router-link
                        v-if="button.href"
                        :to="button.href"
                        class="inline-block py-3 text-2xl font-light lg:text-xl xl:text-2xl"
                        ><span class="underline">{{
                          button.text
                        }}</span></router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it';

import api from '@/api';
import MadeBy from '@/components/MadeBy.vue';
import Spinner from '@/components/Spinner.vue';
import Nav from '@/components/Nav';

export default {
  name: 'About',
  components: {
    Markdown,
    MadeBy,
    Spinner,
    Nav,
  },
  data: () => ({
    loading: false,
    error: null,
    page: {
      components: [],
    },
  }),
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.fetchData());
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchData();
    next();
  },
  mounted() {
    document.body.classList.remove('bg-black', 'text-white');
    document.body.classList.add('bg-white', 'text-black');
  },
  methods: {
    fetchData() {
      this.error = this.page = null;
      this.loading = true;
      api.getPage(this.$route.meta.slug, (err, page) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.page = page;
        }
      });
    },
  },
};
</script>

<style>
    .content-wrap p {
      margin-bottom: 32px;
    }
    .content-wrap a {
      text-decoration: underline;
    }
</style>

