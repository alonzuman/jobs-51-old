export const setTheme = () => async dispatch => {
  const currentTheme = localStorage.getItem('theme')
  if (!currentTheme || currentTheme === 'dark') {
    localStorage.setItem('theme', 'light')
    dispatch({
      type: 'SET_THEME',
      payload: { type: 'light' }
    })
  } else {
    localStorage.setItem('theme', 'dark')
    dispatch({ type: 'SET_THEME', payload: { type: 'dark' } })
  }
  return window.location.reload()
}
