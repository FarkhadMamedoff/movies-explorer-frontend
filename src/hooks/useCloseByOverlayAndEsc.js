import React from "react";

export default function useCloseByOverlayAndEsc(onBurgerClick, closeInfoTooltip, isInfoTooltipOpen, isBurgerOpen) {

  React.useEffect(() => {
    function handleOverlayClick(e) {
      if (e.target.classList.contains("info-tooltip")) {
        if (isInfoTooltipOpen) {
          closeInfoTooltip();
        }
      } else if (e.target.classList.contains("navigation__background")) {
        onBurgerClick(isBurgerOpen);
      }
    }

    function handleEscapeClick() {
      if (isInfoTooltipOpen) {
        closeInfoTooltip();
      } else if (isBurgerOpen) {
        onBurgerClick(isBurgerOpen);
      }
    }

    document.addEventListener("mousedown", handleOverlayClick);
    document.addEventListener("keyup", handleEscapeClick);

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
      document.removeEventListener("keyup", handleEscapeClick);
    };
  }, [closeInfoTooltip, isInfoTooltipOpen, isBurgerOpen, onBurgerClick]);
}