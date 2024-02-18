import { createContext } from "react";

const taskDataContext = createContext([]);
const pageRefreshContext = createContext("");

export { pageRefreshContext, taskDataContext };
