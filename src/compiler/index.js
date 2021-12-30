import { parseHTML } from "./parser";
import { generate } from "./generate"
export function compileToFunction(template) {
  // 1. 将模板变成ast语法树
  let ast = parseHTML(template);
  console.log('ast语法树', ast);

  // 2.代码生成
  let code = generate(ast);
  console.log('code :>> ', code);
  // with语句 扩展一个语句的作用域链
  let render = new Function(`with(this){return ${code}}`);
  console.log(render);
  return render;
}

// 1. 编译原理
// 2. 响应式原理 依赖收集
// 3. 组件化开发
// 4. diff算法
