<template>
  <div>
    <div>j
      ust a est page
      <router-link to="/">home</router-link>
    </div>
    <div><h2>{{mode}}</h2></div>
    <div><span>{{count}}</span></div>
    <div><button @click="count++">+1</button></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      mode: process.env.VUE_ENV === 'server' ? 'server' : 'client',
      count: 2
    }
  }
}
</script>
