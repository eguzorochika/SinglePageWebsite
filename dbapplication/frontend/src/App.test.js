import axios from "axios";
jest.mock("axios"); // ✅ This is good

import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", async () => {
  // Mock API response
  axios.get.mockResolvedValue({ data: {} });

  render(<App />);
  
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
