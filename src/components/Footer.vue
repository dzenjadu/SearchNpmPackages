<template>
  <footer class="footer">
    <a href="https://github.com/dzenjadu" target="_blank" class="footer__link">
      <img src="../assets/repository.svg" alt="github" class="footer__icon">
      <span>Галанкинa Анaстacия</span>
    </a>

  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss">
  .footer {
    flex: 0 0 auto;
    border-top: 1px solid #d6d6d6;
    padding: 20px 0 10px;
    background-color: #d6d6d6;

    &__link {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      text-decoration: none;
    }

    &__icon {
      width: 30px;
      margin-right: 15px;
    }
  }
</style>
