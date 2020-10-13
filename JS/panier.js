// Création des différentes variables à portée globale
let carteProduit = ` `;
let commandeRecap = ` `;
let carteValidation = ` `;
let quantitéItem;
let prixItem;
let quantitéTotal = 0;
let prixTotal = 0;
const products = [];

// Action si le localStorage est vide
if (localStorage.length === 0 || JSON.parse(localStorage.getItem('panier')).length === 0) {
  carteProduit += `<h5 class="col text-center bg-secondary py-4 rounded">Votre panier est vide</h5>`;
  document.querySelector('.items').innerHTML = carteProduit;

  // Affichage des produits dans le panier
} else {
  let array = localStorage.getItem('panier');
  let items = JSON.parse(array);
  for (let item of items) {
    carteProduit += `<div class="row bg-secondary rounded py-3 mb-2">
                        <div class="col-12 col-md-3 pb-2 pb-md-0 m-auto mx-lg-0">
                            <img src="${item.photo}" class="img-fluid " alt="camera vintage ${item.nom}"/>
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
                            <button type="button" onclick="supprimerItem('${item.id}')" class="btn border m-auto text-center">X</button>
                        </div>
                    </div>`;
    document.querySelector('.items').innerHTML = carteProduit;

    // Affichage du récapitulatif de commande
    // Calcul de la quantité total d'article
    quantitéItem = parseInt(item.quantité);
    quantitéTotal += quantitéItem;

    // Calcul du prix total
    prixItem = parseInt(item.prixTotal);
    prixTotal += prixItem;
    if (quantitéTotal > 1) {
      commandeRecap = ` <div class="col-12 text-center bg-secondary py-2 rounded">
      Articles: <strong>${quantitéTotal}</strong> - Montant total: <strong>${prixTotal}€</strong>
                        </div>`;
      document.querySelector('.recapCommande').innerHTML = commandeRecap;
    } else {
      commandeRecap = `<div class="col text-center bg-secondary py-2 rounded">Montant total: <strong>${prixTotal}€</strong>`;
      document.querySelector('.recapCommande').innerHTML = commandeRecap;
    }
    // Push des item.id dans la variable products pour requete Post
    products.push(item.id);
  }

  // Insertion du formulaire dans le panier
  carteValidation += `
    <div class='container'>
        <div class='row pt-2 justify-content-around'>
            <p>
            <button class='btn btn-secondary' type='button' data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample'>
                Validation du panier
            </button>
            </p>
        </div>
        <div class='collapse ' id='collapseExample'>
            <div class='card card-body col-lg-6 mx-1 mx-lg-auto'>
                <form action="" method="POST" id="formulaireValidation" >
                    <div class='form-group'>
                        <label for='nom'>Nom</label>
                        <input type='text' pattern="^[a-zA-Z ]+$" title="Dorsay" class='form-control' name='nom'required/>
                        <small></small>
                    </div>
                    <div class='form-group'>
                        <label for='prenom'>Prénom</label>
                        <input type='text' pattern="^[a-zA-Z ]+$" title="Jack" class='form-control' name='prenom' required/>
                        <small></small>
                    </div>
                    <div class='form-group'>
                        <label for='adresse'>Adresse</label>
                        <input type='text' pattern="[0-9]{1,3}(([,. ]?){1}[-a-zA-Zàâäéèêëïîôöùûüç']+)*" title="16 rue ..." class='form-control' name='adresse' placeholder='Numéro rue...' required/>
                        <small></small>
                    </div>
                    <div class='form-group'>
                        <label for='ville'>Ville</label>
                        <input type='text' pattern="[a-zA-Z ]{1,20}" title="La Roche Sur Yon" class='form-control' name='ville' required/>
                        <small></small>
                    </div>
                    <div class='form-group'>
                        <label for='cp'>Code Postal</label>
                        <input type='text' pattern="^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$" title="85000" class='form-control' name='cp' required/>
                        <small></small>
                    </div>
                    <div class='form-group'>
                        <label for='email'>Email</label>
                        <input type='email' title="exemple@site.fr" class='form-control' name='email' placeholder='Email' required/>
                        <small></small>
                    </div>
                    <div class='row justify-content-center'>
                        <input class="btn btn-secondary" type="submit" value="Commander">
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="row m-5"></div>`;
  document.querySelector('.formulaire').innerHTML = carteValidation;
}

// Suppresion des articles dans le panier
// Création de la fonction associé au onclick du bouton supprimer
function supprimerItem(id) {
  const items = JSON.parse(localStorage.getItem('panier'));
  const newItems = items.filter((item) => item.id != id);
  localStorage.setItem('panier', JSON.stringify(newItems));
  document.location.href = 'panier.html';
}

// Traitement des données du formulaire
// Création de la fonction de validation des RegExp
function validationRegExp(champCible, regExp, message) {
  champCible.addEventListener('change', function () {
    let small = champCible.nextElementSibling;
    if (regExp.test(champCible.value)) {
      small.innerHTML = `Format valide`;
      small.classList.remove('text-danger');
      small.classList.add('text-success');
    } else {
      small.innerHTML = `Format ${message} non valide`;
      small.classList.remove('text-success');
      small.classList.add('text-danger');
    }
  });
}

// Création de la varibale form pour accrocher les infos du formulaire
let form = document.querySelector('#formulaireValidation');

// La fonction si évite un message d'erreur dans la console si le panier est vide
if (form) {
  // RegExp
  let prenomNomRegExp = /^[a-zA-Z ]+$/;
  let villeRegExp = /[a-zA-Z]{1,20}/;
  let cpRegExp = /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/;
  let adresseRegExp = /[0-9]{1,5}\s[a-zA-Z]{1,10}\s([a-zA-Z\s]{1,50}){1,5}/;
  let emailRegExp = /[a-zA-Z0-9\.]{1,50}@[a-zA-Z]{1,50}\.[a-zA-Z]{1,8}/;

  // Variable des input => utilisation dans la validation des champs et dans l'envoi des données pour la confirmation de commande
  let nom = form.nom;
  let prenom = form.prenom;
  let ville = form.ville;
  let adresse = form.adresse;
  let cp = form.cp;
  let email = form.email;

  // Validation des champs
  validationRegExp(nom, prenomNomRegExp, 'Nom');
  validationRegExp(prenom, prenomNomRegExp, 'Prénom');
  validationRegExp(ville, villeRegExp, 'Ville');
  validationRegExp(adresse, adresseRegExp, 'Adresse');
  validationRegExp(cp, cpRegExp, 'Code_postale');
  validationRegExp(email, emailRegExp, 'email');

  // Validation et envoi du formulaire
  form.addEventListener('submit', function (e) {
    // Annulation de la fonction submit par defaut du bouton
    e.preventDefault();
    // Création de l'objet contact
    const contact = {
      firstName: prenom.value,
      lastName: nom.value,
      address: adresse.value,
      city: ville.value,
      email: email.value,
    };

    // Création de la requete FETCH post
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contact, products }),
    };
    fetch('http://localhost:3000/api/cameras/order', options)
      .then((response) => response.json())
      .then((objetPost) => {
        let commandeArray = [];
        commandeArray.push({ objetPost }, { quantitéTotal });
        localStorage.setItem('commande', JSON.stringify(commandeArray));
        document.location.href = 'commande.html';
      })
      .catch(function () {
        alert('Echec de communication avec notre serveur.');
      });
  });
}
