import type { Course, Institution, State } from '@/models'
import axios from 'axios'
import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export const useStore = defineStore('gobal', {
  state: () => {
    return {
      last_updated: null,
      professor_auth: false,
      user_session_id: "",
    }
  },
  actions: {
    checkSession() {
      return this.professor_auth
    }
  },
  persist: true,
})