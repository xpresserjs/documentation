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
      <template v-for="(slot, slotIndex) in computedTabsSlugs">
        <slot v-if="activeTab===slot" :name="slot"></slot>
        <slot v-if="computedTabsSlugs.indexOf(activeTab) === slotIndex" :name="slotIndex"></slot>
      </template>
    </div>
  </section>
</template>


<script>
export default {
  props: {
    tabs: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeTab: null,
    };
  },

  computed: {
    computedTabs() {
      if (!this.tabs.trim()) return [];
      return this.tabs.split('|');
    },

    computedTabsSlugs() {
      const tabs = this.computedTabs;
      const slugs = [];
      for (const tab of tabs) {
        slugs.push(this.slugify(tab));
      }
      return slugs;
    },
  },

  methods: {
    changeActiveTab(newTab) {
      this.activeTab = this.slugify(newTab);
    },

    slugify(str, separator = '-') {
      return str.toString().
          normalize('NFD')                   // split an accented letter in the base letter and the acent
          .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
          .toLowerCase().
          trim().
          replace(/[^a-z0-9 ]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
          .replace(/\s+/g, separator);
    },
  },

  mounted() {
    if (this.computedTabs.length) {
      this.changeActiveTab(this.computedTabs[0]);
    }
  },
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/all";
@import "~bulma/sass/elements/box";
@import "~bulma/sass/components/tabs";

$linkColor: darken(#e95420, 5%);
$black: fade-out(black, 0.9);
$bg-color: darken(whitesmoke, 5%);


.tabs-box {
  background-color: whitesmoke;
  margin-top: 20px;
  padding: 0;
  border: solid 2px fade-out(black, 0.9);
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075) !important;
  border-radius: 5px;

  .tabs > ul {
    padding-top: 5px;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    border-bottom: unset;

    li.is-active {
      a {
        color: $linkColor;
        border-bottom-color: $linkColor;
        border-bottom-width: 3px;
      }
    }

    li > a {
      color: lighten(black, 30%);
      //font-weight: bold;
      font-family: 'Fira Code', 'PT Sans', monospace;
      border-bottom-color: transparent;

      &:hover {
        text-decoration: none;
        border-bottom-color: $linkColor;
        border-bottom-width: 3px;
      }
    }
  }

  .content {
    padding: 0 8px;
    margin-top: 0;
  }
}
</style>