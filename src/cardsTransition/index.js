export const cards = document.getElementsByClassName("card");

export const swipeLeft = (currentPage) => {
  [...cards].forEach((child) => {
    child.style = `transition-duration: 500ms;`;
  });

  if (window.innerWidth <= 426) {
    [...cards].forEach((child) => {
      child.style.transform = `translate(-${(currentPage - 1) * 350}px)`;
    });
  } else {
    [...cards].forEach((child) => {
      child.style.transform = `translate(-${(currentPage - 1) * 1200}px)`;
    });
  }
};

export const swipeRight = (currentPage) => {
  [...cards].forEach((child) => {
    child.style = `transition-duration: 500ms;`;
  });

  if (window.innerWidth <= 426) {
    if (currentPage === 1 && (currentPage + 1) * 350 - 700 < 0) {
      [...cards].forEach((child) => {
        child.style.transform = `translate(${(currentPage + 1) * 350 - 700}px)`;
      });
    }
    [...cards].forEach((child) => {
      child.style.transform = `translate(-${currentPage * 350 - 350}px)`;
    });
  } else {
    if (currentPage === 1 && (currentPage + 1) * 1200 - 2400 < 0) {
      [...cards].forEach((child) => {
        child.style.transform = `translate(${
          (currentPage + 1) * 1200 - 2400
        }px)`;
      });
    }
    [...cards].forEach((child) => {
      child.style.transform = `translate(-${currentPage * 1200 - 1200}px)`;
    });
  }
};
