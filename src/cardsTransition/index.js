export const cards = document.getElementsByClassName("card");

export const swipeLeft = (currentPage, difference = 0) => {
  [...cards].forEach((child) => {
    child.style = `transition-duration: 500ms;`;
  });

  if (window.innerWidth <= 426) {
    [...cards].forEach((child) => {
      child.style.transform = `translate(-${
        (currentPage - 1) * 350 - difference
      }px)`;
    });
  } else {
    [...cards].forEach((child) => {
      child.style.transform = `translate(-${
        (currentPage - 1) * 1200 - difference
      }px)`;
    });
    console.log((currentPage - 1) * 1200 - difference)
  }
};

export const swipeRight = (currentPage, difference = 0) => {
  [...cards].forEach((child) => {
    child.style = `transition-duration: 500ms;`;
  });

  if (window.innerWidth <= 426) {
    if (currentPage === 1 && (currentPage + 1) * 350 - 700 < 0) {
      [...cards].forEach((child) => {
        child.style.transform = `translate(${(currentPage + 1) * 350 - 700 + Math.abs(difference)}px)`;
      });
    }
    [...cards].forEach((child) => {
      child.style.transform = `translate(-${currentPage * 350 - 350 - Math.abs(difference)}px)`;
    });
  } else {
    if (currentPage === 1 && (currentPage + 1) * 1200 - 2400 < 0) {
      [...cards].forEach((child) => {
        child.style.transform = `translate(${
          (currentPage + 1) * 1200 - 2400 + Math.abs(difference)
        }px)`;
      });
    }
    [...cards].forEach((child) => {
      child.style.transform = `translate(-${currentPage * 1200 - 1200 - Math.abs(difference)}px)`;
    });
  }
};
