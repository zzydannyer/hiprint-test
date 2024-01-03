/** 给打印增加默认样式 */
function myStyle(mode) {
  mode = mode.toLowerCase();
  mode = mode === "landscape" ? mode : "portrait";
  const style = document.createElement("style");
  style.type = "text/css";
  // style.innerHTML = `@page { size: ${mode}; margin: 20mm;}`;
  style.innerHTML = `@page { size: A4; margin: 20mm;}`;
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
    console.log(
      "🚀 ~ file: index.js:51 ~ iframeDom:",
      iframeDom.focus,
      iframeWin.print
    );
    iframeWin.focus();
    iframeWin.print();
    // 设置一个延时
    setTimeout(() => {
      // 假设用户已经关闭了打印对话框
      // 在这里执行您想要的操作，比如移除 iframe
      document.body.removeChild(iframeDom);
    }, 500); // 延时时间可以根据需要调整
  };
};
