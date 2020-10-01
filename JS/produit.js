// On enferme le resultat de (window.location.search) dans une const, ce resultat correspond aux info qui se situent à la fin de notre URL
const params = new URLSearchParams(window.location.search);
//console.log(params);
// On enferme le resultat de params.get('id') dans une const, ce resultat correspond aux infos qui se situent dans le nom id de l'url, id a été defini dans app.js, il aurait pu avoir n'importe quel nom.
const camId = params.get('id');
//console.log(camId);
// on enferme dans une const le lien vers l'api de la camera recherchée en fonction de son id
const url = `http://localhost:3000/api/cameras/${camId}`;

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
let commande = {};

// réalise une requete vers l'api de la camera recherchée en fonction de son id
fetch(url)
  //on transforme le resultat de la requete (response) en document json (response.json)
  .then((response) => response.json())
  //on recupere le resultat de response.json (qu'on appelle par un nom random (ici camArray)) et on ouvre la fonction
  // attribution des variables
  .then((camArray) => {
    id = camArray._id;
    prix = camArray.price / 100;
    image = camArray.imageUrl;
    nom = camArray.name;
    description = camArray.description;
    lensesArray = camArray.lenses;
    return camArray;
  })
  //Construction de la carte produit.
  .then((camArray) => {
    carteProduit += ` <img src="${image}" class="img-fluid pb-3" />
                            <div class= "row justify-content-around">
                                <h5 class="card-title mr-3">${nom}</h5>
                                <div class="price card-text ml-3">${prix} €</div>
                            </div>
                            <div class="card card-body mb-3">
                                <div class="description card-text">${description}</div>
                            </div>`;
    carteProduit += ` <select class='lense form-control mb-3 text-center'>
                      <option>Choisissez votre lentille</option>`;
    for (let lense of lensesArray) {
      carteProduit += `<option>${lense}</option>`;
    }
    carteProduit += `   </select>`;
    carteProduit += `<h6>Quantité de ${nom} à mettre au panier:</h6>
                          <input class="col-3 mb-3 text-center" type="number" name="quantite" id="quantiteValeur" step="1" value="0" min="1" max="10">
                   <div> <a class="btn btn-secondary panier" href="panier.html" role="button">Ajouter au panier</a></div>`;
    document.querySelector('.cameraCardProduit').innerHTML = carteProduit;
    return camArray;
  })
  //Choix de la lentille // quantité souhaitée // localStorage
  .then((camArray) => {
    lensesRow = document.querySelector('select.lense');
    lensesRow.addEventListener('change', function () {
      lenseOption = this.options[this.selectedIndex].text;
    });
    let quantitéChoix = document.querySelector('input');
    quantitéChoix.addEventListener('change', function () {
      quantité = this.value;
    });
    let ajouterAuPanier = document.querySelector('.panier');
    ajouterAuPanier.addEventListener('click', function () {
      commande = {
        nom: nom,
        photo: image,
        quantité: quantité,
        prixTotal: quantité * prix + '€',
        lentille: lenseOption,
        id: id,
      };
      let commandeLocalStorage = JSON.stringify(commande);
      let key = 'idInStorage' + (localStorage.length + 1);
      localStorage.setItem(key, commandeLocalStorage);
    });
  })
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

if (localStorage.length === 1) {
  let navBarPanier = document.querySelector('.panierV');
  let storage = localStorage.length;
  navBarPanier.innerHTML = `${storage} article dans le panier`;
} else if (localStorage.length > 1) {
  let navBarPanier = document.querySelector('.panierV');
  let storage = localStorage.length;
  navBarPanier.innerHTML = `${storage} articles dans le panier`;
} else {
  let navBarPanier = document.querySelector('.panierV');
  let storage = localStorage.length;
  navBarPanier.innerHTML = `Panier vide`;
}
