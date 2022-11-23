<template>
  <Datepicker
    v-model="date"
    inline
    dark
    range
    multiCalendars
    @updateMonthYear="handleMonthYear"
  />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const date = ref();


      onMounted(() => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth();

        handleMonthYear({ instance: 0, month, year })
      })

      const getMonth = (month, instance) => {
        return instance
          ? month === 0 ? 11 : month - 1
          : month === 11 ? 0 : month + 1;
      }

      const getYear = (year, month, instance) => {
        return instance
          ? month !== 0 ? year : year - 1
          : month !== 11 ? year : year + 1;
      }

      const handleMonthYear = ({ instance, month, year }) => {
        let startYear, endYear, startMonth, endMonth;
        if (instance) {
          startYear = getYear(year, month, instance);
          endYear = year;
          startMonth = getMonth(month, instance);
          endMonth = month;
        } else {
          endYear = getYear(year, month, instance);
          startYear = year;
          endMonth = getMonth(month, instance);
          startMonth = month;
        }
        const startDate = new Date(startYear, startMonth, 16);
        const endDate = new Date(endYear, endMonth, 15);
        date.value = [startDate, endDate];

      }

      
</script>