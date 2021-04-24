<template>
  <div id="app">
    <div class="content">
      <h1 class="packages__title">All of Npm Packages</h1>
      <Search />
      <PackagesList />
      <Pagination v-if="countPackages" />
    </div>
    <Footer />
  </div>
</template>

<script>
import {mapState} from 'vuex'

import Search from './components/Search'
import PackagesList from './components/PackagesList'
import Pagination from './components/Pagination'
import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    Search,
    PackagesList,
    Pagination,
    Footer,
  },
  computed: {
    ...mapState([
      'countPackages'
    ]),
  },
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

  html,
  body {
    height: 100%;
  }

  html {
    background-color: #ececec;
  }

  body {
    margin: 0;
  }

  #app {
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .content {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
    flex: 1 0 auto;
    width: 100%;
  }

  .packages {
    &__title {
      text-align: center;
      font-weight: 500;
    }
  }
</style>
