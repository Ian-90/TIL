var App = App || {};

App.ClickCounter = _data => {
  if (!_data) throw Error("data");

  const data = _data;

  data.value = data.value || 0;

  return {
    getValue() {
      return data.value;
    },
    increase() {
      data.value++;
    }
  };
};

module.exports = App;
