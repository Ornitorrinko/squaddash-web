export default {
  'LOADING' (state) {
    state.loading = !state.loading
  },
  'IMAGE_UPLOADED_SUCCESS' (state, {image}) {
    state.image = image
  },
  'IMAGE_UPLOADED_FAIL' (state) {
    state.image = 'Falha ao fazer o upload'
  }
}
