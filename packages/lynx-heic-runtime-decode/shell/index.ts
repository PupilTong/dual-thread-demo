import "@lynx-js/web-core";
import "@lynx-js/web-elements";
import "@lynx-js/web-core/index.css";
import "@lynx-js/web-elements/index.css";
import type { LynxView } from "@lynx-js/web-core";
// @ts-expect-error
import * as lynxSrc from './dist/main.web.bundle' with { type: "json"};

const lynxView = document.createElement('lynx-view') as LynxView;
lynxView.customTemplateLoader = (name) => {
  return lynxSrc
}
lynxView.setAttribute('style', 'width: 100%; height: 100%;');
lynxView.url = 'lynx://main.web.bundle';
lynxView.setAttribute('id', 'root');
document.body.appendChild(lynxView);