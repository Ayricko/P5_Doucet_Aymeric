//Création des différentes variables
let carteProduit = ` `;
let commandeRecap = ` `;
let carteValidation = ` `;
let quantitéItem;
let prixItem;
let quantitéTotal = 0;
let prixTotal = 0;
let nom;
let prenom;
let email;
let adresse;
let ville;
let contact = {};
//Action si le localStorage est vide
if (localStorage.length == 0) {
  carteProduit += `<h5 class="col text-center bg-secondary py-4 rounded">Votre panier est vide</h5>`;
  document.querySelector('.items').innerHTML = carteProduit;
  //Affichage des produits dans le panier
} else {
  let array = localStorage.getItem('panier');
  let items = JSON.parse(array);
  for (let item of items) {
    carteProduit += `<div class="row bg-secondary rounded py-2 mb-2">
                        <div class="col-md-2 my-auto">
                            <a href="produit.html?id=${item.id}" role="button">
                                <img src="${item.photo}" class="img-fluid" alt="camera vintage ${item.nom}"/>
                            </a>
                        </div>
                        <div class="col-md-2 my-auto text-center">
                            <h5 class="m-0">${item.nom}</h5>
                        </div>
                        <div class="col-md-2 my-auto text-center">
                            <strong>Lentille:</strong> ${item.lentille}
                        </div>
                        <div class="col-md-2 my-auto text-center">
                            <strong>Qté:</strong> ${item.quantité}
                        </div>
                        <div class="col-md-2 my-auto text-center">
                            <strong>Prix:</strong> ${item.prixTotal} €
                        </div>
                            <a class="btn border m-auto text-center" href="#" role="button">X</a>
                        </div>`;
    document.querySelector('.items').innerHTML = carteProduit;

    // Affichage du récapitulatif de commande
    // Quantité total d'article
    quantitéItem = parseInt(item.quantité);
    quantitéTotal += quantitéItem;
    // Prix total
    prixItem = parseInt(item.prixTotal);
    prixTotal += prixItem;
    if (quantitéTotal > 1) {
      commandeRecap = `<div class="col text-center bg-secondary py-2 rounded">Votre commande est composée de <strong>${quantitéTotal} articles</strong> pour un montant total de <strong>${prixTotal}€</strong></div>`;
      document.querySelector('.recapCommande').innerHTML = commandeRecap;
    } else {
      commandeRecap = `<div class="col text-center bg-secondary py-2 rounded">Le montant total de votre commande est de <strong>${prixTotal}€</strong>`;
      document.querySelector('.recapCommande').innerHTML = commandeRecap;
    }
  }

  // Formulaire
  carteValidation += `<div class='container'>
      <div class='row pt-2 justify-content-around'>
        <p>
          <button class='btn btn-secondary' type='button' data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample'>
            Validation du panier
          </button>
          <a class="btn btn-secondary my-3 supprimer" href="panier.html" role="button">Vider le panier</a>
          </p>
      </div>
      <div class='row'>
        <div class='col-12'>
          <div class='collapse' id='collapseExample'>
            <div class='card card-body mx-1'>
              <form action="" method="POST">
                <div class='form-row'>
                  <div class='form-group col-md-6'>
                    <label for='inputNom'>Nom</label>
                    <input type='text' class='form-control' name='inputNom'required/>
                  </div>
                  <div class='form-group col-md-6'>
                    <label for='inputPrenom'>Prénom</label>
                    <input type='text' class='form-control' name='inputPrenom' required/>
                  </div>
                </div>
                <div class='form-row'>
                    <div class='form-group col-md-6'>
                        <label for='inputAdresse'>Adresse</label>
                        <input type='text' class='form-control' name='inputAdresse' placeholder='Numéro, rue...' required/>
                    </div>
                    <div class='form-group col-md-6'>
                        <label for='inputVille'>Ville</label>
                        <input type='text' class='form-control' name='inputVille' required/>
                    </div>
                </div>
                <div class='form-row'>
                  <div class='form-group col-md-6'>
                    <label for='inputEmail'>Email</label>
                    <input type='email' class='form-control' name='inputEmail' placeholder='Email' required/>
                  </div>
                </div>
                <div class='row justify-content-center'>
                  <button type='submit' class='btn btn-secondary validationFormulaire'>
                    Valider votre panier
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-5"></div>`;
  document.querySelector('.formulaire').innerHTML = carteValidation;

  // Suppresion des articles dans le panier
  document.querySelector('.supprimer').addEventListener('click', function () {
    localStorage.clear();
  });

  // Traitement des données du formulaire
  document.querySelector('.validationFormulaire').addEventListener('click', function () {
    nom = inputNom.value;
    prenom = inputPrenom.value;
    email = inputEmail.value;
    adresse = inputAdresse.value;
    ville = inputVille.value;
    contact = {
      nom: nom,
      prénom: prenom,
      email: email,
      adresse: adresse,
      ville: ville,
    };
  });
}
// Nombre de référence associé à l'onglet panier dans la barre de naviguation
if (localStorage.length < 1) {
  let navBarPanier = document.querySelector('.panier');
  navBarPanier.innerHTML = `Panier`;
} else {
  let navBarPanier = document.querySelector('.panier');
  navBarPanier.innerHTML = `Panier ${quantitéTotal}`;
}
