const url = `http://localhost:3000/api/cameras`;
fetch(url)
  .then((response) => response.json())
  .then((mainArray) => {
    let carteProduitIndex = ` `;
    for (let cam of mainArray) {
      carteProduitIndex += ` <div class="col-6 col-lg mb-3">
                            <div class="card text-center shadow">
                                <img src="${cam.imageUrl}" class="img-fluid p-3" />
                                <div class="card-body">
                                    <h5 class="card-title">${cam.name}</h5>
                                    <div class="price card-text my-3">${cam.price / 100} €</div>
                                    <a class="btn btn-secondary panier" href="produit.html?id=${cam._id}" role="button">Détails</a>
                                </div>
                            </div>
                        </div>`;
    }
    document.querySelector('.cameraCard').innerHTML = carteProduitIndex;
    produitDansPanier();
  })
  .catch(
    (document.querySelector('.cameraCard').innerHTML = `<section class='jumBotron'>
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

function produitDansPanier() {
  if (localStorage.length === 1) {
    let navBarPanier = document.querySelector('.panier');
    let storage = localStorage.length;
    navBarPanier.innerHTML = `${storage} article dans le panier`;
  } else if (localStorage.length > 1) {
    let navBarPanier = document.querySelector('.panier');
    let storage = localStorage.length;
    navBarPanier.innerHTML = `${storage} articles dans le panier`;
  } else {
    let navBarPanier = document.querySelector('.panier');
    let storage = localStorage.length;
    navBarPanier.innerHTML = `Panier vide`;
  }
}
