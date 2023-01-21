export class DomHelper {
    static searchElement(selectors: string): Element {
    const element = document.querySelector(selectors);
    return element;
  }

  static searchAllElement(selectors: string): NodeListOf<Element> {
    const elements = document.querySelectorAll(selectors);
    return elements;
  }

  static createElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);
    return element;
  }

  static createTextNode(data: string): Text {
    const element = document.createTextNode(data);
    return element;
  }
}
