import { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading.jsx';
import SpaceCraftCard from '../../components/SpacecraftCard/SpacecraftCard.jsx';

import styles from "./SpacecraftPage.module.css";


export default function SpacecraftPage  ({
    spacecrafts = [],
    planets = [],
    onDestroySpacecraft,
    onSendSpacecraftToPlanet,
    error,
    isLoading: isAppLoading,
})

{
    const navigate = useNavigate();
    const { spacecraftId } = useParams();

    const [targetPlanetId, setTargetPlanetId] = useState('');
    const [submitError, setSubmitError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const spacecraft = useMemo(() => {
        const list = Array.isArray(spacecrafts) ? spacecrafts : [];
        return list.find((sc) => String(sc.id) === String(spacecraftId)) ?? null;
    }, [spacecrafts, spacecraftId]);

    if (isAppLoading) return <Loading />;

    if (!spacecraft) {
        return (
            <div>
                <p>Spacecraft not found.</p>
                <Link to="/spacecrafts" className={styles.backLink}>
                    Back to List
                </Link>
            </div>
        );
    }

    const currentPlanet = planets.find(
    (p) => Number(p.id) === Number(spacecraft.currentLocation)
    );

    async function handleDecommission() {
        setSubmitError(null);

        const ok = window.confirm (
        `Decommission "${spacecraft.name}"? This action cannot be undone.`);
        if (!ok) return;

    try {
        await onDestroySpacecraft?.(spacecraft.id);
        navigate('/spacecrafts');
    } catch (error) {
        setSubmitError(error?.message ?? String(error));
    }
}

function validateDispatch() {
    if (!targetPlanetId) return "Select a planet";
    if (Number(targetPlanetId) === Number(spacecraft.planetId)) {
        return "Spacecraft is already on this planet";
    }
    return null;
}

async function handleDispatch(e) {
    e.preventDefault();
    setSubmitError(null);

    const validationMsg = validateDispatch();
    if (validationMsg) {
        setSubmitError(validationMsg);
        return;
    }

    try {
        setIsSubmitting(true);
        await onSendSpacecraftToPlanet?.(spacecraft.id, targetPlanetId);
        setTargetPlanetId('');
    } catch (error2) {
        setSubmitError(error2?.message ?? String(error2));
    } finally {
        setIsSubmitting(false);
    }
}

  return (
    <div>
      <h4>{spacecraft.name}</h4>
      <SpaceCraftCard spacecraft={spacecraft} showDetailsLink={false} />

      {error && <p className="error">Error: {String(error)}</p>}
      {submitError && <p className="error">Error: {String(submitError)}</p>}

    <p>
        Currently at: {""} 
        {currentPlanet ? currentPlanet.name : `Planet #${spacecraft.currentLocation}`}
    </p>

    <div className={styles.actions}>
      <form onSubmit={handleDispatch} className={styles.dispatchRow}>
      <label className={styles.label}>
        Send to planet:
        </label>

        <select 
            className={styles.select}
            value={targetPlanetId}
            onChange={(e) => setTargetPlanetId(e.target.value)}
            disabled={isSubmitting}
        >
            <option value="">--Select a planet--</option>
            {planets.map((planet) => (
                <option key={planet.id} value={planet.id}>
                    {planet.name}
                </option>
            ))}
        </select>
    

      <button 
        type="submit" 
        className={styles.primaryBtn} 
        disabled={isSubmitting || !targetPlanetId}
        >
            {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>

     <button type="button" className={styles.dangerBtn} 
             onClick={handleDecommission} disabled={isSubmitting}>
             Decommission Spacecraft
      </button>

      {submitError && <p className={styles.error}>{submitError}</p>}

      <Link to="/spacecrafts" className={styles.backLink}>
        Back to List
      </Link>
   </div>

   </div>
  );
}

/*Notes:
Architecture + data flow:

When the user builds a spacecraft, the details are stored in state and displayed in the Spacecraft
(plural) page, which uses the SpacecraftCard component for rendering. 

The Spacecrafts page shows a list of all available spacecraft and a View Details link for each.
When this link is clicked, the user is navigated to the SpacecraftPage (singular).

The SpacecraftPage is responsible for displaying the details of a single selected spacecraft.
Because this page is loaded through a route parameter (spacecraftId), it must determine which
spacecraft to display.
This is done by:
1. reading the spacecraftId from the URL using useParams
2. retrieving the list of spacecraft from the mock API
3. use .find() method to locate the spacecraft whose ID matches the route parameter
4. once found, the spacecraft data is passed to SpacecraftCard to render on page

"How find(), filter(), and some() methods are useful in React"
https://medium.com/@rutikpanchal121/how-find-filter-and-some-methods-are-useful-in-react-989cd7ab6b89


*/





