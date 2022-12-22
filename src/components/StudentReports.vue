<script setup>
  defineProps({
    studentReports: Array
  })

</script>

<template>
  <div class="reports">
      <h3>Previous Letters</h3>
      <ul>
        <li v-for="report in studentReports" :key="report.key">
          <a :href="report.url" target="_blank">{{report.title}}</a>
          <sup v-if="report.sentOn">Sent On: {{report.sentOn}}</sup>
        </li>
      </ul>
    </div>
</template>

<style scoped>
  h3 {
    margin: 0;
    padding: 0;
    font-size: 1.1em;
  }
  
</style>
