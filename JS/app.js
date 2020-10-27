//Création d'un constante contenant l'url vers l'API
const url = `http://localhost:3000/api/cameras`;
//Réalisation de la requete vers l'api
fetch(url)
  //Transformation du resultat de la requete (response) en document json (response.json)
  .then((response) => response.json())
  //Récuperation du resultat de response.json (qu'on appelle par un nom random (ici mainArray)) et on ouvre la fonction
  .then((mainArray) => {
    //Construction des cartes produits
    let cardProductIndex = ` `;
    for (let cam of mainArray) {
      cardProductIndex += ` <div class="col-12 col-md-4 col-xl mb-3">
                            <div class="card text-center shadow">
                                <img src="${cam.imageUrl}" class="img-fluid p-3" alt="camera vintage ${cam.name}"/>
                                <div class="card-body">
                                    <h5 class="card-title">${cam.name}</h5>
                                    <div class="price card-text my-3">${cam.price / 100} €</div>
                                    <a class="btn btn-secondary panier" href="produit.html?id=${cam._id}" role="button">Produit</a>
                                </div>
                            </div>
                        </div>`;
    }
    document.querySelector('.cameraCard').innerHTML = cardProductIndex;
  })
  //En cas d'erreur avec le serveur
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
