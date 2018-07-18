const getEnv = () => {
  if (window.location.href.match('local*')) {
    return 'http://localhost:3000'
  } else {
    return 'http://localhost:3000'
  }
}

module.exports = getEnv()
