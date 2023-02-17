export const swipeLeft = (currentPage, cards, difference = 0) => {
  cards.style = `transition-duration: 500ms;`;
  let a = (currentPage - 1) * 1200 - difference;

  if (window.innerWidth <= 426) {
    cards.style.transform = `translate(-${
      (currentPage - 1) * 350 - difference
    }px)`;
  } else {
    cards.style.transform = `translate(-${(currentPage - 1) * 1200 - difference}px)`;

  }
};

export const swipeRight = (currentPage, cards, difference = 0) => {
  cards.style = `transition-duration: 500ms;`;

  if (window.innerWidth <= 426) {
    if (currentPage === 1 && (currentPage + 1) * 350 - 700 < 0) {
      cards.style.transform = `translate(${
        (currentPage + 1) * 350 - 700 - Math.abs(difference)
      }px)`;
    }
    cards.style.transform = `translate(-${
      currentPage * 350 - 350 - Math.abs(difference)
    }px)`;
  } else {
    if (currentPage === 1 && (currentPage + 1) * 1200 - 2400 < 0) {
      cards.style.transform = `translate(${
        (currentPage + 1) * 1200 - 2400 - Math.abs(difference)
      }px)`;
    }
    cards.style.transform = `translate(-${
      currentPage * 1200 - 1200 - Math.abs(difference)
    }px)`;
  }
};
