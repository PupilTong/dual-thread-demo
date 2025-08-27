import '@lynx-js/web-core';
import '@lynx-js/web-elements/XImage';
import '@lynx-js/web-elements/XView';
import '@lynx-js/web-elements/XText';
import '@lynx-js/web-core/index.css';
import '@lynx-js/web-elements/index.css';
import type { LynxView } from '@lynx-js/web-core';
// @ts-expect-error
import * as lynxSrc from '../dist/main.web.bundle' with { type: 'json' };

const lynxView = document.createElement('lynx-view') as LynxView;
lynxView.customTemplateLoader = (name) => {
  return lynxSrc;
};
lynxView.setAttribute('style', 'width: 100vw; height: 100vh;');
lynxView.url = 'lynx://main.web.bundle';
lynxView.setAttribute('id', 'root');
document.body.appendChild(lynxView);
requestAnimationFrame(() => {
  
  lynxView.shadowRoot!.addEventListener('input', (e) => {
    const target = e.target as HTMLElement;
    /**
     * We add detail to the event to make lynx event system happy.
     * Typically this should be a custom element internal logic.
     */
    //@ts-expect-error
    if (target.matches('input[type="range"]') && !e.detail ) {
    //@ts-expect-error
      e.detail = {
        value: (e .target as HTMLInputElement)?.value,
      }
    }
  }, {capture: true, passive: false, });
});
