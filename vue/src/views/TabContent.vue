<template>
  <div>
    <div>Tab标签内容 - {{id}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
    };
  },
};
</script>
