var App = App || {};

App.ClickCounter = () => {
  let value = 0;
  return {
    getValue() {
      return value;
    }
  };
};

module.exports = App;
