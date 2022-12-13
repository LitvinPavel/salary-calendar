<template>
  <pl-dialog getter-name="showVacationModal" action-name="setVacationModal">
    <template #content="{ close }">
      <form class="space-y-2 flex flex-col" @submit.prevent>
        <label
          class="block text-gray-100 text-sm font-bold mb-2"
          for="vacationDays"
        >
          Укажи даты
        </label>
        <vue-datepicker v-model="vacationDays" dark multiDates :enableTimePicker="false">
          <template #action-preview> </template>
        </vue-datepicker>
        <button
          class="rounded bg-slate-400 py-1 px-2 text-white ml-auto"
          @click="onAdd($event, close, vacationDays)"
        >
          Добавить
        </button>
      </form>
    </template>
  </pl-dialog>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const vacationDays = ref([]);

    const onAdd = ($event, close, v) => {
      close($event, { data: v });
    };
    return {
      vacationDays,
      onAdd
    };
  }
};
</script>
