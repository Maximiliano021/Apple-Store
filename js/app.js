let opcionTipo, tipoPc = '', procesador='', gpu = [], ram = [], tipoDisco='';
class Pc {
    constructor(procesador, tipoPc, gpu, ram, tipoDisco) {
        this.procesador = procesador;
        this.tipoPc = tipoPc;
        this.gpu = gpu;
        this.ram = ram;
        this.tipoDisco = tipoDisco;
    }
    checkCompatibility() {
        if (this.ram[1]+2<this.gpu[1])
            console.log(`ERROR DE COMPATIBILIDAD ENTRE RAM DE: ${this.ram[1]} y GPU DE: ${this.gpu[1]}`);
        else
            console.log('TODO EN ORDEN porque tenes una gpu de marca:', this.gpu[0], ' con cantidad de gb:', this.gpu[1])
    }
}

const armarPc = () => {
    let opcion = menu();
    while(opcion!='7'){
        switch(opcion){
            case '1': opcionTipo(); break;
            case '2': procesador(); break;
            case '3': gpu(); break;
            case '4': ram();break;
            case '5': tipoDisco(); break;
            case '6': cargarDatosPc(); return new Pc(procesador, tipoPc, gpu, ram, tipoDisco);       
            }
        opcion = menu();
    }
}


const menu = ()=>{
    let opcion = prompt
    (`-----MENU----\n
      1-Tipo de PC\n
      2-Procesador\n
      3-GPU\n
      4-RAM\n
      5-Tipo de Disco\n
      6-ARMAR\n
      7-SALIR\n
      ---->Opcion: ` ); 
      while(!(opcion>=1&&opcion<=7)){
        opcion = prompt
        (`-----MENU----\n
          1-Tipo de PC\n
          2-Procesador\n
          3-GPU\n
          4-RAM\n
          5-Tipo de Disco\n
          6-ARMAR\n
          6-SALIR\n
          ---->Opcion: ` ); 
      }
      return opcion;
}

opcionTipo = () =>{
    opcionTipo = Number(prompt('TIPO DE PC\n1-Notebook\n2-Escritorio\nIngrese una opcion: '));
        while (opcionTipo != 1 && opcionTipo != 2) {
            opcionTipo = Number(prompt('TIPO DE PC\n1-Notebook\n2-Escritorio\nIngrese una opcion: '));
        }
        opcionTipo == 1 ? tipoPc = 'Notebook' : tipoPc = 'Escritorio';
}

procesador = () =>{
    procesador = prompt('Ingrese el tipo de un procesador, entre AMD o INTEL: ').toUpperCase();
    while (!(procesador == 'AMD' || procesador == 'INTEL')) {
        procesador = prompt('Ingrese el tipo de un procesador, entre AMD o INTEL: ').toUpperCase();
    }
}

gpu = () =>{
    gpu[0] = prompt('Ingrese marca de la GPU: ').toUpperCase();
    gpu[1] = Number(prompt('Ingrese GB de la GPU: '));
    while (!(gpu[1] >= 2 && gpu[1] <= 16)) {
        alert('Error de GB GPU')
        gpu[1] = Number(prompt('Ingrese GB de la GPU: '));
    };
} 

ram = () =>{
    ram[0] = prompt('Ingrese marca de la RAM: ').toUpperCase();
    ram[1] = Number(prompt('Ingrese GB de la RAM'));
    while (!(ram[1] >= 2 && ram[1] <= 16)) {
        alert('Error de GB RAM')
        ram[1] = prompt('Ingrese GB de la ram')
    }
}

tipoDisco = () =>{ 
    prompt('Ingrese el tipo de disco: ').toUpperCase();
    if (tipoDisco != 'SSD' && tipoDisco != 'HDD') {
        tipoDisco = prompt('Ingrese el tipo de disco: ').toUpperCase();
    }
}

cargarDatosPc=()=>{
    if(tipoPc.length==0||procesador.length==0||gpu.length==0||ram.length==0||tipoDisco.length==0)
        alert('BUENO PERO MIRA QUE TE FALTAN PONER COSAS TODAVIA');      
    else
        alert('PC ARMADA');
} 