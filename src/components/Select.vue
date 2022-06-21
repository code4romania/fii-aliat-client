<template>
  <div>
    <label>{{ this.label }}</label>
    <select
      :name="this.name"
      :disabled="this.disabled"
      v-model="this.value"
      class="mt-1 block w-full bg-black pr-10 py-4 text-lg border-b border-gray-500 focus:outline-none"
    >
      <option :value="0">{{this.placeholder}}</option>
      <option v-for="(option) in this.options" :value="option.name" v-bind:key="'option-' + this.name + '-' + option.id">
        {{ option.name }}
      </option>
    </select>
    <FormError
      v-for="(message, index) in error"
      v-bind:key="'error-' + index"
    >{{ message }}</FormError>
  </div>
</template>

<script>
import FormError from './FormError';

export default {
  name: "Select",
  components: {
    FormError
  },
  props: {
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array,
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
    selectedIndex: {
      type: Number,
      required: true,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
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
