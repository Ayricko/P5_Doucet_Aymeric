//Récuperation et utilisation des tableaux du le localStorage pour utiliser les données dans la commande
let recupCommande = localStorage.getItem('commande');
let commandes = JSON.parse(recupCommande);
let array = localStorage.getItem('panier');
let items = JSON.parse(array);

let carteCommande = ` `;
console.log(commandes.quantitéTotal);
//Si le localStorage est vide
if (localStorage.length === 0) {
  carteCommande += `<h5 class="col text-center bg-secondary py-4 rounded">Aucune commande en cours</h5>`;
  document.querySelector('.affichageCommande').innerHTML = carteCommande;
} else {
  //Création du contenu de l'affichage de la commande
  //Partie commune
  carteCommande = `   <p>Numéro de commande: <strong>${commandes[0].objetPost.orderId}</strong></p>
                      <p>Montant total: <strong>${commandes[2].prixTotal} €</strong></p>
                        <p>Bonjour <strong>${commandes[0].objetPost.contact.firstName}</strong> et merci pour ta commande 😉</p>`;

  //Si la commande ne contient qu'un article
  if (commandes[1].quantitéTotal === 1) {
    carteCommande += `         <p>Tu recevras ton <strong>${items[0].nom}+ ${items[0].lentille}</strong> chez toi, à <strong>${commandes[0].objetPost.contact.city}</strong> dans les meilleurs délais!</p>`;

    //Si elle contient plus d'un article
  } else {
    carteCommande += `    <p>Tu recevras chez toi, à <strong>${commandes[0].objetPost.contact.city}</strong> les articles suivant: </p>
                        <ul>`;
    for (let item of items) {
      carteCommande += `<li><strong>${item.quantité} x ${item.nom} + ${item.lentille}</strong></li>`;
    }
    carteCommande += `</ul>`;
  }
  //Partie commune
  carteCommande += `  <p>Nous avons envoyé un récapitulatif de votre commande à <strong>${commandes[0].objetPost.contact.email}</strong></p>
                    <p>Nous espérons que ton expèrience chez Orinoco t'auras apporté entière satisfaction.</p>
                        <p>A bientôt!</p>`;
  document.querySelector('.affichageCommande').innerHTML = carteCommande;

  //Réinitialisation du localStorage après commande
  document.querySelector('.retour').addEventListener('click', function () {
    localStorage.clear();
  });
}
