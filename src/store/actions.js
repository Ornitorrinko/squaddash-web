import services from './services'
export default {
  async uploadImageToCloudinary ({commit}, file) {
    commit('LOADING')
    let response = await services.uploadImageToCloudinary(file)
    if (response.data) {
      let image = response.data
      commit('LOADING')
      commit('IMAGE_UPLOADED_SUCCESS', {image})
    } else {
      commit('LOADING')
      commit('IMAGE_UPLOADED_FAIL')
    }
  }
}
