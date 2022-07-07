<template>
  <div>
    <Detail v-show="storyId" :nextStoryId="nextStoryId" />
    <div v-if="pageLoading" class="my-16">
      <Spinner />
    </div>
    <div v-if="page">
      <div v-for="component in page.components" v-bind:key="component.id">
        <div class="max-w-screen-2xl mx-auto">
          <div class="grid grid-cols-8">
            <div class="col-span-full lg:col-span-3 hidden lg:block">
              <div class="lg:fixed lg:max-w-md xl:max-w-lg lg:h-full">
                <Jumbotron
                  :content="component.content"
                  :buttons="component.buttons"
                  :list="list"
                  :gallery="gallery"
                  :onSwitchView="handleSwitchView"
                />
              </div>
            </div>

            <div class="col-span-full lg:relative lg:col-span-5">
              <div class="listing-content lg:relative">
                <transition name="listing-transition">
                  <DynamicScroller
                    v-show="list"
                    v-if="storiesList.length > 0"
                    :items="storiesList"
                    :min-item-size="64"
                    class="listing-list h-screen p-4"
                    key-field="index"
                  >
                    <template v-slot="{ item, index, active }">
                      <DynamicScrollerItem
                        :item="item"
                        :active="active"
                        :size-dependencies="[item.stories]"
                        :data-index="index"
                      >
                        <div v-show="index === 0" class="lg:hidden">
                          <Jumbotron
                            :content="component.content"
                            :buttons="component.buttons"
                            :list="list"
                            :gallery="gallery"
                            :onSwitchView="handleSwitchView"
                          />
                        </div>
                        <Item :row="item" :banner="bannersList[index * 2]" :index="index" />
                      </DynamicScrollerItem>
                    </template>
                  </DynamicScroller>
                  <div
                    v-else
                    class="flex flex-col justify-center align-middle h-full"
                  >
                    <Spinner />
                  </div>
                </transition>
                <transition name="listing-transition">
                  <div v-show="gallery">
                    <DynamicScroller
                      v-if="storiesList.length > 0"
                      :items="storiesList"
                      :min-item-size="200"
                      class="listing-list h-screen pb-28 p-4"
                      key-field="index"
                    >
                      <template v-slot="{ item, index, active }">
                        <DynamicScrollerItem
                          :item="item"
                          :active="active"
                          :size-dependencies="[item.stories]"
                          :data-index="index"
                        >
                          <div v-show="index === 0" class="lg:hidden">
                            <Jumbotron
                              :content="component.content"
                              :buttons="component.buttons"
                              :list="list"
                              :gallery="gallery"
                              :onSwitchView="handleSwitchView"
                            />
                          </div>
                          <Card :row="item" />
                        </DynamicScrollerItem>
                      </template>
                    </DynamicScroller>
                    <div
                      v-else
                      class="flex flex-col justify-center align-middle h-full"
                    >
                      <Spinner />
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";
import api from "@/api";
import shuffle from "@/lib/shuffle";
import Spinner from "@/components/Spinner.vue";
import Item from "@/components/Item.vue";
import Card from "@/components/Card.vue";
import Jumbotron from "../components/Jumbotron";
import Detail from "../views/Detail";

export default {
  name: "Listing",
  components: {
    Detail,
    Jumbotron,
    Spinner,
    Item,
    Card
  },
  data: () => {
    return {
      list: true,
      gallery: false,
      stories: [],
      storiesError: null,
      storiesLoading: false,
      page: null,
      pageError: null,
      pageLoading: false,
      banners: [],
      bannersError: null,
      bannersLoading: false,
      nextStoryId: null
    };
  },
  computed: {
    storyId: function() {
      return this.$route.params.storyId;
    },
    bannersList: function() {
      return this.banners.reduce(
        (o, key) => ({
          ...o,
          [key.index]: {
            content: key.content
          }
        }),
        {}
      );
    },
    storiesList: function() {
      const victimsCount = 54.223; // TODO: fix this

      const list = this.stories.map(story => ({
        id: story.id,
        title: `${story.victimFirstName}${typeof story.victimLastName !== 'undefined' ? ' ' + story.victimLastName : ''}`,
        age: story.age,
        occupation: story.occupation,
        address: `${story.city}, ${story.county}`,
        image: `https://picsum.photos/id/1005/900/450`,
        // image: `${story.image.url}`,
        url: `/poveste/${story.id}`,
        isExternal: story.isExternal,
        externalLink: story.externalLink
      }));

      const rows =
        this.stories.length > 0 &&
        victimsCount && shuffle([...list]).reduce((result, item, i) => {
          const rowIndex = Math.floor(i / 2);
          if (result && result[rowIndex]) {
            result[rowIndex].stories.push(item);
          } else {
            result.push({ stories: [item], index: rowIndex });
          }
          return result;
        }, []);

      return rows;
    }
  },
  mounted() {
    this.pageError = null;
    this.pageLoading = true;
    api.getPage("listing", (err, page) => {
      this.pageLoading = false;
      if (err) {
        this.pageError = err.toString();
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

    this.bannersError = null;
    this.bannersLoading = true;
    api.getBanners((err, banners) => {
      this.bannersLoading = false;
      if (err) {
        this.bannersError = err.toString();
      } else {
        this.banners = banners;
      }
    });
  },
  methods: {
    isShort() {
      return Math.floor(Math.random() * 10) > 5;
    },
    placeholdersList(length) {
      return Array.from({ length: this.gallery ? 0 : length }, (_, i) => ({
        id: `placeholder-${i}`,
        title: this.isShort() ? "***** *****" : "*** ***** ****"
      }));
    },
    handleSwitchView({ list, gallery }) {
      this.list = list;
      this.gallery = gallery;
    }
  },
  watch: {
    $route() {
      const random = Math.floor(Math.random() * this.stories.length);
      this.nextStoryId = this.stories[random] && this.stories[random].id;
    },
    stories(val) {
      const random = Math.floor(Math.random() * val.length);
      this.nextStoryId = val[random] && val[random].id;
    }
  }
};
</script>

<style>
.listing-transition-enter-active {
  transition: all 0.35s ease;
}

.listing-transition-leave-active {
  transition: all 0.125s ease;
}

.listing-transition-enter-from,
.listing-transition-leave-to {
  opacity: 0;
}

.listing-list li:nth-child(100),
.listing-list li:nth-child(200),
.listing-list li:nth-child(300),
.listing-list li:nth-child(400),
.listing-list li:nth-child(500),
.listing-list li:nth-child(600) {
  position: relative;

  padding-right: calc(80px + 20px);
}

.listing-list li:nth-child(100):before,
.listing-list li:nth-child(200):before,
.listing-list li:nth-child(300):before,
.listing-list li:nth-child(400):before,
.listing-list li:nth-child(500):before,
.listing-list li:nth-child(600):before {
  position: absolute;
  top: 4px;
  left: 0;
  bottom: 4px;
  right: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  padding-bottom: 2px;

  text-align: right;

  border-bottom: 1px solid rgba(255, 255, 255, 0.6);

  color: #fff;
}

.listing-list li:nth-child(100):before {
  content: "100";
}
.listing-list li:nth-child(200):before {
  content: "200";
}
.listing-list li:nth-child(300):before {
  content: "300";
}
.listing-list li:nth-child(400):before {
  content: "400";
}
.listing-list li:nth-child(500):before {
  content: "500";
}
.listing-list li:nth-child(600):before {
  content: "600";
}

.listing-list::-webkit-scrollbar {
  width: 10px;
}

.listing-list::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 20px;
}

.listing-list::-webkit-scrollbar-track {
  background: #ddd;
  border-radius: 20px;
}

@media (min-width: 768px) {
  .listing-list li {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

@media screen and (min-width: 1024px) {
  .listing-content:before {
    content: "";
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 20;

    width: 100%;
    height: 10rem;

    background: linear-gradient(to top, #1d1d1d, transparent);
  }

  .listing-list li:nth-child(100):before,
  .listing-list li:nth-child(200):before,
  .listing-list li:nth-child(300):before,
  .listing-list li:nth-child(400):before,
  .listing-list li:nth-child(500):before,
  .listing-list li:nth-child(600):before {
    padding-left: calc(100% - 80px);
  }

  .listing-aside {
    max-width: calc((100vw - 160px) / 3);
  }
}

@media screen and (min-width: 1696px) {
  .listing-aside {
    max-width: calc(1536px / 3);
  }
}
</style>
