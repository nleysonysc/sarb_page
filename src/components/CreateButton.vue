<script setup>
  import { toRefs, ref, watch } from 'vue'
  import { useStudentsStore } from '../stores/students.js'
  const studentStore = useStudentsStore()

  const props = defineProps({
    student: Array,
    level: Number
  })
  const { student, level } = toRefs(props)

  const loading = ref(true)
  const loadingTimeout = {
    timer: setTimeout(()=> {
            loading.value = false
            loadingTimeout.timer = null
          }, 5000)
  }

  function handleClick(e) {
    studentStore.createLetter(student.value, level.value)
    loading.value = true
    loadingTimeout.timer = setTimeout(()=> {
      loading.value = false
      loadingTimeout.timer = null
    }, 10000)
  }

  watch(
    ()=>studentStore.getStudentReports(student.value.id), 
    () => {
      loading.value = false
      clearTimeout(loadingTimeout.timer)
      loadingTimeout.timer = null
    }
  )
</script>

<template>
  <button @click="handleClick" :disabled="loading">
    {{loading ? 'loading...' : `Create Level ${level} Letter` }}
  </button>
</template>

<style scoped>
  h3 {
    margin: 0;
    padding: 0;
    font-size: 1.1em;
  }
  
</style>
