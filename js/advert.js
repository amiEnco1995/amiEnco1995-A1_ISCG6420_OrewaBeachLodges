 // to open the car advertiser website
 function openAdSite() {
    window.open("https://www.ferrari.com/en-NZ");
  }
  // restart the car advertisement
  let restartButton = document.querySelector("#restartButtonAd");
  restartButton.addEventListener("click", restartAnimation, false);

  function restartAnimation(event) {
    let el = document.querySelectorAll(".advert");

    for (let i = 0; i < el.length; i++) {
      el[i].style.animationName = "none";
      requestAnimationFrame(() => {
        el[i].style.animationName = "";
      });
    }
  }