import { NavLink } from "react-router-dom";

import styles from './Nav.module.css';
export default function Nav () {
    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>

            <div className={styles.brand}>
                <NavLink
                to="/" className={styles.link}>
                    Space Travel Agency
                </NavLink>
            </div>

            <ul className={styles.links}>

                <li>
                    <NavLink 
                    to="/"
                    className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                    >
                    Home
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                    to="/planets"
                    className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                    >
                    Planets
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                    to="/spacecrafts"
                    className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                    >
                    Spacecrafts
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                    to="/spacecrafts/new"
                    className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                    }
                    >
                    Build Spacecraft
                    </NavLink>
                </li>

             </ul>

         </div>
            
     </nav>
  );
}

/*Notes:
Refer to Nav.module.css

This page provides user navigation throughout the app. 
Use <NavLink /> because it can be styled. 

*/