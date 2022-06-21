<template>
  <div>
    <label>{{ this.label }}</label>
    <textarea
      class="appearance-none block text-lg w-full h-24 bg-transparent mt-4 pb-2 border-b border-gray-500 focus:outline-none focus:border-white placeholder-gray-500"
      :name="this.name"
      :placeholder="this.placeholder"
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
  name: "Textarea",
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
