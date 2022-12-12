<script setup>
  import StudentReports from './StudentReports.vue'
  import { ref, onMounted, toRefs } from 'vue'

  const props = defineProps({
    student: Object
  })

  const { student } = toRefs(props)

  const reports = ref([])

  function maxLvl (){
    return student.value.absences < 10 ? Math.floor(student.value.absences/3) : 3
  }

  async function createLetter(lvl) {
    await setTimeout(()=> {console.log('create letter '+lvl)}, 599)
    fetchStudentReports(student.value)
  }

  async function fetchStudentReports() {
    setTimeout(() => {reports.value = [{title: student.value.first_name+' report', id: '2234', url:"https://example.com"}]}, 499)
  }

  fetchStudentReports(student.value)

</script>

<template>
  <li class="student-item">
    <div class="student-options">
      <span>Name: {{student.first_name}} {{student.last_name}}</span>
      <span>Absences: {{student.absences}}</span>
      <span>Absent Dates: {{student.absent_dates}}</span>
      <button v-for="lvl in maxLvl()" @click="()=>{createLetter(lvl)}">Create Level {{lvl}}</button>
    </div>
    <StudentReports :studentReports="reports" />
  </li>
</template>

<style scoped>
  li.student-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
  }

  li:nth-child(even) {
    background-color: #dfdfdf;
  }

  button {
    max-width: 25%;
  }

  li > div.student-options {
    display:grid;
  }

  span:first-child {
    font-weight: bold;
  }
</style>
