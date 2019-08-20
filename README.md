# riot-testing-library
A simple testing library for testing [Riot.js](https://riot.js.org/) components with [dom-testing-library](https://testing-library.com/)

## Install

``` shell
yarn add -D @gburnett/riot-testing-library
```

or

``` shell
npm i -D @gburnett/riot-testing-library
```

## Basic Example

For a basic example see how I
[test](https://github.com/gburnett/riot-testing-library/blob/master/example/hidden-message.test.js)
the [hidden message component](https://github.com/gburnett/riot-testing-library/blob/master/fixtures/hidden-message.riot).

``` html
<hidden-message>
  <div>
    <label for='toggle'>Show Message</label>
    <input id='toggle' type='checkbox' onchange={e => setShowMessage(e.target.checked)} checked={state.showMessage} />
    <div if={state.showMessage}>{props.message}</div>
  </div>
  <script>
    export default {
      onMounted() {
        this.update({ showMessage: false })
      },
      setShowMessage(showMessage) {
        this.update({ showMessage });
      }
    }
  </script>
</hidden-message>
```

``` javascript
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
```

## Acknowledgement
This is an attempt to test riot components in the way that Kent
C. Dodds suggests testing react components.

For more info see
[react-testing-library](https://github.com/testing-library/react-testing-library).
See also [this blog post](https://kentcdodds.com/blog/testing-implementation-details)
