import { render, screen } from "@testing-library/react";
import SpacecraftsPage from "./SpacecraftsPage";

test("shows loading state while loading", () => {
  render(
    <SpacecraftsPage
      spacecrafts={[{ id: "1", name: "Falcon" }]}
      onDestroySpacecraft={() => {}}
      isLoading={true}
    />
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

// Loading State Validation Test