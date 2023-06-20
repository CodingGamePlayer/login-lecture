"use strict";

const id = document.querySelector("#id"),
   psword = document.querySelector("#psword"),
   loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
   const req = {
      id: id.value,
      psword: psword.value,
   };

   fetch("/login", {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((res) => res.json())
      .then(console.log);
}
