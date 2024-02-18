import { useState } from "react";
import { pageRefreshContext } from "../context";

const PageRefreshProvider = ({ children }) => {

    const [refresh, setRefresh] = useState(1);

    return (
        <pageRefreshContext.Provider value={{ refresh, setRefresh }}>{children}
        </pageRefreshContext.Provider>
    );
};

export default PageRefreshProvider;