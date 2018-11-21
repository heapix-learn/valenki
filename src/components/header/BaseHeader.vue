<template>
	<v-toolbar :dark="false" :fixed="true">
		<v-toolbar-title>Lemma</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-menu offset-y>
      <v-toolbar-side-icon slot="activator">M</v-toolbar-side-icon>
      <v-list :fixed="true">
        <router-link to="/login"/>
        <v-list-tile v-for="(item, index) in items"
          :key="index">
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
	</v-toolbar>
</template>

<script>
import {
  VToolbar,
  VToolbarSideIcon,
  VMenu,
  VList,
  VListTile,
  VSpacer
} from "vuetify/lib";

export default {
  name: "BaseHeader",
  components: {
    VToolbar,
    VToolbarSideIcon,
    VMenu,
    VList,
    VListTile,
    VSpacer
  },
  data() {
    return {
      items: [{ title: "Sign In" }, { title: "Sign Up" }, { title: "Info" }]
    };
  }
};
</script>

<style lang="scss">
@import "@/scss/global.scss";
</style>