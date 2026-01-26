import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import spaceTravelService from '../../services/spaceTravelService.js';
import Loading from '../../components/Loading/Loading.jsx';
import SpaceCraftCard from '../../components/SpacecraftCard/SpacecraftCard.jsx';

import styles from "./SpacecraftPage.module.css";


export default function SpacecraftPage () {
    const { spacecraftId } = useParams();

    const [spacecraft, setSpacecraft] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function loadSpacecraft () {
          try{
            const response = await spaceTravelService.getSpacecrafts();

            if (response.isError) {
                setIsError(true);
                return;
            }   

        const list = Array.isArray (response.data) ? response.data : [];

        const found = list.find( (sc) => String(sc.id) === String(spacecraftId) );
        
        if (!found) {
            setIsError(true);
        } else {
            setSpacecraft (found);
        }

        setIsLoading(false);

    } catch (error) {
        console.log('Error fetching spacecraft:', error);
        setIsError(true);
        setIsLoading (false);
    }
}

    loadSpacecraft();
    }, [spacecraftId]);



    if (isLoading)  return <Loading />;

    if (isError || !spacecraft) {
        return <p>Spacecraft not found.</p>;
    }



  return (
    <div>
      <h4>{spacecraft.name}</h4>
      <SpaceCraftCard spacecraft={spacecraft} showDetailsLink={false} />

      <Link to="/spacecrafts" className={styles.backLink}>
        Back to List
      </Link>
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





