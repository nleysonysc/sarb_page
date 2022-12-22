import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useStudentsStore = defineStore('students', () => {
  const students = ref([])

  function populateList(sarbStudents){
    students.value = sarbStudents
  }
  
  async function createLetter(student, lvl) {
    google.script.run.withSuccessHandler(()=>{fetchStudentReportsById(student.id)}).createLetter(student, lvl);
  }

  function setStudentReports(studentId, reports) {
    let student = students.value.find(student => student.id == studentId)
    student.reports = reports
  }
  
  async function fetchStudentReportsById(studentId) {
    google.script.run.withSuccessHandler((res) => {setStudentReports(studentId, res)}).getLettersById(studentId);
  }
  
  async function fetchStudents() {
    google.script.run.withSuccessHandler(populateList).sarbStudents();
  }

  return { students, setStudentReports, fetchStudents, createLetter, fetchStudentReportsById }
})
