import Search from "./components/Search";
import "../src/assets/style.css";
import { CardsContainer } from "./components/CardsContainer";
const App = () => {
  return (
    <div className="main">
      <Search />
      <CardsContainer />
    </div>
  );
};
export default App;
