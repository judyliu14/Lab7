// script.js

import { router } from "./router.js"; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener("DOMContentLoaded", () => {
  fetch("https://cse110lab6.herokuapp.com/entries")
    .then((response) => response.json())
    .then((entries) => {
      entries.forEach((entry) => {
        let newPost = document.createElement("journal-entry");
        newPost.entry = entry;
        document.querySelector("main").appendChild(newPost);
      });
    });
});

document.addEventListener("click", invokeSetstate);

function invokeSetstate(event) {
  console.log(event.target);
  for (let i = 0; i < document.querySelector("main").childNodes.length; i++) {
    if (event.target === document.querySelector("main").childNodes[i]) {
      console.log(event.state);
      setState(event.state, i + 1);
    }
  }
  // settings
  if (event.target === document.querySelector("img")) {
    setState(event.state, 0);
  }
  // Journal Entries
  if (event.target === document.querySelector("h1")) {
    setState(event.state, -1);
  }
}

window.onpopstate = function (event) {
  console.log(
    `location: ${document.location}, state: ${JSON.stringify(event.state)}`
  );

  // previous state was no state
  if (event.state === null) {
    document.body.removeAttribute("class", "single-entry");
    document.querySelector("h1").innerHTML = "Journal Entries";
  }
  // deal with clicking settings in settings page
  else if (event.state.page === 0) {
    history.back();
  }
  // previous state was settings
  else {
    document.body.setAttribute("class", "single-entry");
    document.querySelector("h1").innerHTML = "Journal Entries";
  }
};
