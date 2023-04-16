// On cible le formulaire

const UserInfos = window.localStorage.getItem("Blips");
document
    .querySelector("form")
    .addEventListener("submit", async function(e) {

//On retire les messages d'erreurs précédement générés

        e.preventDefault();
        const previousError = document.querySelector(".error");
        if (previousError) {
            previousError.remove();
        }

//On cible les imputs mail + password

        const loginFormDatas = {
            email: e.target.querySelector("[name=email]").value,
            password: e.target.querySelector("[name=password]").value
        };

//création du PayLoad au format JSON

        const payLoad = JSON.stringify(loginFormDatas);

// envoi des données du formulaire au serveur

        await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payLoad
        })

//récupération de la réponse + analyse de la réponse

        .then(r => {
            if (r.status === 200) {
                return r.json();
            } else {
                throw new Error("Erreur dans l’identifiant ou le mot de passe");
            } 
        })

//Création du Token et stokage + redirection sur la page index si authentification réussie

        .then(body => {
            window.localStorage.setItem("UserInfos", JSON.stringify(body));
            window.location.replace("index.html");
        })
        .catch(e=> {

//Création des messages d'erreurs
            const error = document.createElement("p");
            error.classList.add("error");
            error.innerHTML = e.message;
            document.getElementById("errorText").prepend(error); 
            
        })
    });

// MPREZ!