export default {
  name: 'RouterView',
  render(h) {
    // 在vnode中标记router-view
    this.$vnode.data.routerView = true;
    // 计算router-view深度
    let depth = 0;
    let parent = this.$parent;
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data;
      if (vnodeData && vnodeData.routerView) {
        // 说明父级存在一个router-view了，需要增加层级深度
        // eslint-disable-next-line no-plusplus
        depth++;
      }

      parent = parent.$parent;
    }

    const { matchedRoutes } = this.$router;
    const matchedRoute = matchedRoutes && matchedRoutes[depth];

    // 更新当前路由信息
    if (matchedRoute) {
      const route = matchedRoute.$$route;
      // 修改$route信息
      Object.keys(route || []).forEach((key) => {
        this.$route[key] = route[key];
      });
    }

    return h((matchedRoute && matchedRoute.component) || null);
  },
};
