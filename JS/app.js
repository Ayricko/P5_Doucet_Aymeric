const url = `http://localhost:3000/api/cameras`;
fetch(url)
  .then((response) => response.json())
  .then((principalArray) => {
    let carteProduit = ` `;
    for (let i = 0; i < principalArray.length; i++) {
      carteProduit += ` <div class="col mb-3">
                            <div class="card text-center shadow">
                                <a href="produit.html?id=${principalArray[i]._id}"><img src="${principalArray[i].imageUrl}" class="img-fluid p-3" /></a>
                                <div class="card-body">
                                    <h5 class="card-title">${principalArray[i].name}</h5>
                                    <div class="price card-text my-3">${principalArray[i].price / 100} €</div>
                                    <p>
                                        <button class="btn btn-secondary" type="button" data-toggle="collapse" data-target="#collapseExample${i}" aria-expanded="false" aria-controls="collapseExample${i}">Description</button>
                                    </p>
                                    <div class="collapse" id="collapseExample${i}">
                                        <div class="card card-body mb-3">
                                            <div class="description card-text">${principalArray[i].description}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    }
    document.querySelector('.cameraCard').innerHTML = carteProduit;
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
