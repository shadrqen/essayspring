export default {
  validateNumOfPages (pageCount) {
    if (typeof pageCount === 'number') {
      if (pageCount === 0) {
        return { status: false, message: 'This value must be 1 or higher' }
      } else if (pageCount > 99) {
        return { status: false, message: 'This value should not exceed 100. Please contact support if you need more' }
      } else {
        return { status: true, number: pageCount }
      }
    } else if (pageCount.match('^[0-9]+$') === null || pageCount.match(/^ *$/) !== null || isNaN(pageCount.toString().split()[0])) {
      return { status: false, message: 'Use numbers only' }
    } else if (pageCount.match('^[0-9]+$') !== null) {
      const num = Number(pageCount)
      if (num > 99) {
        return { status: false, message: 'This value should not exceed 100. Please contact support if you need more' }
      }
      return { status: true, number: Number(pageCount) }
    }
  },
  validateCPP (price) {
    if (typeof price === 'number') {
      if (price < 0) {
        return { status: false, message: 'This value must be 1 or higher' }
      } else {
        return { status: true, number: price }
      }
    } else if (price.match('^[0-9]+$') === null || price.match(/^ *$/) !== null || isNaN(price.toString().split()[0])) {
      return { status: false, message: 'Use numbers only' }
    } else if (price.match('^[0-9]+$') !== null) {
      return { status: true, number: Number(price) }
    }
  },
  confirmFileMimeType (e) {
    const files = e.target.files || e.dataTransfer.files
    let err = ''
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'text/plain', 'video/mp4', 'video/mpg',
      'video/mpeg', 'video/avi', 'video/wmv', 'video/mov', 'video/rm', 'video/ram', 'video/swf', 'video/flv',
      'video/ogg', 'video/webm', 'audio/mp3', 'audio/mp4', 'audio/wav', 'audio/ogg', 'audio/mpeg', 'text/csv', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'
    ]
    for (let x = 0; x < files.length; x++) {
      if (allowedFileTypes.every(type => files[x].type !== type)) {
        err += files[x].type + ' is not a supported format\n'
      }
    }
    if (err !== '') {
      e.target.value = null
      return false
    }
    return true
  },
  fileExtensionIcon (extension) {
    switch (extension) {
      case 'jpeg':
      case 'jpg':
      case 'png':
        return 'image'
      case 'doc':
      case 'docx':
        return 'msword'
      case 'pdf':
        return 'pdf'
      case 'xlsx':
        return 'xlsx'
      case 'txt':
        return 'txt'
      case 'csv':
        return 'csv'
      case 'm4a':
      case 'flac':
      case 'alac':
      case 'mp3':
      case 'wav':
      case 'wma':
      case 'aac':
        return 'music'
      case 'webm':
      case 'mpg':
      case 'mp2':
      case 'mpeg':
      case 'mpe':
      case 'mpv':
      case 'ogg':
      case 'mp4':
      case 'm4p':
      case 'm4v':
      case 'avi':
      case 'wmv':
      case 'mov':
      case 'qt':
      case 'flv':
      case 'swf':
      case 'avchd':
        return 'video'
      default:
        return 'file'
    }
  },
  /* In some cases, file names can be very long. Therefore, we may need to slice and show only
  * the maximum allowable length so that it can fit into the given element */
  formatOriginalName (name) {
    if (name) {
      const maxShowableNameLength = 28
      let remainingNameLength = 0
      let finalFormattedName
      if (name.length > maxShowableNameLength) {
        const splitFileName = name.split('.')
        let fileName, fileExtension
        if (splitFileName.length > 2) {
          fileExtension = name.split('.')[splitFileName.length - 1]
          splitFileName.pop()
          fileName = splitFileName.join('.')
        } else {
          fileName = name.split('.')[0]
          fileExtension = name.split('.')[1]
        }
        remainingNameLength = maxShowableNameLength - fileExtension.length
        finalFormattedName = fileName.slice(0, remainingNameLength - 1).concat('.', fileExtension)
      } else {
        finalFormattedName = name
      }
      return finalFormattedName
    } else {
      return ''
    }
  }
}
