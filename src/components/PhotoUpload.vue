<template>
  <div class="thumbnail uploadThumbnail">
    <img :src='imgLink'/>
    <div class="caption">
      <label class="btn btn-primary btn-block addImage" :disabled='disabledUploadButton'>
        Upload
        <input type="file" accept="image/*" @change="onFileChange($event)" class="file" :disabled='disabledUploadButton'/>
      </label>
      <a @click="removeImage()" class="btn btn-default btn-block removeImage">Apagar</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    disabledUploadButton: Boolean
  },
  data () {
    return {
      imgLink: '',
      imageNotFoundLogo: 'https://abrilvip.files.wordpress.com/2017/02/capaprofile.jpg'
    }
  },
  watch: {
    src (value) {
      this.imgLink = value || this.imageNotFoundLogo
    }
  },
  methods: {
    onFileChange (event) {
      let files = event.target.files || event.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage (file) {
      let reader = new FileReader()
      reader.onload = (e) => {
        this.imgLink = e.target.result
        this.$emit('upload', file, this.imgLink)
      }
      reader.readAsDataURL(file)
    },
    removeImage () {
      this.imgLink = this.imageNotFoundLogo
      this.$emit('remove')
    }
  },
  mounted () {
    this.imgLink = this.src ? this.src : this.imageNotFoundLogo
  }
}
</script>

<style lang='scss'>
.uploadThumbnail {
    width: 200px;
    font-size: 14px;
    margin: auto;
    float: right;
    img {
      max-width:100%;
      height: 100px;
    }
  }
  input[type="file"] {
    display: none !important;
  }
 </style>
