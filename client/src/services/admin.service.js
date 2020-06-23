import api from '@/services/api.config.js'

export default {
  login(credentials) {
    return api.post('/api/admin/login', credentials)
  }
}
