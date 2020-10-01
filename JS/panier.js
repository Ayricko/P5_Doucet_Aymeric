let carteProduit = ` `;
if (localStorage.length === 0) {
  carteProduit += `<h5 class="text-center bg-secondary py-4 rounded">Votre panier est vide</h5>`;
  document.querySelector('.items').innerHTML = carteProduit;
} else {
  for (let i = 1; i < localStorage.length + 1; i++) {
    let key = localStorage.getItem('idInStorage' + i);
    let item = JSON.parse(key);
    carteProduit += '<div class="row bg-secondary mb-2 rounded">';
    carteProduit += `<div class="col-lg-2 col-md-4 my-auto">
                        <a href="produit.html?id=${item.id}" role="button">
                            <img src="${item.photo}" class="img-fluid my-2" />
                        </a>
                        
                    </div>`;
    carteProduit += `<div class="col-lg-2 col-md-4 my-auto text-center">
                        <h5 class="m-0">${item.nom}</h5>
                    </div>`;
    carteProduit += `<div class="col-lg-2 col-md-4 my-auto text-center">
                    <strong>Lentille:</strong> ${item.lentille}
                    </div>`;
    carteProduit += `<div class="col-lg-2 col-md-4 my-auto text-center">
                    <strong>Qté:</strong> ${item.quantité}
                </div>`;
    carteProduit += `<div class="col-lg-2 col-md-4 my-auto text-center">
                    <strong>Prix:</strong> ${item.prixTotal}
                </div>`;
    carteProduit += `<a class="btn btn-primary my-auto supprimer text-center" href="panier.html" role="button">X</a>`;
    carteProduit += `</div>`;
    document.querySelector('.items').innerHTML = carteProduit;

    let supprimerS = document.querySelectorAll('.supprimer');
    for (let supprimer of supprimerS) {
      supprimer.addEventListener('click', function () {
        localStorage.removeItem('idInStorage' + i);
      });
    }
  }
  produitDansPanier();
}
