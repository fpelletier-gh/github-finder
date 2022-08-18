import { fetchApi, $ } from "./utils";

const API_URL = "https://api.github.com/users/";
let userCardList;

window.addEventListener("load", startup, false);

function startup() {
  const savedUser = JSON.parse(window.localStorage.getItem("users")) || [];
  userCardList = users(savedUser);
  if (savedUser.length > 0) {
    userCardList.displayLocalStorage();
    deleteAllButton.disabled = false;
  } else {
    deleteAllButton.disabled = true;
  }
}

function getUserData(apiUrl, user = "") {
  const userUrl = apiUrl + user;
  fetchApi(userUrl, showUserData);
}

function showUserData(data, err) {
  if (err) {
    displayErrorMessage(true, "You must provide a valid Github username");
  } else {
    displayErrorMessage(false);
    displayUserCard(data);
    const { avatar_url, bio, html_url, id, name } = data;
    userCardList.addUser({ avatar_url, bio, html_url, id, name });
  }
}

function displayErrorMessage(visible = false, message = "") {
  if (visible) {
    validationErrorMessage.classList.remove("d-none");
    validationErrorMessage.innerText = message;
  } else {
    validationErrorMessage.classList.add("d-none");
    validationErrorMessage.innerText = "";
  }
}

function handleSubmitButtonClick(e) {
  e.preventDefault();
  getUserData(API_URL, userNameInput.value.trim());
  userNameInput.value = "";
  submitButton.disabled = true;
}

function handleUserNameInput(e) {
  if (e.target.value) {
    displayErrorMessage(false);
    submitButton.disabled = false;
  } else {
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
    class: "card mb-4 p-1 pr-3",
    style: "max-width: 800px;",
  });
  const cardDiv = createElementWithText("div", "", { class: "row no-gutters" });
  const imgDiv = createElementWithText("div", "", {
    class: "col-md-4 p-3",
  });
  const avatar = createElementWithText("img", "", {
    src: avatar_url,
    alt: name,
    class: "rounded-circle card-img",
    style: "max-width: 200px;",
  });
  const cardBodyDiv = createElementWithText("div", "", {
    class: "col-md-8",
  });
  const cardBody = createElementWithText("div", "", {
    class: "card-body",
    style: "height: 100%;",
  });
  const cardBodyFlex = createElementWithText("div", "", {
    class: "d-flex flex-column justify-content-between",
    style: "height: 100%;",
  });
  const title = createElementWithText("h2", name, {
    class: "card-title align-self-start",
  });
  const paragraph = createElementWithText("p", bio, {
    class: "card-text align-self-start",
  });
  const linkDiv = createElementWithText("div", "", {
    class: "card-text d-flex justify-content-between",
  });
  const link = createElementWithText("a", "Github page", {
    href: html_url,
    class: "btn btn-primary",
  });
  const deleteButton = createElementWithText("button", "delete", {
    class: "btn btn-secondary",
    id: "delete-button",
  });
  appendAllChild(imgDiv, [avatar]);
  appendAllChild(linkDiv, [link, deleteButton]);
  appendAllChild(cardBodyFlex, [title, paragraph, linkDiv]);
  appendAllChild(cardBody, [cardBodyFlex]);
  appendAllChild(cardBodyDiv, [cardBody]);
  appendAllChild(cardDiv, [imgDiv, cardBodyDiv]);
  appendAllChild(card, [cardDiv]);
  return card;
}

function users(userList = []) {
  let userCardList = userList;

  function displayLocalStorage() {
    userCardList.forEach((user) => {
      displayUserCard(user);
    });
  }

  function addUser(user) {
    userCardList.push(user);
    window.localStorage.setItem("users", JSON.stringify(userCardList));
    deleteAllButton.disabled = false;
  }

  function removeUser(userId) {
    let newUserArr = userCardList.filter(
      (user) => user.id !== parseInt(userId)
    );
    userCardList = [...newUserArr];
    window.localStorage.setItem("users", JSON.stringify(userCardList));
    let el = document.getElementById(userId);
    el.remove();
    if (userCardList.length === 0) {
      deleteAllButton.disabled = true;
    }
  }

  function removeAllUser() {
    let userDeleteList = [...userCardList];
    if (userDeleteList.length > 0) {
      userDeleteList.forEach((user) => {
        this.removeUser(user.id);
      });
    }
  }

  return { displayLocalStorage, addUser, removeUser, removeAllUser };
}

function removeUserCard(e) {
  if (e.target.id === "delete-button") {
    userCardList.removeUser(
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.id
    );
  }
}

function handleDeleteAllButton() {
  userCardList.removeAllUser();
  deleteAllButton.disabled = true;
}

const userCardContainer = $("#user-card-container");
const userNameInput = $("#user-input");
const submitButton = $("#submit-button");
const validationErrorMessage = $("#validation__error-message");
const deleteAllButton = $("#delete-all-button");

userNameInput.addEventListener("input", handleUserNameInput, false);
submitButton.addEventListener("click", handleSubmitButtonClick, false);
userCardContainer.addEventListener("click", removeUserCard);
deleteAllButton.addEventListener("click", handleDeleteAllButton);
