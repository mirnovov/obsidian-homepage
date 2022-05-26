var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/main.ts
__export(exports, {
  default: () => Homepage
});
var import_obsidian3 = __toModule(require("obsidian"));

// src/settings.ts
var import_obsidian2 = __toModule(require("obsidian"));

// src/suggest.ts
var import_obsidian = __toModule(require("obsidian"));

// node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }
  return node;
}

// node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element) {
  var rect = element.getBoundingClientRect();
  return {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    x: rect.left,
    y: rect.top
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}

// node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}

// node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}

// node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (true) {
    if (!isHTMLElement(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "));
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
    }
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x = _ref.x, y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(round(x * dpr) / dpr) || 0,
    y: round(round(y * dpr) / dpr) || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets;
  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y = _ref3$y === void 0 ? 0 : _ref3$y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top) {
      sideY = bottom;
      y -= offsetParent[heightProp] - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left) {
      sideX = right;
      x -= offsetParent[widthProp] - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref4) {
  var state = _ref4.state, options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  if (true) {
    var transitionProperty = getComputedStyle(state.elements.popper).transitionProperty || "";
    if (adaptive && ["transform", "top", "right", "bottom", "left"].some(function(property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
    }
  }
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}

// node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var referenceElement = state.elements.reference;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(referenceElement);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
    if (true) {
      console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" "));
    }
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = popperOffsets2[mainAxis] + overflow[mainSide];
    var max2 = popperOffsets2[mainAxis] - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets2[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets2[mainAxis] + maxOffset - offsetModifierValue;
    if (checkMainAxis) {
      var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
      popperOffsets2[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _mainSide = mainAxis === "x" ? top : left;
      var _altSide = mainAxis === "x" ? bottom : right;
      var _offset = popperOffsets2[altAxis];
      var _min = _offset + overflow[_mainSide];
      var _max = _offset - overflow[_altSide];
      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/@popperjs/core/lib/utils/format.js
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [].concat(args).reduce(function(p, c) {
    return p.replace(/%s/, c);
  }, str);
}

// node_modules/@popperjs/core/lib/utils/validateModifiers.js
var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function validateModifiers(modifiers) {
  modifiers.forEach(function(modifier) {
    Object.keys(modifier).forEach(function(key) {
      switch (key) {
        case "name":
          if (typeof modifier.name !== "string") {
            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', '"' + String(modifier.name) + '"'));
          }
          break;
        case "enabled":
          if (typeof modifier.enabled !== "boolean") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', '"' + String(modifier.enabled) + '"'));
          }
        case "phase":
          if (modifierPhases.indexOf(modifier.phase) < 0) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(", "), '"' + String(modifier.phase) + '"'));
          }
          break;
        case "fn":
          if (typeof modifier.fn !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "effect":
          if (typeof modifier.effect !== "function") {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', '"' + String(modifier.fn) + '"'));
          }
          break;
        case "requires":
          if (!Array.isArray(modifier.requires)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', '"' + String(modifier.requires) + '"'));
          }
          break;
        case "requiresIfExists":
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', '"' + String(modifier.requiresIfExists) + '"'));
          }
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + modifier.name + '" modifier, valid properties are ' + VALID_PROPERTIES.map(function(s) {
            return '"' + s + '"';
          }).join(", ") + '; but "' + key + '" was provided.');
      }
      modifier.requires && modifier.requires.forEach(function(requirement) {
        if (modifiers.find(function(mod) {
          return mod.name === requirement;
        }) == null) {
          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

// node_modules/@popperjs/core/lib/utils/uniqueBy.js
function uniqueBy(arr, fn2) {
  var identifiers = new Set();
  return arr.filter(function(item) {
    var identifier = fn2(item);
    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

// node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/@popperjs/core/lib/createPopper.js
var INVALID_ELEMENT_ERROR = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.";
var INFINITE_LOOP_ERROR = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.";
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(options2) {
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        if (true) {
          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function(_ref) {
            var name = _ref.name;
            return name;
          });
          validateModifiers(modifiers);
          if (getBasePlacement(state.options.placement) === auto) {
            var flipModifier = state.orderedModifiers.find(function(_ref2) {
              var name = _ref2.name;
              return name === "flip";
            });
            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
            }
          }
          var _getComputedStyle = getComputedStyle(popper2), marginTop = _getComputedStyle.marginTop, marginRight = _getComputedStyle.marginRight, marginBottom = _getComputedStyle.marginBottom, marginLeft = _getComputedStyle.marginLeft;
          if ([marginTop, marginRight, marginBottom, marginLeft].some(function(margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
          }
        }
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;
            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect4 = _ref3.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});

// src/utils.ts
function trimFile(file) {
  return file.path.slice(0, -3);
}
function wrapAround(value, size) {
  return (value % size + size) % size;
}
function getWorkspacePlugin(app) {
  return app.internalPlugins.plugins.workspaces;
}
function disableSetting(setting) {
  setting.settingEl.setAttribute("style", "opacity: .5; pointer-events: none !important");
}
function upgradeSettings(plugin) {
  return __async(this, null, function* () {
    plugin.settings.workspace = plugin.settings.defaultNote;
    if (plugin.settings.alwaysPreview) {
      plugin.settings.openMode = View.Reading;
    }
    plugin.settings.version = 2;
    yield plugin.saveSettings();
  });
}
function hasDataview(app) {
  return app.plugins.plugins.dataview != null;
}
function touchDataview(app) {
  var _a;
  (_a = app.plugins.plugins.dataview) == null ? void 0 : _a.index.touch();
}

// src/suggest.ts
var Suggest = class {
  constructor(owner, containerEl, scope) {
    this.owner = owner;
    this.containerEl = containerEl;
    containerEl.on("click", ".suggestion-item", this.onSuggestionClick.bind(this));
    containerEl.on("mousemove", ".suggestion-item", this.onSuggestionMouseover.bind(this));
    scope.register([], "ArrowUp", (event) => {
      if (!event.isComposing) {
        this.setSelectedItem(this.selectedItem - 1, true);
        return false;
      }
    });
    scope.register([], "ArrowDown", (event) => {
      if (!event.isComposing) {
        this.setSelectedItem(this.selectedItem + 1, true);
        return false;
      }
    });
    scope.register([], "Enter", (event) => {
      if (!event.isComposing) {
        this.useSelectedItem(event);
        return false;
      }
    });
  }
  onSuggestionClick(event, el) {
    event.preventDefault();
    const item = this.suggestions.indexOf(el);
    this.setSelectedItem(item, false);
    this.useSelectedItem(event);
  }
  onSuggestionMouseover(_event, el) {
    const item = this.suggestions.indexOf(el);
    this.setSelectedItem(item, false);
  }
  setSuggestions(values) {
    this.containerEl.empty();
    const suggestionEls = [];
    values.forEach((value) => {
      const suggestionEl = this.containerEl.createDiv("suggestion-item");
      this.owner.renderSuggestion(value, suggestionEl);
      suggestionEls.push(suggestionEl);
    });
    this.values = values;
    this.suggestions = suggestionEls;
    this.setSelectedItem(0, false);
  }
  useSelectedItem(event) {
    const currentValue = this.values[this.selectedItem];
    if (currentValue) {
      this.owner.selectSuggestion(currentValue, event);
    }
  }
  setSelectedItem(selectedIndex, scrollIntoView) {
    const normalizedIndex = wrapAround(selectedIndex, this.suggestions.length);
    const prevSelectedSuggestion = this.suggestions[this.selectedItem];
    const selectedSuggestion = this.suggestions[normalizedIndex];
    prevSelectedSuggestion == null ? void 0 : prevSelectedSuggestion.removeClass("is-selected");
    selectedSuggestion == null ? void 0 : selectedSuggestion.addClass("is-selected");
    this.selectedItem = normalizedIndex;
    if (scrollIntoView) {
      selectedSuggestion.scrollIntoView(false);
    }
  }
};
var TextInputSuggest = class {
  constructor(app, inputEl) {
    this.app = app;
    this.inputEl = inputEl;
    this.scope = new import_obsidian.Scope();
    this.suggestEl = createDiv("suggestion-container");
    const suggestion = this.suggestEl.createDiv("suggestion");
    this.suggest = new Suggest(this, suggestion, this.scope);
    this.scope.register([], "Escape", this.close.bind(this));
    this.inputEl.addEventListener("input", this.onInputChanged.bind(this));
    this.inputEl.addEventListener("focus", this.onInputChanged.bind(this));
    this.inputEl.addEventListener("blur", this.close.bind(this));
    this.suggestEl.on("mousedown", ".suggestion-container", (event) => {
      event.preventDefault();
    });
  }
  onInputChanged() {
    const inputStr = this.inputEl.value;
    const suggestions = this.getSuggestions(inputStr);
    if (suggestions.length > 0) {
      this.suggest.setSuggestions(suggestions);
      this.open(this.app.dom.appContainerEl, this.inputEl);
    }
  }
  open(container, inputEl) {
    this.app.keymap.pushScope(this.scope);
    container.appendChild(this.suggestEl);
    this.popper = createPopper(inputEl, this.suggestEl, {
      placement: "bottom-start",
      modifiers: [
        {
          name: "sameWidth",
          enabled: true,
          fn: ({ state, instance }) => {
            const targetWidth = `${state.rects.reference.width}px`;
            if (state.styles.popper.width === targetWidth) {
              return;
            }
            state.styles.popper.width = targetWidth;
            instance.update();
          },
          phase: "beforeWrite",
          requires: ["computeStyles"]
        }
      ]
    });
  }
  close() {
    this.app.keymap.popScope(this.scope);
    this.suggest.setSuggestions([]);
    if (this.popper)
      this.popper.destroy();
    this.suggestEl.detach();
  }
};

// src/settings.ts
var Mode;
(function(Mode2) {
  Mode2["ReplaceAll"] = "Replace all open notes";
  Mode2["ReplaceLast"] = "Replace last note";
  Mode2["Retain"] = "Keep open notes";
})(Mode || (Mode = {}));
var View;
(function(View2) {
  View2["Default"] = "Default view";
  View2["Reading"] = "Reading view";
  View2["Source"] = "Editing view (Source)";
  View2["LivePreview"] = "Editing view (Live Preview)";
})(View || (View = {}));
var DEFAULT = {
  version: 0,
  defaultNote: "Home",
  useMoment: false,
  momentFormat: "YYYY-MM-DD",
  workspace: "Home",
  workspaceEnabled: false,
  hasRibbonIcon: true,
  openMode: Mode.ReplaceAll,
  view: View.Default,
  refreshDataview: false
};
var HomepageSettingTab = class extends import_obsidian2.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.settings = plugin.settings;
  }
  sanitiseNote(value) {
    if (value === null || value.match(/^\s*$/) !== null) {
      return null;
    }
    return (0, import_obsidian2.normalizePath)(value);
  }
  display() {
    var _a;
    const workspacesMode = this.plugin.workspacesMode();
    this.containerEl.empty();
    const suggestor = workspacesMode ? WorkspaceSuggest : FileSuggest;
    const homepageDesc = workspacesMode ? "The name of the workspace to open on startup." : "The name of the note to open on startup. If it doesn't exist, a new note will be created.";
    const homepage = workspacesMode ? "workspace" : "defaultNote";
    if (this.plugin.settings.useMoment && !this.plugin.settings.workspaceEnabled) {
      new import_obsidian2.Setting(this.containerEl).setName("Homepage").setDesc("The name of the note to be opened on startup, using moment syntax. If it doesn't exist, a new note will be created.").addMomentFormat((text) => text.setDefaultFormat("YYYY-MM-DD").setValue(this.plugin.settings.momentFormat).onChange((value) => {
        this.plugin.settings.momentFormat = value;
        this.plugin.saveSettings();
      }));
    } else {
      new import_obsidian2.Setting(this.containerEl).setName("Homepage").setDesc(homepageDesc).addText((text) => {
        new suggestor(this.app, text.inputEl);
        text.setPlaceholder(DEFAULT[homepage]).setValue(DEFAULT[homepage] == this.settings[homepage] ? "" : this.settings[homepage]).onChange((value) => __async(this, null, function* () {
          this.settings[homepage] = this.sanitiseNote(value) || DEFAULT[homepage];
          yield this.plugin.saveSettings();
        }));
      });
    }
    new import_obsidian2.Setting(this.containerEl).setName("Use date formatting").setDesc("Format the file name as a moment date.").addToggle((toggle) => toggle.setValue(this.plugin.settings.useMoment).onChange((value) => {
      this.plugin.settings.useMoment = value;
      this.plugin.saveSettings();
      this.display();
    }));
    if ((_a = this.plugin.workspacePlugin) == null ? void 0 : _a.enabled) {
      new import_obsidian2.Setting(this.containerEl).setName("Use workspaces").setDesc("Open a workspace, instead of a note, as the homepage.").addToggle((toggle) => toggle.setValue(this.settings.workspaceEnabled).onChange((value) => __async(this, null, function* () {
        this.settings.workspaceEnabled = value;
        yield this.plugin.saveSettings();
        this.display();
      })));
    }
    let ribbonSetting = new import_obsidian2.Setting(this.containerEl).setName("Display ribbon icon").setDesc("Show a little house on the ribbon, allowing you to quickly access the homepage.").addToggle((toggle) => toggle.setValue(this.settings.hasRibbonIcon).onChange((value) => __async(this, null, function* () {
      this.settings.hasRibbonIcon = value;
      yield this.plugin.saveSettings();
      this.plugin.setIcon(value);
    })));
    ribbonSetting.settingEl.setAttribute("style", "padding-top: 70px; border-top: none !important");
    let viewSetting = new import_obsidian2.Setting(this.containerEl).setName("Homepage view").setDesc("Choose what view to open the homepage in.").addDropdown((dropdown) => __async(this, null, function* () {
      for (let key of Object.values(View)) {
        dropdown.addOption(key, key);
      }
      dropdown.setValue(this.settings.view);
      dropdown.onChange((option) => __async(this, null, function* () {
        this.settings.view = option;
        yield this.plugin.saveSettings();
      }));
    }));
    let modeSetting = new import_obsidian2.Setting(this.containerEl).setName("Opening method").setDesc("Determine how existing notes are affected on startup.").addDropdown((dropdown) => __async(this, null, function* () {
      for (let key of Object.values(Mode)) {
        dropdown.addOption(key, key);
      }
      dropdown.setValue(this.settings.openMode);
      dropdown.onChange((option) => __async(this, null, function* () {
        this.settings.openMode = option;
        yield this.plugin.saveSettings();
      }));
    }));
    if (workspacesMode) {
      [viewSetting, modeSetting].forEach(disableSetting);
    }
    if (hasDataview(this.plugin.app)) {
      let refreshSetting = new import_obsidian2.Setting(this.containerEl).setName("Refresh Dataview").setDesc("Always attempt to reload Dataview views when opening the homepage.").addToggle((toggle) => toggle.setValue(this.settings.refreshDataview).onChange((value) => __async(this, null, function* () {
        this.settings.refreshDataview = value;
        yield this.plugin.saveSettings();
      })));
      refreshSetting.descEl.createDiv({
        text: "Requires Dataview auto-refresh to be enabled.",
        attr: { class: "mod-warning" }
      });
    }
  }
};
var FileSuggest = class extends TextInputSuggest {
  getSuggestions(inputStr) {
    const abstractFiles = this.app.vault.getAllLoadedFiles();
    const files = [];
    const inputLower = inputStr.toLowerCase();
    abstractFiles.forEach((file) => {
      if (file instanceof import_obsidian2.TFile && file.extension === "md" && file.path.toLowerCase().contains(inputLower)) {
        files.push(file);
      }
    });
    return files;
  }
  renderSuggestion(file, el) {
    el.setText(trimFile(file));
  }
  selectSuggestion(file) {
    this.inputEl.value = trimFile(file);
    this.inputEl.trigger("input");
    this.close();
  }
};
var WorkspaceSuggest = class extends TextInputSuggest {
  getSuggestions(inputStr) {
    var _a;
    const workspaces = Object.keys((_a = getWorkspacePlugin(this.app)) == null ? void 0 : _a.instance.workspaces);
    const inputLower = inputStr.toLowerCase();
    return workspaces.filter((workspace) => workspace.toLowerCase().contains(inputLower));
  }
  renderSuggestion(workspace, el) {
    el.setText(workspace);
  }
  selectSuggestion(workspace) {
    this.inputEl.value = workspace;
    this.inputEl.trigger("input");
    this.close();
  }
};

// src/main.ts
var ICON = `<svg fill="currentColor" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"><path d="M12.484 3.1 9.106.075.276 7.769h2.112v10.253h4.189v.006h4.827v-.006h3.954V7.769h2.339l-2.339-2.095v-4.48l-2.874.04V3.1zM7.577 17.028h2.9v-3.439h-2.9v3.439zm6.781-9.259h-3.671v3.24H7.313v-3.24H3.388v9.253h3.189v-4.433h4.9v4.433h2.881V7.769zm-4.671.222v2.018H8.313V7.991h1.374zM2.946 6.769h12.136l-2.598-2.326-3.387-3.034-6.151 5.36zm11.412-1.99-.874-.783V2.22l.874-.012v2.571z"/></svg>`;
var Homepage = class extends import_obsidian3.Plugin {
  constructor() {
    super(...arguments);
    this.loaded = false;
    this.openHomepage = () => __async(this, null, function* () {
      var _a;
      if (this.workspacesMode()) {
        if (!(this.settings.workspace in ((_a = this.workspacePlugin) == null ? void 0 : _a.instance.workspaces))) {
          new import_obsidian3.Notice(`Cannot find the workspace "${this.settings.workspace}" to use as the homepage.`);
          return;
        }
        this.workspacePlugin.instance.loadWorkspace(this.settings.workspace);
        return;
      } else if (this.settings.openMode != Mode.ReplaceAll) {
        const alreadyOpened = this.getOpenedHomepage();
        if (alreadyOpened !== void 0) {
          this.app.workspace.setActiveLeaf(alreadyOpened);
          yield this.configureHomepage();
          return;
        }
      } else {
        this.app.workspace.detachLeavesOfType("markdown");
      }
      yield this.app.workspace.openLinkText(this.getHomePageName(), "", this.settings.openMode == Mode.Retain, { active: true });
      yield this.configureHomepage();
    });
  }
  onload() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT, yield this.loadData());
      this.workspacePlugin = getWorkspacePlugin(this.app);
      this.addSettingTab(new HomepageSettingTab(this.app, this));
      if (this.settings.version < 2) {
        yield upgradeSettings(this);
      }
      if (this.app.workspace.activeLeaf == null) {
        this.app.workspace.onLayoutReady(() => __async(this, null, function* () {
          yield this.openHomepage();
          this.loaded = true;
        }));
      }
      (0, import_obsidian3.addIcon)("homepage", ICON);
      this.setIcon(this.settings.hasRibbonIcon);
      this.addCommand({
        id: "open-homepage",
        name: "Open homepage",
        callback: this.openHomepage
      });
      console.log(`Homepage: ${this.getHomePageName()} (method: ${this.settings.openMode}, view: ${this.settings.view}, workspaces: ${this.settings.workspaceEnabled})`);
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
  setIcon(value) {
    var _a;
    if (value) {
      this.addRibbonIcon("homepage", "Open homepage", this.openHomepage).setAttribute("id", "nv-homepage-icon");
    } else {
      (_a = document.getElementById("nv-homepage-icon")) == null ? void 0 : _a.remove();
    }
  }
  getHomePageName() {
    var homepage = this.settings.defaultNote;
    if (this.settings.useMoment) {
      homepage = (0, import_obsidian3.moment)().format(this.settings.momentFormat);
    }
    return homepage;
  }
  getOpenedHomepage() {
    return this.app.workspace.getLeavesOfType("markdown").find((leaf) => trimFile(leaf.view.file) == this.getHomePageName());
  }
  configureHomepage() {
    return __async(this, null, function* () {
      const leaf = this.app.workspace.activeLeaf;
      if (this.settings.openMode == View.Default || !(leaf.view instanceof import_obsidian3.MarkdownView))
        return;
      const state = leaf.view.getState();
      switch (this.settings.view) {
        case View.LivePreview:
        case View.Source:
          state.mode = "source";
          state.source = this.settings.view != View.LivePreview;
          break;
        case View.Reading:
          state.mode = "preview";
          break;
      }
      yield leaf.setViewState({ type: "markdown", state });
      if (this.loaded && this.settings.refreshDataview) {
        touchDataview(this.app);
      }
    });
  }
  workspacesMode() {
    var _a;
    return ((_a = this.workspacePlugin) == null ? void 0 : _a.enabled) && this.settings.workspaceEnabled && !import_obsidian3.Platform.isMobile;
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL21haW4udHMiLCAic3JjL3NldHRpbmdzLnRzIiwgInNyYy9zdWdnZXN0LnRzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZW51bXMuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZU5hbWUuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2luc3RhbmNlT2YuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvYXBwbHlTdHlsZXMuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRMYXlvdXRSZWN0LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2NvbnRhaW5zLmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldENvbXB1dGVkU3R5bGUuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaXNUYWJsZUVsZW1lbnQuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRFbGVtZW50LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFBhcmVudE5vZGUuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWF0aC5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3dpdGhpbi5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEZyZXNoU2lkZU9iamVjdC5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL21lcmdlUGFkZGluZ09iamVjdC5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2V4cGFuZFRvSGFzaE1hcC5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9hcnJvdy5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0T3Bwb3NpdGVQbGFjZW1lbnQuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudC5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGwuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0V2luZG93U2Nyb2xsQmFyWC5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRWaWV3cG9ydFJlY3QuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRSZWN0LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzU2Nyb2xsUGFyZW50LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFNjcm9sbFBhcmVudC5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9saXN0U2Nyb2xsUGFyZW50cy5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q2xpcHBpbmdSZWN0LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0VmFyaWF0aW9uLmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZU9mZnNldHMuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9kZXRlY3RPdmVyZmxvdy5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2ZsaXAuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvaGlkZS5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9vZmZzZXQuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldEFsdEF4aXMuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvcHJldmVudE92ZXJmbG93LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldE5vZGVTY3JvbGwuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcG9zaXRlUmVjdC5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL29yZGVyTW9kaWZpZXJzLmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZGVib3VuY2UuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9mb3JtYXQuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy92YWxpZGF0ZU1vZGlmaWVycy5qcyIsICJub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL3VuaXF1ZUJ5LmpzIiwgIm5vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWVyZ2VCeU5hbWUuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9jcmVhdGVQb3BwZXIuanMiLCAibm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9wb3BwZXIuanMiLCAic3JjL3V0aWxzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBNYXJrZG93blZpZXcsIE5vdGljZSwgUGxhdGZvcm0sIFBsdWdpbiwgV29ya3NwYWNlTGVhZiwgYWRkSWNvbiwgbW9tZW50IH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBERUZBVUxULCBNb2RlLCBWaWV3LCBIb21lcGFnZVNldHRpbmdzLCBIb21lcGFnZVNldHRpbmdUYWIgIH0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcbmltcG9ydCB7IGdldFdvcmtzcGFjZVBsdWdpbiwgdHJpbUZpbGUsIHRvdWNoRGF0YXZpZXcsIHVwZ3JhZGVTZXR0aW5ncyB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IElDT046IHN0cmluZyA9IGA8c3ZnIGZpbGw9XCJjdXJyZW50Q29sb3JcIiB2aWV3Qm94PVwiMCAwIDE4IDE4XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbDpzcGFjZT1cInByZXNlcnZlXCIgc3R5bGU9XCJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MlwiPjxwYXRoIGQ9XCJNMTIuNDg0IDMuMSA5LjEwNi4wNzUuMjc2IDcuNzY5aDIuMTEydjEwLjI1M2g0LjE4OXYuMDA2aDQuODI3di0uMDA2aDMuOTU0VjcuNzY5aDIuMzM5bC0yLjMzOS0yLjA5NXYtNC40OGwtMi44NzQuMDRWMy4xek03LjU3NyAxNy4wMjhoMi45di0zLjQzOWgtMi45djMuNDM5em02Ljc4MS05LjI1OWgtMy42NzF2My4yNEg3LjMxM3YtMy4yNEgzLjM4OHY5LjI1M2gzLjE4OXYtNC40MzNoNC45djQuNDMzaDIuODgxVjcuNzY5em0tNC42NzEuMjIydjIuMDE4SDguMzEzVjcuOTkxaDEuMzc0ek0yLjk0NiA2Ljc2OWgxMi4xMzZsLTIuNTk4LTIuMzI2LTMuMzg3LTMuMDM0LTYuMTUxIDUuMzZ6bTExLjQxMi0xLjk5LS44NzQtLjc4M1YyLjIybC44NzQtLjAxMnYyLjU3MXpcIi8+PC9zdmc+YFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIb21lcGFnZSBleHRlbmRzIFBsdWdpbiB7XG5cdHNldHRpbmdzOiBIb21lcGFnZVNldHRpbmdzO1xuXHR3b3Jrc3BhY2VQbHVnaW46IGFueTtcblx0bG9hZGVkOiBib29sZWFuID0gZmFsc2U7XG5cblx0YXN5bmMgb25sb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxULCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXHRcdHRoaXMud29ya3NwYWNlUGx1Z2luID0gZ2V0V29ya3NwYWNlUGx1Z2luKHRoaXMuYXBwKTtcblxuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgSG9tZXBhZ2VTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cblx0XHRpZiAodGhpcy5zZXR0aW5ncy52ZXJzaW9uIDwgMikge1xuXHRcdFx0YXdhaXQgdXBncmFkZVNldHRpbmdzKHRoaXMpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZiA9PSBudWxsKSB7XG5cdFx0XHQvL29ubHkgZG8gb24gc3RhcnR1cCwgbm90IHBsdWdpbiBhY3RpdmF0aW9uXG5cdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uub25MYXlvdXRSZWFkeShhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGF3YWl0IHRoaXMub3BlbkhvbWVwYWdlKCk7XG5cdFx0XHRcdHRoaXMubG9hZGVkID0gdHJ1ZTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGFkZEljb24oXCJob21lcGFnZVwiLCBJQ09OKTtcblx0XHR0aGlzLnNldEljb24odGhpcy5zZXR0aW5ncy5oYXNSaWJib25JY29uKTtcblxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XG5cdFx0XHRpZDogXCJvcGVuLWhvbWVwYWdlXCIsXG5cdFx0XHRuYW1lOiBcIk9wZW4gaG9tZXBhZ2VcIixcblx0XHRcdGNhbGxiYWNrOiB0aGlzLm9wZW5Ib21lcGFnZSxcblx0XHR9KTtcblxuXHRcdGNvbnNvbGUubG9nKFxuXHRcdFx0YEhvbWVwYWdlOiAke3RoaXMuZ2V0SG9tZVBhZ2VOYW1lKCl9IGArXG5cdFx0XHRgKG1ldGhvZDogJHt0aGlzLnNldHRpbmdzLm9wZW5Nb2RlfSwgdmlldzogJHt0aGlzLnNldHRpbmdzLnZpZXd9LCBgK1xuXHRcdFx0YHdvcmtzcGFjZXM6ICR7dGhpcy5zZXR0aW5ncy53b3Jrc3BhY2VFbmFibGVkfSlgXG5cdFx0KTtcblx0fVxuXG5cdGFzeW5jIHNhdmVTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuXHR9XG5cblx0c2V0SWNvbih2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuXHRcdGlmICh2YWx1ZSkge1xuXHRcdFx0dGhpcy5hZGRSaWJib25JY29uKFwiaG9tZXBhZ2VcIiwgXCJPcGVuIGhvbWVwYWdlXCIsIHRoaXMub3BlbkhvbWVwYWdlKVxuXHRcdFx0XHQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJudi1ob21lcGFnZS1pY29uXCIpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnYtaG9tZXBhZ2UtaWNvblwiKT8ucmVtb3ZlKCk7XG5cdFx0fVxuXHR9XG5cblx0b3BlbkhvbWVwYWdlID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuXG5cdFx0aWYodGhpcy53b3Jrc3BhY2VzTW9kZSgpKSB7XG5cdFx0XHRpZighKHRoaXMuc2V0dGluZ3Mud29ya3NwYWNlIGluIHRoaXMud29ya3NwYWNlUGx1Z2luPy5pbnN0YW5jZS53b3Jrc3BhY2VzKSkge1xuXHRcdFx0XHRuZXcgTm90aWNlKGBDYW5ub3QgZmluZCB0aGUgd29ya3NwYWNlIFwiJHt0aGlzLnNldHRpbmdzLndvcmtzcGFjZX1cIiB0byB1c2UgYXMgdGhlIGhvbWVwYWdlLmApO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMud29ya3NwYWNlUGx1Z2luLmluc3RhbmNlLmxvYWRXb3Jrc3BhY2UodGhpcy5zZXR0aW5ncy53b3Jrc3BhY2UpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRlbHNlIGlmICh0aGlzLnNldHRpbmdzLm9wZW5Nb2RlICE9IE1vZGUuUmVwbGFjZUFsbCkge1xuXHRcdFx0Y29uc3QgYWxyZWFkeU9wZW5lZCA9IHRoaXMuZ2V0T3BlbmVkSG9tZXBhZ2UoKTtcblxuXHRcdFx0aWYgKGFscmVhZHlPcGVuZWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uuc2V0QWN0aXZlTGVhZihhbHJlYWR5T3BlbmVkKTtcblx0XHRcdFx0YXdhaXQgdGhpcy5jb25maWd1cmVIb21lcGFnZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5hcHAud29ya3NwYWNlLmRldGFjaExlYXZlc09mVHlwZShcIm1hcmtkb3duXCIpO1xuXHRcdH1cblxuXG5cdFx0YXdhaXQgdGhpcy5hcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dChcblx0XHRcdHRoaXMuZ2V0SG9tZVBhZ2VOYW1lKCksIFwiXCIsIHRoaXMuc2V0dGluZ3Mub3Blbk1vZGUgPT0gTW9kZS5SZXRhaW4sIHsgYWN0aXZlOiB0cnVlIH1cblx0XHQpO1xuXG5cdFx0YXdhaXQgdGhpcy5jb25maWd1cmVIb21lcGFnZSgpO1xuXHR9XG5cblx0Z2V0SG9tZVBhZ2VOYW1lKCk6IHN0cmluZyB7XG5cdFx0dmFyIGhvbWVwYWdlID0gdGhpcy5zZXR0aW5ncy5kZWZhdWx0Tm90ZTtcblxuXHRcdGlmICh0aGlzLnNldHRpbmdzLnVzZU1vbWVudCkge1xuXHRcdFx0aG9tZXBhZ2UgPSBtb21lbnQoKS5mb3JtYXQodGhpcy5zZXR0aW5ncy5tb21lbnRGb3JtYXQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBob21lcGFnZVxuXHR9XG5cblx0Z2V0T3BlbmVkSG9tZXBhZ2UoKTogV29ya3NwYWNlTGVhZiB7XG5cdFx0cmV0dXJuIHRoaXMuYXBwLndvcmtzcGFjZS5nZXRMZWF2ZXNPZlR5cGUoXCJtYXJrZG93blwiKS5maW5kKFxuXHRcdFx0bGVhZiA9PiB0cmltRmlsZSgobGVhZi52aWV3IGFzIGFueSkuZmlsZSkgPT0gdGhpcy5nZXRIb21lUGFnZU5hbWUoKVxuXHRcdCk7XG5cdH1cblxuXHRhc3luYyBjb25maWd1cmVIb21lcGFnZSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRjb25zdCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XG5cdFx0aWYodGhpcy5zZXR0aW5ncy5vcGVuTW9kZSA9PSBWaWV3LkRlZmF1bHQgfHwgIShsZWFmLnZpZXcgaW5zdGFuY2VvZiBNYXJrZG93blZpZXcpKSByZXR1cm47XG5cblx0XHRjb25zdCBzdGF0ZSA9IGxlYWYudmlldy5nZXRTdGF0ZSgpO1xuXG5cdFx0c3dpdGNoKHRoaXMuc2V0dGluZ3Mudmlldykge1xuXHRcdFx0Y2FzZSBWaWV3LkxpdmVQcmV2aWV3OlxuXHRcdFx0Y2FzZSBWaWV3LlNvdXJjZTpcblx0XHRcdFx0c3RhdGUubW9kZSA9IFwic291cmNlXCI7XG5cdFx0XHRcdHN0YXRlLnNvdXJjZSA9IHRoaXMuc2V0dGluZ3MudmlldyAhPSBWaWV3LkxpdmVQcmV2aWV3O1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgVmlldy5SZWFkaW5nOlxuXHRcdFx0XHRzdGF0ZS5tb2RlID0gXCJwcmV2aWV3XCI7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdGF3YWl0IGxlYWYuc2V0Vmlld1N0YXRlKHt0eXBlOiBcIm1hcmtkb3duXCIsIHN0YXRlOiBzdGF0ZX0pO1xuXHRcdGlmICh0aGlzLmxvYWRlZCAmJiB0aGlzLnNldHRpbmdzLnJlZnJlc2hEYXRhdmlldykgeyB0b3VjaERhdGF2aWV3KHRoaXMuYXBwKTsgfVxuXHR9XG5cblx0d29ya3NwYWNlc01vZGUoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMud29ya3NwYWNlUGx1Z2luPy5lbmFibGVkICYmIHRoaXMuc2V0dGluZ3Mud29ya3NwYWNlRW5hYmxlZCAmJiAhUGxhdGZvcm0uaXNNb2JpbGU7XG5cdH1cbn1cblxuIiwgImltcG9ydCB7IEFwcCwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZywgVEFic3RyYWN0RmlsZSwgVEZpbGUsIG5vcm1hbGl6ZVBhdGggfSBmcm9tIFwib2JzaWRpYW5cIjtcbmltcG9ydCBIb21lcGFnZSBmcm9tIFwiLi9tYWluXCI7XG5pbXBvcnQgeyBUZXh0SW5wdXRTdWdnZXN0IH0gZnJvbSBcIi4vc3VnZ2VzdFwiO1xuaW1wb3J0IHsgZGlzYWJsZVNldHRpbmcsIGdldFdvcmtzcGFjZVBsdWdpbiwgaGFzRGF0YXZpZXcsIHRyaW1GaWxlIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IGVudW0gTW9kZSB7XG5cdFJlcGxhY2VBbGwgPSBcIlJlcGxhY2UgYWxsIG9wZW4gbm90ZXNcIixcblx0UmVwbGFjZUxhc3QgPSBcIlJlcGxhY2UgbGFzdCBub3RlXCIsXG5cdFJldGFpbiA9IFwiS2VlcCBvcGVuIG5vdGVzXCJcbn1cblxuZXhwb3J0IGVudW0gVmlldyB7XG5cdERlZmF1bHQgPSBcIkRlZmF1bHQgdmlld1wiLFxuXHRSZWFkaW5nID0gXCJSZWFkaW5nIHZpZXdcIixcblx0U291cmNlID0gXCJFZGl0aW5nIHZpZXcgKFNvdXJjZSlcIixcblx0TGl2ZVByZXZpZXcgPSBcIkVkaXRpbmcgdmlldyAoTGl2ZSBQcmV2aWV3KVwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9tZXBhZ2VTZXR0aW5ncyB7XG5cdHZlcnNpb246IG51bWJlcixcblx0ZGVmYXVsdE5vdGU6IHN0cmluZyxcblx0dXNlTW9tZW50OiBib29sZWFuLFxuXHRtb21lbnRGb3JtYXQ6IHN0cmluZyxcblx0d29ya3NwYWNlOiBzdHJpbmcsXG5cdHdvcmtzcGFjZUVuYWJsZWQ6IGJvb2xlYW4sXG5cdGhhc1JpYmJvbkljb246IGJvb2xlYW4sXG5cdG9wZW5Nb2RlOiBzdHJpbmcsXG5cdHZpZXc6IHN0cmluZyxcblx0cmVmcmVzaERhdGF2aWV3OiBib29sZWFuXG59XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUOiBIb21lcGFnZVNldHRpbmdzID0ge1xuXHR2ZXJzaW9uOiAwLFxuXHRkZWZhdWx0Tm90ZTogXCJIb21lXCIsXG5cdHVzZU1vbWVudDogZmFsc2UsXG5cdG1vbWVudEZvcm1hdDogXCJZWVlZLU1NLUREXCIsXG5cdHdvcmtzcGFjZTogXCJIb21lXCIsXG5cdHdvcmtzcGFjZUVuYWJsZWQ6IGZhbHNlLFxuXHRoYXNSaWJib25JY29uOiB0cnVlLFxuXHRvcGVuTW9kZTogTW9kZS5SZXBsYWNlQWxsLFxuXHR2aWV3OiBWaWV3LkRlZmF1bHQsXG5cdHJlZnJlc2hEYXRhdmlldzogZmFsc2Vcbn1cblxuZXhwb3J0IGNsYXNzIEhvbWVwYWdlU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuXHRwbHVnaW46IEhvbWVwYWdlO1xuXHRzZXR0aW5nczogSG9tZXBhZ2VTZXR0aW5ncztcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBIb21lcGFnZSkge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0XHR0aGlzLnNldHRpbmdzID0gcGx1Z2luLnNldHRpbmdzO1xuXHR9XG5cblx0c2FuaXRpc2VOb3RlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZS5tYXRjaCgvXlxccyokLykgIT09IG51bGwpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gbm9ybWFsaXplUGF0aCh2YWx1ZSk7XG5cdH1cblxuXHRkaXNwbGF5KCk6IHZvaWQge1xuXHRcdGNvbnN0IHdvcmtzcGFjZXNNb2RlID0gdGhpcy5wbHVnaW4ud29ya3NwYWNlc01vZGUoKTtcblx0XHR0aGlzLmNvbnRhaW5lckVsLmVtcHR5KCk7XG5cblx0XHRjb25zdCBzdWdnZXN0b3IgPSB3b3Jrc3BhY2VzTW9kZSA/IFdvcmtzcGFjZVN1Z2dlc3QgOiBGaWxlU3VnZ2VzdDtcblx0XHRjb25zdCBob21lcGFnZURlc2MgPSB3b3Jrc3BhY2VzTW9kZSA/XG5cdFx0XHRcIlRoZSBuYW1lIG9mIHRoZSB3b3Jrc3BhY2UgdG8gb3BlbiBvbiBzdGFydHVwLlwiIDpcblx0XHRcdFwiVGhlIG5hbWUgb2YgdGhlIG5vdGUgdG8gb3BlbiBvbiBzdGFydHVwLiBJZiBpdCBkb2Vzbid0IGV4aXN0LCBhIG5ldyBub3RlIHdpbGwgYmUgY3JlYXRlZC5cIjtcblx0XHRjb25zdCBob21lcGFnZSA9IHdvcmtzcGFjZXNNb2RlID8gXCJ3b3Jrc3BhY2VcIiA6IFwiZGVmYXVsdE5vdGVcIjtcblxuXHRcdC8vIG9ubHkgc2hvdyB0aGUgbW9tZW50IGZpZWxkIGlmIHRoZXkncmUgZW5hYmxlZCBhbmQgdGhlIHdvcmtzcGFjZSBpc24ndCwgb3RoZXIgc2hvdyB0aGUgcmVndWxhciBlbnRyeSBmaWVsZFxuXHRcdGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VNb21lbnQgJiYgIXRoaXMucGx1Z2luLnNldHRpbmdzLndvcmtzcGFjZUVuYWJsZWQpIHtcblx0XHRcdG5ldyBTZXR0aW5nKHRoaXMuY29udGFpbmVyRWwpXG5cdFx0XHRcdC5zZXROYW1lKFwiSG9tZXBhZ2VcIilcblx0XHRcdFx0LnNldERlc2MoXCJUaGUgbmFtZSBvZiB0aGUgbm90ZSB0byBiZSBvcGVuZWQgb24gc3RhcnR1cCwgdXNpbmcgbW9tZW50IHN5bnRheC4gSWYgaXQgZG9lc24ndCBleGlzdCwgYSBuZXcgbm90ZSB3aWxsIGJlIGNyZWF0ZWQuXCIpXG5cdFx0XHRcdC5hZGRNb21lbnRGb3JtYXQodGV4dCA9PiB0ZXh0XG5cdFx0XHRcdFx0LnNldERlZmF1bHRGb3JtYXQoXCJZWVlZLU1NLUREXCIpXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm1vbWVudEZvcm1hdClcblx0XHRcdFx0XHQub25DaGFuZ2UodmFsdWUgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MubW9tZW50Rm9ybWF0ID0gdmFsdWU7XG5cdFx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxuXHRcdFx0XHQuc2V0TmFtZShcIkhvbWVwYWdlXCIpXG5cdFx0XHRcdC5zZXREZXNjKGhvbWVwYWdlRGVzYylcblx0XHRcdFx0LmFkZFRleHQodGV4dCA9PiB7XG5cdFx0XHRcdFx0bmV3IHN1Z2dlc3Rvcih0aGlzLmFwcCwgdGV4dC5pbnB1dEVsKTtcblx0XHRcdFx0XHR0ZXh0LnNldFBsYWNlaG9sZGVyKERFRkFVTFRbaG9tZXBhZ2VdKVxuXHRcdFx0XHRcdFx0LnNldFZhbHVlKERFRkFVTFRbaG9tZXBhZ2VdID09IHRoaXMuc2V0dGluZ3NbaG9tZXBhZ2VdID8gXCJcIiA6IHRoaXMuc2V0dGluZ3NbaG9tZXBhZ2VdKVxuXHRcdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnNldHRpbmdzW2hvbWVwYWdlXSA9IHRoaXMuc2FuaXRpc2VOb3RlKHZhbHVlKSB8fCBERUZBVUxUW2hvbWVwYWdlXTtcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0bmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKFwiVXNlIGRhdGUgZm9ybWF0dGluZ1wiKVxuXHRcdFx0LnNldERlc2MoXCJGb3JtYXQgdGhlIGZpbGUgbmFtZSBhcyBhIG1vbWVudCBkYXRlLlwiKVxuXHRcdFx0LmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VNb21lbnQpXG5cdFx0XHRcdC5vbkNoYW5nZSh2YWx1ZSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlTW9tZW50ID0gdmFsdWU7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXG5cdFx0aWYgKHRoaXMucGx1Z2luLndvcmtzcGFjZVBsdWdpbj8uZW5hYmxlZCkge1xuXHRcdFx0bmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcblx0XHRcdFx0LnNldE5hbWUoXCJVc2Ugd29ya3NwYWNlc1wiKVxuXHRcdFx0XHQuc2V0RGVzYyhcIk9wZW4gYSB3b3Jrc3BhY2UsIGluc3RlYWQgb2YgYSBub3RlLCBhcyB0aGUgaG9tZXBhZ2UuXCIpXG5cdFx0XHRcdC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZVxuXHRcdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnNldHRpbmdzLndvcmtzcGFjZUVuYWJsZWQpXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jIHZhbHVlID0+IHtcblx0XHRcdFx0XHRcdHRoaXMuc2V0dGluZ3Mud29ya3NwYWNlRW5hYmxlZCA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0XHR0aGlzLmRpc3BsYXkoKTsgLy91cGRhdGUgc3R1ZmZcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHQpO1xuXHRcdH1cblxuXHRcdGxldCByaWJib25TZXR0aW5nID0gbmV3IFNldHRpbmcodGhpcy5jb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKFwiRGlzcGxheSByaWJib24gaWNvblwiKVxuXHRcdFx0LnNldERlc2MoXCJTaG93IGEgbGl0dGxlIGhvdXNlIG9uIHRoZSByaWJib24sIGFsbG93aW5nIHlvdSB0byBxdWlja2x5IGFjY2VzcyB0aGUgaG9tZXBhZ2UuXCIpXG5cdFx0XHQuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGVcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMuc2V0dGluZ3MuaGFzUmliYm9uSWNvbilcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jIHZhbHVlID0+IHtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLmhhc1JpYmJvbkljb24gPSB2YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXRJY29uKHZhbHVlKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cblx0XHRyaWJib25TZXR0aW5nLnNldHRpbmdFbC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInBhZGRpbmctdG9wOiA3MHB4OyBib3JkZXItdG9wOiBub25lICFpbXBvcnRhbnRcIik7XG5cblx0XHRsZXQgdmlld1NldHRpbmcgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoXCJIb21lcGFnZSB2aWV3XCIpXG5cdFx0XHQuc2V0RGVzYyhcIkNob29zZSB3aGF0IHZpZXcgdG8gb3BlbiB0aGUgaG9tZXBhZ2UgaW4uXCIpXG5cdFx0XHQuYWRkRHJvcGRvd24oYXN5bmMgZHJvcGRvd24gPT4ge1xuXHRcdFx0XHRmb3IgKGxldCBrZXkgb2YgT2JqZWN0LnZhbHVlcyhWaWV3KSkge1xuXHRcdFx0XHRcdGRyb3Bkb3duLmFkZE9wdGlvbihrZXksIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZHJvcGRvd24uc2V0VmFsdWUodGhpcy5zZXR0aW5ncy52aWV3KTtcblx0XHRcdFx0ZHJvcGRvd24ub25DaGFuZ2UoYXN5bmMgb3B0aW9uID0+IHtcblx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLnZpZXcgPSBvcHRpb247XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRsZXQgbW9kZVNldHRpbmcgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoXCJPcGVuaW5nIG1ldGhvZFwiKVxuXHRcdFx0LnNldERlc2MoXCJEZXRlcm1pbmUgaG93IGV4aXN0aW5nIG5vdGVzIGFyZSBhZmZlY3RlZCBvbiBzdGFydHVwLlwiKVxuXHRcdFx0LmFkZERyb3Bkb3duKGFzeW5jIGRyb3Bkb3duID0+IHtcblx0XHRcdFx0Zm9yIChsZXQga2V5IG9mIE9iamVjdC52YWx1ZXMoTW9kZSkpIHtcblx0XHRcdFx0XHRkcm9wZG93bi5hZGRPcHRpb24oa2V5LCBrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRyb3Bkb3duLnNldFZhbHVlKHRoaXMuc2V0dGluZ3Mub3Blbk1vZGUpO1xuXHRcdFx0XHRkcm9wZG93bi5vbkNoYW5nZShhc3luYyBvcHRpb24gPT4ge1xuXHRcdFx0XHRcdHRoaXMuc2V0dGluZ3Mub3Blbk1vZGUgPSBvcHRpb247XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRpZiAod29ya3NwYWNlc01vZGUpIHtcblx0XHRcdFt2aWV3U2V0dGluZywgbW9kZVNldHRpbmddLmZvckVhY2goZGlzYWJsZVNldHRpbmcpO1xuXHRcdH1cblxuXHRcdGlmIChoYXNEYXRhdmlldyh0aGlzLnBsdWdpbi5hcHApKSB7XG5cdFx0XHRsZXQgcmVmcmVzaFNldHRpbmcgPSBuZXcgU2V0dGluZyh0aGlzLmNvbnRhaW5lckVsKVxuXHRcdFx0XHQuc2V0TmFtZShcIlJlZnJlc2ggRGF0YXZpZXdcIilcblx0XHRcdFx0LnNldERlc2MoXCJBbHdheXMgYXR0ZW1wdCB0byByZWxvYWQgRGF0YXZpZXcgdmlld3Mgd2hlbiBvcGVuaW5nIHRoZSBob21lcGFnZS5cIilcblx0XHRcdFx0LmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlXG5cdFx0XHRcdFx0LnNldFZhbHVlKHRoaXMuc2V0dGluZ3MucmVmcmVzaERhdGF2aWV3KVxuXHRcdFx0XHRcdC5vbkNoYW5nZShhc3luYyB2YWx1ZSA9PiB7XG5cdFx0XHRcdFx0XHR0aGlzLnNldHRpbmdzLnJlZnJlc2hEYXRhdmlldyA9IHZhbHVlO1xuXHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0KTtcblxuXHRcdFx0cmVmcmVzaFNldHRpbmcuZGVzY0VsLmNyZWF0ZURpdih7XG5cdFx0XHRcdHRleHQ6IFwiUmVxdWlyZXMgRGF0YXZpZXcgYXV0by1yZWZyZXNoIHRvIGJlIGVuYWJsZWQuXCIsIGF0dHI6IHtjbGFzczogXCJtb2Qtd2FybmluZ1wifVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIEZpbGVTdWdnZXN0IGV4dGVuZHMgVGV4dElucHV0U3VnZ2VzdDxURmlsZT4ge1xuXHRnZXRTdWdnZXN0aW9ucyhpbnB1dFN0cjogc3RyaW5nKTogVEZpbGVbXSB7XG5cdFx0Y29uc3QgYWJzdHJhY3RGaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldEFsbExvYWRlZEZpbGVzKCk7XG5cdFx0Y29uc3QgZmlsZXM6IFRGaWxlW10gPSBbXTtcblx0XHRjb25zdCBpbnB1dExvd2VyID0gaW5wdXRTdHIudG9Mb3dlckNhc2UoKTtcblxuXHRcdGFic3RyYWN0RmlsZXMuZm9yRWFjaCgoZmlsZTogVEFic3RyYWN0RmlsZSkgPT4ge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRmaWxlIGluc3RhbmNlb2YgVEZpbGUgJiYgZmlsZS5leHRlbnNpb24gPT09IFwibWRcIiAmJlxuXHRcdFx0XHRmaWxlLnBhdGgudG9Mb3dlckNhc2UoKS5jb250YWlucyhpbnB1dExvd2VyKVxuXHRcdFx0KSB7XG5cdFx0XHRcdGZpbGVzLnB1c2goZmlsZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4gZmlsZXM7XG5cdH1cblxuXHRyZW5kZXJTdWdnZXN0aW9uKGZpbGU6IFRGaWxlLCBlbDogSFRNTEVsZW1lbnQpIHtcblx0XHRlbC5zZXRUZXh0KHRyaW1GaWxlKGZpbGUpKTtcblx0IH1cblxuXHRzZWxlY3RTdWdnZXN0aW9uKGZpbGU6IFRGaWxlKSB7XG5cdFx0dGhpcy5pbnB1dEVsLnZhbHVlID0gdHJpbUZpbGUoZmlsZSk7XG5cdFx0dGhpcy5pbnB1dEVsLnRyaWdnZXIoXCJpbnB1dFwiKTtcblx0XHR0aGlzLmNsb3NlKCk7XG5cdH1cbn1cblxuY2xhc3MgV29ya3NwYWNlU3VnZ2VzdCBleHRlbmRzIFRleHRJbnB1dFN1Z2dlc3Q8c3RyaW5nPiB7XG5cdGdldFN1Z2dlc3Rpb25zKGlucHV0U3RyOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cdFx0Y29uc3Qgd29ya3NwYWNlcyA9IE9iamVjdC5rZXlzKGdldFdvcmtzcGFjZVBsdWdpbih0aGlzLmFwcCk/Lmluc3RhbmNlLndvcmtzcGFjZXMpO1xuXHRcdGNvbnN0IGlucHV0TG93ZXIgPSBpbnB1dFN0ci50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0cmV0dXJuIHdvcmtzcGFjZXMuZmlsdGVyKCh3b3Jrc3BhY2U6IHN0cmluZykgPT4gd29ya3NwYWNlLnRvTG93ZXJDYXNlKCkuY29udGFpbnMoaW5wdXRMb3dlcikpO1xuXHR9XG5cblx0cmVuZGVyU3VnZ2VzdGlvbih3b3Jrc3BhY2U6IHN0cmluZywgZWw6IEhUTUxFbGVtZW50KSB7XG5cdFx0ZWwuc2V0VGV4dCh3b3Jrc3BhY2UpO1xuXHQgfVxuXG5cdHNlbGVjdFN1Z2dlc3Rpb24od29ya3NwYWNlOiBzdHJpbmcpIHtcblx0XHR0aGlzLmlucHV0RWwudmFsdWUgPSB3b3Jrc3BhY2U7XG5cdFx0dGhpcy5pbnB1dEVsLnRyaWdnZXIoXCJpbnB1dFwiKTtcblx0XHR0aGlzLmNsb3NlKCk7XG5cdH1cbn1cbiIsICJpbXBvcnQgeyBBcHAsIElTdWdnZXN0T3duZXIsIFNjb3BlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBjcmVhdGVQb3BwZXIsIEluc3RhbmNlIGFzIFBvcHBlckluc3RhbmNlIH0gZnJvbSBcIkBwb3BwZXJqcy9jb3JlXCI7XG5pbXBvcnQgeyB3cmFwQXJvdW5kIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY2xhc3MgU3VnZ2VzdDxUPiB7XG5cdHByaXZhdGUgb3duZXI6IElTdWdnZXN0T3duZXI8VD47XG5cdHByaXZhdGUgdmFsdWVzOiBUW107XG5cdHByaXZhdGUgc3VnZ2VzdGlvbnM6IEhUTUxEaXZFbGVtZW50W107XG5cdHByaXZhdGUgc2VsZWN0ZWRJdGVtOiBudW1iZXI7XG5cdHByaXZhdGUgY29udGFpbmVyRWw6IEhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKG93bmVyOiBJU3VnZ2VzdE93bmVyPFQ+LCBjb250YWluZXJFbDogSFRNTEVsZW1lbnQsIHNjb3BlOiBTY29wZSkge1xuXHRcdHRoaXMub3duZXIgPSBvd25lcjtcblx0XHR0aGlzLmNvbnRhaW5lckVsID0gY29udGFpbmVyRWw7XG5cblx0XHRjb250YWluZXJFbC5vbihcblx0XHRcdFwiY2xpY2tcIixcblx0XHRcdFwiLnN1Z2dlc3Rpb24taXRlbVwiLFxuXHRcdFx0dGhpcy5vblN1Z2dlc3Rpb25DbGljay5iaW5kKHRoaXMpXG5cdFx0KTtcblx0XHRjb250YWluZXJFbC5vbihcblx0XHRcdFwibW91c2Vtb3ZlXCIsXG5cdFx0XHRcIi5zdWdnZXN0aW9uLWl0ZW1cIixcblx0XHRcdHRoaXMub25TdWdnZXN0aW9uTW91c2VvdmVyLmJpbmQodGhpcylcblx0XHQpO1xuXG5cdFx0c2NvcGUucmVnaXN0ZXIoW10sIFwiQXJyb3dVcFwiLCAoZXZlbnQpID0+IHtcblx0XHRcdGlmICghZXZlbnQuaXNDb21wb3NpbmcpIHtcblx0XHRcdFx0dGhpcy5zZXRTZWxlY3RlZEl0ZW0odGhpcy5zZWxlY3RlZEl0ZW0gLSAxLCB0cnVlKTtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0c2NvcGUucmVnaXN0ZXIoW10sIFwiQXJyb3dEb3duXCIsIChldmVudCkgPT4ge1xuXHRcdFx0aWYgKCFldmVudC5pc0NvbXBvc2luZykge1xuXHRcdFx0XHR0aGlzLnNldFNlbGVjdGVkSXRlbSh0aGlzLnNlbGVjdGVkSXRlbSArIDEsIHRydWUpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHRzY29wZS5yZWdpc3RlcihbXSwgXCJFbnRlclwiLCAoZXZlbnQpID0+IHtcblx0XHRcdGlmICghZXZlbnQuaXNDb21wb3NpbmcpIHtcblx0XHRcdFx0dGhpcy51c2VTZWxlY3RlZEl0ZW0oZXZlbnQpO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRvblN1Z2dlc3Rpb25DbGljayhldmVudDogTW91c2VFdmVudCwgZWw6IEhUTUxEaXZFbGVtZW50KTogdm9pZCB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdGNvbnN0IGl0ZW0gPSB0aGlzLnN1Z2dlc3Rpb25zLmluZGV4T2YoZWwpO1xuXHRcdHRoaXMuc2V0U2VsZWN0ZWRJdGVtKGl0ZW0sIGZhbHNlKTtcblx0XHR0aGlzLnVzZVNlbGVjdGVkSXRlbShldmVudCk7XG5cdH1cblxuXHRvblN1Z2dlc3Rpb25Nb3VzZW92ZXIoX2V2ZW50OiBNb3VzZUV2ZW50LCBlbDogSFRNTERpdkVsZW1lbnQpOiB2b2lkIHtcblx0XHRjb25zdCBpdGVtID0gdGhpcy5zdWdnZXN0aW9ucy5pbmRleE9mKGVsKTtcblx0XHR0aGlzLnNldFNlbGVjdGVkSXRlbShpdGVtLCBmYWxzZSk7XG5cdH1cblxuXHRzZXRTdWdnZXN0aW9ucyh2YWx1ZXM6IFRbXSkge1xuXHRcdHRoaXMuY29udGFpbmVyRWwuZW1wdHkoKTtcblx0XHRjb25zdCBzdWdnZXN0aW9uRWxzOiBIVE1MRGl2RWxlbWVudFtdID0gW107XG5cblx0XHR2YWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcblx0XHRcdGNvbnN0IHN1Z2dlc3Rpb25FbCA9IHRoaXMuY29udGFpbmVyRWwuY3JlYXRlRGl2KFwic3VnZ2VzdGlvbi1pdGVtXCIpO1xuXHRcdFx0dGhpcy5vd25lci5yZW5kZXJTdWdnZXN0aW9uKHZhbHVlLCBzdWdnZXN0aW9uRWwpO1xuXHRcdFx0c3VnZ2VzdGlvbkVscy5wdXNoKHN1Z2dlc3Rpb25FbCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnZhbHVlcyA9IHZhbHVlcztcblx0XHR0aGlzLnN1Z2dlc3Rpb25zID0gc3VnZ2VzdGlvbkVscztcblx0XHR0aGlzLnNldFNlbGVjdGVkSXRlbSgwLCBmYWxzZSk7XG5cdH1cblxuXHR1c2VTZWxlY3RlZEl0ZW0oZXZlbnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KSB7XG5cdFx0Y29uc3QgY3VycmVudFZhbHVlID0gdGhpcy52YWx1ZXNbdGhpcy5zZWxlY3RlZEl0ZW1dO1xuXHRcdGlmIChjdXJyZW50VmFsdWUpIHtcblx0XHRcdHRoaXMub3duZXIuc2VsZWN0U3VnZ2VzdGlvbihjdXJyZW50VmFsdWUsIGV2ZW50KTtcblx0XHR9XG5cdH1cblxuXHRzZXRTZWxlY3RlZEl0ZW0oc2VsZWN0ZWRJbmRleDogbnVtYmVyLCBzY3JvbGxJbnRvVmlldzogYm9vbGVhbikge1xuXHRcdGNvbnN0IG5vcm1hbGl6ZWRJbmRleCA9IHdyYXBBcm91bmQoc2VsZWN0ZWRJbmRleCwgdGhpcy5zdWdnZXN0aW9ucy5sZW5ndGgpO1xuXHRcdGNvbnN0IHByZXZTZWxlY3RlZFN1Z2dlc3Rpb24gPSB0aGlzLnN1Z2dlc3Rpb25zW3RoaXMuc2VsZWN0ZWRJdGVtXTtcblx0XHRjb25zdCBzZWxlY3RlZFN1Z2dlc3Rpb24gPSB0aGlzLnN1Z2dlc3Rpb25zW25vcm1hbGl6ZWRJbmRleF07XG5cblx0XHRwcmV2U2VsZWN0ZWRTdWdnZXN0aW9uPy5yZW1vdmVDbGFzcyhcImlzLXNlbGVjdGVkXCIpO1xuXHRcdHNlbGVjdGVkU3VnZ2VzdGlvbj8uYWRkQ2xhc3MoXCJpcy1zZWxlY3RlZFwiKTtcblxuXHRcdHRoaXMuc2VsZWN0ZWRJdGVtID0gbm9ybWFsaXplZEluZGV4O1xuXG5cdFx0aWYgKHNjcm9sbEludG9WaWV3KSB7XG5cdFx0XHRzZWxlY3RlZFN1Z2dlc3Rpb24uc2Nyb2xsSW50b1ZpZXcoZmFsc2UpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVGV4dElucHV0U3VnZ2VzdDxUPiBpbXBsZW1lbnRzIElTdWdnZXN0T3duZXI8VD4ge1xuXHRwcm90ZWN0ZWQgYXBwOiBBcHA7XG5cdHByb3RlY3RlZCBpbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50O1xuXG5cdHByaXZhdGUgcG9wcGVyOiBQb3BwZXJJbnN0YW5jZTtcblx0cHJpdmF0ZSBzY29wZTogU2NvcGU7XG5cdHByaXZhdGUgc3VnZ2VzdEVsOiBIVE1MRWxlbWVudDtcblx0cHJpdmF0ZSBzdWdnZXN0OiBTdWdnZXN0PFQ+O1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBpbnB1dEVsOiBIVE1MSW5wdXRFbGVtZW50KSB7XG5cdFx0dGhpcy5hcHAgPSBhcHA7XG5cdFx0dGhpcy5pbnB1dEVsID0gaW5wdXRFbDtcblx0XHR0aGlzLnNjb3BlID0gbmV3IFNjb3BlKCk7XG5cblx0XHR0aGlzLnN1Z2dlc3RFbCA9IGNyZWF0ZURpdihcInN1Z2dlc3Rpb24tY29udGFpbmVyXCIpO1xuXHRcdGNvbnN0IHN1Z2dlc3Rpb24gPSB0aGlzLnN1Z2dlc3RFbC5jcmVhdGVEaXYoXCJzdWdnZXN0aW9uXCIpO1xuXHRcdHRoaXMuc3VnZ2VzdCA9IG5ldyBTdWdnZXN0KHRoaXMsIHN1Z2dlc3Rpb24sIHRoaXMuc2NvcGUpO1xuXG5cdFx0dGhpcy5zY29wZS5yZWdpc3RlcihbXSwgXCJFc2NhcGVcIiwgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcblxuXHRcdHRoaXMuaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhpcy5vbklucHV0Q2hhbmdlZC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLmlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHRoaXMub25JbnB1dENoYW5nZWQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5pbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIHRoaXMuY2xvc2UuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5zdWdnZXN0RWwub24oXG5cdFx0XHRcIm1vdXNlZG93blwiLFxuXHRcdFx0XCIuc3VnZ2VzdGlvbi1jb250YWluZXJcIixcblx0XHRcdChldmVudDogTW91c2VFdmVudCkgPT4ge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH1cblxuXHRvbklucHV0Q2hhbmdlZCgpOiB2b2lkIHtcblx0XHRjb25zdCBpbnB1dFN0ciA9IHRoaXMuaW5wdXRFbC52YWx1ZTtcblx0XHRjb25zdCBzdWdnZXN0aW9ucyA9IHRoaXMuZ2V0U3VnZ2VzdGlvbnMoaW5wdXRTdHIpO1xuXG5cdFx0aWYgKHN1Z2dlc3Rpb25zLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuc3VnZ2VzdC5zZXRTdWdnZXN0aW9ucyhzdWdnZXN0aW9ucyk7XG5cdFx0XHR0aGlzLm9wZW4oKHRoaXMuYXBwIGFzIGFueSkuZG9tLmFwcENvbnRhaW5lckVsLCB0aGlzLmlucHV0RWwpO1xuXHRcdH1cblx0fVxuXG5cdG9wZW4oY29udGFpbmVyOiBIVE1MRWxlbWVudCwgaW5wdXRFbDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcblx0XHQodGhpcy5hcHAgYXMgYW55KS5rZXltYXAucHVzaFNjb3BlKHRoaXMuc2NvcGUpO1xuXG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuc3VnZ2VzdEVsKTtcblx0XHR0aGlzLnBvcHBlciA9IGNyZWF0ZVBvcHBlcihpbnB1dEVsLCB0aGlzLnN1Z2dlc3RFbCwge1xuXHRcdFx0cGxhY2VtZW50OiBcImJvdHRvbS1zdGFydFwiLFxuXHRcdFx0bW9kaWZpZXJzOiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiBcInNhbWVXaWR0aFwiLFxuXHRcdFx0XHRcdGVuYWJsZWQ6IHRydWUsXG5cdFx0XHRcdFx0Zm46ICh7IHN0YXRlLCBpbnN0YW5jZSB9KSA9PiB7XG5cdFx0XHRcdFx0XHQvLyBOb3RlOiBwb3NpdGlvbmluZyBuZWVkcyB0byBiZSBjYWxjdWxhdGVkIHR3aWNlIC1cblx0XHRcdFx0XHRcdC8vIGZpcnN0IHBhc3MgLSBwb3NpdGlvbmluZyBpdCBhY2NvcmRpbmcgdG8gdGhlIHdpZHRoIG9mIHRoZSBwb3BwZXJcblx0XHRcdFx0XHRcdC8vIHNlY29uZCBwYXNzIC0gcG9zaXRpb24gaXQgd2l0aCB0aGUgd2lkdGggYm91bmQgdG8gdGhlIHJlZmVyZW5jZSBlbGVtZW50XG5cdFx0XHRcdFx0XHQvLyB3ZSBuZWVkIHRvIGVhcmx5IGV4aXQgdG8gYXZvaWQgYW4gaW5maW5pdGUgbG9vcFxuXHRcdFx0XHRcdFx0Y29uc3QgdGFyZ2V0V2lkdGggPSBgJHtzdGF0ZS5yZWN0cy5yZWZlcmVuY2Uud2lkdGh9cHhgO1xuXHRcdFx0XHRcdFx0aWYgKHN0YXRlLnN0eWxlcy5wb3BwZXIud2lkdGggPT09IHRhcmdldFdpZHRoKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHN0YXRlLnN0eWxlcy5wb3BwZXIud2lkdGggPSB0YXJnZXRXaWR0aDtcblx0XHRcdFx0XHRcdGluc3RhbmNlLnVwZGF0ZSgpO1xuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0cGhhc2U6IFwiYmVmb3JlV3JpdGVcIixcblx0XHRcdFx0XHRyZXF1aXJlczogW1wiY29tcHV0ZVN0eWxlc1wiXSxcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0fSk7XG5cdH1cblxuXHRjbG9zZSgpOiB2b2lkIHtcblx0XHQodGhpcy5hcHAgYXMgYW55KS5rZXltYXAucG9wU2NvcGUodGhpcy5zY29wZSk7XG5cblx0XHR0aGlzLnN1Z2dlc3Quc2V0U3VnZ2VzdGlvbnMoW10pO1xuXHRcdGlmKHRoaXMucG9wcGVyKSB0aGlzLnBvcHBlci5kZXN0cm95KCk7XG5cdFx0dGhpcy5zdWdnZXN0RWwuZGV0YWNoKCk7XG5cdH1cblxuXHRhYnN0cmFjdCBnZXRTdWdnZXN0aW9ucyhpbnB1dFN0cjogc3RyaW5nKTogVFtdO1xuXHRhYnN0cmFjdCByZW5kZXJTdWdnZXN0aW9uKGl0ZW06IFQsIGVsOiBIVE1MRWxlbWVudCk6IHZvaWQ7XG5cdGFic3RyYWN0IHNlbGVjdFN1Z2dlc3Rpb24oaXRlbTogVCk6IHZvaWQ7XG59XG4iLCAiZXhwb3J0IHZhciB0b3AgPSAndG9wJztcbmV4cG9ydCB2YXIgYm90dG9tID0gJ2JvdHRvbSc7XG5leHBvcnQgdmFyIHJpZ2h0ID0gJ3JpZ2h0JztcbmV4cG9ydCB2YXIgbGVmdCA9ICdsZWZ0JztcbmV4cG9ydCB2YXIgYXV0byA9ICdhdXRvJztcbmV4cG9ydCB2YXIgYmFzZVBsYWNlbWVudHMgPSBbdG9wLCBib3R0b20sIHJpZ2h0LCBsZWZ0XTtcbmV4cG9ydCB2YXIgc3RhcnQgPSAnc3RhcnQnO1xuZXhwb3J0IHZhciBlbmQgPSAnZW5kJztcbmV4cG9ydCB2YXIgY2xpcHBpbmdQYXJlbnRzID0gJ2NsaXBwaW5nUGFyZW50cyc7XG5leHBvcnQgdmFyIHZpZXdwb3J0ID0gJ3ZpZXdwb3J0JztcbmV4cG9ydCB2YXIgcG9wcGVyID0gJ3BvcHBlcic7XG5leHBvcnQgdmFyIHJlZmVyZW5jZSA9ICdyZWZlcmVuY2UnO1xuZXhwb3J0IHZhciB2YXJpYXRpb25QbGFjZW1lbnRzID0gLyojX19QVVJFX18qL2Jhc2VQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7XG5leHBvcnQgdmFyIHBsYWNlbWVudHMgPSAvKiNfX1BVUkVfXyovW10uY29uY2F0KGJhc2VQbGFjZW1lbnRzLCBbYXV0b10pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCwgcGxhY2VtZW50ICsgXCItXCIgKyBzdGFydCwgcGxhY2VtZW50ICsgXCItXCIgKyBlbmRdKTtcbn0sIFtdKTsgLy8gbW9kaWZpZXJzIHRoYXQgbmVlZCB0byByZWFkIHRoZSBET01cblxuZXhwb3J0IHZhciBiZWZvcmVSZWFkID0gJ2JlZm9yZVJlYWQnO1xuZXhwb3J0IHZhciByZWFkID0gJ3JlYWQnO1xuZXhwb3J0IHZhciBhZnRlclJlYWQgPSAnYWZ0ZXJSZWFkJzsgLy8gcHVyZS1sb2dpYyBtb2RpZmllcnNcblxuZXhwb3J0IHZhciBiZWZvcmVNYWluID0gJ2JlZm9yZU1haW4nO1xuZXhwb3J0IHZhciBtYWluID0gJ21haW4nO1xuZXhwb3J0IHZhciBhZnRlck1haW4gPSAnYWZ0ZXJNYWluJzsgLy8gbW9kaWZpZXIgd2l0aCB0aGUgcHVycG9zZSB0byB3cml0ZSB0byB0aGUgRE9NIChvciB3cml0ZSBpbnRvIGEgZnJhbWV3b3JrIHN0YXRlKVxuXG5leHBvcnQgdmFyIGJlZm9yZVdyaXRlID0gJ2JlZm9yZVdyaXRlJztcbmV4cG9ydCB2YXIgd3JpdGUgPSAnd3JpdGUnO1xuZXhwb3J0IHZhciBhZnRlcldyaXRlID0gJ2FmdGVyV3JpdGUnO1xuZXhwb3J0IHZhciBtb2RpZmllclBoYXNlcyA9IFtiZWZvcmVSZWFkLCByZWFkLCBhZnRlclJlYWQsIGJlZm9yZU1haW4sIG1haW4sIGFmdGVyTWFpbiwgYmVmb3JlV3JpdGUsIHdyaXRlLCBhZnRlcldyaXRlXTsiLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Tm9kZU5hbWUoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudCA/IChlbGVtZW50Lm5vZGVOYW1lIHx8ICcnKS50b0xvd2VyQ2FzZSgpIDogbnVsbDtcbn0iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0V2luZG93KG5vZGUpIHtcbiAgaWYgKG5vZGUgPT0gbnVsbCkge1xuICAgIHJldHVybiB3aW5kb3c7XG4gIH1cblxuICBpZiAobm9kZS50b1N0cmluZygpICE9PSAnW29iamVjdCBXaW5kb3ddJykge1xuICAgIHZhciBvd25lckRvY3VtZW50ID0gbm9kZS5vd25lckRvY3VtZW50O1xuICAgIHJldHVybiBvd25lckRvY3VtZW50ID8gb3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyB8fCB3aW5kb3cgOiB3aW5kb3c7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn0iLCAiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcblxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuRWxlbWVudDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc0hUTUxFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuSFRNTEVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGlzU2hhZG93Um9vdChub2RlKSB7XG4gIC8vIElFIDExIGhhcyBubyBTaGFkb3dSb290XG4gIGlmICh0eXBlb2YgU2hhZG93Um9vdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgT3duRWxlbWVudCA9IGdldFdpbmRvdyhub2RlKS5TaGFkb3dSb290O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q7XG59XG5cbmV4cG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH07IiwgImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7IC8vIFRoaXMgbW9kaWZpZXIgdGFrZXMgdGhlIHN0eWxlcyBwcmVwYXJlZCBieSB0aGUgYGNvbXB1dGVTdHlsZXNgIG1vZGlmaWVyXG4vLyBhbmQgYXBwbGllcyB0aGVtIHRvIHRoZSBIVE1MRWxlbWVudHMgc3VjaCBhcyBwb3BwZXIgYW5kIGFycm93XG5cbmZ1bmN0aW9uIGFwcGx5U3R5bGVzKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZTtcbiAgT2JqZWN0LmtleXMoc3RhdGUuZWxlbWVudHMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgc3R5bGUgPSBzdGF0ZS5zdHlsZXNbbmFtZV0gfHwge307XG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBzdGF0ZS5hdHRyaWJ1dGVzW25hbWVdIHx8IHt9O1xuICAgIHZhciBlbGVtZW50ID0gc3RhdGUuZWxlbWVudHNbbmFtZV07IC8vIGFycm93IGlzIG9wdGlvbmFsICsgdmlydHVhbCBlbGVtZW50c1xuXG4gICAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8ICFnZXROb2RlTmFtZShlbGVtZW50KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gRmxvdyBkb2Vzbid0IHN1cHBvcnQgdG8gZXh0ZW5kIHRoaXMgcHJvcGVydHksIGJ1dCBpdCdzIHRoZSBtb3N0XG4gICAgLy8gZWZmZWN0aXZlIHdheSB0byBhcHBseSBzdHlsZXMgdG8gYW4gSFRNTEVsZW1lbnRcbiAgICAvLyAkRmxvd0ZpeE1lW2Nhbm5vdC13cml0ZV1cblxuXG4gICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1tuYW1lXTtcblxuICAgICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlID09PSB0cnVlID8gJycgOiB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBlZmZlY3QoX3JlZjIpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjIuc3RhdGU7XG4gIHZhciBpbml0aWFsU3R5bGVzID0ge1xuICAgIHBvcHBlcjoge1xuICAgICAgcG9zaXRpb246IHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3ksXG4gICAgICBsZWZ0OiAnMCcsXG4gICAgICB0b3A6ICcwJyxcbiAgICAgIG1hcmdpbjogJzAnXG4gICAgfSxcbiAgICBhcnJvdzoge1xuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZSdcbiAgICB9LFxuICAgIHJlZmVyZW5jZToge31cbiAgfTtcbiAgT2JqZWN0LmFzc2lnbihzdGF0ZS5lbGVtZW50cy5wb3BwZXIuc3R5bGUsIGluaXRpYWxTdHlsZXMucG9wcGVyKTtcbiAgc3RhdGUuc3R5bGVzID0gaW5pdGlhbFN0eWxlcztcblxuICBpZiAoc3RhdGUuZWxlbWVudHMuYXJyb3cpIHtcbiAgICBPYmplY3QuYXNzaWduKHN0YXRlLmVsZW1lbnRzLmFycm93LnN0eWxlLCBpbml0aWFsU3R5bGVzLmFycm93KTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgT2JqZWN0LmtleXMoc3RhdGUuZWxlbWVudHMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHZhciBlbGVtZW50ID0gc3RhdGUuZWxlbWVudHNbbmFtZV07XG4gICAgICB2YXIgYXR0cmlidXRlcyA9IHN0YXRlLmF0dHJpYnV0ZXNbbmFtZV0gfHwge307XG4gICAgICB2YXIgc3R5bGVQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoc3RhdGUuc3R5bGVzLmhhc093blByb3BlcnR5KG5hbWUpID8gc3RhdGUuc3R5bGVzW25hbWVdIDogaW5pdGlhbFN0eWxlc1tuYW1lXSk7IC8vIFNldCBhbGwgdmFsdWVzIHRvIGFuIGVtcHR5IHN0cmluZyB0byB1bnNldCB0aGVtXG5cbiAgICAgIHZhciBzdHlsZSA9IHN0eWxlUHJvcGVydGllcy5yZWR1Y2UoZnVuY3Rpb24gKHN0eWxlLCBwcm9wZXJ0eSkge1xuICAgICAgICBzdHlsZVtwcm9wZXJ0eV0gPSAnJztcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgfSwge30pOyAvLyBhcnJvdyBpcyBvcHRpb25hbCArIHZpcnR1YWwgZWxlbWVudHNcblxuICAgICAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8ICFnZXROb2RlTmFtZShlbGVtZW50KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgc3R5bGUpO1xuICAgICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChmdW5jdGlvbiAoYXR0cmlidXRlKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2FwcGx5U3R5bGVzJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICd3cml0ZScsXG4gIGZuOiBhcHBseVN0eWxlcyxcbiAgZWZmZWN0OiBlZmZlY3QsXG4gIHJlcXVpcmVzOiBbJ2NvbXB1dGVTdHlsZXMnXVxufTsiLCAiaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xufSIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodCxcbiAgICB0b3A6IHJlY3QudG9wLFxuICAgIHJpZ2h0OiByZWN0LnJpZ2h0LFxuICAgIGJvdHRvbTogcmVjdC5ib3R0b20sXG4gICAgbGVmdDogcmVjdC5sZWZ0LFxuICAgIHg6IHJlY3QubGVmdCxcbiAgICB5OiByZWN0LnRvcFxuICB9O1xufSIsICJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiOyAvLyBSZXR1cm5zIHRoZSBsYXlvdXQgcmVjdCBvZiBhbiBlbGVtZW50IHJlbGF0aXZlIHRvIGl0cyBvZmZzZXRQYXJlbnQuIExheW91dFxuLy8gbWVhbnMgaXQgZG9lc24ndCB0YWtlIGludG8gYWNjb3VudCB0cmFuc2Zvcm1zLlxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRMYXlvdXRSZWN0KGVsZW1lbnQpIHtcbiAgdmFyIGNsaWVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCk7IC8vIFVzZSB0aGUgY2xpZW50UmVjdCBzaXplcyBpZiBpdCdzIG5vdCBiZWVuIHRyYW5zZm9ybWVkLlxuICAvLyBGaXhlcyBodHRwczovL2dpdGh1Yi5jb20vcG9wcGVyanMvcG9wcGVyLWNvcmUvaXNzdWVzLzEyMjNcblxuICB2YXIgd2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICB2YXIgaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgaWYgKE1hdGguYWJzKGNsaWVudFJlY3Qud2lkdGggLSB3aWR0aCkgPD0gMSkge1xuICAgIHdpZHRoID0gY2xpZW50UmVjdC53aWR0aDtcbiAgfVxuXG4gIGlmIChNYXRoLmFicyhjbGllbnRSZWN0LmhlaWdodCAtIGhlaWdodCkgPD0gMSkge1xuICAgIGhlaWdodCA9IGNsaWVudFJlY3QuaGVpZ2h0O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiBlbGVtZW50Lm9mZnNldExlZnQsXG4gICAgeTogZWxlbWVudC5vZmZzZXRUb3AsXG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0XG4gIH07XG59IiwgImltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhaW5zKHBhcmVudCwgY2hpbGQpIHtcbiAgdmFyIHJvb3ROb2RlID0gY2hpbGQuZ2V0Um9vdE5vZGUgJiYgY2hpbGQuZ2V0Um9vdE5vZGUoKTsgLy8gRmlyc3QsIGF0dGVtcHQgd2l0aCBmYXN0ZXIgbmF0aXZlIG1ldGhvZFxuXG4gIGlmIChwYXJlbnQuY29udGFpbnMoY2hpbGQpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gdGhlbiBmYWxsYmFjayB0byBjdXN0b20gaW1wbGVtZW50YXRpb24gd2l0aCBTaGFkb3cgRE9NIHN1cHBvcnRcbiAgZWxzZSBpZiAocm9vdE5vZGUgJiYgaXNTaGFkb3dSb290KHJvb3ROb2RlKSkge1xuICAgICAgdmFyIG5leHQgPSBjaGlsZDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAobmV4dCAmJiBwYXJlbnQuaXNTYW1lTm9kZShuZXh0KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXTogbmVlZCBhIGJldHRlciB3YXkgdG8gaGFuZGxlIHRoaXMuLi5cblxuXG4gICAgICAgIG5leHQgPSBuZXh0LnBhcmVudE5vZGUgfHwgbmV4dC5ob3N0O1xuICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgfSAvLyBHaXZlIHVwLCB0aGUgcmVzdWx0IGlzIGZhbHNlXG5cblxuICByZXR1cm4gZmFsc2U7XG59IiwgImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldFdpbmRvdyhlbGVtZW50KS5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufSIsICJpbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzVGFibGVFbGVtZW50KGVsZW1lbnQpIHtcbiAgcmV0dXJuIFsndGFibGUnLCAndGQnLCAndGgnXS5pbmRleE9mKGdldE5vZGVOYW1lKGVsZW1lbnQpKSA+PSAwO1xufSIsICJpbXBvcnQgeyBpc0VsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkge1xuICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gIHJldHVybiAoKGlzRWxlbWVudChlbGVtZW50KSA/IGVsZW1lbnQub3duZXJEb2N1bWVudCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICBlbGVtZW50LmRvY3VtZW50KSB8fCB3aW5kb3cuZG9jdW1lbnQpLmRvY3VtZW50RWxlbWVudDtcbn0iLCAiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IHsgaXNTaGFkb3dSb290IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0UGFyZW50Tm9kZShlbGVtZW50KSB7XG4gIGlmIChnZXROb2RlTmFtZShlbGVtZW50KSA9PT0gJ2h0bWwnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gKC8vIHRoaXMgaXMgYSBxdWlja2VyIChidXQgbGVzcyB0eXBlIHNhZmUpIHdheSB0byBzYXZlIHF1aXRlIHNvbWUgYnl0ZXMgZnJvbSB0aGUgYnVuZGxlXG4gICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXVxuICAgIC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgIGVsZW1lbnQuYXNzaWduZWRTbG90IHx8IC8vIHN0ZXAgaW50byB0aGUgc2hhZG93IERPTSBvZiB0aGUgcGFyZW50IG9mIGEgc2xvdHRlZCBub2RlXG4gICAgZWxlbWVudC5wYXJlbnROb2RlIHx8ICggLy8gRE9NIEVsZW1lbnQgZGV0ZWN0ZWRcbiAgICBpc1NoYWRvd1Jvb3QoZWxlbWVudCkgPyBlbGVtZW50Lmhvc3QgOiBudWxsKSB8fCAvLyBTaGFkb3dSb290IGRldGVjdGVkXG4gICAgLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FsbF06IEhUTUxFbGVtZW50IGlzIGEgTm9kZVxuICAgIGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSAvLyBmYWxsYmFja1xuXG4gICk7XG59IiwgImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgaXNUYWJsZUVsZW1lbnQgZnJvbSBcIi4vaXNUYWJsZUVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcblxuZnVuY3Rpb24gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gIGlmICghaXNIVE1MRWxlbWVudChlbGVtZW50KSB8fCAvLyBodHRwczovL2dpdGh1Yi5jb20vcG9wcGVyanMvcG9wcGVyLWNvcmUvaXNzdWVzLzgzN1xuICBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG59IC8vIGAub2Zmc2V0UGFyZW50YCByZXBvcnRzIGBudWxsYCBmb3IgZml4ZWQgZWxlbWVudHMsIHdoaWxlIGFic29sdXRlIGVsZW1lbnRzXG4vLyByZXR1cm4gdGhlIGNvbnRhaW5pbmcgYmxvY2tcblxuXG5mdW5jdGlvbiBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkge1xuICB2YXIgaXNGaXJlZm94ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2ZpcmVmb3gnKSAhPT0gLTE7XG4gIHZhciBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG5cbiAgd2hpbGUgKGlzSFRNTEVsZW1lbnQoY3VycmVudE5vZGUpICYmIFsnaHRtbCcsICdib2R5J10uaW5kZXhPZihnZXROb2RlTmFtZShjdXJyZW50Tm9kZSkpIDwgMCkge1xuICAgIHZhciBjc3MgPSBnZXRDb21wdXRlZFN0eWxlKGN1cnJlbnROb2RlKTsgLy8gVGhpcyBpcyBub24tZXhoYXVzdGl2ZSBidXQgY292ZXJzIHRoZSBtb3N0IGNvbW1vbiBDU1MgcHJvcGVydGllcyB0aGF0XG4gICAgLy8gY3JlYXRlIGEgY29udGFpbmluZyBibG9jay5cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvQ29udGFpbmluZ19ibG9jayNpZGVudGlmeWluZ190aGVfY29udGFpbmluZ19ibG9ja1xuXG4gICAgaWYgKGNzcy50cmFuc2Zvcm0gIT09ICdub25lJyB8fCBjc3MucGVyc3BlY3RpdmUgIT09ICdub25lJyB8fCBjc3MuY29udGFpbiA9PT0gJ3BhaW50JyB8fCBbJ3RyYW5zZm9ybScsICdwZXJzcGVjdGl2ZSddLmluZGV4T2YoY3NzLndpbGxDaGFuZ2UpICE9PSAtMSB8fCBpc0ZpcmVmb3ggJiYgY3NzLndpbGxDaGFuZ2UgPT09ICdmaWx0ZXInIHx8IGlzRmlyZWZveCAmJiBjc3MuZmlsdGVyICYmIGNzcy5maWx0ZXIgIT09ICdub25lJykge1xuICAgICAgcmV0dXJuIGN1cnJlbnROb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59IC8vIEdldHMgdGhlIGNsb3Nlc3QgYW5jZXN0b3IgcG9zaXRpb25lZCBlbGVtZW50LiBIYW5kbGVzIHNvbWUgZWRnZSBjYXNlcyxcbi8vIHN1Y2ggYXMgdGFibGUgYW5jZXN0b3JzIGFuZCBjcm9zcyBicm93c2VyIGJ1Z3MuXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgdmFyIHdpbmRvdyA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQoZWxlbWVudCk7XG5cbiAgd2hpbGUgKG9mZnNldFBhcmVudCAmJiBpc1RhYmxlRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpIHtcbiAgICBvZmZzZXRQYXJlbnQgPSBnZXRUcnVlT2Zmc2V0UGFyZW50KG9mZnNldFBhcmVudCk7XG4gIH1cblxuICBpZiAob2Zmc2V0UGFyZW50ICYmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpID09PSAnaHRtbCcgfHwgZ2V0Tm9kZU5hbWUob2Zmc2V0UGFyZW50KSA9PT0gJ2JvZHknICYmIGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiA9PT0gJ3N0YXRpYycpKSB7XG4gICAgcmV0dXJuIHdpbmRvdztcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRQYXJlbnQgfHwgZ2V0Q29udGFpbmluZ0Jsb2NrKGVsZW1lbnQpIHx8IHdpbmRvdztcbn0iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gWyd0b3AnLCAnYm90dG9tJ10uaW5kZXhPZihwbGFjZW1lbnQpID49IDAgPyAneCcgOiAneSc7XG59IiwgImV4cG9ydCB2YXIgbWF4ID0gTWF0aC5tYXg7XG5leHBvcnQgdmFyIG1pbiA9IE1hdGgubWluO1xuZXhwb3J0IHZhciByb3VuZCA9IE1hdGgucm91bmQ7IiwgImltcG9ydCB7IG1heCBhcyBtYXRoTWF4LCBtaW4gYXMgbWF0aE1pbiB9IGZyb20gXCIuL21hdGguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpdGhpbihtaW4sIHZhbHVlLCBtYXgpIHtcbiAgcmV0dXJuIG1hdGhNYXgobWluLCBtYXRoTWluKHZhbHVlLCBtYXgpKTtcbn0iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RnJlc2hTaWRlT2JqZWN0KCkge1xuICByZXR1cm4ge1xuICAgIHRvcDogMCxcbiAgICByaWdodDogMCxcbiAgICBib3R0b206IDAsXG4gICAgbGVmdDogMFxuICB9O1xufSIsICJpbXBvcnQgZ2V0RnJlc2hTaWRlT2JqZWN0IGZyb20gXCIuL2dldEZyZXNoU2lkZU9iamVjdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VQYWRkaW5nT2JqZWN0KHBhZGRpbmdPYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGdldEZyZXNoU2lkZU9iamVjdCgpLCBwYWRkaW5nT2JqZWN0KTtcbn0iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXhwYW5kVG9IYXNoTWFwKHZhbHVlLCBrZXlzKSB7XG4gIHJldHVybiBrZXlzLnJlZHVjZShmdW5jdGlvbiAoaGFzaE1hcCwga2V5KSB7XG4gICAgaGFzaE1hcFtrZXldID0gdmFsdWU7XG4gICAgcmV0dXJuIGhhc2hNYXA7XG4gIH0sIHt9KTtcbn0iLCAiaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRMYXlvdXRSZWN0IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qc1wiO1xuaW1wb3J0IGNvbnRhaW5zIGZyb20gXCIuLi9kb20tdXRpbHMvY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHdpdGhpbiBmcm9tIFwiLi4vdXRpbHMvd2l0aGluLmpzXCI7XG5pbXBvcnQgbWVyZ2VQYWRkaW5nT2JqZWN0IGZyb20gXCIuLi91dGlscy9tZXJnZVBhZGRpbmdPYmplY3QuanNcIjtcbmltcG9ydCBleHBhbmRUb0hhc2hNYXAgZnJvbSBcIi4uL3V0aWxzL2V4cGFuZFRvSGFzaE1hcC5qc1wiO1xuaW1wb3J0IHsgbGVmdCwgcmlnaHQsIGJhc2VQbGFjZW1lbnRzLCB0b3AsIGJvdHRvbSB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuLi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbnZhciB0b1BhZGRpbmdPYmplY3QgPSBmdW5jdGlvbiB0b1BhZGRpbmdPYmplY3QocGFkZGluZywgc3RhdGUpIHtcbiAgcGFkZGluZyA9IHR5cGVvZiBwYWRkaW5nID09PSAnZnVuY3Rpb24nID8gcGFkZGluZyhPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZWN0cywge1xuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pKSA6IHBhZGRpbmc7XG4gIHJldHVybiBtZXJnZVBhZGRpbmdPYmplY3QodHlwZW9mIHBhZGRpbmcgIT09ICdudW1iZXInID8gcGFkZGluZyA6IGV4cGFuZFRvSGFzaE1hcChwYWRkaW5nLCBiYXNlUGxhY2VtZW50cykpO1xufTtcblxuZnVuY3Rpb24gYXJyb3coX3JlZikge1xuICB2YXIgX3N0YXRlJG1vZGlmaWVyc0RhdGEkO1xuXG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucztcbiAgdmFyIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93O1xuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cztcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciBheGlzID0gZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50KGJhc2VQbGFjZW1lbnQpO1xuICB2YXIgaXNWZXJ0aWNhbCA9IFtsZWZ0LCByaWdodF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwO1xuICB2YXIgbGVuID0gaXNWZXJ0aWNhbCA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICBpZiAoIWFycm93RWxlbWVudCB8fCAhcG9wcGVyT2Zmc2V0cykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBwYWRkaW5nT2JqZWN0ID0gdG9QYWRkaW5nT2JqZWN0KG9wdGlvbnMucGFkZGluZywgc3RhdGUpO1xuICB2YXIgYXJyb3dSZWN0ID0gZ2V0TGF5b3V0UmVjdChhcnJvd0VsZW1lbnQpO1xuICB2YXIgbWluUHJvcCA9IGF4aXMgPT09ICd5JyA/IHRvcCA6IGxlZnQ7XG4gIHZhciBtYXhQcm9wID0gYXhpcyA9PT0gJ3knID8gYm90dG9tIDogcmlnaHQ7XG4gIHZhciBlbmREaWZmID0gc3RhdGUucmVjdHMucmVmZXJlbmNlW2xlbl0gKyBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbYXhpc10gLSBwb3BwZXJPZmZzZXRzW2F4aXNdIC0gc3RhdGUucmVjdHMucG9wcGVyW2xlbl07XG4gIHZhciBzdGFydERpZmYgPSBwb3BwZXJPZmZzZXRzW2F4aXNdIC0gc3RhdGUucmVjdHMucmVmZXJlbmNlW2F4aXNdO1xuICB2YXIgYXJyb3dPZmZzZXRQYXJlbnQgPSBnZXRPZmZzZXRQYXJlbnQoYXJyb3dFbGVtZW50KTtcbiAgdmFyIGNsaWVudFNpemUgPSBhcnJvd09mZnNldFBhcmVudCA/IGF4aXMgPT09ICd5JyA/IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudEhlaWdodCB8fCAwIDogYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50V2lkdGggfHwgMCA6IDA7XG4gIHZhciBjZW50ZXJUb1JlZmVyZW5jZSA9IGVuZERpZmYgLyAyIC0gc3RhcnREaWZmIC8gMjsgLy8gTWFrZSBzdXJlIHRoZSBhcnJvdyBkb2Vzbid0IG92ZXJmbG93IHRoZSBwb3BwZXIgaWYgdGhlIGNlbnRlciBwb2ludCBpc1xuICAvLyBvdXRzaWRlIG9mIHRoZSBwb3BwZXIgYm91bmRzXG5cbiAgdmFyIG1pbiA9IHBhZGRpbmdPYmplY3RbbWluUHJvcF07XG4gIHZhciBtYXggPSBjbGllbnRTaXplIC0gYXJyb3dSZWN0W2xlbl0gLSBwYWRkaW5nT2JqZWN0W21heFByb3BdO1xuICB2YXIgY2VudGVyID0gY2xpZW50U2l6ZSAvIDIgLSBhcnJvd1JlY3RbbGVuXSAvIDIgKyBjZW50ZXJUb1JlZmVyZW5jZTtcbiAgdmFyIG9mZnNldCA9IHdpdGhpbihtaW4sIGNlbnRlciwgbWF4KTsgLy8gUHJldmVudHMgYnJlYWtpbmcgc3ludGF4IGhpZ2hsaWdodGluZy4uLlxuXG4gIHZhciBheGlzUHJvcCA9IGF4aXM7XG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSAoX3N0YXRlJG1vZGlmaWVyc0RhdGEkID0ge30sIF9zdGF0ZSRtb2RpZmllcnNEYXRhJFtheGlzUHJvcF0gPSBvZmZzZXQsIF9zdGF0ZSRtb2RpZmllcnNEYXRhJC5jZW50ZXJPZmZzZXQgPSBvZmZzZXQgLSBjZW50ZXIsIF9zdGF0ZSRtb2RpZmllcnNEYXRhJCk7XG59XG5cbmZ1bmN0aW9uIGVmZmVjdChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmMi5vcHRpb25zO1xuICB2YXIgX29wdGlvbnMkZWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudCxcbiAgICAgIGFycm93RWxlbWVudCA9IF9vcHRpb25zJGVsZW1lbnQgPT09IHZvaWQgMCA/ICdbZGF0YS1wb3BwZXItYXJyb3ddJyA6IF9vcHRpb25zJGVsZW1lbnQ7XG5cbiAgaWYgKGFycm93RWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9IC8vIENTUyBzZWxlY3RvclxuXG5cbiAgaWYgKHR5cGVvZiBhcnJvd0VsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgYXJyb3dFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMucG9wcGVyLnF1ZXJ5U2VsZWN0b3IoYXJyb3dFbGVtZW50KTtcblxuICAgIGlmICghYXJyb3dFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgIGlmICghaXNIVE1MRWxlbWVudChhcnJvd0VsZW1lbnQpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBcImFycm93XCIgZWxlbWVudCBtdXN0IGJlIGFuIEhUTUxFbGVtZW50IChub3QgYW4gU1ZHRWxlbWVudCkuJywgJ1RvIHVzZSBhbiBTVkcgYXJyb3csIHdyYXAgaXQgaW4gYW4gSFRNTEVsZW1lbnQgdGhhdCB3aWxsIGJlIHVzZWQgYXMnLCAndGhlIGFycm93LiddLmpvaW4oJyAnKSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb250YWlucyhzdGF0ZS5lbGVtZW50cy5wb3BwZXIsIGFycm93RWxlbWVudCkpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBcImFycm93XCIgbW9kaWZpZXJcXCdzIGBlbGVtZW50YCBtdXN0IGJlIGEgY2hpbGQgb2YgdGhlIHBvcHBlcicsICdlbGVtZW50LiddLmpvaW4oJyAnKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc3RhdGUuZWxlbWVudHMuYXJyb3cgPSBhcnJvd0VsZW1lbnQ7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdhcnJvdycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIGZuOiBhcnJvdyxcbiAgZWZmZWN0OiBlZmZlY3QsXG4gIHJlcXVpcmVzOiBbJ3BvcHBlck9mZnNldHMnXSxcbiAgcmVxdWlyZXNJZkV4aXN0czogWydwcmV2ZW50T3ZlcmZsb3cnXVxufTsiLCAiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHVuc2V0U2lkZXMgPSB7XG4gIHRvcDogJ2F1dG8nLFxuICByaWdodDogJ2F1dG8nLFxuICBib3R0b206ICdhdXRvJyxcbiAgbGVmdDogJ2F1dG8nXG59OyAvLyBSb3VuZCB0aGUgb2Zmc2V0cyB0byB0aGUgbmVhcmVzdCBzdWl0YWJsZSBzdWJwaXhlbCBiYXNlZCBvbiB0aGUgRFBSLlxuLy8gWm9vbWluZyBjYW4gY2hhbmdlIHRoZSBEUFIsIGJ1dCBpdCBzZWVtcyB0byByZXBvcnQgYSB2YWx1ZSB0aGF0IHdpbGxcbi8vIGNsZWFubHkgZGl2aWRlIHRoZSB2YWx1ZXMgaW50byB0aGUgYXBwcm9wcmlhdGUgc3VicGl4ZWxzLlxuXG5mdW5jdGlvbiByb3VuZE9mZnNldHNCeURQUihfcmVmKSB7XG4gIHZhciB4ID0gX3JlZi54LFxuICAgICAgeSA9IF9yZWYueTtcbiAgdmFyIHdpbiA9IHdpbmRvdztcbiAgdmFyIGRwciA9IHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gIHJldHVybiB7XG4gICAgeDogcm91bmQocm91bmQoeCAqIGRwcikgLyBkcHIpIHx8IDAsXG4gICAgeTogcm91bmQocm91bmQoeSAqIGRwcikgLyBkcHIpIHx8IDBcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1hcFRvU3R5bGVzKF9yZWYyKSB7XG4gIHZhciBfT2JqZWN0JGFzc2lnbjI7XG5cbiAgdmFyIHBvcHBlciA9IF9yZWYyLnBvcHBlcixcbiAgICAgIHBvcHBlclJlY3QgPSBfcmVmMi5wb3BwZXJSZWN0LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZjIucGxhY2VtZW50LFxuICAgICAgb2Zmc2V0cyA9IF9yZWYyLm9mZnNldHMsXG4gICAgICBwb3NpdGlvbiA9IF9yZWYyLnBvc2l0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX3JlZjIuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgYWRhcHRpdmUgPSBfcmVmMi5hZGFwdGl2ZSxcbiAgICAgIHJvdW5kT2Zmc2V0cyA9IF9yZWYyLnJvdW5kT2Zmc2V0cztcblxuICB2YXIgX3JlZjMgPSByb3VuZE9mZnNldHMgPT09IHRydWUgPyByb3VuZE9mZnNldHNCeURQUihvZmZzZXRzKSA6IHR5cGVvZiByb3VuZE9mZnNldHMgPT09ICdmdW5jdGlvbicgPyByb3VuZE9mZnNldHMob2Zmc2V0cykgOiBvZmZzZXRzLFxuICAgICAgX3JlZjMkeCA9IF9yZWYzLngsXG4gICAgICB4ID0gX3JlZjMkeCA9PT0gdm9pZCAwID8gMCA6IF9yZWYzJHgsXG4gICAgICBfcmVmMyR5ID0gX3JlZjMueSxcbiAgICAgIHkgPSBfcmVmMyR5ID09PSB2b2lkIDAgPyAwIDogX3JlZjMkeTtcblxuICB2YXIgaGFzWCA9IG9mZnNldHMuaGFzT3duUHJvcGVydHkoJ3gnKTtcbiAgdmFyIGhhc1kgPSBvZmZzZXRzLmhhc093blByb3BlcnR5KCd5Jyk7XG4gIHZhciBzaWRlWCA9IGxlZnQ7XG4gIHZhciBzaWRlWSA9IHRvcDtcbiAgdmFyIHdpbiA9IHdpbmRvdztcblxuICBpZiAoYWRhcHRpdmUpIHtcbiAgICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KHBvcHBlcik7XG4gICAgdmFyIGhlaWdodFByb3AgPSAnY2xpZW50SGVpZ2h0JztcbiAgICB2YXIgd2lkdGhQcm9wID0gJ2NsaWVudFdpZHRoJztcblxuICAgIGlmIChvZmZzZXRQYXJlbnQgPT09IGdldFdpbmRvdyhwb3BwZXIpKSB7XG4gICAgICBvZmZzZXRQYXJlbnQgPSBnZXREb2N1bWVudEVsZW1lbnQocG9wcGVyKTtcblxuICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUob2Zmc2V0UGFyZW50KS5wb3NpdGlvbiAhPT0gJ3N0YXRpYycpIHtcbiAgICAgICAgaGVpZ2h0UHJvcCA9ICdzY3JvbGxIZWlnaHQnO1xuICAgICAgICB3aWR0aFByb3AgPSAnc2Nyb2xsV2lkdGgnO1xuICAgICAgfVxuICAgIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FzdF06IGZvcmNlIHR5cGUgcmVmaW5lbWVudCwgd2UgY29tcGFyZSBvZmZzZXRQYXJlbnQgd2l0aCB3aW5kb3cgYWJvdmUsIGJ1dCBGbG93IGRvZXNuJ3QgZGV0ZWN0IGl0XG5cblxuICAgIG9mZnNldFBhcmVudCA9IG9mZnNldFBhcmVudDtcblxuICAgIGlmIChwbGFjZW1lbnQgPT09IHRvcCkge1xuICAgICAgc2lkZVkgPSBib3R0b207IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuXG4gICAgICB5IC09IG9mZnNldFBhcmVudFtoZWlnaHRQcm9wXSAtIHBvcHBlclJlY3QuaGVpZ2h0O1xuICAgICAgeSAqPSBncHVBY2NlbGVyYXRpb24gPyAxIDogLTE7XG4gICAgfVxuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gbGVmdCkge1xuICAgICAgc2lkZVggPSByaWdodDsgLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG5cbiAgICAgIHggLT0gb2Zmc2V0UGFyZW50W3dpZHRoUHJvcF0gLSBwb3BwZXJSZWN0LndpZHRoO1xuICAgICAgeCAqPSBncHVBY2NlbGVyYXRpb24gPyAxIDogLTE7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbW1vblN0eWxlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHBvc2l0aW9uOiBwb3NpdGlvblxuICB9LCBhZGFwdGl2ZSAmJiB1bnNldFNpZGVzKTtcblxuICBpZiAoZ3B1QWNjZWxlcmF0aW9uKSB7XG4gICAgdmFyIF9PYmplY3QkYXNzaWduO1xuXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywgKF9PYmplY3QkYXNzaWduID0ge30sIF9PYmplY3QkYXNzaWduW3NpZGVZXSA9IGhhc1kgPyAnMCcgOiAnJywgX09iamVjdCRhc3NpZ25bc2lkZVhdID0gaGFzWCA/ICcwJyA6ICcnLCBfT2JqZWN0JGFzc2lnbi50cmFuc2Zvcm0gPSAod2luLmRldmljZVBpeGVsUmF0aW8gfHwgMSkgPCAyID8gXCJ0cmFuc2xhdGUoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweClcIiA6IFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweCwgMClcIiwgX09iamVjdCRhc3NpZ24pKTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIChfT2JqZWN0JGFzc2lnbjIgPSB7fSwgX09iamVjdCRhc3NpZ24yW3NpZGVZXSA9IGhhc1kgPyB5ICsgXCJweFwiIDogJycsIF9PYmplY3QkYXNzaWduMltzaWRlWF0gPSBoYXNYID8geCArIFwicHhcIiA6ICcnLCBfT2JqZWN0JGFzc2lnbjIudHJhbnNmb3JtID0gJycsIF9PYmplY3QkYXNzaWduMikpO1xufVxuXG5mdW5jdGlvbiBjb21wdXRlU3R5bGVzKF9yZWY0KSB7XG4gIHZhciBzdGF0ZSA9IF9yZWY0LnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWY0Lm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRncHVBY2NlbGVyYXQgPSBvcHRpb25zLmdwdUFjY2VsZXJhdGlvbixcbiAgICAgIGdwdUFjY2VsZXJhdGlvbiA9IF9vcHRpb25zJGdwdUFjY2VsZXJhdCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGdwdUFjY2VsZXJhdCxcbiAgICAgIF9vcHRpb25zJGFkYXB0aXZlID0gb3B0aW9ucy5hZGFwdGl2ZSxcbiAgICAgIGFkYXB0aXZlID0gX29wdGlvbnMkYWRhcHRpdmUgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRhZGFwdGl2ZSxcbiAgICAgIF9vcHRpb25zJHJvdW5kT2Zmc2V0cyA9IG9wdGlvbnMucm91bmRPZmZzZXRzLFxuICAgICAgcm91bmRPZmZzZXRzID0gX29wdGlvbnMkcm91bmRPZmZzZXRzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcm91bmRPZmZzZXRzO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICB2YXIgdHJhbnNpdGlvblByb3BlcnR5ID0gZ2V0Q29tcHV0ZWRTdHlsZShzdGF0ZS5lbGVtZW50cy5wb3BwZXIpLnRyYW5zaXRpb25Qcm9wZXJ0eSB8fCAnJztcblxuICAgIGlmIChhZGFwdGl2ZSAmJiBbJ3RyYW5zZm9ybScsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXS5zb21lKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIHRyYW5zaXRpb25Qcm9wZXJ0eS5pbmRleE9mKHByb3BlcnR5KSA+PSAwO1xuICAgIH0pKSB7XG4gICAgICBjb25zb2xlLndhcm4oWydQb3BwZXI6IERldGVjdGVkIENTUyB0cmFuc2l0aW9ucyBvbiBhdCBsZWFzdCBvbmUgb2YgdGhlIGZvbGxvd2luZycsICdDU1MgcHJvcGVydGllczogXCJ0cmFuc2Zvcm1cIiwgXCJ0b3BcIiwgXCJyaWdodFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIi4nLCAnXFxuXFxuJywgJ0Rpc2FibGUgdGhlIFwiY29tcHV0ZVN0eWxlc1wiIG1vZGlmaWVyXFwncyBgYWRhcHRpdmVgIG9wdGlvbiB0byBhbGxvdycsICdmb3Igc21vb3RoIHRyYW5zaXRpb25zLCBvciByZW1vdmUgdGhlc2UgcHJvcGVydGllcyBmcm9tIHRoZSBDU1MnLCAndHJhbnNpdGlvbiBkZWNsYXJhdGlvbiBvbiB0aGUgcG9wcGVyIGVsZW1lbnQgaWYgb25seSB0cmFuc2l0aW9uaW5nJywgJ29wYWNpdHkgb3IgYmFja2dyb3VuZC1jb2xvciBmb3IgZXhhbXBsZS4nLCAnXFxuXFxuJywgJ1dlIHJlY29tbWVuZCB1c2luZyB0aGUgcG9wcGVyIGVsZW1lbnQgYXMgYSB3cmFwcGVyIGFyb3VuZCBhbiBpbm5lcicsICdlbGVtZW50IHRoYXQgY2FuIGhhdmUgYW55IENTUyBwcm9wZXJ0eSB0cmFuc2l0aW9uZWQgZm9yIGFuaW1hdGlvbnMuJ10uam9pbignICcpKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY29tbW9uU3R5bGVzID0ge1xuICAgIHBsYWNlbWVudDogZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5wbGFjZW1lbnQpLFxuICAgIHBvcHBlcjogc3RhdGUuZWxlbWVudHMucG9wcGVyLFxuICAgIHBvcHBlclJlY3Q6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICBncHVBY2NlbGVyYXRpb246IGdwdUFjY2VsZXJhdGlvblxuICB9O1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMucG9wcGVyLCBtYXBUb1N0eWxlcyhPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIHtcbiAgICAgIG9mZnNldHM6IHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyxcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgYWRhcHRpdmU6IGFkYXB0aXZlLFxuICAgICAgcm91bmRPZmZzZXRzOiByb3VuZE9mZnNldHNcbiAgICB9KSkpO1xuICB9XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEuYXJyb3cgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5hcnJvdyA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnN0eWxlcy5hcnJvdywgbWFwVG9TdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCB7XG4gICAgICBvZmZzZXRzOiBzdGF0ZS5tb2RpZmllcnNEYXRhLmFycm93LFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBhZGFwdGl2ZTogZmFsc2UsXG4gICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgIH0pKSk7XG4gIH1cblxuICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgJ2RhdGEtcG9wcGVyLXBsYWNlbWVudCc6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2NvbXB1dGVTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ2JlZm9yZVdyaXRlJyxcbiAgZm46IGNvbXB1dGVTdHlsZXMsXG4gIGRhdGE6IHt9XG59OyIsICJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0V2luZG93LmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHBhc3NpdmUgPSB7XG4gIHBhc3NpdmU6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGVmZmVjdChfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBpbnN0YW5jZSA9IF9yZWYuaW5zdGFuY2UsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICB2YXIgX29wdGlvbnMkc2Nyb2xsID0gb3B0aW9ucy5zY3JvbGwsXG4gICAgICBzY3JvbGwgPSBfb3B0aW9ucyRzY3JvbGwgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRzY3JvbGwsXG4gICAgICBfb3B0aW9ucyRyZXNpemUgPSBvcHRpb25zLnJlc2l6ZSxcbiAgICAgIHJlc2l6ZSA9IF9vcHRpb25zJHJlc2l6ZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHJlc2l6ZTtcbiAgdmFyIHdpbmRvdyA9IGdldFdpbmRvdyhzdGF0ZS5lbGVtZW50cy5wb3BwZXIpO1xuICB2YXIgc2Nyb2xsUGFyZW50cyA9IFtdLmNvbmNhdChzdGF0ZS5zY3JvbGxQYXJlbnRzLnJlZmVyZW5jZSwgc3RhdGUuc2Nyb2xsUGFyZW50cy5wb3BwZXIpO1xuXG4gIGlmIChzY3JvbGwpIHtcbiAgICBzY3JvbGxQYXJlbnRzLmZvckVhY2goZnVuY3Rpb24gKHNjcm9sbFBhcmVudCkge1xuICAgICAgc2Nyb2xsUGFyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAocmVzaXplKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChzY3JvbGwpIHtcbiAgICAgIHNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICAgIHNjcm9sbFBhcmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBpbnN0YW5jZS51cGRhdGUsIHBhc3NpdmUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc2l6ZSkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgfVxuICB9O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZXZlbnRMaXN0ZW5lcnMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3dyaXRlJyxcbiAgZm46IGZ1bmN0aW9uIGZuKCkge30sXG4gIGVmZmVjdDogZWZmZWN0LFxuICBkYXRhOiB7fVxufTsiLCAidmFyIGhhc2ggPSB7XG4gIGxlZnQ6ICdyaWdodCcsXG4gIHJpZ2h0OiAnbGVmdCcsXG4gIGJvdHRvbTogJ3RvcCcsXG4gIHRvcDogJ2JvdHRvbSdcbn07XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9sZWZ0fHJpZ2h0fGJvdHRvbXx0b3AvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59IiwgInZhciBoYXNoID0ge1xuICBzdGFydDogJ2VuZCcsXG4gIGVuZDogJ3N0YXJ0J1xufTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL3N0YXJ0fGVuZC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn0iLCAiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvd1Njcm9sbChub2RlKSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3cobm9kZSk7XG4gIHZhciBzY3JvbGxMZWZ0ID0gd2luLnBhZ2VYT2Zmc2V0O1xuICB2YXIgc2Nyb2xsVG9wID0gd2luLnBhZ2VZT2Zmc2V0O1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgfTtcbn0iLCAiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0V2luZG93U2Nyb2xsQmFyWChlbGVtZW50KSB7XG4gIC8vIElmIDxodG1sPiBoYXMgYSBDU1Mgd2lkdGggZ3JlYXRlciB0aGFuIHRoZSB2aWV3cG9ydCwgdGhlbiB0aGlzIHdpbGwgYmVcbiAgLy8gaW5jb3JyZWN0IGZvciBSVEwuXG4gIC8vIFBvcHBlciAxIGlzIGJyb2tlbiBpbiB0aGlzIGNhc2UgYW5kIG5ldmVyIGhhZCBhIGJ1ZyByZXBvcnQgc28gbGV0J3MgYXNzdW1lXG4gIC8vIGl0J3Mgbm90IGFuIGlzc3VlLiBJIGRvbid0IHRoaW5rIGFueW9uZSBldmVyIHNwZWNpZmllcyB3aWR0aCBvbiA8aHRtbD5cbiAgLy8gYW55d2F5LlxuICAvLyBCcm93c2VycyB3aGVyZSB0aGUgbGVmdCBzY3JvbGxiYXIgZG9lc24ndCBjYXVzZSBhbiBpc3N1ZSByZXBvcnQgYDBgIGZvclxuICAvLyB0aGlzIChlLmcuIEVkZ2UgMjAxOSwgSUUxMSwgU2FmYXJpKVxuICByZXR1cm4gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSkubGVmdCArIGdldFdpbmRvd1Njcm9sbChlbGVtZW50KS5zY3JvbGxMZWZ0O1xufSIsICJpbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGxCYXJYIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbEJhclguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFZpZXdwb3J0UmVjdChlbGVtZW50KSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coZWxlbWVudCk7XG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgdmlzdWFsVmlld3BvcnQgPSB3aW4udmlzdWFsVmlld3BvcnQ7XG4gIHZhciB3aWR0aCA9IGh0bWwuY2xpZW50V2lkdGg7XG4gIHZhciBoZWlnaHQgPSBodG1sLmNsaWVudEhlaWdodDtcbiAgdmFyIHggPSAwO1xuICB2YXIgeSA9IDA7IC8vIE5COiBUaGlzIGlzbid0IHN1cHBvcnRlZCBvbiBpT1MgPD0gMTIuIElmIHRoZSBrZXlib2FyZCBpcyBvcGVuLCB0aGUgcG9wcGVyXG4gIC8vIGNhbiBiZSBvYnNjdXJlZCB1bmRlcm5lYXRoIGl0LlxuICAvLyBBbHNvLCBgaHRtbC5jbGllbnRIZWlnaHRgIGFkZHMgdGhlIGJvdHRvbSBiYXIgaGVpZ2h0IGluIFNhZmFyaSBpT1MsIGV2ZW5cbiAgLy8gaWYgaXQgaXNuJ3Qgb3Blbiwgc28gaWYgdGhpcyBpc24ndCBhdmFpbGFibGUsIHRoZSBwb3BwZXIgd2lsbCBiZSBkZXRlY3RlZFxuICAvLyB0byBvdmVyZmxvdyB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4gdG9vIGVhcmx5LlxuXG4gIGlmICh2aXN1YWxWaWV3cG9ydCkge1xuICAgIHdpZHRoID0gdmlzdWFsVmlld3BvcnQud2lkdGg7XG4gICAgaGVpZ2h0ID0gdmlzdWFsVmlld3BvcnQuaGVpZ2h0OyAvLyBVc2VzIExheW91dCBWaWV3cG9ydCAobGlrZSBDaHJvbWU7IFNhZmFyaSBkb2VzIG5vdCBjdXJyZW50bHkpXG4gICAgLy8gSW4gQ2hyb21lLCBpdCByZXR1cm5zIGEgdmFsdWUgdmVyeSBjbG9zZSB0byAwICgrLy0pIGJ1dCBjb250YWlucyByb3VuZGluZ1xuICAgIC8vIGVycm9ycyBkdWUgdG8gZmxvYXRpbmcgcG9pbnQgbnVtYmVycywgc28gd2UgbmVlZCB0byBjaGVjayBwcmVjaXNpb24uXG4gICAgLy8gU2FmYXJpIHJldHVybnMgYSBudW1iZXIgPD0gMCwgdXN1YWxseSA8IC0xIHdoZW4gcGluY2gtem9vbWVkXG4gICAgLy8gRmVhdHVyZSBkZXRlY3Rpb24gZmFpbHMgaW4gbW9iaWxlIGVtdWxhdGlvbiBtb2RlIGluIENocm9tZS5cbiAgICAvLyBNYXRoLmFicyh3aW4uaW5uZXJXaWR0aCAvIHZpc3VhbFZpZXdwb3J0LnNjYWxlIC0gdmlzdWFsVmlld3BvcnQud2lkdGgpIDxcbiAgICAvLyAwLjAwMVxuICAgIC8vIEZhbGxiYWNrIGhlcmU6IFwiTm90IFNhZmFyaVwiIHVzZXJBZ2VudFxuXG4gICAgaWYgKCEvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICB4ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdDtcbiAgICAgIHkgPSB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCksXG4gICAgeTogeVxuICB9O1xufSIsICJpbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbEJhclggZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsQmFyWC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCB7IG1heCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7IC8vIEdldHMgdGhlIGVudGlyZSBzaXplIG9mIHRoZSBzY3JvbGxhYmxlIGRvY3VtZW50IGFyZWEsIGV2ZW4gZXh0ZW5kaW5nIG91dHNpZGVcbi8vIG9mIHRoZSBgPGh0bWw+YCBhbmQgYDxib2R5PmAgcmVjdCBib3VuZHMgaWYgaG9yaXpvbnRhbGx5IHNjcm9sbGFibGVcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0RG9jdW1lbnRSZWN0KGVsZW1lbnQpIHtcbiAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICB2YXIgaHRtbCA9IGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KTtcbiAgdmFyIHdpblNjcm9sbCA9IGdldFdpbmRvd1Njcm9sbChlbGVtZW50KTtcbiAgdmFyIGJvZHkgPSAoX2VsZW1lbnQkb3duZXJEb2N1bWVuID0gZWxlbWVudC5vd25lckRvY3VtZW50KSA9PSBudWxsID8gdm9pZCAwIDogX2VsZW1lbnQkb3duZXJEb2N1bWVuLmJvZHk7XG4gIHZhciB3aWR0aCA9IG1heChodG1sLnNjcm9sbFdpZHRoLCBodG1sLmNsaWVudFdpZHRoLCBib2R5ID8gYm9keS5zY3JvbGxXaWR0aCA6IDAsIGJvZHkgPyBib2R5LmNsaWVudFdpZHRoIDogMCk7XG4gIHZhciBoZWlnaHQgPSBtYXgoaHRtbC5zY3JvbGxIZWlnaHQsIGh0bWwuY2xpZW50SGVpZ2h0LCBib2R5ID8gYm9keS5zY3JvbGxIZWlnaHQgOiAwLCBib2R5ID8gYm9keS5jbGllbnRIZWlnaHQgOiAwKTtcbiAgdmFyIHggPSAtd2luU2Nyb2xsLnNjcm9sbExlZnQgKyBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpO1xuICB2YXIgeSA9IC13aW5TY3JvbGwuc2Nyb2xsVG9wO1xuXG4gIGlmIChnZXRDb21wdXRlZFN0eWxlKGJvZHkgfHwgaHRtbCkuZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgIHggKz0gbWF4KGh0bWwuY2xpZW50V2lkdGgsIGJvZHkgPyBib2R5LmNsaWVudFdpZHRoIDogMCkgLSB3aWR0aDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIHg6IHgsXG4gICAgeTogeVxuICB9O1xufSIsICJpbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1Njcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIEZpcmVmb3ggd2FudHMgdXMgdG8gY2hlY2sgYC14YCBhbmQgYC15YCB2YXJpYXRpb25zIGFzIHdlbGxcbiAgdmFyIF9nZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3csXG4gICAgICBvdmVyZmxvd1ggPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1k7XG5cbiAgcmV0dXJuIC9hdXRvfHNjcm9sbHxvdmVybGF5fGhpZGRlbi8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCk7XG59IiwgImltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KG5vZGUpIHtcbiAgaWYgKFsnaHRtbCcsICdib2R5JywgJyNkb2N1bWVudCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUobm9kZSkpID49IDApIHtcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gICAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgaWYgKGlzSFRNTEVsZW1lbnQobm9kZSkgJiYgaXNTY3JvbGxQYXJlbnQobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHJldHVybiBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShub2RlKSk7XG59IiwgImltcG9ydCBnZXRTY3JvbGxQYXJlbnQgZnJvbSBcIi4vZ2V0U2Nyb2xsUGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93IGZyb20gXCIuL2dldFdpbmRvdy5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7XG4vKlxuZ2l2ZW4gYSBET00gZWxlbWVudCwgcmV0dXJuIHRoZSBsaXN0IG9mIGFsbCBzY3JvbGwgcGFyZW50cywgdXAgdGhlIGxpc3Qgb2YgYW5jZXNvcnNcbnVudGlsIHdlIGdldCB0byB0aGUgdG9wIHdpbmRvdyBvYmplY3QuIFRoaXMgbGlzdCBpcyB3aGF0IHdlIGF0dGFjaCBzY3JvbGwgbGlzdGVuZXJzXG50bywgYmVjYXVzZSBpZiBhbnkgb2YgdGhlc2UgcGFyZW50IGVsZW1lbnRzIHNjcm9sbCwgd2UnbGwgbmVlZCB0byByZS1jYWxjdWxhdGUgdGhlXG5yZWZlcmVuY2UgZWxlbWVudCdzIHBvc2l0aW9uLlxuKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlzdFNjcm9sbFBhcmVudHMoZWxlbWVudCwgbGlzdCkge1xuICB2YXIgX2VsZW1lbnQkb3duZXJEb2N1bWVuO1xuXG4gIGlmIChsaXN0ID09PSB2b2lkIDApIHtcbiAgICBsaXN0ID0gW107XG4gIH1cblxuICB2YXIgc2Nyb2xsUGFyZW50ID0gZ2V0U2Nyb2xsUGFyZW50KGVsZW1lbnQpO1xuICB2YXIgaXNCb2R5ID0gc2Nyb2xsUGFyZW50ID09PSAoKF9lbGVtZW50JG93bmVyRG9jdW1lbiA9IGVsZW1lbnQub3duZXJEb2N1bWVudCkgPT0gbnVsbCA/IHZvaWQgMCA6IF9lbGVtZW50JG93bmVyRG9jdW1lbi5ib2R5KTtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhzY3JvbGxQYXJlbnQpO1xuICB2YXIgdGFyZ2V0ID0gaXNCb2R5ID8gW3dpbl0uY29uY2F0KHdpbi52aXN1YWxWaWV3cG9ydCB8fCBbXSwgaXNTY3JvbGxQYXJlbnQoc2Nyb2xsUGFyZW50KSA/IHNjcm9sbFBhcmVudCA6IFtdKSA6IHNjcm9sbFBhcmVudDtcbiAgdmFyIHVwZGF0ZWRMaXN0ID0gbGlzdC5jb25jYXQodGFyZ2V0KTtcbiAgcmV0dXJuIGlzQm9keSA/IHVwZGF0ZWRMaXN0IDogLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtY2FsbF06IGlzQm9keSB0ZWxscyB1cyB0YXJnZXQgd2lsbCBiZSBhbiBIVE1MRWxlbWVudCBoZXJlXG4gIHVwZGF0ZWRMaXN0LmNvbmNhdChsaXN0U2Nyb2xsUGFyZW50cyhnZXRQYXJlbnROb2RlKHRhcmdldCkpKTtcbn0iLCAiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVjdFRvQ2xpZW50UmVjdChyZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZWN0LCB7XG4gICAgbGVmdDogcmVjdC54LFxuICAgIHRvcDogcmVjdC55LFxuICAgIHJpZ2h0OiByZWN0LnggKyByZWN0LndpZHRoLFxuICAgIGJvdHRvbTogcmVjdC55ICsgcmVjdC5oZWlnaHRcbiAgfSk7XG59IiwgImltcG9ydCB7IHZpZXdwb3J0IH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0Vmlld3BvcnRSZWN0IGZyb20gXCIuL2dldFZpZXdwb3J0UmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50UmVjdCBmcm9tIFwiLi9nZXREb2N1bWVudFJlY3QuanNcIjtcbmltcG9ydCBsaXN0U2Nyb2xsUGFyZW50cyBmcm9tIFwiLi9saXN0U2Nyb2xsUGFyZW50cy5qc1wiO1xuaW1wb3J0IGdldE9mZnNldFBhcmVudCBmcm9tIFwiLi9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgeyBpc0VsZW1lbnQsIGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGNvbnRhaW5zIGZyb20gXCIuL2NvbnRhaW5zLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCByZWN0VG9DbGllbnRSZWN0IGZyb20gXCIuLi91dGlscy9yZWN0VG9DbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgeyBtYXgsIG1pbiB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpIHtcbiAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCk7XG4gIHJlY3QudG9wID0gcmVjdC50b3AgKyBlbGVtZW50LmNsaWVudFRvcDtcbiAgcmVjdC5sZWZ0ID0gcmVjdC5sZWZ0ICsgZWxlbWVudC5jbGllbnRMZWZ0O1xuICByZWN0LmJvdHRvbSA9IHJlY3QudG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIHJlY3QucmlnaHQgPSByZWN0LmxlZnQgKyBlbGVtZW50LmNsaWVudFdpZHRoO1xuICByZWN0LndpZHRoID0gZWxlbWVudC5jbGllbnRXaWR0aDtcbiAgcmVjdC5oZWlnaHQgPSBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgcmVjdC54ID0gcmVjdC5sZWZ0O1xuICByZWN0LnkgPSByZWN0LnRvcDtcbiAgcmV0dXJuIHJlY3Q7XG59XG5cbmZ1bmN0aW9uIGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50KSB7XG4gIHJldHVybiBjbGlwcGluZ1BhcmVudCA9PT0gdmlld3BvcnQgPyByZWN0VG9DbGllbnRSZWN0KGdldFZpZXdwb3J0UmVjdChlbGVtZW50KSkgOiBpc0hUTUxFbGVtZW50KGNsaXBwaW5nUGFyZW50KSA/IGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGNsaXBwaW5nUGFyZW50KSA6IHJlY3RUb0NsaWVudFJlY3QoZ2V0RG9jdW1lbnRSZWN0KGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSkpO1xufSAvLyBBIFwiY2xpcHBpbmcgcGFyZW50XCIgaXMgYW4gb3ZlcmZsb3dhYmxlIGNvbnRhaW5lciB3aXRoIHRoZSBjaGFyYWN0ZXJpc3RpYyBvZlxuLy8gY2xpcHBpbmcgKG9yIGhpZGluZykgb3ZlcmZsb3dpbmcgZWxlbWVudHMgd2l0aCBhIHBvc2l0aW9uIGRpZmZlcmVudCBmcm9tXG4vLyBgaW5pdGlhbGBcblxuXG5mdW5jdGlvbiBnZXRDbGlwcGluZ1BhcmVudHMoZWxlbWVudCkge1xuICB2YXIgY2xpcHBpbmdQYXJlbnRzID0gbGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZShlbGVtZW50KSk7XG4gIHZhciBjYW5Fc2NhcGVDbGlwcGluZyA9IFsnYWJzb2x1dGUnLCAnZml4ZWQnXS5pbmRleE9mKGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24pID49IDA7XG4gIHZhciBjbGlwcGVyRWxlbWVudCA9IGNhbkVzY2FwZUNsaXBwaW5nICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkgPyBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkgOiBlbGVtZW50O1xuXG4gIGlmICghaXNFbGVtZW50KGNsaXBwZXJFbGVtZW50KSkge1xuICAgIHJldHVybiBbXTtcbiAgfSAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMTQxNFxuXG5cbiAgcmV0dXJuIGNsaXBwaW5nUGFyZW50cy5maWx0ZXIoZnVuY3Rpb24gKGNsaXBwaW5nUGFyZW50KSB7XG4gICAgcmV0dXJuIGlzRWxlbWVudChjbGlwcGluZ1BhcmVudCkgJiYgY29udGFpbnMoY2xpcHBpbmdQYXJlbnQsIGNsaXBwZXJFbGVtZW50KSAmJiBnZXROb2RlTmFtZShjbGlwcGluZ1BhcmVudCkgIT09ICdib2R5JztcbiAgfSk7XG59IC8vIEdldHMgdGhlIG1heGltdW0gYXJlYSB0aGF0IHRoZSBlbGVtZW50IGlzIHZpc2libGUgaW4gZHVlIHRvIGFueSBudW1iZXIgb2Zcbi8vIGNsaXBwaW5nIHBhcmVudHNcblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDbGlwcGluZ1JlY3QoZWxlbWVudCwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSkge1xuICB2YXIgbWFpbkNsaXBwaW5nUGFyZW50cyA9IGJvdW5kYXJ5ID09PSAnY2xpcHBpbmdQYXJlbnRzJyA/IGdldENsaXBwaW5nUGFyZW50cyhlbGVtZW50KSA6IFtdLmNvbmNhdChib3VuZGFyeSk7XG4gIHZhciBjbGlwcGluZ1BhcmVudHMgPSBbXS5jb25jYXQobWFpbkNsaXBwaW5nUGFyZW50cywgW3Jvb3RCb3VuZGFyeV0pO1xuICB2YXIgZmlyc3RDbGlwcGluZ1BhcmVudCA9IGNsaXBwaW5nUGFyZW50c1swXTtcbiAgdmFyIGNsaXBwaW5nUmVjdCA9IGNsaXBwaW5nUGFyZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjY1JlY3QsIGNsaXBwaW5nUGFyZW50KSB7XG4gICAgdmFyIHJlY3QgPSBnZXRDbGllbnRSZWN0RnJvbU1peGVkVHlwZShlbGVtZW50LCBjbGlwcGluZ1BhcmVudCk7XG4gICAgYWNjUmVjdC50b3AgPSBtYXgocmVjdC50b3AsIGFjY1JlY3QudG9wKTtcbiAgICBhY2NSZWN0LnJpZ2h0ID0gbWluKHJlY3QucmlnaHQsIGFjY1JlY3QucmlnaHQpO1xuICAgIGFjY1JlY3QuYm90dG9tID0gbWluKHJlY3QuYm90dG9tLCBhY2NSZWN0LmJvdHRvbSk7XG4gICAgYWNjUmVjdC5sZWZ0ID0gbWF4KHJlY3QubGVmdCwgYWNjUmVjdC5sZWZ0KTtcbiAgICByZXR1cm4gYWNjUmVjdDtcbiAgfSwgZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgZmlyc3RDbGlwcGluZ1BhcmVudCkpO1xuICBjbGlwcGluZ1JlY3Qud2lkdGggPSBjbGlwcGluZ1JlY3QucmlnaHQgLSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgY2xpcHBpbmdSZWN0LmhlaWdodCA9IGNsaXBwaW5nUmVjdC5ib3R0b20gLSBjbGlwcGluZ1JlY3QudG9wO1xuICBjbGlwcGluZ1JlY3QueCA9IGNsaXBwaW5nUmVjdC5sZWZ0O1xuICBjbGlwcGluZ1JlY3QueSA9IGNsaXBwaW5nUmVjdC50b3A7XG4gIHJldHVybiBjbGlwcGluZ1JlY3Q7XG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzFdO1xufSIsICJpbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudCBmcm9tIFwiLi9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCwgc3RhcnQsIGVuZCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcHV0ZU9mZnNldHMoX3JlZikge1xuICB2YXIgcmVmZXJlbmNlID0gX3JlZi5yZWZlcmVuY2UsXG4gICAgICBlbGVtZW50ID0gX3JlZi5lbGVtZW50LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZi5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50ID8gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIHZhcmlhdGlvbiA9IHBsYWNlbWVudCA/IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIGNvbW1vblggPSByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCAvIDIgLSBlbGVtZW50LndpZHRoIC8gMjtcbiAgdmFyIGNvbW1vblkgPSByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHQgLyAyIC0gZWxlbWVudC5oZWlnaHQgLyAyO1xuICB2YXIgb2Zmc2V0cztcblxuICBzd2l0Y2ggKGJhc2VQbGFjZW1lbnQpIHtcbiAgICBjYXNlIHRvcDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55IC0gZWxlbWVudC5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgYm90dG9tOlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogY29tbW9uWCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHJpZ2h0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLnggKyByZWZlcmVuY2Uud2lkdGgsXG4gICAgICAgIHk6IGNvbW1vbllcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgbGVmdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54IC0gZWxlbWVudC53aWR0aCxcbiAgICAgICAgeTogY29tbW9uWVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54LFxuICAgICAgICB5OiByZWZlcmVuY2UueVxuICAgICAgfTtcbiAgfVxuXG4gIHZhciBtYWluQXhpcyA9IGJhc2VQbGFjZW1lbnQgPyBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCkgOiBudWxsO1xuXG4gIGlmIChtYWluQXhpcyAhPSBudWxsKSB7XG4gICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICBzd2l0Y2ggKHZhcmlhdGlvbikge1xuICAgICAgY2FzZSBzdGFydDpcbiAgICAgICAgb2Zmc2V0c1ttYWluQXhpc10gPSBvZmZzZXRzW21haW5BeGlzXSAtIChyZWZlcmVuY2VbbGVuXSAvIDIgLSBlbGVtZW50W2xlbl0gLyAyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgZW5kOlxuICAgICAgICBvZmZzZXRzW21haW5BeGlzXSA9IG9mZnNldHNbbWFpbkF4aXNdICsgKHJlZmVyZW5jZVtsZW5dIC8gMiAtIGVsZW1lbnRbbGVuXSAvIDIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0cztcbn0iLCAiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldENsaXBwaW5nUmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldENsaXBwaW5nUmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuL2NvbXB1dGVPZmZzZXRzLmpzXCI7XG5pbXBvcnQgcmVjdFRvQ2xpZW50UmVjdCBmcm9tIFwiLi9yZWN0VG9DbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgeyBjbGlwcGluZ1BhcmVudHMsIHJlZmVyZW5jZSwgcG9wcGVyLCBib3R0b20sIHRvcCwgcmlnaHQsIGJhc2VQbGFjZW1lbnRzLCB2aWV3cG9ydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgbWVyZ2VQYWRkaW5nT2JqZWN0IGZyb20gXCIuL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi9leHBhbmRUb0hhc2hNYXAuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIF9vcHRpb25zJHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zJHBsYWNlbWVudCA9PT0gdm9pZCAwID8gc3RhdGUucGxhY2VtZW50IDogX29wdGlvbnMkcGxhY2VtZW50LFxuICAgICAgX29wdGlvbnMkYm91bmRhcnkgPSBfb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgIGJvdW5kYXJ5ID0gX29wdGlvbnMkYm91bmRhcnkgPT09IHZvaWQgMCA/IGNsaXBwaW5nUGFyZW50cyA6IF9vcHRpb25zJGJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMucm9vdEJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gX29wdGlvbnMkcm9vdEJvdW5kYXJ5ID09PSB2b2lkIDAgPyB2aWV3cG9ydCA6IF9vcHRpb25zJHJvb3RCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJGVsZW1lbnRDb250ZSA9IF9vcHRpb25zLmVsZW1lbnRDb250ZXh0LFxuICAgICAgZWxlbWVudENvbnRleHQgPSBfb3B0aW9ucyRlbGVtZW50Q29udGUgPT09IHZvaWQgMCA/IHBvcHBlciA6IF9vcHRpb25zJGVsZW1lbnRDb250ZSxcbiAgICAgIF9vcHRpb25zJGFsdEJvdW5kYXJ5ID0gX29wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IF9vcHRpb25zJGFsdEJvdW5kYXJ5ID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkcGFkZGluZyA9IF9vcHRpb25zLnBhZGRpbmcsXG4gICAgICBwYWRkaW5nID0gX29wdGlvbnMkcGFkZGluZyA9PT0gdm9pZCAwID8gMCA6IF9vcHRpb25zJHBhZGRpbmc7XG4gIHZhciBwYWRkaW5nT2JqZWN0ID0gbWVyZ2VQYWRkaW5nT2JqZWN0KHR5cGVvZiBwYWRkaW5nICE9PSAnbnVtYmVyJyA/IHBhZGRpbmcgOiBleHBhbmRUb0hhc2hNYXAocGFkZGluZywgYmFzZVBsYWNlbWVudHMpKTtcbiAgdmFyIGFsdENvbnRleHQgPSBlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyID8gcmVmZXJlbmNlIDogcG9wcGVyO1xuICB2YXIgcmVmZXJlbmNlRWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBlbGVtZW50ID0gc3RhdGUuZWxlbWVudHNbYWx0Qm91bmRhcnkgPyBhbHRDb250ZXh0IDogZWxlbWVudENvbnRleHRdO1xuICB2YXIgY2xpcHBpbmdDbGllbnRSZWN0ID0gZ2V0Q2xpcHBpbmdSZWN0KGlzRWxlbWVudChlbGVtZW50KSA/IGVsZW1lbnQgOiBlbGVtZW50LmNvbnRleHRFbGVtZW50IHx8IGdldERvY3VtZW50RWxlbWVudChzdGF0ZS5lbGVtZW50cy5wb3BwZXIpLCBib3VuZGFyeSwgcm9vdEJvdW5kYXJ5KTtcbiAgdmFyIHJlZmVyZW5jZUNsaWVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QocmVmZXJlbmNlRWxlbWVudCk7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gY29tcHV0ZU9mZnNldHMoe1xuICAgIHJlZmVyZW5jZTogcmVmZXJlbmNlQ2xpZW50UmVjdCxcbiAgICBlbGVtZW50OiBwb3BwZXJSZWN0LFxuICAgIHN0cmF0ZWd5OiAnYWJzb2x1dGUnLFxuICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gIH0pO1xuICB2YXIgcG9wcGVyQ2xpZW50UmVjdCA9IHJlY3RUb0NsaWVudFJlY3QoT2JqZWN0LmFzc2lnbih7fSwgcG9wcGVyUmVjdCwgcG9wcGVyT2Zmc2V0cykpO1xuICB2YXIgZWxlbWVudENsaWVudFJlY3QgPSBlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyID8gcG9wcGVyQ2xpZW50UmVjdCA6IHJlZmVyZW5jZUNsaWVudFJlY3Q7IC8vIHBvc2l0aXZlID0gb3ZlcmZsb3dpbmcgdGhlIGNsaXBwaW5nIHJlY3RcbiAgLy8gMCBvciBuZWdhdGl2ZSA9IHdpdGhpbiB0aGUgY2xpcHBpbmcgcmVjdFxuXG4gIHZhciBvdmVyZmxvd09mZnNldHMgPSB7XG4gICAgdG9wOiBjbGlwcGluZ0NsaWVudFJlY3QudG9wIC0gZWxlbWVudENsaWVudFJlY3QudG9wICsgcGFkZGluZ09iamVjdC50b3AsXG4gICAgYm90dG9tOiBlbGVtZW50Q2xpZW50UmVjdC5ib3R0b20gLSBjbGlwcGluZ0NsaWVudFJlY3QuYm90dG9tICsgcGFkZGluZ09iamVjdC5ib3R0b20sXG4gICAgbGVmdDogY2xpcHBpbmdDbGllbnRSZWN0LmxlZnQgLSBlbGVtZW50Q2xpZW50UmVjdC5sZWZ0ICsgcGFkZGluZ09iamVjdC5sZWZ0LFxuICAgIHJpZ2h0OiBlbGVtZW50Q2xpZW50UmVjdC5yaWdodCAtIGNsaXBwaW5nQ2xpZW50UmVjdC5yaWdodCArIHBhZGRpbmdPYmplY3QucmlnaHRcbiAgfTtcbiAgdmFyIG9mZnNldERhdGEgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldDsgLy8gT2Zmc2V0cyBjYW4gYmUgYXBwbGllZCBvbmx5IHRvIHRoZSBwb3BwZXIgZWxlbWVudFxuXG4gIGlmIChlbGVtZW50Q29udGV4dCA9PT0gcG9wcGVyICYmIG9mZnNldERhdGEpIHtcbiAgICB2YXIgb2Zmc2V0ID0gb2Zmc2V0RGF0YVtwbGFjZW1lbnRdO1xuICAgIE9iamVjdC5rZXlzKG92ZXJmbG93T2Zmc2V0cykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB2YXIgbXVsdGlwbHkgPSBbcmlnaHQsIGJvdHRvbV0uaW5kZXhPZihrZXkpID49IDAgPyAxIDogLTE7XG4gICAgICB2YXIgYXhpcyA9IFt0b3AsIGJvdHRvbV0uaW5kZXhPZihrZXkpID49IDAgPyAneScgOiAneCc7XG4gICAgICBvdmVyZmxvd09mZnNldHNba2V5XSArPSBvZmZzZXRbYXhpc10gKiBtdWx0aXBseTtcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBvdmVyZmxvd09mZnNldHM7XG59IiwgImltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4vZ2V0VmFyaWF0aW9uLmpzXCI7XG5pbXBvcnQgeyB2YXJpYXRpb25QbGFjZW1lbnRzLCBiYXNlUGxhY2VtZW50cywgcGxhY2VtZW50cyBhcyBhbGxQbGFjZW1lbnRzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4vZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX29wdGlvbnMgPSBvcHRpb25zLFxuICAgICAgcGxhY2VtZW50ID0gX29wdGlvbnMucGxhY2VtZW50LFxuICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucy5ib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeSA9IF9vcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBfb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgZmxpcFZhcmlhdGlvbnMgPSBfb3B0aW9ucy5mbGlwVmFyaWF0aW9ucyxcbiAgICAgIF9vcHRpb25zJGFsbG93ZWRBdXRvUCA9IF9vcHRpb25zLmFsbG93ZWRBdXRvUGxhY2VtZW50cyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IF9vcHRpb25zJGFsbG93ZWRBdXRvUCA9PT0gdm9pZCAwID8gYWxsUGxhY2VtZW50cyA6IF9vcHRpb25zJGFsbG93ZWRBdXRvUDtcbiAgdmFyIHZhcmlhdGlvbiA9IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpO1xuICB2YXIgcGxhY2VtZW50cyA9IHZhcmlhdGlvbiA/IGZsaXBWYXJpYXRpb25zID8gdmFyaWF0aW9uUGxhY2VtZW50cyA6IHZhcmlhdGlvblBsYWNlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgPT09IHZhcmlhdGlvbjtcbiAgfSkgOiBiYXNlUGxhY2VtZW50cztcbiAgdmFyIGFsbG93ZWRQbGFjZW1lbnRzID0gcGxhY2VtZW50cy5maWx0ZXIoZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgIHJldHVybiBhbGxvd2VkQXV0b1BsYWNlbWVudHMuaW5kZXhPZihwbGFjZW1lbnQpID49IDA7XG4gIH0pO1xuXG4gIGlmIChhbGxvd2VkUGxhY2VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBhbGxvd2VkUGxhY2VtZW50cyA9IHBsYWNlbWVudHM7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBUaGUgYGFsbG93ZWRBdXRvUGxhY2VtZW50c2Agb3B0aW9uIGRpZCBub3QgYWxsb3cgYW55JywgJ3BsYWNlbWVudHMuIEVuc3VyZSB0aGUgYHBsYWNlbWVudGAgb3B0aW9uIG1hdGNoZXMgdGhlIHZhcmlhdGlvbicsICdvZiB0aGUgYWxsb3dlZCBwbGFjZW1lbnRzLicsICdGb3IgZXhhbXBsZSwgXCJhdXRvXCIgY2Fubm90IGJlIHVzZWQgdG8gYWxsb3cgXCJib3R0b20tc3RhcnRcIi4nLCAnVXNlIFwiYXV0by1zdGFydFwiIGluc3RlYWQuJ10uam9pbignICcpKTtcbiAgICB9XG4gIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtdHlwZV06IEZsb3cgc2VlbXMgdG8gaGF2ZSBwcm9ibGVtcyB3aXRoIHR3byBhcnJheSB1bmlvbnMuLi5cblxuXG4gIHZhciBvdmVyZmxvd3MgPSBhbGxvd2VkUGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gICAgYWNjW3BsYWNlbWVudF0gPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmc6IHBhZGRpbmdcbiAgICB9KVtnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCldO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG92ZXJmbG93cykuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBvdmVyZmxvd3NbYV0gLSBvdmVyZmxvd3NbYl07XG4gIH0pO1xufSIsICJpbXBvcnQgZ2V0T3Bwb3NpdGVQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE9wcG9zaXRlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuLi91dGlscy9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVBdXRvUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9jb21wdXRlQXV0b1BsYWNlbWVudC5qc1wiO1xuaW1wb3J0IHsgYm90dG9tLCB0b3AsIHN0YXJ0LCByaWdodCwgbGVmdCwgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldFZhcmlhdGlvbiBmcm9tIFwiLi4vdXRpbHMvZ2V0VmFyaWF0aW9uLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZnVuY3Rpb24gZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocGxhY2VtZW50KSB7XG4gIGlmIChnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgb3Bwb3NpdGVQbGFjZW1lbnQgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICByZXR1cm4gW2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KHBsYWNlbWVudCksIG9wcG9zaXRlUGxhY2VtZW50LCBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChvcHBvc2l0ZVBsYWNlbWVudCldO1xufVxuXG5mdW5jdGlvbiBmbGlwKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnMsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIF9vcHRpb25zJG1haW5BeGlzID0gb3B0aW9ucy5tYWluQXhpcyxcbiAgICAgIGNoZWNrTWFpbkF4aXMgPSBfb3B0aW9ucyRtYWluQXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJG1haW5BeGlzLFxuICAgICAgX29wdGlvbnMkYWx0QXhpcyA9IG9wdGlvbnMuYWx0QXhpcyxcbiAgICAgIGNoZWNrQWx0QXhpcyA9IF9vcHRpb25zJGFsdEF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRhbHRBeGlzLFxuICAgICAgc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzID0gb3B0aW9ucy5mYWxsYmFja1BsYWNlbWVudHMsXG4gICAgICBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nLFxuICAgICAgYm91bmRhcnkgPSBvcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5ID0gb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeSA9IG9wdGlvbnMuYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRmbGlwVmFyaWF0aW8gPSBvcHRpb25zLmZsaXBWYXJpYXRpb25zLFxuICAgICAgZmxpcFZhcmlhdGlvbnMgPSBfb3B0aW9ucyRmbGlwVmFyaWF0aW8gPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRmbGlwVmFyaWF0aW8sXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBvcHRpb25zLmFsbG93ZWRBdXRvUGxhY2VtZW50cztcbiAgdmFyIHByZWZlcnJlZFBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocHJlZmVycmVkUGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9IGJhc2VQbGFjZW1lbnQgPT09IHByZWZlcnJlZFBsYWNlbWVudDtcbiAgdmFyIGZhbGxiYWNrUGxhY2VtZW50cyA9IHNwZWNpZmllZEZhbGxiYWNrUGxhY2VtZW50cyB8fCAoaXNCYXNlUGxhY2VtZW50IHx8ICFmbGlwVmFyaWF0aW9ucyA/IFtnZXRPcHBvc2l0ZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpXSA6IGdldEV4cGFuZGVkRmFsbGJhY2tQbGFjZW1lbnRzKHByZWZlcnJlZFBsYWNlbWVudCkpO1xuICB2YXIgcGxhY2VtZW50cyA9IFtwcmVmZXJyZWRQbGFjZW1lbnRdLmNvbmNhdChmYWxsYmFja1BsYWNlbWVudHMpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChnZXRCYXNlUGxhY2VtZW50KHBsYWNlbWVudCkgPT09IGF1dG8gPyBjb21wdXRlQXV0b1BsYWNlbWVudChzdGF0ZSwge1xuICAgICAgcGxhY2VtZW50OiBwbGFjZW1lbnQsXG4gICAgICBib3VuZGFyeTogYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmc6IHBhZGRpbmcsXG4gICAgICBmbGlwVmFyaWF0aW9uczogZmxpcFZhcmlhdGlvbnMsXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHM6IGFsbG93ZWRBdXRvUGxhY2VtZW50c1xuICAgIH0pIDogcGxhY2VtZW50KTtcbiAgfSwgW10pO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBjaGVja3NNYXAgPSBuZXcgTWFwKCk7XG4gIHZhciBtYWtlRmFsbGJhY2tDaGVja3MgPSB0cnVlO1xuICB2YXIgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50c1swXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWNlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcGxhY2VtZW50ID0gcGxhY2VtZW50c1tpXTtcblxuICAgIHZhciBfYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcblxuICAgIHZhciBpc1N0YXJ0VmFyaWF0aW9uID0gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkgPT09IHN0YXJ0O1xuICAgIHZhciBpc1ZlcnRpY2FsID0gW3RvcCwgYm90dG9tXS5pbmRleE9mKF9iYXNlUGxhY2VtZW50KSA+PSAwO1xuICAgIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xuICAgIHZhciBvdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgYWx0Qm91bmRhcnk6IGFsdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZ1xuICAgIH0pO1xuICAgIHZhciBtYWluVmFyaWF0aW9uU2lkZSA9IGlzVmVydGljYWwgPyBpc1N0YXJ0VmFyaWF0aW9uID8gcmlnaHQgOiBsZWZ0IDogaXNTdGFydFZhcmlhdGlvbiA/IGJvdHRvbSA6IHRvcDtcblxuICAgIGlmIChyZWZlcmVuY2VSZWN0W2xlbl0gPiBwb3BwZXJSZWN0W2xlbl0pIHtcbiAgICAgIG1haW5WYXJpYXRpb25TaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpblZhcmlhdGlvblNpZGUpO1xuICAgIH1cblxuICAgIHZhciBhbHRWYXJpYXRpb25TaWRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQobWFpblZhcmlhdGlvblNpZGUpO1xuICAgIHZhciBjaGVja3MgPSBbXTtcblxuICAgIGlmIChjaGVja01haW5BeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1tfYmFzZVBsYWNlbWVudF0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrQWx0QXhpcykge1xuICAgICAgY2hlY2tzLnB1c2gob3ZlcmZsb3dbbWFpblZhcmlhdGlvblNpZGVdIDw9IDAsIG92ZXJmbG93W2FsdFZhcmlhdGlvblNpZGVdIDw9IDApO1xuICAgIH1cblxuICAgIGlmIChjaGVja3MuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICByZXR1cm4gY2hlY2s7XG4gICAgfSkpIHtcbiAgICAgIGZpcnN0Rml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudDtcbiAgICAgIG1ha2VGYWxsYmFja0NoZWNrcyA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2hlY2tzTWFwLnNldChwbGFjZW1lbnQsIGNoZWNrcyk7XG4gIH1cblxuICBpZiAobWFrZUZhbGxiYWNrQ2hlY2tzKSB7XG4gICAgLy8gYDJgIG1heSBiZSBkZXNpcmVkIGluIHNvbWUgY2FzZXMgXHUyMDEzIHJlc2VhcmNoIGxhdGVyXG4gICAgdmFyIG51bWJlck9mQ2hlY2tzID0gZmxpcFZhcmlhdGlvbnMgPyAzIDogMTtcblxuICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKF9pKSB7XG4gICAgICB2YXIgZml0dGluZ1BsYWNlbWVudCA9IHBsYWNlbWVudHMuZmluZChmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgICAgIHZhciBjaGVja3MgPSBjaGVja3NNYXAuZ2V0KHBsYWNlbWVudCk7XG5cbiAgICAgICAgaWYgKGNoZWNrcykge1xuICAgICAgICAgIHJldHVybiBjaGVja3Muc2xpY2UoMCwgX2kpLmV2ZXJ5KGZ1bmN0aW9uIChjaGVjaykge1xuICAgICAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gZml0dGluZ1BsYWNlbWVudDtcbiAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZm9yICh2YXIgX2kgPSBudW1iZXJPZkNoZWNrczsgX2kgPiAwOyBfaS0tKSB7XG4gICAgICB2YXIgX3JldCA9IF9sb29wKF9pKTtcblxuICAgICAgaWYgKF9yZXQgPT09IFwiYnJlYWtcIikgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXRlLnBsYWNlbWVudCAhPT0gZmlyc3RGaXR0aW5nUGxhY2VtZW50KSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXS5fc2tpcCA9IHRydWU7XG4gICAgc3RhdGUucGxhY2VtZW50ID0gZmlyc3RGaXR0aW5nUGxhY2VtZW50O1xuICAgIHN0YXRlLnJlc2V0ID0gdHJ1ZTtcbiAgfVxufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnZmxpcCcsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIGZuOiBmbGlwLFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddLFxuICBkYXRhOiB7XG4gICAgX3NraXA6IGZhbHNlXG4gIH1cbn07IiwgImltcG9ydCB7IHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuLi91dGlscy9kZXRlY3RPdmVyZmxvdy5qc1wiO1xuXG5mdW5jdGlvbiBnZXRTaWRlT2Zmc2V0cyhvdmVyZmxvdywgcmVjdCwgcHJldmVudGVkT2Zmc2V0cykge1xuICBpZiAocHJldmVudGVkT2Zmc2V0cyA9PT0gdm9pZCAwKSB7XG4gICAgcHJldmVudGVkT2Zmc2V0cyA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9wOiBvdmVyZmxvdy50b3AgLSByZWN0LmhlaWdodCAtIHByZXZlbnRlZE9mZnNldHMueSxcbiAgICByaWdodDogb3ZlcmZsb3cucmlnaHQgLSByZWN0LndpZHRoICsgcHJldmVudGVkT2Zmc2V0cy54LFxuICAgIGJvdHRvbTogb3ZlcmZsb3cuYm90dG9tIC0gcmVjdC5oZWlnaHQgKyBwcmV2ZW50ZWRPZmZzZXRzLnksXG4gICAgbGVmdDogb3ZlcmZsb3cubGVmdCAtIHJlY3Qud2lkdGggLSBwcmV2ZW50ZWRPZmZzZXRzLnhcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKG92ZXJmbG93KSB7XG4gIHJldHVybiBbdG9wLCByaWdodCwgYm90dG9tLCBsZWZ0XS5zb21lKGZ1bmN0aW9uIChzaWRlKSB7XG4gICAgcmV0dXJuIG92ZXJmbG93W3NpZGVdID49IDA7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBoaWRlKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHByZXZlbnRlZE9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnByZXZlbnRPdmVyZmxvdztcbiAgdmFyIHJlZmVyZW5jZU92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICBlbGVtZW50Q29udGV4dDogJ3JlZmVyZW5jZSdcbiAgfSk7XG4gIHZhciBwb3BwZXJBbHRPdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgYWx0Qm91bmRhcnk6IHRydWVcbiAgfSk7XG4gIHZhciByZWZlcmVuY2VDbGlwcGluZ09mZnNldHMgPSBnZXRTaWRlT2Zmc2V0cyhyZWZlcmVuY2VPdmVyZmxvdywgcmVmZXJlbmNlUmVjdCk7XG4gIHZhciBwb3BwZXJFc2NhcGVPZmZzZXRzID0gZ2V0U2lkZU9mZnNldHMocG9wcGVyQWx0T3ZlcmZsb3csIHBvcHBlclJlY3QsIHByZXZlbnRlZE9mZnNldHMpO1xuICB2YXIgaXNSZWZlcmVuY2VIaWRkZW4gPSBpc0FueVNpZGVGdWxseUNsaXBwZWQocmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzKTtcbiAgdmFyIGhhc1BvcHBlckVzY2FwZWQgPSBpc0FueVNpZGVGdWxseUNsaXBwZWQocG9wcGVyRXNjYXBlT2Zmc2V0cyk7XG4gIHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0gPSB7XG4gICAgcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzOiByZWZlcmVuY2VDbGlwcGluZ09mZnNldHMsXG4gICAgcG9wcGVyRXNjYXBlT2Zmc2V0czogcG9wcGVyRXNjYXBlT2Zmc2V0cyxcbiAgICBpc1JlZmVyZW5jZUhpZGRlbjogaXNSZWZlcmVuY2VIaWRkZW4sXG4gICAgaGFzUG9wcGVyRXNjYXBlZDogaGFzUG9wcGVyRXNjYXBlZFxuICB9O1xuICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgJ2RhdGEtcG9wcGVyLXJlZmVyZW5jZS1oaWRkZW4nOiBpc1JlZmVyZW5jZUhpZGRlbixcbiAgICAnZGF0YS1wb3BwZXItZXNjYXBlZCc6IGhhc1BvcHBlckVzY2FwZWRcbiAgfSk7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdoaWRlJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgcmVxdWlyZXNJZkV4aXN0czogWydwcmV2ZW50T3ZlcmZsb3cnXSxcbiAgZm46IGhpZGVcbn07IiwgImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBwbGFjZW1lbnRzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gZGlzdGFuY2VBbmRTa2lkZGluZ1RvWFkocGxhY2VtZW50LCByZWN0cywgb2Zmc2V0KSB7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICB2YXIgaW52ZXJ0RGlzdGFuY2UgPSBbbGVmdCwgdG9wXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDAgPyAtMSA6IDE7XG5cbiAgdmFyIF9yZWYgPSB0eXBlb2Ygb2Zmc2V0ID09PSAnZnVuY3Rpb24nID8gb2Zmc2V0KE9iamVjdC5hc3NpZ24oe30sIHJlY3RzLCB7XG4gICAgcGxhY2VtZW50OiBwbGFjZW1lbnRcbiAgfSkpIDogb2Zmc2V0LFxuICAgICAgc2tpZGRpbmcgPSBfcmVmWzBdLFxuICAgICAgZGlzdGFuY2UgPSBfcmVmWzFdO1xuXG4gIHNraWRkaW5nID0gc2tpZGRpbmcgfHwgMDtcbiAgZGlzdGFuY2UgPSAoZGlzdGFuY2UgfHwgMCkgKiBpbnZlcnREaXN0YW5jZTtcbiAgcmV0dXJuIFtsZWZ0LCByaWdodF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwID8ge1xuICAgIHg6IGRpc3RhbmNlLFxuICAgIHk6IHNraWRkaW5nXG4gIH0gOiB7XG4gICAgeDogc2tpZGRpbmcsXG4gICAgeTogZGlzdGFuY2VcbiAgfTtcbn1cblxuZnVuY3Rpb24gb2Zmc2V0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYyLm9wdGlvbnMsXG4gICAgICBuYW1lID0gX3JlZjIubmFtZTtcbiAgdmFyIF9vcHRpb25zJG9mZnNldCA9IG9wdGlvbnMub2Zmc2V0LFxuICAgICAgb2Zmc2V0ID0gX29wdGlvbnMkb2Zmc2V0ID09PSB2b2lkIDAgPyBbMCwgMF0gOiBfb3B0aW9ucyRvZmZzZXQ7XG4gIHZhciBkYXRhID0gcGxhY2VtZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGxhY2VtZW50KSB7XG4gICAgYWNjW3BsYWNlbWVudF0gPSBkaXN0YW5jZUFuZFNraWRkaW5nVG9YWShwbGFjZW1lbnQsIHN0YXRlLnJlY3RzLCBvZmZzZXQpO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbiAgdmFyIF9kYXRhJHN0YXRlJHBsYWNlbWVudCA9IGRhdGFbc3RhdGUucGxhY2VtZW50XSxcbiAgICAgIHggPSBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQueCxcbiAgICAgIHkgPSBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQueTtcblxuICBpZiAoc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzICE9IG51bGwpIHtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueCArPSB4O1xuICAgIHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cy55ICs9IHk7XG4gIH1cblxuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gZGF0YTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ29mZnNldCcsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIHJlcXVpcmVzOiBbJ3BvcHBlck9mZnNldHMnXSxcbiAgZm46IG9mZnNldFxufTsiLCAiaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuLi91dGlscy9jb21wdXRlT2Zmc2V0cy5qc1wiO1xuXG5mdW5jdGlvbiBwb3BwZXJPZmZzZXRzKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIC8vIE9mZnNldHMgYXJlIHRoZSBhY3R1YWwgcG9zaXRpb24gdGhlIHBvcHBlciBuZWVkcyB0byBoYXZlIHRvIGJlXG4gIC8vIHByb3Blcmx5IHBvc2l0aW9uZWQgbmVhciBpdHMgcmVmZXJlbmNlIGVsZW1lbnRcbiAgLy8gVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBwbGFjZW1lbnQsIGFuZCB3aWxsIGJlIGFkanVzdGVkIGJ5XG4gIC8vIHRoZSBtb2RpZmllcnMgaW4gdGhlIG5leHQgc3RlcFxuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gY29tcHV0ZU9mZnNldHMoe1xuICAgIHJlZmVyZW5jZTogc3RhdGUucmVjdHMucmVmZXJlbmNlLFxuICAgIGVsZW1lbnQ6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3BvcHBlck9mZnNldHMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3JlYWQnLFxuICBmbjogcG9wcGVyT2Zmc2V0cyxcbiAgZGF0YToge31cbn07IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEFsdEF4aXMoYXhpcykge1xuICByZXR1cm4gYXhpcyA9PT0gJ3gnID8gJ3knIDogJ3gnO1xufSIsICJpbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHN0YXJ0IH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0QWx0QXhpcyBmcm9tIFwiLi4vdXRpbHMvZ2V0QWx0QXhpcy5qc1wiO1xuaW1wb3J0IHdpdGhpbiBmcm9tIFwiLi4vdXRpbHMvd2l0aGluLmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi4vdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzXCI7XG5pbXBvcnQgeyBtYXggYXMgbWF0aE1heCwgbWluIGFzIG1hdGhNaW4gfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBwcmV2ZW50T3ZlcmZsb3coX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRtYWluQXhpcyA9IG9wdGlvbnMubWFpbkF4aXMsXG4gICAgICBjaGVja01haW5BeGlzID0gX29wdGlvbnMkbWFpbkF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRtYWluQXhpcyxcbiAgICAgIF9vcHRpb25zJGFsdEF4aXMgPSBvcHRpb25zLmFsdEF4aXMsXG4gICAgICBjaGVja0FsdEF4aXMgPSBfb3B0aW9ucyRhbHRBeGlzID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXIgPSBvcHRpb25zLnRldGhlcixcbiAgICAgIHRldGhlciA9IF9vcHRpb25zJHRldGhlciA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHRldGhlcixcbiAgICAgIF9vcHRpb25zJHRldGhlck9mZnNldCA9IG9wdGlvbnMudGV0aGVyT2Zmc2V0LFxuICAgICAgdGV0aGVyT2Zmc2V0ID0gX29wdGlvbnMkdGV0aGVyT2Zmc2V0ID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkdGV0aGVyT2Zmc2V0O1xuICB2YXIgb3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgIGFsdEJvdW5kYXJ5OiBhbHRCb3VuZGFyeVxuICB9KTtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9ICF2YXJpYXRpb247XG4gIHZhciBtYWluQXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGFsdEF4aXMgPSBnZXRBbHRBeGlzKG1haW5BeGlzKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHRldGhlck9mZnNldFZhbHVlID0gdHlwZW9mIHRldGhlck9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IHRldGhlck9mZnNldChPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZWN0cywge1xuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pKSA6IHRldGhlck9mZnNldDtcbiAgdmFyIGRhdGEgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKCFwb3BwZXJPZmZzZXRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGNoZWNrTWFpbkF4aXMgfHwgY2hlY2tBbHRBeGlzKSB7XG4gICAgdmFyIG1haW5TaWRlID0gbWFpbkF4aXMgPT09ICd5JyA/IHRvcCA6IGxlZnQ7XG4gICAgdmFyIGFsdFNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gYm90dG9tIDogcmlnaHQ7XG4gICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgdmFyIG9mZnNldCA9IHBvcHBlck9mZnNldHNbbWFpbkF4aXNdO1xuICAgIHZhciBtaW4gPSBwb3BwZXJPZmZzZXRzW21haW5BeGlzXSArIG92ZXJmbG93W21haW5TaWRlXTtcbiAgICB2YXIgbWF4ID0gcG9wcGVyT2Zmc2V0c1ttYWluQXhpc10gLSBvdmVyZmxvd1thbHRTaWRlXTtcbiAgICB2YXIgYWRkaXRpdmUgPSB0ZXRoZXIgPyAtcG9wcGVyUmVjdFtsZW5dIC8gMiA6IDA7XG4gICAgdmFyIG1pbkxlbiA9IHZhcmlhdGlvbiA9PT0gc3RhcnQgPyByZWZlcmVuY2VSZWN0W2xlbl0gOiBwb3BwZXJSZWN0W2xlbl07XG4gICAgdmFyIG1heExlbiA9IHZhcmlhdGlvbiA9PT0gc3RhcnQgPyAtcG9wcGVyUmVjdFtsZW5dIDogLXJlZmVyZW5jZVJlY3RbbGVuXTsgLy8gV2UgbmVlZCB0byBpbmNsdWRlIHRoZSBhcnJvdyBpbiB0aGUgY2FsY3VsYXRpb24gc28gdGhlIGFycm93IGRvZXNuJ3QgZ29cbiAgICAvLyBvdXRzaWRlIHRoZSByZWZlcmVuY2UgYm91bmRzXG5cbiAgICB2YXIgYXJyb3dFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3c7XG4gICAgdmFyIGFycm93UmVjdCA9IHRldGhlciAmJiBhcnJvd0VsZW1lbnQgPyBnZXRMYXlvdXRSZWN0KGFycm93RWxlbWVudCkgOiB7XG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMFxuICAgIH07XG4gICAgdmFyIGFycm93UGFkZGluZ09iamVjdCA9IHN0YXRlLm1vZGlmaWVyc0RhdGFbJ2Fycm93I3BlcnNpc3RlbnQnXSA/IHN0YXRlLm1vZGlmaWVyc0RhdGFbJ2Fycm93I3BlcnNpc3RlbnQnXS5wYWRkaW5nIDogZ2V0RnJlc2hTaWRlT2JqZWN0KCk7XG4gICAgdmFyIGFycm93UGFkZGluZ01pbiA9IGFycm93UGFkZGluZ09iamVjdFttYWluU2lkZV07XG4gICAgdmFyIGFycm93UGFkZGluZ01heCA9IGFycm93UGFkZGluZ09iamVjdFthbHRTaWRlXTsgLy8gSWYgdGhlIHJlZmVyZW5jZSBsZW5ndGggaXMgc21hbGxlciB0aGFuIHRoZSBhcnJvdyBsZW5ndGgsIHdlIGRvbid0IHdhbnRcbiAgICAvLyB0byBpbmNsdWRlIGl0cyBmdWxsIHNpemUgaW4gdGhlIGNhbGN1bGF0aW9uLiBJZiB0aGUgcmVmZXJlbmNlIGlzIHNtYWxsXG4gICAgLy8gYW5kIG5lYXIgdGhlIGVkZ2Ugb2YgYSBib3VuZGFyeSwgdGhlIHBvcHBlciBjYW4gb3ZlcmZsb3cgZXZlbiBpZiB0aGVcbiAgICAvLyByZWZlcmVuY2UgaXMgbm90IG92ZXJmbG93aW5nIGFzIHdlbGwgKGUuZy4gdmlydHVhbCBlbGVtZW50cyB3aXRoIG5vXG4gICAgLy8gd2lkdGggb3IgaGVpZ2h0KVxuXG4gICAgdmFyIGFycm93TGVuID0gd2l0aGluKDAsIHJlZmVyZW5jZVJlY3RbbGVuXSwgYXJyb3dSZWN0W2xlbl0pO1xuICAgIHZhciBtaW5PZmZzZXQgPSBpc0Jhc2VQbGFjZW1lbnQgPyByZWZlcmVuY2VSZWN0W2xlbl0gLyAyIC0gYWRkaXRpdmUgLSBhcnJvd0xlbiAtIGFycm93UGFkZGluZ01pbiAtIHRldGhlck9mZnNldFZhbHVlIDogbWluTGVuIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSB0ZXRoZXJPZmZzZXRWYWx1ZTtcbiAgICB2YXIgbWF4T2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gLXJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgKyBhZGRpdGl2ZSArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgdGV0aGVyT2Zmc2V0VmFsdWUgOiBtYXhMZW4gKyBhcnJvd0xlbiArIGFycm93UGFkZGluZ01heCArIHRldGhlck9mZnNldFZhbHVlO1xuICAgIHZhciBhcnJvd09mZnNldFBhcmVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93ICYmIGdldE9mZnNldFBhcmVudChzdGF0ZS5lbGVtZW50cy5hcnJvdyk7XG4gICAgdmFyIGNsaWVudE9mZnNldCA9IGFycm93T2Zmc2V0UGFyZW50ID8gbWFpbkF4aXMgPT09ICd5JyA/IGFycm93T2Zmc2V0UGFyZW50LmNsaWVudFRvcCB8fCAwIDogYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50TGVmdCB8fCAwIDogMDtcbiAgICB2YXIgb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0ID8gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXRbc3RhdGUucGxhY2VtZW50XVttYWluQXhpc10gOiAwO1xuICAgIHZhciB0ZXRoZXJNaW4gPSBwb3BwZXJPZmZzZXRzW21haW5BeGlzXSArIG1pbk9mZnNldCAtIG9mZnNldE1vZGlmaWVyVmFsdWUgLSBjbGllbnRPZmZzZXQ7XG4gICAgdmFyIHRldGhlck1heCA9IHBvcHBlck9mZnNldHNbbWFpbkF4aXNdICsgbWF4T2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZTtcblxuICAgIGlmIChjaGVja01haW5BeGlzKSB7XG4gICAgICB2YXIgcHJldmVudGVkT2Zmc2V0ID0gd2l0aGluKHRldGhlciA/IG1hdGhNaW4obWluLCB0ZXRoZXJNaW4pIDogbWluLCBvZmZzZXQsIHRldGhlciA/IG1hdGhNYXgobWF4LCB0ZXRoZXJNYXgpIDogbWF4KTtcbiAgICAgIHBvcHBlck9mZnNldHNbbWFpbkF4aXNdID0gcHJldmVudGVkT2Zmc2V0O1xuICAgICAgZGF0YVttYWluQXhpc10gPSBwcmV2ZW50ZWRPZmZzZXQgLSBvZmZzZXQ7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrQWx0QXhpcykge1xuICAgICAgdmFyIF9tYWluU2lkZSA9IG1haW5BeGlzID09PSAneCcgPyB0b3AgOiBsZWZ0O1xuXG4gICAgICB2YXIgX2FsdFNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gYm90dG9tIDogcmlnaHQ7XG5cbiAgICAgIHZhciBfb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1thbHRBeGlzXTtcblxuICAgICAgdmFyIF9taW4gPSBfb2Zmc2V0ICsgb3ZlcmZsb3dbX21haW5TaWRlXTtcblxuICAgICAgdmFyIF9tYXggPSBfb2Zmc2V0IC0gb3ZlcmZsb3dbX2FsdFNpZGVdO1xuXG4gICAgICB2YXIgX3ByZXZlbnRlZE9mZnNldCA9IHdpdGhpbih0ZXRoZXIgPyBtYXRoTWluKF9taW4sIHRldGhlck1pbikgOiBfbWluLCBfb2Zmc2V0LCB0ZXRoZXIgPyBtYXRoTWF4KF9tYXgsIHRldGhlck1heCkgOiBfbWF4KTtcblxuICAgICAgcG9wcGVyT2Zmc2V0c1thbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQ7XG4gICAgICBkYXRhW2FsdEF4aXNdID0gX3ByZXZlbnRlZE9mZnNldCAtIF9vZmZzZXQ7XG4gICAgfVxuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwcmV2ZW50T3ZlcmZsb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogcHJldmVudE92ZXJmbG93LFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddXG59OyIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRIVE1MRWxlbWVudFNjcm9sbChlbGVtZW50KSB7XG4gIHJldHVybiB7XG4gICAgc2Nyb2xsTGVmdDogZWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgIHNjcm9sbFRvcDogZWxlbWVudC5zY3JvbGxUb3BcbiAgfTtcbn0iLCAiaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldEhUTUxFbGVtZW50U2Nyb2xsIGZyb20gXCIuL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlU2Nyb2xsKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IGdldFdpbmRvdyhub2RlKSB8fCAhaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgIHJldHVybiBnZXRXaW5kb3dTY3JvbGwobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50U2Nyb2xsKG5vZGUpO1xuICB9XG59IiwgImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZVNjcm9sbCBmcm9tIFwiLi9nZXROb2RlU2Nyb2xsLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7IC8vIFJldHVybnMgdGhlIGNvbXBvc2l0ZSByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC5cbi8vIENvbXBvc2l0ZSBtZWFucyBpdCB0YWtlcyBpbnRvIGFjY291bnQgdHJhbnNmb3JtcyBhcyB3ZWxsIGFzIGxheW91dC5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q29tcG9zaXRlUmVjdChlbGVtZW50T3JWaXJ0dWFsRWxlbWVudCwgb2Zmc2V0UGFyZW50LCBpc0ZpeGVkKSB7XG4gIGlmIChpc0ZpeGVkID09PSB2b2lkIDApIHtcbiAgICBpc0ZpeGVkID0gZmFsc2U7XG4gIH1cblxuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50KTtcbiAgdmFyIGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50ID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpO1xuICB2YXIgc2Nyb2xsID0ge1xuICAgIHNjcm9sbExlZnQ6IDAsXG4gICAgc2Nyb2xsVG9wOiAwXG4gIH07XG4gIHZhciBvZmZzZXRzID0ge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9O1xuXG4gIGlmIChpc09mZnNldFBhcmVudEFuRWxlbWVudCB8fCAhaXNPZmZzZXRQYXJlbnRBbkVsZW1lbnQgJiYgIWlzRml4ZWQpIHtcbiAgICBpZiAoZ2V0Tm9kZU5hbWUob2Zmc2V0UGFyZW50KSAhPT0gJ2JvZHknIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvMTA3OFxuICAgIGlzU2Nyb2xsUGFyZW50KGRvY3VtZW50RWxlbWVudCkpIHtcbiAgICAgIHNjcm9sbCA9IGdldE5vZGVTY3JvbGwob2Zmc2V0UGFyZW50KTtcbiAgICB9XG5cbiAgICBpZiAoaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpKSB7XG4gICAgICBvZmZzZXRzID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KG9mZnNldFBhcmVudCk7XG4gICAgICBvZmZzZXRzLnggKz0gb2Zmc2V0UGFyZW50LmNsaWVudExlZnQ7XG4gICAgICBvZmZzZXRzLnkgKz0gb2Zmc2V0UGFyZW50LmNsaWVudFRvcDtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50RWxlbWVudCkge1xuICAgICAgb2Zmc2V0cy54ID0gZ2V0V2luZG93U2Nyb2xsQmFyWChkb2N1bWVudEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogcmVjdC5sZWZ0ICsgc2Nyb2xsLnNjcm9sbExlZnQgLSBvZmZzZXRzLngsXG4gICAgeTogcmVjdC50b3AgKyBzY3JvbGwuc2Nyb2xsVG9wIC0gb2Zmc2V0cy55LFxuICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgIGhlaWdodDogcmVjdC5oZWlnaHRcbiAgfTtcbn0iLCAiaW1wb3J0IHsgbW9kaWZpZXJQaGFzZXMgfSBmcm9tIFwiLi4vZW51bXMuanNcIjsgLy8gc291cmNlOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80OTg3NTI1NVxuXG5mdW5jdGlvbiBvcmRlcihtb2RpZmllcnMpIHtcbiAgdmFyIG1hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIHZpc2l0ZWQgPSBuZXcgU2V0KCk7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgbWFwLnNldChtb2RpZmllci5uYW1lLCBtb2RpZmllcik7XG4gIH0pOyAvLyBPbiB2aXNpdGluZyBvYmplY3QsIGNoZWNrIGZvciBpdHMgZGVwZW5kZW5jaWVzIGFuZCB2aXNpdCB0aGVtIHJlY3Vyc2l2ZWx5XG5cbiAgZnVuY3Rpb24gc29ydChtb2RpZmllcikge1xuICAgIHZpc2l0ZWQuYWRkKG1vZGlmaWVyLm5hbWUpO1xuICAgIHZhciByZXF1aXJlcyA9IFtdLmNvbmNhdChtb2RpZmllci5yZXF1aXJlcyB8fCBbXSwgbW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cyB8fCBbXSk7XG4gICAgcmVxdWlyZXMuZm9yRWFjaChmdW5jdGlvbiAoZGVwKSB7XG4gICAgICBpZiAoIXZpc2l0ZWQuaGFzKGRlcCkpIHtcbiAgICAgICAgdmFyIGRlcE1vZGlmaWVyID0gbWFwLmdldChkZXApO1xuXG4gICAgICAgIGlmIChkZXBNb2RpZmllcikge1xuICAgICAgICAgIHNvcnQoZGVwTW9kaWZpZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVzdWx0LnB1c2gobW9kaWZpZXIpO1xuICB9XG5cbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgaWYgKCF2aXNpdGVkLmhhcyhtb2RpZmllci5uYW1lKSkge1xuICAgICAgLy8gY2hlY2sgZm9yIHZpc2l0ZWQgb2JqZWN0XG4gICAgICBzb3J0KG1vZGlmaWVyKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcmRlck1vZGlmaWVycyhtb2RpZmllcnMpIHtcbiAgLy8gb3JkZXIgYmFzZWQgb24gZGVwZW5kZW5jaWVzXG4gIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXIobW9kaWZpZXJzKTsgLy8gb3JkZXIgYmFzZWQgb24gcGhhc2VcblxuICByZXR1cm4gbW9kaWZpZXJQaGFzZXMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBoYXNlKSB7XG4gICAgcmV0dXJuIGFjYy5jb25jYXQob3JkZXJlZE1vZGlmaWVycy5maWx0ZXIoZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgICByZXR1cm4gbW9kaWZpZXIucGhhc2UgPT09IHBoYXNlO1xuICAgIH0pKTtcbiAgfSwgW10pO1xufSIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICB2YXIgcGVuZGluZztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXBlbmRpbmcpIHtcbiAgICAgIHBlbmRpbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwZW5kaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlc29sdmUoZm4oKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBlbmRpbmc7XG4gIH07XG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdChzdHIpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIFtdLmNvbmNhdChhcmdzKS5yZWR1Y2UoZnVuY3Rpb24gKHAsIGMpIHtcbiAgICByZXR1cm4gcC5yZXBsYWNlKC8lcy8sIGMpO1xuICB9LCBzdHIpO1xufSIsICJpbXBvcnQgZm9ybWF0IGZyb20gXCIuL2Zvcm1hdC5qc1wiO1xuaW1wb3J0IHsgbW9kaWZpZXJQaGFzZXMgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbnZhciBJTlZBTElEX01PRElGSUVSX0VSUk9SID0gJ1BvcHBlcjogbW9kaWZpZXIgXCIlc1wiIHByb3ZpZGVkIGFuIGludmFsaWQgJXMgcHJvcGVydHksIGV4cGVjdGVkICVzIGJ1dCBnb3QgJXMnO1xudmFyIE1JU1NJTkdfREVQRU5ERU5DWV9FUlJPUiA9ICdQb3BwZXI6IG1vZGlmaWVyIFwiJXNcIiByZXF1aXJlcyBcIiVzXCIsIGJ1dCBcIiVzXCIgbW9kaWZpZXIgaXMgbm90IGF2YWlsYWJsZSc7XG52YXIgVkFMSURfUFJPUEVSVElFUyA9IFsnbmFtZScsICdlbmFibGVkJywgJ3BoYXNlJywgJ2ZuJywgJ2VmZmVjdCcsICdyZXF1aXJlcycsICdvcHRpb25zJ107XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2YWxpZGF0ZU1vZGlmaWVycyhtb2RpZmllcnMpIHtcbiAgbW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgT2JqZWN0LmtleXMobW9kaWZpZXIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5uYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgU3RyaW5nKG1vZGlmaWVyLm5hbWUpLCAnXCJuYW1lXCInLCAnXCJzdHJpbmdcIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLm5hbWUpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlbmFibGVkJzpcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZGlmaWVyLmVuYWJsZWQgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZW5hYmxlZFwiJywgJ1wiYm9vbGVhblwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIuZW5hYmxlZCkgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICBjYXNlICdwaGFzZSc6XG4gICAgICAgICAgaWYgKG1vZGlmaWVyUGhhc2VzLmluZGV4T2YobW9kaWZpZXIucGhhc2UpIDwgMCkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wicGhhc2VcIicsIFwiZWl0aGVyIFwiICsgbW9kaWZpZXJQaGFzZXMuam9pbignLCAnKSwgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucGhhc2UpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdmbic6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5mbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihmb3JtYXQoSU5WQUxJRF9NT0RJRklFUl9FUlJPUiwgbW9kaWZpZXIubmFtZSwgJ1wiZm5cIicsICdcImZ1bmN0aW9uXCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5mbikgKyBcIlxcXCJcIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2VmZmVjdCc6XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2RpZmllci5lZmZlY3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcImVmZmVjdFwiJywgJ1wiZnVuY3Rpb25cIicsIFwiXFxcIlwiICsgU3RyaW5nKG1vZGlmaWVyLmZuKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAncmVxdWlyZXMnOlxuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShtb2RpZmllci5yZXF1aXJlcykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcInJlcXVpcmVzXCInLCAnXCJhcnJheVwiJywgXCJcXFwiXCIgKyBTdHJpbmcobW9kaWZpZXIucmVxdWlyZXMpICsgXCJcXFwiXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdyZXF1aXJlc0lmRXhpc3RzJzpcbiAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkobW9kaWZpZXIucmVxdWlyZXNJZkV4aXN0cykpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KElOVkFMSURfTU9ESUZJRVJfRVJST1IsIG1vZGlmaWVyLm5hbWUsICdcInJlcXVpcmVzSWZFeGlzdHNcIicsICdcImFycmF5XCInLCBcIlxcXCJcIiArIFN0cmluZyhtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzKSArIFwiXFxcIlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnb3B0aW9ucyc6XG4gICAgICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIlBvcHBlckpTOiBhbiBpbnZhbGlkIHByb3BlcnR5IGhhcyBiZWVuIHByb3ZpZGVkIHRvIHRoZSBcXFwiXCIgKyBtb2RpZmllci5uYW1lICsgXCJcXFwiIG1vZGlmaWVyLCB2YWxpZCBwcm9wZXJ0aWVzIGFyZSBcIiArIFZBTElEX1BST1BFUlRJRVMubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcXFwiXCIgKyBzICsgXCJcXFwiXCI7XG4gICAgICAgICAgfSkuam9pbignLCAnKSArIFwiOyBidXQgXFxcIlwiICsga2V5ICsgXCJcXFwiIHdhcyBwcm92aWRlZC5cIik7XG4gICAgICB9XG5cbiAgICAgIG1vZGlmaWVyLnJlcXVpcmVzICYmIG1vZGlmaWVyLnJlcXVpcmVzLmZvckVhY2goZnVuY3Rpb24gKHJlcXVpcmVtZW50KSB7XG4gICAgICAgIGlmIChtb2RpZmllcnMuZmluZChmdW5jdGlvbiAobW9kKSB7XG4gICAgICAgICAgcmV0dXJuIG1vZC5uYW1lID09PSByZXF1aXJlbWVudDtcbiAgICAgICAgfSkgPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZm9ybWF0KE1JU1NJTkdfREVQRU5ERU5DWV9FUlJPUiwgU3RyaW5nKG1vZGlmaWVyLm5hbWUpLCByZXF1aXJlbWVudCwgcmVxdWlyZW1lbnQpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSIsICJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1bmlxdWVCeShhcnIsIGZuKSB7XG4gIHZhciBpZGVudGlmaWVycyA9IG5ldyBTZXQoKTtcbiAgcmV0dXJuIGFyci5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICB2YXIgaWRlbnRpZmllciA9IGZuKGl0ZW0pO1xuXG4gICAgaWYgKCFpZGVudGlmaWVycy5oYXMoaWRlbnRpZmllcikpIHtcbiAgICAgIGlkZW50aWZpZXJzLmFkZChpZGVudGlmaWVyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG59IiwgImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQnlOYW1lKG1vZGlmaWVycykge1xuICB2YXIgbWVyZ2VkID0gbW9kaWZpZXJzLnJlZHVjZShmdW5jdGlvbiAobWVyZ2VkLCBjdXJyZW50KSB7XG4gICAgdmFyIGV4aXN0aW5nID0gbWVyZ2VkW2N1cnJlbnQubmFtZV07XG4gICAgbWVyZ2VkW2N1cnJlbnQubmFtZV0gPSBleGlzdGluZyA/IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLCBjdXJyZW50LCB7XG4gICAgICBvcHRpb25zOiBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZy5vcHRpb25zLCBjdXJyZW50Lm9wdGlvbnMpLFxuICAgICAgZGF0YTogT2JqZWN0LmFzc2lnbih7fSwgZXhpc3RpbmcuZGF0YSwgY3VycmVudC5kYXRhKVxuICAgIH0pIDogY3VycmVudDtcbiAgICByZXR1cm4gbWVyZ2VkO1xuICB9LCB7fSk7IC8vIElFMTEgZG9lcyBub3Qgc3VwcG9ydCBPYmplY3QudmFsdWVzXG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKG1lcmdlZCkubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gbWVyZ2VkW2tleV07XG4gIH0pO1xufSIsICJpbXBvcnQgZ2V0Q29tcG9zaXRlUmVjdCBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0Q29tcG9zaXRlUmVjdC5qc1wiO1xuaW1wb3J0IGdldExheW91dFJlY3QgZnJvbSBcIi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBsaXN0U2Nyb2xsUGFyZW50cyBmcm9tIFwiLi9kb20tdXRpbHMvbGlzdFNjcm9sbFBhcmVudHMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4vZG9tLXV0aWxzL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZG9tLXV0aWxzL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCBvcmRlck1vZGlmaWVycyBmcm9tIFwiLi91dGlscy9vcmRlck1vZGlmaWVycy5qc1wiO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gXCIuL3V0aWxzL2RlYm91bmNlLmpzXCI7XG5pbXBvcnQgdmFsaWRhdGVNb2RpZmllcnMgZnJvbSBcIi4vdXRpbHMvdmFsaWRhdGVNb2RpZmllcnMuanNcIjtcbmltcG9ydCB1bmlxdWVCeSBmcm9tIFwiLi91dGlscy91bmlxdWVCeS5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4vdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IG1lcmdlQnlOYW1lIGZyb20gXCIuL3V0aWxzL21lcmdlQnlOYW1lLmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgeyBhdXRvIH0gZnJvbSBcIi4vZW51bXMuanNcIjtcbnZhciBJTlZBTElEX0VMRU1FTlRfRVJST1IgPSAnUG9wcGVyOiBJbnZhbGlkIHJlZmVyZW5jZSBvciBwb3BwZXIgYXJndW1lbnQgcHJvdmlkZWQuIFRoZXkgbXVzdCBiZSBlaXRoZXIgYSBET00gZWxlbWVudCBvciB2aXJ0dWFsIGVsZW1lbnQuJztcbnZhciBJTkZJTklURV9MT09QX0VSUk9SID0gJ1BvcHBlcjogQW4gaW5maW5pdGUgbG9vcCBpbiB0aGUgbW9kaWZpZXJzIGN5Y2xlIGhhcyBiZWVuIGRldGVjdGVkISBUaGUgY3ljbGUgaGFzIGJlZW4gaW50ZXJydXB0ZWQgdG8gcHJldmVudCBhIGJyb3dzZXIgY3Jhc2guJztcbnZhciBERUZBVUxUX09QVElPTlMgPSB7XG4gIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gIG1vZGlmaWVyczogW10sXG4gIHN0cmF0ZWd5OiAnYWJzb2x1dGUnXG59O1xuXG5mdW5jdGlvbiBhcmVWYWxpZEVsZW1lbnRzKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuICFhcmdzLnNvbWUoZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gIShlbGVtZW50ICYmIHR5cGVvZiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9PT0gJ2Z1bmN0aW9uJyk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9wcGVyR2VuZXJhdG9yKGdlbmVyYXRvck9wdGlvbnMpIHtcbiAgaWYgKGdlbmVyYXRvck9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgIGdlbmVyYXRvck9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIHZhciBfZ2VuZXJhdG9yT3B0aW9ucyA9IGdlbmVyYXRvck9wdGlvbnMsXG4gICAgICBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYgPSBfZ2VuZXJhdG9yT3B0aW9ucy5kZWZhdWx0TW9kaWZpZXJzLFxuICAgICAgZGVmYXVsdE1vZGlmaWVycyA9IF9nZW5lcmF0b3JPcHRpb25zJGRlZiA9PT0gdm9pZCAwID8gW10gOiBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYsXG4gICAgICBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyID0gX2dlbmVyYXRvck9wdGlvbnMuZGVmYXVsdE9wdGlvbnMsXG4gICAgICBkZWZhdWx0T3B0aW9ucyA9IF9nZW5lcmF0b3JPcHRpb25zJGRlZjIgPT09IHZvaWQgMCA/IERFRkFVTFRfT1BUSU9OUyA6IF9nZW5lcmF0b3JPcHRpb25zJGRlZjI7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGVQb3BwZXIocmVmZXJlbmNlLCBwb3BwZXIsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRpb25zID0gZGVmYXVsdE9wdGlvbnM7XG4gICAgfVxuXG4gICAgdmFyIHN0YXRlID0ge1xuICAgICAgcGxhY2VtZW50OiAnYm90dG9tJyxcbiAgICAgIG9yZGVyZWRNb2RpZmllcnM6IFtdLFxuICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9PUFRJT05TLCBkZWZhdWx0T3B0aW9ucyksXG4gICAgICBtb2RpZmllcnNEYXRhOiB7fSxcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIHJlZmVyZW5jZTogcmVmZXJlbmNlLFxuICAgICAgICBwb3BwZXI6IHBvcHBlclxuICAgICAgfSxcbiAgICAgIGF0dHJpYnV0ZXM6IHt9LFxuICAgICAgc3R5bGVzOiB7fVxuICAgIH07XG4gICAgdmFyIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICB2YXIgaXNEZXN0cm95ZWQgPSBmYWxzZTtcbiAgICB2YXIgaW5zdGFuY2UgPSB7XG4gICAgICBzdGF0ZTogc3RhdGUsXG4gICAgICBzZXRPcHRpb25zOiBmdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBzdGF0ZS5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIHN0YXRlLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogaXNFbGVtZW50KHJlZmVyZW5jZSkgPyBsaXN0U2Nyb2xsUGFyZW50cyhyZWZlcmVuY2UpIDogcmVmZXJlbmNlLmNvbnRleHRFbGVtZW50ID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlLmNvbnRleHRFbGVtZW50KSA6IFtdLFxuICAgICAgICAgIHBvcHBlcjogbGlzdFNjcm9sbFBhcmVudHMocG9wcGVyKVxuICAgICAgICB9OyAvLyBPcmRlcnMgdGhlIG1vZGlmaWVycyBiYXNlZCBvbiB0aGVpciBkZXBlbmRlbmNpZXMgYW5kIGBwaGFzZWBcbiAgICAgICAgLy8gcHJvcGVydGllc1xuXG4gICAgICAgIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXJNb2RpZmllcnMobWVyZ2VCeU5hbWUoW10uY29uY2F0KGRlZmF1bHRNb2RpZmllcnMsIHN0YXRlLm9wdGlvbnMubW9kaWZpZXJzKSkpOyAvLyBTdHJpcCBvdXQgZGlzYWJsZWQgbW9kaWZpZXJzXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgcmV0dXJuIG0uZW5hYmxlZDtcbiAgICAgICAgfSk7IC8vIFZhbGlkYXRlIHRoZSBwcm92aWRlZCBtb2RpZmllcnMgc28gdGhhdCB0aGUgY29uc3VtZXIgd2lsbCBnZXQgd2FybmVkXG4gICAgICAgIC8vIGlmIG9uZSBvZiB0aGUgbW9kaWZpZXJzIGlzIGludmFsaWQgZm9yIGFueSByZWFzb25cblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgdmFyIG1vZGlmaWVycyA9IHVuaXF1ZUJ5KFtdLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLCBzdGF0ZS5vcHRpb25zLm1vZGlmaWVycyksIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IF9yZWYubmFtZTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbGlkYXRlTW9kaWZpZXJzKG1vZGlmaWVycyk7XG5cbiAgICAgICAgICBpZiAoZ2V0QmFzZVBsYWNlbWVudChzdGF0ZS5vcHRpb25zLnBsYWNlbWVudCkgPT09IGF1dG8pIHtcbiAgICAgICAgICAgIHZhciBmbGlwTW9kaWZpZXIgPSBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZpbmQoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgICAgICAgICAgIHZhciBuYW1lID0gX3JlZjIubmFtZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5hbWUgPT09ICdmbGlwJztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWZsaXBNb2RpZmllcikge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFsnUG9wcGVyOiBcImF1dG9cIiBwbGFjZW1lbnRzIHJlcXVpcmUgdGhlIFwiZmxpcFwiIG1vZGlmaWVyIGJlJywgJ3ByZXNlbnQgYW5kIGVuYWJsZWQgdG8gd29yay4nXS5qb2luKCcgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBfZ2V0Q29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUocG9wcGVyKSxcbiAgICAgICAgICAgICAgbWFyZ2luVG9wID0gX2dldENvbXB1dGVkU3R5bGUubWFyZ2luVG9wLFxuICAgICAgICAgICAgICBtYXJnaW5SaWdodCA9IF9nZXRDb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LFxuICAgICAgICAgICAgICBtYXJnaW5Cb3R0b20gPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5Cb3R0b20sXG4gICAgICAgICAgICAgIG1hcmdpbkxlZnQgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5tYXJnaW5MZWZ0OyAvLyBXZSBubyBsb25nZXIgdGFrZSBpbnRvIGFjY291bnQgYG1hcmdpbnNgIG9uIHRoZSBwb3BwZXIsIGFuZCBpdCBjYW5cbiAgICAgICAgICAvLyBjYXVzZSBidWdzIHdpdGggcG9zaXRpb25pbmcsIHNvIHdlJ2xsIHdhcm4gdGhlIGNvbnN1bWVyXG5cblxuICAgICAgICAgIGlmIChbbWFyZ2luVG9wLCBtYXJnaW5SaWdodCwgbWFyZ2luQm90dG9tLCBtYXJnaW5MZWZ0XS5zb21lKGZ1bmN0aW9uIChtYXJnaW4pIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG1hcmdpbik7XG4gICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihbJ1BvcHBlcjogQ1NTIFwibWFyZ2luXCIgc3R5bGVzIGNhbm5vdCBiZSB1c2VkIHRvIGFwcGx5IHBhZGRpbmcnLCAnYmV0d2VlbiB0aGUgcG9wcGVyIGFuZCBpdHMgcmVmZXJlbmNlIGVsZW1lbnQgb3IgYm91bmRhcnkuJywgJ1RvIHJlcGxpY2F0ZSBtYXJnaW4sIHVzZSB0aGUgYG9mZnNldGAgbW9kaWZpZXIsIGFzIHdlbGwgYXMnLCAndGhlIGBwYWRkaW5nYCBvcHRpb24gaW4gdGhlIGBwcmV2ZW50T3ZlcmZsb3dgIGFuZCBgZmxpcGAnLCAnbW9kaWZpZXJzLiddLmpvaW4oJyAnKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcnVuTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICAvLyBTeW5jIHVwZGF0ZSBcdTIwMTMgaXQgd2lsbCBhbHdheXMgYmUgZXhlY3V0ZWQsIGV2ZW4gaWYgbm90IG5lY2Vzc2FyeS4gVGhpc1xuICAgICAgLy8gaXMgdXNlZnVsIGZvciBsb3cgZnJlcXVlbmN5IHVwZGF0ZXMgd2hlcmUgc3luYyBiZWhhdmlvciBzaW1wbGlmaWVzIHRoZVxuICAgICAgLy8gbG9naWMuXG4gICAgICAvLyBGb3IgaGlnaCBmcmVxdWVuY3kgdXBkYXRlcyAoZS5nLiBgcmVzaXplYCBhbmQgYHNjcm9sbGAgZXZlbnRzKSwgYWx3YXlzXG4gICAgICAvLyBwcmVmZXIgdGhlIGFzeW5jIFBvcHBlciN1cGRhdGUgbWV0aG9kXG4gICAgICBmb3JjZVVwZGF0ZTogZnVuY3Rpb24gZm9yY2VVcGRhdGUoKSB7XG4gICAgICAgIGlmIChpc0Rlc3Ryb3llZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfc3RhdGUkZWxlbWVudHMgPSBzdGF0ZS5lbGVtZW50cyxcbiAgICAgICAgICAgIHJlZmVyZW5jZSA9IF9zdGF0ZSRlbGVtZW50cy5yZWZlcmVuY2UsXG4gICAgICAgICAgICBwb3BwZXIgPSBfc3RhdGUkZWxlbWVudHMucG9wcGVyOyAvLyBEb24ndCBwcm9jZWVkIGlmIGByZWZlcmVuY2VgIG9yIGBwb3BwZXJgIGFyZSBub3QgdmFsaWQgZWxlbWVudHNcbiAgICAgICAgLy8gYW55bW9yZVxuXG4gICAgICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKElOVkFMSURfRUxFTUVOVF9FUlJPUik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFN0b3JlIHRoZSByZWZlcmVuY2UgYW5kIHBvcHBlciByZWN0cyB0byBiZSByZWFkIGJ5IG1vZGlmaWVyc1xuXG5cbiAgICAgICAgc3RhdGUucmVjdHMgPSB7XG4gICAgICAgICAgcmVmZXJlbmNlOiBnZXRDb21wb3NpdGVSZWN0KHJlZmVyZW5jZSwgZ2V0T2Zmc2V0UGFyZW50KHBvcHBlciksIHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCcpLFxuICAgICAgICAgIHBvcHBlcjogZ2V0TGF5b3V0UmVjdChwb3BwZXIpXG4gICAgICAgIH07IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlc2V0IHRoZSBjdXJyZW50IHVwZGF0ZSBjeWNsZS4gVGhlXG4gICAgICAgIC8vIG1vc3QgY29tbW9uIHVzZSBjYXNlIGZvciB0aGlzIGlzIHRoZSBgZmxpcGAgbW9kaWZpZXIgY2hhbmdpbmcgdGhlXG4gICAgICAgIC8vIHBsYWNlbWVudCwgd2hpY2ggdGhlbiBuZWVkcyB0byByZS1ydW4gYWxsIHRoZSBtb2RpZmllcnMsIGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIGxvZ2ljIHdhcyBwcmV2aW91c2x5IHJhbiBmb3IgdGhlIHByZXZpb3VzIHBsYWNlbWVudCBhbmQgaXMgdGhlcmVmb3JlXG4gICAgICAgIC8vIHN0YWxlL2luY29ycmVjdFxuXG4gICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLnBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50OyAvLyBPbiBlYWNoIHVwZGF0ZSBjeWNsZSwgdGhlIGBtb2RpZmllcnNEYXRhYCBwcm9wZXJ0eSBmb3IgZWFjaCBtb2RpZmllclxuICAgICAgICAvLyBpcyBmaWxsZWQgd2l0aCB0aGUgaW5pdGlhbCBkYXRhIHNwZWNpZmllZCBieSB0aGUgbW9kaWZpZXIuIFRoaXMgbWVhbnNcbiAgICAgICAgLy8gaXQgZG9lc24ndCBwZXJzaXN0IGFuZCBpcyBmcmVzaCBvbiBlYWNoIHVwZGF0ZS5cbiAgICAgICAgLy8gVG8gZW5zdXJlIHBlcnNpc3RlbnQgZGF0YSwgdXNlIGAke25hbWV9I3BlcnNpc3RlbnRgXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5tb2RpZmllcnNEYXRhW21vZGlmaWVyLm5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kaWZpZXIuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgX19kZWJ1Z19sb29wc19fID0gMDtcblxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBfX2RlYnVnX2xvb3BzX18gKz0gMTtcblxuICAgICAgICAgICAgaWYgKF9fZGVidWdfbG9vcHNfXyA+IDEwMCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKElORklOSVRFX0xPT1BfRVJST1IpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RhdGUucmVzZXQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICBpbmRleCA9IC0xO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIF9zdGF0ZSRvcmRlcmVkTW9kaWZpZSA9IHN0YXRlLm9yZGVyZWRNb2RpZmllcnNbaW5kZXhdLFxuICAgICAgICAgICAgICBmbiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5mbixcbiAgICAgICAgICAgICAgX3N0YXRlJG9yZGVyZWRNb2RpZmllMiA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5vcHRpb25zLFxuICAgICAgICAgICAgICBfb3B0aW9ucyA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZTIgPT09IHZvaWQgMCA/IHt9IDogX3N0YXRlJG9yZGVyZWRNb2RpZmllMixcbiAgICAgICAgICAgICAgbmFtZSA9IF9zdGF0ZSRvcmRlcmVkTW9kaWZpZS5uYW1lO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgc3RhdGUgPSBmbih7XG4gICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZSxcbiAgICAgICAgICAgICAgb3B0aW9uczogX29wdGlvbnMsXG4gICAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxuICAgICAgICAgICAgfSkgfHwgc3RhdGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gQXN5bmMgYW5kIG9wdGltaXN0aWNhbGx5IG9wdGltaXplZCB1cGRhdGUgXHUyMDEzIGl0IHdpbGwgbm90IGJlIGV4ZWN1dGVkIGlmXG4gICAgICAvLyBub3QgbmVjZXNzYXJ5IChkZWJvdW5jZWQgdG8gcnVuIGF0IG1vc3Qgb25jZS1wZXItdGljaylcbiAgICAgIHVwZGF0ZTogZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICBpbnN0YW5jZS5mb3JjZVVwZGF0ZSgpO1xuICAgICAgICAgIHJlc29sdmUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBpc0Rlc3Ryb3llZCA9IHRydWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghYXJlVmFsaWRFbGVtZW50cyhyZWZlcmVuY2UsIHBvcHBlcikpIHtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihJTlZBTElEX0VMRU1FTlRfRVJST1IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgaW5zdGFuY2Uuc2V0T3B0aW9ucyhvcHRpb25zKS50aGVuKGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgaWYgKCFpc0Rlc3Ryb3llZCAmJiBvcHRpb25zLm9uRmlyc3RVcGRhdGUpIHtcbiAgICAgICAgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKHN0YXRlKTtcbiAgICAgIH1cbiAgICB9KTsgLy8gTW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSBiZWZvcmUgdGhlIGZpcnN0XG4gICAgLy8gdXBkYXRlIGN5Y2xlIHJ1bnMuIFRoZXkgd2lsbCBiZSBleGVjdXRlZCBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGUgdXBkYXRlXG4gICAgLy8gY3ljbGUuIFRoaXMgaXMgdXNlZnVsIHdoZW4gYSBtb2RpZmllciBhZGRzIHNvbWUgcGVyc2lzdGVudCBkYXRhIHRoYXRcbiAgICAvLyBvdGhlciBtb2RpZmllcnMgbmVlZCB0byB1c2UsIGJ1dCB0aGUgbW9kaWZpZXIgaXMgcnVuIGFmdGVyIHRoZSBkZXBlbmRlbnRcbiAgICAvLyBvbmUuXG5cbiAgICBmdW5jdGlvbiBydW5Nb2RpZmllckVmZmVjdHMoKSB7XG4gICAgICBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICAgIHZhciBuYW1lID0gX3JlZjMubmFtZSxcbiAgICAgICAgICAgIF9yZWYzJG9wdGlvbnMgPSBfcmVmMy5vcHRpb25zLFxuICAgICAgICAgICAgb3B0aW9ucyA9IF9yZWYzJG9wdGlvbnMgPT09IHZvaWQgMCA/IHt9IDogX3JlZjMkb3B0aW9ucyxcbiAgICAgICAgICAgIGVmZmVjdCA9IF9yZWYzLmVmZmVjdDtcblxuICAgICAgICBpZiAodHlwZW9mIGVmZmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBjbGVhbnVwRm4gPSBlZmZlY3Qoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBub29wRm4gPSBmdW5jdGlvbiBub29wRm4oKSB7fTtcblxuICAgICAgICAgIGVmZmVjdENsZWFudXBGbnMucHVzaChjbGVhbnVwRm4gfHwgbm9vcEZuKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpIHtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9KTtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG59XG5leHBvcnQgdmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3IoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBkZXRlY3RPdmVyZmxvdyB9OyIsICJpbXBvcnQgeyBwb3BwZXJHZW5lcmF0b3IsIGRldGVjdE92ZXJmbG93IH0gZnJvbSBcIi4vY3JlYXRlUG9wcGVyLmpzXCI7XG5pbXBvcnQgZXZlbnRMaXN0ZW5lcnMgZnJvbSBcIi4vbW9kaWZpZXJzL2V2ZW50TGlzdGVuZXJzLmpzXCI7XG5pbXBvcnQgcG9wcGVyT2Zmc2V0cyBmcm9tIFwiLi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qc1wiO1xuaW1wb3J0IGNvbXB1dGVTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2NvbXB1dGVTdHlsZXMuanNcIjtcbmltcG9ydCBhcHBseVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvYXBwbHlTdHlsZXMuanNcIjtcbmltcG9ydCBvZmZzZXQgZnJvbSBcIi4vbW9kaWZpZXJzL29mZnNldC5qc1wiO1xuaW1wb3J0IGZsaXAgZnJvbSBcIi4vbW9kaWZpZXJzL2ZsaXAuanNcIjtcbmltcG9ydCBwcmV2ZW50T3ZlcmZsb3cgZnJvbSBcIi4vbW9kaWZpZXJzL3ByZXZlbnRPdmVyZmxvdy5qc1wiO1xuaW1wb3J0IGFycm93IGZyb20gXCIuL21vZGlmaWVycy9hcnJvdy5qc1wiO1xuaW1wb3J0IGhpZGUgZnJvbSBcIi4vbW9kaWZpZXJzL2hpZGUuanNcIjtcbnZhciBkZWZhdWx0TW9kaWZpZXJzID0gW2V2ZW50TGlzdGVuZXJzLCBwb3BwZXJPZmZzZXRzLCBjb21wdXRlU3R5bGVzLCBhcHBseVN0eWxlcywgb2Zmc2V0LCBmbGlwLCBwcmV2ZW50T3ZlcmZsb3csIGFycm93LCBoaWRlXTtcbnZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKHtcbiAgZGVmYXVsdE1vZGlmaWVyczogZGVmYXVsdE1vZGlmaWVyc1xufSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyLCBwb3BwZXJHZW5lcmF0b3IsIGRlZmF1bHRNb2RpZmllcnMsIGRldGVjdE92ZXJmbG93IH07IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyIGFzIGNyZWF0ZVBvcHBlckxpdGUgfSBmcm9tIFwiLi9wb3BwZXItbGl0ZS5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCAqIGZyb20gXCIuL21vZGlmaWVycy9pbmRleC5qc1wiOyIsICJpbXBvcnQgeyBBcHAsIFNldHRpbmcsIFRGaWxlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgSG9tZXBhZ2UgZnJvbSBcIi4vbWFpblwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmltRmlsZShmaWxlOiBURmlsZSk6IHN0cmluZyB7XG5cdHJldHVybiBmaWxlLnBhdGguc2xpY2UoMCwgLTMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JhcEFyb3VuZCh2YWx1ZTogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIge1xuXHRyZXR1cm4gKCh2YWx1ZSAlIHNpemUpICsgc2l6ZSkgJSBzaXplO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdvcmtzcGFjZVBsdWdpbihhcHA6IEFwcCk6IGFueSB7IFxuXHRyZXR1cm4gKGFwcCBhcyBhbnkpLmludGVybmFsUGx1Z2lucy5wbHVnaW5zLndvcmtzcGFjZXM7IFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVTZXR0aW5nKHNldHRpbmc6IFNldHRpbmcpOiB2b2lkIHtcblx0c2V0dGluZy5zZXR0aW5nRWwuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJvcGFjaXR5OiAuNTsgcG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudFwiKVx0XHRcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZ3JhZGVTZXR0aW5ncyhwbHVnaW46IEhvbWVwYWdlKTogUHJvbWlzZTx2b2lkPiB7XG5cdHBsdWdpbi5zZXR0aW5ncy53b3Jrc3BhY2UgPSBwbHVnaW4uc2V0dGluZ3MuZGVmYXVsdE5vdGU7XG5cdFxuXHRpZiAoKHBsdWdpbi5zZXR0aW5ncyBhcyBhbnkpLmFsd2F5c1ByZXZpZXcpIHtcblx0XHRwbHVnaW4uc2V0dGluZ3Mub3Blbk1vZGUgPSBWaWV3LlJlYWRpbmc7XG5cdH1cblx0XG5cdHBsdWdpbi5zZXR0aW5ncy52ZXJzaW9uID0gMjtcblx0YXdhaXQgcGx1Z2luLnNhdmVTZXR0aW5ncygpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzRGF0YXZpZXcoYXBwOiBBcHApOiBib29sZWFuIHtcblx0cmV0dXJuIChhcHAgYXMgYW55KS5wbHVnaW5zLnBsdWdpbnMuZGF0YXZpZXcgIT0gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvdWNoRGF0YXZpZXcoYXBwOiBBcHApOiB2b2lkIHtcblx0KGFwcCBhcyBhbnkpLnBsdWdpbnMucGx1Z2lucy5kYXRhdmlldz8uaW5kZXgudG91Y2goKTtcbn0iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBdUY7OztBQ0F2Rix1QkFBb0Y7OztBQ0FwRixzQkFBMEM7OztBQ0FuQyxJQUFJLE1BQU07QUFDVixJQUFJLFNBQVM7QUFDYixJQUFJLFFBQVE7QUFDWixJQUFJLE9BQU87QUFDWCxJQUFJLE9BQU87QUFDWCxJQUFJLGlCQUFpQixDQUFDLEtBQUssUUFBUSxPQUFPO0FBQzFDLElBQUksUUFBUTtBQUNaLElBQUksTUFBTTtBQUNWLElBQUksa0JBQWtCO0FBQ3RCLElBQUksV0FBVztBQUNmLElBQUksU0FBUztBQUNiLElBQUksWUFBWTtBQUNoQixJQUFJLHNCQUFtQywrQkFBZSxPQUFPLFNBQVUsS0FBSyxXQUFXO0FBQzVGLFNBQU8sSUFBSSxPQUFPLENBQUMsWUFBWSxNQUFNLE9BQU8sWUFBWSxNQUFNO0FBQUEsR0FDN0Q7QUFDSSxJQUFJLGFBQTBCLG1CQUFHLE9BQU8sZ0JBQWdCLENBQUMsT0FBTyxPQUFPLFNBQVUsS0FBSyxXQUFXO0FBQ3RHLFNBQU8sSUFBSSxP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
