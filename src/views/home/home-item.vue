<template>
  <pl-accordion-item>
    <template #accordion-trigger>
      <div class="absolute top-0 right-0 mt-3 mr-6 text-accent text-xs">
        <span class="align-middle">{{ titles[type] }}</span>
      </div>
      <home-item-payment
        :expect-pay="(daily * workDays.length)"
        :year="monthData?.year"
        :month="monthData?.month"
        :type="type"
        class="flex w-full justify-between items-end"
      />
    </template>
    <template #accordion-content>
      <div class="grid grid-cols-3 divide-x mb-3">
          <div class="pr-3">
            <span class="text-xxs leading-none uppercase opacity-70">Ожидается</span>
            <h3 class="text-base-weak leading-none">
              {{ (daily * workDays.length).toFixed(2) }} ₽
            </h3>
          </div>
          <div class="px-3">
            <span class="text-xxs leading-none uppercase opacity-70">В день</span>
            <h3 class="text-base-weak leading-none">
              {{ daily.toFixed(2) }} ₽
            </h3>
          </div>
          <div class="px-3">
            <span class="text-xxs leading-none uppercase opacity-70">в час</span>
            <h3 class="text-base-weak leading-none">
              {{ (daily / 8).toFixed(2) }} ₽
            </h3>
          </div>
        </div>
        <div>
          <pl-work-days :days="workDays" :type="type" />
        </div>
    </template>
  </pl-accordion-item>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import homeItemPayment from "./home-item-payment";
import PART_WORK_DAYS_TYPES from "@/utils/enum/part-work-days-types";

const negativeIndex = {
  [PART_WORK_DAYS_TYPES.CURRENT]: 0,
  [PART_WORK_DAYS_TYPES.PREV]: 1
}

const titles = {
  [PART_WORK_DAYS_TYPES.CURRENT]: "Аванс(27)",
  [PART_WORK_DAYS_TYPES.PREV]: "ЗП(12)"
}


export default {
  components: {
    homeItemPayment
  },
  props: {
    type: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const store = useStore();
    const monthData = computed(() => {
      return store.getters.currentData;
    });
    const daily = computed(() => {
      const { total } = store.getters.currentData?.[props.type] || {};
      const { lastSalary } = store.getters;
      return lastSalary && total
        ? lastSalary / total.length
        : 0;
    });
    const workDays = computed(() => {
      const { vacationList, currentYear, currentMonth } = store.getters;
      let month = currentMonth - negativeIndex[props.type];
      let year = month  === -1 ? currentYear - 1 : currentYear;
      const vacation = vacationList?.[year]?.[month  === -1 ? 11 : month]?.vacation || [];
      const { part } = store.getters.currentData?.[props.type] || {};
      return (part || []).filter(d => !vacation.includes(d));
    });
    const vacationList = computed(() => {
      const { vacationList, currentYear, currentMonth } = store.getters;
      return vacationList?.[currentYear]?.[currentMonth]?.vacation || [];
    });
    const lastSalary = computed(() => {
      return store.getters.lastSalary;
    });
    
    return {
      monthData,
      lastSalary,
      daily,
      workDays,
      vacationList,
      titles
    };
  }
};
</script>
