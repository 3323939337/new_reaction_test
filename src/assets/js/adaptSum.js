/*
使用本适配方案前，请先复制下列的模块到项目依赖中：
* "postcss-adapt-datav": "^0.1.4"
随后需在package.json中添加如下配置：
"postcss": {
    "plugins": {
      "postcss-adapt-datav": {
        "viewportWidth": 1920,
        "viewportHeight": 1080
      }
    }
  }
之后在main中引入本文件的adapt以及package中的pkg
最后import App from './App.vue';adapt(pkg, App);
* */

function getElementHtml() {
    return document.querySelector("html");
}
// 获取Body元素
function getElementBody() {
    return document.querySelector("body");
}

export const viewport = {
    width: 1920,
    height: 1080
};
export const viewport2 = {
    width: 375,
    height: 980
};
export const adapt = (pkg, vm, adaptType = "vci", origin = viewport) => {
    const pluginsPostcss = pkg?.postcss?.plugins;
    if (pluginsPostcss) {
        const pluginPostcssAdapt = pluginsPostcss["postcss-adapt-datav"];
        pluginPostcssAdapt && pluginPostcssAdapt["viewportWidth"] && (viewport.width = pluginPostcssAdapt["viewportWidth"]);
        pluginPostcssAdapt && pluginPostcssAdapt["viewportHeight"] && (viewport.height = pluginPostcssAdapt["viewportHeight"]);
    }
    const elBody = getElementBody();
    const elHtml = getElementHtml();
    const el = vm;
    const originWidth = origin.width, originHeight = origin.height;
    if (adaptType === "full") {
        elHtml.style.height = elBody.style.height = "100%";
        elHtml.style.width = elBody.style.width = "100%";
        elBody.style.overflow = "hidden";
        el.style.width = `${originWidth}px`;
        el.style.height = `${originHeight}px`;
        el.style.transformOrigin = "0 0";
        const resize = {
            inter: -1,
            fn: () => el.style.transform = `scale(${window.innerWidth / originHeight}, ${window.innerHeight / originHeight})`
        };
        window.addEventListener("resize", () => {
            clearTimeout(resize.inter);
            resize.inter = setTimeout(resize.fn, 50);
        });
    } else if (adaptType === "fixed") {
        el.style.width = `${originWidth}px`;
        el.style.height = `${originHeight}px`;
        elBody.style.overflow = null;
    } else if (adaptType === "vci") {
        elBody.style.overflow = "hidden";
    } else {
        console.warn("未知的适配模式: " + adaptType);
    }
};
export const adapt2 = (pkg, vm, adaptType = "vci", origin = viewport2) => {
    const pluginsPostcss = pkg?.postcss?.plugins;
    if (pluginsPostcss) {
        const pluginPostcssAdapt = pluginsPostcss["postcss-adapt-datav"];
        pluginPostcssAdapt && pluginPostcssAdapt["viewportWidth"] && (viewport2.width = pluginPostcssAdapt["viewportWidth"]);
        pluginPostcssAdapt && pluginPostcssAdapt["viewportHeight"] && (viewport2.height = pluginPostcssAdapt["viewportHeight"]);
    }
    const elBody = getElementBody();
    const elHtml = getElementHtml();
    const el = vm;
    const originWidth = origin.width, originHeight = origin.height;
    if (adaptType === "full") {
        elHtml.style.height = elBody.style.height = "100%";
        elHtml.style.width = elBody.style.width = "100%";
        elBody.style.overflow = "hidden";
        el.style.width = `${originWidth}px`;
        el.style.height = `${originHeight}px`;
        el.style.transformOrigin = "0 0";
        const resize = {
            inter: -1,
            fn: () => el.style.transform = `scale(${window.innerWidth / originHeight}, ${window.innerHeight / originHeight})`
        };
        window.addEventListener("resize", () => {
            clearTimeout(resize.inter);
            resize.inter = setTimeout(resize.fn, 50);
        });
    } else if (adaptType === "fixed") {
        el.style.width = `${originWidth}px`;
        el.style.height = `${originHeight}px`;
        elBody.style.overflow = null;
    } else if (adaptType === "vci") {
        elBody.style.overflow = "hidden";
    } else {
        console.warn("未知的适配模式: " + adaptType);
    }
};
export const toNumberType = arg => {
    arg = Number(arg);
    if (isNaN(arg)) return 0;
    return arg;
};
export const toVw = (px, withUnit = true) => toNumberType(px) / (viewport.width / 100) + (withUnit ? "vw" : 0);
export const toVw2 = (px, withUnit = true) => toNumberType(px) / (viewport2.width / 100) + (withUnit ? "vw" : 0);
export const toVh = (px, withUnit = true) => toNumberType(px) / (viewport.height / 100) + (withUnit ? "vh" : 0);
export const toVh2 = (px, withUnit = true) => toNumberType(px) / (viewport2.height / 100) + (withUnit ? "vh" : 0);