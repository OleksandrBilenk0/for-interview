document.addEventListener("DOMContentLoaded", () => {
  function maskInput(input) {
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "");
    });
  }

  const telInputs = document.querySelectorAll("[name='tel']");

  telInputs.forEach((telInput) => {
    telInput.addEventListener("click", () => {
      setCursorPosition(telInput, 4);
    });

    maskInput(telInput, "971 dd ddd dd dd?dddddddddd");
  });
});

function setCursorPosition(input, pos) {
  if (input.setSelectionRange) {
    input.setSelectionRange(pos, pos);
  } else if (input.createTextRange) {
    const range = input.createTextRange();
    range.collapse(true);
    range.moveEnd("character", pos);
    range.moveStart("character", pos);
    range.select();
  }
}

function maskInput(input, pattern) {
  const maskDefinition = {
    9: "",
    d: "[0-9]",
  };

  const placeholder = "";
  const autoclear = false;

  const format = pattern.replace(/9|d/gi, (m) => maskDefinition[m]);
  const regex = new RegExp("^" + format + "$");

  input.addEventListener("input", () => {
    const unmaskedValue = input.value.replace(/\D/g, "");
    let maskedValue = "";

    let unmaskedIndex = 0;
    let patternIndex = 0;

    while (
      patternIndex < pattern.length &&
      unmaskedIndex < unmaskedValue.length
    ) {
      if (pattern[patternIndex] === "d") {
        maskedValue += unmaskedValue[unmaskedIndex++];
      } else {
        maskedValue += pattern[patternIndex];
      }
      patternIndex++;
    }

    if (regex.test(maskedValue)) {
      input.value = maskedValue;
    } else {
      input.value = input.value.substr(0, input.value.length - 1);
    }
  });
}

// const form = document.querySelector("form");

// form.addEventListener("submit", (event) => {
//   event.preventDefault(); 

//   const formData = new FormData(form);

//   fetch("https://jsonplaceholder.typicode.com/todos/1")
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("Network response was not ok");
//       }
//     })
//     .then((data) => {
//       console.log(data);
//       alert("Ура!");
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       alert("Сталась помилка при обробці запиту");
//     });
// });

const form = document.querySelector(".x_order_form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  fetch('https://jsonplaceholder.typicode.com/users', {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response.status);
      if (response.ok) {
        alert("Ура!");
        console.log("Ура!");
      } else {
        console.log("Помилка відповіді серверу");
      }
    })
    .catch((error) => {
      console.log("Помилка надсилання запиту");
    });
});
