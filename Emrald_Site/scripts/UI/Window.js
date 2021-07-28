/**
 * @file Custom window functionality.
 * @copyright 2021 Battelle Energy Alliance
 */

/// <reference path="CustomWindowHandler.js" />
"use strict";

/**
 * @namespace RiskSim
 */
var RiskSim;
(function (RiskSim) {
  //===================================================================================
  //#region Window
  var Window = (function (_super) {
    __extends(Window, _super);

    /**
     * Constructs Window.
     * 
     * @class RiskSim#Window
     * @classdesc Custom window functionality.
     * @augments mxWindow
     * @constructs
     * @param {string} title The title of the window.
     * @param {HTMLElement} content The window content.
     * @param {number} x The x coordinate to place the window at.
     * @param {number} y The y coordinate to place the window at.
     * @param {number} width The width of the window.
     * @param {number} height The height of the window.
     * @param {boolean} minimizable If the window can be minimized.
     * @param {boolean} movable If the window can be moved.
     * @param {HTMLHRElement} [replaceNode] If specified, the window will replace this node.
     * @param {string} style CSS class name to apply to the window.
     * @param {boolean} ismodal If the window is a modal.
     * @param {number} z_index The z-index of the window.
     */
    function Window(title, content, x, y, width, height, minimizable, movable, replaceNode, style, ismodal, z_index) {
      _super.apply(this, arguments);

      z_index = (z_index) || 1001;

      /**
       * If the window is a modal.
       * 
       * @name RiskSim#Window#modal
       * @type {boolean}
       */
      this.modal = false;

      /**
       * Function to call when the window is closing.
       * The function should return true if the window is allowed to close, or false otherwise.
       * 
       * @name RiskSim#Window#onClosing
       * @type {Function}
       */
      this.onClosing = null;

      //override init function to add ismodal parameter.
      var baseWindowInit = this.init;

      /**
       * Initializes the window.
       * 
       * @name RiskSim#Window#init
       * @function
       * @param {number} x The x coordinate to place the window at.
       * @param {number} y The y coordinate to place the window at.
       * @param {number} width The width of the window.
       * @param {number} height The height of the window.
       * @param {string} style CSS class name to apply to the window.
       * @param {boolean} ismodal If the window is a modal.
       */
      this.init = function (x, y, width, height, style, ismodal) {
        baseWindowInit.apply(this, arguments);

        var div = this.div;
        if (ismodal) {
          div.style.zIndex = `${z_index + 1}`;
          if (this.div.style.boxShadow == '') {
            this.div.style.boxShadow = '5px 5px 7px #888888';
          }

          this.modaldiv = document.createElement('div');
          this.modaldiv.style.zIndex = `${z_index}`;
          this.modaldiv.className = 'OverlayEffect';
          document.body.appendChild(this.modaldiv);
        }
      }

      //override to remove modal effects.
      var baseWindowDestroy = this.destroy;

      /**
       * Destroys the window.
       * 
       * @name RiskSim#Window#destroy
       * @function
       */
      this.destroy = function () {
        baseWindowDestroy.apply(this, arguments);
        if (typeof (this.modaldiv) !== 'undefined' && (this.modaldiv != null)) {
          this.modaldiv.parentNode.removeChild(this.modaldiv);
          this.modaldiv = null;
        }
      }

      if (content != null) {
        minimizable = (minimizable != null) ? minimizable : true;
        this.content = content;
        this.init(x, y, width, height, style, ismodal);

        this.installMaximizeHandler();
        this.installMinimizeHandler();
        this.installCloseHandler();
        this.setMinimizable(minimizable);
        this.setTitle(title);

        if (movable == null || movable) {
          this.installMoveHandler();
        }

        if (replaceNode != null && replaceNode.parentNode != null) {
          replaceNode.parentNode.replaceChild(this.div, replaceNode);
        }
        else {
          document.body.appendChild(this.div);
        }
      }

      /**
       * If the window is closing now.
       * 
       * @name RiskSim#Window#closeNow
       * @type {boolean}
       */
      this.closeNow = false;

      /**
       * Forces the window to close.
       * 
       * @name RiskSim#Window#forceClose
       * @function
       */
      this.forceClose = function () {
        this.closeNow = true;
        this.close();
      }


      //function triggerEvent(el, eventName) {
      //  var evt;
      //  if (document.createEvent) {
      //    evt = document.createEvent('HTMLEvents');
      //    evt.initEvent(eventName, true, true);
      //  } else if (document.createEventObject) {// IE < 9
      //    evt = document.createEventObject();
      //    evt.eventType = eventName;
      //  }
      //  evt.eventName = eventName;
      //  if (el.dispatchEvent) {
      //    el.dispatchEvent(evt);
      //  } else if (el.fireEvent && htmlEvents['on' + eventName]) {// IE < 9
      //    el.fireEvent('on' + evt.eventType, evt);// can trigger only real event (e.g. 'click')
      //  } else if (el[eventName]) {
      //    el[eventName]();
      //  } else if (el['on' + eventName]) {
      //    el['on' + eventName]();
      //  }
      //}

      ////Okay or Cancel button clicked and it is okay to close, simulate a mousedown click event to the close image listener. The X  on the upper right corner.
      /**
       * Closes the window.
       * 
       * @name RiskSim#Window#close
       * @function
       */
      this.close = function () {
        triggerEvent(this.closeImg, 'click');
      }

      /**
       * Activates the window.
       * 
       * @name RiskSim#Window#activate
       * @function
       */
      this.activate = function () {
        if (mxWindow.activeWindow != this) {
          var previousWindow = mxWindow.activeWindow;
          mxWindow.activeWindow = this;

          this.fireEvent(new mxEventObject(mxEvent.ACTIVATE, 'previousWindow', previousWindow));
        }
      };

    };

    //overwritten to prompt user on close for okay to close.
    //mxWindow.prototype.installCloseHandler = function () {
    //  this.closeImg = document.createElement('img');

    //  this.closeImg.setAttribute('src', this.closeImage);
    //  this.closeImg.setAttribute('align', 'right');
    //  this.closeImg.setAttribute('title', 'Close');
    //  this.closeImg.style.marginLeft = '2px';
    //  this.closeImg.style.cursor = 'pointer';
    //  this.closeImg.style.display = 'none';

    //  this.title.insertBefore(this.closeImg, this.title.firstChild);


    //  var onCloseForm = function (evt) {
    //    //add to query caller for it is okay to close the window.
    //    var okToClose = true;
    //    if (this.onClosing != null) {
    //      okToClose = this.onClosing(evt);
    //    }
    //    if (!okToClose) {
    //      mxEvent.consume(evt);
    //      return;
    //    }

    //    this.fireEvent(new mxEventObject(mxEvent.CLOSE, 'event', evt));

    //    if (this.destroyOnClose) {
    //      this.destroy();
    //    }
    //    else {
    //      this.setVisible(false);
    //    }

    //    mxEvent.consume(evt);
    //  }

    //  //IE doesn't like just the 'mousedown' event on an image.
    //  mxEvent.addGestureListeners(this.closeImg, mxUtils.bind(this, onCloseForm));
    //  //With 'click' it works for all IE, Chrome and SF.
    //  this.closeImg.addEventListener('click', mxUtils.bind(this, onCloseForm), true);
    //};

    return Window;
  })(mxWindow);
  RiskSim.Window = Window;
  //#endregion Window
  //===================================================================================
  //#region CommonDialog
  var CommonDialog = (function () {
    /**
     * Constructs CommonDialog.
     * 
     * @class RiskSim#CommonDialog
     * @classdesc Common dialog window functions.
     * @constructs
     */
    function CommonDialog() {
    }
    
    /**
     * Shows an alert message.
     * 
     * @name RiskSim#CommonDialog#alert
     * @function
     * @param {string} title The title of the alert.
     * @param {string} message The alert message.
     */
    CommonDialog.prototype.alert = function (title, message) {
      this.show(title, message);
    }
    
    /**
     * Shows a generic message.
     * 
     * @name RiskSim#CommonDialog#show
     * @function
     * @param {string} title The message title.
     * @param {string} message The message content.
     */
    CommonDialog.prototype.show = function (title, message) {
      var wincontent = document.createElement('div');
      var content = document.createElement('div');
      content.style.margin = '5px';
      wincontent.appendChild(content);

      var cmdcontent = document.createElement('div');
      mxUtils.br(cmdcontent, 1);

      var okbtn = document.createElement('button');
      okbtn.style.width = '70px';
      okbtn.style.display = 'block';
      okbtn.style.margin = '0 auto 0 auto';
      okbtn.style.cssFloat = 'none';
      okbtn.textContent = 'OK';
      okbtn.onclick = function (evt) {
        if (this.owner) {
          this.owner.closeStatus = okbtn.textContent; //Ok clicked
          this.owner.close();
        }
      }

      cmdcontent.appendChild(okbtn);
      mxUtils.br(cmdcontent, 1);

      wincontent.appendChild(cmdcontent);

      var msgbox = document.createElement('text');
      msgbox.style.marginLeft = '20px';
      msgbox.style.marginRight = '20px';
      msgbox.style.display = 'block';
      msgbox.textContent = message;
      mxUtils.br(content, 1);
      content.appendChild(msgbox);

      var x = (window.innerWidth || document.body.clientWidth) / 2 - 200;
      var y = (window.innerHeight || document.body.clientHeight) / 2 - 150;
      x = x < 0 ? 0 : x;
      y = y < 0 ? 0 : y;

      var _this = this;
      var zindex = null;
      if (mxWindow.activeWindow && mxWindow.activeWindow.div) {
        zindex = parseInt(mxWindow.activeWindow.div.style.zIndex) + 1;
      }
      var dialog = new RiskSim.Window(title, wincontent, x, y, null, null, false, true, null, null, true, zindex);

      dialog.addListener(mxEvent.SHOW, function () {
        okbtn.focus();
      });


      okbtn.owner = dialog;
      dialog.setClosable(true);
      dialog.setVisible(true);
      dialog.destroyOnClose = true;
    }
    
    /**
     * Shows a prompt waiting for user confirmation.
     * 
     * @name RiskSim#CommonDialog#confirm
     * @function
     * @param {string} title The title of the prompt.
     * @param {string} message The prompt message.
     * @param {string[]} btnArray Buttons to show on the prompt.
     * @param {Function} callbackFn Function to call when the user confirms the prompt.
     */
    CommonDialog.prototype.confirm = function (title, message, btnArray, callbackFn) {
      if (!callbackFn) return;
      btnArray = btnArray || ['Yes', 'No', 'Cancel'];

      var wincontent = document.createElement('div');
      var content = document.createElement('div');
      content.style.margin = '5px';
      wincontent.appendChild(content);

      var cmdcontent = document.createElement('div');
      cmdcontent.style.margin = '1em';
      cmdcontent.style.height = '4em';
      cmdcontent.style.textAlign = 'center';
      mxUtils.br(cmdcontent, 1);
      wincontent.appendChild(cmdcontent);

      var msgbox = document.createElement('text');
      msgbox.style.marginLeft = '20px';
      msgbox.style.marginRight = '20px';
      msgbox.style.display = 'block';
      msgbox.innerHTML = message;
      mxUtils.br(content, 1);
      content.appendChild(msgbox);

      var x = (window.innerWidth || document.body.clientWidth) / 2 - 200;
      var y = (window.innerHeight || document.body.clientHeight) / 2 - 150;
      x = x < 0 ? 0 : x;
      y = y < 0 ? 0 : y;

      var _this = this;
      var zindex = null;
      if (mxWindow.activeWindow && mxWindow.activeWindow.div) {
        zindex = parseInt(mxWindow.activeWindow.div.style.zIndex) + 1;
      }
      var dialog = new RiskSim.Window(title, wincontent, x, y, null, null, false, true, null, null, true, zindex);
      dialog.onClosing = function (evt) {
        if (dialog.closeNow) return true;  //just kill the window, unconditionally.
        callbackFn(this.closeStatus, evt);
        return true;
      }

      var firstBtn = null;

      for (var i = 0; i < btnArray.length; i++) {
        var btn = document.createElement('button');
        btn.style.width = '7em';
        btn.style.cssFloat = 'none';
        btn.style.margin = '5px 15px 5px 15px';
        btn.textContent = btnArray[i];
        btn.onclick = function (evt) {
          dialog.closeStatus = this.textContent;
          dialog.close();
        }
        cmdcontent.appendChild(btn);
        if (i == 0) {
          firstBtn = btn;
        }
      }
      dialog.addListener(mxEvent.SHOW, function () {
        firstBtn.focus();
      });

      mxUtils.br(cmdcontent, 1);
      dialog.setClosable(true);
      dialog.setVisible(true);
      dialog.destroyOnClose = true;
    }
    
    /**
     * Shows a prompt waiting for user input.
     * 
     * @name RiskSim#CommonDialog#prompt
     * @function
     * @param {string} title The prompt title.
     * @param {string} message The prompt message.
     * @param {string} defaultValue Default value for the prompt input.
     * @param {Function} callbackFn Function to call when the user inputs the prompt.
     */
    CommonDialog.prototype.prompt = function (title, message, defaultValue, callbackFn) {
      if (!callbackFn) return; //Can't do anything without confirmation function.

      if (!title) title = "Input";
      if (!message) message = "Please enter a new value";
      if (!defaultValue) defaultValue = "";

      var wincontent = document.createElement('div');
      var content = document.createElement('div');
      content.style.margin = '10px';
      content.style.maxWidth = '300px';
      wincontent.appendChild(content);

      var cmdcontent = document.createElement('div');
      //cmdcontent.style.textAlign = 'center';
      var grpcontent = document.createElement('div');
      grpcontent.style.margin = '1em';
      grpcontent.style.height = '3em';
      grpcontent.style.textAlign = 'center';
      cmdcontent.appendChild(grpcontent);


      var okbtn = document.createElement('button');
      okbtn.style.width = '7em';
      okbtn.style.cssFloat = 'none';
      okbtn.style.margin = '5px 15px 5px 15px';
      okbtn.textContent = 'OK';
      okbtn.onclick = function (evt) {
        if (this.owner) {
          this.owner.closeStatus = okbtn.textContent; //Ok clicked
          this.owner.close();
        }
      }

      var cancelbtn = document.createElement('button');
      cancelbtn.textContent = 'Cancel';
      cancelbtn.style.width = '7em';
      cancelbtn.style.margin = '5px 15px 5px 15px';
      cancelbtn.style.cssFloat = 'none';
      cancelbtn.onclick = function (evt) {
        if (this.owner) {
          this.owner.closeStatus = cancelbtn.textContent;
          this.owner.close();
        }
      }

      grpcontent.appendChild(okbtn);
      grpcontent.appendChild(cancelbtn);

      wincontent.appendChild(cmdcontent);

      //var img = document.createElement('img');
      //img.src = 'info.jpg';
      //content.appendChild(img);

      var msgbox = document.createElement('text');
      msgbox.innerHTML = message;
      //mxUtils.br(content);
      content.appendChild(msgbox);
      mxUtils.br(content, 1);

      var input = document.createElement('input');
      input.style.width = '120px';
      input.value = defaultValue;

      var oldValue = defaultValue;
      var applyHandler = function () {
        var newValue = input.value || '';
        okbtn.disabled = newValue.length == 0;
      }
      input.onkeypress = function (evt) {
        if (evt.keyCode == 13 && !evt.shiftKey) {
          okbtn.click();
        }
      }
      input.onkeyup = applyHandler;

      if (mxClient.IS_IE) {
        input.addEventListener('focusout', applyHandler);
      }
      else {
        // Note: Known problem is the blurring of fields in
        // Firefox by changing the selection, in which case
        // no event is fired in FF and the change is lost.
        // As a workaround use a local variable
        // that stores the focused field and invoke blur
        // explicitly where we do the graph.focus above.
        input.blur = applyHandler;
      }
      content.appendChild(input);

      var x = (window.innerWidth || document.body.clientWidth) / 2 - 200;
      var y = (window.innerHeight || document.body.clientHeight) / 2 - 150;
      x = x < 0 ? 0 : x;
      y = y < 0 ? 0 : y;

      var zindex = null;
      if (mxWindow.activeWindow && mxWindow.activeWindow.div) {
        zindex = parseInt(mxWindow.activeWindow.div.style.zIndex) + 1;
      }
      var dialog = new RiskSim.Window(title, wincontent, x, y, null, null, false, true, null, null, true, zindex);
      dialog.onClosing = function (evt) {
        if (dialog.closeNow) return true;
        var rs = callbackFn(dialog, input.value, this.closeStatus, evt);
        return rs;
      }

      dialog.addListener(mxEvent.SHOW, function () {
        input.focus();
        input.select();
      });

      okbtn.owner = dialog;
      cancelbtn.owner = dialog;
      dialog.setClosable(true);
      dialog.setVisible(true);
      dialog.destroyOnClose = true;

    }
    //#endregion
    return CommonDialog;
  })();
  RiskSim.CommonDialog = CommonDialog;
  //#endregion CommonDialog
})(RiskSim || (RiskSim = {}));

/**
 * The global message box.
 * 
 * @type {RiskSim#CommonDialog}
 */
var MessageBox = new RiskSim.CommonDialog();

//overwritten framework (DOM's) alert function.
mxUtils.alert = function (msg) {
  MessageBox.alert("Alert", msg);
}

Window.prototype.alert = function (msg) {
  MessageBox.alert("Alert", msg);
}
