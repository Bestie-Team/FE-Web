const NodeEnvironment =
  require("jest-environment-node").default || require("jest-environment-node");
const { JSDOM } = require("jsdom");

class JSDOMEnvironment extends NodeEnvironment {
  async setup() {
    await super.setup();

    this.dom = new JSDOM("<!doctype html><html><body></body></html>", {
      url: "http://localhost",
      pretendToBeVisual: true,
    });

    const { window } = this.dom;
    this.global.window = window;
    this.global.document = window.document;
    this.global.navigator = window.navigator;

    for (const key of Object.getOwnPropertyNames(window)) {
      if (key in this.global) continue;
      Object.defineProperty(this.global, key, {
        configurable: true,
        get: () => window[key],
      });
    }
  }

  async teardown() {
    if (this.dom) {
      this.dom.window.close();
    }
    await super.teardown();
  }
}

module.exports = JSDOMEnvironment;

