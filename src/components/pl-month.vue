<template>
  <div class="px-4 flex items-center justify-between">
    <span
      tabindex="0"
      class="
        focus:outline-none
        text-base
        font-bold
        dark:text-gray-100
        text-gray-800
      "
      >{{ currentMonth }} {{ currentYear }}</span
    >
    <div class="flex items-center">
      <button
        aria-label="calendar backward"
        class="
          focus:text-gray-400
          hover:text-gray-400
          text-gray-800
          dark:text-gray-100
        "
        @click="prevMonth"
      >
        <PlChevronLeft class="icon icon-tabler icon-tabler-chevron-left" />
      </button>
      <button
        aria-label="calendar forward"
        class="
          focus:text-gray-400
          hover:text-gray-400
          ml-3
          text-gray-800
          dark:text-gray-100
        "
        @click="nextMonth"
      >
        <PlChevronRight class="icon icon-tabler icon-tabler-chevron-right" />
      </button>
    </div>
  </div>
</template>

<script>
import PlChevronLeft from './icons/pl-chevron-left.vue';
import PlChevronRight from './icons/pl-chevron-right.vue';

const monthEnum = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export default {
  props: {
    month: {
      type: Number,
      default: 0
    },
    year: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      currentYear: this.year
    }
  },
  computed: {
    currentMonth() {
      const month = this.month === 12 ? 0 : this.month
      return monthEnum[month];
    }
  },
  methods: {
    prevMonth() {
      if (this.month === 0) {
        this.currentYear = this.currentYear - 1;
        this.$emit("changeYear", this.currentYear);
      }
      const month = this.month > 0 ? this.month - 1 : 11;
      this.$emit("select", month)
    },
    nextMonth() {
      if (this.month === 11) {
        this.currentYear = this.currentYear + 1;
        this.$emit("changeYear", this.currentYear);
      }
      const month = this.month < 11 ? this.month + 1 : 0;
      this.$emit("select", month)
    }
  },
  components: { PlChevronLeft, PlChevronRight } 
};
</script>
