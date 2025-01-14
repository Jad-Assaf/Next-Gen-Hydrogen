import React, {useEffect, useState, useRef} from 'react';
import {useShopQuery, gql} from '@shopify/hydrogen';

const ProductRow = ({collectionHandle}) => {
  const [products, setProducts] = useState([]);
  const rowRef = useRef(null); // Reference to the row for swipe functionality
  const startX = useRef(0); // To track the starting X position of the swipe
  const scrollLeft = useRef(0); // To track the initial scroll position

  // Fetch products from the collection
  const {data} = useShopQuery({
    query: COLLECTION_QUERY,
    variables: {handle: collectionHandle},
  });

  useEffect(() => {
    if (data?.collection?.products?.edges) {
      // Limit to 10 products
      setProducts(data.collection.products.edges.slice(0, 10));
    }
  }, [data]);

  // Swipe Handlers
  const handleTouchStart = (e) => {
    startX.current = e.touches[0].pageX; // Record the starting X position
    scrollLeft.current = rowRef.current.scrollLeft; // Record the initial scroll position
  };

  const handleTouchMove = (e) => {
    if (!startX.current) return;
    const x = e.touches[0].pageX; // Current X position
    const walk = startX.current - x; // Calculate the distance swiped
    rowRef.current.scrollLeft = scrollLeft.current + walk; // Update the scroll position
  };

  const handleTouchEnd = () => {
    startX.current = 0; // Reset the starting X position
    scrollLeft.current = 0; // Reset the scroll position
  };

  return (
    <div
      ref={rowRef}
      style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '1rem',
        scrollBehavior: 'smooth', // Smooth scrolling
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
