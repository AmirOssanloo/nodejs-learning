import React, { Suspense } from 'react';
import { render } from 'react-dom';
import App from '#containers/app';
import Preloader from '#components/preloader';
import ResetStyle from '#styles/reset';
import GlobalStyle from '#styles/global';
import { ContextProvider } from '#containers/app/AppContext'
import { preloadImages } from '#utils/imageCache';
import heroVignetteTexture from '#static/images/hero_vignette.png';
import marbleDarkPatternTexture from '#static/images/marble-dark_pattern.jpg';
import marbleLightPatternTexture from '#static/images/marble-light_pattern.jpg';
import particleGlowTexture from '#static/images/particle_glow.png';
import rollGradientTexture from '#static/images/roll_gradient.png';
import rollHolderTexture from '#static/images/roll_holder.png';
import sheetTexture from '#static/images/sheet_texture.jpg';
import tilePatternTexture from '#static/images/tile_pattern.jpg';
import instructionIconGrabClosedTexture from '#static/images/instruction-icon_grab-closed.png';
import instructionIconGrabOpenTexture from '#static/images/instruction-icon_grab-open.png';
import '#containers/app/AppContext';

const images = [
  { id: 'hero_vignette', src: heroVignetteTexture },
  { id: 'marble-dark_pattern', src: marbleDarkPatternTexture },
  { id: 'marble-light_pattern', src: marbleLightPatternTexture },
  { id: 'particle_glow', src: particleGlowTexture },
  { id: 'roll_gradient', src: rollGradientTexture },
  { id: 'roll_holder', src: rollHolderTexture },
  { id: 'sheet_texture', src: sheetTexture },
  { id: 'tile_pattern', src: tilePatternTexture },
  { id: 'instruction-icon_grab-closed', src: instructionIconGrabClosedTexture },
  { id: 'instruction-icon_grab-open', src: instructionIconGrabOpenTexture }
];

preloadImages(images, () => {
  const app = (
    <React.Fragment>
      <ResetStyle />
      <GlobalStyle />
      <ContextProvider>
        <App />
      </ContextProvider>
    </React.Fragment>
  );

  render(app, document.querySelector('#app-root'));
});
