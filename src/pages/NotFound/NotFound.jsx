import { Link } from "react-router-dom";

import "./NotFound.css";

export default function NotFound() {
    return (
        <div className="not-found-page">

            <div className="not-found-card">

                <div className="not-found-code">
                    404
                </div>

                <div className="not-found-icon">
                    ?
                </div>

                <p className="not-found-eyebrow">
                    Page Not Found
                </p>

                <h1>
                    We couldn't find that page.
                </h1>

                <p className="not-found-description">
                    The page you're looking for may have been moved,
                    deleted, or the URL may be incorrect.
                </p>

                <div className="not-found-actions">

                    <Link
                        to="/dashboard"
                        className="not-found-primary-button"
                    >
                        Go to Dashboard
                    </Link>

                    <Link
                        to="/products"
                        className="not-found-secondary-button"
                    >
                        View Products
                    </Link>

                </div>

            </div>

        </div>
    );
}