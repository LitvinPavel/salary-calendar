<template>
  <div>
    <p class="text-xs text-gray-400">{{ title }}</p>
    <p class="text-2xl font-bold">{{ sum.toFixed(2) }} ₽</p>
  </div>
</template>

<script>
  export default {
    name: "pl-summary-item",
    props: {
      days: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: null
      },
      daily: {
        type: Number,
        default: 0
      }
    },
    computed: {
      sum() {
        const workDaysLength = this.days.filter(({ type }) => +type === 0).length;
        const overtimeDaysLength = this.days.filter(({ type }) => +type === 8).length * 2;
        return (workDaysLength + overtimeDaysLength) * this.daily;
      }
    },
    watch: {
      sum(val) {
        this.$emit("updateSum", { [this.title]: val })
      }
    }
  }
</script>
