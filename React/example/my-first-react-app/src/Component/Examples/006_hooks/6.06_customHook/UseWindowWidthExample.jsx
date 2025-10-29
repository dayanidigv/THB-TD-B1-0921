import React from 'react';
import useWindowWidth, {useDeviceSize} from './useWindowWidthHook';

export default function UseWindowWidthExample() {
  const width = useWindowWidth();
  const [isMobile, isTablet, isDesktop] = useDeviceSize();
  return (
    <div>
      <h4>6.06 - custom Hook (useWindowWidth)</h4>
      <p>Window width: {width}px</p>
      <p>Device size: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</p>

      {isMobile && <p>This is a mobile device.</p>}

      {isTablet && <p>This is a tablet device.</p>}

      {isDesktop && <p>This is a desktop device.</p>}
    </div>
  );
}
