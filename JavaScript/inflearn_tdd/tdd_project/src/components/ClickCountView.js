var App = App || {};

App.ClickCountView = (clickCounter, options) => {
  if (!clickCounter) throw Error(App.ClickCountView.messages.noClickCounter);
  if (!options.updateEl) throw Error(App.ClickCountView.messages.noUpdateEl);

  const view = {
    updateView() {
      options.updateEl.innerHTML = clickCounter.getValue();
    },

    increaseAndUpdateView() {
      clickCounter.count();
      this.updateView();
    }
  };

  options.triggerEl.addEventListener("click", () => {
    view.increaseAndUpdateView();
  });

  return view;
};

App.ClickCountView.messages = {
  noClickCounter: "clickCount를 주입해야 합니다.",
  noUpdateEl: "updateEl을 주입해야 합니다."
};

module.exports = App;
