export function toggleFullScreen(document, window) {
  if (
    window.fullScreen ||
    (window.innerWidth == screen.width && window.innerHeight == screen.height)
  ) {
    document
      .exitFullscreen()
      .then(() => {
        delete document.body.dataset.fullScreen;
      })
      .catch((err) => {
        alert("cannot do it right now");
      });
  } else {
    document.body
      .requestFullscreen()
      .then(() => {
        document.body.dataset.fullScreen = "";
      })
      .catch((err) => {
        alert("cannot do it right now");
      });
  }
}
