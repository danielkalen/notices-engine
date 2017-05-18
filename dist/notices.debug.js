// Generated by CoffeeScript 1.11.1
(function($) {
  var Notice, applyStyles, getNoticeContainer, markup, removeStyles, style, styleOpenState;
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
  Notice.version = '3.0.2';
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
  if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
    return module.exports = Notice;
  } else if (typeof define === 'function' && define.amd) {
    return define(['notices-engine'], function() {
      return Notice;
    });
  } else {
    return this.Notice = Notice;
  }
})(jQuery);
