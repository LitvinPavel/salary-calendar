<template>
  <li
    class="
      rounded-lg
      px-5
      pt-5
      mb-1
      bg-secondary-strong
      relative
      transform
      transition-all
      duration-300
      flex flex-col
    "
    :class="{ 'pb-5': visible }"
  >
    <div
      class="pb-5 border-secondary-weak"
      :class="{ 'border-b mb-5': visible }"
    >
      <slot name="accordion-trigger"></slot>
    </div>
    <transition
      name="accordion"
      @enter="start"
      @after-enter="end"
      @before-leave="start"
      @after-leave="end"
    >
      <div v-show="visible">
        <slot name="accordion-content"></slot>
      </div>
    </transition>
    <div class="absolute bottom-0 pl-align-x flex justify-center items-end">
      <div class="p-4 -mb-3" @click="open">
        <pl-chevron-down-icon
          class="w-4 h-4 transform transition-all duration-700 origin-center"
          :class="{ 'rotate-180': visible }"
        />
      </div>
    </div>
  </li>
</template>


<script>
export default {
  props: {},
  inject: ["Accordion"],
  data() {
    return {
      index: null
    };
  },
  computed: {
    visible() {
      return this.index == this.Accordion.active;
    }
  },
  methods: {
    open() {
      if (this.visible) {
        this.Accordion.active = null;
      } else {
        this.Accordion.active = this.index;
      }
    },
    start(el) {
      el.style.height = el.scrollHeight + "px";
    },
    end(el) {
      el.style.height = "";
    }
  },
  created() {
    this.index = this.Accordion.count++;
  }
};
</script>
