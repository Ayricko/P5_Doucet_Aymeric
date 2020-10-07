//Création des différentes variables
let carteProduit = ` `;
let commandeRecap = ` `;
let carteValidation = ` `;
let quantitéItem;
let prixItem;
let quantitéTotal = 0;
let prixTotal = 0;
// let nom;
// let prenom;
// let email;
// let adresse;
// let ville;
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
    carteProduit += `<div class="row bg-secondary rounded py-3 mb-2">
                        <div class="col-10 col-md-2 m-auto mx-lg-0">
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
                            <a class="btn border m-auto text-center" href="#" role="button">X</a>
                        </div>
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
  carteValidation += `
    <div class='container'>
        <div class='row pt-2 justify-content-around'>
            <p>
            <button class='btn btn-secondary' type='button' data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample'>
                Validation du panier
            </button>
            <a class="btn btn-secondary my-3 supprimer" href="panier.html" role="button">Vider le panier</a>
            </p>
        </div>
        <div class='collapse ' id='collapseExample'>
            <div class='card card-body col-lg-6 mx-1 mx-lg-auto'>
                <form action="" method="POST" id="formulaireValidation" >
                    <div class='form-group'>
                        <label for='nom'>Nom</label>
                        <input type='text' class='form-control' name='nom'required/>
                        <small></small>
                    </div>
                    <div class='form-group'>
                        <label for='prenom'>Prénom</label>
                        <input type='text' class='form-control' name='prenom' required/>
                        <small></small>
                    </div>
                    <div class='form-group'>
                        <label for='adresse'>Adresse</label>
                        <input type='text' class='form-control' name='adresse' placeholder='Numéro rue...' required/>
                        <small></small>
                    </div>
                    <div class='form-group'>
                        <label for='ville'>Ville</label>
                        <input type='text' class='form-control' name='ville' required/>
                        <small></small>
                    </div>
                    <div class='form-group'>
                        <label for='cp'>Code Postal</label>
                        <input type='text' class='form-control' name='cp' required/>
                        <small></small>
                    </div>
                    <div class='form-group'>
                        <label for='email'>Email</label>
                        <input type='email' class='form-control' name='email' placeholder='Email' required/>
                        <small></small>
                    </div>
                    <div class='row justify-content-center'>
                        <button type='submit' class='btn btn-secondary validationFormulaire'>
                        Commander
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="row m-5"></div>`;
  document.querySelector('.formulaire').innerHTML = carteValidation;
  // Suppresion des articles dans le panier
  document.querySelector('.supprimer').addEventListener('click', function () {
    localStorage.clear();
  });
}

// Traitement des données du formulaire
let form = document.querySelector('#formulaireValidation');

//RegExp
let prenomNomVilleRegExp = /^[a-zA-Z ]+$/;
let cpRegExp = /^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$/;
let adresseRegExp = /^[0-9 ]*([a-zA-Z0-9\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*[0-9a-zA-Z ]*$/;
let emailRegExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

// Ecouter la soumission du formulaire
form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (validInput(form.nom) && validInput(form.prenom) && validAdresse(form.adresse) && validInput(form.ville) && validCp(form.cp) && validEmail(form.email)) {
    form.submit();
  }
});
// Ecouteur Nom
form.nom.addEventListener('change', function () {
  validInput(this);
});
// Création de la fonction de test et de la validation de la RegExp
const validInput = (texteDansNom) => {
  let small = texteDansNom.nextElementSibling;
  if (prenomNomVilleRegExp.test(texteDansNom.value)) {
    small.innerHTML = 'Forme Valide';
    small.classList.remove('text-danger');
    small.classList.add('text-success');
    return true;
  } else {
    small.innerHTML = 'forme non valide';
    small.classList.remove('text-success');
    small.classList.add('text-danger');
    return false;
  }
};
// Ecouteur Prenom
form.prenom.addEventListener('change', function () {
  validInput(this);
});

// Ecouteur Adresse
form.adresse.addEventListener('change', function () {
  validAdresse(this);
});
const validAdresse = (texteDansAdresse) => {
  let small = texteDansAdresse.nextElementSibling;
  if (adresseRegExp.test(texteDansAdresse.value)) {
    small.innerHTML = 'Adresse Valide';
    small.classList.remove('text-danger');
    small.classList.add('text-success');
    return true;
  } else {
    small.innerHTML = 'Adresse non valide';
    small.classList.remove('text-success');
    small.classList.add('text-danger');
    return false;
  }
};

// Ecouteur Ville
form.ville.addEventListener('change', function () {
  validInput(this);
});

// Ecouteur Cp
form.cp.addEventListener('change', function () {
  validCp(this);
});
const validCp = (texteDansCp) => {
  let small = texteDansCp.nextElementSibling;
  if (cpRegExp.test(texteDansCp.value)) {
    small.innerHTML = 'Valide';
    small.classList.remove('text-danger');
    small.classList.add('text-success');
    return true;
  } else {
    small.innerHTML = 'Forme non valide';
    small.classList.remove('text-success');
    small.classList.add('text-danger');
    return false;
  }
};

// Ecouteur Email
form.email.addEventListener('change', function () {
  validEmail(this);
});
const validEmail = (texteDansEmail) => {
  let small = texteDansEmail.nextElementSibling;
  if (emailRegExp.test(texteDansEmail.value)) {
    small.innerHTML = 'Email Valide';
    small.classList.remove('text-danger');
    small.classList.add('text-success');
    return true;
  } else {
    small.innerHTML = 'Email non valide';
    small.classList.remove('text-success');
    small.classList.add('text-danger');
    return false;
  }
};

// Nombre de référence associé à l'onglet panier dans la barre de naviguation
if (localStorage.length < 1) {
  let navBarPanier = document.querySelector('.panier');
  navBarPanier.innerHTML = `Panier`;
} else {
  let navBarPanier = document.querySelector('.panier');
  navBarPanier.innerHTML = `Panier ${quantitéTotal}`;
}
