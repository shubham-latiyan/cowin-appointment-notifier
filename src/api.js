const axios = require("axios");
const config = require("./config");

const getAppointements = () => {
  try {
    console.log("fetching available slots for cowin");
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${config.pinCode}&date=${config.todayDate}`;
    return axios.get(url);
  } catch (error) {
    console.error(error);
  }
};

const getAvailableSlots = async () => {
  const { data } = await getAppointements();
  const result = data.centers.filter((e) => e.name === config.centerName);
  if (!result && result.length === 0) {
    return;
  }
  const sessions = result[0].sessions;
  if (sessions.length === 0) {
    return;
  }
  return sessions.filter((e) => config.minAge.includes(e.min_age_limit));
};

module.exports = { getAvailableSlots };