<template>
  <ul class="flex flex-wrap -ml-0.5 -mt-0.5 pb-3">
    <li
      v-for="(day, index) in days"
      :key="index"
      class="
        w-10
        h-10
        relative
        rounded-sm
        ml-0.5
        mt-0.5
        cursor-pointer
      "
      :class="color"
    >
      <span class="absolute pl-align-center">{{ day }}</span>
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import PART_WORK_DAYS_TYPES from "@/utils/enum/part-work-days-types";

const colors = {
  [PART_WORK_DAYS_TYPES.CURRENT]: "bg-primary",
  [PART_WORK_DAYS_TYPES.PREV]: "bg-accent",
  [PART_WORK_DAYS_TYPES.VACATION]: "bg-warning"
}

export default {
  name: "pl-work-days",
  props: {
    days: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: PART_WORK_DAYS_TYPES.CURRENT
    }
  },
  setup(props) {
    const color = computed(() => {
      return colors[props.type] || null;
    });
    return {
      color
    }
  }
};
</script>
