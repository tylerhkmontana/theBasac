import api from '@/services/api.config.js'
import authHeader from '@/services/authHeader.js'

export default {
  getMenu() {
    return api.get("/api/category", { headers: authHeader() })
  },
  getItems(categoryId) {
    return api.get(`/api/category/${categoryId}`, { headers: authHeader() })
  },
  addCategory(category) {
    return api.post("/api/category/add", category, { headers: authHeader() })
  },
  deleteCategory(category) {
    return api.delete("/api/category/delete", { headers: authHeader(), data: category })
  }
}