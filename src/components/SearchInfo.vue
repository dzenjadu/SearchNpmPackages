<template>
  <div class="search__info">
    Total results:
    {{ countPackages }}
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "SearchInfo",
  computed: {
    ...mapState([
      'countPackages'
    ]),
  }
}
</script>

<style lang="scss">
  .search {
    &__info {
      margin: 10px 0;
      color: #969696;
      font-size: 14px;
    }
  }
</style>
