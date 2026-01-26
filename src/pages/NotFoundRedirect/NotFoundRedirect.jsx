import { Link } from 'react-router-dom';

export default function NotFoundRedirect () {
    return (
        <div>
            <h1>Page Not Found</h1>
            <Link to="/">Return to Home Page</Link>
        </div>
    );
}
