import { Link } from "react-router-dom";
import "./AuthLayout.css";

export default function AuthLayout({
    title,
    subtitle,
    children,
    footerText,
    footerLinkText,
    footerLink
}) {
    return (
        <div className="auth-page">

            <div className="auth-card">

                <Link to="/" className="auth-brand">
                    Product<span>Hub</span>
                </Link>

                <div className="auth-header">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>

                {children}

                <div className="auth-footer">
                    <span>{footerText}</span>{" "}
                    <Link to={footerLink}>
                        {footerLinkText}
                    </Link>
                </div>

            </div>

        </div>
    );
}