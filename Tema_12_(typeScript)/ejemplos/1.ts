interface Figura {
    a: number;
    b: number;
    c?:number; // Opcional
    area (): number;
}
class Cuadrado implements Figura {
    readonly a: number; // De solo lectura
    b: number;
    constructor (a: number,b:number){
        this.a=a;
        this.b=b;
    }
    area (): number{return this.a*this.b};
}
class Rectangulo implements Figura {
    a: number;
    b: number;
    constructor (a: number,b:number){
        this.a=a;
        this.b=b;
    }
    area (): number{return this.a*this.b};
}
let fig1= new Cuadrado(3,4);
//fig1.a=5; --- No se permite es de sólo lectura
console.log(fig1.area());

// Decoradores

// Modifica constructor de la clase
function decorClase (target:Function):any  {  
    return function(){console.log('Constructor modificado')};
}
// Modifica método de la clase
function decorMetodo(target:any, propName: string, descriptor: PropertyDescriptor = {}){
    descriptor.value=function(){ console.log('Método modificado')}
    return descriptor;  
}
@decorClase
class MiClase {  
    constructor() { 
        console.log('Constructor de clase')
    }
    //@decorMetodo
    get(){console.log('Método de clase')};
}
var dat=new MiClase();
//dat.get();

$(function(){
    this.onload=function(){};
   })
   