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

  function setStudentReports(reports, studentId) {
    let student = students.value.find(student => student.id == studentId)
    student.reports = reports
  }
  
  async function fetchStudentReportsById(studentId) {
    gsq.push('getLettersById', (reports)=>{setStudentReports(reports, studentId)}, studentId)
  }
  
  async function fetchStudents() {
    gsq.push('sarbStudents', populateList)
  }

  return { students, setStudentReports, fetchStudents, createLetter, fetchStudentReportsById }
})
