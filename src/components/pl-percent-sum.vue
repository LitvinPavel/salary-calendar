<template>
  <div
    class="rounded-full w-8 h-8 relative"
    :style="`background: linear-gradient(to top, var(--primary) ${percent}%, var(--base-weak) ${
      percent > 95 ? 100 : percent + 5
    }%);`"
  >
    <span class="text-xxs text-secondary-weak font-semibold absolute pl-align-center">
      {{ percent === 1 ? 0 : Math.round(percent) }}%
    </span>
  </div>
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
