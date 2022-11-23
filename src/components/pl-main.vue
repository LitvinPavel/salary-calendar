<template>
  <main>
    <div class="flex items-center justify-center py-8">
      <div class="max-w-lg w-full">
        <div class="md:p-8 p-5">
          <pl-month
            :month="currentMonth"
            :year="currentYear"
            @select="currentMonth = $event"
            @changeYear="currentYear = $event"
          />
          <Datepicker
            v-model="vacationDays"
            dark
            range
          />
          {{getVacationDays()}}
          <pl-summary-tail :days="prevDays" :daily="getDailySalary(prevDays)">
            <template #workDays="{ items, daily }">
              <pl-work-days :days="items.slice(15)" :daily="daily" />
            </template>
            <template #summary="{ items, daily }">
              <pl-summary-item :days="items.slice(15)" :daily="daily" title="ЗП" />
            </template>
          </pl-summary-tail>
          <pl-summary-tail :days="currentDays" :daily="getDailySalary(currentDays)">
            <template #workDays="{ items, daily }">
              <pl-work-days :days="items.slice(0, 15)" :daily="daily" />
            </template>
            <template #summary="{ items, daily }">
              <pl-summary-item :days="items.slice(0, 15)" :daily="daily" title="Аванс" />
            </template>
          </pl-summary-tail>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { getCalendar } from "../api/calendar.js";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1];

export default {
  name: "pl-main",
  data() {
    return {
      salary: 100000,
      vacationDays: [],
      prevDays: "",
      currentDays: "",
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      currentDate: new Date().getDate()
    };
  },
  watch: {
    currentMonth: {
      immediate: true,
      handler() {
        this.getCurrent();
        this.getPrev();
      }
    }
  },
  computed: {
    prevMonth() {
      return +this.currentMonth === 0 ? 11 : this.currentMonth - 1;
    },
    prevYear() {
      return +this.currentMonth !== 0 ? this.currentYear : this.currentYear - 1;
    }
  },
  methods: {
    async getCurrent() {
      this.currentDays = await this.fetchData(
        this.currentYear,
        this.currentMonth
      );
    },
    async getPrev() {
      this.prevDays = await this.fetchData(this.prevYear, this.prevMonth);
    },
    async fetchData(year, month) {
      try {
        const data = await getCalendar(year, months[month]);
        return data || "";
      } catch (e) {
        console.error(e);
      }
    },
    getDailySalary(days) {
      return this.salary
        ? this.salary /
          days.split("").filter(d => +d === 0).length
        : 0;
    },
    getVacationDays() {
      const [ start, end ] = this.vacationDays;
      console.log(start)
      if (start && (start.getMonth() === this.prevMonth || start.getMonth() === this.currentMonth)) {
        return start.getDate()
      }
      return null
    }
  }
};
</script>
