/** 给打印增加默认样式 */
function myStyle(mode) {
  mode = mode.toLowerCase();
  mode = mode === "landscape" ? mode : "portrait";
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = `@page { size: ${mode}; margin: 10mm;}`;
  return style;
}

/** @description 动态打印 */
export const printPartial = (
  dom,
  { title = document.title, mode = "portrait" } = {}
) => {
  if (!(dom && dom.outerHTML)) return;
  let copyDom = document.createElement("span");
  const styleDom = document.querySelectorAll("style, link, meta");
  const titleDom = document.createElement("title");
  titleDom.innerText = title;
  copyDom.appendChild(titleDom);
  Array.from(styleDom).forEach((item) => {
    copyDom.appendChild(item.cloneNode(true));
  });
  copyDom.appendChild(myStyle(mode));
  const headTemp = copyDom.innerHTML;
  copyDom = null;
  const iframeDom = document.createElement("iframe");
  const attrObj = {
    height: 0,
    width: 0,
    border: 0,
    wmode: "Opaque",
  };
  const styleObj = {
    position: "absolute",
    top: "-999px",
    left: "-999px",
  };
  Object.entries(attrObj).forEach(([key, value]) => {
    iframeDom.setAttribute(key, value);
  });
  Object.entries(styleObj).forEach(([key, value]) => {
    iframeDom.style[key] = value;
  });
  iframeDom.srcdoc = `<html><head>${headTemp}</head></head><body style="-webkit-print-color-adjust: exact;">${dom.outerHTML}</body></html>`;
  document.body.insertBefore(iframeDom, document.body.children[0]);
  const iframeWin = iframeDom.contentWindow;

  iframeDom.onload = () => {
    iframeWin.focus();
    iframeWin.print();
    document.body.removeChild(iframeDom);
  };
};
