 //Récupération des éléments - Works Swagger
const reponse = await fetch('http://localhost:5678/api/works');
const vignettes = await reponse.json();

console.log(vignettes.length);

function generateVignettes(vignettes){
    for (let i = 0; i < vignettes.length; i++) {

        const article = vignettes[i];
        // On place l'élément qui intégrera les vignettes
        const sectionFiches = document.querySelector(".gallery");
        // On crée l'ossature de la vignette  / ! 
        const vignetteElement = document.createElement("article");
          if (article.categoryId == 1){
          
          vignetteElement.classList.add('toto', 'objects');}
         if (article.categoryId == 2){
          vignetteElement.classList.add('toto', 'appartments');}
          if (article.categoryId == 3){
            vignetteElement.classList.add('toto', 'hostels');}
        // Image + nom créés
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const nomElement = document.createElement("p");
        nomElement.innerText = article.title;
        const categoryElement = document.createElement("p");
        categoryElement.innerText = article.categoryId;
    
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(vignetteElement);
        // On rattache Image + nom à vignetteElement (la balise article)
        vignetteElement.appendChild(imageElement);
        vignetteElement.appendChild(nomElement);
        
        
     }


}

generateVignettes (vignettes);


        // Test sur le tri par Buttons
        // Enlever classe et ajouter classe

        function myFunction() {
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
              



          /*
            --- C'EST UNE COLLECTION ---
            const collection = document.getElementsByClassName("example");
            for (let i = 0; i < collection.length; i++) {
            collection[i].style.backgroundColor = "red";
            }

          */


        //03/03--> Gérer en CSS (Classe "cliqué) --> Add elements en CSS()
        // - Opacity/Display pour cacher/afficher élément

        /* TEST via function myFunction() {
         var element = document.getElementById("myDIV");
          element.classList.add("mystyle");
        }*/

        // local storage --> Click lien - faire persister données entre pages (paramètres d'URL) --> stocker en local (Cookie -- token -- JWT token)

        // TODO --> Filtres sans solliciter API - Ne manipuler que classe en JS + NOTIONS TOKEN (LocalStorage)
         
       

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


        // 10/03 --> Ajouter transition à la fonction (Ui)
        // --> Suite Token Notion : Formulaire authentification (Via nex link) + Types de form (submit/password)
        // 17/03--> Authentification fonctionnel via local storage (via recherche, savoir si c'est worth + préciser erreurs)
        // prochaine visio 16/03 ou 14/03 si galère