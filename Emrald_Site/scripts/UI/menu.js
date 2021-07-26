/**
 * @file Creates the top menu bar.
 * @copyright 2021 Battelle Energy Alliance
 */

"use strict";

/**
 * Handles opening a C# tool.
 */
function openCSharpTool() {
  alert("Hey!!! C# here.");
}

/**
 * Handles opening a python tool.
 */
function openPythonTool() {
  alert("Hey!!! Python here.");
}
//---------------------------------------------
//support dynamic menuing.  
// when a menu function is not found, it default to this.
var notDefined = function (menuName) {
  alert("The menu function '" + menuName + "' is undefined.");
}

if (typeof Navigation === 'undefined')
  var Navigation; 
(function (Navigation) {
  var Menu = (function (_super) {
    __extends(_super, Menu);

    /**
     * Constructs Menu.
     * 
     * @class Navigation#Menu
     * @classdesc The top menu bar.
     * @param {string} menuFile The file to load menu data from.
     */
    function Menu(menuFile) {
      _super.apply(this, arguments);

      /**
       * The path to the menu data file.
       * 
       * @name Navigation#Menu#menuUrl
       * @type {string}
       */
      this.menuUrl = menuFile || "resources/menu.json";
      this.loadMenuFile();
    }
    
    /**
     * Creates a menu item click handler.
     * 
     * @name Navigation#Menu#executeMenu
     * @function
     * @param {string} fName The name of the menu item function.
     * @param {*} context Context to bind the menu function to.
     * @returns {Function} The click handler.
     */
    Menu.prototype.executeMenu = function (fName, context) {
      return function () {
        var args = Array.prototype.slice.call(arguments, 2);
        var namespaces = fName.split(".");
        var func = namespaces.pop();
        for (var i = 0; i < namespaces.length; i++) {
          context = context[namespaces[i]];
        }

        if (context[func] === undefined)
          notDefined(fName);
        else
          context[func].apply(context, args);
        return false;  //IE requires this to be return false.
      }
    }

    /**
     * Creates sub-menu entries.
     * 
     * @name Navigation#Menu#createSubMenu
     * @function
     * @param {MenuItem[]} menuItems The items in the menu.
     * @param {HTMLElement} parent The element to create the menu within.
     * @param {boolean} [isMain] If the current item is at the top level of the menu.
     */
    Menu.prototype.createSubMenu = function (menuItems, parent, isMain) {
      if (menuItems && menuItems.length > 0) {
        var ul = document.createElement('ul');
        ul.id = "menu";
        parent.appendChild(ul);
        ul.isHideable = !isMain;

        for (var i = 0; i < menuItems.length; i++) {
          var mi = menuItems[i];
					var li = document.createElement('li');
					
          li.isHideable = !isMain;
          ul.appendChild(li);
          var a = document.createElement('a');
          li.appendChild(a);

          li.onmouseover = function (evt) {
            for (var j = 0; j < li.children.length; j++) {
              if (li.children[j].nodeName == 'UL') {
                li.children[j].style.visibility = 'visible';
                break; //should be only one.
              }
            }
            return false;
          }

          li.onmouseout = function (evt) {
            for (var j = 0; j < li.children.length; j++) {
              if (li.children[j].nodeName == 'UL') {
                li.children[j].style.visibility = 'hidden';
                break; //should be only one.
              }
            }
            return false;
          }

          li.onmouseup = function (evt) {
            for (var j = 0; j < li.children.length; j++) {
              if (li.children[j].nodeName == 'UL') {
                li.children[j].style.visibility = 'hidden';
                break; //should be only one.
              }
            }
            return false;
          }

          a.href = 'javascript:(0)';
          a.textContent = mi.title;
          if (mi.fnc && mi.fnc.length > 0)
            a.onclick = this.executeMenu(mi.fnc, window);
          if (mi.submenu) {
            this.createSubMenu(mi.submenu, li, false);
          }
        }
      }
    }

    /**
     * Adds a menu to the menu nav tag.
     * 
     * @name Navigation#Menu#createMenu
     * @function
     * @param {object} menuObj The menu JSON.
     */
    Menu.prototype.createMenu = function (menuObj) {

      //first attempt to use DOM node.
      var nav = document.getElementById("menu-wrap");
      if (!nav) { //create if none exists.
        nav = document.createElement('nav');
        nav.id = "menu-wrap";

        document.body.appendChild(nav);
      }

      var div = document.getElementById('menu-trigger');
      if (!div) {
        div = document.createElement('div');
        div.id = 'menu-trigger';
        nav.appendChild(div);
      }

      this.createSubMenu(menuObj.menu, nav, true);

      //$('nav ul li').mouseover(function (evt) {
      //  $(this).children('ul').css('visibility', 'visible');
      //}).mouseup(function () {
      //  $(this).children('ul').css('visibility', 'hidden');
      //}).mouseout(function () {
      //  $(this).children('ul').css('visibility', 'hidden');
      //});

    }
    
    /**
     * Loads the menu JSON file from the server.
     * 
     * @name Navigation#Menu#loadMenuFile
     * @function
     */
    Menu.prototype.loadMenuFile = function () {
      getServerFile(this.menuUrl, function (jsonStr) {
        try {
          if (typeof required === 'undefined')
            var menu = eval('(' + jsonStr + ')');  //node-webkit doesn't work with JSON.parse.  So eval() the json object directly.
          else
            var menu = JSON.parse(jsonStr);
        }
        catch (ex) {
          console.log('Error parsing: ' + ex.message);
        }
        if (menu) {
          this.createMenu(menu);
        }
      }.bind(this));
    }

    return Menu;
  })(Object);
  Navigation.Menu = Menu;
})(Navigation || (Navigation = {}));
