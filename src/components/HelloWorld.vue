<template>
  <main>
    <div class="flex items-center justify-center py-8 px-4">
      <div class="max-w-sm w-full shadow-lg">
        <div class="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t">
          <PlSummary
            :year="currentYear"
            :month="currentMonth"
            class="mb-4 pb-4 border-b"
          />
          <PlMonth
            :month="currentMonth"
            :year="currentYear"
            @select="currentMonth = $event"
            @changeYear="currentYear = $event"
          />
          <div class="flex items-center justify-between pt-12 overflow-x-auto">
            <table class="w-full">
              <PlHead />
              <PlBody
                :date="currentDate"
                :year="currentYear"
                :month="currentMonth"
                :calendar-date="calendarData"
                @select="currentDate = $event"
              />
            </table>
          </div>
        </div>
        <div
          class="
            md:py-8
            py-5
            md:px-16
            px-5
            dark:bg-gray-700
            bg-gray-50
            rounded-b
          "
        >
          <PlContent
            :year="currentYear"
            :month="currentMonth"
            :day="currentDate"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { getCalendar } from "../api/calendar.js";
import PlBody from "./pl-body.vue";
import PlContent from "./pl-content.vue";
import PlHead from "./pl-head.vue";
import PlMonth from "./pl-month.vue";
import PlSummary from "./pl-summary.vue";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1];

export default {
  name: "HelloWorld",
  data() {
    return {
      calendarData: "",
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      currentDate: new Date().getDate()
    };
  },
  async created() {
    await this.fetchCalendar();
  },
  watch: {
    currentMonth() {
      this.fetchCalendar();
    }
  },
  methods: {
    async fetchCalendar() {
      try {
        const data = await getCalendar(
          this.currentYear,
          months[this.currentMonth]
        );
        this.calendarData = data;
      } catch (e) {
        console.error(e);
      }
    }
  },
  components: { PlMonth, PlHead, PlBody, PlContent, PlSummary }
};
</script>
