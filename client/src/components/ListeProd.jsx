import React from 'react';
import Product from './Product';

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
  },
  productWrapper: {
    flex: '0 0 calc(20% - 20px)', // 100% / 5 - gap
    boxSizing: 'border-box',
  },
};

const ListeProd = ({ products, all }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Liste des produits :</h1>
      <div style={styles.grid}>
        {products.map((prod) => (
          <div key={prod._id} style={styles.productWrapper}>
            <Product product={prod} all={all} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListeProd;
