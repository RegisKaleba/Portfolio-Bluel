 //Récupération des éléments - Works Swagger

 function generateVignettes(vignettes){
  for (let i = 0; i < vignettes.length; i++) {
      
      const article = vignettes[i];
      // On place l'élément qui intégrera les vignettes
      const sectionFiches = document.querySelector(".gallery");
      // On crée l'ossature de la vignette 
      const vignetteElement = document.createElement("article");
      vignetteElement.classList.add('all');
      // On ajoute une classe en fonction de categoryID
      let addClasses;
      switch(article.categoryId) {
        case 1:
          addClasses = 'objects';
          break;
        case 2:
          addClasses = 'appartments';
          break;
        case 3:
          addClasses = 'hostels';
          break;
        }
      vignetteElement.classList.add(addClasses);
      
   
      // Image + nom créés
      const imageElement = document.createElement("img");
      imageElement.src = article.imageUrl;
      const nomElement = document.createElement("p");
      nomElement.innerText = article.title;
      const categoryElement = document.createElement("p");
      categoryElement.innerText = article.categoryId;
      const supprElement = document.createElement("button");
      supprElement.innerHTML  = '<i class="fa-solid fa-trash"></i>';
      supprElement.classList.add("loggedEffect");
      supprElement.classList.add("emilyIsAway");
      supprElement.setAttribute('data-id', article.id);
  
      // On rattache la balise article a la section Fiches
      sectionFiches.appendChild(vignetteElement);
      // On rattache Image + nom à vignetteElement (la balise article)
      vignetteElement.appendChild(imageElement);
      vignetteElement.appendChild(nomElement);
      vignetteElement.appendChild(supprElement);

  }
}

  fetch('http://localhost:5678/api/works')
  .then(e =>{
    if (e.status === 200) {

      return e.json();

    } else {

      throw new Error("Impossible d'accèder au contenu");

    } 
    })
  .then(vignettes => {

    generateVignettes (vignettes);
    
  })
  .catch (e =>{
    console.log('Il y\'a une erreur :' + e);
  })


  

        //Appel de la fonction


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

// Test trash button

const trashButton = Object.values(document.getElementsByClassName("loggedEffect"));
trashButton.forEach(clic => {
  clic.addEventListener("click", function (e) {
    e.preventDefault();
    const article = this.dataset.id;
    fetch(`http://localhost:5678/api/works/${article}`);
    
    console.log(article);
    console.log(trashButton);
   

  });
});



    



// Changement du lien login en logged si token détecté 
// + apparition du bouton pour suppression travail

const token = localStorage.getItem("bearerAuth");
        if (token) {
          console.log(true);
          const loginEffect = document.getElementById('logInTxt');
          loginEffect.classList.add('emilyIsAway')

          const loggedEffect = document.getElementsByClassName('loggedEffect');
          Array.from(loggedEffect).forEach(loggedEffect => {
          loggedEffect.classList.remove('emilyIsAway');
            });  
          };


        






        // Test sur le tri par Buttons
        // Enlever classe et ajouter classe

    /*    function myFunction() {
          var element = document.getElementById("testClick");
          element.classList.add("buttonClicked");
        }

        function colorButton(buttonID) {
          var element = document.getElementById(buttonID);
          element.classList.add('buttonClicked');

        }

        function removeHostels() {
          const collection = document.getElementsByClassName('hostels');
            for (let i = 0; i < collection.length; i++) {
                  collection[i].classList.add('emilyIsAway'); 
              } 
            
            }

            function removeAppartments() {
              const collection = document.getElementsByClassName('appartments');
                for (let i = 0; i < collection.length; i++) {
                      collection[i].classList.add('emilyIsAway'); 
                  } 
                }

            function removeObjects() {
              const collection = document.getElementsByClassName('objects');
              for (let i = 0; i < collection.length; i++) {
              collection[i].classList.add('emilyIsAway'); } 
                      }


            function removeClasses() {
              const collection = document.getElementsByClassName('buttonClicked');
              for (let i = 0; i < collection.length; i++) {
              collection[i].classList.remove('buttonClicked');  
                        }          
              const collection1 = document.getElementsByClassName('emilyIsAway');
              for (let i = 0; i < collection1.length; i++) {
              collection1[i].classList.remove('emilyIsAway');  
                        }
                        } 

                      

          function removeButtonClicked() {
          const collection = document.getElementsByClassName('buttonClicked');
            for (let i = 0; i < collection.length; i++) {
                collection[i].classList.remove('buttonClicked');  
              }          

            }

            function removeEmily() {
              const collection = document.getElementsByClassName('emilyIsAway');
                for (let i = 0; i < collection.length; i++) {
                    collection[i].classList.remove('emilyIsAway');  
                  }
                }
              
        const buttonAll = document.querySelector(".togg");
        buttonAll.addEventListener("click", function () {
       
          removeClasses();
          removeClasses();
          removeClasses();
          removeClasses();
          removeClasses();
          colorButton('togg');
          
        });

        const buttonObjects = document.querySelector(".togg1");
        buttonObjects.addEventListener("click", function () {
        
          removeClasses();
          removeClasses();
          removeClasses();
          removeClasses();
          removeHostels();
          removeAppartments();
          colorButton('togg1');
          
          
          
        });

        const buttonApartment = document.querySelector(".togg2");
        buttonApartment.addEventListener("click", function () {
        
          removeClasses();
          removeClasses();
          removeClasses();
          removeClasses();
          removeObjects();
          removeHostels();
          colorButton('togg2');
          
        });

        const buttonHostel = document.querySelector(".togg3");
        buttonHostel.addEventListener("click", function () {
        
          removeClasses();
          removeClasses();
          removeClasses();
          removeClasses();
          removeClasses();
          removeObjects();
          removeAppartments();
          colorButton('togg3');
        });

        */
