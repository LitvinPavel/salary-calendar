<template>
  <ul class="flex flex-wrap -ml-0.5 -mt-0.5">
    <li
      v-for="({ count, type }, index) in workDays"
      :key="index"
      class="w-4 h-4 relative rounded-sm text-xxs bg-slate-400 ml-0.5 mt-0.5 cursor-pointer hover:bg-slate-700"
      :class="{ 'bg-red-400': +type === 8 }"
      :title="`${Math.round(+type === 8 ? daily * 2 : daily)} ₽`"
    >
      <span class="absolute pl-align-center">{{ count }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "pl-work-days",
  props: {
    days: {
      type: Array,
      default: () => []
    },
    daily: {
      type: Number,
      default: 0
    }
  },
  computed: {
    workDays() {
      return this.days.filter(({ type }) => (+type === 0 || +type === 8));
    }
  }
};
</script>
