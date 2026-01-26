import { useState } from 'react';
import PlanetCard from '../../components/PlanetCard/PlanetCard.jsx';

export default function PlanetsPage ({
    planets = [],
    spacecrafts = [],
    onSendSpacecraftToPlanet,
    error,
}) {
    const [selectByPlanet, setSelectByPlanet] = useState({});

    function handleSelect (planetId, spacecraftId) {
        setSelectByPlanet((prev) => ({
            ...prev,
            [planetId]: spacecraftId,
        }))
    }

    async function handleSend(spacecraftId, planetId) {
        await onSendSpacecraftToPlanet(spacecraftId, planetId);
    

    setSelectByPlanet((prev) => ({
        ...prev,
        [planetId]:"",
    }))
}

    if (error) return <div>Error:{String(error)}</div>

    return (
    <div>
      <h3>Planets</h3>
      <div>Count: {planets.length}</div>

      <ul>
        {planets.map((planet) => {
          const spacecraftsOnPlanet = spacecrafts.filter(
            (sc) => String(sc.currentLocation) === String(planet.id)
          );

          const candidates = spacecrafts.filter(
            (sc) => String(sc.currentLocation) !== String(planet.id)
          );

          return (
            <PlanetCard
              key={planet.id}
              planet={planet}
              spacecraftsOnPlanet={spacecraftsOnPlanet}
              candidates={candidates}
              selectedSpacecraftId={selectByPlanet[planet.id] || ""}
              onSelectSpacecraft={handleSelect}
              onSendSpacecraft={handleSend}
            />
          );
        })}
      </ul>
    </div>
  );
}

/*Notes:
Refer to PlanetCard & SpacecraftPage. 

Planets page displays all planets and the associated data.  It also contains UX components.
In addition to mapping, since the user can select a spacecraft from a list, .filter() is also
used.

*/