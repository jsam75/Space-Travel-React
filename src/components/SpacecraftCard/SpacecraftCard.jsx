import { Link } from 'react-router-dom';

export default function SpacecraftCard({ spacecraft, showDetailsLink = true }) {
    return (
        <li>
            <div>
                <h4>Name: {spacecraft.name}</h4>
                <p>Capacity: {spacecraft.capacity}</p>
                <p>Description: {spacecraft.description}</p>
                <p>Picture: {spacecraft.pictureUrl}</p>
            </div>
       
            {showDetailsLink && (
            <Link to={`/spacecrafts/${spacecraft.id}`}>
            View Details
            </Link>
            )}
        </li>
        
    );
}

/*Notes:
See notes for PlanetCard.

Want View Details link to be available anywhere that may use this card. But may not want
View Details to always be shown when it does not make sense for UX. By setting it to true here,
can set to false elsewhere and hide the link.

<Activity>
https://react.dev/reference/react/Activity

Stack Overflow posts
*/