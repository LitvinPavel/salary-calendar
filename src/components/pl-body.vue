<template>
  <tbody>
    <tr v-for="(week, weekIdx) in datesArr" :key="`week${weekIdx}`">
      <td
        v-for="({ isCurrent, day, isWorkDay }, dIdx) in week"
        :key="`d${dIdx}`"
        class="pt-6"
      >
        <div class="w-full h-full">
          <div
            class="flex w-full justify-center items-center rounded-full"
          >
            <button
              class="
                text-base
                w-8
                h-8
                flex
                items-center
                justify-center
                font-medium
                rounded-full
              "
              :class="[{
                'bg-indigo-700': day === date && isCurrent && isWorkDay,
                'opacity-20': !isCurrent,
                'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500':
                  (isCurrent && isWorkDay)
              }, isWorkDay ? 'text-gray-500 dark:text-gray-100' : 'text-red-200']"
              @click="onSelect(isCurrent, isWorkDay, day)"
            >
              {{ day }}
            </button>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
  <!-- <td class="pt-6">
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center"></div>
      </td>
      <td class="pt-6">
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            1
          </p>
        </div>
      </td>
      <td class="pt-6">
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            2
          </p>
        </div>
      </td>
      <td class="pt-6">
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100">3</p>
        </div>
      </td>
      <td class="pt-6">
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100">4</p>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            5
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            6
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            7
          </p>
        </div>
      </td>
      <td>
        <div class="w-full h-full">
          <div
            class="
              flex
              items-center
              justify-center
              w-full
              rounded-full
              cursor-pointer
            "
          >
            <a
              role="link"
              tabindex="0"
              class="
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-700
                focus:bg-indigo-500
                hover:bg-indigo-500
                text-base
                w-8
                h-8
                flex
                items-center
                justify-center
                font-medium
                text-white
                bg-indigo-700
                rounded-full
              "
              >8</a
            >
          </div>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            9
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100">10</p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100">11</p>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            12
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            13
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            14
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            15
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            16
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100">17</p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100">18</p>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            19
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            20
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            21
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            22
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            23
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100">24</p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100">25</p>
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            26
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            27
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            28
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            29
          </p>
        </div>
      </td>
      <td>
        <div class="px-2 py-2 cursor-pointer flex w-full justify-center">
          <p class="text-base text-gray-500 dark:text-gray-100 font-medium">
            30
          </p>
        </div>
      </td> -->
</template>

<script>
import { chunk } from "lodash";
export default {
  name: "pl-body",
  props: {
    date: {
      type: [Number, String],
      default: null
    },
    month: {
      type: [Number, String],
      default: null
    },
    year: {
      type: [Number, String],
      default: null
    },
    calendarDate: {
      type: [String, Array],
      default: () => []
    }
  },
  computed: {
    datesArr() {
      return this.getDates();
    }
  },
  methods: {
    getDates() {
      const arr = [];
      const time = new Date(this.year, this.month);
      time.setDate(0);
      const lastMonthLength = ((time.getDay() + 7 - 1) % 7) + 1;
      const lastMonthfirst = time.getDate() - (lastMonthLength - 1);

      for (let i = 0; i < lastMonthLength; i++) {
        arr.push({ isCurrent: false, day: lastMonthfirst + i });
      }

      time.setMonth(time.getMonth() + 2, 0);
      const curMonthLength = time.getDate();

      for (let i = 0; i < curMonthLength; i++) {
        arr.push({ isCurrent: true, day: 1 + i, isWorkDay: +this.calendarDate[i] === 0 });
      }

      time.setMonth(time.getMonth() + 1, 1);
      const nextMonthLength = 42 - (lastMonthLength + curMonthLength);

      for (let i = 0; i < nextMonthLength; i++) {
        arr.push({ isCurrent: false, day: 1 + i });
      }
      return chunk(arr, 7);
    },
    onSelect(isCurrent, isWorkDay, day) {
      if (isCurrent && isWorkDay) {
        this.$emit("select", day);
      }
    }
  }
};
</script>
