<template>
  <div>
    <button
      class="rounded bg-slate-400 py-1 px-2 text-white"
      @click="active = true"
    >
      {{ title }}
    </button>
    <transition name="animodal">
      <div class="fixed inset-0 z-20" v-if="active">
        <div
          class="absolute inset-0 bg-black bg-opacity-75"
          @click="destroy"
        ></div>
        <div
          class="flex flex-col items-center justify-center w-screen h-screen"
        >
          <div class="relative animodal-inner">
            <div class="rounded bg-white dark:bg-gray-800 overflow-hidden p-4">
              <slot name="content" :close="destroy" />
            </div>
          </div>
        </div>
        <div
          class="animodal-inner absolute top-0 right-0 cursor-pointer"
          @click="destroy"
        >
          <div class="text-white text-lg p-6">Х</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Открыть"
    }
  },
  data() {
    return {
      active: false
    };
  },
  methods: {
    destroy() {
      this.active = false;
    }
  }
};
</script>
