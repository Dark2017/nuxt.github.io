<template>
  <div>
    <p>hello! zhihui, this demo is for you</p> 
    <p>when you click </p>
    <p>this count will +1</p>
    <p>{{ clickNum }}</p>
    <el-button @click="clickEvent">click</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      clickNum: 0
    }
  },
  methods: {
    clickEvent() {
      this.clickNum ++
    }
  },
}
</script>
