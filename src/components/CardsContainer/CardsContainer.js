import Switch from "../Switch/Switch";
import { useSelector } from "react-redux";
import { useRef } from "react";
import Card from "../Card/Card";
import stl from "./cardsContainer.module.css";
import { useSwipe } from "../../hooks/useSwipe";

export let refCards = null;

export const CardsContainer = () => {
  const statistic = useSelector((state) => state.likes);
  const page = statistic;
  const cards = useRef(null);
  refCards = cards.current;
  const swipeHandler = useSwipe(refCards);

  return (
    <div className={stl.main}>
      <div className={stl.block}>
        <div className={stl.container} {...swipeHandler}>
          <div className={stl.cards} ref={cards}>
            {page.map((item, i) => (
              <Card item={item} key={i} />
            ))}
          </div>
        </div>
      </div>
      <Switch />
    </div>
  );
};
