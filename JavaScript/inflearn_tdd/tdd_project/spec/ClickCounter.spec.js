const App = require("../src/components/ClickCounter");

describe("App.ClickCounter", () => {
  let counter, data;

  it("초기값을 주입하지 않으면 에러를 던진다", () => {
    const actual = () => (counter = App.ClickCounter());
    expect(actual).toThrowError("data");
  });

  beforeEach(() => {
    data = { value: 0 };
    counter = App.ClickCounter(data);
  });

  describe("getValue()", () => {
    it("초기값이 0인 카운터 값을 반환한다", () => {
      expect(counter.getValue()).toBe(0);
    });
  });

  describe("increase()", () => {
    it("카운터를 1 올린다", () => {
      const initValue = counter.getValue();
      counter.increase();
      expect(counter.getValue()).toBe(initValue + 1);
    });
  });
});
