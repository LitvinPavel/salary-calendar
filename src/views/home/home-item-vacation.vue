<template>
  <pl-accordion-item v-if="workDays && workDays.length">
    <template #accordion-trigger>
      <div class="absolute top-0 right-0 mt-3 mr-6 text-accent text-xs">
        <span class="align-middle">Отпуск</span>
      </div>
      <home-item-payment
        :expect-pay="(daily * workDays.length)"
        :year="monthData?.year"
        :month="monthData?.month"
        :type="PART_WORK_DAYS_TYPES.VACATION"
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
          <pl-work-days :days="workDays" :type="PART_WORK_DAYS_TYPES.VACATION" />
        </div>
    </template>
  </pl-accordion-item>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import homeItemPayment from "./home-item-payment";
import PART_WORK_DAYS_TYPES from "@/utils/enum/part-work-days-types";

export default {
  components: {
    homeItemPayment
  },
  setup() {
    const store = useStore();
    const monthData = computed(() => {
      return store.getters.currentData;
    });
    const daily = computed(() => {
      const { total } = store.getters.currentData?.[PART_WORK_DAYS_TYPES.CURRENT] || {};
      const { lastSalary } = store.getters;
      return lastSalary && total
        ? lastSalary / total.length
        : 0;
    });
    const workDays = computed(() => {
      const { vacationList, currentYear, currentMonth } = store.getters;
      const { total } = store.getters.currentData?.[PART_WORK_DAYS_TYPES.CURRENT] || {};
      const list = vacationList?.[currentYear]?.[currentMonth]?.vacation || []
      return list.filter(v => (total || []).includes(v)) || [];
    });
    const lastSalary = computed(() => {
      return store.getters.lastSalary;
    });
    
    return {
      monthData,
      lastSalary,
      daily,
      workDays,
      PART_WORK_DAYS_TYPES
    };
  }
};
</script>
