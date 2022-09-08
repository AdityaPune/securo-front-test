import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./app";

function Root() {
    const isApp = (): boolean => {
        return true; //window.location.host.includes("app");
    };

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // loadTokenPrices().then(() => setLoading(false));
    }, []);

    // if (loading) return <Loading />;

    const app = () => (
        <App />
    );

    return app()
}

export default Root;