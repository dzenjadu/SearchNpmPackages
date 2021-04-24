<template>
  <div class="search">
    <div class="search__wrap">
      <input v-model.trim="queryText"
             @input="getPackages(queryText, getCountPackagesOnPaga)"
             type="text"
             class="search__input"
             placeholder="search all of npm"
      >
    </div>
    <SearchInfo v-if="countPackages" />
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex"
import config from '../config'
import SearchInfo from "./SearchInfo";

export default {
  name: "Search",
  components: {
    SearchInfo,
  },
  data () {
    return {
      queryText: ''
    }
  },
  computed: {
    ...mapState([
      'countPackages'
    ]),
    getCountPackagesOnPaga() {
      return config.PACKAGES_ON_PAGE
    },
  },
  methods: {
    ...mapActions([
      'getPackagesBySearch',
    ]),
    getPackages(queryText, countPackagesOnPaga, from = 0) {
      const payload = {
        queryText,
        size: countPackagesOnPaga,
        from,
      }

      this.getPackagesBySearch(payload)
    }
  }
}
</script>

<style lang="scss">
  .search {
    &__wrap {
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid #ff5627;
      border-radius: 3px;
      background-color: #fff;

      &:before {
        content: " \f002";
        font-family: FontAwesome;
        font-size: 15px;
        color: #444;
        width: 15px;
        height: 15px;
        margin-left: 15px;
      }
    }

    &__input {
      width: 100%;
      padding: 15px;
      outline: none;
      border: none;
      font-size: 16px;
    }
  }
</style>
