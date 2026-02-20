import { render, screen } from "@testing-library/react";
import PlanetCard from "./PlanetCard";

test("send button disabled when no spacecraft selected", () => {
  render(
    <PlanetCard
      planet={{ id: 1, name: "Mars", currentPopulation: 0 }}
      spacecraftsOnPlanet={[]}
      candidates={[{ id: "a", name: "Ship", capacity: 5 }]}
      selectedSpacecraftId=""
      onSelectSpacecraft={() => {}}
      onSendSpacecraft={() => {}}
      isLoading={false}
    />
  );

  const button = screen.getByRole("button", { name: /send to mars/i });
  expect(button).toBeDisabled();
});

// Dispatch Validation Test