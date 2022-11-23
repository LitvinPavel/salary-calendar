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
    <Datepicker
      v-model="vacationDays"
      dark
      multiDates
      :format="formatDateSelect"
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
      monthEnum
    };
  },
  computed: {
    vacationDaysByMonth() {
      return datesToObj(this.vacationDays);
    }
  },
  watch: {
    vacationDays(val) {
      let parsingDates = [];
      if (val && val.length) {
        parsingDates = val.map((d) => d.toJSON());
      }
      localStorage.setItem("vacation-days", parsingDates);
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
    }
  }
};
</script>
