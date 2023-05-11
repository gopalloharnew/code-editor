console.log("Happy Code");

import { toggleFullScreen } from "./toggleFullScreen.js";

// variables and constants
const LOCAL_STORAGE_KEY = "localCode";
const SAVE_DELAY = 250;
const app = document.querySelector(".app");
const editorTextarea = document.querySelector("[data-editor-textarea]");
const languageTabButtons = [
  ...document.querySelectorAll(".language-tab-button"),
];
const resultIframe = document.querySelector(".result-iframe");
let editorTimeout;

// fullScreenButton
const fullScreenButton = document.querySelector(".full-screen-button");
fullScreenButton.addEventListener("click", () => {
  toggleFullScreen(document, window);
});

// code editor

function renderCode() {
  app.dataset.currentEditorLanguage = code.currentEditorLanguage;
  editorTextarea.value = code[code.currentEditorLanguage];
}

function renderPage() {
  resultIframe.srcdoc = `
  <html>
    <head>
      <style>
        ${code.css}
      </style>
    </head>
    <body>
      ${code.html}
      <script>
        ${code.js}
      </script>
    </body>
  </html>
  `;
}

function saveCode() {
  code[app.dataset.currentEditorLanguage] = editorTextarea.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(code));
  renderPage();
}

function switchLanguage(language) {
  if (code.currentEditorLanguage == language) return;
  // order must be same
  code.currentEditorLanguage = language;
  saveCode();
  renderCode();
  editorTextarea.focus();
}

function autoResize() {
  editorTextarea.style.height = "auto";
  editorTextarea.style.height = editorTextarea.scrollHeight + "px";
}

languageTabButtons.forEach((languageTabButton) => {
  languageTabButton.addEventListener("click", () => {
    switchLanguage(languageTabButton.dataset.languageTabButton);
  });
});

// working
let code = {};

if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
  code = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
} else {
  code = {
    html: ``,
    css: ``,
    js: ``,
    currentEditorLanguage: "html",
  };
}

editorTextarea.addEventListener("input", (e) => {
  clearTimeout(editorTimeout);
  editorTimeout = setTimeout(saveCode, SAVE_DELAY);
  autoResize();
});

renderCode();
renderPage();

// editor configuration
function setEditorConfiguration(configuration) {
  app.dataset.editorConfiguration = configuration;
}

if (window.innerWidth < window.innerHeight) {
  setEditorConfiguration("vertical");
} else {
  setEditorConfiguration("horizontal");
}

autoResize();
