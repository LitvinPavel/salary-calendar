import { getStorage, saveStorage, clearStorage } from "@/api/storage";
import STORAGE_KEYS from "@/utils/enum/storage-keys";

function last(arr, curr) {
  let count = 1
  arr.reduce((sum, current) => {
    if (+curr >= +current) {
      return +sum > +current ? sum : current
    } else {
      count++
      return +sum < +current ? current : sum
    }
    
  }, curr)
  return arr[arr.length - count] || arr[0];
}

export default {
  state: () => ({
    salaryList: {},
    vacationList: {},
    upSalaryModal: false,
    vacationModal: false
  }),
  getters: {
    lastSalary(state, getter, rootState) {
      let lastSalary = 0;
      const salaryKeys = Object.keys(state.salaryList) || [];
      if (salaryKeys.length && rootState.home.year) {
        const year = last(salaryKeys, rootState.home.year);

        const monthToSearch = salaryKeys.includes(`${rootState.home.year}`)
          ? rootState.home.month
          : rootState.home.year > year ? 11 : 0;
        
        const month = last(Object.keys(state.salaryList[year]), monthToSearch);
        lastSalary = state.salaryList[year][month];
      }
      
      return lastSalary;
    },
    showUpSalaryModal(state) {
      return state.upSalaryModal;
    },
    showVacationModal(state) {
      return state.vacationModal;
    },
    salaryList(state) {
      return state.salaryList;
    },
    vacationList(state) {
      return state.vacationList;
    }
  },
  mutations: {
    setUpSalaryModal(state, { show, sum }) {
      state.upSalaryModal = show;
      if (sum) {
        const { data, salary } = sum;
        if (state.salaryList[data.year]) {
          state.salaryList[data.year][data.month] = salary
        } else {
          state.salaryList[data.year] = {
            [data.month]: salary
          }
        }
        saveStorage(STORAGE_KEYS.SALARY, state.salaryList)
      }
    },
    setVacationModal(state, { data, show }) {
      state.vacationModal = show;
      if (data && data.length) {
        data.forEach(d => {
          let year = d.getFullYear();
          let month = d.getMonth();
          let date = d.getDate();
          if (!state.vacationList?.[year]) {
            state.vacationList[year] = {}
          } else if (!state.vacationList?.[year]?.[month]) {
            state.vacationList[year][month] = {}
          } else if (!state.vacationList?.[year]?.[month]?.vacation) {
            state.vacationList[year][month].vacation = [ date ]
          } else {
            let arr = [
              ...state.vacationList[year][month].vacation,
              date
            ]
            state.vacationList[year][month].vacation = [...new Set(arr)].sort(( a, b ) =>  a - b)
          }
        })
        saveStorage(STORAGE_KEYS.VACATION, state.vacationList)
      }
    },
  },
  actions: {
    setUpSalaryModal({ commit }, payment) {
      commit('setUpSalaryModal', payment );
    },
    setVacationModal({ commit }, { show, sum }) {
      const { data } = sum || {};
      commit('setVacationModal', { data, show } );
    },
    async initSalaryList({ state }) {
      try {
        const data = await getStorage(STORAGE_KEYS.SALARY);
        state.salaryList = data || {};
      } catch (error) {
        console.log(error);
      }
    },
    async initVacationList({ state }) {
      try {
        const data = await getStorage(STORAGE_KEYS.VACATION);
        state.vacationList = data || {};
      } catch (error) {
        console.log(error);
      }
    },
    async removeVacationList({ state }) {
      try {
        await clearStorage(STORAGE_KEYS.VACATION);
        state.vacationList = {};
      } catch (error) {
        console.log(error);
      }
    },
    async removeSalaryList({ state }) {
      try {
        await clearStorage(STORAGE_KEYS.SALARY);
        state.salaryList = {};
      } catch (error) {
        console.log(error);
      }
    },
  },
}