<template>
  <component
    :is="tagName"
    class="
      text-secondary-weak
      transition
      duration-300
      ease-in-out
      select-none
      hover:text-base-weak
      focus:outline-none
      focus-visible:outline-none
    "
  >
    <component :is="`pl-${iconName}-icon`" :class="iconSize" />
    <slot />
  </component>
</template>

<script>
import propEnumValidator from "@/utils/prop-enum-validator";

const iconSizeEnum = Object.freeze({
  SMALL: "s",
  MEDIUM: "m",
  LARGE: "l"
});

const sizeClasses = {
  [iconSizeEnum.SMALL]: "w-4 h-4",
  [iconSizeEnum.MEDIUM]: "w-6 h-6",
  [iconSizeEnum.LARGE]: "w-8 h-8"
};

export default {
  name: "pl-btn-icon",
  props: {
    tagName: {
      type: String,
      default: "button"
    },
    iconName: {
      type: String,
      require: true
    },
    size: {
      type: String,
      default: iconSizeEnum.MEDIUM,
      validator: propEnumValidator(Object.values(iconSizeEnum))
    }
  },
  computed: {
    iconSize() {
      return sizeClasses[this.size];
    }
  }
};
</script>
