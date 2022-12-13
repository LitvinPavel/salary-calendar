<template>
  <transition name="animodal">
    <div class="fixed inset-0 z-20" v-if="active">
      <div
        class="absolute inset-0"
        style="background-color: var(--modal-bg);"
        @click="onClose"
      ></div>
      <div class="flex flex-col items-center justify-center w-screen h-screen">
        <div class="relative animodal-inner">
          <div class="rounded bg-secondary-strong overflow-hidden p-4">
            <slot name="content" :close="onClose" />
          </div>
        </div>
      </div>
      <div
        class="animodal-inner absolute top-0 right-0 cursor-pointer"
        @click="onClose"
      >
        <div class="text-white text-lg p-6">Х</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    getterName: {
      type: String,
      default: null
    },
    actionName: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const store = useStore();
    const active = computed(() => {
      return props.getterName ? store.getters[props.getterName] : false;
    });
    const onClose = (_, sum) => {
      store.dispatch(props.actionName, { show: false, sum });
    }
    return {
      active,
      onClose
    };
  }
};
</script>
