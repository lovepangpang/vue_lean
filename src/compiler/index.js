import { parseHTML } from "./parser";

function genProps(attrs) {
  let str = '';
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    if(attr.name === 'style') {
      let styles = {};
      attr.value.replace(/([^:;]+):([^;:]+)/g, function(){
        debugger;
        console.log(arguments);
        styles[arguments[1]] = arguments[2];
      })
      attr.value = styles;
    }
    str+=`${attr.name}:${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`;
}

function generate(ast) {
  let code = `_c('${ast.tag}', ${
    ast.attrs.length ? genProps(ast.attrs) : 'undefined'
  }${
    ast.children ? `,[]` : ''
  })`
  return code
}

export function compileToFunction(template) {
  // 1. 将模板变成ast语法树
  let ast = parseHTML(template);
  console.log('ast语法树', ast);

  // 2.代码生成
  let code = generate(ast);
  console.log('code :>> ', code);
}

// 1. 编译原理
// 2. 响应式原理 依赖收集
// 3. 组件化开发
// 4. diff算法
