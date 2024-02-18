import Page from "./Pages";
import PageRefreshProvider from "./provider/PageRefreshProvider";
import TaskDataProvider from "./provider/TaskDataProvider";

const App = () => {
  return (
    <>
      <PageRefreshProvider>
        <TaskDataProvider>
          <Page />
        </TaskDataProvider>
      </PageRefreshProvider>
    </>
  );
};

export default App;