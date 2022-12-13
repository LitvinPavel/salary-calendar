<template>
  <div class="flex flex-col">
    <pl-month
      v-model:month="month"
      v-model:year="year"
    />
    <div class="inline-flex flex-col mx-auto mb-3 px-3 py-2 rounded-lg bg-secondary-strong">
      <span class="text-xxs leading-none uppercase opacity-70">оклад</span>
      <h3 class="text-base-weak leading-none">
        {{lastSalary}} ₽
      </h3>
    </div>
    <pl-accordion>
      <home-item :type="PART_WORK_DAYS_TYPES.PREV" />
      <home-item :type="PART_WORK_DAYS_TYPES.CURRENT" />
      <home-item-vacation />
    </pl-accordion>
  </div>
  <!-- <pl-slider
    class="w-full h-full"
    :items="[1, 2, 3, 4]"
    isLoop
    @slideChange="onChangeMonth"
  >
    <template #nav>
      <pl-month
        v-model:month="month"
        v-model:year="year"
      />
    </template>
    <template #slide>
      <pl-accordion>
        <home-item :type="PART_WORK_DAYS_TYPES.PREV" />
        <home-item :type="PART_WORK_DAYS_TYPES.CURRENT" />
      </pl-accordion>
    </template>
  </pl-slider> -->
  <home-add-payment-dialog />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import HomeItem from "./home/home-item.vue";
import HomeItemVacation from "./home/home-item-vacation.vue";
import HomeAddPaymentDialog from "@/views/home/home-add-payment-dialog.vue"

import PART_WORK_DAYS_TYPES from "@/utils/enum/part-work-days-types";

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
    HomeItem,
    HomeItemVacation,
    HomeAddPaymentDialog
  },
  setup () {
    const store = useStore();
    const year = computed(() => {
      return store.getters.currentYear;
    });
    const month = computed(() => {
      const { currentMonth } = store.getters;
      const m = currentMonth === 12 ? 0 : currentMonth;
      return monthEnum[m];
    });

    const lastSalary = computed(() => {
      return store.getters.lastSalary;
    });

    const onChangeMonth = ({ swipeDirection }) => {
      if (swipeDirection === "prev") store.dispatch("prevMonth");
      if (swipeDirection === "next") store.dispatch("nextMonth");
    }
    return {
      year,
      month,
      lastSalary,
      onChangeMonth,
      PART_WORK_DAYS_TYPES
    };
  }
};
</script>
