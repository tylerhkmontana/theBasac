import api from '@/services/api.config.js'
import authHeader from '@/services/authHeader.js'

export default {
  getMenu() {
    return api.get("/api/category")
  },
  getItems(categoryId) {
    return api.get(`/api/category/${categoryId}`)
  },
  addCategory(category) {
    return api.post("/api/category/add", category, { headers: authHeader() })
  },
  deleteCategory(category) {
    return api.delete("/api/category/delete", { headers: authHeader(), data: category })
  },
  addItem(item) {
    return api.post("/api/item/add", item, { headers: authHeader() })
  },
  updateItem(newInfo) {
    return api.put("/api/item/update", newInfo, { headers: authHeader() })
  },
  updateOrder(itemOrder) {
    return api.put("/api/item/update/order", itemOrder, { headers: authHeader() })
  },
  deleteItems(items) {
    return api.delete("/api/item/delete", { headers: authHeader(), data: items })
  }
}