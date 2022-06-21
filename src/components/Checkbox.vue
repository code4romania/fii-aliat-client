<template>
  <div class="relative flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="name"
        :name="name"
        type="checkbox"
        class="focus:ring-white h-4 w-4 text-white border-gray-300 rounded"
        v-model="this.value"
      >
    </div>
    <div class="ml-3 text-base">
      <label :for="name" class="font-medium gray">
        <slot></slot>
      </label>
    </div>
  </div>
  <FormError
    v-for="(message, index) in error"
    v-bind:key="'error-' + index"
  >{{ message }}</FormError>
</template>

<script>
import FormError from './FormError';
export default {
  name: "Checkbox",
  components: {
    FormError
  },
  props: {
    name: {
      type: String
    },
    modelValue: {
      type: Boolean
    },
    error: {
      type: Array
    }
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    }
  }
};
</script>
