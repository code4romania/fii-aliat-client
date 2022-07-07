<template>
  <div>
    <div v-if="loading" class="my-16">
      <Spinner />
    </div>
    <div v-if="page">
      <div v-for="component in page.components" v-bind:key="component.id">
        <div class="mx-auto bg-white max-w-screen-2xl">
          <div class="grid grid-cols-8 lg:gap-16">
            <div class="col-span-full">
              <div class="p-4 lg:p-8">
                <div class="flex items-center justify-between mb-8">
                  <Nav :inverted="false" />
                  <a
                    @click="$router.go(-1)"
                    class="relative w-12 h-12 cursor-pointer"
                  >
                    <span
                      class="absolute top-0 left-0 bottom-0 right-0 m-auto transform origin-center block w-full h-0.5 bg-black rotate-45"
                    ></span>
                    <span class="block w-0 h-0 overflow-hidden">Închide</span>
                    <span
                      class="absolute top-0 left-0 bottom-0 right-0 m-auto transform origin-center block w-0.5 h-full bg-black rotate-45"
                    ></span>
                  </a>
                </div>

                <div class="max-w-6xl mb-32">
                  <div
                    class="relative block w-full pt-3 pb-0 mt-5 mb-8 text-2xl font-light leading-tight lg:text-4xl"
                  >
                    {{ component.title }}
                  </div>

                  <MadeBy
                    v-if="this.$route.meta.featured"
                    :inverted="false"
                    class="mb-8"
                  />

                  <div class="mb-8">
                    <div
                      :class="{
                        'text-lg lg:text-2xl': this.$route.meta.featured,
                      }"
                      class="text-base font-thin content-wrap"
                    >
                      <Markdown :source="component.content" />
                    </div>
                  </div>

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

