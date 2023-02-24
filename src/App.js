import Search from "./components/Search/Search";
import style from "./assets/style.module.css";
import { CardsContainer } from "./components/CardsContainer/CardsContainer";
const App = () => {
  return (
    <div className={style.main}>
      <Search />
      <CardsContainer />
    </div>
  );
};
export default App;
