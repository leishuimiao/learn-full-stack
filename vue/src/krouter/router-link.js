export default {
  name: 'RouterLink',
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  // vue-runtime版本不包含编译器
  // template: `
  //   <a href="#/${this.to}"><slot></slot></a>
  // `,
  render(h) {
    const { to } = this;
    const { path } = this.$route;
    return h(
      'a',
      {
        attrs: {
          href: `#${to}`,
        },
        class: {
          'router-link-exact-active': (to === '/' && path === to) ? true : path.startsWith(to) && to !== '/',
        },
      },
      this.$slots.default,
    );
  },
};
