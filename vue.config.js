module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/hickory-dickory-ds/'
        : '/'
}