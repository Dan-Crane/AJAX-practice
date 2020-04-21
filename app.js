//! UI
const btnGet = document.querySelector(".btn-get");
const ul = document.querySelector(".ul");
const form = document.forms["post-user"];
const name = form.elements["name"];
const email = form.elements["email"];
const username = form.elements["username"];
const phone = form.elements["phone"];
const website = form.elements["website"];
const btnSubmit = document.querySelector(".btn-submit");


//! events
btnGet.addEventListener("click", (e) => {
  getUsers(renderAllUsers);
});
ul.addEventListener("click", showDetalInfo);
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const newUser = {
    name: name.value,
    email: email.value,
    username: username.value,
    phone: phone.value,
    website: website.value,
  };

  postUser(newUser, (allUsers) => {
    const newPostUser = createUserElemet(allUsers);

    ul.insertAdjacentElement("afterbegin", newPostUser);
  });

  form.reset();
});

function getUsers(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", "https://jsonplaceholder.typicode.com/users");
  xhr.addEventListener("load", (e) => {
    const allUsers = JSON.parse(xhr.responseText);
    cb(allUsers);
  });

  xhr.addEventListener("error", (e) => {
    console.log("error");
  });

  xhr.send();
}

function postUser(body, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open("post", "https://jsonplaceholder.typicode.com/users");
  xhr.addEventListener("load", (e) => {
    const allUsers = JSON.parse(xhr.responseText);
    cb(allUsers);
  });

  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.addEventListener("error", (e) => {
    console.log("error");
  });

  xhr.send(JSON.stringify(body));
}

function renderAllUsers(allUsers) {
  const fragment = document.createDocumentFragment();

  allUsers.forEach((element) => {
    const user = createUserElemet(element);
    fragment.append(user);
  });
  ul.append(fragment);
}

function createUserElemet({ id, name, username, email, phone, website }) {
  const listGroup = document.createElement("li");
  listGroup.classList.add("list-group-item", "list-group-item-action");
  listGroup.textContent = name;

  const ul = document.createElement("ul");
  ul.classList.add("list-counter-circle", "no-active");

  const liUsername = document.createElement("li");
  liUsername.textContent = username;
  const liEmail = document.createElement("li");
  liEmail.textContent = email;
  const liPhone = document.createElement("li");
  liPhone.textContent = phone;
  const liWebsite = document.createElement("li");
  liWebsite.textContent = website;

  ul.append(liUsername);
  ul.append(liEmail);
  ul.append(liPhone);
  ul.append(liWebsite);

  listGroup.append(ul);

  return listGroup;
}

//* toggle detal info users
function showDetalInfo({ target }) {
  if (target.classList.contains("list-group-item")) {
    const childLi = target.firstElementChild;
    childLi.classList.toggle("no-active");
  }
}
