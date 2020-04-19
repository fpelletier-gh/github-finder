import { fetchApi, $ } from "./utils";

const API_URL = "https://api.github.com/users/";

function getUserData(apiUrl, user = "") {
  const userUrl = apiUrl + user;
  fetchApi(userUrl, showUserData);
}

function showUserData(data, err) {
  if (err) {
    displayErrorMessage(true, "You must provide a valid Github username")
  } else {
    displayErrorMessage(false)
    displayUserCard(data);
  }
}

function displayErrorMessage(visible = false, message = ""){
  if (visible) {
    validationErrorMessage.classList.remove("novisible");
    validationErrorMessage.innerText = message
  } else {
    validationErrorMessage.classList.add("novisible");
    validationErrorMessage.innerText = ""
  }

}

function handleSubmitButtonClick(e) {
  e.preventDefault();
  getUserData(API_URL, userNameInput.value);
}

function handleUserNameInput(e) {
  if (e.target.value) {
    validationErrorMessage.classList.add("novisible");
    submitButton.disabled = false;
  } else {
    console.log("empty string : ", e.target.value);
    submitButton.disabled = true;
  }
}

function displayUserCard(data) {
  const userCard = createUserCard(data);
  userCardContainer.appendChild(userCard);
}

function createElementWithText(element, text, attributes = {}) {
  const newElement = document.createElement(element);
  const node = document.createTextNode(text);
  newElement.appendChild(node);

  for (let attribute in attributes) {
    if (attributes.hasOwnProperty(attribute)) {
      newElement.setAttribute(attribute, attributes[attribute]);
    }
  }

  return newElement;
}

function appendAllChild(element, childArray) {
  childArray.forEach((child) => {
    element.appendChild(child);
  });
}

function createUserCard(data) {
  const { avatar_url, bio, html_url, id, name } = data;
  const card = createElementWithText("article", "", {
    id: id,
    class: "user-card",
  });
  const avatar = createElementWithText("img", "", {
    src: avatar_url,
    alt: name,
  });
  const title = createElementWithText("h2", name);
  const paragraph = createElementWithText("p", bio);
  const link = createElementWithText("a", "Github page", { href: html_url });
  const deleteButton = createElementWithText("button", "delete", {
    class: "delete-button",
  });
  appendAllChild(card, [avatar, title, paragraph, link, deleteButton]);
  addUser(card);
  return card;
}

let users = [];

function addUser(user) {
  users.push(user);
  localStorage.setItem("users", users);
  console.log(users);
}

function removeUser(id) {
  let newUserArr = users.filter((user) => user.id !== id);
  users = [...newUserArr];
  localStorage.setItem("users", users);
  console.log(users);
  let el = document.getElementById(id);
  el.remove();
}

function removeUserCard(e) {
  removeUser(e.target.parentElement.id);
}

const userCardContainer = $("#user-card-container");
const userNameInput = $("#user-input");
const submitButton = $("#submit-button");
const validationErrorMessage = $("#validation__error-message");

userNameInput.addEventListener("input", handleUserNameInput, false);
submitButton.addEventListener("click", handleSubmitButtonClick, false);
userCardContainer.addEventListener("click", removeUserCard);
