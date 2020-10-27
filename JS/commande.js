//Récuperation et utilisation des tableaux du le localStorage pour utiliser les données dans la commande
let order = localStorage.getItem('order');
let orderData = JSON.parse(order);
let array = localStorage.getItem('basket');
let items = JSON.parse(array);

let cardOrder = ` `;
console.log(orderData.quantityTotal);
//Si le localStorage est vide
if (localStorage.length === 0) {
  cardOrder += `<h5 class="col text-center bg-secondary py-4 rounded">Aucune commande en cours</h5>`;
  document.querySelector('.affichageCommande').innerHTML = cardOrder;
} else {
  //Création du contenu de l'affichage de la commande
  //Partie commune
  cardOrder = `   <p>Numéro de commande: <strong>${orderData[0].objetPost.orderId}</strong></p>
                      <p>Montant total: <strong>${orderData[2].priceTotal} €</strong></p>
                        <p>Bonjour <strong>${orderData[0].objetPost.contact.firstName}</strong> et merci pour ta commande 😉</p>`;

  //Si la commande ne contient qu'un article
  if (orderData[1].quantityTotal === 1) {
    cardOrder += `         <p>Tu recevras ton <strong>${items[0].name}+ ${items[0].lense}</strong> chez toi, à <strong>${orderData[0].objetPost.contact.city}</strong> dans les meilleurs délais!</p>`;

    //Si elle contient plus d'un article
  } else {
    cardOrder += `    <p>Tu recevras chez toi, à <strong>${orderData[0].objetPost.contact.city}</strong> les articles suivant: </p>
                        <ul>`;
    for (let item of items) {
      cardOrder += `<li><strong>${item.quantity} x ${item.name} + ${item.lense}</strong></li>`;
    }
    cardOrder += `</ul>`;
  }
  //Partie commune
  cardOrder += `  <p>Nous avons envoyé un récapitulatif de votre commande à <strong>${orderData[0].objetPost.contact.email}</strong></p>
                    <p>Nous espérons que ton expèrience chez Orinoco t'auras apporté entière satisfaction.</p>
                        <p>A bientôt!</p>`;
  document.querySelector('.showOrder').innerHTML = cardOrder;

  //Réinitialisation du localStorage après commande
  document.querySelector('.back').addEventListener('click', function () {
    localStorage.clear();
  });
}
