<template>
  <div class="flex w-full justify-between items-end">
    <div class="flex items-center flex-col">
      <pl-percent-sum :total="expectPay" :current="payment" />
      <h2 class="text-base-weak text-2xl font-bold leading-tight">
        {{ payment }} ₽
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
