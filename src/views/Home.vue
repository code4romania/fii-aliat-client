<template>
  <div class="">
    <div v-if="loading" class="my-16">
      <Spinner />
    </div>
    <div v-if="page">
      <div
        v-for="component in page.components"
        v-bind:key="component.id"
      >
        <div class="container mx-auto">
          <div class="pb-20">
              <div class="grid grid-cols-6">
                <div class="col-span-6 pt-6 pb-10 bg-white">
                <Nav :inverted="false" />
                </div>
                <div class="col-span-5">
                <h2 class="text-6xl font-semibold leading-tight text-purple-400 bg-white">
                  {{component.title}}
                </h2>
                </div>
                <div class="col-span-4">
                  <Markdown
                      class="pt-6 text-xl font-light bg-white text-neutral"
                      :source="component.content"
                  />
                </div>
                <div class="col-span-3">
                <ul
                  v-if="component.buttons"
                  class="pt-8 bg-white"
                >
                  <li v-for="button in component.buttons" v-bind:key="button.id">
                    <router-link
                      v-if="button.href"
                      :to="button.href"
                      class="inline-block py-3 mb-2 text-2xl font-light lg:text-xl xl:text-2xl"
                      ><span class="underline">{{ button.text }}</span></router-link
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
