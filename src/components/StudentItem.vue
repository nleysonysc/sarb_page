<script setup>
  import StudentReports from './StudentReports.vue'
  import CreateButton from './CreateButton.vue'
  import { ref, toRefs } from 'vue'
  import { useStudentsStore } from '../stores/students.js'

  const studentStore = useStudentsStore()

  const props = defineProps({
    student: Object
  })

  const { student } = toRefs(props)
  studentStore.fetchStudentReportsById(student.value.id)

  function maxLvl (){
    return student.value.days_absent < 10 ? Math.floor(student.value.days_absent/3) : 3
  }

</script>

<template>
  <li class="student-item">
    <div class="student-options">
      <span>Name: {{student.first_name}} {{student.last_name}} (Grade {{student.grade}})</span>
      <span>DOB: {{student.dob}}</span>
      <span>Guardian Name: {{student.guardian_fname}} {{student.guardian_lname}} ({{student.guardian_email}})</span>
      <span>Absences: {{student.days_absent}}</span>
      <span>Absent Dates: {{student.absent_dates}}</span>
      <span>Percent Absent: {{student.percent_absent}}%</span>
      <span v-if="student.excused_days_absent">Exused Absences: {{student.grade}}</span>
      <span v-if="student.excused_absent_dates">Exused Absent Dates: {{student.excused_absent_dates}}</span>
      <span v-if="student.tardies">Tardies: {{student.tardies}}</span>
      <span v-if="student.tardy_dates">Tardy Dates: {{student.tardy_dates}}</span>
      <CreateButton v-for="lvl in maxLvl()" :student="student" :level="lvl"></CreateButton>
    </div>
    <StudentReports :studentReports="student.reports" />
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
