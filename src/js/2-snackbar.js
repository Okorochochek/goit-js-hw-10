import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", event => {
  event.preventDefault();

  const delay = Number(form.delay.value);
  const state = form.state.value;

  createPromise(delay, state)
    .then(msg => {
      iziToast.success(
        { title: "Success", 
        message: msg,
        position: "topRight",
        backgroundColor:"#59a10d"});
    })
    .catch(msg => {
      iziToast.error(
        { title: "Error", 
        message: msg,
        position: "topRight",
        backgroundColor: "#ef4040" });
    });
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
