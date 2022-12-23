<template>
  <div class="flex w-full justify-between items-end">
    <div class="flex flex-col space-y-3">
      <div class="flex items-center space-x-2">
        <pl-percent-sum :total="expectPay" :current="payment" />
        <span v-if="payment > expectPay" class="text-warning">+ {{ (payment - expectPay).toFixed(2) }} ₽</span>
        <span v-else-if="payment < expectPay" class="text-accent">- {{ (expectPay - payment).toFixed(2) }} ₽</span>
      </div>
      <h2 class="text-base-weak leading-tight">
        <span class="text-2xl font-bold">{{ payment }} ₽</span>
        
      </h2>
    </div>
    <pl-btn-icon icon-name="plus" size="l" class="rounded-full bg-primary" @click="onAdd" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "home-item-payment",
  props: {
    expectPay: {
      type: Number,
      default: 0
    },
    year: {
      type: [Number, String],
      default: null
    },
    month: {
      type: [Number, String],
      default: null
    },
    type: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const store = useStore();
    const payment = computed(() => {
      const payments = store.getters.payments;
      const pay = payments?.[props.type] || []
      return pay.length
        ? pay.reduce((acc, curr) => acc + curr, 0)
        : 0;
    });
    const onAdd = () => {
      store.dispatch("setAddPaymentModal", { show: true, type: props.type });
    }
    return {
      payment,
      onAdd
    };
  }
};
</script>
