import {Image, Money} from '@shopify/hydrogen';

export default function ProductRow({collection}) {
  if (!collection || !collection.products.nodes.length) {
    return <p>No products found in this collection.</p>;
  }

  return (
    <div className="product-row">
      <h2>{collection.title}</h2>
      <div className="product-row-grid">
        {collection.products.nodes.map((product) => (
          <div key={product.id} className="product-card">
            <Image
              src={product.images?.nodes[0]?.url}
              alt={product.images?.nodes[0]?.altText || product.title}
              className="product-image"
            />
            <h3>{product.title}</h3>
            <p>
              <Money data={product.priceRange.minVariantPrice} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
