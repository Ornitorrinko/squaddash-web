<template>
  <div class='photoUpload'>
    <div class="image">
      <img :src='imgLink' :alt='alt'>
    </div>
    <div class="caption">
      <label class="addImage" :disabled='disableButton'>
        {{uploadButtonText}}
        <input type="file" accept="image/*" @change="onFileChange($event)" class="file" :disabled='disableButton'/>
      </label>
      <a @click="removeImage()" class="removeImage">{{removeButtonText}}</a>
    </div>
  </div>
</template>

<script>
const noPhoto = 'http://www.autopostosilvestre.com.br/img/no-photo.jpeg'
export default {
  props: {
    src: String,
    alt: { type: String, default: 'Foto' },
    uploadButtonText: { type: String, default: 'Upload' },
    removeButtonText: { type: String, default: 'Remove' },
    disableButton: { type: Boolean, default: false }
  },
  data () {
    return {
      imgLink: ''
    }
  },
  watch: {
    src (value) {
      this.imgLink = value || noPhoto
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
      document.getElementsByClassName('file')[0].value = ''
    },
    removeImage () {
      this.imgLink = noPhoto
      document.getElementsByClassName('file')[0].value = ''
      this.$emit('remove', '')
    }
  },
  mounted () {
    this.imgLink = this.src ? this.src : noPhoto
  }
}
</script>

<style lang='scss'>
.photoUpload {
  width: 200px;
  .image {
    margin-bottom: 10px;
    text-align: center;
  }
  img {
    max-width:100%;
    height: 200px;
  }
  .file {
    display: none;
  }
  .addImage {
    background-color: #118fe4;
    border-color: transparent;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    width: 100px;
    padding: 7px 18px 7px 18px;
    text-align: center;
    position: relative;
    top: 5px;
    &:hover {
      background-color: #127bc0;
    }
    &:active {
      box-shadow: 0px 1px #0d0f0171;
      top: 4px;
    }
  }
  .removeImage {
    background-color: #e8e8e8;
    border-color: transparent;
    color: #363636;
    border-radius: 5px;
    float: right;
    cursor: pointer;
    width: 100px;
    padding: 5px;
    text-align: center;
    &:hover {
      background-color: #b9b9b9;
    }
    &:active {
      box-shadow: 0px 1px #0d0f0171;
      top: 4px;
    }
  }
}
</style>
