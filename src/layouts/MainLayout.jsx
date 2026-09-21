import Navbar from "../components/Navbar/Navbar";
import "./MainLayout.css";

export default function MainLayouts({children}) {
    return (
        <div className="app-layout">
            <Navbar />
            <main className="main-content" >
                <div className="page-container">
                    {children}
                </div>
            </main>

        </div>
    );
}