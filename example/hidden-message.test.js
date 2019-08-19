import {
  render,
  cleanup,
  fireEvent
} from "../dist/riot-testing-library.esm.js";
import "@testing-library/jest-dom/extend-expect";
import HiddenMessage from "../tmp/hidden-message";

describe("components/hidden-message", () => {
  afterEach(cleanup);

  it("shows the children when the checkbox is checked", () => {
    const message = "Oh hai, Mark!";
    const { queryByText, getByLabelText, getByText } = render(HiddenMessage, {
      attributes: { message }
    });

    expect(queryByText(message)).toBeNull();

    fireEvent.click(getByLabelText("Show Message"));

    expect(getByText(message)).toBeInTheDocument();
  });
});
