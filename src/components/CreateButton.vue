<script setup>
  import { toRefs, ref, watch } from 'vue'
  import { useStudentsStore } from '../stores/students.js'
  const studentStore = useStudentsStore()

  const props = defineProps({
    student: Array,
    level: Number
  })
  const { student, level } = toRefs(props)

  const loading = ref(false)

  function handleClick(e) {
    studentStore.createLetter(student.value, level.value)
    loading.value = true
  }

  watch(studentStore.students, () => {
    console.log('updated')
    loading.value = false
  })


</script>

<template>
  <button @click="handleClick" :disabled="loading">Create Level {{level}} Letter</button>
</template>

<style scoped>
  h3 {
    margin: 0;
    padding: 0;
    font-size: 1.1em;
  }
  
</style>
