import Switch from "../Switch/Switch";
import { useSelector } from "react-redux";
import { useRef } from "react";
import Card from "../Card/Card";
import stl from "./cardsContainer.module.css";
import useTouchSwipe from "../../hooks/useTouchSwipe";
import useMouseSwipe from "../../hooks/useMouseSwipe";

export let refCards = null;

export const CardsContainer = () => {
  const page = useSelector((state) => state.likes);
  const cards = useRef(null);
  refCards = cards.current;
  const swipeTouch = useTouchSwipe(refCards);
  const swipeMouse = useMouseSwipe(refCards)

  return (
    <div className={stl.main}>
      <div className={stl.block}>
        <div 
        {...swipeTouch}
        {...swipeMouse}
        className={stl.container} >
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
