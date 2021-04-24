<template>
  <li class="files__item">
    <div @click="toggleFolder" :class="{files__folder: isFolder}">
      <a :href="getUrl(path, packageFiles.name)" v-if="!isFolder" target="_blank" class="files__link">
        {{ packageFiles.name }}
      </a>

      <template v-if="!isOpenRootFolder && isFolder">
        <i class="fas fa-folder-open"></i>
        {{ packageFiles.name }}
      </template>
    </div>
    <ul v-show="isOpenRootFolder || openFolder" v-if="isFolder" class="files__list">
      <PackageItem
        v-for="files in packageFiles.files"
        :packageFiles="files"
        :path="[...path, packageFiles.name]"
        :packageNameAndVersion="packageNameAndVersion"
        :key="files.name"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "PackageItem",
  props: {
    packageFiles: [Object, Array],
    isOpenRootFolder: Boolean,
    packageNameAndVersion: String,
    path: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      openFolder: false,
    }
  },
  mounted() {

  },
  computed: {
    isFolder: function () {
      return this.packageFiles.files && this.packageFiles.files.length
    }
  },
  methods: {
    toggleFolder: function () {
      if (this.isFolder) {
        this.openFolder = !this.openFolder
      }
    },
    getUrl(arr, fileName) {
      const path = arr.reduce((acc, item) => {
        return item ? acc + item + '/' : acc
      }, '')
      return  'https://cdn.jsdelivr.net/npm/' + this.packageNameAndVersion + '/' + path  + fileName
    }
  }
}
</script>

<style lang="scss">
  .files {
    &__list {
      padding: 10px;
      list-style: none;
    }

    &__switch {
      font-weight: 400;
      width: 10px;
      display: inline-block;
    }

    &__link {
      text-decoration: none;
    }

    &__item {
      padding: 2px;
      font-size: 14px;

      &_default {
        display: block;
        border-bottom: #e5e5e5 1px solid;
        border-top: #e5e5e5 1px solid;
        margin: 10px 0;
        padding: 10px 0;
        text-decoration: none;
      }
    }

    &__folder {
      font-weight: 500;
      font-size: 16px;
    }
  }
</style>
