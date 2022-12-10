<script setup>
  import { ref } from 'vue'

  defineProps({
    student: Object
  })

  const reports = ref([])

  function maxLvl (student){
    return student.absences < 10 ? Math.floor(student.absences/3) : 3
  }

  async function createLetter(student, lvl) {
    await setTimeout(()=> {console.log('create letter '+lvl)}, 599)
    fetchStudentReports(student)
  }

  function fetchStudentReports(student) {
    setTimeout(() => {reports.value = [{title: student.first_name+' report', id: '2234', url:"https://example.com"}]}, 499)
    console.log(reports.value)
  }

</script>

<template>
  <li class="student-item">
    <div>
      <span>Name: {{student.first_name}} {{student.last_name}}</span>
      <span>Absences: {{student.absences}}</span>
      <span>Absent Dates: {{student.absent_dates}}</span>
      <button v-for="lvl in maxLvl(student)" @click="()=>{createLetter(student, lvl)}">Create Level {{lvl}}</button>
    </div>
    <div class="reports">
      <ul>
        <li v-for="report in reports" :key="report.id">
          <a :href="report.url">{{report.title}}</a>
        </li>
      </ul>
    </div>
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
</style>
