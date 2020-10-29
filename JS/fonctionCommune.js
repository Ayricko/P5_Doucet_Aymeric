// Nombre de référence associé à l'onglet panier dans la barre de naviguation
if (localStorage.length != 0) {
  let array = localStorage.getItem('basket');
  let items = JSON.parse(array);
  let quantityT = 0;
  let quantityI;

  for (let item of items) {
    quantityI = parseInt(item.quantity);
    quantityT += quantityI;
  }
  if (quantityT < 1) {
    let navBarPanier = document.querySelector('.panier');
    navBarPanier.innerHTML = `Panier vide`;
  } else {
    let navBarPanier = document.querySelector('.panier');
    navBarPanier.innerHTML = `Panier ${quantityT}`;
  }
}
