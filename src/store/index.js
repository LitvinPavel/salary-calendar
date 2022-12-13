import { createStore } from 'vuex'
import home from "@/store/home";
import setting from "@/store/setting";


export default createStore({
  modules: {
    home,
    setting
  }
})
