import React from 'react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  variant?: 'default' | 'centered' | 'split' | 'minimal';
  showDecorativeElements?: boolean;
  decorativeImage?: string;
  decorativeImageAlt?: string;
  className?: string;
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ 
  title = "Hi, I'm Gabrielle",
  subtitle = "Living for the moment complexity clicks into clarity.",
  description = "Designer who moves quickly from 'what if' to 'what works'—without losing sight of the why.",
  variant = 'default',
  showDecorativeElements = true,
  decorativeImage = "/images/headshot.jpeg",
  decorativeImageAlt = "Gabrielle Sophia",
  className = "",
  children
}) => {
  const heroClassName = `hero hero--${variant} ${className}`.trim();
  
  // Render content based on variant
  const renderContent = () => {
    switch (variant) {
      case 'minimal':
        return (
          <>
            {title && <h1 className="hero-title">{title}</h1>}
            {subtitle && (
              <h2 className="hero-subtitle">
                {subtitle}
              </h2>
            )}
            {description && <p className="hero-description">{description}</p>}
            {children}
          </>
        );
      case 'centered':
        return (
          <div className="hero-content hero-content--centered" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            {title && <h1 className="hero-title">{title}</h1>}
            {subtitle && (
              <h2 className="hero-subtitle">
                {subtitle}
              </h2>
            )}
            {description && <p className="hero-description">{description}</p>}
            {children}
          </div>
        );
      case 'split':
      case 'default':
      default:
        return (
          <>
            <div className="hero-content" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              {title && <h1 className="hero-title">{title}</h1>}
              {subtitle && (
                <h2 className="hero-subtitle">
                  {subtitle}
                </h2>
              )}
              {description && <p className="hero-description">{description}</p>}
              {children}
            </div>
        
        {showDecorativeElements && (
          <div className="hero-image">
            <div className="photo-frame">
              {/* Background elements */}
              <div className="bg-blur"></div>
              <div className="paper-base"></div>
              
              {/* Top Layer - Designer's Sketch Paper with Irregular Torn Edges */}
              <div className="torn-paper">
                <div className="paper-texture"></div>
                <div className="gradient-blend"></div>
                <div className="edge-feather"></div>
              </div>
              
              {/* Central headshot container */}
              <div id="headshot-container">
                <div className="photo-frame-border"></div>
                <div className="corner-circle" style={{ top: '-6px', left: '-6px' }}></div>
                <div className="corner-circle" style={{ top: '-6px', right: '-6px' }}></div>
                <div className="corner-circle" style={{ bottom: '-6px', left: '-6px' }}></div>
                <div className="corner-circle" style={{ bottom: '-6px', right: '-6px' }}></div>
                <img src={decorativeImage} alt={decorativeImageAlt} className="profile-photo" />
              </div>
              
              {/* Browser window - Top Left */}
              <div className="floating-element browser-window" style={{top: '10%', left: '-15%', width: '180px', height: '120px', transform: 'rotate(-5deg)', animation: 'floatAnimation 9s ease-in-out infinite 0.1s, flashHighlight 2s ease-in-out 0.1s', animationFillMode: 'both'}}>
                <div className="browser-controls">
                  <div className="browser-circle"></div>
                  <div className="browser-circle"></div>
                  <div className="browser-circle"></div>
                </div>
                <div className="browser-address"></div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="browser-line" style={{ width: '80%' }}></div>
                  <div className="browser-line" style={{ width: '60%' }}></div>
                  <div className="browser-line" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              {/* Mobile wireframe - Right Side */}
              <div className="floating-element mobile-wireframe" style={{top: '5%', right: '-5%', width: '70px', height: '140px', transform: 'rotate(15deg)', animation: 'floatAnimation 7s ease-in-out infinite 0.5s, flashHighlight 2s ease-in-out 0.5s', animationFillMode: 'both'}}>
                <div className="mobile-notch"></div>
                <div className="mobile-screen">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', padding: '10px' }}>
                    <div className="mobile-app-icon"></div>
                    <div className="mobile-app-icon"></div>
                    <div className="mobile-app-icon"></div>
                    <div className="mobile-app-icon"></div>
                  </div>
                </div>
                <div className="mobile-button"></div>
              </div>
              
              {/* Tablet wireframe - Bottom Right */}
              <div className="floating-element tablet-wireframe" style={{bottom: '15%', right: '-10%', width: '120px', height: '90px', transform: 'rotate(-8deg)', animation: 'floatAnimation 8s ease-in-out infinite 1s, flashHighlight 2s ease-in-out 1s', animationFillMode: 'both'}}>
                <div className="tablet-screen">
                  <div className="tablet-line" style={{ width: '70%', marginTop: '12px' }}></div>
                  <div className="tablet-line" style={{ width: '50%' }}></div>
                  <div className="tablet-line" style={{ width: '40%' }}></div>
                </div>
                <div className="tablet-button"></div>
              </div>
              
              {/* Data visualization element - Bottom Left */}
              <div className="floating-element" style={{bottom: '15%', left: '-15%', width: '140px', height: '100px', transform: 'rotate(5deg)', animation: 'floatAnimation 8.5s ease-in-out infinite 0.3s, flashHighlight 2s ease-in-out 1.5s', animationFillMode: 'both'}}>
                <div style={{ padding: '10px', height: '100%' }}>
                  <div style={{ width: '100%', height: '80%', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around' }}>
                    <div className="chart-bar" style={{ width: '15%', height: '40%', backgroundColor: 'rgba(0, 80, 255, 0.2)', borderRadius: '2px 2px 0 0', transition: 'all 0.3s ease' }}></div>
                    <div className="chart-bar" style={{ width: '15%', height: '60%', backgroundColor: 'rgba(0, 80, 255, 0.3)', borderRadius: '2px 2px 0 0', transition: 'all 0.3s ease' }}></div>
                    <div className="chart-bar" style={{ width: '15%', height: '80%', backgroundColor: 'rgba(0, 80, 255, 0.4)', borderRadius: '2px 2px 0 0', transition: 'all 0.3s ease' }}></div>
                    <div className="chart-bar" style={{ width: '15%', height: '50%', backgroundColor: 'rgba(0, 80, 255, 0.3)', borderRadius: '2px 2px 0 0', transition: 'all 0.3s ease' }}></div>
                  </div>
                  <div className="chart-line" style={{ width: '100%', height: '2px', backgroundColor: 'rgba(0, 80, 255, 0.4)', marginTop: '5px', transition: 'all 0.3s ease' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
          </>
        );
    }
  };

  return (
    <section className={heroClassName}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        {renderContent()}
      </div>
    </section>
  );
};

export default Hero;
