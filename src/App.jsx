import Page from "./Pages";
import TaskDataProvider from "./provider/TaskDataProvider";

const App = () => {
  return (
    <>
      <TaskDataProvider>
        <Page />
      </TaskDataProvider>
    </>
  );
};

export default App;