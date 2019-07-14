const {
    session,
    currentUser,
    template,
    headerFromMapper
} = require('./main')

const Message = require('../models/message')

const message = (request) => {
    if (request.method === 'POST') {
        const form = request.form()
        const m = Message.create(form)
        m.save()
    }

    let body = template('message.html')
    const ms = Message.all()
    body = body.replace('{{messages}}', ms)
    const headers = {
        'Content-type': 'text/html'
    }
    const header = headerFromMapper(headers)
    const r = header + '\r\n' + body
    return r
}

const routeIndex = {
    '/message': message
}

module.exports = routeIndex