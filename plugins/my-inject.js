class MyInject {
  constructor (app, error) {
    this.app = app
    this.error = error
  }

  pageTitle (routeName) {
    const jsonPath = `pages.${routeName.replace(/-/g, '.')}`
    const title = this.app.i18n.t(jsonPath)
    return (typeof (title) === 'object') ? title.index : title
  }

  dateFormat (dateStr) {
    const dateTimeFormat = new Intl.DateTimeFormat(
      'ja', { dateStyle: 'medium', timeStyle: 'short' }
    )
    return dateTimeFormat.format(new Date(dateStr))
  }

  projectLinkTo (id, name = 'project-id-dashboard') {
    return { name, params: { id } }
  }

  apiErrorHandler (response) {
    // ネットワークえらーの場合はresponseは存在しないため500
    const statusCode = (response) ? response.status : 500
    const message = (response) ? response.statusText : 'Network Error'
    return this.error({ statusCode, message })
  }
}

export default ({ app, error }, inject) => {
  inject('my', new MyInject(app, error))
}
