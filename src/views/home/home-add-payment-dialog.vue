<template>
  <pl-dialog getter-name="showAddPaymentModal" action-name="setAddPaymentModal">
    <template #content="{ close }">
      <form class="space-y-2 flex flex-col w-48" @submit.prevent>
        <label class="block text-gray-100 text-sm font-bold mb-2" for="salary">
          Введи сумму, что пришла
        </label>
        <input
          id="salary"
          type="number"
          v-model.number="salary"
          placeholder="сумма"
          class="
            shadow
            appearance-none
            border
            rounded
            w-full
            py-2
            px-3
            text-gray-100
            leading-tight
            focus:outline-none focus:shadow-outline
          "
        />
        <button
          class="rounded bg-slate-400 py-1 px-2 text-white ml-auto"
          @click="onAdd($event, close, salary)"
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
    const month = ref({});
    let salary = 0;

    const onAdd = ($event, close, sum) => {
      close($event, sum);
      salary = 0;
    }
    return {
      month,
      salary,
      onAdd
    };
  }
};
</script>
