const App = require("../src/components/ClickCounter");
const ViewApp = require("../src/components/ClickCountView");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = new JSDOM(
  `<!DOCTYPE html><span></span><button>increase</button>)`
).window;

describe("App.ClickCountView 모듈", () => {
  let clickCounter, triggerEl, updateEl, view;
  beforeEach(() => {
    clickCounter = App.ClickCounter();
    updateEl = document.createElement("span");
    triggerEl = document.createElement("button");
    view = ViewApp.ClickCountView(clickCounter, { updateEl, triggerEl });
  });

  describe("네거티브 테스트", () => {
    it("clickCounter를 주입하지 않으면 에러를 던진다.", () => {
      const actual = () => ViewApp.ClickCountView(null, { updateEl });
      expect(actual).toThrowError(
        ViewApp.ClickCountView.messages.noClickCounter
      );
    });

    it("updateEl을 주입하지 않으면 에러를 던진다.", () => {
      const actual = () => ViewApp.ClickCountView(clickCounter, { triggerEl });
      expect(actual).toThrowError(ViewApp.ClickCountView.messages.noUpdateEl);
    });
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

    it("클릭 이벤트가 발생하면 increaseAndUpdateView를 실행한다.", () => {
      spyOn(view, "increaseAndUpdateView");
      // click
      triggerEl.click();
      expect(view.increaseAndUpdateView).toHaveBeenCalled();
    });
  });
});
