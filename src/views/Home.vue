<template>
  <div>
    <div v-if="loading" class="my-16">
      <Spinner />
    </div>
    <div v-if="page">
      <div
        v-for="component in page.components"
        v-bind:key="component.id"
      >
        <div class="max-w-screen-2xl mx-auto">
          <div class="grid grid-cols-8 gap-8 mb-8 md:mb-0">
            <div class="col-span-full lg:col-span-4">
              <div class="p-4 lg:p-8">
                <Nav :inverted="false" />
                <h2 class="text-5xl py-5 font-light leading-tight lg:text-7xl xl:text-8xl">
                  {{component.title}}
                </h2>
                <div class="content-wrap">
                  <Markdown
                      class="text-2xl text-opacity-60  font-light"
                      :source="component.content"
                  />
                  <ul
                      v-if="component.buttons"
                      class="mb-8 md:hidden"
                  >
                    <li v-for="button in component.buttons" v-bind:key="button.id">
                      <router-link
                          v-if="button.href"
                          :to="button.href"
                          class="inline-block mb-2 py-3 text-2xl font-light lg:text-xl xl:text-2xl"
                      ><span class="underline">{{ button.text }}</span></router-link
                      >
                    </li>
                  </ul>
                </div>
                <ul
                  v-if="component.buttons"
                  class="mb-8"
                >
                  <li v-for="button in component.buttons" v-bind:key="button.id">
                    <router-link
                      v-if="button.href"
                      :to="button.href"
                      class="inline-block mb-2 py-3 text-2xl font-light lg:text-xl xl:text-2xl"
                      ><span class="underline">{{ button.text }}</span></router-link
                    >
                  </li>
                </ul>
                <MadeBy />
              </div>
            </div>
            <div class="col-span-full lg:col-span-4">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Markdown from 'vue3-markdown-it';

import api from "@/api";
import MadeBy from "@/components/MadeBy";
import Nav from "@/components/Nav";
import Spinner from "@/components/Spinner";

export default {
  name: "Home",
  components: {
    Markdown,
    MadeBy,
    Nav,
    Spinner
  },
  data: () => ({
    loading: false,
    error: null,
    page: {
      components: []
    }
  }),
  beforeRouteEnter(to, from, next) {
    next(vm => vm.fetchData());
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchData();
    next();
  },
  // mounted() {
  //   document.body.classList.remove("bg-white", "text-black");
  //   document.body.classList.add("bg-black", "text-white");
  // },
  methods: {
    fetchData() {
      this.error = this.page = null;
      this.loading = true;
      api.getPage("home", (err, page) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.page = page;
        }
      });
    }
  }
};
</script>
