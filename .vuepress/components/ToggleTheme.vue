<template>
  <a @click="toggleTheme" class="theme-toggler" title="Theme Switcher"></a>
</template>

<script>
export default {
  data() {
    return {
      theme: 'light',
      storeKey: 'xpresserDocsTheme'
    }
  },

  watch: {
    theme() {
      const root = document.getElementsByTagName('html')[0];
      if (this.theme === 'dark') {
        root.setAttribute('class', 'use-dark-theme');
      } else {
        root.removeAttribute('class');
      }
    }
  },

  mounted() {
    const localStorage = window.localStorage;
    if (localStorage) {
      const cacheTheme = localStorage.getItem(this.storeKey);
      if (cacheTheme) {
        this.theme = cacheTheme;
      } else {
        localStorage.setItem(this.storeKey, this.theme);
      }
    }
  },

  methods: {
    toggleTheme() {
      if (this.theme === 'light') {
        this.setTheme('dark');
      } else {
        this.setTheme('light');
      }
    },

    setTheme(theme) {
      this.theme = theme;
      window.localStorage.setItem(this.storeKey, this.theme);
    }
  }
}
</script>

<style lang="scss">
.theme-toggler {
  z-index: 1000;
  cursor: pointer;
  border-radius: 5px;
  height: 40px;
  width: 40px;
  position: fixed;
  bottom: 2vh;
  right: 2vh;
  background-color: #2D2A2E;
}


html.use-dark-theme {
  .theme-toggler {
    background-color: whitesmoke;
  }
}


</style>