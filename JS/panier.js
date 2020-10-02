//Création des articles dans le panier
let carteProduit = ` `;
let commandeRecap = ` `;
let arrayRecap;
//Action si le localStorage est vide
if (localStorage.length === 0) {
  carteProduit += `<h5 class="col text-center bg-secondary py-4 rounded">Votre panier est vide</h5>`;
  document.querySelector('.items').innerHTML = carteProduit;
} else {
  for (let i = 1; i < localStorage.length + 1; i++) {
    let key = localStorage.getItem('idInStorage' + i);
    let item = JSON.parse(key);
    carteProduit += `<div class="row bg-secondary rounded py-2 mb-2">
                        <div class="col-md-2 my-auto">
                            <a href="produit.html?id=${item.id}" role="button">
                                <img src="${item.photo}" class="img-fluid" />
                            </a>
                        </div>`;
    carteProduit += `<div class="col-md-2 my-auto text-center">
                        <h5 class="m-0">${item.nom}</h5>
                    </div>`;
    carteProduit += `<div class="col-md-2 my-auto text-center">
                    <strong>Lentille:</strong> ${item.lentille}
                    </div>`;
    carteProduit += `<div class="col-md-2 my-auto text-center">
                    <strong>Qté:</strong> ${item.quantité}
                </div>`;
    carteProduit += `<div class="col-md-2 my-auto text-center">
                    <strong>Prix:</strong> ${item.prixTotal}
                </div>`;
    carteProduit += `<a class="btn border m-auto text-center supprimer" href="panier.html" role="button">X</a>`;
    carteProduit += `</div>`;
    document.querySelector('.items').innerHTML = carteProduit;

    // affichage du recapitulatif de commande
    commandeRecap = `<div class="col text-center bg-secondary py-4 rounded">Le montant total de votre commande est de ${item.prixTotal} pour un total de ${item.quantité} articles</div>`;
    document.querySelector('.recapCommande').innerHTML = commandeRecap;

    //suppresion d'un article dans le panier
    let supprimerS = document.querySelectorAll('.supprimer');
    for (let supprimer of supprimerS) {
      supprimer.addEventListener('click', function () {
        localStorage.removeItem('idInStorage' + i);
      });
    }
  }
}

if (localStorage.length === 1) {
  let navBarPanier = document.querySelector('.panier');
  let storage = localStorage.length;
  navBarPanier.innerHTML = `${storage} article dans le panier`;
} else if (localStorage.length > 1) {
  let navBarPanier = document.querySelector('.panier');
  let storage = localStorage.length;
  navBarPanier.innerHTML = `${storage} articles dans le panier`;
}
