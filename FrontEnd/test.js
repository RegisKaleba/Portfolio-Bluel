//Paramètres communs à toutes les requêtes
let url = 'http://localhost:5678/api/';

//On récupère les infos de l'utilisateur connecté
let UserInfos = JSON.parse(localStorage.getItem('UserInfos'));
//donc pour savoir si l'utilisateur est connecté, on récupère simplement UserInfos
if(UserInfos)
    console.log(`Clé de sécurité : ${UserInfos.token}`);
else
    console.log(`Pas de clé de sécurité => utilisateur non connecté`);

//Fonction de suppression d'un élément de la BDD, en mode asynchrone (async)
const deleteWork = async (id) => {
    try {
    //Appel de la methode fetch en asynchrone (await)
    /**
     * Parammètres : URL de l'API + ID de l'élément à supprimer
     * Méthode : DELETE
     * Headers : On ajoute le token d'authentification, en mode bearer
     */
    let response = await fetch(url+'works/'+id, {
      method: 'DELETE',  
      headers: { 'Authorization': 'Bearer ' + UserInfos.token }
    });
    //Après la suppression, le script devrait recharger la page, il n'y a donc rien d'autre à faire.
    //Mais on peut récupérer le JSON de retour, pour vérifier que tout s'est bien passé
    let json = await response.json();
    console.log(JSON.stringify(json));
   
  } catch(e) {
    //En cas d'erreur, on récupère le message d'erreur et on l'affiche dans la console
    console.log(e.message);
  }
}
const addWork = async (image, title, category) => {
  try {
    // Création d'un objet FormData pour envoyer les données
    let formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('categoryId', category);

    let response = await fetch(url + 'works', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + UserInfos.token },
      body: formData // Utilisation de l'objet FormData comme corps de la requête
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi de la requête. Code HTTP : ' + response.status);
    }

    let json = await response.json();
    console.log(JSON.stringify(json));
  } catch(e) {
    console.log('Une erreur est survenue : ' + e.message);
  }
}

/*const addWork = async (image,title,category) => {
  try {
      //Création d'un objet FormData pour envoyer les données
      let formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('categoryId', category);

      let response = await fetch(url+'works', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + UserInfos.token },
          body: formData //utilisation de l'objet FormData comme corps de la requête
      });
      let json = await response.json();
      console.log(JSON.stringify(json));
  } catch(e) {
      console.log(e.message);
  }
}*/

/*const addWork = async (image,title,category) => {
    try {
        let response = await fetch(url+'works', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + UserInfos.token, 'Content-Type': 'multipart/form-data' },
            data: image,title,category
        });
        let json = await response.json();
        console.log(JSON.stringify(json));
        
    } catch(e) {
        console.log(e.message);
    }
}*/


//Function asynchrone pour récupérer les éléments du portfolio
const getWorks = async () => {
  try {
    //Appel de la methode fetch en asynchrone (await)
    let response = await fetch(url+'works');
    //On récupère le JSON de retour (en mode asynchrone, avec await)
    let json = await response.json();
    return json;
    
  } catch(e) {
    console.log(e.message);
  }
}



const getCategories = async () => {
    try {
        let response = await fetch(url+'categories');
        let json = await response.json();
        return json;
    } catch(e) {
        console.log(e.message);
    }
}

//Génération des 2léments du portfolio
const generateVignettes = async (target) =>{

    //on génère le JSON avec les données de la BDD
    //La fonction getWorks est asynchrone, on utilise donc await pour attendre la réponse
    const vignettes = await getWorks();

    //On parcourt la variable vignette, qui contient un tableau des éléments du portfolio
    for (let i = 0; i < vignettes.length; i++) {
        const article = vignettes[i];
        // On place l'élément qui intégrera les vignettes
        const sectionFiches = document.querySelector(target);
        // On crée l'ossature de la vignette  / ! 
        const vignetteElement = document.createElement("article");
        //On ajout la classe portfolio, commune à toutes les vignettes
        vignetteElement.classList.add('all');
        //On ajoute la classe correspondant à la catégorie de l'oeuvre
        let classeARajouter;
        switch(article.categoryId) {
            case 1:
            classeARajouter = 'objects';
            break;
            case 2:
            classeARajouter = 'appartments';
            break;
            case 3:
            classeARajouter = 'hostels';
            break;
        }
        vignetteElement.classList.add(classeARajouter);
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(vignetteElement);

        // Image : Création de l'élément + association de l'URL + ajout à la vignette
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        vignetteElement.appendChild(imageElement);
        
        // titre : Création de l'élément + association de l'URL + ajout à la vignette
        const nomElement = document.createElement("p");
        nomElement.innerText = article.title;
        vignetteElement.appendChild(nomElement);
        if(UserInfos)
        {
            //Ajout d'un bouton de suppression
            const buttonElement = document.createElement("button");
            buttonElement.innerText = "Supprimer";
            //Ajout d'un écouteur d'évenement
            buttonElement.addEventListener("click", async (e) => {
                e.preventDefault();
                console.log(`Suppression de la photo N°${article.id}`);
                
                //On supprime de la BDD
                const vignettes = await deleteWork(article.id);
                
            });
            vignetteElement.appendChild(buttonElement);
        }
    }
}

//On crée une fonction asynchrone appellée generateCategoriesOptions
const generateCategoriesOptions = async () => {
//On recup les catégories qu'on stoche dans la variable categories  via la fonction getCategories
    const categories = await getCategories();
//
    const selectElement = document.querySelector("#categoriesSelect");
//On boucle parmi toutes els catégories
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
//On crée le nouvel élément option à ajouter au DOM
        const optionElement = document.createElement("option");
//On ajoute la valeur de l'id et le nom à afficher  de la catégorie au nouvel élement 'option'
//puis basculé vers l'élement 'selectElement' (Ayant l'id 'categoriesSelect')
        optionElement.value = category.id;
        optionElement.innerText = category.name;
        selectElement.appendChild(optionElement);
    }
}


//On crée la variable addWorkForm - On selectionne l'élément HTML avec l'ID addWorkForm
const addWorkForm = document.querySelector("#addWorkForm");
//On ajoute un listener qui enverra/soumet les valeurs en asynchrone
addWorkForm.addEventListener("submit", async (e) => {
// On supprime le comportement par défaut
    e.preventDefault();
// La console indique un ajout d'oeuvre
    console.log("Ajout d'une oeuvre");
//On crée trois variables image/title/category - On récup la valeur des champs d'entrée via les ID
    const image = document.querySelector("#image").files[0];
    const title = document.querySelector("#title").value;
    const category = document.querySelector("#categoriesSelect").value;
    console.log(image,title,category);
    //const works = await addWork(image,title,category);
   
    
   
});

//Créer fonction pour la gestion du clic sur les filtres
const buttonFilter = Object.values(document.getElementsByClassName("toggle"));

//on boucle tous les boutons contenant la classe toggle
buttonFilter.forEach(clic => {
  //pour chaque bouton : 
  //On désactive le comportement par défaut du lien ou du bouton.
  clic.addEventListener("click", function (e) {
    e.preventDefault();
    //On récupère le nom du filtre (dataset)
    const filter = this.dataset.filter;
    //on boucle toutes les fiches (classe portfolio) => on les masque (classe emilyIsAway)
    const stickers = document.querySelectorAll(".all");
      stickers.forEach(stickers => {
        stickers.classList.add("emilyIsAway");
      });
    //On boucle toutes les fiches qui portent la classe à filtrer => On les affiche (en supprimant leur class emilyIsAway)
    const stickersVisible = document.querySelectorAll(`.${filter}`);
      stickersVisible.forEach(stickersInvisible => {
        stickersInvisible.classList.remove("emilyIsAway");
      });
  });
});

const token = localStorage.getItem("UserInfos");
        if (token) {
          console.log(true);
          const loginEffect = document.getElementById('logInTxt');
          loginEffect.classList.add('emilyIsAway')

          const loggedEffect = document.getElementsByClassName('loggedEffect');
          Array.from(loggedEffect).forEach(loggedEffect => {
          loggedEffect.classList.remove('emilyIsAway');
            });  
          };



generateVignettes(".gallery");
generateVignettes(".gallery-thumbnail");
generateCategoriesOptions();


//Modals

let modal = null
let modal2 = null
const previousModal = document.getElementById("modal1")

  // On crée la fonction openModal
const openModal = function(e) {
  //On empêche le conportement par défaut
  e.preventDefault()
  //On stocke dans "target" l'aside ayant pour valeur la cible de Href donc "modal1" ?
  const target = document.querySelector(e.target.getAttribute('href'))
  console.log(target)
  target.style.display = null
  target.removeAttribute('aria-hidden')
  target.setAttribute('aria-modal', 'true')
  modal = target
  modal.addEventListener('click',closeModal)
  modal.querySelector('.js-modal-close').addEventListener('click',closeModal)
  modal.querySelector('.btn-open-modal2').addEventListener('click',closeModal)
  modal.querySelector('.js-modal-stop').addEventListener('click',stopPropagation)
 
}

const openSecondModal = function(e) {
  
  
  const target2 = document.querySelector(e.target.getAttribute('href'))
  console.log(target2)
  target2.style.display = null
  target2.removeAttribute('aria-hidden')
  target2.setAttribute('aria-modal', 'true')
  modal2 = target2
  modal2.addEventListener('click',closeModal)
  modal2.querySelector('#testo3').addEventListener('click', closeSecondModal)
  modal2.querySelector('.js-modal-close2').addEventListener('click',closeModal)
  modal2.querySelector('.js-modal-stop').addEventListener('click',stopPropagation)

  //previousModal = null
}

const closeModal = function(e) {
  
    e.preventDefault()
    if (modal !== null) { // Vérifier si la variable modal est définie
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
  }
}

  const closeSecondModal = function(e) {
    e.preventDefault()
    modal2.style.display = "none"
    modal2.setAttribute('aria-hidden', 'true')
    modal2.removeAttribute('aria-modal')
    modal2.removeEventListener('click', closeSecondModal)
    modal2.querySelector('.js-modal-close2').removeEventListener('click', closeSecondModal)
    modal2.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal2 = null
  }


const stopPropagation = function (e) {
  e.stopPropagation()
}



document.querySelectorAll('.boxModal').forEach(a => {
  a.addEventListener('click', openModal)
})

document.querySelectorAll('.linkModal').forEach(a => {
  a.addEventListener('click', openSecondModal)
})

document.querySelectorAll('.closeModal').forEach(a => {
  a.addEventListener('click', closeModal)
})



