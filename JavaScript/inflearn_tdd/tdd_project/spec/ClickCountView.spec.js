const App = require("../src/components/ClickCounter");
const ViewApp = require("../src/components/ClickCountView");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = new JSDOM(`<!DOCTYPE html><span></span>)`).window;

describe("App.ClickCountView 모듈", () => {
  let clickCounter, updateEl, view;
  beforeEach(() => {
    clickCounter = App.ClickCounter();
    updateEl = document.createElement("span");
    view = ViewApp.ClickCountView(clickCounter, updateEl);
  });

  it("clickCounter를 주입하지 않으면 에러를 던진다.", () => {
    clickCounter = null;
    const actual = () => ViewApp.ClickCountView(clickCounter, updateEl);
    expect(actual).toThrowError("clickCounter");
  });

  it("updateEl을 주입하지 않으면 에러를 던진다.", () => {
    updateEl = null;
    const actual = () => ViewApp.ClickCountView(clickCounter, updateEl);
    expect(actual).toThrowError("updateEl");
  });

  describe("updateView()", () => {
    it("ClickCounter의 getValue() 값을 출력한다.", () => {
      const counterValue = clickCounter.getValue();
      view.updateView();
      expect(updateEl.innerHTML).toBe(counterValue.toString());
    });
  });

  describe("increaseAndUpdateView()", () => {
    it("ClickCounter의 increase를 실행한다", () => {
      spyOn(clickCounter, "increase");
      view.increaseAndUpdateView();
      expect(clickCounter.increase).toHaveBeenCalled();
    });

    it("updateView를 실행한다", () => {
      spyOn(view, "updateView");
      view.increaseAndUpdateView();
      expect(view.updateView).toHaveBeenCalled();
    });
  });
});
