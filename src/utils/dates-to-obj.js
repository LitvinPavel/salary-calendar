export default (arr) => {
  let v = {};
  if (arr && arr.length) {
    arr.forEach((date) => {
      if (!v[date.getFullYear()]) {
        v[date.getFullYear()] = {};
      }
      if (!v[date.getFullYear()][date.getMonth()]) {
        v[date.getFullYear()][date.getMonth()] = [];
      }
      v[date.getFullYear()][date.getMonth()].push(date.getDate());
    });
  }
  return v;
};
