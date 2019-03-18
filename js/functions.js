const API = "https://api-postful.herokuapp.com";

function verificarStorage() {
    if (sessionStorage.getItem("sp_requisitado")) {
        document.getElementById('btn1').style.display = "none";
        document.getElementById('btn2').style.display = "none";
        document.getElementById('inputEmail').disabled = true;
        requisicaoSucess();
    }
}

function ativarTransition() {
    var btn = document.getElementsByClassName('btn-informacoes')[0];
    btn.classList.add('btn-animation')
}

ativarTransition();

function confirmar() {

    var email = document.getElementById('inputEmail').value;


    if (email === "") {
        document.getElementById('inputEmail').style.background = "#ffabab"
        setTimeout(function () { document.getElementById('inputEmail').style.background = "#fff" }, 500)
        return;
    }

    if (validateEmail(email)) {
        document.getElementById('btn1').style.display = "none";
        document.getElementById('btn2').style.display = "none";
        document.getElementById('loading').style.display = "block";
        document.getElementById('inputEmail').style.background = "#fff"
        document.getElementById('inputEmail').disabled = true;

        axios.post(API + "/email", { email })
            .then(function (response) {
                if (!response.data.toString().includes("Error")) {
                    requisicaoSucess();
                } else {
                    requisicaoDuplicated();
                }
            })
            .catch(function (error) {
                console.log(error);
                requisicaoError();
            });

    } else {
        document.getElementById('inputEmail').style.background = "#ffabab"
    }
}

function keyRelease() {

    var email = document.getElementById('inputEmail').value;

    if (validateEmail(email))
        document.getElementById('inputEmail').style.background = "#fff";
}

function requisicaoSucess() {
    document.getElementById('loading').style.display = "none";
    document.getElementById('labelSucess').style.display = "block";
    document.getElementById('btnResult').classList.add('sucesso')
    document.getElementById('btnResult').innerHTML = "Cadastrado com sucesso!";
    sessionStorage.setItem("sp_requisitado", true);
}

function requisicaoError() {
    document.getElementById('loading').style.display = "none";
    document.getElementById('labelSucess').style.display = "block";
    document.getElementById('btnResult').classList.add('erro')
    document.getElementById('btnResult').innerHTML = "Erro no servidor!";
}

function requisicaoDuplicated() {
    document.getElementById('loading').style.display = "none";
    document.getElementById('labelSucess').style.display = "block";
    document.getElementById('btnResult').classList.add('duplicado')
    document.getElementById('btnResult').innerHTML = "Email já cadastrado!";
}

function fechar() {
    setTimeout(function () {
        document.getElementById('btn1').style.display = "flex";
        document.getElementById('btn2').style.display = "flex";
        document.getElementById('loading').style.display = "none";
        document.getElementById('labelSucess').style.display = "none";
        document.getElementById('btnResult').classList.remove("erro", "sucesso", "duplicado")
        cancel();
    }, 300);
}

function cancel() {
    var inputEmail = document.getElementById('inputEmail');
    document.getElementById('inputEmail').disabled = false;
    inputEmail.value = '';
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}