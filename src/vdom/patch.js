export function patch(el, vnode) {
  const elm = createElm(vnode);
  console.log('elm', elm);
  const parentNode = el.parentNode;
  parentNode.insertBefore(elm, el.nextSibling);
  parentNode.removeChild(el);
  return elm; // 返回最新节点
}

function createElm(vnode) {
  let { tag, data, children, text, vm } = vnode;
  if ( typeof tag === 'string') {
    vnode.el = document.createElement(tag);
    updateProperties(vnode.el, data);
    children.forEach(child => {
      vnode.el.appendChild(createElm(child))
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

function updateProperties(el, props={}) {
  for (const key in props) {
    el.setAttribute(key, props[key])
  }
}