const questions = [
  "cagar verde normal",
  "como hacer cubo rubik",
  "que se celebra 15 de agosto y porque",
  "no dormir una noche que pasa",
  "xq agua es liquida",
  "como allanar un barranco",
  "tomate fruta verdura?",
  "cancion tan tan tan tann nombre",
  "como saber si alguien te ha bloqueado",
  "porque no carga una pagina web"
];

let index = 0;
let satisfaction = 50;
let opinion = "neutral";
let level = 1;

function addMessage(text, type) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.classList.add("msg", type);
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function getElgoogResponse(score) {

  const low = ["no entiendo", "raro esto", "no se"];
  const mid = ["puede ser", "entiendo mas o menos"];
  const high = ["ok correcto", "tiene sentido"];
  const glitch = ["cagar verde normal", "agua liquida si"];

  if (score <= 3) return low[Math.floor(Math.random()*low.length)];
  if (score <= 6) return mid[Math.floor(Math.random()*mid.length)];
  if (score <= 8) return high[Math.floor(Math.random()*high.length)];
  return glitch[Math.floor(Math.random()*glitch.length)];
}

function submitAnswer() {

  const input = document.getElementById("input");
  const answer = input.value;
  if (!answer) return;

  const question = questions[index];

  // 1. usuario responde
  addMessage("usuario: " + answer, "user");

  // score
  let score = 5;

  if (answer.length < 3) score -= 2;
  if (answer.length > 20) score += 1;
  if (answer.includes("porque")) score += 2;
  if (answer.includes("es") || answer.includes("significa")) score += 1;
  if (answer === "a" || answer === "no" || answer === "que") score -= 3;

  score = Math.max(0, Math.min(10, score));

  // 2. elgoog responde FINAL
  const response = getElgoogResponse(answer, score);
  addMessage("elgoog: " + response, "elgoog");

  // perfil
  if (score >= 7) {
    satisfaction += 10;
    opinion = "elgoog confia en ti";
  } else {
    satisfaction -= 5;
    opinion = "elgoog duda";
  }

  satisfaction = Math.max(0, Math.min(100, satisfaction));

  updateUI();

  input.value = "";

  // 3. PASA A SIGUIENTE RONDA (SIN MENSAJES EXTRA)
  setTimeout(() => {
    index = (index + 1) % questions.length;
    addMessage("elgoog: " + questions[index], "elgoog");
  }, 600);
}

  // 1. usuario responde
  addMessage("usuario: " + answer, "user");

  // score
  let score = 5;

  if (answer.length < 3) score -= 2;
  if (answer.length > 20) score += 1;
  if (answer.includes("porque")) score += 2;
  if (answer.includes("es") || answer.includes("significa")) score += 1;
  if (answer === "a" || answer === "no" || answer === "que") score -= 3;

  score = Math.max(0, Math.min(10, score));

  // 2. elgoog responde FINAL
  const response = getElgoogResponse(answer, score);
  addMessage("elgoog: " + response, "elgoog");

  // perfil
  if (score >= 7) {
    satisfaction += 10;
    opinion = "elgoog confia en ti";
  } else {
    satisfaction -= 5;
    opinion = "elgoog duda";
  }

  satisfaction = Math.max(0, Math.min(100, satisfaction));

  updateUI();

  input.value = "";

  // 3. PASA A SIGUIENTE RONDA (SIN MENSAJES EXTRA)
  setTimeout(() => {
    index = (index + 1) % questions.length;
    addMessage("elgoog: " + questions[index], "elgoog");
  }, 600);
}
  addMessage("usuario: " + answer, "user");

  let score = 5;

  if (answer.length > 40) score++;
  if (answer.includes("porque")) score++;

  const response = getElgoogResponse(score);

  addMessage("elgoog: " + response, "elgoog");

  if (score >= 7) {
    satisfaction += 10;
    opinion = "confia en ti";
  } else {
    satisfaction -= 5;
    opinion = "duda";
  }

  satisfaction = Math.max(0, Math.min(100, satisfaction));

  updateUI();

  input.value = "";
}

function nextQuestion() {
  index = (index + 1) % questions.length;
  addMessage("elgoog: " + questions[index], "elgoog");
}

function updateUI() {
  document.getElementById("elgoogOpinion").innerText = opinion;
  document.getElementById("satisfaction").innerText = satisfaction + "%";

  if (satisfaction > 70) level = 3;
  else if (satisfaction > 40) level = 2;
  else level = 1;

  document.getElementById("level").innerText = "nivel " + level;
}

addMessage("elgoog: " + questions[0], "elgoog");
updateUI();
