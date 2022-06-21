<template>
  <div>
    <label>{{ this.label }}</label>
    <input
      :type="this.type"
      :class="this.class"
      :name="this.name"
      :min="this.min"
      :max="this.max"
      :step="this.step"
      :placeholder="this.placeholder"
      :disabled="this.disabled"
      v-model="this.value"
    />
    <FormError
      v-for="(message, index) in error"
      v-bind:key="'error-' + index"
    >{{ message }}</FormError>
  </div>
</template>

<script>
import FormError from './FormError';

export default {
  name: "Input",
  components: {
    FormError
  },
  props: {
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: String
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: "text"
    },
    min: {
      type: String
    },
    max: {
      type: String
    },
    step: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    error: {
      type: Array
    }
  },
  emits: ["update:modelValue"],
  computed: {
    class() {
      const className = 'appearance-none block text-lg w-full bg-transparent mt-4 pb-2 border-b border-gray-500 focus:outline-none focus:border-white placeholder-gray-500';
      const disabledClassName = 'opacity-50 cursor-not-allowed';
      return this.disabled ? `${className} ${disabledClassName}`: className;
    },
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
