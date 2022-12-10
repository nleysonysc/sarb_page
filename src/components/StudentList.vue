<script setup>
  import { useStudentsStore } from '../stores/students.js'
  import StudentItem from './StudentItem.vue'

  const studentStore = useStudentsStore()
  studentStore.fetchStudents()

</script>

<template>
  <ul class="student-list">
    <StudentItem v-for="student in studentStore.students" :key="student.id" :student="student" />
  </ul>
</template>

<style scoped>
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
  }
</style>
