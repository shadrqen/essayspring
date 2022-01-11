module.exports = process.env.NODE_ENV === 'production' ? 'https://api.essayspring.com/' : `http://${process.env.URL}:3100/`
