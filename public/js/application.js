let slider = document.querySelector(".slidecontainer");

slider.addEventListener("submit", async function(event) {
  event.preventDefault();
  console.log();

  let response = await fetch(event.target.action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify({ range: event.target.range.value })
  });

  let result = await response.json();
  if (result.operations) {
    slider.innerHTML = "Спасибо за ваш отзыв!";
  }
});
