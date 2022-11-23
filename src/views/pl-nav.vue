<template>
  <router-link
    class="
      focus:text-gray-400
      hover:text-gray-400
      text-gray-800
      dark:text-gray-100
      ml-auto
      mb-4
    "
    to="/setting"
  >
    <PlSettingIcon class="icon w-5 h-5" />
  </router-link>
</template>

<script>
  import PlSettingIcon from '../components/icons/pl-setting-icon.vue';
  export default {
    components: {
      PlSettingIcon
    }
  }
</script>
