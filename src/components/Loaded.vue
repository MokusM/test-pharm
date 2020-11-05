<template>
  <div class="main-screen section">
      <div class="wrapper">
        <div class="main-screen__circle">
            <div class="main-screen__sub-title">Добро пожаловать в игру</div>
            <div class="main-screen__title"><span>Помоги</span> Фармацевту</div>
            <button class="button button-white" @click.stop="changeDrawer">Начать</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    changeDrawer() {
      this.$emit("changeDrawer", !this.drawer);
    }
  }
}
</script>  