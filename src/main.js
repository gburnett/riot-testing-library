import { getQueriesForElement, prettyDOM } from "@testing-library/dom";
import { component, unmount } from "riot";

const mountedContainers = new Set();

function render(ui, { container, baseElement = container, attributes } = {}) {
  if (!baseElement) {
    baseElement = document.body;
  }
  if (!container) {
    container = baseElement.appendChild(document.createElement("div"));
  }
  const element = component(ui)(container, attributes);
  mountedContainers.add({ container, element });

  return {
    element,
    container,
    baseElement,
    debug: () => console.log(prettyDOM(baseElement)),
    ...getQueriesForElement(baseElement)
  };
}

function cleanup() {
  mountedContainers.forEach(mountedContainer => {
    const { container, element } = mountedContainer;
    unmount(`[is='${element.name}']`);
    if (container.parentNode === document.body) {
      document.body.removeChild(container);
    }

    mountedContainers.delete(mountedContainer);
  });
}

export * from "@testing-library/dom";
export { render, cleanup };
