<template>
  <div class="pagination">
    <button :disabled="pageNumber === 0"
            @click="prevPage"
            class="pagination__btn"
    >
      Previous
    </button>

    <button :disabled="pageNumber >= countPages - 1"
            @click="nextPage"
            class="pagination__btn"
    >
      Next
    </button>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapActions} from 'vuex'
import config from "../config";

export default {
  name: "Pagination",
  data() {
    return {
      countPages: 0,
      pageNumber: 0,
    }
  },
  computed: {
    ...mapState([
      'countPackages',
      'queryText'
    ]),
    getCountPackagesOnPaga() {
      return config.PACKAGES_ON_PAGE
    },
  },
  watch: {
    countPackages(newVal) {
      this.countPages = Math.ceil(newVal / 10)
    }
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
    },
    nextPage() {
      this.pageNumber++
      this.handleClickBtn()
    },
    prevPage() {
      this.pageNumber--
      this.handleClickBtn()
    },
    handleClickBtn() {
      this.getPackages(this.queryText, this.getCountPackagesOnPaga, this.pageNumber * 10)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  }
}
</script>

<style lang="scss">
  .pagination {
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    &__btn {
      margin: 0 5px;
      width: 100px;
      padding: 5px 0;
    }
  }
</style>
