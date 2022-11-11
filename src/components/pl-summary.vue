<template>
  <form class="px-4 flex flex-col items-start space-y-2 w-full" @submit.prevent>
    <label class="block text-gray-100 text-sm font-bold mb-2" for="username">
      Сколько ты получаешь?
    </label>
    <input type="number" v-model.number="salary" placeholder="зепка" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" />
    <p>Твой аванс 27 числа:</p>
    <h3 class="ml-auto font-bold underline">{{ firstSalary.toFixed(2) }} ₽</h3>
    <p>Твоя ЗП 12 числа:</p>
    <h3 class="ml-auto font-bold underline">{{ lastSalary.toFixed(2) }} ₽</h3>
  </form>
</template>

<script>
import { getCalendar } from "../api/calendar.js";
const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1];

export default {
  props: {
    month: {
      type: [Number, String],
      default: null
    },
    year: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
      salary: 0,
      firstDays: "",
      lastDays: ""
    };
  },
  computed: {
    prevMonth() {
      return +this.month === 0 ? 11 : this.month - 1;
    },
    prevYear() {
      return +this.month !== 0 ? this.year : this.year - 1;
    },
    firstSalary() {
      const salaryByDay = this.salary
        ? +this.salary /
          this.firstDays.split("").filter((item) => +item !== 1).length
        : 0;
      const first = this.firstDays.split("").slice(0, 15);
      return first.filter((item) => +item !== 1).length * salaryByDay;
    },
    lastSalary() {
      const salaryByDay = this.salary
        ? +this.salary /
          this.lastDays.split("").filter((item) => +item !== 1).length
        : 0;
      const last = this.lastDays.split("").slice(15);
      return last.filter((item) => +item !== 1).length * salaryByDay;
    }
  },
  watch: {
    month: {
      immediate: true,
      handler() {
        this.getFirst();
        this.getLast();
      }
    },
    salary(val) {
      localStorage.setItem("salary", val);
    }
  },
  async mounted() {
    this.salary = await this.getLocalSalary();
  },
  methods: {
    async getLocalSalary() {
      try {
        const localData = await localStorage.getItem("salary");
        return JSON.parse(localData);
      } catch (error) {
        console.log(error);
        return null
      }
    },
    async getFirst() {
      this.firstDays = await this.fetchCalendar(this.year, this.month);
    },
    async getLast() {
      this.lastDays = await this.fetchCalendar(this.prevYear, this.prevMonth);
    },
    async fetchCalendar(year, month) {
      try {
        const data = await getCalendar(year, months[month]);
        return data;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>
