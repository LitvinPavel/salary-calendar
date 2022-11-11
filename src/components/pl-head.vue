<template>
  <thead>
    <tr>
      <th v-for="(day, index) in days" :key="index">
        <div class="w-full flex justify-center">
          <p
            class="
              text-base
              font-medium
              text-center text-gray-800
              dark:text-gray-100
            "
          >
            {{ day }}
          </p>
        </div>
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: "pl-calendar-head",
  data() {
    return {
      days:['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    }
  }
};
</script>
