function Slider(containerSelector, prevBtnSelector, nextBtnSelector) {
  const container = document.querySelector(containerSelector);
  const slidesContainer = container.querySelector(".slides");
  const slideCard = slidesContainer.querySelector(".slide-card");
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);
  const slidesLength = slidesContainer.children.length;
  const slidesWidth = slidesContainer.offsetWidth;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;
  let slideNo = 1;
  function init() {
    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);
    slidesContainer.addEventListener("mousedown", dragStart);
    slidesContainer.addEventListener("touchstart", dragStart);
    slidesContainer.addEventListener("mouseup", dragEnd);
    slidesContainer.addEventListener("touchend", dragEnd);
    slidesContainer.addEventListener("mousemove", drag);
    slidesContainer.addEventListener("touchmove", drag);
    slidesContainer.addEventListener("mouseleave", dragEnd);   
  }
  function dragStart(event) {
    // event.preventDefault();
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    slidesContainer.classList.add("grabbing");
  }
  function dragEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID); 
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100) {
      nextSlide();
    } else if (movedBy > 100) {
      prevSlide();
    } else {
      if (currentTranslate > 0) {
        currentTranslate = 0;
      }      
      slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
    }
    slidesContainer.classList.remove("grabbing");
  }
  function drag(event) {    
    if (isDragging) {      
      const currentPosition = getPositionX(event);
      currentTranslate = prevTranslate + currentPosition - startPos;
      event.preventDefault();
    }
  }
  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }





  function prevSlide() {
    --slideNo;
    const marginValue =
    slidesContainer.querySelector(".slide-card").currentStyle ||
    window.getComputedStyle(slidesContainer.querySelector(".slide-card")),
    totalWitdth =slidesContainer.clientWidth +
    parseFloat(marginValue.marginLeft) +
    parseFloat(marginValue.marginRight);
    if (slideNo === 0) {
      slideNo = 1;
    }   
    if (currentTranslate === 0) {
      console.log("currentTranslate");
      currentTranslate =
      -(totalWitdth * (slidesContainer.children.length - 1))
    };
    
    currentTranslate +=   totalWitdth;
    slideTransition();
  }




  function nextSlide() {
    ++slideNo;
    const marginValue =
    slidesContainer.querySelector(".slide-card").currentStyle ||
    window.getComputedStyle(slidesContainer.querySelector(".slide-card")),
    totalWitdth=slidesContainer.clientWidth+
      parseFloat(marginValue.marginLeft) +
      parseFloat(marginValue.marginRight);
     

    if (
      currentTranslate ===
      -(totalWitdth * (slidesContainer.children.length - 1))
    )
    {
      console.log("currentTranslate next",currentTranslate);
      currentTranslate =0;
    }
     
    currentTranslate -= totalWitdth;
    slideTransition();
  }






  function slideTransition() {
    // if (currentTranslate > 0) {
    //   currentTranslate = 0;
    // }    
    // const marginValue =
    // slidesContainer.querySelector(".slide-card").currentStyle ||
    // window.getComputedStyle(slidesContainer.querySelector(".slide-card")),
    // margin =
    //   parseFloat(marginValue.marginLeft) +
    //   parseFloat(marginValue.marginRight),
    // slideTotalWidth =
    //   slidesContainer.querySelector(".slide-card").offsetWidth + margin;
    // slidingCount = Math.ceil(
    // slidesContainer.children.length / (slidesWidth / slideTotalWidth));
    // if (currentTranslate < -(slidesWidth * (slidingCount - 1))) {      
    //   currentTranslate = 0;
    // }    
    slidesContainer.style.transform = `translateX(${currentTranslate}px)`;   
    prevTranslate = currentTranslate;
  }
  function animation() {
    animationID = requestAnimationFrame(animation);
  }
  // Call init() to set up the slider when the instance is created
  init();
  
}

// Usage example
const slider1 = new Slider(".slider1", ".prev1", ".next1");
const slider2 = new Slider(".slider2", ".prev2", ".next2");
const slider6 = new Slider(".slider6", ".prev6", ".next6");
