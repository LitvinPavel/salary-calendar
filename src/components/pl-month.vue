<template>
  <section class="flex items-center justify-between mb-6">
    <pl-btn-icon
      class="swiper-button-prev"
      icon-name="chevron-left"
      @click="prev"
    />
    <div class="text-xl space-x-2">
      <span class="">{{ month }}</span>
      <span class="text-primary">{ {{ year }} }</span>
    </div>
    <pl-btn-icon
      class="swiper-button-next"
      :class="{ 'cursor-not-allowed opacity-50': limitedYear }"
      icon-name="chevron-right"
      @click="next(limitedYear)"
    />
  </section>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
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

    const limitedYear = computed(() => {
      const nowYear = new Date().getFullYear();
      return store.getters.currentYear > nowYear && store.getters.currentMonth === 11;
    });

    const prev = () => {
      store.dispatch("prevMonth");
    }

    const next = (limit) => {
      if (!limit) {
        store.dispatch("nextMonth");
      }
    }
    return {
      year,
      month,
      limitedYear,
      prev,
      next
    };
  }
};
</script>
