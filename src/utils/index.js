export const swipeLeft = (currentPage, cards, difference = 0) => {
  cards.style = `transition-duration: 500ms;`;
  const transformLeft = (currentPage - 1) * cards.clientWidth - difference;
  cards.style.transform = `translate(-${transformLeft}px)`;
};

export const swipeRight = (currentPage, cards, difference = 0) => {
  cards.style = `transition-duration: 500ms;`;
  const transformRight =
    currentPage * cards.clientWidth - cards.clientWidth - Math.abs(difference);
  cards.style.transform = `translate(-${transformRight}px)`;
};
