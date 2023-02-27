 //Récupération des éléments - Works Swagger
let works = ('http://localhost:5678/api-docs/#/default/get_works');
const reponse = await fetch('http://localhost:5678/api/works');
const vignettes = await reponse.json();

function generateVignettes(vignettes){
    for (let i = 0; i < vignettes.length; i++) {

        const article = vignettes[i];
        // On place l'élément qui intégrera les vignettes
        const sectionFiches = document.querySelector(".fiches");
        // On crée l'ossature de la vignette 
        const vignetteElement = document.createElement("article");
        // Image + nom
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.title;
    
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(vignetteElement);
        // On rattache Image + nom à vignetteElement (la balise article)
        vignetteElement.appendChild(imageElement);
        vignetteElement.appendChild(nomElement);
        
     }
}

generateVignettes (vignettes);