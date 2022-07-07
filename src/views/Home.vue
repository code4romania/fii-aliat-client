<template>
  <div>
    <div v-if="loading" class="my-16">
      <Spinner />
    </div>
    <div v-if="page" class="flex flex-col sm:h-screen sm:overflow-hidden">
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        <div
          class="flex flex-col items-center col-span-2 bg-white justify-items-stretch md:col-span-3 md:row-span-4 xl:row-span-3"
        >
          <div class="w-full max-w-2xl pt-6">
            <Nav :inverted="false" />
          </div>

          <div
            class="flex items-center justify-center flex-1 max-w-2xl px-4 py-8 mx-auto md:px-8 md:py-16"
          >
            <div v-for="component in page.components" v-bind:key="component.id">
              <h2 class="text-6xl font-semibold leading-tight text-purple-400">
                {{ component.title }}
              </h2>
              <Markdown
                :source="component.content"
                class="max-w-2xl prose md:prose-lg lg:prose-xl"
              />
              <ul v-if="component.buttons" class="pt-8 bg-white">
                <li v-for="button in component.buttons" v-bind:key="button.id">
                  <router-link
                    v-if="button.href"
                    :to="button.href"
                    class="inline-block py-3 mb-2 text-2xl font-light lg:text-xl xl:text-2xl"
                    ><span class="underline">{{
                      button.text
                    }}</span></router-link
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          v-for="(item, index) in assetsIds"
          :key="index"
          class="aspect-square"
        >
          <a
            v-if="index % Math.ceil(Math.random() * 15) === 0"
            :href="'/mesaje/' + item"
          >
            <img
              :src="'/assets/' + item + '.png'"
              :height="(item * 2).toString() + 'px'"
              class="w-full"
              loading="lazy"
            />
          </a>

          <div v-else class="grid grid-cols-2 aspect-square">
            <a
              v-for="(item, index) in assetsIds
                .sort(() => 0.5 - Math.random())
                .slice(0, 4)"
              :key="index"
              :href="'/mesaje/' + item"
              class="aspect-square"
            >
              <img
                :src="'/assets/' + item + '.png'"
                :height="(item * 2).toString() + 'px'"
                class="w-full"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Markdown from 'vue3-markdown-it';

    import api from '@/api';
    import MadeBy from '@/components/MadeBy';
    import Nav from '@/components/Nav';
    import Spinner from '@/components/Spinner';

    export default {
      name: 'Home',
      components: {
        Markdown,
        MadeBy,
        Nav,
        Spinner,
      },
      data: () => ({
        loading: false,
        error: null,
        page: {
          components: [],
        },
        assetsIds: [...Array(50)].map((x, i) => ++i),
      }),
      beforeRouteEnter(to, from, next) {
        next((vm) => vm.fetchData());
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
          api.getPage('home', (err, page) => {
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
