import React, {useState, useEffect} from 'react';

const BannerSlideshow = () => {
  const images = [
    'https://cdn.shopify.com/s/files/1/0887/6018/9225/files/lotus-design-n-print-wRzBarqn3hs-unsplash_1.jpg?v=1723744815&quality=10',
    'https://cdn.shopify.com/s/files/1/0887/6018/9225/files/aaron-huber-G7sE2S4Lab4-unsplash.jpg?v=1723744895&quality=10',
    'https://cdn.shopify.com/s/files/1/0887/6018/9225/files/francesca-tosolini-tHkJAMcO3QE-unsplash_2.jpg?v=1723745417&quality=10',
    // Add more image URLs here
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div style={{width: '100vw', height: 'auto', overflow: 'hidden'}}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        style={{width: '100%', height: 'auto', objectFit: 'cover'}}
      />
    </div>
  );
};

export default BannerSlideshow;
