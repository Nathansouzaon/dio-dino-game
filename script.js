
const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

//evita que fique pulando quando não precisar
let isJumping = false;

 //começa sempre embaixo como posição inical
 let position = 0

//identificar quando o usuario pressionou a tecla espaço
const handleKeyUp = (event) => {
    if(event.keyCode === 32){
        if(!isJumping){
            //32 espaço quando a pessoa pressionar chamo o pulo
           jump()
        }
    }
}

//responsavel pelo pulo
const jump = () => {

    //começa a pular
    isJumping = true;
    //cria repetição intervalo pra fazer coisas como movimentar o dino pra cima
    let upInterval = setInterval(() => {
        if(position >= 150){
            //limpa o intervalo
          clearInterval(upInterval)

          //descer
          let downInterval = setInterval(() => {
            if(position <= 0){
                //limpa o intervalo ele para de acontecer para de descer
              clearInterval(downInterval)
              //termina de pular
              isJumping = false
            }else{
                //descendo
                position -= 20
                dino.style.bottom = position + 'px';  
            }
          }, 20);
        }else {
            //subindo - pego valor da posição e adicionar 20 a cada 20 milesimos de segundo
            position += 20
            dino.style.bottom = position + 'px';       
        }
    }, 20);
}


function createCactus() {
    const cactus = document.createElement("div");
    let cactusPosition = 1000;
    //n aleatorio pra gerar um novo cactus
    let randomTime = Math.random() * 6000

    console.log(randomTime);

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    //adicionando um filho
    //adicionando o cactus que e uma div dentro do background
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        //quando o cactu sai da tela preciso que ele desapareça
        if(cactusPosition < -60){
          //limpo o intervalo
           clearInterval(leftInterval);
            //remove um elemento filho dele 
            //se ele sair da tela e removido evita processamento desnecessario
            background.removeChild(cactus)
                                                             
        }else if (cactusPosition > 0 && cactusPosition < 60 && position < 60){ 
            //posição do pulo do dinossauro dinossauro não esta maior que a altura do cactus ai digo que o jogo acabou       
            //se o cacuts não saiu da tela e maior que zedo pra sair da tela precisa estar menor que zero por que 60 no momento do contato nosso dinossauro tem a largura de 60 px então se ele ta maior que 0 e menor que 60 ele esta aonde esta o espaço do dinossauro se tiver nessa regiao e game over
            
            //limpa o intervalo de ir pra esquerda para
            clearInterval(leftInterval)
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';

        }else { 
            //se ele nao saio da tela continua se movimentando
            cactusPosition -= 10;//velocidade que vai ser mover pra esquerda
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    //função executadada depois de um determinado tempo
    //função invocando ela mesmo de dentro dela e chamado de recursividade
    //como se fosse efeito espelho ela fica se invocando novamente depois de um tempo
    setTimeout(createCactus, randomTime);

}

createCactus()



document.addEventListener('keyup', handleKeyUp)