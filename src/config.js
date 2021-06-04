module.exports = {
  minAge: [18, 45],
  pinCode: "251306",
  centerName: "LALUKHEDI PHC",
  todayDate: getTodayDate(),
};

function getTodayDate() {
  let date = new Date();
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  let year = date.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;
  return [day, month, year].join("-");
}
