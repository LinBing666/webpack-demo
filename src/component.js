export default (text = 'Hello world') => {
  fetch('/api/test')
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  const element = document.createElement('div')
  element.className = 'pure-button'
  element.innerHTML = text

  element.onclick = () =>
    import('./lazy')
      .then(lazy => {
        element.textContent = lazy.default
      })
      .catch(err => {
        console.error(err)
      })
  return element
}
