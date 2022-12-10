import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStudentsStore = defineStore('students', () => {
  const students = ref([])

  function populateList(sarbStudents){
    students.value = sarbStudents
  }
  
  async function fetchStudents() {
    // google.script.run.withSuccessHandler(populateList).sarbStudents();
    await setTimeout(() => {
      populateList(
        [
          {id: '12', first_name: 'fname', last_name: 'lname', absences: '3', absent_dates: '04-13-22,03-13-22', guardian_email: 'email@example.com'},
          {id: '14', first_name: 'dor', last_name: 'mag', absences: '6', absent_dates: '04-26-22,03-17-22', guardian_email: 'email@example.com'},
          {id: '13', first_name: 'frog', last_name: 'legs', absences: '9', absent_dates: '06-14-22,07-16-22', guardian_email: 'email@example.com'},
          {id: '15', first_name: 'krom', last_name: 'well', absences: '12', absent_dates: '06-14-22,07-16-22', guardian_email: 'email@example.com'},
        ]
      )}, 400)
  }

  return { students, fetchStudents }
})
