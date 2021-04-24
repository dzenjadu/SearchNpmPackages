<template>
  <section v-if="packages.length" class="packages__list">
    <article v-for="item in packages" class="packages__item" :key="item.package.name">
      <h2 @click="handleClickPackage(item.package.name)" class="packages__name">{{ item.package.name }}</h2>

      <div class="packages__row">
        <div class="packages__cell packages__cell_flex">
          <div v-if="item.package.author" class="packages__author">
            author: {{ item.package.author.name }}
          </div>

          <div v-if="item.package.version" class="packages__version packages__block">
            {{ item.package.version }}
          </div>
        </div>


        <div class="packages__cell">
          <template v-for="(value, key) in item.package.links">
            <a :href="value" class="packages__link" target="_blank">
              <span :class="`packages__icon_${key}`" class="packages__icon"></span>
            </a>
          </template>
        </div>
      </div>

      <p v-if="item.package.description" class="packages__description">
        {{ item.package.description }}
      </p>

      <div class="packages__row packages__row_keyword">
        <div v-for="keyword in item.package.keywords" class="packages__keyword packages__block">
          {{ keyword }}
        </div>
      </div>
    </article>

    <PackageModal v-if="showModal"
                  @closeModal='closeModal'
                  :packageName="packageName"
    />
  </section>
  <section v-else class="packages__list packages__list_empty">
    No results. Start typing your query.
  </section>
</template>

<script>
import {mapState} from 'vuex'
import PackageModal from './PackageModal'

export default {
  name: "PackagesList",
  components: {
    PackageModal
  },
  data() {
    return {
      showModal: false,
      packageName: '',
    }
  },
  computed: {
    ...mapState([
      'packages'
    ]),
  },
  methods: {
    closeModal() {
      this.showModal = false
    },
    handleClickPackage(packageName) {
      this.showModal = true
      this.packageName = packageName
    }
  }
}
</script>

<style lang="scss">
  .packages {
    &__list {
      &_empty {
        margin: 20px 0;
      }
    }

    &__item {
      border-bottom: 1px solid #d6d6d6;
      padding-bottom: 30px;
    }

    &__name {
      font-weight: 500;
      color: #ff5627;
      cursor: pointer;
    }

    &__row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      flex-wrap: wrap;

      &_keyword {
        justify-content: flex-start;
      }
    }

    &__block {
      border: 1px solid #d6d6d6;
      border-radius: 3px;
      padding: 2px 8px;
      white-space: nowrap;
    }

    &__version {

      &:before {
        content: "\f02b";
        font-family: FontAwesome;
        font-size: 11px;
        color: #444;
        width: 15px;
        height: 15px;
        margin-right: 5px;
      }
    }

    &__author {
      margin-right: 10px;
    }

    &__cell {
      margin-bottom: 10px;

      &_flex {
        display: flex;
        align-items: center;
      }
    }

    &__keyword {
      margin-right: 10px;
      margin-bottom: 10px;
    }

    &__link {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid #d6d6d6;
      font-size: 20px;
      line-height: 20px;
      text-align: center;
      padding: 10px;
      color: #000;

      &:hover {
        .packages__icon {
          opacity: 1;
        }
      }
    }

    &__icon {
      width: 100%;
      height: 100%;
      display: block;
      background-size: 100%;
      opacity: .6;
      transition: opacity .2s;

      &_homepage {
        background-image: url('../assets/homepage.svg');
      }

      &_npm {
        background-image: url('../assets/npm.svg');
      }

      &_repository {
        background-image: url('../assets/repository.svg');
      }

      &_bugs {
        background-image: url('../assets/bugs.svg');
      }
    }
  }
</style>
