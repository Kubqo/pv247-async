import "./App.css";
import useLoggedInUser from "./hooks/useLoggedInUser";
import Login from "./pages/Login";
import Todos from "./pages/Todos";

const App = () => {
  const user = useLoggedInUser();

  return (
    <div className="App">
      <header className="App-header">{user ? <Todos /> : <Login />}</header>
    </div>
  );
};

export default App;
