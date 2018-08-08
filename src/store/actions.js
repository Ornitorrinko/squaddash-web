import services from './services'
export default {
  async uploadImageToCloudinary ({commit}, file) {
    commit('LOADING')
    try {
      let response = await services.uploadImageToCloudinary(file)
      if (response.data) {
        let image = response.data
        commit('LOADING')
        commit('IMAGE_UPLOADED_SUCCESS', {image})
      }
    } catch (error) {
      commit('LOADING')
      console.log(error.request)
    }
  },
  setHeader ({commit}) {
    commit('SET_HEADER')
  }
}
