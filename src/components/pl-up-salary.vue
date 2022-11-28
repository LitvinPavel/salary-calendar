<template>
  <pl-modal title="+ Изменение ЗП">
    <template #content="{ close }">
      <form class="space-y-2 flex flex-col" @submit.prevent>
        <label class="block text-gray-100 text-sm font-bold mb-2" for="salary">
          Введи сумму
        </label>
        <input 
          id="salary"
          type="number"
          v-model.number="salary"
          placeholder="зепка"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label class="block text-gray-100 text-sm font-bold mb-2" for="salary">
          Укажи месяца
        </label>
        <Datepicker
          v-model="month"
          dark
          monthPicker
          autoApply
        />
        <button class="rounded bg-slate-400 py-1 px-2 text-white ml-auto" @click="onAdd(close)">Добавить</button>
      </form>
    </template>
  </pl-modal>
</template>

<script>
export default {
  data() {
    return {
      month: {},
      salary: 0
    }
  },
  methods: {
    onAdd(close) {
      if (Object.keys(this.month).length && this.salary) {
        this.$emit("add", { ...this.month, salary: this.salary });
        close();
      }
    }
  }
};
</script>
