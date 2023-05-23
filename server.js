const express = require('express');
const app = express();

const port = 3000;

let panier = [];

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenue sur la page d\'accueil');
  });  

app.get('/api/panier', (req, res) => {
    res.send(panier);
  });

app.listen(port, () =>{
    console.log(`le serveur est en cours d'exécution sur le port ${port}`);
});

app.get('/api/produits', (req,res) => {
    const produits = [
        {id: 1, nom: 'produit 1', prix: 9.99},
        {id: 2, nom: 'produit 2', prix: 14.99},
        {id: 3, nom: 'produit 3', prix: 4.99}
    ];
    res.json(produits);
});

app.post('/api/panier', (req, res) => {
  const produit = req.body;
  panier.push(produit);
  res.send('Le produit a été ajouté au panier');
});

app.put('/api/panier/:id/quantite', (req, res) => {
    const produitId = req.params.id;
    const nouvelleQuantite = req.body.quantite;
  
    const produit = panier.find(produit => produit.id == produitId);
  
    if (produit) {
      produit.quantite = nouvelleQuantite;
      res.send('La quantité du produit a été modifiée dans le panier');
    } else {
      res.status(404).send('Produit non trouvé dans le panier');
    }
  });  

app.delete('/api/panier/:id', (req, res) => {
  const produitId = req.params.id;
  const index = panier.findIndex(produit => produit.id == produitId);
  if (index !== -1) {
    panier.splice(index, 1);
    res.send('Le produit a été supprimé du panier');
  } else {
    res.status(404).send('Produit non trouvé dans le panier');
  }
});
