import React, {useEffect, useState, useRef} from 'react';
import {gql} from '@shopify/hydrogen';

const ProductRow = ({collectionHandle}) => {
  const [products, setProducts] = useState([]);
  const rowRef = useRef(null);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Fetch products from the collection using the storefront context
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await storefront.query(COLLECTION_QUERY, {
        variables: {handle: collectionHandle},
      });

      if (response?.data?.collection?.products?.edges) {
        setProducts(response.data.collection.products.edges.slice(0, 10));
      }
    };

    fetchProducts();
  }, [collectionHandle]);

  // Swipe Handlers
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].pageX;
    scrollLeft.current = rowRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!startX.current) return;
    const x = e.touches[0].pageX;
    const walk = startX.current - x;
    rowRef.current.scrollLeft = scrollLeft.current + walk;
  };

  const handleTouchEnd = () => {
    startX.current = 0;
    scrollLeft.current = 0;
  };

  return (
    <div
      ref={rowRef}
      style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '1rem',
        scrollBehavior: 'smooth',
        padding: '1rem 0',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {products.map(({node: product}) => (
        <div
          key={product.id}
          style={{
            minWidth: '200px',
            flexShrink: 0,
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            textAlign: 'center',
            backgroundColor: '#fff',
          }}
        >
          <img
            src={product.featuredImage?.url}
            alt={product.featuredImage?.altText || product.title}
            style={{
              width: '100%',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '4px',
            }}
          />
          <h3 style={{fontSize: '1rem', margin: '0.5rem 0'}}>
            {product.title}
          </h3>
          <p style={{color: '#555'}}>
            ${product.priceRange.minVariantPrice.amount}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProductRow;

// GraphQL query to fetch products from a collection
const COLLECTION_QUERY = gql`
  query CollectionProducts($handle: String!) {
    collection(handle: $handle) {
      products(first: 10) {
        edges {
          node {
            id
            title
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
    }
  }
`;
