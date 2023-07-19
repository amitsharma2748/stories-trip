function Toggler(trigerSelector, trigedSelector, leftorRight) {
  const triger = document.querySelector(trigerSelector);
  const trigedItem = document.querySelector(trigedSelector);
  //   const trigedItemClose = trigedItem.querySelector(".cls-btn");

  function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      right: rect.right,
      top: rect.top + window.scrollY + el.offsetHeight + 2,
    };
  }

  function init() {
    triger.addEventListener("click", trigedItemClick);
    document.addEventListener("click", (event) => {
      const targetElement = event.target;
      if (
        !triger.contains(targetElement) &&
        !trigedItem.contains(targetElement)
      ) {
        if (trigedItem.style.display === "block") {
          trigedItem.style.display = "none";
        }
      }
    });
  }

  function trigedItemClick() {
    trigedItem.style.marginLeft = 0;
    trigedItem.style.top = getOffset(triger).top + "px";
    leftorRight === "left"
      ? (trigedItem.style.left = getOffset(triger).left + "px")
      : (trigedItem.style.right =
          window.innerWidth - getOffset(triger).right + "px");

    if (trigedItem.style.display === "block") {
      trigedItem.style.display = "none";
    } else {
      const prefix = "toggled";
      document.querySelectorAll(`[class^="${prefix}"]`).forEach((element) => {
        element.style.display = "none";
      });
      trigedItem.style.display = "block";
    }
  }
  init();
}
const toggler1 = new Toggler(".toggle-btn1", ".toggled1", "left");
const toggler2 = new Toggler(".toggle-btn2", ".toggled2", "left");
const toggler3 = new Toggler(".toggle-btn3", ".toggled3", "left");
const toggler4 = new Toggler(".toggle-btn4", ".toggled4", "right");
