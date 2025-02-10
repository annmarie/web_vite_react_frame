import { render, screen, fireEvent, act } from "@testing-library/react";
import { initialState } from "./reducer";
import FormParts from "../FormParts";

describe("FormParts Component", () => {

  it("should render the form with default values", () => {
    render(<FormParts />);
    const numInput = screen.getByTestId('num-input');
    const sizeSlider = screen.getByTestId('size-slider');
    const colorSelect = screen.getByTestId('color-select');
    const resetButton = screen.getByTestId('reset-button');
    expect(resetButton).toBeInTheDocument();
    expect(numInput.value).toBe(String(initialState.num));
    expect(sizeSlider.value).toBe(String(initialState.sizeKey));
    expect(colorSelect.value).toBe(String(initialState.colorKey));
  });

  it("should update the color key value", async () => {
    render(<FormParts />);
    const colorSelect = screen.getByTestId('color-select');
    await act(() => fireEvent.change(colorSelect, { target: { value: "2" } }));
    expect(colorSelect.value).toBe("2");
    expect(screen.getByText(`Color: ${initialState.colors[2]}`)).toBeInTheDocument();
  });

  it("should update the number input value", async () => {
    render(<FormParts />);
    const numInput = screen.getByTestId('num-input');
    await act(() => fireEvent.change(numInput, { target: { value: "5" } }));
    expect(numInput.value).toBe("5");
    expect(screen.getByText("Num: 5")).toBeInTheDocument();
  });

  it("should update the size key value", async () => {
    render(<FormParts />);
    const sizeSlider = screen.getByTestId('size-slider');
    await act(() => fireEvent.change(sizeSlider, { target: { value: "3" } }));
    expect(sizeSlider.value).toBe("3");
    expect(screen.getByText(`Size: ${initialState.sizes[3]}`)).toBeInTheDocument();
  });

  it("should reset the form", async () => {
    render(<FormParts />);
    const colorSelect = screen.getByTestId('color-select');
    await act(() => fireEvent.change(colorSelect, { target: { value: "2" } }));
    expect(colorSelect.value).toBe("2");
    const numInput = screen.getByTestId('num-input');
    await act(() => fireEvent.change(numInput, { target: { value: "10" } }));
    expect(numInput.value).toBe("10");
    const sizeSlider = screen.getByTestId('size-slider');
    await act(() => fireEvent.change(sizeSlider, { target: { value: "3" } }));
    expect(sizeSlider.value).toBe("3");
    const resetButton = screen.getByTestId('reset-button');
    await act(() => fireEvent.click(resetButton));
    expect(colorSelect.value).toBe(String(initialState.colorKey));
    expect(numInput.value).toBe(String(initialState.num));
    expect(sizeSlider.value).toBe(String(initialState.sizeKey));
  });
});
