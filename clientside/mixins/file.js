/* TODO: To complete the functionality and integration of the below code so
*  as to make the uploading of files centralized */
/* import registrationMixin from '@/mixins/registration'
import api from '@/api/api'

export default {
  async uploadFile (e) {
    const files = e.target.files || e.dataTransfer.files
    if (files[0].size > 10 * 1024 * 1024) {
      window.alert('File is too large! Attach a file less than 2mbs')
    } else if (registrationMixin.confirmFileMimeType(e)) {
      if (!files.length) { return }
      const fileForm = new FormData()
      fileForm.append('file', document.getElementById('file').files[0])
      fileForm.append('fileType', 'clientSupportingFile')
      await api.postRequest('users/v1/upload_file', fileForm)
        .then(res => res)
        .catch(error => {
          return Promise.reject(error)
        })
    } else {
      window.alert('File format not supported')
    }
  }
}
 */
