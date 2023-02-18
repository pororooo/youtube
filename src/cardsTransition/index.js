export const swipeLeft = (currentPage, cards, difference = 0) => {
  cards.style = `transition-duration: 500ms;`;

  cards.style.transform = `translate(-${
    (currentPage - 1) * cards.clientWidth - difference
  }px)`;
};

export const swipeRight = (currentPage, cards, difference = 0) => {
  cards.style = `transition-duration: 500ms;`;

  cards.style.transform = `translate(-${
    currentPage * cards.clientWidth - cards.clientWidth - Math.abs(difference)
  }px)`;
};
