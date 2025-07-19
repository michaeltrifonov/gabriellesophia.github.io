import React, { useState, useEffect } from 'react';

interface ArtworkItem {
  src: string;
  alt: string;
  frameClass: string;
}

interface ArtworkGalleryProps {
  artworks: ArtworkItem[];
}

const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ artworks }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<ArtworkItem | null>(null);

  const openModal = (artwork: ArtworkItem) => {
    setCurrentImage(artwork);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImage(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [modalOpen]);

  useEffect(() => {
    // Scroll animations for artwork frames
    const frames = document.querySelectorAll('.artwork-frame');
    frames.forEach((frame, index) => {
      const element = frame as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = `${element.style.transform || ''} translateY(30px)`;
      element.style.transition = `opacity 0.8s ease, transform 0.8s cubic-bezier(0.2, 0.85, 0.4, 1.4)`;
      element.style.transitionDelay = `${0.4 + (index * 0.2)}s`;
      
      // Intersection Observer for scroll animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = element.style.transform.replace('translateY(30px)', '');
            }, 200);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(element);
    });
  }, []);

  return (
    <>
      <div className="artwork-gallery">
        {artworks.map((artwork, index) => (
          <div 
            key={index}
            className={`artwork-frame ${artwork.frameClass}`} 
            data-artwork={index + 1}
            onClick={() => openModal(artwork)}
          >
            <img src={artwork.src} alt={artwork.alt} />
          </div>
        ))}
      </div>
      
      {/* Artwork Modal/Lightbox */}
      <div className={`artwork-modal ${modalOpen ? 'active' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          {currentImage && (
            <img 
              src={currentImage.src} 
              alt="Enlarged Artwork" 
              className={currentImage.frameClass === 'frame-3' ? 'triptych-modal' : ''}
              onLoad={(e) => {
                const img = e.currentTarget;
                const imgRatio = img.naturalWidth / img.naturalHeight;
                const windowRatio = window.innerWidth / window.innerHeight;
                
                if (imgRatio > windowRatio) {
                  img.style.width = '90vw';
                  img.style.height = 'auto';
                } else {
                  img.style.height = '85vh';
                  img.style.width = 'auto';
                }
              }}
            />
          )}
        </div>
        <div className="modal-close" onClick={closeModal}>&times;</div>
      </div>
    </>
  );
};

export default ArtworkGallery;