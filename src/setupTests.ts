// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

Object.defineProperty(window, 'localStorage', {
  value: {
    data: {},
    length: 0,
    setItem(name: string, value: string) {
      this.data[name] = value.toString();
      this.length = Object.keys(this.data).length;
    },
    getItem(name: string) {
      return this.data[name];
    },
    removeItem(name: string) {
      delete this.data[name];
      this.length = Object.keys(this.data).length;
    },
  },
  writable: true,
});
