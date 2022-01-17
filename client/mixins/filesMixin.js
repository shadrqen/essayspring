import registrationMixin from './registration'
import api from '../api/api'
export default {
  methods: {
    pickFile () {
      this.$refs.image.click()
    },
    async uploadFile (e) {
      const files = e.target.files || e.dataTransfer.files
      if (files[0].size > 10 * 1024 * 1024) {
        window.alert('File is too large! Attach a file less than 2mbs')
      } else if (registrationMixin.confirmFileMimeType(e)) { /* We only accept certain file types, and we need to
      confirm that the one uploaded is of the right type */
        if (!files.length) { return }
        const file = document.getElementById('file').files[0]
        const fileForm = new window.FormData()
        fileForm.append('file', file)
        fileForm.append('fileType', 'clientSupportingFile')
        await api.postRequest('users/v1/upload_file', fileForm)
          .then(res => res)
          .catch((error) => Promise.reject(error))
      } else {
        window.alert('File format not supported')
        return null
      }
    }
  }
}
