<template>
  <div class="modal">
    <div @click="closeModal" class="modal__overlay"></div>
    <div class="modal__body">
      <h2 class="modal__title">{{ packageName }}</h2>

      <span>Package Versions:</span>
      <select @change="changeVersion()" v-model="curentVersion">
        <option v-for="version in packageVersions.versions" :value="version">
          {{ version }}
        </option>
      </select>

      <a :href="getDefaultPackageUrl()" target="_blank" class="files__item files__item_default">{{ packageFiles.default }}</a>

      <ul class="files__root">
        <PackageItem v-if="renderComponent"
                     :packageFiles="packageFiles"
                     :isOpenRootFolder="true"
                     :packageNameAndVersion="`${packageName}@${curentVersion}`"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from "vuex"
import PackageItem from './PackageItem'

export default {
  name: "PackageModal",
  props: {
    packageName: {
      type: String,
      default: () => ''
    },
  },
  components: {
    PackageItem
  },
  data() {
    return {
      curentVersion: '',
      selectedVersion: '',
      renderComponent: true,
    }
  },
  computed: {
    ...mapState([
      'packageVersions',
      'packageFiles',
    ]),
  },
  created() {
    document.body.style.overflow = 'hidden'
  },
  destroyed() {
    document.body.style.overflow = 'initial'
    this.setPackageVersions([])
    this.setPackageFiles([])

  },
  watch: {
    packageVersions(newVal) {
      this.curentVersion = newVal.tags.latest
      this.getPackageFiles({
        packageName: this.packageName,
        packageVersion: this.curentVersion
      })
    }
  },
  mounted() {
    this.getPackageVersions(this.packageName)
  },
  methods: {
    ...mapMutations([
      'setPackageVersions',
      'setPackageFiles',
    ]),
    ...mapActions([
      'getPackageVersions',
      'getPackageFiles'
    ]),
    changeVersion() {
      this.getPackageFiles({
        packageName: this.packageName,
        packageVersion: this.curentVersion
      })
      this.forceRerender()
    },
    closeModal() {
      this.$emit('closeModal')
    },
    getDefaultPackageUrl() {
      return `https://cdn.jsdelivr.net/npm/${this.packageName}@${this.curentVersion}/${this.packageFiles.default}`
    },
    forceRerender() {
      this.renderComponent = false;

      this.$nextTick(() => {
        this.renderComponent = true;
      })
    }
  }
}
</script>

<style lang="scss">
  .modal {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    &__overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,.2);
    }

    &__body {
      position: relative;
      background-color: #fff;
      border-radius: 4px;
      padding: 30px;
      box-sizing: border-box;
      width: 800px;
      border-top: #ff5627 2px solid;
      height: 70vh;
      overflow: auto;
      margin: 0 20px;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      &::-webkit-scrollbar-thumb {
        background: #c7c7c7;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #b7b7b7;
      }
    }

    &__title {
      margin-top: 0;
      color: #ff5627;
    }
  }

  .files {
    &__root {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    &__item {

    }
  }
</style>
