const tr = require("tor-request");
const config = require("./config");

const getAppointements = () => {
  try {
    console.log("fetching available slots for cowin");
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${config.pinCode}&date=${config.todayDate}`;
    return new Promise((resolve, reject) => {
      tr.request(url, function (err, res, body) {
        console.log('🚀 ~ body', body);
        console.log('🚀 ~ err', err);
        if (!err && res.statusCode == 200) {
          body = JSON.parse(body);
          resolve(body);
        } else {
          reject(err);
        }
      });
    });
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
