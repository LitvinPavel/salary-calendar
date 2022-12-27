export default (value) => {
  if (!value) return 0;
  return String(value.toFixed()).replace(/(.)(?=(\d{3})+$)/g,'$1 ');
}