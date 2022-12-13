<template>
  <section>
    <slot name="nav" />
    <swiper
      :navigation="{
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      }"
      :modules="modules"
      :loop="isLoop"
      class="w-full h-full"
      @slideChange="$emit('slide-change', $event)"
    >
      <swiper-slide v-for="(item, index) in items" :key="index">
        <slot name="slide" :item="item" />
      </swiper-slide>
    </swiper>
  </section>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from 'swiper';
import "swiper/css";

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    isLoop: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
};
</script>