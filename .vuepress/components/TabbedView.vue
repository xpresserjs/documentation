<template>
  <section class="box tabs-box">
    <div class="tabs">
      <ul>
        <template v-for="(tab, index) in computedTabs">
          <li :class="activeTab===computedTabsSlugs[index]?'is-active':''"><a
              @click.prevent="changeActiveTab(tab)">{{ tab }}</a></li>
        </template>
      </ul>
    </div>

    <div class="content">
      <template v-for="slot in computedTabsSlugs">
        <slot v-if="activeTab===slot" :name="slot"></slot>
      </template>
    </div>
  </section>
</template>


<script>
export default {
  props: {
    tabs: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      activeTab: null,
      expectedSlots: ['js', 'ts', 'express', 'xpresser'],
      langTabs: {
        js: 'Javascript',
        ts: 'Typescript'
      },
      frameworkTabs: {
        xpresser: 'Xpresser',
        express: 'Express',
      }
    }
  },

  computed: {
    computedTabs() {
      if (!this.tabs.trim()) return [];
      return this.tabs.split('|')
    },

    computedTabsSlugs() {
      const tabs = this.computedTabs;
      const slugs = [];
      for (const tab of tabs) {
        slugs.push(this.slugify(tab))
      }
      return slugs
    }
  },

  methods: {
    changeActiveTab(newTab) {
      this.activeTab = this.slugify(newTab);
    },

    slugify(str, separator = "-") {
      return str
          .toString()
          .normalize('NFD')                   // split an accented letter in the base letter and the acent
          .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
          .replace(/\s+/g, separator);
    }
  },

  mounted() {
    if (this.computedTabs.length) {
      this.changeActiveTab(this.computedTabs[0])
    }
  }
}
</script>

<style lang="scss">
@import "~bulma/sass/utilities/all";
@import "~bulma/sass/elements/box";
@import "~bulma/sass/components/tabs";

.tabs-box {
  margin-top: 20px;
  padding: 0;
  border: solid 1px fade-out(#2D2A2E, 0.9);
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
  border-radius: 2px;

  .tabs > ul {
    background-color: fade-out(lightskyblue, 0.9);
    padding-top: 5px;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;

    li > a:hover {
      text-decoration: none
    }
  }

  .content {
    padding: 0 10px;
    margin-top: 0;
  }
}
</style>