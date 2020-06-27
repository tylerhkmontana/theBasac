import api from '@/services/api.config.js'
import authHeader from '@/services/authHeader.js'

export default {
  getSlides() {
    return api.get("/api/slide")
  },
  addSlide(slide) {
    return api.post("/api/slide/add", slide, { headers: authHeader() })
  },
  deleteSlide(slide) {
    return api.delete("/api/slide/delete", { headers: authHeader(), data: slide })
  }
}