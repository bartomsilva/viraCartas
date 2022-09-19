
function misturaFotos(arrFotos) {

for (let i = arrFotos.length - 1; i > 0; i--) {        
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arrFotos[i], arrFotos[j]] = [arrFotos[j], arrFotos[i]];
}
return arrFotos;
}

const buscaImagens=()=>{
    const arrRetorno=['']
    let nImagem=''
    for ( let ind=1;ind<=numeroImagens;ind++){
        nImagem="/img/c"+ i + ".png"
        arrRetorno.push(nImagem)
    }
    for ( let ind=1;ind<=numeroImagens;ind++){
        nImagem="/img/c"+ i + ".png"
        arrRetorno.push(nImagem)
    }
    return misturaFotos(arrRetorno)
}


