<script setup>
  defineProps({
    studentReports: Array
  })

</script>

<template>
  <div class="reports">
      <h3>Previous Letters</h3>
      <ul>
        <li v-for="report in studentReports" :key="report.id">
          <a :href="report.url">{{report.title}}</a>
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
