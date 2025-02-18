import { render } from "@testing-library/react";
import App from "./App";

global.TextEncoder = require('util').TextEncoder;

describe("App", () => {
  it('should matche the snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
