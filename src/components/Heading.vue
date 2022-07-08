<script>
    import { h } from 'vue';

    const fontSize = (level) => {
      if (level === 1) {
        return 'font-light text-5xl';
      } else if (level === 2) {
        return 'text-3xl';
      }
    };
    export default {
      name: 'Heading',
      render() {
        return h(
          'h' + this.level, // tag name
          {
            class:
              'relative inline-block leading-tight  my-5 py-3' +
              fontSize(this.level),
          }, // props/attributes
          this.$slots.default() // array of children
        );
      },
      props: {
        level: {
          type: Number,
          required: true,
        },
      },
    };
</script>
