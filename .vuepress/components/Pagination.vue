<template>
  <section v-if="pageHasData" style="margin-top: 50px">
    <div class="is-clearfix">
      <router-link v-if="isOnlyOneLink" :class="computedOneLink.class"
                   :to="{path: pageLinks[0].url}">
        <h3 class="has-text-weight-light">
          <span v-html="computedOneLink.text"></span> {{ pageLinks[0].name }}
        </h3>
      </router-link>
      <template v-else>
        <router-link class="page-link is-pulled-left" :to="pageLinks[0].url"><h3
            class="has-text-weight-light"> &leftarrow;
          {{ pageLinks[0].name }}</h3>
        </router-link>
        <router-link class="page-link is-pulled-right" :to="pageLinks[1].url"><h3
            class="has-text-weight-light">
          {{ pageLinks[1].name }} &rightarrow;</h3>
        </router-link>
      </template>
    </div>
  </section>
</template>

<script>
import pages from "./paginationItems";

export default {
  props: {},
  computed: {
    page() {
      const page = window.location.pathname;
      if (page.endsWith('.html')) {
        return page.replace('.html', '');
      }
      return page;
    },
    pageHasData() {
      return pages.hasOwnProperty(this.page);
    },

    pageLinks() {
      return this.pageHasData ? pages[this.page] : [];
    },

    isOnlyOneLink() {
      return this.pageLinks.length === 1
    },

    computedOneLink() {
      if (this.pageLinks[0].type === 'prev') {
        return {class: 'page-link is-pulled-left', text: '&leftarrow;'}
      } else {
        return {class: 'page-link is-pulled-right', text: '&rightarrow;'}
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/all";
@import "~bulma/sass/helpers/float";
@import "~bulma/sass/helpers/typography";

a.page-link:hover {
  text-decoration: none;

  h3 {
    font-weight: normal !important;
  }
}
</style>