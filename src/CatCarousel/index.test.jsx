import { render, fireEvent, screen, act } from "@testing-library/react";
import axios from "axios";
import CatCarousel from "../CatCarousel";

jest.mock("axios"); // Mock axios

describe("CatCarousel Component with good api call", () => {
  // Mock data for API response
  const mockImages = [
    { url: "https://example.com/cat1.jpg" },
    { url: "https://example.com/cat2.jpg" },
    { url: "https://example.com/cat3.jpg" },
  ];

  // Mock console.log
  jest.spyOn(console, 'log').mockImplementation();
  jest.spyOn(console, 'error').mockImplementation();

  beforeEach(async () => {
  });

  it("should render the carousel", async () => {
    axios.get.mockResolvedValueOnce({ data: mockImages });
    await act(async () => render(<CatCarousel />));
    expect(axios.get).toHaveBeenCalledTimes(1);
    const nextButton = screen.getByRole("button", { name: /Next/i });
    expect(nextButton).toBeInTheDocument();
    const prevButton = screen.getByRole("button", { name: /Previous/i });
    expect(prevButton).toBeInTheDocument();
    const refreshButton = screen.getByRole("button", { name: /Refresh/i });
    expect(refreshButton).toBeInTheDocument();
    const image = screen.getByAltText(/Cat Image \d/i);
    expect(image).toBeInTheDocument();
  });

  it("should displays images", async () => {
    axios.get.mockResolvedValueOnce({ data: mockImages });
    await act(async () => render(<CatCarousel />));
    const image = screen.getByAltText(/Cat Image \d/i);
    expect(image).toHaveAttribute("src", mockImages[0].url);
  });

  it("should move to next and previous images", async () => {
    axios.get.mockResolvedValueOnce({ data: mockImages });
    await act(async () => render(<CatCarousel />));
    const nextButton = screen.getByRole("button", { name: /Next/i });
    const prevButton = screen.getByRole("button", { name: /Previous/i });
    const image = screen.getByAltText(/Cat Image \d/i);
    await act(async () => { fireEvent.click(nextButton); });
    expect(image).toHaveAttribute("src", mockImages[1].url);
    await act(async () => { fireEvent.click(prevButton); });
    expect(image).toHaveAttribute("src", mockImages[0].url);
  });

  it("should refresh the data source", async () => {
    axios.get.mockResolvedValueOnce({ data: mockImages });
    await act(async () => render(<CatCarousel />));
    const refreshButton = screen.getByRole("button", { name: /Refresh/i });
    await act(async () => fireEvent.click(refreshButton));
    expect(axios.get).toHaveBeenCalledTimes(2);
  });

  it("should display an api error message", async () => {
    axios.get.mockRejectedValueOnce(new Error("API call failed"));
    await act(async () => render(<CatCarousel />));
    expect(screen.getByText("Failed to fetch cat images.")).toBeInTheDocument();
  });
  it("should display an api error message", async () => {
    axios.get.mockResolvedValueOnce({ data: mockImages });
    await act(async () => render(<CatCarousel />));
    const refreshButton = screen.getByRole("button", { name: /Refresh/i });
    axios.get.mockResolvedValueOnce({ data: [] });
    await act(async () => fireEvent.click(refreshButton));
    expect(screen.getByText("No Data")).toBeInTheDocument();
  });
});
