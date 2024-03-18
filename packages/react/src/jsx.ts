import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { Type, Key, Ref, Props, ReactElementType, ElementType } from 'shared/ReactTypes';

export const ReactElement = function (type: Type, key: Key, ref: Ref, props: Props): ReactElementType {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props,
    __mark: 'guyu'
  }

  return element;
};

export const jsx = function (type: ElementType, config: any, ...maybeChildren: any) {
  let key: Key = null;
  const props: Props = {};
  let ref: Ref = null;

  for (let prop in config) {
    const val = config[prop];

    if (prop === 'key') {
      if (val !== undefined) {
        key = '' + val;
      }
      continue;
    }

    if (prop === 'ref') {
      if (val !== undefined) {
        ref = val;
      }
      continue;
    }

    if (Object.prototype.hasOwnProperty.call(config, prop)) {
      props[prop] = val;
    }
  }

  const maybeChildrenLength = maybeChildren.length;

  if (maybeChildrenLength) {
    // 一个子节点
    if (maybeChildrenLength === 1) {
      props.children = maybeChildren[0];
    } else {
      // 多个子节点
      props.children = maybeChildren;
    }
  }

  return ReactElement(type, key, ref, props);
}

export const jsxDev = jsx;