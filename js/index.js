const numeroImagens=12
var cliques=0  
var livre=true // credito a meu filho pedro que descobriu o bug 
               // que permitia clicar em outra carta enquanto as
               // cartas que não foram as certas estavão ainda virando.               
var jogadaAnterior='' // evita o click na mesma imagem duas vezes
var jogadasF=['','','']             
var jogadasC=['','','']     

function misturaFotos(arrFotos) {

for (let i = arrFotos.length - 1; i > 0; i--) {        
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arrFotos[i], arrFotos[j]] = [arrFotos[j], arrFotos[i]];
}
return arrFotos;
}
    
const buscaImagens=()=>{
    const arrRetorno=[]  
    var nImagem=''  
    for ( let ind=1;ind<=numeroImagens;ind++){
        nImagem= "./img/c"+ ind + ".png"
        arrRetorno.push(nImagem)
    }
    for ( let ind=1;ind<=numeroImagens;ind++){
        nImagem="./img/c"+ ind + ".png"
        arrRetorno.push(nImagem)
    }
    return misturaFotos(arrRetorno)
}
////////        
function efeito(jogada) {
    if (!livre) return

    const posicao = jogada.getAttribute("data-pos")

    // contendo C = costa - F = frente
    const carta = posicao.split("",3)
    const ncarta=posicao.length<3?carta[1]:carta[1]+carta[2]
    const cartaF=document.querySelector('#F'+ncarta)
    const cartaC=document.querySelector('#C'+ncarta)
    if (jogadaAnterior==cartaF) return             
    jogadaAnterior=cartaF

    // gira a carta clicada 
    cartaC.classList.toggle('rotaciona')
    cartaC.classList.toggle('nafrente')
    cartaF.classList.toggle('nafrente')             
    cartaF.classList.toggle('rotaciona')             
                
    cliques++ // dois a cada jogada                                 
                
    jogadasF[cliques]=cartaF // cartas Frente ( par ) 
    jogadasC[cliques]=cartaC // cartas costas ( par )

    if (cliques==2) {  // virificação da jagada ( par )
        cliques=0
        jogadaAnterior=''
        checaAcerto(jogadasF,jogadasC)
    }            
    }               
/////////
function checaAcerto(jogadasF,jogadasC){
    
    livre=false

    if (jogadasF[1].childNodes[0].getAttribute('src')==
        jogadasF[2].childNodes[0].getAttribute('src')){         
        setTimeout(() => { 
            jogadasC[1].removeAttribute('onclick')
            jogadasC[1].querySelector('img').setAttribute('src',"./img/acerto.png")
            jogadasC[2].removeAttribute('onclick')
            jogadasC[2].querySelector('img').setAttribute('src',"./img/acerto.png")
            livre=true
        },500) 
    }           
    // gira as cartas jogadas certas ou erradas (par)
    
    //removerosclicks() // implementar
    
    rotacionar(jogadasF,jogadasC)    
}

///////   
const rotacionar=(jogadasF,jogadasC)=>
{
    setTimeout(() => {    
        jogadasC[1].classList.toggle('rotaciona')
        jogadasF[1].classList.toggle('rotaciona')  
        jogadasC[1].classList.toggle('nafrente')
        jogadasF[1].classList.toggle('nafrente')             
        jogadasF[2].classList.toggle('rotaciona')             
        jogadasC[2].classList.toggle('rotaciona')
        jogadasC[2].classList.toggle('nafrente')
        jogadasF[2].classList.toggle('nafrente')     
        livre=true           
    },500)  

}

ind=0 // numerador dos quadros ( que guarda o par de imagens )
////////

const aImagens = buscaImagens()

function carregaImagens() { 
    for(var i = 0; i < numeroImagens*2; i++){
        ind++
        let novaimg                    
        let novaDiv = document.createElement("div");
        let $quadro='quadro'+ind
        novaDiv.setAttribute('class','quadro '+$quadro)   
        document.querySelector('.container').appendChild(novaDiv)
                        
        //frente
        novaDiv = document.createElement('div') 
        novaDiv.setAttribute('class','cartas cartaFrente rotaciona')
        novaDiv.setAttribute('id','F'+ind)
        novaDiv.setAttribute('DATA-POS','F'+ind)
        novaDiv.setAttribute('onclick','efeito(this)')                    
        document.querySelector('.'+$quadro).appendChild(novaDiv)

        novaimg = document.createElement("img");
        novaimg.setAttribute('src',aImagens[i])
        document.querySelector("#F"+ind).appendChild(novaimg)

        // costas                    
        novaDiv = document.createElement('div') 
        novaDiv.setAttribute('class','cartas cartaCostas nafrente')
        novaDiv.setAttribute('id','C'+ind)
        novaDiv.setAttribute('DATA-POS','C'+ind)
        novaDiv.setAttribute('onclick','efeito(this)')
        document.querySelector('.'+$quadro).appendChild(novaDiv)

        novaimg = document.createElement("img");
        novaimg.setAttribute('src',"./img/costas.png")
        document.querySelector("#C"+ind).appendChild(novaimg)
    }
}            

const start=()=> {
    // deverá iniciar as cartas viradas todas para frente durante 
    // o tempo determinado em tepodeMemorizacao    
}




    
    