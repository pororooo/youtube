import Search from "./components/Search/Search";
import "../src/assets/style.css";
import { CardsContainer } from "./components/CardsContainer/CardsContainer";
const App = () => {
  return (
    <div className="main">
      <Search />
      <CardsContainer />
    </div>
  );
};
export default App;
