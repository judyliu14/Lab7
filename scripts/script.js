// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
      });
    });
});

document.addEventListener('click', invokeSetstate)

function invokeSetstate(event) {
  console.log(event.target);
  for (let i = 0; i < document.querySelector("main").childNodes.length; i++) {
    if (event.target === document.querySelector("main").childNodes[i]) {
      setState(i+1);
    }
  }
} 

window.onpopstate = function(event) {
  alert(
    `location: ${document.location}, state: ${JSON.stringify(event.state)}`
  );
};