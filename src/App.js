import Search from "./components/Search";
import "../src/assets/style.css";
import { Card } from "./components/Card";
const App = () => {
  return (
    <div className="main">
      <Search />
      <Card />
    </div>
  );
};
export default App;
