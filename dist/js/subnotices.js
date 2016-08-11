// Generated by CoffeeScript 1.10.0

/**
 * The library I authored for use as subnotices/alerts sitewide (frontend/backend)
 */
(function($) {
  var BrowserNotice, Subnotice;
  if ($('.subnotices').length === 0) {
    $('body').prepend('<div class="subnotices"></div>');
  }
  this.subnotify = function(arg) {
    var browserNotice, container, markup, ref, ref1, ref2, ref3, ref4, subnoticeObject, text, time, title, type;
    type = (ref = arg.type) != null ? ref : 'info', text = (ref1 = arg.text) != null ? ref1 : '', time = (ref2 = arg.time) != null ? ref2 : 10000, title = (ref3 = arg.title) != null ? ref3 : '', browserNotice = (ref4 = arg.browserNotice) != null ? ref4 : false, container = arg.container;
    markup = "<div class='subnotice subnotice_" + type + "'> <div class='subnotice-text'>" + text + "</div> <div class='subnotice-close'></div> </div>";
    subnoticeObject = new Subnotice(markup, container);
    subnoticeObject.destroy(time);
    if (browserNotice) {
      new BrowserNotice({
        title: title,
        text: text
      });
    }
    return subnoticeObject;
  };
  Subnotice = function(markup, container) {
    this.el = $(markup);
    this.el.data('Subnotice', this);
    this.wrapperEl = container || $('.subnotices').first();
    this.isActive = true;
    if (!this.wrapperEl.hasClass('subnotices')) {
      this.wrapperEl.find('.subnotices').first();
    }
    this.append();
    this.attachEvents();
    return this;
  };
  Subnotice.prototype.append = function() {
    this.el.prependTo(this.wrapperEl);
    return setTimeout((function(_this) {
      return function() {
        return _this.reveal();
      };
    })(this), 200);
  };
  Subnotice.prototype.reveal = function() {
    return this.el.addClass('show');
  };
  Subnotice.prototype.attachEvents = function() {
    return this.el.children('.subnotice-close').on('click', (function(_this) {
      return function() {
        return _this.destroy(0);
      };
    })(this));
  };
  Subnotice.prototype.destroy = function(time) {
    var el;
    if (time !== false) {
      el = this.el;
      return setTimeout((function(_this) {
        return function() {
          _this.el.removeClass('show');
          _this.el.remove();
          return _this.isActive = false;
        };
      })(this), time);
    }
  };
  BrowserNotice = function(arg) {
    this.title = arg.title, this.text = arg.text;
    if (typeof Notification === "undefined" || Notification === null) {
      return this;
    }
    if (Notification.permission === 'granted') {
      return this.reveal();
    } else {
      return Notification.requestPermission().then((function(_this) {
        return function(state) {
          if (state === 'granted') {
            return _this.reveal();
          }
        };
      })(this));
    }
  };
  BrowserNotice.prototype.reveal = function() {
    return this.notice = new Notification(this.title, {
      'body': this.text
    });
  };
  $(window).on('click', '.subnotice-close', function() {
    var subnoticeObject;
    subnoticeObject = $(this).parent().data('Subnotice');
    return subnoticeObject.destroy(0);
  });
})(jQuery);
