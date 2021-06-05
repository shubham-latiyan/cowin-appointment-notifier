const api = require("./api");
const email = require('./email');

(async function run() {
  const result = await api.getAvailableSlots();
  console.log('🚀 ~ run ~ result', result[0]);
  generateTemplate(result);
})();

function generateTemplate(results) {
  let text = "";
  results.forEach((el, index) => {
    text += `${index + 1}  |  date: ${el.date}  |  capacity: ${
      el.available_capacity
    }  |  age: ${el.min_age_limit}  |  vaccine: ${
      el.vaccine
    }  |  slots: ${el.slots.join(",  ")}  <br>`;
  });
  email.sendEmail(String(results.length), text);
}

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error);
});