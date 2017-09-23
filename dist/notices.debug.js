(function (require, global) {
require = (function (cache, modules, cx) {
return function (r) {
if (!modules[r]) throw new Error(r + ' is not a module');
return cache[r] ? cache[r].exports : ((cache[r] = {
exports: {}
}, cache[r].exports = modules[r].call(cx, require, cache[r], cache[r].exports)));
};
})({}, {
0: function (require, module, exports) {
var Notice;

var style, styleOpenState;

style = {
  container: function() {
    return {
      position: 'absolute',
      zIndex: '10000',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      visibility: 'hidden'
    };
  },
  overlay: function() {
    return {
      position: 'fixed',
      zIndex: '1',
      left: '0',
      top: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      opacity: 0,
      transition: "opacity " + (Notice.animationSpeed / 1000) + "s"
    };
  },
  notice: function() {
    return {
      position: 'absolute',
      zIndex: '2',
      top: '50%',
      left: 0,
      right: 0,
      width: '90%',
      maxWidth: '350px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '3px',
      boxShadow: '0px 5px 11px rgba(0,0,0,0.4)',
      boxSizing: 'border-box',
      textAlign: 'center',
      opacity: 0,
      webkitTransformOrigin: '50% 35%',
      mozTransformOrigin: '50% 35%',
      msTransformOrigin: '50% 35%',
      oTransformOrigin: '50% 35%',
      transformOrigin: '50% 35%',
      webkitTransform: 'scale(0.85) translateY(-50%)',
      mozTransform: 'scale(0.85) translateY(-50%)',
      msTransform: 'scale(0.85) translateY(-50%)',
      oTransform: 'scale(0.85) translateY(-50%)',
      transform: 'scale(0.85) translateY(-50%)',
      transition: "transform " + (Notice.animationSpeed / 1000) + "s, opacity " + (Notice.animationSpeed / 1000) + "s"
    };
  },
  title: function() {
    return {
      paddingTop: '22px',
      fontSize: '23px',
      fontWeight: '600',
      lineHeight: '1',
      color: Notice.colorText
    };
  },
  text: function() {
    return {
      maxWidth: '80%',
      margin: '0 auto',
      padding: '8px 0 22px',
      fontSize: '14.5px',
      fontWeight: '500',
      lineHeight: '1.2',
      color: Notice.colorText
    };
  },
  actions: function() {
    return {
      position: 'relative',
      overflow: 'hidden',
      height: '45px',
      borderTop: "1px solid " + Notice.colorBorder,
      borderRadius: '0 0 3px 3px',
      fontSize: '14.5px',
      fontWeight: '500',
      lineHeight: '1.2'
    };
  },
  actionButton: function(actionsCount) {
    return {
      position: 'relative',
      float: 'left',
      width: (100 / actionsCount) + "%",
      height: '100%',
      backgroundColor: actionsCount === 1 ? Notice.colorButtonBG : '',
      borderRight: "1px solid " + Notice.colorBorder,
      boxSizing: 'border-box',
      fontSize: '18px',
      fontWeight: '400',
      lineHeight: '1',
      letterSpacing: '0.45px',
      textTransform: 'uppercase',
      cursor: 'pointer',
      color: Notice.colorButton
    };
  },
  actionButtonHighlight: function() {
    return {
      fontWeight: '600'
    };
  },
  actionButtonText: function() {
    return {
      position: 'absolute',
      top: '50%',
      left: '0',
      right: '0',
      width: '100%',
      textAlign: 'center',
      webkitTransform: 'translateY(-50%)',
      mozTransform: 'translateY(-50%)',
      msTransform: 'translateY(-50%)',
      oTransform: 'translateY(-50%)',
      transform: 'translateY(-50%)'
    };
  },
  altAction: function() {
    return {
      position: 'absolute',
      bottom: '-30px',
      left: '0',
      right: '0',
      fontSize: '13px',
      color: Notice.colorAltAction,
      opacity: 0.7
    };
  }
};

styleOpenState = {
  container: function() {
    return {
      visibility: 'visible'
    };
  },
  overlay: function() {
    return {
      opacity: '1'
    };
  },
  notice: function() {
    return {
      opacity: '1',
      visibility: 'visible',
      webkitTransform: 'scale(1) translateY(-50%)',
      mozTransform: 'scale(1) translateY(-50%)',
      msTransform: 'scale(1) translateY(-50%)',
      oTransform: 'scale(1) translateY(-50%)',
      transform: 'scale(1) translateY(-50%)'
    };
  }
};

;

var markup;

markup = {
  container: function() {
    return "<div class='NoticeContainer'></div>";
  },
  overlay: function() {
    return "<div class='NoticeContainer-overlay'></div>";
  },
  notice: function() {
    return "<div class='Notice'></div>";
  },
  title: function(arg) {
    var title;
    title = arg.title;
    return "<div class='Notice-title'>" + title + "</div>";
  },
  text: function(arg) {
    var text;
    text = arg.text;
    return "<div class='Notice-text'>" + text + "</div>";
  },
  actions: function(arg) {
    var type;
    type = arg.type;
    return "<div class='Notice-actions Notice-actions--" + type + "'></div>";
  },
  altAction: function(arg) {
    var altAction;
    altAction = arg.altAction;
    return "<div class='Notice-altAction'>" + altAction + "</div>";
  },
  actionButton: function(arg) {
    var name;
    name = arg.name;
    return "<div class='Notice-actions-item button_" + name + "' data-name='" + name + "'></div>";
  },
  actionButtonLabel: function(arg) {
    var label;
    label = arg.label;
    return "<div class='Notice-actions-item-text'>" + label + "</div>";
  }
};

;

var applyStyles, getNoticeContainer, removeStyles;

applyStyles = function(el, styleObject, additional) {
  var key, value;
  if (additional) {
    styleObject = $.extend({}, styleObject, additional);
  }
  for (key in styleObject) {
    value = styleObject[key];
    (el[0] || el).style[key] = value;
  }
  return el;
};

removeStyles = function(el, styleObject, stylesToReinstate) {
  var key;
  for (key in styleObject) {
    (el[0] || el).style[key] = '';
  }
  if (stylesToReinstate) {
    applyStyles(el, stylesToReinstate);
  }
  return el;
};

getNoticeContainer = function(context) {
  var existingContainer$;
  existingContainer$ = $(".Notices", context);
  if (existingContainer$.length) {
    return existingContainer$;
  } else {
    return $(markup.container()).appendTo(context);
  }
};

;

Notice = function(arg) {
  var label, name, p, ref, ref1, ref2, ref3, ref4;
  this.type = (ref = arg.type) != null ? ref : 'ok', this.title = (ref1 = arg.title) != null ? ref1 : '', this.text = (ref2 = arg.text) != null ? ref2 : '', this.actions = arg.actions, this.altAction = (ref3 = arg.altAction) != null ? ref3 : '', this.highlight = arg.highlight, this.keepAlive = arg.keepAlive;
  this.isActive = false;
  this.els = {};
  this.els.actionButtons = {};
  this.els.container = $(markup.container());
  this.els.overlay = $(markup.overlay()).appendTo(this.els.container);
  this.els.notice = $(markup.notice()).appendTo(this.els.container).data('Notice', this);
  this.els.title = $(markup.title({
    title: this.title
  })).appendTo(this.els.notice);
  this.els.text = $(markup.text({
    text: this.text
  })).appendTo(this.els.notice);
  this.els.actions = $(markup.actions({
    type: this.type
  })).appendTo(this.els.notice);
  this.els.altAction = $(markup.altAction({
    altAction: this.altAction
  })).appendTo(this.els.notice);
  switch (this.type) {
    case 'ok':
      this.actions = {
        ok: 'OK'
      };
      this.highlight = 'ok';
      break;
    case 'yesno':
      this.actions = {
        no: 'No',
        yes: 'Yes'
      };
      this.highlight = 'yes';
      break;
    default:
      this.type = 'custom';
  }
  ref4 = this.actions;
  for (name in ref4) {
    label = ref4[name];
    this.els.actionButtons[name] = $(markup.actionButton({
      name: name
    })).appendTo(this.els.actions);
    this.els.actionButtons[name].append($(markup.actionButtonLabel({
      label: label
    })));
  }
  this.actionsCount = ((function() {
    var results;
    results = [];
    for (p in this.actions) {
      results.push(p);
    }
    return results;
  }).call(this)).length;
  this.appendToDOM();
  return this;
};

Notice.prototype.appendToDOM = function() {
  var actionEl, name, ref;
  applyStyles(this.els.container, Notice.style.container());
  applyStyles(this.els.overlay, Notice.style.overlay());
  applyStyles(this.els.notice, Notice.style.notice());
  applyStyles(this.els.title, Notice.style.title());
  applyStyles(this.els.text, Notice.style.text());
  applyStyles(this.els.actions, Notice.style.actions());
  applyStyles(this.els.altAction, Notice.style.altAction());
  applyStyles(this.els.altAction, this.altAction ? Notice.style.altAction() : {
    display: 'none'
  });
  ref = this.els.actionButtons;
  for (name in ref) {
    actionEl = ref[name];
    applyStyles(actionEl, Notice.style.actionButton(this.actionsCount));
    if (name === this.highlight) {
      applyStyles(actionEl, Notice.style.actionButtonHighlight());
    }
    applyStyles(actionEl.children(), Notice.style.actionButtonText());
  }
  removeStyles(this.els.actionButtons[Object.keys(this.els.actionButtons).slice(-1)[0]], {
    borderRight: ''
  });
  return this.els.container.appendTo(Notice.context);
};

Notice.prototype.prompt = function() {
  return this.promise = new Promise((function(_this) {
    return function(resolve) {
      var actionEl, fn, name, ref;
      _this.reveal();
      ref = _this.els.actionButtons;
      fn = function(name, actionEl) {
        return actionEl.on(Notice.clickEvent, function() {
          return _this.dismiss(name).then(resolve);
        });
      };
      for (name in ref) {
        actionEl = ref[name];
        fn(name, actionEl);
      }
      return _this.els.altAction.on(Notice.clickEvent, function() {
        return _this.dismiss('altAction').then(resolve);
      });
    };
  })(this));
};

Notice.prototype.dismiss = function(targetAction) {
  return new Promise((function(_this) {
    return function(resolve) {
      Notice.queue.splice(Notice.queue.indexOf(_this), 1);
      removeStyles(_this.els.container, Notice.styleOpenState.container());
      removeStyles(_this.els.overlay, Notice.styleOpenState.overlay(), Notice.style.overlay());
      removeStyles(_this.els.notice, Notice.styleOpenState.notice(), Notice.style.notice());
      return setTimeout(function() {
        _this.destroy();
        return resolve(targetAction);
      }, Notice.animationSpeed + 25);
    };
  })(this));
};

Notice.prototype.reveal = function() {
  var index, noticeInFront;
  Notice.queue.push(this);
  index = Notice.queue.indexOf(this);
  if (Notice.queue.slice(0, index).length) {
    noticeInFront = Notice.queue.slice(-2)[0].promise;
  } else {
    noticeInFront = Promise.resolve();
  }
  return noticeInFront.then((function(_this) {
    return function() {
      return setTimeout(function() {
        applyStyles(_this.els.container, Notice.styleOpenState.container());
        applyStyles(_this.els.overlay, Notice.styleOpenState.overlay());
        return applyStyles(_this.els.notice, Notice.styleOpenState.notice());
      }, 50);
    };
  })(this));
};

Notice.prototype.destroy = function() {
  if (!this.keepAlive) {
    this.els.container.remove();
  }
  return this.isActive = false;
};

Notice.queue = [];

Notice.clickEvent = 'click';

Notice.markup = markup;

Notice.style = style;

Notice.styleOpenState = styleOpenState;

Notice.animationSpeed = 300;

Notice.colorBorder = '#c7c7c7';

Notice.colorButton = '#f1c618';

Notice.colorButtonBG = '#e8ebed';

Notice.colorAltAction = '#ffffff';

Notice.colorText = '#181818';

Notice.context = document.body;


/* istanbul ignore next */

module.exports = Notice;

module.exports.version = "3.0.2";

module.exports.config = function(settings) {
  var extend;
  extend = require(5);
  extend.deep(Notice, settings);
  return Notice;
};

;
return module.exports;
},
5: function (require, module, exports) {
var exports, extend, modifiers, newBuilder, normalizeKeys;

extend = require(6);

normalizeKeys = function(keys) {
  var i, key, len, output;
  if (keys) {
    output = {};
    if (typeof keys !== 'object') {
      output[keys] = true;
    } else {
      if (!Array.isArray(keys)) {
        keys = Object.keys(keys);
      }
      for (i = 0, len = keys.length; i < len; i++) {
        key = keys[i];
        output[key] = true;
      }
    }
    return output;
  }
};

newBuilder = function(isBase) {
  var builder;
  builder = function(target) {
    var theTarget;
    var $_len = arguments.length, $_i = -1, sources = new Array($_len); while (++$_i < $_len) sources[$_i] = arguments[$_i];
    if (builder.options.target) {
      theTarget = builder.options.target;
    } else {
      theTarget = target;
      sources.shift();
    }
    return extend(builder.options, theTarget, sources);
  };
  if (isBase) {
    builder.isBase = true;
  }
  builder.options = {};
  Object.defineProperties(builder, modifiers);
  return builder;
};

modifiers = {
  'deep': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.deep = true;
      return _;
    }
  },
  'own': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.own = true;
      return _;
    }
  },
  'allowNull': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.allowNull = true;
      return _;
    }
  },
  'nullDeletes': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.nullDeletes = true;
      return _;
    }
  },
  'concat': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.concat = true;
      return _;
    }
  },
  'clone': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      _.options.target = {};
      return _;
    }
  },
  'notDeep': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.notDeep = normalizeKeys(keys);
        return _;
      };
    }
  },
  'deepOnly': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.deepOnly = normalizeKeys(keys);
        return _;
      };
    }
  },
  'keys': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.keys = normalizeKeys(keys);
        return _;
      };
    }
  },
  'notKeys': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(keys) {
        _.options.notKeys = normalizeKeys(keys);
        return _;
      };
    }
  },
  'transform': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(transform) {
        if (typeof transform === 'function') {
          _.options.globalTransform = transform;
        } else if (transform && typeof transform === 'object') {
          _.options.transforms = transform;
        }
        return _;
      };
    }
  },
  'filter': {
    get: function() {
      var _;
      _ = this.isBase ? newBuilder() : this;
      return function(filter) {
        if (typeof filter === 'function') {
          _.options.globalFilter = filter;
        } else if (filter && typeof filter === 'object') {
          _.options.filters = filter;
        }
        return _;
      };
    }
  }
};

module.exports = exports = newBuilder(true);

exports.version = "1.7.3";

;
return module.exports;
},
6: function (require, module, exports) {
var extend, isArray, isObject, shouldDeepExtend;

isArray = function(target) {
  return Array.isArray(target);
};

isObject = function(target) {
  return target && Object.prototype.toString.call(target) === '[object Object]' || isArray(target);
};

shouldDeepExtend = function(options, target, parentKey) {
  if (options.deep) {
    if (options.notDeep) {
      return !options.notDeep[target];
    } else {
      return true;
    }
  } else if (options.deepOnly) {
    return options.deepOnly[target] || parentKey && shouldDeepExtend(options, parentKey);
  }
};

module.exports = extend = function(options, target, sources, parentKey) {
  var i, key, len, source, sourceValue, subTarget, targetValue;
  if (!target || typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }
  for (i = 0, len = sources.length; i < len; i++) {
    source = sources[i];
    if (source != null) {
      for (key in source) {
        sourceValue = source[key];
        targetValue = target[key];
        if (sourceValue === target || sourceValue === void 0 || (sourceValue === null && !options.allowNull && !options.nullDeletes) || (options.keys && !options.keys[key]) || (options.notKeys && options.notKeys[key]) || (options.own && !source.hasOwnProperty(key)) || (options.globalFilter && !options.globalFilter(sourceValue, key, source)) || (options.filters && options.filters[key] && !options.filters[key](sourceValue, key, source))) {
          continue;
        }
        if (sourceValue === null && options.nullDeletes) {
          delete target[key];
          continue;
        }
        if (options.globalTransform) {
          sourceValue = options.globalTransform(sourceValue, key, source);
        }
        if (options.transforms && options.transforms[key]) {
          sourceValue = options.transforms[key](sourceValue, key, source);
        }
        switch (false) {
          case !(options.concat && isArray(sourceValue) && isArray(targetValue)):
            target[key] = targetValue.concat(sourceValue);
            break;
          case !(shouldDeepExtend(options, key, parentKey) && isObject(sourceValue)):
            subTarget = isObject(targetValue) ? targetValue : isArray(sourceValue) ? [] : {};
            target[key] = extend(options, subTarget, [sourceValue], key);
            break;
          default:
            target[key] = sourceValue;
        }
      }
    }
  }
  return target;
};

;
return module.exports;
}
}, this);
if (typeof define === 'function' && define.umd) {
define(function () {
return require(0);
});
} else if (typeof module === 'object' && module.exports) {
module.exports = require(0);
} else {
return this['notify'] = require(0);
}
}).call(this, null, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : this);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl9wYXJ0cy9zdHlsZXMuY29mZmVlIiwiX3BhcnRzL21hcmt1cC5jb2ZmZWUiLCJpbmRleC5jb2ZmZWUiLCJfcGFydHMvaGVscGVycy5jb2ZmZWUiLCIuLi9wYWNrYWdlLmpzb24iLCIuLi9ub2RlX21vZHVsZXMvc21hcnQtZXh0ZW5kL3NyYy9pbmRleC5jb2ZmZWUiLCIuLi9ub2RlX21vZHVsZXMvc21hcnQtZXh0ZW5kL25vZGVfbW9kdWxlcy9zbWFydC1leHRlbmQvcGFja2FnZS5qc29uIiwiLi4vbm9kZV9tb2R1bGVzL3NtYXJ0LWV4dGVuZC9zcmMvZXh0ZW5kLmNvZmZlZSJdLCJuYW1lcyI6WyJpbmxpbmU6MSIsImlubGluZToyIiwiaW1wb3J0OjUiLCJpbmxpbmU6MyIsImlubGluZTo0IiwiaW1wb3J0OjEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRJQ0E7O0FDNUlEQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQ3FJdXlEQyxVQUFxQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUR0RzN6REQ7O0FFL0JERTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QkNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkM3QkRDLE9BZ0NFQTs7Ozs7Ozs7Ozs7Ozs7U0M3QktDLFVBQ01BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQ0piTCxPQXVHRUE7Ozs7O0FDdkdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInN0eWxlID0gXG5cdGNvbnRhaW5lcjogKCktPlxuXHRcdHBvc2l0aW9uOiAnYWJzb2x1dGUnXG5cdFx0ekluZGV4OiAnMTAwMDAnXG5cdFx0dG9wOiAnMCdcblx0XHRsZWZ0OiAnMCdcblx0XHR3aWR0aDogJzEwMHZ3J1xuXHRcdGhlaWdodDogJzEwMHZoJ1xuXHRcdHZpc2liaWxpdHk6ICdoaWRkZW4nXG5cblx0b3ZlcmxheTogKCktPlxuXHRcdHBvc2l0aW9uOiAnZml4ZWQnXG5cdFx0ekluZGV4OiAnMSdcblx0XHRsZWZ0OiAnMCdcblx0XHR0b3A6ICcwJ1xuXHRcdHdpZHRoOiAnMTAwdncnXG5cdFx0aGVpZ2h0OiAnMTAwdmgnXG5cdFx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgwLDAsMCwwLjUpJ1xuXHRcdG9wYWNpdHk6IDBcblx0XHR0cmFuc2l0aW9uOiBcIm9wYWNpdHkgI3tOb3RpY2UuYW5pbWF0aW9uU3BlZWQvMTAwMH1zXCJcblxuXHRub3RpY2U6ICgpLT5cblx0XHRwb3NpdGlvbjogJ2Fic29sdXRlJ1xuXHRcdHpJbmRleDogJzInXG5cdFx0dG9wOiAnNTAlJ1xuXHRcdGxlZnQ6IDBcblx0XHRyaWdodDogMFxuXHRcdHdpZHRoOiAnOTAlJ1xuXHRcdG1heFdpZHRoOiAnMzUwcHgnXG5cdFx0bWFyZ2luOiAnMCBhdXRvJ1xuXHRcdGJhY2tncm91bmRDb2xvcjogJ3doaXRlJ1xuXHRcdGJvcmRlclJhZGl1czogJzNweCdcblx0XHRib3hTaGFkb3c6ICcwcHggNXB4IDExcHggcmdiYSgwLDAsMCwwLjQpJ1xuXHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0dGV4dEFsaWduOiAnY2VudGVyJ1xuXHRcdG9wYWNpdHk6IDBcblx0XHR3ZWJraXRUcmFuc2Zvcm1PcmlnaW46ICc1MCUgMzUlJ1xuXHRcdG1velRyYW5zZm9ybU9yaWdpbjogJzUwJSAzNSUnXG5cdFx0bXNUcmFuc2Zvcm1PcmlnaW46ICc1MCUgMzUlJ1xuXHRcdG9UcmFuc2Zvcm1PcmlnaW46ICc1MCUgMzUlJ1xuXHRcdHRyYW5zZm9ybU9yaWdpbjogJzUwJSAzNSUnXG5cdFx0d2Via2l0VHJhbnNmb3JtOiAnc2NhbGUoMC44NSkgdHJhbnNsYXRlWSgtNTAlKSdcblx0XHRtb3pUcmFuc2Zvcm06ICdzY2FsZSgwLjg1KSB0cmFuc2xhdGVZKC01MCUpJ1xuXHRcdG1zVHJhbnNmb3JtOiAnc2NhbGUoMC44NSkgdHJhbnNsYXRlWSgtNTAlKSdcblx0XHRvVHJhbnNmb3JtOiAnc2NhbGUoMC44NSkgdHJhbnNsYXRlWSgtNTAlKSdcblx0XHR0cmFuc2Zvcm06ICdzY2FsZSgwLjg1KSB0cmFuc2xhdGVZKC01MCUpJ1xuXHRcdHRyYW5zaXRpb246IFwidHJhbnNmb3JtICN7Tm90aWNlLmFuaW1hdGlvblNwZWVkLzEwMDB9cywgb3BhY2l0eSAje05vdGljZS5hbmltYXRpb25TcGVlZC8xMDAwfXNcIlxuXG5cdHRpdGxlOiAoKS0+XG5cdFx0cGFkZGluZ1RvcDogJzIycHgnXG5cdFx0Zm9udFNpemU6ICcyM3B4J1xuXHRcdGZvbnRXZWlnaHQ6ICc2MDAnXG5cdFx0bGluZUhlaWdodDogJzEnXG5cdFx0Y29sb3I6IE5vdGljZS5jb2xvclRleHRcblxuXHR0ZXh0OiAoKS0+XG5cdFx0bWF4V2lkdGg6ICc4MCUnXG5cdFx0bWFyZ2luOiAnMCBhdXRvJ1xuXHRcdHBhZGRpbmc6ICc4cHggMCAyMnB4J1xuXHRcdGZvbnRTaXplOiAnMTQuNXB4J1xuXHRcdGZvbnRXZWlnaHQ6ICc1MDAnXG5cdFx0bGluZUhlaWdodDogJzEuMidcblx0XHRjb2xvcjogTm90aWNlLmNvbG9yVGV4dFxuXG5cdGFjdGlvbnM6ICgpLT5cblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdG92ZXJmbG93OiAnaGlkZGVuJ1xuXHRcdCMgZGlzcGxheTogJ3RhYmxlJ1xuXHRcdGhlaWdodDogJzQ1cHgnXG5cdFx0Ym9yZGVyVG9wOiBcIjFweCBzb2xpZCAje05vdGljZS5jb2xvckJvcmRlcn1cIlxuXHRcdGJvcmRlclJhZGl1czogJzAgMCAzcHggM3B4J1xuXHRcdGZvbnRTaXplOiAnMTQuNXB4J1xuXHRcdGZvbnRXZWlnaHQ6ICc1MDAnXG5cdFx0bGluZUhlaWdodDogJzEuMidcblxuXHRhY3Rpb25CdXR0b246IChhY3Rpb25zQ291bnQpLT5cblx0XHRwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuXHRcdGZsb2F0OiAnbGVmdCdcblx0XHR3aWR0aDogXCIjezEwMC9hY3Rpb25zQ291bnR9JVwiXG5cdFx0aGVpZ2h0OiAnMTAwJSdcblx0XHRiYWNrZ3JvdW5kQ29sb3I6IGlmIGFjdGlvbnNDb3VudCBpcyAxIHRoZW4gTm90aWNlLmNvbG9yQnV0dG9uQkcgZWxzZSAnJ1xuXHRcdGJvcmRlclJpZ2h0OiBcIjFweCBzb2xpZCAje05vdGljZS5jb2xvckJvcmRlcn1cIlxuXHRcdGJveFNpemluZzogJ2JvcmRlci1ib3gnXG5cdFx0Zm9udFNpemU6ICcxOHB4J1xuXHRcdGZvbnRXZWlnaHQ6ICc0MDAnXG5cdFx0bGluZUhlaWdodDogJzEnXG5cdFx0bGV0dGVyU3BhY2luZzogJzAuNDVweCdcblx0XHR0ZXh0VHJhbnNmb3JtOiAndXBwZXJjYXNlJ1xuXHRcdGN1cnNvcjogJ3BvaW50ZXInXG5cdFx0Y29sb3I6IE5vdGljZS5jb2xvckJ1dHRvblxuXG5cdGFjdGlvbkJ1dHRvbkhpZ2hsaWdodDogKCktPlxuXHRcdGZvbnRXZWlnaHQ6ICc2MDAnXG5cdFxuXHRhY3Rpb25CdXR0b25UZXh0OiAoKS0+XG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHR0b3A6ICc1MCUnXG5cdFx0bGVmdDogJzAnXG5cdFx0cmlnaHQ6ICcwJ1xuXHRcdHdpZHRoOiAnMTAwJSdcblx0XHR0ZXh0QWxpZ246ICdjZW50ZXInXG5cdFx0d2Via2l0VHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKSdcblx0XHRtb3pUcmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJ1xuXHRcdG1zVHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKSdcblx0XHRvVHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTAlKSdcblx0XHR0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MCUpJ1xuXHRcblx0YWx0QWN0aW9uOiAoKS0+XG5cdFx0cG9zaXRpb246ICdhYnNvbHV0ZSdcblx0XHRib3R0b206ICctMzBweCdcblx0XHRsZWZ0OiAnMCdcblx0XHRyaWdodDogJzAnXG5cdFx0Zm9udFNpemU6ICcxM3B4J1xuXHRcdGNvbG9yOiBOb3RpY2UuY29sb3JBbHRBY3Rpb25cblx0XHRvcGFjaXR5OiAwLjdcblxuXG5cblxuXG5cblxuc3R5bGVPcGVuU3RhdGUgPVxuXHRjb250YWluZXI6ICgpLT5cblx0XHR2aXNpYmlsaXR5OiAndmlzaWJsZSdcblx0XG5cdG92ZXJsYXk6ICgpLT5cblx0XHRvcGFjaXR5OiAnMSdcblxuXHRub3RpY2U6ICgpLT5cblx0XHRvcGFjaXR5OiAnMSdcblx0XHR2aXNpYmlsaXR5OiAndmlzaWJsZSdcblx0XHR3ZWJraXRUcmFuc2Zvcm06ICdzY2FsZSgxKSB0cmFuc2xhdGVZKC01MCUpJ1xuXHRcdG1velRyYW5zZm9ybTogJ3NjYWxlKDEpIHRyYW5zbGF0ZVkoLTUwJSknXG5cdFx0bXNUcmFuc2Zvcm06ICdzY2FsZSgxKSB0cmFuc2xhdGVZKC01MCUpJ1xuXHRcdG9UcmFuc2Zvcm06ICdzY2FsZSgxKSB0cmFuc2xhdGVZKC01MCUpJ1xuXHRcdHRyYW5zZm9ybTogJ3NjYWxlKDEpIHRyYW5zbGF0ZVkoLTUwJSknXG5cblxuXG5cbiIsIm1hcmt1cCA9IFxuXHRjb250YWluZXI6ICgpLT5cblx0XHRcIjxkaXYgY2xhc3M9J05vdGljZUNvbnRhaW5lcic+PC9kaXY+XCJcblx0XG5cdG92ZXJsYXk6ICgpLT5cblx0XHRcIjxkaXYgY2xhc3M9J05vdGljZUNvbnRhaW5lci1vdmVybGF5Jz48L2Rpdj5cIlxuXG5cdG5vdGljZTogKCktPlxuXHRcdFwiPGRpdiBjbGFzcz0nTm90aWNlJz48L2Rpdj5cIlxuXG5cdHRpdGxlOiAoe3RpdGxlfSktPlxuXHRcdFwiPGRpdiBjbGFzcz0nTm90aWNlLXRpdGxlJz4je3RpdGxlfTwvZGl2PlwiXG5cblx0dGV4dDogKHt0ZXh0fSktPlxuXHRcdFwiPGRpdiBjbGFzcz0nTm90aWNlLXRleHQnPiN7dGV4dH08L2Rpdj5cIlxuXG5cdGFjdGlvbnM6ICh7dHlwZX0pLT5cblx0XHRcIjxkaXYgY2xhc3M9J05vdGljZS1hY3Rpb25zIE5vdGljZS1hY3Rpb25zLS0je3R5cGV9Jz48L2Rpdj5cIlxuXG5cdGFsdEFjdGlvbjogKHthbHRBY3Rpb259KS0+XG5cdFx0XCI8ZGl2IGNsYXNzPSdOb3RpY2UtYWx0QWN0aW9uJz4je2FsdEFjdGlvbn08L2Rpdj5cIlxuXG5cdGFjdGlvbkJ1dHRvbjogKHtuYW1lfSktPlxuXHRcdFwiPGRpdiBjbGFzcz0nTm90aWNlLWFjdGlvbnMtaXRlbSBidXR0b25fI3tuYW1lfScgZGF0YS1uYW1lPScje25hbWV9Jz48L2Rpdj5cIlxuXG5cdGFjdGlvbkJ1dHRvbkxhYmVsOiAoe2xhYmVsfSktPlxuXHRcdFwiPGRpdiBjbGFzcz0nTm90aWNlLWFjdGlvbnMtaXRlbS10ZXh0Jz4je2xhYmVsfTwvZGl2PlwiXG5cblxuXG5cblxuIiwiXyRzbSgnX3BhcnRzL3N0eWxlcy5jb2ZmZWUnIClcbl8kc20oJ19wYXJ0cy9tYXJrdXAuY29mZmVlJyApXG5fJHNtKCdfcGFydHMvaGVscGVycy5jb2ZmZWUnIClcblxuXG5Ob3RpY2UgPSAoe0B0eXBlPSdvaycsIEB0aXRsZT0nJywgQHRleHQ9JycsIEBhY3Rpb25zLCBAYWx0QWN0aW9uPScnLCBAaGlnaGxpZ2h0LCBAa2VlcEFsaXZlfSktPlxuXHRAaXNBY3RpdmUgPSBmYWxzZVxuXHRAZWxzID0ge31cblx0QGVscy5hY3Rpb25CdXR0b25zID0ge31cblx0QGVscy5jb250YWluZXIgPSAkKG1hcmt1cC5jb250YWluZXIoKSlcblx0QGVscy5vdmVybGF5ID0gJChtYXJrdXAub3ZlcmxheSgpKS5hcHBlbmRUbyhAZWxzLmNvbnRhaW5lcilcblx0QGVscy5ub3RpY2UgPSAkKG1hcmt1cC5ub3RpY2UoKSkuYXBwZW5kVG8oQGVscy5jb250YWluZXIpLmRhdGEgJ05vdGljZScsIEBcblx0QGVscy50aXRsZSA9ICQobWFya3VwLnRpdGxlIHtAdGl0bGV9KS5hcHBlbmRUbyhAZWxzLm5vdGljZSlcblx0QGVscy50ZXh0ID0gJChtYXJrdXAudGV4dCB7QHRleHR9KS5hcHBlbmRUbyhAZWxzLm5vdGljZSlcblx0QGVscy5hY3Rpb25zID0gJChtYXJrdXAuYWN0aW9ucyB7QHR5cGV9KS5hcHBlbmRUbyhAZWxzLm5vdGljZSlcblx0QGVscy5hbHRBY3Rpb24gPSAkKG1hcmt1cC5hbHRBY3Rpb24ge0BhbHRBY3Rpb259KS5hcHBlbmRUbyhAZWxzLm5vdGljZSlcblxuXHRzd2l0Y2ggQHR5cGVcblx0XHR3aGVuICdvaydcblx0XHRcdEBhY3Rpb25zID0ge29rOidPSyd9XG5cdFx0XHRAaGlnaGxpZ2h0ID0gJ29rJ1xuXG5cdFx0d2hlbiAneWVzbm8nXG5cdFx0XHRAYWN0aW9ucyA9IHtubzonTm8nLCB5ZXM6J1llcyd9XG5cdFx0XHRAaGlnaGxpZ2h0ID0gJ3llcydcblxuXHRcdGVsc2UgQHR5cGUgPSAnY3VzdG9tJ1xuXG5cblx0Zm9yIG5hbWUsbGFiZWwgb2YgQGFjdGlvbnNcblx0XHRAZWxzLmFjdGlvbkJ1dHRvbnNbbmFtZV0gPSAkKG1hcmt1cC5hY3Rpb25CdXR0b24ge25hbWV9KS5hcHBlbmRUbyhAZWxzLmFjdGlvbnMpXG5cdFx0QGVscy5hY3Rpb25CdXR0b25zW25hbWVdLmFwcGVuZCAkKG1hcmt1cC5hY3Rpb25CdXR0b25MYWJlbCB7bGFiZWx9KVxuXG5cblx0QGFjdGlvbnNDb3VudCA9IChwIGZvciBwIG9mIEBhY3Rpb25zKS5sZW5ndGhcblx0QGFwcGVuZFRvRE9NKClcblx0cmV0dXJuIEBcblxuXG5cbk5vdGljZTo6YXBwZW5kVG9ET00gPSAoKS0+XG5cdGFwcGx5U3R5bGVzKEBlbHMuY29udGFpbmVyLCBOb3RpY2Uuc3R5bGUuY29udGFpbmVyKCkpXG5cdGFwcGx5U3R5bGVzKEBlbHMub3ZlcmxheSwgTm90aWNlLnN0eWxlLm92ZXJsYXkoKSlcblx0YXBwbHlTdHlsZXMoQGVscy5ub3RpY2UsIE5vdGljZS5zdHlsZS5ub3RpY2UoKSlcblx0YXBwbHlTdHlsZXMoQGVscy50aXRsZSwgTm90aWNlLnN0eWxlLnRpdGxlKCkpXG5cdGFwcGx5U3R5bGVzKEBlbHMudGV4dCwgTm90aWNlLnN0eWxlLnRleHQoKSlcblx0YXBwbHlTdHlsZXMoQGVscy5hY3Rpb25zLCBOb3RpY2Uuc3R5bGUuYWN0aW9ucygpKVxuXHRhcHBseVN0eWxlcyhAZWxzLmFsdEFjdGlvbiwgTm90aWNlLnN0eWxlLmFsdEFjdGlvbigpKVxuXHRhcHBseVN0eWxlcyhAZWxzLmFsdEFjdGlvbiwgaWYgQGFsdEFjdGlvbiB0aGVuIE5vdGljZS5zdHlsZS5hbHRBY3Rpb24oKSBlbHNlIGRpc3BsYXk6J25vbmUnKVxuXG5cdGZvciBuYW1lLGFjdGlvbkVsIG9mIEBlbHMuYWN0aW9uQnV0dG9uc1xuXHRcdGFwcGx5U3R5bGVzKGFjdGlvbkVsLCBOb3RpY2Uuc3R5bGUuYWN0aW9uQnV0dG9uKEBhY3Rpb25zQ291bnQpKVxuXHRcdGFwcGx5U3R5bGVzKGFjdGlvbkVsLCBOb3RpY2Uuc3R5bGUuYWN0aW9uQnV0dG9uSGlnaGxpZ2h0KCkpIGlmIG5hbWUgaXMgQGhpZ2hsaWdodFxuXHRcdGFwcGx5U3R5bGVzKGFjdGlvbkVsLmNoaWxkcmVuKCksIE5vdGljZS5zdHlsZS5hY3Rpb25CdXR0b25UZXh0KCkpXG5cblx0cmVtb3ZlU3R5bGVzKEBlbHMuYWN0aW9uQnV0dG9uc1tPYmplY3Qua2V5cyhAZWxzLmFjdGlvbkJ1dHRvbnMpLnNsaWNlKC0xKVswXV0sIHtib3JkZXJSaWdodDonJ30pXG5cblx0QGVscy5jb250YWluZXIuYXBwZW5kVG8oTm90aWNlLmNvbnRleHQpXG5cblxuTm90aWNlOjpwcm9tcHQgPSAoKS0+IEBwcm9taXNlID0gbmV3IFByb21pc2UgKHJlc29sdmUpPT5cblx0QHJldmVhbCgpXG5cblx0Zm9yIG5hbWUsYWN0aW9uRWwgb2YgQGVscy5hY3Rpb25CdXR0b25zIHRoZW4gZG8gKG5hbWUsYWN0aW9uRWwpPT5cblx0XHRhY3Rpb25FbC5vbiBOb3RpY2UuY2xpY2tFdmVudCwgKCk9PlxuXHRcdFx0QGRpc21pc3MobmFtZSkudGhlbihyZXNvbHZlKVxuXHRcblx0QGVscy5hbHRBY3Rpb24ub24gTm90aWNlLmNsaWNrRXZlbnQsICgpPT5cblx0XHRAZGlzbWlzcygnYWx0QWN0aW9uJykudGhlbihyZXNvbHZlKVxuXG5cblxuTm90aWNlOjpkaXNtaXNzID0gKHRhcmdldEFjdGlvbiktPiBuZXcgUHJvbWlzZSAocmVzb2x2ZSk9PlxuXHROb3RpY2UucXVldWUuc3BsaWNlIE5vdGljZS5xdWV1ZS5pbmRleE9mKEApLDFcblx0cmVtb3ZlU3R5bGVzKEBlbHMuY29udGFpbmVyLCBOb3RpY2Uuc3R5bGVPcGVuU3RhdGUuY29udGFpbmVyKCkpXG5cdHJlbW92ZVN0eWxlcyhAZWxzLm92ZXJsYXksIE5vdGljZS5zdHlsZU9wZW5TdGF0ZS5vdmVybGF5KCksIE5vdGljZS5zdHlsZS5vdmVybGF5KCkpXG5cdHJlbW92ZVN0eWxlcyhAZWxzLm5vdGljZSwgTm90aWNlLnN0eWxlT3BlblN0YXRlLm5vdGljZSgpLCBOb3RpY2Uuc3R5bGUubm90aWNlKCkpXG5cblx0c2V0VGltZW91dCAoKT0+XG5cdFx0QGRlc3Ryb3koKVxuXHRcdHJlc29sdmUodGFyZ2V0QWN0aW9uKVxuXHQsIE5vdGljZS5hbmltYXRpb25TcGVlZCsyNVxuXG5cblxuTm90aWNlOjpyZXZlYWwgPSAoKS0+XG5cdE5vdGljZS5xdWV1ZS5wdXNoKEApXG5cdGluZGV4ID0gTm90aWNlLnF1ZXVlLmluZGV4T2YoQClcblx0XG5cdGlmIE5vdGljZS5xdWV1ZS5zbGljZSgwLGluZGV4KS5sZW5ndGhcblx0XHRub3RpY2VJbkZyb250ID0gTm90aWNlLnF1ZXVlLnNsaWNlKC0yKVswXS5wcm9taXNlXG5cdGVsc2Vcblx0XHRub3RpY2VJbkZyb250ID0gUHJvbWlzZS5yZXNvbHZlKClcblx0XG5cdG5vdGljZUluRnJvbnQudGhlbiAoKT0+IHNldFRpbWVvdXQgKCk9PlxuXHRcdGFwcGx5U3R5bGVzKEBlbHMuY29udGFpbmVyLCBOb3RpY2Uuc3R5bGVPcGVuU3RhdGUuY29udGFpbmVyKCkpXG5cdFx0YXBwbHlTdHlsZXMoQGVscy5vdmVybGF5LCBOb3RpY2Uuc3R5bGVPcGVuU3RhdGUub3ZlcmxheSgpKVxuXHRcdGFwcGx5U3R5bGVzKEBlbHMubm90aWNlLCBOb3RpY2Uuc3R5bGVPcGVuU3RhdGUubm90aWNlKCkpXG5cdCwgNTBcblxuXG5cbk5vdGljZTo6ZGVzdHJveSA9ICgpLT5cblx0QGVscy5jb250YWluZXIucmVtb3ZlKCkgdW5sZXNzIEBrZWVwQWxpdmVcblx0QGlzQWN0aXZlID0gZmFsc2VcblxuXG5cblxuXG5cbk5vdGljZS5xdWV1ZSA9IFtdXG5Ob3RpY2UuY2xpY2tFdmVudCA9ICdjbGljaydcbk5vdGljZS5tYXJrdXAgPSBtYXJrdXBcbk5vdGljZS5zdHlsZSA9IHN0eWxlXG5Ob3RpY2Uuc3R5bGVPcGVuU3RhdGUgPSBzdHlsZU9wZW5TdGF0ZVxuTm90aWNlLmFuaW1hdGlvblNwZWVkID0gMzAwXG5Ob3RpY2UuY29sb3JCb3JkZXIgPSAnI2M3YzdjNydcbk5vdGljZS5jb2xvckJ1dHRvbiA9ICcjZjFjNjE4J1xuTm90aWNlLmNvbG9yQnV0dG9uQkcgPSAnI2U4ZWJlZCdcbk5vdGljZS5jb2xvckFsdEFjdGlvbiA9ICcjZmZmZmZmJ1xuTm90aWNlLmNvbG9yVGV4dCA9ICcjMTgxODE4J1xuTm90aWNlLmNvbnRleHQgPSBkb2N1bWVudC5ib2R5XG5cbiMjIyBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAjIyNcbm1vZHVsZS5leHBvcnRzID0gTm90aWNlXG5tb2R1bGUuZXhwb3J0cy52ZXJzaW9uID0gXyRzbSgnLi4vcGFja2FnZS5qc29uICQgdmVyc2lvbicgKVxubW9kdWxlLmV4cG9ydHMuY29uZmlnID0gKHNldHRpbmdzKS0+XG5cdGV4dGVuZCA9IF8kc20oJ3NtYXJ0LWV4dGVuZCcgKVxuXHRleHRlbmQuZGVlcCBOb3RpY2UsIHNldHRpbmdzXG5cdHJldHVybiBOb3RpY2VcblxuXG5cbiIsImFwcGx5U3R5bGVzID0gKGVsLCBzdHlsZU9iamVjdCwgYWRkaXRpb25hbCktPlxuXHRzdHlsZU9iamVjdCA9ICQuZXh0ZW5kIHt9LCBzdHlsZU9iamVjdCwgYWRkaXRpb25hbCBpZiBhZGRpdGlvbmFsXG5cdFxuXHRmb3Iga2V5LHZhbHVlIG9mIHN0eWxlT2JqZWN0XG5cdFx0KGVsWzBdIG9yIGVsKS5zdHlsZVtrZXldID0gdmFsdWVcblxuXHRyZXR1cm4gZWxcblxuXG5yZW1vdmVTdHlsZXMgPSAoZWwsIHN0eWxlT2JqZWN0LCBzdHlsZXNUb1JlaW5zdGF0ZSktPlxuXHRmb3Iga2V5IG9mIHN0eWxlT2JqZWN0XG5cdFx0KGVsWzBdIG9yIGVsKS5zdHlsZVtrZXldID0gJydcblxuXHRhcHBseVN0eWxlcyhlbCwgc3R5bGVzVG9SZWluc3RhdGUpIGlmIHN0eWxlc1RvUmVpbnN0YXRlXG5cblx0cmV0dXJuIGVsXG5cblxuZ2V0Tm90aWNlQ29udGFpbmVyID0gKGNvbnRleHQpLT5cblx0ZXhpc3RpbmdDb250YWluZXIkID0gJChcIi5Ob3RpY2VzXCIsIGNvbnRleHQpXG5cdFxuXHRpZiBleGlzdGluZ0NvbnRhaW5lciQubGVuZ3RoXG5cdFx0cmV0dXJuIGV4aXN0aW5nQ29udGFpbmVyJFxuXHRlbHNlXG5cdFx0cmV0dXJuICQobWFya3VwLmNvbnRhaW5lcigpKS5hcHBlbmRUbyhjb250ZXh0KVxuXHRcblxuXG5cblxuIiwie1xuICBcIm5hbWVcIjogXCJAZGFuaWVsa2FsZW4vbm90aWNlcy1lbmdpbmVcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMy4wLjJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2ltcGxlIG5vdGljZSAobW9kYWwgcG9wdXBzKSBzeXN0ZW1cIixcbiAgXCJtYWluXCI6IFwiZGlzdC9ub3RpY2VzLmpzXCIsXG4gIFwiYnJvd3NlclwiOiB7XG4gICAgXCIuL2RlYnVnXCI6IFwiLi9kaXN0L25vdGljZXMuZGVidWcuanNcIixcbiAgICBcIi4vZGlzdC9ub3RpY2VzLmpzXCI6IFwiLi9zcmMvaW5kZXguY29mZmVlXCJcbiAgfSxcbiAgXCJhdXRob3JcIjogXCJkYW5pZWxrYWxlblwiLFxuICBcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZGFuaWVsa2FsZW4vbm90aWNlcy1lbmdpbmVcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJwb3N0dmVyc2lvblwiOiBcIm5wbSBydW4gYnVpbGQgJiYgZ2l0IGFkZCAuICYmIGdpdCBjb21taXQgLW0gJ1tCdWlsZF0nXCIsXG4gICAgXCJwb3N0cHVibGlzaFwiOiBcImdpdCBwdXNoXCIsXG4gICAgXCJidWlsZFwiOiBcIm5wbSBydW4gY29tcGlsZSAmJiBucG0gcnVuIG1pbmlmeVwiLFxuICAgIFwiY29tcGlsZVwiOiBcInNpbXBseWltcG9ydCBidW5kbGUgLWQgLS11bWQgbm90aWZ5IHNyYy9pbmRleC5jb2ZmZWUgPiBkaXN0L25vdGljZXMuZGVidWcuanNcIixcbiAgICBcIm1pbmlmeVwiOiBcImNsb3N1cmUtc2VydmljZSBkaXN0L25vdGljZXMuZGVidWcuanMgPiBkaXN0L25vdGljZXMuanNcIixcbiAgICBcIndhdGNoXCI6IFwic2ltcGx5d2F0Y2ggLWcgJ3NyYy8qJyAteCAnbnBtIHJ1biBjb21waWxlIC1zJ1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImNsb3N1cmUtY29tcGlsZXItc2VydmljZVwiOiBcIl4wLjUuMFwiLFxuICAgIFwiY29mZmVlLXNjcmlwdFwiOiBcIl4xLjEwLjBcIixcbiAgICBcImpzb25cIjogXCJeOS4wLjRcIixcbiAgICBcInNpbXBseWltcG9ydFwiOiBcIl40LjAuMC1zMzVcIixcbiAgICBcInNpbXBseXdhdGNoXCI6IFwiXjMuMC4wLWwyXCIsXG4gICAgXCJ1Z2xpZnlcIjogXCIqXCJcbiAgfSxcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwianF1ZXJ5XCI6IFwiXjMuMS4xXCIsXG4gICAgXCJzbWFydC1leHRlbmRcIjogXCJeMS43LjNcIlxuICB9XG59XG4iLCJleHRlbmQgPSByZXF1aXJlICcuL2V4dGVuZCdcblxubm9ybWFsaXplS2V5cyA9IChrZXlzKS0+IGlmIGtleXNcblx0b3V0cHV0ID0ge31cblx0aWYgdHlwZW9mIGtleXMgaXNudCAnb2JqZWN0J1xuXHRcdG91dHB1dFtrZXlzXSA9IHRydWVcblx0ZWxzZVxuXHRcdGtleXMgPSBPYmplY3Qua2V5cyhrZXlzKSBpZiBub3QgQXJyYXkuaXNBcnJheShrZXlzKVxuXHRcdG91dHB1dFtrZXldID0gdHJ1ZSBmb3Iga2V5IGluIGtleXNcblxuXHRyZXR1cm4gb3V0cHV0XG5cblxubmV3QnVpbGRlciA9IChpc0Jhc2UpLT5cblx0YnVpbGRlciA9ICh0YXJnZXQpLT5cblx0XHRFWFBBTkRfQVJHVU1FTlRTKHNvdXJjZXMpXG5cdFx0aWYgYnVpbGRlci5vcHRpb25zLnRhcmdldFxuXHRcdFx0dGhlVGFyZ2V0ID0gYnVpbGRlci5vcHRpb25zLnRhcmdldFxuXHRcdGVsc2Vcblx0XHRcdHRoZVRhcmdldCA9IHRhcmdldFxuXHRcdFx0c291cmNlcy5zaGlmdCgpXG5cdFx0XG5cdFx0ZXh0ZW5kKGJ1aWxkZXIub3B0aW9ucywgdGhlVGFyZ2V0LCBzb3VyY2VzKVxuXHRcblx0YnVpbGRlci5pc0Jhc2UgPSB0cnVlIGlmIGlzQmFzZVxuXHRidWlsZGVyLm9wdGlvbnMgPSB7fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydGllcyhidWlsZGVyLCBtb2RpZmllcnMpXG5cdHJldHVybiBidWlsZGVyXG5cblxubW9kaWZpZXJzID0gXG5cdCdkZWVwJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0Xy5vcHRpb25zLmRlZXAgPSB0cnVlXG5cdFx0cmV0dXJuIF9cblxuXHQnb3duJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0Xy5vcHRpb25zLm93biA9IHRydWVcblx0XHRyZXR1cm4gX1xuXG5cdCdhbGxvd051bGwnOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRfLm9wdGlvbnMuYWxsb3dOdWxsID0gdHJ1ZVxuXHRcdHJldHVybiBfXG5cblx0J251bGxEZWxldGVzJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0Xy5vcHRpb25zLm51bGxEZWxldGVzID0gdHJ1ZVxuXHRcdHJldHVybiBfXG5cblx0J2NvbmNhdCc6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdF8ub3B0aW9ucy5jb25jYXQgPSB0cnVlXG5cdFx0cmV0dXJuIF9cblxuXHQnY2xvbmUnOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRfLm9wdGlvbnMudGFyZ2V0ID0ge31cblx0XHRyZXR1cm4gX1xuXG5cdCdub3REZWVwJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0cmV0dXJuIChrZXlzKS0+XG5cdFx0XHRfLm9wdGlvbnMubm90RGVlcCA9IG5vcm1hbGl6ZUtleXMoa2V5cylcdFx0XHRcblx0XHRcdHJldHVybiBfXG5cblx0J2RlZXBPbmx5JzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0cmV0dXJuIChrZXlzKS0+XG5cdFx0XHRfLm9wdGlvbnMuZGVlcE9ubHkgPSBub3JtYWxpemVLZXlzKGtleXMpXHRcdFx0XG5cdFx0XHRyZXR1cm4gX1xuXG5cdCdrZXlzJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0cmV0dXJuIChrZXlzKS0+XG5cdFx0XHRfLm9wdGlvbnMua2V5cyA9IG5vcm1hbGl6ZUtleXMoa2V5cylcdFx0XHRcblx0XHRcdHJldHVybiBfXG5cblx0J25vdEtleXMnOiBnZXQ6ICgpLT5cblx0XHRfID0gaWYgQGlzQmFzZSB0aGVuIG5ld0J1aWxkZXIoKSBlbHNlIEBcblx0XHRyZXR1cm4gKGtleXMpLT5cblx0XHRcdF8ub3B0aW9ucy5ub3RLZXlzID0gbm9ybWFsaXplS2V5cyhrZXlzKVx0XHRcdFxuXHRcdFx0cmV0dXJuIF9cblxuXHQndHJhbnNmb3JtJzogZ2V0OiAoKS0+XG5cdFx0XyA9IGlmIEBpc0Jhc2UgdGhlbiBuZXdCdWlsZGVyKCkgZWxzZSBAXG5cdFx0cmV0dXJuICh0cmFuc2Zvcm0pLT5cblx0XHRcdGlmIHR5cGVvZiB0cmFuc2Zvcm0gaXMgJ2Z1bmN0aW9uJ1xuXHRcdFx0XHRfLm9wdGlvbnMuZ2xvYmFsVHJhbnNmb3JtID0gdHJhbnNmb3JtXG5cdFx0XHRlbHNlIGlmIHRyYW5zZm9ybSBhbmQgdHlwZW9mIHRyYW5zZm9ybSBpcyAnb2JqZWN0J1xuXHRcdFx0XHRfLm9wdGlvbnMudHJhbnNmb3JtcyA9IHRyYW5zZm9ybVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gX1xuXG5cblx0J2ZpbHRlcic6IGdldDogKCktPlxuXHRcdF8gPSBpZiBAaXNCYXNlIHRoZW4gbmV3QnVpbGRlcigpIGVsc2UgQFxuXHRcdHJldHVybiAoZmlsdGVyKS0+XG5cdFx0XHRpZiB0eXBlb2YgZmlsdGVyIGlzICdmdW5jdGlvbidcblx0XHRcdFx0Xy5vcHRpb25zLmdsb2JhbEZpbHRlciA9IGZpbHRlclxuXHRcdFx0ZWxzZSBpZiBmaWx0ZXIgYW5kIHR5cGVvZiBmaWx0ZXIgaXMgJ29iamVjdCdcblx0XHRcdFx0Xy5vcHRpb25zLmZpbHRlcnMgPSBmaWx0ZXJcblx0XHRcdFxuXHRcdFx0cmV0dXJuIF9cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IG5ld0J1aWxkZXIodHJ1ZSlcbmV4cG9ydHMudmVyc2lvbiA9IGltcG9ydCAnLi4vcGFja2FnZS5qc29uICQgdmVyc2lvbiciLCJ7XG4gIFwiX2Zyb21cIjogXCJzbWFydC1leHRlbmRcIixcbiAgXCJfaWRcIjogXCJzbWFydC1leHRlbmRAMS43LjNcIixcbiAgXCJfaW5CdW5kbGVcIjogZmFsc2UsXG4gIFwiX2ludGVncml0eVwiOiBcInNoYTUxMi1QVkVFVllERHp5eEtBMEdORkxjV1k2b0pTa1FLZGMxdzcxOGVRcEVIY051VFNXWXhESzM1R3poc0doTWtVVThsQklnU0VEYnQ1eDVwNDZwUnozQXViQT09XCIsXG4gIFwiX2xvY2F0aW9uXCI6IFwiL3NtYXJ0LWV4dGVuZFwiLFxuICBcIl9waGFudG9tQ2hpbGRyZW5cIjoge30sXG4gIFwiX3JlcXVlc3RlZFwiOiB7XG4gICAgXCJ0eXBlXCI6IFwidGFnXCIsXG4gICAgXCJyZWdpc3RyeVwiOiB0cnVlLFxuICAgIFwicmF3XCI6IFwic21hcnQtZXh0ZW5kXCIsXG4gICAgXCJuYW1lXCI6IFwic21hcnQtZXh0ZW5kXCIsXG4gICAgXCJlc2NhcGVkTmFtZVwiOiBcInNtYXJ0LWV4dGVuZFwiLFxuICAgIFwicmF3U3BlY1wiOiBcIlwiLFxuICAgIFwic2F2ZVNwZWNcIjogbnVsbCxcbiAgICBcImZldGNoU3BlY1wiOiBcImxhdGVzdFwiXG4gIH0sXG4gIFwiX3JlcXVpcmVkQnlcIjogW1xuICAgIFwiI1VTRVJcIixcbiAgICBcIi9cIixcbiAgICBcIi9zaW1wbHl3YXRjaFwiXG4gIF0sXG4gIFwiX3Jlc29sdmVkXCI6IFwiaHR0cHM6Ly9yZWdpc3RyeS5ucG1qcy5vcmcvc21hcnQtZXh0ZW5kLy0vc21hcnQtZXh0ZW5kLTEuNy4zLnRnelwiLFxuICBcIl9zaGFzdW1cIjogXCIwZmU0YTQyNmM4NjM4ZjQ4Zjk5YjdjYzg1ZTI3Njc5MWVjZjVhZjJiXCIsXG4gIFwiX3NwZWNcIjogXCJzbWFydC1leHRlbmRcIixcbiAgXCJfd2hlcmVcIjogXCIvVXNlcnMvZGFuaWVsa2FsZW4vc2FuZGJveC9ub3RpY2VzLWVuZ2luZVwiLFxuICBcImF1dGhvclwiOiB7XG4gICAgXCJuYW1lXCI6IFwiZGFuaWVsa2FsZW5cIlxuICB9LFxuICBcImJyb3dzZXJcIjoge1xuICAgIFwiLi9kZWJ1Z1wiOiBcImRpc3Qvc21hcnQtZXh0ZW5kLmRlYnVnLmpzXCIsXG4gICAgXCIuL2Rpc3Qvc21hcnQtZXh0ZW5kLmpzXCI6IFwic3JjL2luZGV4LmNvZmZlZVwiXG4gIH0sXG4gIFwiYnJvd3NlcmlmeVwiOiB7XG4gICAgXCJ0cmFuc2Zvcm1cIjogW1xuICAgICAgXCJzaW1wbHlpbXBvcnQvY29tcGF0XCJcbiAgICBdXG4gIH0sXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZGFuaWVsa2FsZW4vc21hcnQtZXh0ZW5kL2lzc3Vlc1wiXG4gIH0sXG4gIFwiYnVuZGxlRGVwZW5kZW5jaWVzXCI6IGZhbHNlLFxuICBcImRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJmYWxhZmVsXCI6IFwiXjIuMS4wXCJcbiAgfSxcbiAgXCJkZXByZWNhdGVkXCI6IGZhbHNlLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiTWVyZ2UvZXh0ZW5kIG9iamVjdHMgKHNoYWxsb3cvZGVlcCkgd2l0aCBnbG9iYWwvaW5kaXZpZHVhbCBmaWx0ZXJzIGFuZCBtb3JlIGZlYXR1cmVzXCIsXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcImJhZGdlLWdlblwiOiBcIl4xLjAuMlwiLFxuICAgIFwiYmx1ZWJpcmRcIjogXCJeMy40LjdcIixcbiAgICBcImNoYWlcIjogXCJeMy41LjBcIixcbiAgICBcImNvZmZlZS1yZWdpc3RlclwiOiBcIl4wLjEuMFwiLFxuICAgIFwiY29mZmVlaWZ5LWNhY2hlZFwiOiBcIl4yLjEuMVwiLFxuICAgIFwiZXh0ZW5kXCI6IFwiXjMuMC4xXCIsXG4gICAgXCJnb29nbGUtY2xvc3VyZS1jb21waWxlci1qc1wiOiBcIl4yMDE3MDYyNi4wLjBcIixcbiAgICBcIm1vY2hhXCI6IFwiXjMuMi4wXCIsXG4gICAgXCJzaW1wbHlpbXBvcnRcIjogXCJeNC4wLjAtczIxXCIsXG4gICAgXCJzaW1wbHl3YXRjaFwiOiBcIl4zLjAuMC1sMlwiLFxuICAgIFwidWdsaWZ5LWpzXCI6IFwiXjMuMC4yNFwiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vZGFuaWVsa2FsZW4vc21hcnQtZXh0ZW5kI3JlYWRtZVwiLFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImV4dGVuZFwiLFxuICAgIFwiY2xvbmVcIixcbiAgICBcImZpbHRlclwiLFxuICAgIFwic2VsZWN0aXZlXCIsXG4gICAgXCJtZXJnZVwiLFxuICAgIFwiYXNzaWduXCIsXG4gICAgXCJwcm9wZXJ0aWVzXCJcbiAgXSxcbiAgXCJsaWNlbnNlXCI6IFwiSVNDXCIsXG4gIFwibWFpblwiOiBcImRpc3Qvc21hcnQtZXh0ZW5kLmpzXCIsXG4gIFwibW9jaGFfb3B0c1wiOiBcIi11IHRkZCAtLWNvbXBpbGVycyBjb2ZmZWU6Y29mZmVlLXJlZ2lzdGVyIC0tc2xvdyAxMDAwIC0tdGltZW91dCA1MDAwXCIsXG4gIFwibmFtZVwiOiBcInNtYXJ0LWV4dGVuZFwiLFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiZ2l0K2h0dHBzOi8vZ2l0aHViLmNvbS9kYW5pZWxrYWxlbi9zbWFydC1leHRlbmQuZ2l0XCJcbiAgfSxcbiAgXCJzY3JpcHRzXCI6IHtcbiAgICBcImJ1aWxkXCI6IFwibWtkaXIgLXAgZGlzdC87IG5wbSBydW4gYnVpbGQ6ZGVidWcgJiYgbnBtIHJ1biBidWlsZDpyZWxlYXNlXCIsXG4gICAgXCJidWlsZDpkZWJ1Z1wiOiBcInNpbXBseWltcG9ydCBidW5kbGUgc3JjL2luZGV4LmNvZmZlZSAtZCAtLXRhcmdldCBub2RlIC0tdW1kIHNtYXJ0LWV4dGVuZCA+IGRpc3Qvc21hcnQtZXh0ZW5kLmRlYnVnLmpzXCIsXG4gICAgXCJidWlsZDpyZWxlYXNlXCI6IFwic2ltcGx5aW1wb3J0IGJ1bmRsZSBzcmMvaW5kZXguY29mZmVlIC0tdGFyZ2V0IG5vZGUgLS11bWQgc21hcnQtZXh0ZW5kID4gZGlzdC9zbWFydC1leHRlbmQuanNcIixcbiAgICBcImNvdmVyYWdlXCI6IFwibnBtIHJ1biBjb3ZlcmFnZTpydW4gJiYgbnBtIHJ1biBjb3ZlcmFnZTpiYWRnZVwiLFxuICAgIFwiY292ZXJhZ2U6YmFkZ2VcIjogXCJiYWRnZS1nZW4gLWQgLmNvbmZpZy9iYWRnZXMvY292ZXJhZ2VcIixcbiAgICBcImNvdmVyYWdlOnJ1blwiOiBcImZvckNvdmVyYWdlPXRydWUgaXN0YW5idWwgY292ZXIgLS1kaXIgY292ZXJhZ2Ugbm9kZV9tb2R1bGVzL21vY2hhL2Jpbi9fbW9jaGEgLS0gJG5wbV9wYWNrYWdlX21vY2hhX29wdHNcIixcbiAgICBcInBvc3RwdWJsaXNoXCI6IFwiZ2l0IHB1c2hcIixcbiAgICBcInBvc3R2ZXJzaW9uXCI6IFwibnBtIHJ1biBidWlsZCAmJiBnaXQgYWRkIC4gJiYgZ2l0IGNvbW1pdCAtYSAtbSAnW0J1aWxkXSdcIixcbiAgICBcInByZXB1Ymxpc2hPbmx5XCI6IFwiQ0k9MSBucG0gcnVuIHRlc3RcIixcbiAgICBcInRlc3RcIjogXCJtb2NoYSAkbnBtX3BhY2thZ2VfbW9jaGFfb3B0c1wiLFxuICAgIFwid2F0Y2hcIjogXCJzaW1wbHl3YXRjaCAtZyAnc3JjLyonIC14ICducG0gcnVuIGJ1aWxkOmRlYnVnIC1zJ1wiXG4gIH0sXG4gIFwic2ltcGx5aW1wb3J0XCI6IHtcbiAgICBcInRyYW5zZm9ybVwiOiBbXG4gICAgICBcImNvZmZlZWlmeS1jYWNoZWRcIixcbiAgICAgIFwiLi8uY29uZmlnL3RyYW5zZm9ybXMvbWFjcm9zXCJcbiAgICBdLFxuICAgIFwiZmluYWxUcmFuc2Zvcm1cIjogW1xuICAgICAgXCIuY29uZmlnL3RyYW5zZm9ybXMvbWluaWZ5LXN1cGVyXCIsXG4gICAgICBcIi5jb25maWcvdHJhbnNmb3Jtcy9taW5pZnktcmVuYW1lXCIsXG4gICAgICBcIi5jb25maWcvdHJhbnNmb3Jtcy9taW5pZnktc2ltcGxlXCJcbiAgICBdXG4gIH0sXG4gIFwidmVyc2lvblwiOiBcIjEuNy4zXCJcbn1cbiIsInZhciBleHRlbmQsIGlzQXJyYXksIGlzT2JqZWN0LCBzaG91bGREZWVwRXh0ZW5kO1xuXG5pc0FycmF5ID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHRhcmdldCk7XG59O1xuXG5pc09iamVjdCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0ICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0YXJnZXQpID09PSAnW29iamVjdCBPYmplY3RdJyB8fCBpc0FycmF5KHRhcmdldCk7XG59O1xuXG5zaG91bGREZWVwRXh0ZW5kID0gZnVuY3Rpb24ob3B0aW9ucywgdGFyZ2V0LCBwYXJlbnRLZXkpIHtcbiAgaWYgKG9wdGlvbnMuZGVlcCkge1xuICAgIGlmIChvcHRpb25zLm5vdERlZXApIHtcbiAgICAgIHJldHVybiAhb3B0aW9ucy5ub3REZWVwW3RhcmdldF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChvcHRpb25zLmRlZXBPbmx5KSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuZGVlcE9ubHlbdGFyZ2V0XSB8fCBwYXJlbnRLZXkgJiYgc2hvdWxkRGVlcEV4dGVuZChvcHRpb25zLCBwYXJlbnRLZXkpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZCA9IGZ1bmN0aW9uKG9wdGlvbnMsIHRhcmdldCwgc291cmNlcywgcGFyZW50S2V5KSB7XG4gIHZhciBpLCBrZXksIGxlbiwgc291cmNlLCBzb3VyY2VWYWx1ZSwgc3ViVGFyZ2V0LCB0YXJnZXRWYWx1ZTtcbiAgaWYgKCF0YXJnZXQgfHwgdHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRhcmdldCA9IHt9O1xuICB9XG4gIGZvciAoaSA9IDAsIGxlbiA9IHNvdXJjZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBzb3VyY2UgPSBzb3VyY2VzW2ldO1xuICAgIGlmIChzb3VyY2UgIT0gbnVsbCkge1xuICAgICAgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIHNvdXJjZVZhbHVlID0gc291cmNlW2tleV07XG4gICAgICAgIHRhcmdldFZhbHVlID0gdGFyZ2V0W2tleV07XG4gICAgICAgIGlmIChzb3VyY2VWYWx1ZSA9PT0gdGFyZ2V0IHx8IHNvdXJjZVZhbHVlID09PSB2b2lkIDAgfHwgKHNvdXJjZVZhbHVlID09PSBudWxsICYmICFvcHRpb25zLmFsbG93TnVsbCAmJiAhb3B0aW9ucy5udWxsRGVsZXRlcykgfHwgKG9wdGlvbnMua2V5cyAmJiAhb3B0aW9ucy5rZXlzW2tleV0pIHx8IChvcHRpb25zLm5vdEtleXMgJiYgb3B0aW9ucy5ub3RLZXlzW2tleV0pIHx8IChvcHRpb25zLm93biAmJiAhc291cmNlLmhhc093blByb3BlcnR5KGtleSkpIHx8IChvcHRpb25zLmdsb2JhbEZpbHRlciAmJiAhb3B0aW9ucy5nbG9iYWxGaWx0ZXIoc291cmNlVmFsdWUsIGtleSwgc291cmNlKSkgfHwgKG9wdGlvbnMuZmlsdGVycyAmJiBvcHRpb25zLmZpbHRlcnNba2V5XSAmJiAhb3B0aW9ucy5maWx0ZXJzW2tleV0oc291cmNlVmFsdWUsIGtleSwgc291cmNlKSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc291cmNlVmFsdWUgPT09IG51bGwgJiYgb3B0aW9ucy5udWxsRGVsZXRlcykge1xuICAgICAgICAgIGRlbGV0ZSB0YXJnZXRba2V5XTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5nbG9iYWxUcmFuc2Zvcm0pIHtcbiAgICAgICAgICBzb3VyY2VWYWx1ZSA9IG9wdGlvbnMuZ2xvYmFsVHJhbnNmb3JtKHNvdXJjZVZhbHVlLCBrZXksIHNvdXJjZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMudHJhbnNmb3JtcyAmJiBvcHRpb25zLnRyYW5zZm9ybXNba2V5XSkge1xuICAgICAgICAgIHNvdXJjZVZhbHVlID0gb3B0aW9ucy50cmFuc2Zvcm1zW2tleV0oc291cmNlVmFsdWUsIGtleSwgc291cmNlKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGZhbHNlKSB7XG4gICAgICAgICAgY2FzZSAhKG9wdGlvbnMuY29uY2F0ICYmIGlzQXJyYXkoc291cmNlVmFsdWUpICYmIGlzQXJyYXkodGFyZ2V0VmFsdWUpKTpcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gdGFyZ2V0VmFsdWUuY29uY2F0KHNvdXJjZVZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgIShzaG91bGREZWVwRXh0ZW5kKG9wdGlvbnMsIGtleSwgcGFyZW50S2V5KSAmJiBpc09iamVjdChzb3VyY2VWYWx1ZSkpOlxuICAgICAgICAgICAgc3ViVGFyZ2V0ID0gaXNPYmplY3QodGFyZ2V0VmFsdWUpID8gdGFyZ2V0VmFsdWUgOiBpc0FycmF5KHNvdXJjZVZhbHVlKSA/IFtdIDoge307XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IGV4dGVuZChvcHRpb25zLCBzdWJUYXJnZXQsIFtzb3VyY2VWYWx1ZV0sIGtleSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2VWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklpSXNJbVpwYkdVaU9pSXVMaTl1YjJSbFgyMXZaSFZzWlhNdmMyMWhjblF0WlhoMFpXNWtMM055WXk5bGVIUmxibVF1WTI5bVptVmxJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHRkZlE9PSJdfQ==