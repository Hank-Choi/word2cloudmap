export function pickColor(value){
  const normalized_value = value > 1? 1 : value
  const random = Math.floor(Math.random() * 30)
  const rval = Math.floor(255 * normalized_value) - random
  const gval = Math.floor(255 * (1 - normalized_value))-random
  const r = rval < 0 ? '0' : rval.toString(16)
  const g = gval < 0 ? '0' : gval.toString(16)
  const result = `#${r.length<2?'0'+r:r}${g.length < 2?'0'+g:g}00`

  return result
}
