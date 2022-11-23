<template>
  <main class="flex flex-col">
    <PlNav />
    <pl-month
      :month="currentMonth"
      :year="currentYear"
      @select="currentMonth = $event"
      @changeYear="currentYear = $event"
    />
    <pl-summary-tail
      :days="prevDays"
      :daily="getDailySalary(prevDays)"
      :vacation="vacationPrev"
    >
      <template #workDays="{ items, daily }">
        <pl-work-days :days="items.slice(15)" :daily="daily" />
      </template>
      <template #summary="{ items, daily }">
        <pl-summary-item :days="items.slice(15)" :daily="daily" title="ЗП" />
      </template>
    </pl-summary-tail>
    <pl-summary-tail
      :days="currentDays"
      :daily="getDailySalary(currentDays)"
      :vacation="vacationCurrent"
    >
      <template #workDays="{ items, daily }">
        <pl-work-days :days="items.slice(0, 15)" :daily="daily" />
      </template>
      <template #summary="{ items, daily }">
        <pl-summary-item
          :days="items.slice(0, 15)"
          :daily="daily"
          title="Аванс"
        />
      </template>
    </pl-summary-tail>
    <pl-summary-tail
      v-if="vacationCurrent && vacationCurrent.length"
      :days="getVacationDays(vacationCurrent)"
      :daily="getDailySalary(currentDays)"
    >
      <template #workDays="{ items, daily }">
        <pl-work-days :days="items.slice(0, 15)" :daily="daily" />
      </template>
      <template #summary="{ items, daily }">
        <pl-summary-item
          :days="items.slice(0, 15)"
          :daily="daily"
          title="Отпускные"
        />
      </template>
    </pl-summary-tail>
  </main>
</template>

<script>
import PlNav from "./pl-nav.vue";
import datesToObj from "../utils/dates-to-obj";
import { getCalendar } from "../api/calendar.js";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1];

export default {
  name: "pl-main",
  components: {
    PlNav
  },
  data() {
    return {
      salary: 190000,
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
    },
    vacationCurrent() {
      const v = datesToObj(this.vacationDays);
      if (v[this.currentYear] && v[this.currentYear][this.currentMonth]) {
        return v[this.currentYear][this.currentMonth];
      } else return [];
    },
    vacationPrev() {
      const v = datesToObj(this.vacationDays);
      if (v[this.prevYear] && v[this.prevYear][this.prevMonth]) {
        return v[this.prevYear][this.prevMonth];
      } else return [];
    }
  },
  async mounted() {
    this.vacationDays = (await this.getLocalVacationDays()) || [];
  },
  methods: {
    async getLocalVacationDays() {
      try {
        const localData = await localStorage.getItem("vacation-days");
        if (localData) {
          const arrDate = localData.split(",");
          return arrDate.map((d) => new Date(d));
        } else return [];
      } catch (error) {
        console.log(error);
        return null;
      }
    },
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
    getVacationDays(vacationCurrent) {
      return this.currentDays.split("").map((d, i) => {
        return vacationCurrent.includes(i + 1) ? d : 1;
      });
    },
    getDailySalary(days) {
      return this.salary
        ? this.salary / days.split("").filter((d) => +d === 0).length
        : 0;
    }
  }
};
</script>
