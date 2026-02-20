import { Link } from 'react-router-dom';
import styles from './SpacecraftsPage.module.css';

export default function SpacecraftsPage ({ 
  spacecrafts = [], 
  onDestroySpacecraft,
  error,
  isLoading
}) 

{ 
    if (isLoading) return <div>Loading...</div>;
    onDestroySpacecraft, error 
    
    
      if (error) return <div>Error: {String(error)}</div> 
  
      return (
        <main className={styles.page}>
        <div className={styles.header}>
          <h3>Spacecrafts</h3>
          <div className={styles.count}>Count: {spacecrafts.length}</div>
           </div>

         <ul className={styles.list}>
            {spacecrafts.map((spacecraft) => (
                <li key ={spacecraft.id} className={styles.card}>

                <strong className={styles.name}>{spacecraft.name}</strong>

                <div className={styles.actions}>
                <Link 
                className={styles.link}
                to={`/spacecrafts/${spacecraft.id}`}
                >
                View Details
                </Link>

                <button 
                className={styles.destroy}
                onClick={() => onDestroySpacecraft(spacecraft.id)}
                disabled={isLoading}
                >
                {isLoading ? "Removing..." : "Destroy"}
                </button>

                 </div>
                </li>
               ))}
           </ul>
        </main>
    );
}

/*Notes:
Refer to SpacecraftPage (singular).

This page displays all spacecraft and allows users to View Details or Destroy spacecraft.

Note: when a user destroys a spacecraft, the population on the planet does not change. 
This is a no kill app.

Since both the SpacecraftsPage and the PlanetsPage need to keep track of spacecraft list in order
to display when a spacecraft has been destroyed or reassigned, the spacecraft state lives 
in App.jsx.

*/
