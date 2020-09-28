const params = new URLSearchParams(window.location.search);
// On enferme le resultat de (window.location.search) dans une const, ce resultat correspond aux info qui se situent à la fin de notre URL
//console.log(params);
const camId = params.get('id');
// On enferme le resultat de params.get('id') dans une const, ce resultat correspond aux info qui se situent dans le nom id de l'url, id a été defini dans la app.js, il aurait pu avoir n'importe quel nom.
//console.log(camId);

const url = `http://localhost:3000/api/cameras/${camId}`;
// on enferme dans une const le lien vers l'api de la camera recherchée en fonction de son id

fetch(url)
  // réalise une requete vers l'api de la camera recherchée en fonction de son id
  .then((response) => response.json())
  //on transforme le resultat de la requete (response) en document json (response.json)
  .then((camArray) => {
    let carteProduit = ` `;
    carteProduit += `   <div class="col-lg-6 mb-3">
                            <div class="card text-center shadow">
                                <img src="${camArray.imageUrl}" class="img-fluid p-3" />
                                <div class="card-body pt-0">
                                    <div class= "row justify-content-around">
                                        <h5 class="card-title mr-3">${camArray.name}</h5>
                                        <div class="price card-text ml-3">${camArray.price / 100} €</div>
                                    </div>
                                    <div class="card card-body mb-3">
                                        <div class="description card-text">${camArray.description}</div>
                                    </div>`;

    carteProduit += `   <p>
                            <button class="btn btn-secondary ml-2" type="button" data-toggle="collapse" data-target="#collapseExampleL" aria-expanded="false" aria-controls="collapseExampleL">Lentilles optionnelles</button>
                        </p>
                        <div class="collapse" id="collapseExampleL">`;
    let lensesArray = camArray.lenses;
    for (let lense of lensesArray) {
      carteProduit += ` <div class="card card-body mb-3 lense">
                            <div class="description card-text">${lense}</div>
                        </div>`;
    }
    carteProduit += `              </div> 
                <a class="btn btn-secondary" href="panier.html?id=${camId} role="button">Ajouter au panier</a>  
                                </div>
                            </div>
                        </div>`;
    document.querySelector('.cameraCard').innerHTML = carteProduit;
    let lensesRow = document.querySelectorAll('.lense');
    for (let lenseRow of lensesRow) {
      lenseRow.addEventListener('click', function () {
        this.classList.toggle('bg-secondary');
        this.classList.toggle('active');
      });
    }
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
