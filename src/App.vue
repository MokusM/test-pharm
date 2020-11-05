<template>
  <div id="app">
    <Loaded v-if="drawer" :drawer="drawer"  @changeDrawer="onDrawerChange"/>
    <Main v-else-if="main" :drawer="drawer"  @changeDrawer="onDrawerChange" @showResult="onShowResult"/>
    <Final :drawer="drawer"  @changeDrawer="onDrawerChange" @showMain="onShowMain"/>
  </div>
</template> 

<script>
import './assets/fonts/fonts.css';
import Loaded from './components/Loaded.vue';
import Final from './components/Final.vue';
import Main from './components/Main.vue';

export default {
  name: 'App',
  components: {
    Loaded,
    Final,
    Main
  },
   data: () => ({
    drawer: true,
    main: false
  }),
  methods: {
		onDrawerChange(event) {
			this.drawer = event;
			this.main = true;
    },   
    onShowResult() {
			this.drawer = false;
			this.main = false;
    },
    onShowMain() {
			this.drawer = false;
			this.main = true;
    },
    
  }
}
</script>

<style lang="scss" src="@/assets/css/index.scss" />