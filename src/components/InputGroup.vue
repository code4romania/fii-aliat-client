<script>
import { h } from "vue";

export default {
  name: "InputGroup",
  render() {
    return h(
        "div",
        {
          class: 'mb-7 ' + (!this.fullWidth ? 'grid gap-4 sm:gap-8 sm:grid-cols-4': '')
        },
        this.$slots.default()
    );
  },
  props: {
    fullWidth: {
      type: Boolean
    }
  }
};
</script>
