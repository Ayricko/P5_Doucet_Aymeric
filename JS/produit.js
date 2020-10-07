// On enferme le resultat de (window.location.search) dans une const, ce resultat correspond aux info qui se situent à la fin de notre URL
const params = new URLSearchParams(window.location.search);
// console.log(window.location.search);
// On enferme le resultat de params.get('id') dans une const, ce resultat correspond aux infos qui se situent dans le nom id de l'url, id a été defini dans app.js, il aurait pu avoir n'importe quel nom.
const camId = params.get('id');
//console.log(camId);
// on enferme dans une const le lien vers l'api de la camera recherchée en fonction de son id
const url = `http://localhost:3000/api/cameras/${camId}`;

const key = 'panier';
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
                          <input class="col-3 mb-3 border rounded text-center" type="number" name="quantite" id="quantiteValeur" step="1" value="0" min="1" max="10" required>
                   <div><a class="btn btn-secondary addPanier disabled" href="panier.html">Ajouter au panier</a></div>`;
    document.querySelector('.cameraCardProduit').innerHTML = carteProduit;
    return camArray;
  })
  .then((camArray) => {
    let ajouterAuPanier = document.querySelector('.addPanier');
    //Choix de la lentille
    lensesRow = document.querySelector('select.lense');
    lensesRow.addEventListener('change', function () {
      lenseOption = this.options[this.selectedIndex].text;
    });
    // quantité souhaitée
    let quantitéChoix = document.querySelector('input');
    quantitéChoix.addEventListener('change', function () {
      quantité = this.value;
      if (lenseOption !== undefined) {
        document.querySelector('.addPanier').classList.remove('disabled');
      }
    });

    // localStorage
    function ajouterItem(key) {
      key.push({
        nom: nom,
        photo: image,
        quantité: quantité,
        prixTotal: quantité * prix,
        lentille: lenseOption,
        id: id,
      });
    }

    ajouterAuPanier.addEventListener('click', function () {
      if (localStorage.length == 0) {
        let pannier = [];
        ajouterItem(pannier);
        localStorage.setItem(key, JSON.stringify(pannier));
      } else {
        let pannierInitial = localStorage.getItem('panier');
        let newPannier = JSON.parse(pannierInitial);
        ajouterItem(newPannier);
        let commandeLocalStorage = JSON.stringify(newPannier);
        localStorage.setItem(key, commandeLocalStorage);
      }
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
// Nombre de produit associer a l'onglet panier dans la barre de naviguation
if (localStorage.length === 1) {
  let navBarPanier = document.querySelector('.panier');
  let storage = localStorage.length;
  navBarPanier.innerHTML = `${storage} référence dans le panier`;
} else if (localStorage.length > 1) {
  let navBarPanier = document.querySelector('.panier');
  let storage = localStorage.length;
  navBarPanier.innerHTML = `${storage} références dans le panier`;
}
