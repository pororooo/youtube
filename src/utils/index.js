export const swipeLeft = (currentPage, cards) => {
  cards.style = `transition-duration: 500ms;`;
  const transformLeft = (currentPage - 1) * cards.clientWidth;
  cards.style.transform = `translate(-${transformLeft}px)`;
};

export const swipeRight = (currentPage, cards) => {
  cards.style = `transition-duration: 500ms;`;
  const transformRight =
    currentPage * cards.clientWidth - cards.clientWidth;
  cards.style.transform = `translate(-${transformRight}px)`;
};
