(function (require) {
require = (function (cache, modules, cx) {
return function (r) {
if (!modules[r]) throw new Error(r + ' is not a module');
return cache[r] ? cache[r].exports : ((cache[r] = {
exports: {}
}, cache[r].exports = modules[r].call(cx, require, cache[r], cache[r].exports)));
};
})({}, {
0: function (require, module, exports) {
(function($) {
  var notify;
  notify = function(arg) {
    var altAction, buttons, context, extraActionsClass, markup, p, ref, ref1, ref2, ref3, ref4, ref5, rejecter, resolver, template, text, title, type;
    template = arg.template, type = (ref = arg.type) != null ? ref : 'ok', title = (ref1 = arg.title) != null ? ref1 : '', text = (ref2 = arg.text) != null ? ref2 : '', buttons = (ref3 = arg.buttons) != null ? ref3 : {}, altAction = (ref4 = arg.altAction) != null ? ref4 : '', resolver = arg.resolver, rejecter = arg.rejecter, context = (ref5 = arg.context) != null ? ref5 : notify.context;
    type = type.replace('_', '');
    extraActionsClass = type === 'yesno' ? ' Notice-actions_yesno' : '';
    if (template) {
      markup = template;
    } else {
      markup = noticeMarkup.notice.replace('{{title}}', title).replace('{{text}}', text).replace('{{type}}', type).replace('{{altAction}}', altAction).replace('{{actionsCount}}', (function() {
        switch (type) {
          case 'ok':
            return 1;
          case 'yesno':
            return 2;
          default:
            return ((function() {
              var results;
              results = [];
              for (p in buttons) {
                results.push(p);
              }
              return results;
            })()).length;
        }
      })()).replace('{{actions}}', function() {
        var actions;
        switch (type) {
          case 'ok':
            actions = {
              ok: 'OK'
            };
            resolver = 'ok';
            break;
          case 'yesno':
            actions = {
              no: 'No',
              yes: 'Yes'
            };
            rejecter = 'no';
            resolver = 'yes';
            break;
          case 'custom':
            actions = buttons;
        }
        return genActionButtons(actions, resolver, rejecter);
      });
    }
    return new Notice({
      markup: markup,
      type: type,
      context: context
    });
  };
  var Notice;
  
  Notice = function(arg) {
    var context, markup;
    markup = arg.markup, this.type = arg.type, context = arg.context;
    this.el$ = $(markup);
    this.isActive = true;
    this.wrapper$ = this.appendContainer(context);
    this.allInstances.push(this);
    this.el$.data('Notice', this);
    return this.prompt();
  };
  
  Notice.prototype.appendContainer = function(context) {
    if ($(".Notices", context).length) {
      return $(".Notices", context);
    } else {
      return $("<div class='Notices'></div>").appendTo(context);
    }
  };
  
  Notice.prototype.append = function() {
    var append, index, noticeInFront;
    append = (function(_this) {
      return function() {
        return _this.el$.appendTo(_this.wrapper$);
      };
    })(this);
    index = this.allInstances.indexOf(this);
    if (this.allInstances.slice(0, index).length) {
      noticeInFront = this.allInstances.slice(-2)[0].promise;
    } else {
      noticeInFront = Promise.resolve();
    }
    return noticeInFront.then(append, append);
  };
  
  Notice.prototype.remove = function() {
    this.el$.remove();
    return this.isActive = false;
  };
  
  Notice.prototype.reveal = function() {
    return setTimeout((function(_this) {
      return function() {
        return _this.wrapper$.addClass('reveal');
      };
    })(this), 50);
  };
  
  Notice.prototype.dismiss = function() {
    this.allInstances.splice(this.allInstances.indexOf(this), 1);
    if (!this.allInstances.length) {
      this.wrapper$.removeClass('reveal');
    }
    return setTimeout((function(_this) {
      return function() {
        return _this.remove();
      };
    })(this), 400);
  };
  
  Notice.prototype.prompt = function() {
    return this.promise = new Promise((function(_this) {
      return function(resolve, reject) {
        _this.append();
        _this.reveal();
        _this.el$.on(notify.clickEvent, '.Notice-actions-item', function() {
          return _this.dismiss();
        });
        _this.el$.on(notify.clickEvent, '._resolver', function() {
          return resolve(_this);
        });
        _this.el$.on(notify.clickEvent, '._rejecter', function() {
          return reject(_this);
        });
        return _this.el$.on(notify.clickEvent, '.Notice-altAction', function() {
          _this.dismiss();
          return reject(_this);
        });
      };
    })(this));
  };
  
  Notice.prototype.allInstances = [];
  
  ;
  var genActionButtons, noticeMarkup;
  
  genActionButtons = function(buttons, resolver, rejecter) {
    var label, markup, name;
    markup = (function() {
      var results;
      results = [];
      for (name in buttons) {
        label = buttons[name];
        results.push(noticeMarkup.action.replace('{{name}}', name).replace('{{name}}', name).replace('{{label}}', label).replace('{{promiseAction}}', (function() {
          switch (false) {
            case name !== resolver:
              return '_resolver';
            case name !== rejecter:
              return '_rejecter';
            default:
              return '';
          }
        })()));
      }
      return results;
    })();
    return markup.join('');
  };
  
  noticeMarkup = {
    notice: "<div class='Notice'> <div class='Notice-title'>{{title}}</div> <div class='Notice-message'>{{text}}</div> <div class='Notice-actions Notice-actions--{{type}} _count--{{actionsCount}}'>{{actions}}</div> <div class='Notice-altAction'>{{altAction}}</div> </div>",
    action: "<div class='Notice-actions-item button_{{name}} {{promiseAction}}' data-name='{{name}}'> <div class='Notice-actions-item-text'>{{label}}</div> </div>"
  };
  
  ;
  notify.instances = Notice.prototype.allInstances;
  
  notify.context = document.body;
  
  notify.clickEvent = 'click';
  
  ;
  Notice.version = "2.3.3";
  notify.Notice = Notice;
  return module.exports = notify;
})(jQuery);

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
}).call(this, null);
