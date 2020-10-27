// Nombre de référence associé à l'onglet panier dans la barre de naviguation
if (localStorage.length != 0) {
  let array = localStorage.getItem('basket');
  let items = JSON.parse(array);
  let quantitéT = 0;
  let quantitéI;

  for (let item of items) {
    quantitéI = parseInt(item.quantity);
    quantitéT += quantitéI;
  }
  if (quantitéT < 1) {
    let navBarPanier = document.querySelector('.panier');
    navBarPanier.innerHTML = `Panier vide`;
  } else {
    let navBarPanier = document.querySelector('.panier');
    navBarPanier.innerHTML = `Panier ${quantitéT}`;
  }
}
