import { ImageRun } from "docx";

// 将图片转换为Base64编码的字符串
export  function convertImageToBase64(url, callback) {
    // 创建新的Image对象
    const image = new Image();
  
    // 设置跨域访问，这是必须的如果图片源位于不同的域
    image.crossOrigin = "Anonymous";
  
    // 定义图片加载完成后的处理
    image.onload = function () {
      // 创建HTML Canvas元素
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const ratio = this.naturalWidth / this.naturalHeight;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
  
      // 将图片绘制到Canvas上
      ctx.drawImage(this, 0, 0);
  
      // 将Canvas内容转换为Base64编码的字符串
      const dataURL = canvas.toDataURL("image/jpeg");
  
      // 调用回调函数并传递Base64编码的字符串
      callback({ url: dataURL, ratio });
    };
  
    // 设置图片源
    image.src = url;
  
    // 处理可能的加载错误
    image.onerror = function () {
      console.error("Could not load image at " + url);
    };
  }
  

// 图片标签
export function createImageRun(data, opt = {}) {
  return new Promise((resolve, reject) => {
    const imgUrl = data ?? require("@/assets/branchInfo.png");

    convertImageToBase64(imgUrl, (imgData) => {
      const width = opt.width ?? 572;
      const ratio = opt.ratio ?? imgData.ratio ?? 1;
      const height = opt.height ?? width / ratio;
      resolve(
        new ImageRun({
          data: imgData.url,
          transformation: {
            width,
            height,
          },
          ...opt,
        })
      );
    });
  });
}
