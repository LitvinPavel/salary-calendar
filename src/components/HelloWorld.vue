<template>
  <main class="text-3xl font-bold underline">
    {{ calendarData }}
  </main>
</template>

<script>
import { getCalendar } from "../api/calendar.js";

export default {
  name: 'HelloWorld',
  data() {
    return {
      calendarData: []
    }
  },
  async created() {
    await this.fetchCalendar();
  },
  methods: {
    async fetchCalendar() {
      try {
        const currentYear = new Date().getFullYear();
        const data = await getCalendar(currentYear);
        this.calendarData = data;
      } catch (e) {
        console.error(e);
      }
    },
  }
}
</script>
