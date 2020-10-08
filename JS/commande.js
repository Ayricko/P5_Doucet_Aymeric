//Récuperation et utilisation des tableaux du le localStorage pour utiliser les données dans la commande
let recupCommande = localStorage.getItem('commande');
let commandes = JSON.parse(recupCommande);
let array = localStorage.getItem('panier');
let items = JSON.parse(array);
//Création du contenu de l'affichage de la commande
//Partie commune
let carteCommande = `   <p>Commande <strong>${commandes[0].objetPost.orderId}</strong></p>
                        <p>Bonjour <strong>${commandes[0].objetPost.contact.firstName}</strong> et merci pour ta commande 😉</p>`;

//Si la commande ne contient qu'un article
if (commandes[2].quantitéTotal == 1) {
  carteCommande += `         <p>Tu recevras ton <strong>${items[0].nom}</strong> chez toi, à <strong>${commandes[0].objetPost.contact.city}</strong> dans les meilleurs délais!</p>`;

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
carteCommande += `  <p>Nous avons envoyé un récap de tout ça à <strong>${commandes[0].objetPost.contact.email}</strong></p>
                    <p>Nous espérons que ton expèrience chez Orinoco t'auras apporté entière satisfaction.</p>
                        <p>A bientôt!</p>`;
document.querySelector('.affichageCommande').innerHTML = carteCommande;

//Réinitialisation du localStorage après commande
document.querySelector('.retour').addEventListener('click', function () {
  localStorage.clear();
});
