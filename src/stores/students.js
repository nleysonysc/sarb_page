import { ref } from 'vue'
import { defineStore } from 'pinia'
import gsQueue from '../util/gsQueue'

let gsq = new gsQueue(20)

export const useStudentsStore = defineStore('students', () => {
  const students = ref([])

  function populateList(sarbStudents){
    students.value = sarbStudents
  }
  
  async function createLetter(student, lvl) {
    gsq.push('createLetter', ()=>{fetchStudentReportsById(student.id)}, student, lvl)
  }

  function setStudentReports(reports) {
    if (reports.length > 0) {
      let student = students.value.find(student => student.id == reports[0].studentId)
      student.reports = reports
    }
  }
  
  async function fetchStudentReportsById(studentId) {
    gsq.push('getLettersById', setStudentReports, studentId)
  }
  
  async function fetchStudents() {
    gsq.push('sarbStudents', populateList)
  }

  return { students, setStudentReports, fetchStudents, createLetter, fetchStudentReportsById }
})
