<template>
  <myScroll>
    <div>
      <h1>关于我</h1>
      <ul>
        <li v-for="user in users" :key="user.index">{{ user }}</li>
      </ul>
    </div>
  </myScroll>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      users: [
        "hello",
        "lamda",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn",
        "hello",
        "lamda",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn",
        "learn"
      ]
    };
  }
};
</script>

<style>
h1 {
  color: skyblue;
}
</style>
