"use strict";

let form = document.querySelector("form");
form.addEventListener("submit", event => {
  let usernameValue = document.getElementById('usernameInput').value;
  getRepos(usernameValue);
  event.preventDefault();
});

function getRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson));
}

function displayResults(responseJson) {
  clearResults();

  for (let i = 0; i < responseJson.length; i++) {
    let newEl = document.createElement('div');
    newEl.innerHTML = `<p><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></p>`;
    let ref = document.querySelector('div.listResults');

    insertAfter(newEl, ref);
  }
}

function insertAfter(el, referenceNode) {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}

function clearResults() {
  console.log('clearResults() ran');

  // document.getElementById('listResults').innerHTML = "";
  // let c = document.getElementById("listResults");
  // while (c.lastChild) c.removeChild(c.lastChild);

  let myNode = document.querySelector('div.listResults');

  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

}