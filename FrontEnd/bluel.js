 //Récupération des éléments - Works Swagger
const reponse = await fetch('http://localhost:5678/api/works');
const vignettes = await reponse.json();

console.log(vignettes.length);

function generateVignettes(vignettes){
    for (let i = 0; i < vignettes.length; i++) {

        const article = vignettes[i];
        // On place l'élément qui intégrera les vignettes
        const sectionFiches = document.querySelector(".gallery");
        // On crée l'ossature de la vignette 
        const vignetteElement = document.createElement("article");
        // Image + nom
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
        vignetteElement.appendChild(categoryElement);
        
     }
}

generateVignettes (vignettes);


        // Test sur le tri par Buttons

        const buttonAll = document.querySelector(".togg");
        buttonAll.addEventListener("click", function () {
            document.querySelector(".gallery").innerHTML = "";
            generateVignettes (vignettes);
        });

        const buttonObjects = document.querySelector(".togg1");
        buttonObjects.addEventListener("click", function () {
        const objectsFiltred = vignettes.filter(function (vignettes) {
        return vignettes.categoryId == 1;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateVignettes(objectsFiltred);
        });

        const buttonHostel = document.querySelector(".togg3");
        buttonHostel.addEventListener("click", function () {
        const hostelFiltred = vignettes.filter(function (vignettes) {
        return vignettes.categoryId == 3;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateVignettes(hostelFiltred);
        });

        const buttonApartment = document.querySelector(".togg2");
        buttonApartment.addEventListener("click", function () {
        const appartmentFiltred = vignettes.filter(function (vignettes) {
        return vignettes.categoryId == 2;
        });
        document.querySelector(".gallery").innerHTML = "";
        generateVignettes(appartmentFiltred);
        });
