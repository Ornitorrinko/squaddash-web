import http from 'axios'
export default {
  uploadImageToCloudinary (file) {
    let CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ornito-media/image/upload'
    let CLOUDINARY_PRESET_UPLOAD = 'qcvcxjvd'
    let formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_PRESET_UPLOAD)
    formData.append('folder', 'squaddash')
    return http({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    })
  }
}
