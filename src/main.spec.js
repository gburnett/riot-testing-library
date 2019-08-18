import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "../dist/riot-testing-library.esm.js";
import Salutation from "../tmp/salutation";
import Farewell from "../tmp/farewell";

describe("main", () => {
  let attributes;
  describe("render", () => {
    beforeEach(() => {
      attributes = { name: "Mark", after: jest.fn() };
    });

    afterEach(cleanup);

    it("appends a component to the document", () => {
      const { getByText } = render(Salutation, { attributes });
      expect(getByText("Oh hai, Mark!")).toBeInTheDocument();
    });

    it("mounts a component", () => {
      render(Salutation, { attributes });
      expect(attributes.after).toHaveBeenCalledTimes(1);
    });

    it("returns a default baseElement", () => {
      const { baseElement } = render(Salutation, {
        attributes
      });
      expect(baseElement).toBe(document.body);
    });

    it("returns a specified baseElement", () => {
      const specifiedElement = document.createElement("div");
      const { baseElement } = render(Salutation, {
        baseElement: specifiedElement,
        attributes
      });
      expect(baseElement).toBe(specifiedElement);
    });

    it("returns a default container", () => {
      const { container } = render(Salutation, {
        attributes
      });
      expect(container).toBe(document.body.firstChild);
    });

    it("returns a specified container", () => {
      const specifiedContainer = document.createElement("span");
      const { container } = render(Salutation, {
        container: document.body.appendChild(specifiedContainer),
        attributes
      });
      expect(container).toBe(specifiedContainer);
    });
  });

  describe("cleanup", () => {
    beforeEach(() => {
      attributes = { task: "homework", after: jest.fn() };
    });

    it("unmounts a component", () => {
      const { debug, element } = render(Farewell, { attributes });
      cleanup();
      expect(attributes.after).toHaveBeenCalled();
    });

    it("removes a component from the document", () => {
      const { baseElement } = render(Farewell, { attributes });
      cleanup();
      expect(baseElement.innerHTML).toBe("");
    });
  });
});
