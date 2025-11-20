let numero=[];
function addNumeroBingo(){
let valor =Math.floor( Math.random()*90+1);
numero.push(valor);
console.log(numero)
document.getElementById("numeroMostrado").innerHTML=valor;

}
const bolas=new Map([]);
function addDiv(){
    let div=document.getElementById("tablero1");
for(let i=0; i<=numero.length;i++){
bolas.set(i,numero[i]);
console.log(bolas);
console
}
}

