"use strict";

const id = document.querySelector("#id"),
   name = document.querySelector("#name"),
   psword = document.querySelector("#psword"),
   confirmPsword = document.querySelector("#confirm-psword"),
   registerBtn = document.querySelector("#button");

console.log("hello register");
registerBtn.addEventListener("click", register);

function register() {
   const req = {
      id: id.value,
      name: name.value,
      psword: psword.value,
      confirmPsword: confirmPsword.value,
   };

   fetch("/register", {
      method: "POST",
      body: JSON.stringify(req),
      headers: {
         "Content-Type": "application/json",
      },
   })
      .then((res) => res.json())
      .then((res) => {
         if (res.success) {
            location.href = "/login";
         } else {
            alert(res.msg);
         }
      })
      .catch((err) => {
         console.error("회원가입 중 에러 발생");
      });
}
