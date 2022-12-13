<template>
  <div
    class="rounded-full w-8 h-8 mb-3"
    :style="`background: linear-gradient(to top, var(--primary) ${percent}%, var(--base-weak) ${
      percent > 95 ? 100 : percent + 5
    }%);`"
  ></div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const percent = computed(() => {
      return !props.total || !props.current
        ? 1
        : (props.current / props.total) * 100;
    });

    return {
      percent
    };
  }
};
</script>
