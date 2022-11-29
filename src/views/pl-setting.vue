<template>
  <div class="flex flex-col">
    <router-link
      class="
        focus:text-gray-400
        hover:text-gray-400
        text-gray-800
        dark:text-gray-100
        mb-4
      "
      to="/"
    >
      <PlChevronLeft class="w-5 h-5" />
    </router-link>
    <h4 >
      Твоя Зепка
    </h4>
    <ul v-for="(months, year) in salary" :key="`${year}-salary`">
      <caption class="text-xl mt-4">
        {{
          year
        }}
      </caption>
      <li v-for="(value, month) in months" :key="`${month}-salary`" class="mb-2">
        <h5 class="mb-2">{{ monthEnum[month] }}</h5>
        <p>{{ value }}</p>
      </li>
    </ul>
    <pl-up-salary @add="onAddSalary" />
    <h4>Отпуск</h4>
    <Datepicker
      v-model="vacationDays"
      dark
      multiDates
      autoApply
      :format="formatDateSelect"
      :enableTimePicker="false"
    />
    <ul v-for="(months, year) in vacationDaysByMonth" :key="year">
      <caption class="text-xl mt-4">
        {{
          year
        }}
      </caption>
      <li v-for="(days, month) in months" :key="month" class="mb-2">
        <span>{{ monthEnum[month] }}</span>
        <Datepicker
          :modelValue="getDates(year, month, days)"
          dark
          multiDates
          inline
          noToday
          readonly
          :startDate="new Date(year, month, days[0])"
          disableMonthYearSelect
          :enableTimePicker="false"
        >
          <template #action-preview> </template>
          <template #action-select> </template>
        </Datepicker>
      </li>
    </ul>
    <h4>Переработки</h4>
    <Datepicker
      v-model="overtimeDays"
      dark
      multiDates
      autoApply
      :format="formatDateSelect"
      :enableTimePicker="false"
    />
    <ul v-for="(months, year) in overtimeDaysByMonth" :key="year">
      <caption class="text-xl mt-4">
        {{
          year
        }}
      </caption>
      <li v-for="(days, month) in months" :key="month" class="mb-2">
        <span>{{ monthEnum[month] }}</span>
        <Datepicker
          :modelValue="getDates(year, month, days)"
          dark
          multiDates
          inline
          noToday
          readonly
          :startDate="new Date(year, month, days[0])"
          disableMonthYearSelect
          :enableTimePicker="false"
        >
          <template #action-preview> </template>
          <template #action-select> </template>
        </Datepicker>
      </li>
    </ul>
  </div>
</template>

<script>
import PlChevronLeft from "../components/icons/pl-chevron-left.vue";
import datesToObj from "../utils/dates-to-obj";

const monthEnum = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь"
];

export default {
  components: {
    PlChevronLeft
  },
  data() {
    return {
      vacationDays: [],
      overtimeDays: [],
      salary: {},
      monthEnum
    };
  },
  computed: {
    vacationDaysByMonth() {
      return datesToObj(this.vacationDays);
    },
    overtimeDaysByMonth() {
      return datesToObj(this.overtimeDays);
    },
  },
  watch: {
    vacationDays(val) {
      let parsingDates = [];
      if (val && val.length) {
        parsingDates = val.map((d) => d.toJSON());
      }
      localStorage.setItem("vacation-days", parsingDates);
    },
    overtimeDays(val) {
      let parsingDates = [];
      if (val && val.length) {
        parsingDates = val.map((d) => d.toJSON());
      }
      localStorage.setItem("overtime-days", parsingDates);
    }
  },
  async mounted() {
    this.vacationDays = (await this.getLocalDataDays("vacation-days")) || [];
    this.overtimeDays = (await this.getLocalDataDays("overtime-days")) || [];
    this.salary = await this.getLocalSalary();
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
        return JSON.parse(localData);
      } catch (error) {
        console.log(error);
        return null
      }
    },
    getDates(year, month, days) {
      return days.map((day) => new Date(year, month, day));
    },
    formatDateSelect(dates) {
      return dates.map((date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
      });
    },
    onAddSalary({ year, month, salary }) {
      let s = JSON.parse(JSON.stringify(this.salary)) || {}
      if (s[year]) {
        s[year][month] = salary
      } else {
        s[year] = {
          [month]: salary
        }
      }
      this.salary = s;
      localStorage.setItem("salary", JSON.stringify(s));
    }
  }
};
</script>
