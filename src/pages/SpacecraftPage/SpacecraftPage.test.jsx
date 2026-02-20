import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import SpacecraftPage from "./SpacecraftPage";

test("shows not found for invalid spacecraft id", () => {
  render(
    <MemoryRouter initialEntries={["/spacecrafts/unknown"]}>
      <Routes>
        <Route
          path="/spacecrafts/:spacecraftId"
          element={<SpacecraftPage spacecrafts={[]} planets={[]} isLoading={false} />}
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/spacecraft not found/i)).toBeInTheDocument();
});

// Routing Validation Test