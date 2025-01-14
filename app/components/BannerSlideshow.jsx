import React, {useState, useEffect} from 'react';

const BannerSlideshow = () => {
  const images = [
    'https://cdn.shopify.com/s/files/1/0887/6018/9225/files/lotus-design-n-print-wRzBarqn3hs-unsplash_1.jpg?v=1723744815&quality=50',
    'https://cdn.shopify.com/s/files/1/0887/6018/9225/files/aaron-huber-G7sE2S4Lab4-unsplash.jpg?v=1723744895&quality=50',
    'https://cdn.shopify.com/s/files/1/0887/6018/9225/files/francesca-tosolini-tHkJAMcO3QE-unsplash_2.jpg?v=1723745417&quality=50',
    // Add more image URLs here
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true); // Trigger fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(false); // Trigger fade-in
      }, 500); // Match this duration to the CSS transition time
    }, 10000); // Change image every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div style={{ width: '100vw', height: 'auto', overflow: 'hidden', position: 'relative', marginBottom: '50px', }}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          transition: 'opacity 0.5s ease-in-out', // Smooth fade effect
          opacity: fade ? 0 : 1, // Fade out or in
        }}
      />
    </div>
  );
};

export default BannerSlideshow;
