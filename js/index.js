const numeroImagens=12
var cliques=0  
var jogadaAnterior='' // evita o click na mesma imagem duas vezes
var jogadasF=['','','']             
var jogadasC=['','','']     

////////        
function efeito(jogada) {
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
    
    if (jogadasF[1].childNodes[0].getAttribute('src')==
        jogadasF[2].childNodes[0].getAttribute('src')){         
        setTimeout(() => { 
            jogadasC[1].removeAttribute('onclick')
            jogadasC[1].querySelector('img').setAttribute('src',"/img/acerto.png")
            jogadasC[2].removeAttribute('onclick')
            jogadasC[2].querySelector('img').setAttribute('src',"/img/acerto.png")
        },500) 
    }           
    // gira as cartas jogadas certas ou erradas (par)
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
    },500)                
}

ind=0 // numerador dos quadros ( que guarda o par de imagens )
////////
function carregaImagens() { 
    for(var i = 1; i <=numeroImagens; i++){
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
        novaimg.setAttribute('src',"/img/c"+ i + ".png")
        document.querySelector("#F"+ind).appendChild(novaimg)

        // costas                    
        novaDiv = document.createElement('div') 
        novaDiv.setAttribute('class','cartas cartaCostas nafrente')
        novaDiv.setAttribute('id','C'+ind)
        novaDiv.setAttribute('DATA-POS','C'+ind)
        novaDiv.setAttribute('onclick','efeito(this)')
        document.querySelector('.'+$quadro).appendChild(novaDiv)

        novaimg = document.createElement("img");
        novaimg.setAttribute('src',"/img/costas.png")
        document.querySelector("#C"+ind).appendChild(novaimg)
    }
}            