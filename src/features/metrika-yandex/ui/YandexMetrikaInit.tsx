'use client'
import Script from "next/script";

import { YandexMetrikaInitParameters } from "../model/types";
import { useYandexMetrika } from "../model/useYandexMetrika";

type Props = {
  id: number;
  initParameters: YandexMetrikaInitParameters;
};

export const YandexMetrikaInit: React.FC<Props> = ({ id, initParameters }) => {
  useYandexMetrika(id)
  /* eslint-disable @next/next/no-img-element */
  return (
    <>
      <Script
        type="text/javascript"
        id={`ym_${id}`}
        dangerouslySetInnerHTML={{
          __html: /*ts*/`
          (function (m, e, t, r, i, k, a) {
            m[i] = m[i] 
            || function () {
                (m[i].a = m[i].a || []).push(arguments);
              };
            m[i].l = 1 * new Date();
            for (var j = 0; j < document.scripts.length; j++) {
              if (document.scripts[j].src === r) {
                return;
              }
            }
            (k = e.createElement(t)),
            (a = e.getElementsByTagName(t)[0]),
            (k.async = 1),
            (k.src = r),
            a.parentNode.insertBefore(k, a);
            })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${id}", "ym");

          ym(${id}, "init", ${JSON.stringify(initParameters)});`
        }}
        strategy="afterInteractive"
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: "absolute", left: "-9999px;" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
};
