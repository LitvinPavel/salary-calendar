import { getCalendar } from "@/api/calendar";
import { getStorage, saveStorage, clearStorage } from "@/api/storage";
import STORAGE_KEYS from "@/utils/enum/storage-keys";

export default {
  state: () => ({
    calendarData: {},
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    payCurrentType: null,
    addPaymentModal: false
  }),
  getters: {
    currentData(state) {
      return state.calendarData?.[state.year]?.[state.month] || {};
    },
    currentYear(state) {
      return state.year;
    },
    currentMonth(state) {
      return state.month;
    },
    showAddPaymentModal(state) {
      return state.addPaymentModal;
    },
    payments(state) {
      return state.calendarData?.[state.year]?.[state.month]?.payment || {};
    }
  },
  mutations: {
    setCalendarData(state, data) {
      state.calendarData = { ...state.calendarData, ...data };
      saveStorage(STORAGE_KEYS.CALENDAR_DATA, state.calendarData);
    },
    setYear(state, data) {
      state.year = data;
    },
    setMonth(state, data) {
      state.month = data;
    },
    setAddPaymentModal(state, { show, sum, type }) {
      state.addPaymentModal = show;
      if (type) {
        state.payCurrentType = type;
      }
      if (sum) {
        const { calendarData, year, month, payCurrentType } = state;
        if (!calendarData[year][month].payment) {
          state.calendarData[year][month].payment = {
            [payCurrentType]: [sum]
          }
        } else if (!calendarData[year][month].payment[payCurrentType]) {
          state.calendarData[year][month].payment[payCurrentType] = [sum]
        } else {
          state.calendarData[year][month].payment[payCurrentType].push(sum)
        }
        saveStorage(STORAGE_KEYS.CALENDAR_DATA, state.calendarData)
      }
    },
  },
  actions: {
    async fetchData({ state, commit }) {
      try {
        const { year, months } = await getCalendar(state.year);
        commit('setCalendarData', { [year]: months })
      } catch (e) {
        console.error(e);
      }
    },
    async initCalendarData({ state, commit, dispatch }) {
      try {
        const data = await getStorage(STORAGE_KEYS.CALENDAR_DATA);
        commit('setCalendarData', data);
        if (!data[state.year]) {
          dispatch("fetchData");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async clearCalendarData({ dispatch }) {
      try {
        await clearStorage(STORAGE_KEYS.CALENDAR_DATA);
        dispatch("fetchData");
      } catch (error) {
        console.log(error);
      }
    },
    prevMonth({ state, dispatch, commit }) {
      let newYear = state.year;
      if (state.month === 0) {
        newYear = state.year - 1;
        commit('setYear', newYear );
        if (!state.calendarData[newYear]) {
          dispatch("fetchData")
        }
      }
      commit('setMonth', state.month > 0 ? state.month - 1 : 11);
    },
    nextMonth({ state, dispatch, commit }) {
      let newYear = state.year;
      if (state.month === 11) {
        newYear = state.year + 1;
        commit('setYear', newYear );
        if (!state.calendarData[newYear]) {
          dispatch("fetchData")
        }
      }
      commit('setMonth', state.month < 11 ? state.month + 1 : 0);
    },
    setAddPaymentModal({ commit }, payload) {
      commit('setAddPaymentModal', payload );
    }
  },
}