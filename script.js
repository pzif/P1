const pergunta = document.getElementById("pergunta");
const resposta = document.getElementById("resposta");

pergunta.addEventListener("keypress", (e) => {
  if (pergunta.value && e.key === "Enter") SendQuestion();
});

const OPENAI_API_KEY = "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";

function SendQuestion() {
  var sQuestion = pergunta.value;

  fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: sQuestion,
      max_tokens: 2048, 
      temperature: 0.5, 
    }),
  })
    .then((response) => response.json())
    .then((json) => {
      if (resposta.value) resposta.value += "\n";

      if (json.error?.message) {
        resposta.value += `Error: ${json.error.message}`;
      } else if (json.choices?.[0].text) {
        var text = json.choices[0].text || "Sem resposta";

        resposta.value += "Chat GPT: " + text;
      }

      resposta.scrollTop = resposta.scrollHeight;
    })
    .catch((error) => console.error("Error:", error))
    .finally(() => {
      pergunta.value = "";
      pergunta.disabled = false;
      pergunta.focus();
    });

  if (resposta.value) resposta.value += "\n\n\n";

  resposta.value += `Eu: ${sQuestion}`;
  pergunta.value = "Aguarde...";
  pergunta.disabled = true;

  resposta.scrollTop = resposta.scrollHeight;

  
}

const carousel = document.getElementById('carousel');
const ul = carousel.querySelector('ul');
const prevBtn = carousel.querySelector('#prev');
const nextBtn = carousel.querySelector('#next');
const width = carousel.offsetWidth;

let pos = 0;

prevBtn.addEventListener('click', () => {
  pos = Math.max(pos - width, -width * (ul.children.length - 1));
  ul.style.transform = `translateX(${pos}px)`;
});

nextBtn.addEventListener('click', () => {
  pos = Math.min(pos + width, 0);
  ul.style.transform = `translateX(${pos}px)`;
});
