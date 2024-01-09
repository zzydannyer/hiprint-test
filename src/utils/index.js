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

export function mmToPx(mm, ppi) {
  // 1英寸等于25.4毫米
  const inches = mm / 25.4;
  // 将英寸转换为像素
  const pixels = inches * ppi;
  // 四舍五入到最近的整数
  return Math.round(pixels);
}

export function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}
export function convertImageToBase64(url, callback) {
  // 创建新的Image对象
  const image = new Image();

  // 设置跨域访问，这是必须的如果图片源位于不同的域
  image.crossOrigin = "Anonymous";

  // 定义图片加载完成后的处理
  image.onload = function () {
    // 创建HTML Canvas元素
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;

    // 将图片绘制到Canvas上
    ctx.drawImage(this, 0, 0);

    // 将Canvas内容转换为Base64编码的字符串
    const dataURL = canvas.toDataURL("image/jpeg");

    // 调用回调函数并传递Base64编码的字符串
    callback(dataURL);
  };

  // 设置图片源
  image.src = url;

  // 处理可能的加载错误
  image.onerror = function () {
    console.error("Could not load image at " + url);
  };
}
