
function misturaFotos(arrFotos) {

for (let i = arrFotos.length - 1; i > 0; i--) {        
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arrFotos[i], arrFotos[j]] = [arrFotos[j], arrFotos[i]];
}
return arrFotos;
}


