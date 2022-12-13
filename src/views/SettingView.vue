<template>
  <div class="flex flex-col flex-1 space-y-6">
    <section class="">
      <div class="flex justify-between mb-3">
        <h2>Изменения ЗП</h2>
        <div class="flex items-end space-x-6">
          <span class="cursor-pointer" @click="onClearSalary">Сбросить</span>
          <pl-btn-icon
            icon-name="plus"
            size="l"
            class="rounded-full bg-primary"
            @click="onAddSalary"
          />
        </div>
      </div>
      <ul
        class="rounded-lg p-5 bg-secondary-strong flex flex-col"
        v-for="(year, yKey) in salaryList"
        :key="yKey"
      >
        <li
          v-for="mKey in Object.keys(year).reverse()"
          :key="mKey"
          class="flex justify-between border-b border-secondary-weak mb-3 pb-3"
        >
          <div>
            {{ monthEnum[mKey] }}
            <span class="text-primary">{ {{ yKey }} }</span>
          </div>
          <div>{{ year[mKey] }} ₽</div>
        </li>
      </ul>
    </section>
    <section>
      <div class="flex justify-between mb-3">
        <h2>Отпуск</h2>
        <div class="flex items-end space-x-6">
          <span class="cursor-pointer" @click="onClearVacation">Сбросить</span>
          <pl-btn-icon
            icon-name="plus"
            size="l"
            class="rounded-full bg-primary"
            @click="onAddVacation"
          />
        </div>
      </div>
      <ul
        class="rounded-lg p-5 bg-secondary-strong flex flex-col"
        v-for="(year, yKey) in vacationList"
        :key="yKey"
      >
        <li
          v-for="mKey in Object.keys(year).reverse()"
          :key="mKey"
          class="border-b border-secondary-weak mb-3"
        >
          <div class="mb-3">
            {{ monthEnum[mKey] }}
            <span class="text-primary">{ {{ yKey }} }</span>
          </div>
          <pl-work-days :days="year[mKey].vacation" />
        </li>
      </ul>
    </section>
    <section class="flex-1 flex flex-col justify-end items-center">
      <button
        class="
          text-secondary-weak
          transition
          duration-300
          ease-in-out
          select-none
          hover:text-base-weak
          focus:outline-none
          focus-visible:outline-none
          rounded-full
          bg-primary
          px-3
          py-1
        "
        @click="onClearCalendarData"
      >
        Очистить платежи
      </button>
    </section>
  </div>
  <setting-up-salary-dialog />
  <setting-vacation-dialog />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import settingUpSalaryDialog from "@/views/setting/setting-up-salary-dialog";
import settingVacationDialog from "@/views/setting/setting-vacation-dialog";

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
    settingUpSalaryDialog,
    settingVacationDialog
  },
  setup() {
    const store = useStore();
    const salaryList = computed(() => {
      return store.getters.salaryList;
    });
    const vacationList = computed(() => {
      return store.getters.vacationList;
    });
    const onAddSalary = () => {
      store.dispatch("setUpSalaryModal", { show: true });
    };
    const onAddVacation = () => {
      store.dispatch("setVacationModal", { show: true });
    };
    const onClearCalendarData = () => {
      store.dispatch("clearCalendarData");
    };
    const onClearVacation = () => {
      store.dispatch("removeVacationList");
    };
    const onClearSalary = () => {
      store.dispatch("removeSalaryList");
    };
    return {
      salaryList,
      vacationList,
      onAddSalary,
      onAddVacation,
      onClearCalendarData,
      onClearVacation,
      onClearSalary,
      monthEnum
    };
  }
};
</script>
