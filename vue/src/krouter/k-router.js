import UrlPattern from 'url-pattern';
import RouterLink from './router-link';
import RouterView from './router-view';

/**
 * 自定义 Vue 路由
 */
let Vue;
export default class KRouter {
  // 实现静态插件方法
  static install(_Vue) {
    Vue = _Vue;

    // 拿到Vue实例，并扩充$router属性
    Vue.mixin({
      beforeCreate() {
        // this为组件实例
        // krouter源自入口文件，new Vue参数中的krouter
        const { krouter } = this.$options;
        if (krouter) {
          Vue.prototype.$router = krouter;
          Vue.prototype.$route = krouter.$$route;
        }
      },
    });

    // 注册全局组件router-link
    Vue.component('router-link', RouterLink);

    // 注册全局组件router-view
    Vue.component('router-view', RouterView);
  }

  constructor(options) {
    // 保存options数据内容
    this.$options = options;

    this.$$route = this.getRouteInfo();

    this.watchUrlChange();

    // 给当前路由添加响应式
    Vue.util.defineReactive(this, 'current', this.$$route.path);
    // 给匹配到的 Routes 添加响应式
    Vue.util.defineReactive(this, 'matchedRoutes', []);
    this.match();
  }

  getRouteInfo() {
    const { hash, href } = window.location;
    const path = hash.slice(1) || '/';
    return {
      path,
      hash,
      fullPath: href,
      params: {},
    };
  }

  // 监听url变化
  watchUrlChange() {
    window.addEventListener('hashchange', () => {
      this.$$route = this.getRouteInfo();
      this.current = this.$$route.path;
      // 重置已匹配Routes
      this.matchedRoutes = [];
      this.match();
    });
  }

  // 设置并递归匹配的路由表
  match(routes) {
    const rs = routes || this.$options.routes;
    // eslint-disable-next-line no-restricted-syntax
    for (const route of rs) {
      const { path } = route;
      const { path: currentPath } = this.$$route;
      // 根层级路由
      if (path === '/' && currentPath === '/') {
        route.$$route = { ...this.$$route };
        this.matchedRoutes.push(route);
        return;
      }

      // 判断包含参数的情况
      const matchedParams = new UrlPattern(path).match(currentPath);
      if (path !== '/' && (currentPath.startsWith(path) || matchedParams)) {
        // 添加参数
        route.$$route = { ...this.$$route, params: matchedParams || {} };
        this.matchedRoutes.push(route);
        // 递归调用处理子路由
        const { children } = route;
        if (children && children.length > 0) {
          this.match(children);
        }
        return;
      }
    }
  }

  push(path) {
    window.location.hash = path;
  }
}
