<template>
  <div>
    <div v-if="loading" class="my-16">
      <Spinner />
    </div>
    <div v-if="page" class="flex flex-col bg-pink-500 sm:min-h-screen">
      <div
        class="grid grid-cols-2 md:grid-cols-5 xl:grid-cols-9 2xl:grid-cols-11"
      >
        <div
          class="flex flex-col items-center col-span-2 bg-white justify-items-stretch md:col-span-3 md:row-span-4 xl:row-span-5 xl:col-span-4"
        >
          <div class="w-full max-w-2xl px-4 pt-6 md:px-8">
            <Nav :inverted="false" />
          </div>

          <div
            class="flex justify-center flex-1 max-w-2xl px-4 py-8 mx-auto md:px-8 md:py-16"
          >
            <div v-for="component in page.components" v-bind:key="component.id">
              <h2 class="text-6xl font-semibold leading-tight text-purple-400">
                {{ component.title }}
              </h2>
              <Markdown
                :source="component.content"
                class="max-w-2xl prose md:prose-lg lg:prose-xl"
              />
              <div class="pt-8">
                <PrideButton @click.once="onClick" />
              </div>
              <ul v-if="component.buttons" class="pt-4 bg-white">
                <li v-for="button in component.buttons" v-bind:key="button.id">
                  <router-link
                    v-if="button.href"
                    :to="button.href"
                    class="inline-block py-3 mb-2 text-2xl font-light lg:text-xl xl:text-2xl"
                  >
                    <span class="underline">{{ button.text }}</span>
                  </router-link>
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
          <component :is="item.id ? 'a': 'div'" v-if="!item.children" :href="'/mesaje/' + item.id">
            <img
              :src="item.imageUrl"
              :height="(item * 2).toString() + 'px'"
              class="w-full border-2 border-pink-500 border-solid"
              loading="lazy"
            />
          </component>
          <div v-else class="grid grid-cols-2 aspect-square">
            <a
              v-for="child in item.children"
              :key="child.id"
              :href="'/mesaje/' + child.id"
              class="aspect-square"
            >
              <img
                :src="child.imageUrl"
                class="w-full border-2 border-pink-500 border-solid"
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
import router from '@/router';
import MadeBy from '@/components/MadeBy';
import Nav from '@/components/Nav';
import Spinner from '@/components/Spinner';
import PrideButton from '@/components/PrideButton';

export default {
  name: 'Home',
  components: {
    Markdown,
    MadeBy,
    Nav,
    Spinner,
    PrideButton,
  },
  data: () => ({
    loading: false,
    error: null,
    page: {
      components: [],
    },
    stories: [],
    storiesError: null,
    storiesLoading: false,
  }),
  computed: {
    assetsIds() {
      return [...Array(97)].map((x, i) => {
        const index = i + 1;
        const storiesLength = this.stories.length;
        const storiesIds = this.stories.map((story)=> story.id)
        const randomIndex = Math.floor(Math.random() * (storiesLength));
        const randomId = storiesIds[randomIndex];
        if (index % Math.ceil(Math.random() * 2) === 0) {
          return {
            id: randomId,
            children: [...Array(4)].map((x, i) => {
              const childIndex = Math.ceil(Math.random() * 10) + i * 10 + 1;
              return {
                id: randomId,
                imageUrl: `/assets/${childIndex}.png`,
              };
            }),
          };
        }

        return {
          id: randomId,
          imageUrl:
            index > 55 ? `/assets/${index - 55}.png` : `/assets/${index}.png`,
        };
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.fetchData());
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchData();
    next();
  },
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

      this.storiesError = null;
      this.storiesLoading = true;
      api.getStories((err, stories) => {
        this.storiesLoading = false;
        if (err) {
          this.storiesError = err.toString();
        } else {
          this.stories = stories;
        }
      });
    },
    onClick() {
      api.post('/counter/increment', null).then((res) => {
        if (res?.data?.count) {
          router.push({
            path: '/trimite-un-mesaj',
            query: { counter: res?.data?.count },
          });
        }
      });
    },
  },
};
</script>
