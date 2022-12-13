<template>
  <div
      class="
        bg-base-strong
        text-base-weak
        overflow-hidden
        relative
        flex
        w-screen
        h-screen
        min-w-sm
      "
    >
      <div class="bg-base-strong h-full w-full px-5 pt-6 pb-20 overflow-y-auto flex flex-col">
        <router-view />
      </div>
      <div class="pl-nav">
        <router-link
          to="/"
          class="
            flex flex-grow
            items-center
            justify-center
            p-2
          "
        >
          <pl-btn-icon icon-name="home" size="l" />
        </router-link>
        <router-link
          to="/setting"
          class="
            flex flex-grow
            items-center
            justify-center
            p-2
          "
        >
          <pl-btn-icon icon-name="setting" size="l" />
        </router-link>
      </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
onMounted(() => {
  store.dispatch("initCalendarData");
  store.dispatch("initSalaryList");
  store.dispatch("initVacationList");
});
</script>

<style lang="scss">
@import "assets/scss/style";
</style>
