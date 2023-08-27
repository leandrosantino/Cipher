
//Aplicativo Cipher

let Type = ''
let objetos = {
    codeimg: window.document.getElementsByClassName('code')[0],
    decodeimg: window.document.getElementsByClassName('decode')[0],
    cx1: window.document.getElementById('cx1'),    
    cx2: window.document.getElementById('cx2'),
    Home: window.document.getElementById('home'),
    Pg2: window.document.getElementById('pg2'),
    resp: window.document.getElementById('resp'),
    msg: window.document.getElementById('msg'),
    key: window.document.getElementById('key')

}

addEventId('btcode', criptografar,'click'  )
addEventId('btdecode', descriptografar,'click' )
addEventId('imgvoltar', voltar,'click' )
addEventId('key', changeKey, 'change')
addEventId('msg', changeMsg, 'keydown')

objetos.Pg2.style.display = 'none'
objetos.Home.style.display = ''

function changeMsg(){
    console.log(Type)
    let r
    if(key.value == 0 || msg.value == 0){
        r = '' 
    }else{
        r = cifra_vigenere(msg.value, key.value, Type)
    }
    objetos.resp.innerHTML = `<p>${r}</p>`
}

function changeKey(){
    console.log(Type)
    let r
    if(key.value == 0 || msg.value == 0){
        r = '' 
    }else{
        r = cifra_vigenere(msg.value, key.value, Type)
    }
    objetos.resp.innerHTML = `<p>${r}</p>`
}
//Efeitos de tela
function criptografar(){
    Type = 'crypt'
    objetos.msg.value = ''
    objetos.key.value = ''
    objetos.resp.innerHTML = ''
    efeitoBt('btcode')
    let time = setInterval(function(){
        clearInterval(time)
        objetos.Home.setAttribute('style', 'display: none')
        objetos.Pg2.setAttribute('style', 'display: 0')
        objetos.decodeimg.setAttribute('style', 'display: none')
        objetos.codeimg.setAttribute('style', 'display: ')
        objetos.cx1.innerHTML = 'Menssagem:'
        objetos.cx2.innerHTML = 'Código:'
    }, 300);
}
function descriptografar(){
    Type = 'decrypt' 
    objetos.msg.value = ''
    objetos.key.value = ''
    objetos.resp.innerHTML = ''
    efeitoBt('btdecode')
    let time = setInterval(function(){
        clearInterval(time)
        objetos.Home.setAttribute('style', 'display: none')
        objetos.Pg2.setAttribute('style', 'display: 0')
        objetos.decodeimg.setAttribute('style', 'display: 0')
        objetos.codeimg.setAttribute('style', 'display: none')
        objetos.cx1.innerHTML = 'Código:'
        objetos.cx2.innerHTML = 'Menssagem:'
    }, 300);
         
}
function voltar(){
    objetos.Home.style.display = ''
    objetos.Pg2.style.display = 'none'
}
function efeitoBt(id=''){
    let obj = window.document.getElementById(`${id}`)
    obj.style.backgroundColor = `rgba(255, 255, 255, 0.150)`
    let timer5 = setInterval(function() {   
        clearInterval(timer5)
        obj.style.backgroundColor = `rgba(255, 255, 255, 0)` 
    }, 150);
}
//Funcionalidades
function addEventId(id,fucName,type){
    return window.document.getElementById(`${id}`).addEventListener(type, fucName)
}
//Cifra de Vigenere
let cifra_vigenere = function(Msg, chave, type='crypt') {

    let alfabeto = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", ",", "?", "!", "\'", "_", "-", "&", "@", "#", "$", "%", "*", "(", ")", " "
    ], alphabetSize = alfabeto.length

    let msgArray = convert_array(Msg)
    let keyArray = convert_array(chave)
    let Keycode = estenderKay(keyArray, msgArray)

    console.log(`${msgArray}`)
    console.log('----------------------------------------')
    console.log(`${Keycode}`)
    console.log('----------------------------------------')

    if( type == 'crypt'){
        console.log(criptografar(msgArray, Keycode))
        return criptografar(msgArray, Keycode)
        
    }else if(type == 'decrypt'){
        console.log(decodificar(msgArray, Keycode))
        return decodificar(msgArray, Keycode)
    }

    //Funcinonalidaes
    function convert_array(str){
        return str.toUpperCase().split('')
    }
    function estenderKay(chave, Msg){
        let sizekey = chave.length
        let keycod = []
        let indice = 0
        for(let p in Msg){
            if(indice > sizekey - 1){
                indice = 0
            }

            keycod.push(chave[indice])
            indice += 1
        }
        return keycod
    }
    function criptografar(Msg, chave){
        let msgCode = ''
        let letracod, indKey, indMsg
        for(let l in msgArray){
            indKey = alfabeto.indexOf(chave[l])
            indMsg = alfabeto.indexOf(Msg[l])
            letracod = (indKey + indMsg)%alphabetSize
            msgCode += alfabeto[letracod]
        }
        return msgCode
    }
    function decodificar(Msg, chave){
        let msgDcode = ''
        let letracod, indKey, indMsg 
        for(let l in msgArray){
            indKey = alfabeto.indexOf(chave[l])
            indMsg = alfabeto.indexOf(Msg[l])
            letracod = ((indMsg-indKey)+alphabetSize)%alphabetSize
            msgDcode += alfabeto[letracod]
        }
        return msgDcode
    }
}