
let intervalo;
//Fazendo a verificação da API
if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        console.log("Notificações autorizadas.");
      } else {
        console.log("Notificações bloqueadas.");
      }
    }); 
  }

//Funçao que irá iniciar o contador
function iniciarContador() {
  clearInterval(intervalo); 

//Variaveis que receberão valores que o usuario preencher ex: data e hora
const nomeEvento = document.getElementById("evento").value;
const dataHora = document.getElementById("dataHora").value;
    
//Validação para verificar se está vazio o campo nomeEvento
if (nomeEvento.trim() === "") {
alert("Por favor, digite o nome do evento.");
return;
}

//Validação para verificar se está vazio o campo dataHora
if (dataHora === "") {
alert("Por favor, selecione uma data válida para o evento.");
return;
}

//Essa variavel receberá o valor da data do evento que o usuario inserir
const dataEvento = new Date(dataHora);
    
    
    document.getElementById("nomeEvento").textContent = "Contagem para: " + nomeEvento;

//Função que irá fazer a contagem
function atualizarContador() {
const agora = new Date();
const diferenca = dataEvento - agora;

//Validação de quando a chegar na data
if (diferenca <= 0) {
    document.getElementById("contador").innerHTML = "O evento chegou!";
    clearInterval(intervalo);

//Notifiação do Windows quando chegar na data      
if (Notification.permission === "granted") {
new Notification("🎉 Chegou a hora!", {
    body: `O evento "${nomeEvento}" começou.`,
    });
}

// Vibração do dispositivo 
if ("vibrate" in navigator) {
    navigator.vibrate([500, 200, 500]); // Vibra, pausa, vibra
}

//Audio da  Notifiação do Windows 
const audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-07.mp3");
audio.play();
      
return;      
}
      
//Variaveis que irá ser atribuida os valores dos calculos
const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
const segundos = Math.floor((diferenca / 1000) % 60);

//impressão do contador 
document.getElementById("contador").innerHTML =
`${dias} dias, ${horas}h ${minutos}m ${segundos}s`;
}

//Atualizador para um Novo Evendo
atualizarContador(); // Atualiza imediatamente
intervalo = setInterval(atualizarContador, 1000);
}
//Funçao para alterar para o modo escuro
function alternarModo() {
  document.body.classList.toggle("dark-mode");
}
// Obtendo a geolocalização do usuário
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
        position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            document.getElementById("localizacao").textContent = 
                `Localização ao criar o evento: Lat ${latitude.toFixed(4)}, Lng ${longitude.toFixed(4)}`;
        },
        erro => {
            console.warn("Não foi possível obter a localização:", erro.message);
        }
    );
} else {
    console.warn("Geolocalização não é suportada neste navegador.");
}
