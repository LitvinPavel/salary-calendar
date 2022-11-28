<template>
  <main class="flex flex-col">
    <PlNav />
    <pl-month
      :month="currentMonth"
      :year="currentYear"
      @select="onSelectMonth"
      @changeYear="currentYear = $event"
    />
    <div class="mt-4 px-4 flex justify-between text-slate-500">
      <p>Текущий оклад</p>
      <p class="text-right font-bold">{{lastSalary}}  ₽</p>
    </div>
    <pl-summary-tail
      :days="prevDays"
      :daily="getDailySalary(prevDays)"
      :vacation="vacationPrev"
      :overtime="overtimePrev"
    >
      <template #workDays="{ items, daily }">
        <pl-work-days :days="items.slice(15)" :daily="daily" />
      </template>
      <template #summary="{ items, daily }">
        <pl-summary-item
          :days="items.slice(15)"
          :daily="daily"
          title="ЗП(12)"
          @updateSum="onUpdateSum"
        />
      </template>
    </pl-summary-tail>
    <pl-summary-tail
      :days="currentDays"
      :daily="getDailySalary(currentDays)"
      :vacation="vacationCurrent"
      :overtime="overtimeCurrent"
    >
      <template #workDays="{ items, daily }">
        <pl-work-days :days="items.slice(0, 15)" :daily="daily" />
      </template>
      <template #summary="{ items, daily }">
        <pl-summary-item
          :days="items.slice(0, 15)"
          :daily="daily"
          title="Аванс(27)"
          @updateSum="onUpdateSum"
        />
      </template>
    </pl-summary-tail>
    <pl-summary-tail
      v-show="vacationCurrent && vacationCurrent.length"
      :days="getVacationDays(vacationCurrent)"
      :daily="getDailySalary(currentDays)"
    >
      <template #workDays="{ items, daily }">
        <pl-work-days :days="items" :daily="daily" />
      </template>
      <template #summary="{ items, daily }">
        <pl-summary-item
          :days="items"
          :daily="daily"
          title="Отпускные"
          @updateSum="onUpdateSum"
        />
      </template>
    </pl-summary-tail>
    <p class="text-right mt-4 text-2xl font-bold underline pr-4 text-slate-400">{{totalSum.toLocaleString('ru')}}  ₽</p>
  </main>
</template>

<script>
import PlNav from "./pl-nav.vue";
import datesToObj from "../utils/dates-to-obj";
import { getCalendar } from "../api/calendar.js";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1];

function last(arr, curr) {
  let count = 1
  arr.reduce((sum, current) => {
    if (+curr >= +current) {
      return +sum > +current ? sum : current
    } else {
      count++
      return +sum < +current ? current : sum
    }
    
  }, curr)
  return arr[arr.length - count] || arr[0];
}

export default {
  name: "pl-main",
  components: {
    PlNav
  },
  data() {
    return {
      salary: {},
      total: {},
      vacationDays: [],
      overtimeDays: [],
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
    },
    overtimeCurrent() {
      const v = datesToObj(this.overtimeDays);
      if (v[this.currentYear] && v[this.currentYear][this.currentMonth]) {
        return v[this.currentYear][this.currentMonth];
      } else return [];
    },
    overtimePrev() {
      const v = datesToObj(this.overtimeDays);
      if (v[this.prevYear] && v[this.prevYear][this.prevMonth]) {
        return v[this.prevYear][this.prevMonth];
      } else return [];
    },
    totalSum() {
      const sum = (Object.values(this.total) || []).reduce((acc, curr) => acc + curr, 0)
      return `${(sum || 0).toFixed(2)}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    },
    lastSalary() {
      let lastSalary = 0;
      const salaryKeys = Object.keys(this.salary) || [];
      if (salaryKeys.length && this.currentYear) {
        const year = last(Object.keys(this.salary), this.currentYear);
        const month = last(Object.keys(this.salary[year]), this.currentMonth);
        lastSalary = this.salary[year][month];
      }
      return lastSalary;
    }
  },
  async mounted() {
    this.salary = await this.getLocalSalary();
    this.vacationDays = (await this.getLocalDataDays("vacation-days")) || [];
    this.overtimeDays = (await this.getLocalDataDays("overtime-days")) || [];
  },
  methods: {
    async getLocalDataDays(key) {
      try {
        const localData = await localStorage.getItem(key);
        if (localData) {
          const arrDate = localData.split(",");
          return arrDate.map((d) => new Date(d));
        } else return [];
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    async getLocalSalary() {
      try {
        const localData = await localStorage.getItem("salary");
        return localData ? JSON.parse(localData) : {};
      } catch (error) {
        console.log(error);
        return null
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
        return vacationCurrent.includes(i + 1) ? +d : 1;
      });
    },
    getOvertimeDays(overtimeCurrent) {
      return this.currentDays.split("").map((d, i) => {
        return overtimeCurrent.includes(i + 1) ? +d : 1;
      });
    },
    getDailySalary(days) {
      return this.lastSalary
        ? this.lastSalary / days.split("").filter((d) => +d === 0).length
        : 0;
    },
    onUpdateSum(event) {
      this.total = {
        ...this.total,
        ...event
      }
    },
    onSelectMonth(month) {
      this.currentMonth = month;
    }
  }
};
</script>
