import styles from'./PlanetCard.module.css';

export default function PlanetCard ({ 
    planet,
    spacecraftsOnPlanet = [],
    candidates= [],
    selectedSpacecraftId,
    onSelectSpacecraft,
    onSendSpacecraft,
    isLoading,
}) {

    return (
        <li className={styles.card}>
            <div className={styles.header}>
                <h4 className={styles.name}>{planet.name}</h4>
                <span className={styles.id}>ID: {planet.id}</span>
            </div>

            <img
                className={styles.image}
                src={planet.pictureUrl}
                alt={planet.name}
            />

            <div className={styles.info}>
                <p className={styles.population}>
                    <strong>Current Population:</strong> {planet.currentPopulation}
                </p>
            </div>

            <div className={styles.sectionTitle}>
                <h5>Spacecraft on this planet</h5>

                {spacecraftsOnPlanet.length > 0 ? (
                    <ul className={styles.spacecraftList}>
                        {spacecraftsOnPlanet.map((sc) => (
                            <li key={sc.id}>
                                {sc.name} (cap {sc.capacity})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.noSpacecraft}>No spacecraft currently on this planet.</p>
                )}
            </div>

            <div className={styles.assign}>
                <label className={styles.label}>Send spacecraft to this planet:</label>

                <div className={styles.selectRow}>
                <select
                className={styles.select}
                    value={selectedSpacecraftId}
                    onChange={(e) => onSelectSpacecraft(planet.id, e.target.value)}
                    disabled={isLoading}
                >

                <option value="">Select Spacecraft</option>
                {candidates.map((sc) => (
                    <option key={sc.id} value={sc.id}>
                        {sc.name} (cap {sc.capacity})
                    </option>
                ))}
                </select>

                <button   
                className={styles.assignButton}
                disabled={isLoading || !selectedSpacecraftId}
                onClick={() => onSendSpacecraft(selectedSpacecraftId, planet.id)}
                >
                {isLoading ? "Updating..." : `Send to ${planet.name}`}
                </button>
            </div>
        </div>
     </li>
   );
}

/*Notes:
PlanetCard displays all info about a planet.  The backend provides data such as name, id,
currentPopulation, and pictureUrl.  It also displays user defined from app interaction such as
spacecraftsOnPlanet, updated currentPopulation, candidates (spacecrafts) list users can choose
from, etc.

The PlanetCard is a presentational component that is driven entirely by props. Meaning,
in order for PlanetCard to show all of these features, all functions have to specified via 
destructing in the function signature.  The component does not fetch data itself.

The return JSX employs CSS module methods, as well as, array methods that map over lists. 
In React, it is fundamental that array methods are non-mutating.

React series 27 videos (Tech with Nader YouTube channel):
https://www.youtube.com/watch?v=qnrYvsBdtD8&list=PLovN13bqAx7CKHNJnW3npFEXlXUQBghNI

Rendering Lists:
https://react.dev/learn/rendering-lists

*/

