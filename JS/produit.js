// On enferme le resultat de (window.location.search) dans une const, ce resultat correspond aux info qui se situent à la fin de notre URL
const params = new URLSearchParams(window.location.search);
// On enferme le resultat de params.get('id') dans une const, ce resultat correspond aux infos qui se situent dans le nom id de l'url, id a été defini dans app.js, il aurait pu avoir n'importe quel nom.
const camId = params.get('id');
//On enferme dans une const le lien vers l'api de la camera recherchée en fonction de son id
const url = `http://localhost:3000/api/cameras/${camId}`;

//Création des varibale à portée globale
let id;
let prix;
let image;
let nom;
let description;
let lensesArray;
let lensesRow;
let lenseOption;
let quantité;
let carteProduit = ` `;

//Réalisation de la requete vers l'api de la camera recherchée en fonction de son id
fetch(url)
  //Transformation du resultat de la requete (response) en document json (response.json)
  .then((response) => response.json())
  //Récuperation du resultat de response.json (qu'on appelle par un nom random (ici camArray)) et on ouvre la fonction
  .then((camArray) => {
    //Attribution de valeur aux variables
    id = camArray._id;
    prix = camArray.price / 100;
    image = camArray.imageUrl;
    nom = camArray.name;
    description = camArray.description;
    lensesArray = camArray.lenses;

    //Construction de la carte produit
    carteProduit += ` <img src="${image}" class="img-fluid pb-3" alt="caméra vintage ${nom}"/>
                            <div class= "row justify-content-around">
                                <h5 class="card-title mr-3">${nom}</h5>
                                <div class="price card-text ml-3">${prix} €</div>
                            </div>
                            <div class="card card-body mb-3">
                                <div class="description card-text">${description}</div>
                            </div>
                            <select class='lense form-control mb-3 text-center'>
                            <option>Choisissez votre lentille</option>`;
    for (let lense of lensesArray) {
      carteProduit += `<option>${lense}</option>`;
    }
    carteProduit += `   </select>
                        <p>Quantité de <strong>${nom}</strong> à mettre au panier:</p>
                        <input class="col-3 mb-3 border rounded text-center" type="number" step="1" value="0" min="1" max="10">
                        <div>
                          <button type="button" class="btn btn-secondary addPanier">Ajouter au panier</button>
                        </div>`;
    document.querySelector('.cameraCardProduit').innerHTML = carteProduit;

    //Choix de la lentille
    lensesRow = document.querySelector('select.lense');
    lensesRow.addEventListener('change', function () {
      lenseOption = this.options[this.selectedIndex].text;
    });
    //Quantité souhaitée
    let quantitéChoix = document.querySelector('input');
    quantitéChoix.addEventListener('change', function () {
      quantité = this.value;
    });

    //localStorage
    //Création de la fonction de push des infos du produit dans un tableau
    function ajouterItem(tableau) {
      tableau.push({
        nom: nom,
        photo: image,
        quantité: quantité,
        prixTotal: quantité * prix,
        lentille: lenseOption,
        id: id,
      });
    }
    document.querySelector('.addPanier').addEventListener('click', function () {
      //Message d'alerte s'il manque la quantité ou l'option de lentille
      if (lenseOption == 'Choisissez votre lentille' || quantité == 0 || lenseOption == undefined || quantité == undefined) {
        alert('Merci de choisir une option de lentille ou de modifier la quantité désirée');
      } else {
        if (localStorage.length == 0) {
          let pannier = [];
          ajouterItem(pannier);
          localStorage.setItem('panier', JSON.stringify(pannier));
          document.location.href = 'panier.html';
        } else {
          let newPannier = JSON.parse(localStorage.getItem('panier'));
          ajouterItem(newPannier);
          localStorage.setItem('panier', JSON.stringify(newPannier));
          document.location.href = 'panier.html';
        }
      }
    });
  })
  //En cas d'erreur avec le serveur
  .catch(
    (document.querySelector('.cameraCardProduit').innerHTML = `<section class='jumBotron'>
        <div class='container'>
          <div class='row mt-3'>
            <div class='col'>
              <div class='jumbotron bg-warning py-3'>
                <h4 class='text-center'>
                  Echec de communication avec notre serveur.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>`)
  );
