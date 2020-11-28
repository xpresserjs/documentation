<template>
  <section class="box tabs-box">
    <div class="tabs">
      <ul>
        <template v-for="(tab, index) in computedTabs">
          <li :class="activeTab===computedTabsSlugs[index]?'is-active':''"><a
              @click.prevent="changeActiveTab(tab)">
            <small>{{ tab }}</small>
          </a></li>
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

$linkColor: darken(#3eaf7c, 10%);

.tabs-box {
  margin-top: 20px;
  padding: 0;
  border: solid 1px fade-out(gray, 0.7);
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
  border-radius: 2px;

  .tabs > ul {
    //background-color: seagreen;
    padding-top: 5px;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;

    li.is-active {
      a {
        color: $linkColor;
        border-bottom-color: $linkColor;
        border-bottom-width: 2px;
      }
    }

    li > a {
      color: gray;
      font-weight: bold;

      &:hover {
        text-decoration: none;
        border-bottom-color: $linkColor;
        border-bottom-width: 2px;
      }
    }
  }

  .content {
    padding: 0 8px;
    margin-top: 0;
  }
}
</style>