<template>
  <div class="bg-white dark:bg-gray-800 p-4 mt-2 shadow-lg">
    <div class="flex items-start justify-between space-x-4">
      <slot name="workDays" :items="daysWithNumber" :daily="daily" />
      <div class="text-right flex-grow">
        <slot name="summary" :items="daysWithNumber" :daily="daily" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pl-summary-tail",
    props: {
      days: {
        type: [Array, String],
        default: () => []
      },
      daily: {
        type: Number,
        default: 0
      },
      vacation: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      daysWithNumber() {
        const days =
          typeof this.days === "string" ? this.days.split("") : this.days;
        return (days || []).map((d, i) => {
          const type = this.vacation.includes(i + 1) ? 9 : d;
          return { type: type, count: i + 1 };
        });
        
      }
    }
  }
</script>
