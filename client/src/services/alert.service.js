import api from '@/services/api.config.js'
import authHeader from '@/services/authHeader.js'

export default {
  getAlert() {
    return api.get('/api/alert')
  },
  addAlert(alert) {
    return api.post('/api/alert/add', alert, { headers: authHeader() })
  },
  deleteAlert() {
    return api.delete('/api/alert/delete', { headers: authHeader() })
  }
}