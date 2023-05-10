console.log("Happy Code");

import { toggleFullScreen } from "./toggleFullScreen.js";

// fullScreenButton
const fullScreenButton = document.querySelector(".full-screen-button");
fullScreenButton.addEventListener("click", () => {
  toggleFullScreen(document, window);
});
