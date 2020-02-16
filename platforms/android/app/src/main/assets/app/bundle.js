require("./runtime.js");require("./vendor.js");module.exports =
(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["bundle"],{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Cases.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["cases"],

  data() {
    return {};
  },

  methods: {
    onButtonTap() {
      this.$emit('select');
    },

    onTapCase(index) {
      //console.log("emit select", index);
      this.$emit("select", index);
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Home.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Login.vue");
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Messages.vue");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./consts.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var Cache = __webpack_require__("tns-core-modules/ui/image-cache").Cache;

var fromFile = __webpack_require__("../node_modules/@nativescript/core/image-source/image-source.js").fromFile;


/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      items: [],
      Consts: _consts_js__WEBPACK_IMPORTED_MODULE_2__["Consts"],
      message: "You have successfully authenticated. This is where you build your core application functionality."
    };
  },

  mounted() {
    this.$backendService.getContacts().then(result => {
      this.items = result;
    });
  },

  methods: {
    onItemTap: function onItemTap(args) {
      console.log("Navigate to messages " + args.index + " tapped", this.items[args.index]);
      this.$navigateTo(_Messages__WEBPACK_IMPORTED_MODULE_1__["default"], {
        props: {
          id: this.items[args.index].id,
          name: this.items[args.index].text,
          photo: this.items[args.index].src
        }
      });
    },

    tapLogout() {
      console.log("logout");
      this.$backendService.logout();
      this.$navigateTo(_Login__WEBPACK_IMPORTED_MODULE_0__["default"], {
        clearHistory: true
      });
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Login.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Home.vue");
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./consts.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      Consts: _consts_js__WEBPACK_IMPORTED_MODULE_1__["Consts"],
      isLoggingIn: true,
      processing: false,
      user: {
        email: "",
        password: "",
        confirmPassword: "",
        name: ""
      }
    };
  },

  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },

    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert("Please provide both an email address and password.");
        return;
      }

      this.processing = true;

      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },

    login() {
      this.$backendService.login(this.user).then(() => {
        this.processing = false;
        this.$navigateTo(_Home__WEBPACK_IMPORTED_MODULE_0__["default"], {
          clearHistory: true
        });
      }).catch(() => {
        this.processing = false;
        this.alert("Unfortunately we could not find your account.");
      });
    },

    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.alert("Your passwords do not match.");
        this.processing = false;
        return;
      }

      this.$backendService.register(this.user).then(() => {
        this.processing = false;
        this.alert("Your account was successfully created.");
        this.isLoggingIn = true;
      }).catch(() => {
        this.processing = false;
        this.alert("Unfortunately we were unable to create your account.");
      });
    },

    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message: "Enter the email address you used to register for APP NAME to reset your password.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then(data => {
        if (data.result) {
          this.$backendService.resetPassword(data.text.trim()).then(() => {
            this.alert("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
          }).catch(() => {
            this.alert("Unfortunately, an error occurred resetting your password.");
          });
        }
      });
    },

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },

    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },

    alert(message) {
      return alert({
        title: "APP NAME",
        okButtonText: "OK",
        message: message
      });
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/MessageItem.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["message"],

  data() {
    return {};
  },

  methods: {
    openPhoto() {
      this.$emit('open-photo', {
        src: this.message.img
      });
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Messages.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Home.vue");
/* harmony import */ var _Photo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Photo.vue");
/* harmony import */ var _MessageItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/MessageItem.vue");
/* harmony import */ var _Cases__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./components/Cases.vue");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var Cache = __webpack_require__("tns-core-modules/ui/image-cache").Cache;



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Home: _Home__WEBPACK_IMPORTED_MODULE_0__["default"],
    Photo: _Photo__WEBPACK_IMPORTED_MODULE_1__["default"],
    MessageItem: _MessageItem__WEBPACK_IMPORTED_MODULE_2__["default"],
    Cases: _Cases__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  props: ["id", "photo", "name"],

  data() {
    return {
      selectedListPickerIndex: 0,
      opponentName: "",
      photoSrc: "~/images/logo-call.png",
      messages: [],
      cases: []
    };
  },

  mounted() {
    console.log("message mounted", this.id, this.photo, this.name);

    if (this.photo) {
      this.photoSrc = this.photo;
    }

    this.opponentName = this.name;
    this.$backendService.getMessages(this.id).then(result => {
      this.messages = result;
    });
    this.$backendService.getCurrentStatus(this.id).then(result => {
      this.cases = result.responseCases.map(item => item.text);
    });
  },

  methods: {
    toMainPage() {
      this.$navigateTo(_Home__WEBPACK_IMPORTED_MODULE_0__["default"]);
    },

    onTapCase(index) {
      this.$backendService.selectCase(this.cases[index]);
    },

    openPhoto(item) {
      this.$navigateTo(_Photo__WEBPACK_IMPORTED_MODULE_1__["default"], {
        props: {
          src: item.src
        }
      });
    }

  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Photo.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Messages.vue");
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["src"],

  data() {
    return {};
  },

  methods: {
    toMessages() {
      this.$navigateTo(_Messages__WEBPACK_IMPORTED_MODULE_0__["default"]);
    }

  }
});

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/Login.vue?vue&type=style&index=0&id=c27482c4&scoped=true&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.page[data-v-c27482c4] {\n    align-items: center;\n    flex-direction: column;\n}\n.form[data-v-c27482c4] {\n    margin-left: 30;\n    margin-right: 30;\n    flex-grow: 2;\n    vertical-align: middle;\n}\n.logo[data-v-c27482c4] {\n    margin-bottom: 12;\n    height: 90;\n    font-weight: bold;\n}\n.header[data-v-c27482c4] {\n    horizontal-align: center;\n    font-size: 25;\n    font-weight: 600;\n    margin-bottom: 70;\n    text-align: center;\n    color: #D51A1A;\n}\n.input-field[data-v-c27482c4] {\n    margin-bottom: 25;\n}\n.input[data-v-c27482c4] {\n    font-size: 18;\n    placeholder-color: #A8A8A8;\n}\n.input[data-v-c27482c4]:disabled {\n    background-color: white;\n    opacity: 0.5;\n}\n.btn-primary[data-v-c27482c4] {\n    margin: 30 5 15 5;\n}\n.login-label[data-v-c27482c4] {\n    horizontal-align: center;\n    color: #A8A8A8;\n    font-size: 16;\n}\n.sign-up-label[data-v-c27482c4] {\n    margin-bottom: 20;\n}\n.bold[data-v-c27482c4] {\n    color: #000000;\n}\n", ""]);

// exports

    const application = __webpack_require__("tns-core-modules/application");
    __webpack_require__("tns-core-modules/ui/styling/style-scope");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/Login.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/Messages.vue?vue&type=style&index=0&lang=css&":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.answer-btn {\n    background-color: #262323;\n    color: #ffffff;\n    font-size: 18px;\n    text-transform: none;\n}\n.far {\n    font-family: \"Font Awesome 5 Free\", \"fa-regular-400\";\n}\n.message-w {\n    padding: 30px;\n    margin: 5px 8px;\n    box-shadow: 2px 2px 5px 1px #666;\n    border-bottom: 1px solid #cccccc;\n    background-color: #c3ffc3;\n}\n.message-r {\n    padding: 30px;\n    margin: 5px 8px;\n    box-shadow: 2px 2px 5px 1px #666;\n    border-bottom: 1px solid #cccccc;\n    background-color: #ffffff;\n}\n", ""]);

// exports

    const application = __webpack_require__("tns-core-modules/application");
    __webpack_require__("tns-core-modules/ui/styling/style-scope");

    if (typeof exports.forEach === "function") {
        exports.forEach(cssExport => {
            if (cssExport.length > 1 && cssExport[1]) {
                // applying the second item of the export as it contains the css contents
                application.addCss(cssExport[1]);
            }
        });
    }
;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './components/Messages.vue' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Cases.vue?vue&type=template&id=2e4b3d78&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "GridLayout",
    {
      attrs: {
        columns: "*",
        rows: "auto, auto, auto, auto",
        width: "100%",
        row: "1",
        backgroundColor: "lightgray"
      }
    },
    [
      _vm._l(_vm.cases, function(item, index) {
        return [
          _c("Button", {
            attrs: { text: item, row: index },
            on: {
              tap: function($event) {
                return _vm.onTapCase(index)
              }
            }
          })
        ]
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Home.vue?vue&type=template&id=67410f3a&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    [
      _c(
        "ActionBar",
        { attrs: { title: _vm.Consts.APP_NAME } },
        [
          _c("ActionItem", {
            attrs: {
              tap: "onDelete",
              "ios.systemIcon": "9",
              "ios.position": "left",
              "android.systemIcon": "ic_menu_preferences",
              "android.position": "actionBar"
            }
          }),
          _c("ActionItem", {
            attrs: {
              "ios.systemIcon": "9",
              "ios.position": "left",
              "android.systemIcon": "ic_lock_lock",
              "android.position": "actionBar"
            },
            on: {
              tap: function($event) {
                return _vm.tapLogout()
              }
            }
          })
        ],
        1
      ),
      _c(
        "ScrollView",
        [
          _c(
            "ListView",
            {
              staticClass: "list-group",
              attrs: { items: _vm.items, "+alias": "item" },
              on: { itemTap: _vm.onItemTap }
            },
            [
              _c("v-template", {
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(ref) {
                      var item = ref.item
                      var $index = ref.$index
                      var $even = ref.$even
                      var $odd = ref.$odd
                      return _c(
                        "GridLayout",
                        {
                          staticClass: "list-group-item",
                          attrs: { rows: "*", columns: "auto, *" }
                        },
                        [
                          _c("Image", {
                            staticClass: "thumb img-circle",
                            attrs: { row: "0", col: "0", src: item.src }
                          }),
                          _c("Label", {
                            attrs: { row: "0", col: "1", text: item.text }
                          })
                        ],
                        1
                      )
                    }
                  }
                ])
              })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Login.vue?vue&type=template&id=c27482c4&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    { attrs: { actionBarHidden: "true" } },
    [
      _c(
        "FlexboxLayout",
        { staticClass: "page" },
        [
          _c(
            "StackLayout",
            { staticClass: "form" },
            [
              _c("Image", {
                staticClass: "logo",
                attrs: { src: "~/images/logo.png" }
              }),
              _c("Label", {
                staticClass: "header",
                attrs: { text: _vm.Consts.APP_NAME }
              }),
              _c(
                "GridLayout",
                { attrs: { rows: "auto, auto, auto, auto" } },
                [
                  _c(
                    "StackLayout",
                    { staticClass: "input-field", attrs: { row: "0" } },
                    [
                      _c("TextField", {
                        staticClass: "input",
                        attrs: {
                          hint: "Email",
                          isEnabled: !_vm.processing,
                          keyboardType: "email",
                          autocorrect: "false",
                          autocapitalizationType: "none",
                          returnKeyType: "next",
                          text: _vm.user.email
                        },
                        on: {
                          returnPress: _vm.focusPassword,
                          textChange: function($event) {
                            return _vm.$set(_vm.user, "email", $event.value)
                          }
                        }
                      }),
                      _c("StackLayout", { staticClass: "hr-light" })
                    ],
                    1
                  ),
                  _c(
                    "StackLayout",
                    { staticClass: "input-field", attrs: { row: "1" } },
                    [
                      _c("TextField", {
                        ref: "password",
                        staticClass: "input",
                        attrs: {
                          isEnabled: !_vm.processing,
                          hint: "Password",
                          secure: "true",
                          returnKeyType: _vm.isLoggingIn ? "done" : "next",
                          text: _vm.user.password
                        },
                        on: {
                          returnPress: _vm.focusConfirmPassword,
                          textChange: function($event) {
                            return _vm.$set(_vm.user, "password", $event.value)
                          }
                        }
                      }),
                      _c("StackLayout", { staticClass: "hr-light" })
                    ],
                    1
                  ),
                  _c(
                    "StackLayout",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: !_vm.isLoggingIn,
                          expression: "!isLoggingIn"
                        }
                      ],
                      staticClass: "input-field",
                      attrs: { row: "2" }
                    },
                    [
                      _c("TextField", {
                        ref: "confirmPassword",
                        staticClass: "input",
                        attrs: {
                          isEnabled: !_vm.processing,
                          hint: "Confirm password",
                          secure: "true",
                          returnKeyType: "next",
                          text: _vm.user.confirmPassword
                        },
                        on: {
                          textChange: function($event) {
                            return _vm.$set(
                              _vm.user,
                              "confirmPassword",
                              $event.value
                            )
                          }
                        }
                      }),
                      _c("StackLayout", { staticClass: "hr-light" })
                    ],
                    1
                  ),
                  _c(
                    "StackLayout",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: !_vm.isLoggingIn,
                          expression: "!isLoggingIn"
                        }
                      ],
                      staticClass: "input-field",
                      attrs: { row: "3" }
                    },
                    [
                      _c("TextField", {
                        ref: "name",
                        staticClass: "input",
                        attrs: {
                          isEnabled: !_vm.processing,
                          hint: "Your name",
                          secure: "false",
                          returnKeyType: "done",
                          text: _vm.user.name
                        },
                        on: {
                          textChange: function($event) {
                            return _vm.$set(_vm.user, "name", $event.value)
                          }
                        }
                      }),
                      _c("StackLayout", { staticClass: "hr-light" })
                    ],
                    1
                  ),
                  _c("ActivityIndicator", {
                    attrs: { rowSpan: "3", busy: _vm.processing }
                  })
                ],
                1
              ),
              _c("Button", {
                staticClass: "btn btn-primary m-t-20",
                attrs: {
                  text: _vm.isLoggingIn ? "Log In" : "Sign Up",
                  isEnabled: !_vm.processing
                },
                on: { tap: _vm.submit }
              }),
              _c("Label", {
                staticClass: "login-label",
                attrs: {
                  "*v-show": "isLoggingIn",
                  text: "Forgot your password?"
                },
                on: {
                  tap: function($event) {
                    return _vm.forgotPassword()
                  }
                }
              })
            ],
            1
          ),
          _c(
            "Label",
            {
              staticClass: "login-label sign-up-label",
              on: { tap: _vm.toggleForm }
            },
            [
              _c(
                "FormattedString",
                [
                  _c("Span", {
                    attrs: {
                      text: _vm.isLoggingIn
                        ? "Don’t have an account? "
                        : "Back to Login"
                    }
                  }),
                  _c("Span", {
                    staticClass: "bold",
                    attrs: { text: _vm.isLoggingIn ? "Sign up" : "" }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/MessageItem.vue?vue&type=template&id=2cc9c8af&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "WrapLayout",
    {
      class: _vm.message.isOwner ? "message-w" : "message-r",
      attrs: {
        col: _vm.message.isOwner ? 1 : 0,
        orientation: "horizontal",
        borderRadius: "5",
        borderWidth: "0",
        borderColor: "#ffffff;"
      }
    },
    [
      _c("Label", {
        attrs: { text: _vm.message.text, textWrap: "true", width: "65%" }
      }),
      _vm.message.img
        ? _c("Image", {
            attrs: { height: "100", src: _vm.message.img },
            on: { tap: _vm.openPhoto }
          })
        : _vm._e(),
      _c("Label", {
        attrs: {
          text: _vm.message.time,
          width: "18%",
          verticalAlignment: "center",
          fontSize: "12"
        }
      }),
      _vm.message.delivered === null
        ? _c("Image", {
            staticClass: "logo",
            attrs: { src: "~/images/tick-1.png", width: "10" }
          })
        : _vm._e(),
      _vm.message.delivered === false
        ? _c("Image", {
            staticClass: "logo",
            attrs: { src: "~/images/tick-2.png", width: "13" }
          })
        : _vm._e(),
      _vm.message.delivered === true
        ? _c("Image", {
            staticClass: "logo",
            attrs: { src: "~/images/tick-3.png", width: "14" }
          })
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Messages.vue?vue&type=template&id=5e3fc3a7&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    [
      _c(
        "ActionBar",
        {
          staticStyle: { backgroundColor: "#075E54", color: "#ffffff" },
          attrs: {
            "ios:horizontalAlignment": "left",
            "android:horizontalAlignment": "left"
          }
        },
        [
          _c("NavigationButton", {
            attrs: { text: "<-", "android.systemIcon": "ic_menu_back" },
            on: { tap: _vm.toMainPage }
          }),
          _c(
            "GridLayout",
            {
              attrs: {
                columns: "50,auto,70",
                rows: "*",
                width: "100%",
                verticalAlignment: "center",
                alignItems: "center",
                justifyItems: "center",
                "ios:horizontalAlignment": "left",
                "android:horizontalAlignment": "left"
              }
            },
            [
              _c("Image", {
                staticClass: "thumb img-circle",
                attrs: {
                  col: "0",
                  row: "0",
                  src: _vm.photoSrc,
                  height: "40",
                  width: "40"
                }
              }),
              _c("Label", {
                attrs: {
                  text: _vm.opponentName,
                  col: "1",
                  row: "0",
                  alignSelf: "center",
                  width: "60%",
                  fontSize: "18",
                  height: "20"
                }
              }),
              _c("Label", {
                attrs: {
                  text: "online",
                  width: "30",
                  col: "2",
                  row: "0",
                  height: "12",
                  fontSize: "10"
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _c(
        "GridLayout",
        { attrs: { columns: "*", rows: "*, 260" } },
        [
          _c(
            "ListView",
            {
              staticStyle: {
                height: "100%",
                padding: "10px",
                backgroundColor: "#e6f7ff"
              },
              attrs: {
                row: "0",
                separatorColor: "transparent",
                items: _vm.messages,
                "+alias": "message"
              }
            },
            [
              _c("v-template", {
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(ref) {
                      var message = ref.message
                      var $index = ref.$index
                      var $even = ref.$even
                      var $odd = ref.$odd
                      return _c(
                        "GridLayout",
                        {
                          attrs: {
                            columns: message.isOwner ? "20, *" : "*, 20",
                            rows: "auto"
                          }
                        },
                        [
                          _c("MessageItem", {
                            attrs: { message: message },
                            on: { "open-photo": _vm.openPhoto }
                          })
                        ],
                        1
                      )
                    }
                  }
                ])
              })
            ],
            1
          ),
          _c("Cases", {
            attrs: { cases: _vm.cases },
            on: { select: _vm.onTapCase }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Photo.vue?vue&type=template&id=5a96fe32&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "Page",
    [
      _c(
        "FlexboxLayout",
        { attrs: { flexDirection: "row", backgroundColor: "#000" } },
        [
          _vm.src
            ? _c("Image", { attrs: { src: _vm.src } })
            : _c("Label", { attrs: { text: "Image not loaded" } })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./ sync ^\\.\\/app\\.(css|scss|less|sass)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync ^\\.\\/app\\.(css|scss|less|sass)$";

/***/ }),

/***/ "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./app.css": "./app.css",
	"./app.js": "./app.js",
	"./consts.js": "./consts.js",
	"./routes/index.js": "./routes/index.js",
	"./services/backend-service.js": "./services/backend-service.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$";

/***/ }),

/***/ "./app.css":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {global.registerModule("~nativescript-theme-core/css/core.light.css", () => __webpack_require__("../node_modules/nativescript-dev-webpack/css2json-loader.js?useForImports!../node_modules/nativescript-theme-core/css/core.light.css"));
global.registerModule("nativescript-theme-core/css/core.light.css", () => __webpack_require__("../node_modules/nativescript-dev-webpack/css2json-loader.js?useForImports!../node_modules/nativescript-theme-core/css/core.light.css"));module.exports = {"type":"stylesheet","stylesheet":{"rules":[{"type":"import","import":"'~nativescript-theme-core/css/core.light.css'"},{"type":"rule","selectors":[".btn-primary"],"declarations":[{"type":"declaration","property":"height","value":"50"},{"type":"declaration","property":"background-color","value":"#D51A1A"},{"type":"declaration","property":"border-radius","value":"5"},{"type":"declaration","property":"font-size","value":"20"},{"type":"declaration","property":"font-weight","value":"600"}]},{"type":"rule","selectors":[".btn-primary:disabled"],"declarations":[{"type":"declaration","property":"opacity","value":"0.5"}]}],"parsingErrors":[]}};;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './app.css' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("nativescript-vue");
/* harmony import */ var nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./routes/index.js");
/* harmony import */ var _services_backend_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./services/backend-service.js");

        let applicationCheckPlatform = __webpack_require__("tns-core-modules/application");
        if (applicationCheckPlatform.android && !global["__snapshot"]) {
            __webpack_require__("tns-core-modules/ui/frame");
__webpack_require__("tns-core-modules/ui/frame/activity");
        }

        
            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-regular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/index.js").hmrUpdate;
            global.__coreModulesLiveSync = global.__onLiveSync;

            global.__onLiveSync = function () {
                // handle hot updated on LiveSync
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                // the hot updates are applied, ask the modules to apply the changes
                setTimeout(() => {
                    global.__coreModulesLiveSync({ type, path });
                });
            };

            // handle hot updated on initial app start
            hmrUpdate();
        }
        
            const context = __webpack_require__("./ sync recursive (?<!\\bApp_Resources\\b.*)(?<!\\.\\/\\btests\\b\\/.*?)\\.(xml|css|js|(?<!\\.d\\.)ts|(?<!\\b_[\\w-]*\\.)scss)$");
            global.registerWebpackModules(context);
            if (true) {
                module.hot.accept(context.id, () => { 
                    console.log("HMR: Accept module '" + context.id + "' from '" + module.i + "'"); 
                });
            }
            
        __webpack_require__("tns-core-modules/bundle-entry-points");
        

 // Uncommment the following to see NativeScript-Vue output logs
// Vue.config.silent = false;

var backendService = new _services_backend_service__WEBPACK_IMPORTED_MODULE_2__["default"]();
nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$backendService = backendService;
new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  render: h => h("frame", [h(backendService.isLoggedIn() ? _routes__WEBPACK_IMPORTED_MODULE_1__["default"].home : _routes__WEBPACK_IMPORTED_MODULE_1__["default"].login)])
}).$start();
    
        
        
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/nativescript-dev-webpack/node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/Cases.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Cases_vue_vue_type_template_id_2e4b3d78___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Cases.vue?vue&type=template&id=2e4b3d78&");
/* harmony import */ var _Cases_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Cases.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Cases_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Cases_vue_vue_type_template_id_2e4b3d78___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Cases_vue_vue_type_template_id_2e4b3d78___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('2e4b3d78')) {
      api.createRecord('2e4b3d78', component.options)
    } else {
      api.reload('2e4b3d78', component.options)
    }
    module.hot.accept("./components/Cases.vue?vue&type=template&id=2e4b3d78&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Cases_vue_vue_type_template_id_2e4b3d78___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Cases.vue?vue&type=template&id=2e4b3d78&");
(function () {
      api.rerender('2e4b3d78', {
        render: _Cases_vue_vue_type_template_id_2e4b3d78___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Cases_vue_vue_type_template_id_2e4b3d78___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/Cases.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Cases.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Cases_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Cases.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Cases_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Cases.vue?vue&type=template&id=2e4b3d78&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Cases_vue_vue_type_template_id_2e4b3d78___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Cases.vue?vue&type=template&id=2e4b3d78&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Cases_vue_vue_type_template_id_2e4b3d78___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Cases_vue_vue_type_template_id_2e4b3d78___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/Home.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Home_vue_vue_type_template_id_67410f3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Home.vue?vue&type=template&id=67410f3a&");
/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Home_vue_vue_type_template_id_67410f3a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Home_vue_vue_type_template_id_67410f3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('67410f3a')) {
      api.createRecord('67410f3a', component.options)
    } else {
      api.reload('67410f3a', component.options)
    }
    module.hot.accept("./components/Home.vue?vue&type=template&id=67410f3a&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Home_vue_vue_type_template_id_67410f3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Home.vue?vue&type=template&id=67410f3a&");
(function () {
      api.rerender('67410f3a', {
        render: _Home_vue_vue_type_template_id_67410f3a___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Home_vue_vue_type_template_id_67410f3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/Home.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Home.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Home.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Home.vue?vue&type=template&id=67410f3a&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_67410f3a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Home.vue?vue&type=template&id=67410f3a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_67410f3a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_67410f3a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/Login.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Login_vue_vue_type_template_id_c27482c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Login.vue?vue&type=template&id=c27482c4&scoped=true&");
/* harmony import */ var _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Login_vue_vue_type_style_index_0_id_c27482c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/Login.vue?vue&type=style&index=0&id=c27482c4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Login_vue_vue_type_template_id_c27482c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Login_vue_vue_type_template_id_c27482c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "c27482c4",
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('c27482c4')) {
      api.createRecord('c27482c4', component.options)
    } else {
      api.reload('c27482c4', component.options)
    }
    module.hot.accept("./components/Login.vue?vue&type=template&id=c27482c4&scoped=true&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Login_vue_vue_type_template_id_c27482c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Login.vue?vue&type=template&id=c27482c4&scoped=true&");
(function () {
      api.rerender('c27482c4', {
        render: _Login_vue_vue_type_template_id_c27482c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Login_vue_vue_type_template_id_c27482c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/Login.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Login.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Login.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Login.vue?vue&type=style&index=0&id=c27482c4&scoped=true&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_c27482c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/Login.vue?vue&type=style&index=0&id=c27482c4&scoped=true&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_c27482c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_c27482c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_c27482c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_c27482c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_style_index_0_id_c27482c4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/Login.vue?vue&type=template&id=c27482c4&scoped=true&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_c27482c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Login.vue?vue&type=template&id=c27482c4&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_c27482c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Login_vue_vue_type_template_id_c27482c4_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/MessageItem.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MessageItem_vue_vue_type_template_id_2cc9c8af___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/MessageItem.vue?vue&type=template&id=2cc9c8af&");
/* harmony import */ var _MessageItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/MessageItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MessageItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MessageItem_vue_vue_type_template_id_2cc9c8af___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MessageItem_vue_vue_type_template_id_2cc9c8af___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('2cc9c8af')) {
      api.createRecord('2cc9c8af', component.options)
    } else {
      api.reload('2cc9c8af', component.options)
    }
    module.hot.accept("./components/MessageItem.vue?vue&type=template&id=2cc9c8af&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _MessageItem_vue_vue_type_template_id_2cc9c8af___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/MessageItem.vue?vue&type=template&id=2cc9c8af&");
(function () {
      api.rerender('2cc9c8af', {
        render: _MessageItem_vue_vue_type_template_id_2cc9c8af___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _MessageItem_vue_vue_type_template_id_2cc9c8af___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/MessageItem.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/MessageItem.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/MessageItem.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageItem_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/MessageItem.vue?vue&type=template&id=2cc9c8af&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageItem_vue_vue_type_template_id_2cc9c8af___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/MessageItem.vue?vue&type=template&id=2cc9c8af&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageItem_vue_vue_type_template_id_2cc9c8af___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MessageItem_vue_vue_type_template_id_2cc9c8af___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/Messages.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Messages_vue_vue_type_template_id_5e3fc3a7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Messages.vue?vue&type=template&id=5e3fc3a7&");
/* harmony import */ var _Messages_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Messages.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Messages_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/Messages.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Messages_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Messages_vue_vue_type_template_id_5e3fc3a7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Messages_vue_vue_type_template_id_5e3fc3a7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('5e3fc3a7')) {
      api.createRecord('5e3fc3a7', component.options)
    } else {
      api.reload('5e3fc3a7', component.options)
    }
    module.hot.accept("./components/Messages.vue?vue&type=template&id=5e3fc3a7&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Messages_vue_vue_type_template_id_5e3fc3a7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Messages.vue?vue&type=template&id=5e3fc3a7&");
(function () {
      api.rerender('5e3fc3a7', {
        render: _Messages_vue_vue_type_template_id_5e3fc3a7___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Messages_vue_vue_type_template_id_5e3fc3a7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/Messages.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Messages.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Messages_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Messages.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Messages_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Messages.vue?vue&type=style&index=0&lang=css&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Messages_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-dev-webpack/style-hot-loader.js!../node_modules/nativescript-dev-webpack/apply-css-loader.js!../node_modules/css-loader/index.js?!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/vue-loader/lib/index.js?!./components/Messages.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Messages_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Messages_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Messages_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Messages_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_nativescript_dev_webpack_style_hot_loader_js_node_modules_nativescript_dev_webpack_apply_css_loader_js_node_modules_css_loader_index_js_ref_3_2_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Messages_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./components/Messages.vue?vue&type=template&id=5e3fc3a7&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Messages_vue_vue_type_template_id_5e3fc3a7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Messages.vue?vue&type=template&id=5e3fc3a7&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Messages_vue_vue_type_template_id_5e3fc3a7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Messages_vue_vue_type_template_id_5e3fc3a7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./components/Photo.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Photo_vue_vue_type_template_id_5a96fe32___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Photo.vue?vue&type=template&id=5a96fe32&");
/* harmony import */ var _Photo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Photo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Photo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Photo_vue_vue_type_template_id_5a96fe32___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Photo_vue_vue_type_template_id_5a96fe32___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (true) {
  var api = __webpack_require__("../node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__("../node_modules/nativescript-vue/dist/index.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('5a96fe32')) {
      api.createRecord('5a96fe32', component.options)
    } else {
      api.reload('5a96fe32', component.options)
    }
    module.hot.accept("./components/Photo.vue?vue&type=template&id=5a96fe32&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _Photo_vue_vue_type_template_id_5a96fe32___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Photo.vue?vue&type=template&id=5a96fe32&");
(function () {
      api.rerender('5a96fe32', {
        render: _Photo_vue_vue_type_template_id_5a96fe32___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _Photo_vue_vue_type_template_id_5a96fe32___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "components/Photo.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./components/Photo.vue?vue&type=script&lang=js&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Photo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/babel-loader/lib/index.js!../node_modules/vue-loader/lib/index.js?!./components/Photo.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Photo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./components/Photo.vue?vue&type=template&id=5a96fe32&":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Photo_vue_vue_type_template_id_5a96fe32___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!./components/Photo.vue?vue&type=template&id=5a96fe32&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Photo_vue_vue_type_template_id_5a96fe32___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Photo_vue_vue_type_template_id_5a96fe32___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./consts.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Consts", function() { return Consts; });
var Consts = {
  APP_NAME: 'Dating Simulator'
};


/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = JSON.parse("{\"android\":{\"v8Flags\":\"--expose_gc\",\"forceLog\":true,\"markingMode\":\"none\"},\"main\":\"app.js\",\"name\":\"tns-template-vue\",\"version\":\"3.2.0\"}");

/***/ }),

/***/ "./routes/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./components/Login.vue");
/* harmony import */ var _components_Home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./components/Home.vue");
/* harmony import */ var _components_Messages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./components/Messages.vue");
/* harmony import */ var _components_Photo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./components/Photo.vue");




var routes = {
  login: _components_Login__WEBPACK_IMPORTED_MODULE_0__["default"],
  home: _components_Home__WEBPACK_IMPORTED_MODULE_1__["default"],
  messages: _components_Messages__WEBPACK_IMPORTED_MODULE_2__["default"],
  photo: _components_Photo__WEBPACK_IMPORTED_MODULE_3__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (routes);

/***/ }),

/***/ "./services/backend-service.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BackendService; });
// The following is a sample implementation of a backend service using Progress Kinvey (https://www.progress.com/kinvey).
// Feel free to swap in your own service / APIs / etc here for your own apps.
//import * as Kinvey from "kinvey-nativescript-sdk";

/*Kinvey.init({
    appKey: "kid_SyY8LYO8M",
    appSecret: "09282985d7c540f7b076a9c7fd884c77"
});*/
class BackendService {
  isLoggedIn() {
    //return !!Kinvey.User.getActiveUser();
    return true;
  }

  login(user) {
    //return Kinvey.User.login(user.email, user.password);
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  logout() {
    //return Kinvey.User.logout();
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  register(user) {
    //return Kinvey.User.signup({ username: user.email, password: user.password });
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  getContacts(user) {
    return new Promise((resolve, reject) => {
      var users = [{
        id: "11",
        text: "Лида",
        src: "https://i.pinimg.com/236x/54/57/28/54572848f27e6e26d955226b1d343305.jpg"
      }, {
        id: "13",
        text: "Рома",
        src: "https://images.pexels.com/photos/2099225/pexels-photo-2099225.jpeg?auto=compress&cs=tinysrgb&w=200"
      }];
      resolve(users);
    });
  }

  getMessages(user) {
    return new Promise((resolve, reject) => {
      resolve([{
        isOwner: false,
        time: "22.01 11:00",
        delivered: true,
        text: "Hi!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: false,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!",
        img: "https://i.pinimg.com/236x/54/57/28/54572848f27e6e26d955226b1d343305.jpg"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: true,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: false,
        text: "Hello!"
      }, {
        isOwner: true,
        time: "22.01 11:20",
        delivered: null,
        text: "Hello! Hello!Hello! Hello!Hello! Hello!Hello! Hello! Hello! Hello! Hello! Hello! Hello!"
      }]);
    });
  }

  getCurrentStatus(user) {
    return new Promise((resolve, reject) => {
      resolve({
        online: true,
        responseCases: [{
          id: 1,
          text: 'Hello'
        }, {
          id: 4,
          text: 'Bye'
        }]
      });
    });
  }

  selectCase(selectedCase) {
    return new Promise((resolve, reject) => {
      console.log('selectCase', selectedCase);
      resolve();
    });
  }

}

/***/ }),

/***/ "nativescript-vue":
/***/ (function(module, exports) {

module.exports = require("nativescript-vue");

/***/ }),

/***/ "tns-core-modules/application":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/application");

/***/ }),

/***/ "tns-core-modules/bundle-entry-points":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/bundle-entry-points");

/***/ }),

/***/ "tns-core-modules/data/observable-array":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/data/observable-array");

/***/ }),

/***/ "tns-core-modules/file-system":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/file-system");

/***/ }),

/***/ "tns-core-modules/platform":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/platform");

/***/ }),

/***/ "tns-core-modules/text/formatted-string":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/text/formatted-string");

/***/ }),

/***/ "tns-core-modules/text/span":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/text/span");

/***/ }),

/***/ "tns-core-modules/ui/action-bar":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/action-bar");

/***/ }),

/***/ "tns-core-modules/ui/activity-indicator":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/activity-indicator");

/***/ }),

/***/ "tns-core-modules/ui/border":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/border");

/***/ }),

/***/ "tns-core-modules/ui/bottom-navigation":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/bottom-navigation");

/***/ }),

/***/ "tns-core-modules/ui/button":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/button");

/***/ }),

/***/ "tns-core-modules/ui/content-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/content-view");

/***/ }),

/***/ "tns-core-modules/ui/core/view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/core/view");

/***/ }),

/***/ "tns-core-modules/ui/date-picker":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/date-picker");

/***/ }),

/***/ "tns-core-modules/ui/frame":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/frame");

/***/ }),

/***/ "tns-core-modules/ui/frame/activity":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/frame/activity");

/***/ }),

/***/ "tns-core-modules/ui/html-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/html-view");

/***/ }),

/***/ "tns-core-modules/ui/image":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/image");

/***/ }),

/***/ "tns-core-modules/ui/image-cache":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/image-cache");

/***/ }),

/***/ "tns-core-modules/ui/label":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/label");

/***/ }),

/***/ "tns-core-modules/ui/layouts/absolute-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/absolute-layout");

/***/ }),

/***/ "tns-core-modules/ui/layouts/dock-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/dock-layout");

/***/ }),

/***/ "tns-core-modules/ui/layouts/flexbox-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/flexbox-layout");

/***/ }),

/***/ "tns-core-modules/ui/layouts/grid-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/grid-layout");

/***/ }),

/***/ "tns-core-modules/ui/layouts/layout-base":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/layout-base");

/***/ }),

/***/ "tns-core-modules/ui/layouts/stack-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/stack-layout");

/***/ }),

/***/ "tns-core-modules/ui/layouts/wrap-layout":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/layouts/wrap-layout");

/***/ }),

/***/ "tns-core-modules/ui/list-picker":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/list-picker");

/***/ }),

/***/ "tns-core-modules/ui/list-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/list-view");

/***/ }),

/***/ "tns-core-modules/ui/page":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/page");

/***/ }),

/***/ "tns-core-modules/ui/placeholder":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/placeholder");

/***/ }),

/***/ "tns-core-modules/ui/progress":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/progress");

/***/ }),

/***/ "tns-core-modules/ui/proxy-view-container":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/proxy-view-container");

/***/ }),

/***/ "tns-core-modules/ui/scroll-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/scroll-view");

/***/ }),

/***/ "tns-core-modules/ui/search-bar":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/search-bar");

/***/ }),

/***/ "tns-core-modules/ui/segmented-bar":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/segmented-bar");

/***/ }),

/***/ "tns-core-modules/ui/slider":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/slider");

/***/ }),

/***/ "tns-core-modules/ui/styling/style-scope":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/styling/style-scope");

/***/ }),

/***/ "tns-core-modules/ui/switch":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/switch");

/***/ }),

/***/ "tns-core-modules/ui/tab-navigation-base/tab-content-item":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/tab-navigation-base/tab-content-item");

/***/ }),

/***/ "tns-core-modules/ui/tab-navigation-base/tab-strip":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/tab-navigation-base/tab-strip");

/***/ }),

/***/ "tns-core-modules/ui/tab-navigation-base/tab-strip-item":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/tab-navigation-base/tab-strip-item");

/***/ }),

/***/ "tns-core-modules/ui/tab-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/tab-view");

/***/ }),

/***/ "tns-core-modules/ui/tabs":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/tabs");

/***/ }),

/***/ "tns-core-modules/ui/text-field":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/text-field");

/***/ }),

/***/ "tns-core-modules/ui/text-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/text-view");

/***/ }),

/***/ "tns-core-modules/ui/time-picker":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/time-picker");

/***/ }),

/***/ "tns-core-modules/ui/web-view":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/ui/web-view");

/***/ }),

/***/ "tns-core-modules/utils/types":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/utils/types");

/***/ }),

/***/ "tns-core-modules/xml":
/***/ (function(module, exports) {

module.exports = require("tns-core-modules/xml");

/***/ })

},[["./app.js","runtime","vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9DYXNlcy52dWUiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvSG9tZS52dWUiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvTG9naW4udnVlIiwid2VicGFjazovLy9jb21wb25lbnRzL01lc3NhZ2VJdGVtLnZ1ZSIsIndlYnBhY2s6Ly8vY29tcG9uZW50cy9NZXNzYWdlcy52dWUiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvUGhvdG8udnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTG9naW4udnVlPzAxNDciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NZXNzYWdlcy52dWU/MGRlMyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Nhc2VzLnZ1ZT8yZjRmIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSG9tZS52dWU/YjY2YiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0xvZ2luLnZ1ZT8zY2U4Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTWVzc2FnZUl0ZW0udnVlPzQ5MzciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NZXNzYWdlcy52dWU/Yzk0ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1Bob3RvLnZ1ZT80ZDE3Iiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Nhc2VzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Nhc2VzLnZ1ZT9kYTdmIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQ2FzZXMudnVlP2NmMWYiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Ib21lLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hvbWUudnVlPzU2MjUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Ib21lLnZ1ZT84MzQyIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTG9naW4udnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTG9naW4udnVlP2U2MDYiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Mb2dpbi52dWU/MjEyNCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0xvZ2luLnZ1ZT9mYjRmIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTWVzc2FnZUl0ZW0udnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTWVzc2FnZUl0ZW0udnVlPzk5ZWMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NZXNzYWdlSXRlbS52dWU/YzIwNiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL01lc3NhZ2VzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL01lc3NhZ2VzLnZ1ZT9kN2IxIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTWVzc2FnZXMudnVlPzU4N2YiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NZXNzYWdlcy52dWU/ZGIxZiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1Bob3RvLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1Bob3RvLnZ1ZT82YWZjIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvUGhvdG8udnVlPzliZmEiLCJ3ZWJwYWNrOi8vLy4vY29uc3RzLmpzIiwid2VicGFjazovLy8uL3JvdXRlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9iYWNrZW5kLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwibmF0aXZlc2NyaXB0LXZ1ZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL2J1bmRsZS1lbnRyeS1wb2ludHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy90ZXh0L2Zvcm1hdHRlZC1zdHJpbmdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3RleHQvc3BhblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvYWN0aW9uLWJhclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvYWN0aXZpdHktaW5kaWNhdG9yXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvdHRvbS1uYXZpZ2F0aW9uXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9idXR0b25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvbnRlbnQtdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kYXRlLXBpY2tlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lL2FjdGl2aXR5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9odG1sLXZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZS1jYWNoZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGFiZWxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2RvY2stbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2ZsZXhib3gtbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2xheW91dC1iYXNlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy93cmFwLWxheW91dFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGxhY2Vob2xkZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Byb2dyZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wcm94eS12aWV3LWNvbnRhaW5lclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlYXJjaC1iYXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlZ21lbnRlZC1iYXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NsaWRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc3R5bGluZy9zdHlsZS1zY29wZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc3dpdGNoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItbmF2aWdhdGlvbi1iYXNlL3RhYi1jb250ZW50LWl0ZW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLXN0cmlwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItbmF2aWdhdGlvbi1iYXNlL3RhYi1zdHJpcC1pdGVtXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFic1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90aW1lLXBpY2tlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvd2ViLXZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3R5cGVzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy94bWxcIiJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJCYWNrZW5kU2VydmljZSIsImJhY2tlbmRTZXJ2aWNlIiwiVnVlIiwicmVuZGVyIiwiaCIsIiRzdGFydCIsIkNvbnN0cyIsIkFQUF9OQU1FIiwibG9naW4iLCJMb2dpbiIsImhvbWUiLCJIb21lIiwibWVzc2FnZXMiLCJNZXNzYWdlcyIsInBob3RvIiwiUGhvdG8iLCJpc0xvZ2dlZEluIiwidXNlciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwibG9nb3V0IiwicmVnaXN0ZXIiLCJnZXRDb250YWN0cyIsInVzZXJzIiwiaWQiLCJ0ZXh0Iiwic3JjIiwiZ2V0TWVzc2FnZXMiLCJpc093bmVyIiwidGltZSIsImRlbGl2ZXJlZCIsImltZyIsImdldEN1cnJlbnRTdGF0dXMiLCJvbmxpbmUiLCJyZXNwb25zZUNhc2VzIiwic2VsZWN0Q2FzZSIsInNlbGVjdGVkQ2FzZSIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZQTtBQUNBLGtCQURBOztBQUVBO0FBQ0E7QUFDQSxHQUpBOztBQUtBO0FBQ0E7QUFDQTtBQUNBLEtBSEE7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7O0FBUkE7QUFMQSxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNtQkE7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBLGVBREE7QUFFQSwrREFGQTtBQUdBO0FBSEE7QUFLQSxHQVBBOztBQVFBO0FB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LGFBQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVosRUFBMEJGLFlBQTFCO0FBQ0FsQixhQUFPO0FBQ1YsS0FITSxDQUFQO0FBSUg7O0FBM0srQixDOzs7Ozs7O0FDVnBDLDZDOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSxpRTs7Ozs7OztBQ0FBLG1FOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSxzRDs7Ozs7OztBQ0FBLG1FOzs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7QUNBQSwyRDs7Ozs7OztBQ0FBLG1FOzs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7QUNBQSxrRTs7Ozs7OztBQ0FBLHVEOzs7Ozs7O0FDQUEsNkQ7Ozs7Ozs7QUNBQSwwRDs7Ozs7OztBQ0FBLDREOzs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7QUNBQSwrRDs7Ozs7OztBQ0FBLDBEOzs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7QUNBQSw0RDs7Ozs7OztBQ0FBLHNEOzs7Ozs7O0FDQUEsd0U7Ozs7Ozs7QUNBQSxvRTs7Ozs7OztBQ0FBLHVFOzs7Ozs7O0FDQUEsb0U7Ozs7Ozs7QUNBQSxvRTs7Ozs7OztBQ0FBLHFFOzs7Ozs7O0FDQUEsb0U7Ozs7Ozs7QUNBQSw0RDs7Ozs7OztBQ0FBLDBEOzs7Ozs7O0FDQUEscUQ7Ozs7Ozs7QUNBQSw0RDs7Ozs7OztBQ0FBLHlEOzs7Ozs7O0FDQUEscUU7Ozs7Ozs7QUNBQSw0RDs7Ozs7OztBQ0FBLDJEOzs7Ozs7O0FDQUEsOEQ7Ozs7Ozs7QUNBQSx1RDs7Ozs7OztBQ0FBLG9FOzs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7QUNBQSxxRjs7Ozs7OztBQ0FBLDhFOzs7Ozs7O0FDQUEsbUY7Ozs7Ozs7QUNBQSx5RDs7Ozs7OztBQ0FBLHFEOzs7Ozs7O0FDQUEsMkQ7Ozs7Ozs7QUNBQSwwRDs7Ozs7OztBQ0FBLDREOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSx5RDs7Ozs7OztBQ0FBLGlEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIHJvd3M9XCJhdXRvLCBhdXRvLCBhdXRvLCBhdXRvXCIgd2lkdGg9XCIxMDAlXCIgcm93PVwiMVwiXG4gICAgICAgIGJhY2tncm91bmRDb2xvcj1cImxpZ2h0Z3JheVwiPlxuICAgICAgICA8dGVtcGxhdGUgdi1mb3I9XCIoaXRlbSwgaW5kZXgpIGluIGNhc2VzXCI+XG4gICAgICAgICAgICA8QnV0dG9uIDp0ZXh0PVwiaXRlbVwiIDpyb3c9XCJpbmRleFwiIEB0YXA9XCJvblRhcENhc2UoaW5kZXgpXCIgLz5cbiAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPCEtLSBCdXR0b24gdGV4dD1cIkJ1dHRvblwiIEB0YXA9XCJvbkJ1dHRvblRhcFwiIC8gLS0+XG4gICAgPC9HcmlkTGF5b3V0PlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IFtcImNhc2VzXCJdLFxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBvbkJ1dHRvblRhcCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdzZWxlY3QnKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uVGFwQ2FzZShpbmRleCkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJlbWl0IHNlbGVjdFwiLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdChcInNlbGVjdFwiLCBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbjwvc3R5bGU+IiwiPHRlbXBsYXRlPlxuICAgIDxQYWdlPlxuICAgICAgICA8QWN0aW9uQmFyIDp0aXRsZT1cIkNvbnN0cy5BUFBfTkFNRVwiPlxuICAgICAgICAgICAgPEFjdGlvbkl0ZW0gdGFwPVwib25EZWxldGVcIiBpb3Muc3lzdGVtSWNvbj1cIjlcIiBpb3MucG9zaXRpb249XCJsZWZ0XCJcbiAgICAgICAgICAgICAgICBhbmRyb2lkLnN5c3RlbUljb249XCJpY19tZW51X3ByZWZlcmVuY2VzXCJcbiAgICAgICAgICAgICAgICBhbmRyb2lkLnBvc2l0aW9uPVwiYWN0aW9uQmFyXCI+XG4gICAgICAgICAgICA8L0FjdGlvbkl0ZW0+XG4gICAgICAgICAgICA8QWN0aW9uSXRlbSBAdGFwPVwidGFwTG9nb3V0KClcIiBpb3Muc3lzdGVtSWNvbj1cIjlcIlxuICAgICAgICAgICAgICAgIGlvcy5wb3NpdGlvbj1cImxlZnRcIiBhbmRyb2lkLnN5c3RlbUljb249XCJpY19sb2NrX2xvY2tcIlxuICAgICAgICAgICAgICAgIGFuZHJvaWQucG9zaXRpb249XCJhY3Rpb25CYXJcIj5cbiAgICAgICAgICAgIDwvQWN0aW9uSXRlbT5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG5cbiAgICAgICAgPFNjcm9sbFZpZXc+XG4gICAgICAgICAgICA8TGlzdFZpZXcgZm9yPVwiaXRlbSBpbiBpdGVtc1wiIGNsYXNzPVwibGlzdC1ncm91cFwiXG4gICAgICAgICAgICAgICAgQGl0ZW1UYXA9XCJvbkl0ZW1UYXBcIj5cbiAgICAgICAgICAgICAgICA8di10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIiByb3dzPVwiKlwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zPVwiYXV0bywgKlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEltYWdlIHJvdz1cIjBcIiBjb2w9XCIwXCIgOnNyYz1cIml0ZW0uc3JjXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRodW1iIGltZy1jaXJjbGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPExhYmVsIHJvdz1cIjBcIiBjb2w9XCIxXCIgOnRleHQ9XCJpdGVtLnRleHRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICAgICAgPC92LXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9MaXN0Vmlldz5cbiAgICAgICAgPC9TY3JvbGxWaWV3PlxuXG4gICAgPC9QYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgTG9naW4gZnJvbSBcIi4vTG9naW5cIjtcbiAgICBpbXBvcnQgTWVzc2FnZXMgZnJvbSBcIi4vTWVzc2FnZXNcIjtcbiAgICBjb25zdCBDYWNoZSA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlLWNhY2hlXCIpLkNhY2hlO1xuICAgIGNvbnN0IGZyb21GaWxlID0gcmVxdWlyZShcImltYWdlLXNvdXJjZVwiKS5mcm9tRmlsZTtcbiAgICBpbXBvcnQge1xuICAgICAgICBDb25zdHNcbiAgICB9IGZyb20gXCIuLi9jb25zdHMuanNcIjtcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgICAgIENvbnN0czogQ29uc3RzLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91IGhhdmUgc3VjY2Vzc2Z1bGx5IGF1dGhlbnRpY2F0ZWQuIFRoaXMgaXMgd2hlcmUgeW91IGJ1aWxkIHlvdXIgY29yZSBhcHBsaWNhdGlvbiBmdW5jdGlvbmFsaXR5LlwiXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgdGhpcy4kYmFja2VuZFNlcnZpY2UuZ2V0Q29udGFjdHMoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBvbkl0ZW1UYXA6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAgICAgXCJOYXZpZ2F0ZSB0byBtZXNzYWdlcyBcIiArIGFyZ3MuaW5kZXggKyBcIiB0YXBwZWRcIixcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtc1thcmdzLmluZGV4XVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGVUbyhNZXNzYWdlcywge1xuICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IHRoaXMuaXRlbXNbYXJncy5pbmRleF0uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLml0ZW1zW2FyZ3MuaW5kZXhdLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwaG90bzogdGhpcy5pdGVtc1thcmdzLmluZGV4XS5zcmNcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdGFwTG9nb3V0KCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9nb3V0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGJhY2tlbmRTZXJ2aWNlLmxvZ291dCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlVG8oTG9naW4sIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbjwvc3R5bGU+IiwiPHRlbXBsYXRlPlxuICAgIDxQYWdlIGFjdGlvbkJhckhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgPEZsZXhib3hMYXlvdXQgY2xhc3M9XCJwYWdlXCI+XG4gICAgICAgICAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJmb3JtXCI+XG4gICAgICAgICAgICAgICAgPEltYWdlIGNsYXNzPVwibG9nb1wiIHNyYz1cIn4vaW1hZ2VzL2xvZ28ucG5nXCI+PC9JbWFnZT5cbiAgICAgICAgICAgICAgICA8TGFiZWwgY2xhc3M9XCJoZWFkZXJcIiA6dGV4dD1cIkNvbnN0cy5BUFBfTkFNRVwiPjwvTGFiZWw+XG5cbiAgICAgICAgICAgICAgICA8R3JpZExheW91dCByb3dzPVwiYXV0bywgYXV0bywgYXV0bywgYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgcm93PVwiMFwiIGNsYXNzPVwiaW5wdXQtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgY2xhc3M9XCJpbnB1dFwiIGhpbnQ9XCJFbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlzRW5hYmxlZD1cIiFwcm9jZXNzaW5nXCIga2V5Ym9hcmRUeXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jb3JyZWN0PVwiZmFsc2VcIiBhdXRvY2FwaXRhbGl6YXRpb25UeXBlPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdi1tb2RlbD1cInVzZXIuZW1haWxcIiByZXR1cm5LZXlUeXBlPVwibmV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQHJldHVyblByZXNzPVwiZm9jdXNQYXNzd29yZFwiPjwvVGV4dEZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwiaHItbGlnaHRcIj48L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCByb3c9XCIxXCIgY2xhc3M9XCJpbnB1dC1maWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZCBjbGFzcz1cImlucHV0XCIgcmVmPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppc0VuYWJsZWQ9XCIhcHJvY2Vzc2luZ1wiIGhpbnQ9XCJQYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdXJlPVwidHJ1ZVwiIHYtbW9kZWw9XCJ1c2VyLnBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6cmV0dXJuS2V5VHlwZT1cImlzTG9nZ2luZ0luID8gJ2RvbmUnIDogJ25leHQnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAcmV0dXJuUHJlc3M9XCJmb2N1c0NvbmZpcm1QYXNzd29yZFwiPjwvVGV4dEZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwiaHItbGlnaHRcIj48L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCByb3c9XCIyXCIgdi1zaG93PVwiIWlzTG9nZ2luZ0luXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgY2xhc3M9XCJpbnB1dFwiIHJlZj1cImNvbmZpcm1QYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlzRW5hYmxlZD1cIiFwcm9jZXNzaW5nXCIgaGludD1cIkNvbmZpcm0gcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3VyZT1cInRydWVcIiB2LW1vZGVsPVwidXNlci5jb25maXJtUGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybktleVR5cGU9XCJuZXh0XCI+PC9UZXh0RmllbGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgY2xhc3M9XCJoci1saWdodFwiPjwvU3RhY2tMYXlvdXQ+XG4gICAgICAgICAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IHJvdz1cIjNcIiB2LXNob3c9XCIhaXNMb2dnaW5nSW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1maWVsZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRleHRGaWVsZCBjbGFzcz1cImlucHV0XCIgcmVmPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOmlzRW5hYmxlZD1cIiFwcm9jZXNzaW5nXCIgaGludD1cIllvdXIgbmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdXJlPVwiZmFsc2VcIiB2LW1vZGVsPVwidXNlci5uYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5LZXlUeXBlPVwiZG9uZVwiPjwvVGV4dEZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwiaHItbGlnaHRcIj48L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgIDxBY3Rpdml0eUluZGljYXRvciByb3dTcGFuPVwiM1wiIDpidXN5PVwicHJvY2Vzc2luZ1wiPlxuICAgICAgICAgICAgICAgICAgICA8L0FjdGl2aXR5SW5kaWNhdG9yPlxuICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cblxuICAgICAgICAgICAgICAgIDxCdXR0b24gOnRleHQ9XCJpc0xvZ2dpbmdJbiA/ICdMb2cgSW4nIDogJ1NpZ24gVXAnXCJcbiAgICAgICAgICAgICAgICAgICAgOmlzRW5hYmxlZD1cIiFwcm9jZXNzaW5nXCIgQHRhcD1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IG0tdC0yMFwiPjwvQnV0dG9uPlxuICAgICAgICAgICAgICAgIDxMYWJlbCAqdi1zaG93PVwiaXNMb2dnaW5nSW5cIiB0ZXh0PVwiRm9yZ290IHlvdXIgcGFzc3dvcmQ/XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJsb2dpbi1sYWJlbFwiIEB0YXA9XCJmb3Jnb3RQYXNzd29yZCgpXCI+PC9MYWJlbD5cbiAgICAgICAgICAgIDwvU3RhY2tMYXlvdXQ+XG5cbiAgICAgICAgICAgIDxMYWJlbCBjbGFzcz1cImxvZ2luLWxhYmVsIHNpZ24tdXAtbGFiZWxcIiBAdGFwPVwidG9nZ2xlRm9ybVwiPlxuICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRTdHJpbmc+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICA6dGV4dD1cImlzTG9nZ2luZ0luID8gJ0RvbuKAmXQgaGF2ZSBhbiBhY2NvdW50PyAnIDogJ0JhY2sgdG8gTG9naW4nXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvU3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPFNwYW4gOnRleHQ9XCJpc0xvZ2dpbmdJbiA/ICdTaWduIHVwJyA6ICcnXCIgY2xhc3M9XCJib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgIDwvU3Bhbj5cbiAgICAgICAgICAgICAgICA8L0Zvcm1hdHRlZFN0cmluZz5cbiAgICAgICAgICAgIDwvTGFiZWw+XG4gICAgICAgIDwvRmxleGJveExheW91dD5cbiAgICA8L1BhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBIb21lIGZyb20gXCIuL0hvbWVcIjtcbiAgICBpbXBvcnQge1xuICAgICAgICBDb25zdHNcbiAgICB9IGZyb20gXCIuLi9jb25zdHMuanNcIjtcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgQ29uc3RzOiBDb25zdHMsXG4gICAgICAgICAgICAgICAgaXNMb2dnaW5nSW46IHRydWUsXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgdXNlcjoge1xuICAgICAgICAgICAgICAgICAgICBlbWFpbDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgcGFzc3dvcmQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1QYXNzd29yZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHRvZ2dsZUZvcm0oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc0xvZ2dpbmdJbiA9ICF0aGlzLmlzTG9nZ2luZ0luO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3VibWl0KCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy51c2VyLmVtYWlsIHx8ICF0aGlzLnVzZXIucGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGVydChcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiUGxlYXNlIHByb3ZpZGUgYm90aCBhbiBlbWFpbCBhZGRyZXNzIGFuZCBwYXNzd29yZC5cIlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0xvZ2dpbmdJbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2luKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGxvZ2luKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGJhY2tlbmRTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgIC5sb2dpbih0aGlzLnVzZXIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGVUbyhIb21lLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGVydChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVuZm9ydHVuYXRlbHkgd2UgY291bGQgbm90IGZpbmQgeW91ciBhY2NvdW50LlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICByZWdpc3RlcigpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy51c2VyLnBhc3N3b3JkICE9IHRoaXMudXNlci5jb25maXJtUGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGVydChcIllvdXIgcGFzc3dvcmRzIGRvIG5vdCBtYXRjaC5cIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy4kYmFja2VuZFNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgLnJlZ2lzdGVyKHRoaXMudXNlcilcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiWW91ciBhY2NvdW50IHdhcyBzdWNjZXNzZnVsbHkgY3JlYXRlZC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9nZ2luZ0luID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGVydChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIlVuZm9ydHVuYXRlbHkgd2Ugd2VyZSB1bmFibGUgdG8gY3JlYXRlIHlvdXIgYWNjb3VudC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBmb3Jnb3RQYXNzd29yZCgpIHtcbiAgICAgICAgICAgICAgICBwcm9tcHQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJGb3Jnb3QgUGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFbnRlciB0aGUgZW1haWwgYWRkcmVzcyB5b3UgdXNlZCB0byByZWdpc3RlciBmb3IgQVBQIE5BTUUgdG8gcmVzZXQgeW91ciBwYXNzd29yZC5cIixcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRUeXBlOiBcImVtYWlsXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUZXh0OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIixcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kYmFja2VuZFNlcnZpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVzZXRQYXNzd29yZChkYXRhLnRleHQudHJpbSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGVydChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiWW91ciBwYXNzd29yZCB3YXMgc3VjY2Vzc2Z1bGx5IHJlc2V0LiBQbGVhc2UgY2hlY2sgeW91ciBlbWFpbCBmb3IgaW5zdHJ1Y3Rpb25zIG9uIGNob29zaW5nIGEgbmV3IHBhc3N3b3JkLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsZXJ0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVbmZvcnR1bmF0ZWx5LCBhbiBlcnJvciBvY2N1cnJlZCByZXNldHRpbmcgeW91ciBwYXNzd29yZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBmb2N1c1Bhc3N3b3JkKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHJlZnMucGFzc3dvcmQubmF0aXZlVmlldy5mb2N1cygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZvY3VzQ29uZmlybVBhc3N3b3JkKCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0xvZ2dpbmdJbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLmNvbmZpcm1QYXNzd29yZC5uYXRpdmVWaWV3LmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYWxlcnQobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhbGVydCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkFQUCBOQU1FXCIsXG4gICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4gICAgLnBhZ2Uge1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIH1cblxuICAgIC5mb3JtIHtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDMwO1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDMwO1xuICAgICAgICBmbGV4LWdyb3c6IDI7XG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gICAgfVxuXG4gICAgLmxvZ28ge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMjtcbiAgICAgICAgaGVpZ2h0OiA5MDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgfVxuXG4gICAgLmhlYWRlciB7XG4gICAgICAgIGhvcml6b250YWwtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgZm9udC1zaXplOiAyNTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNzA7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgY29sb3I6ICNENTFBMUE7XG4gICAgfVxuXG4gICAgLmlucHV0LWZpZWxkIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjU7XG4gICAgfVxuXG4gICAgLmlucHV0IHtcbiAgICAgICAgZm9udC1zaXplOiAxODtcbiAgICAgICAgcGxhY2Vob2xkZXItY29sb3I6ICNBOEE4QTg7XG4gICAgfVxuXG4gICAgLmlucHV0OmRpc2FibGVkIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICB9XG5cbiAgICAuYnRuLXByaW1hcnkge1xuICAgICAgICBtYXJnaW46IDMwIDUgMTUgNTtcbiAgICB9XG5cbiAgICAubG9naW4tbGFiZWwge1xuICAgICAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGNvbG9yOiAjQThBOEE4O1xuICAgICAgICBmb250LXNpemU6IDE2O1xuICAgIH1cblxuICAgIC5zaWduLXVwLWxhYmVsIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjA7XG4gICAgfVxuXG4gICAgLmJvbGQge1xuICAgICAgICBjb2xvcjogIzAwMDAwMDtcbiAgICB9XG48L3N0eWxlPiIsIjx0ZW1wbGF0ZT5cbiAgICA8V3JhcExheW91dCA6Y29sPVwibWVzc2FnZS5pc093bmVyID8gMSA6IDBcIiBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIlxuICAgICAgICBib3JkZXJSYWRpdXM9XCI1XCIgOmNsYXNzPVwibWVzc2FnZS5pc093bmVyID8gJ21lc3NhZ2UtdycgOiAnbWVzc2FnZS1yJ1wiXG4gICAgICAgIGJvcmRlcldpZHRoPVwiMFwiIGJvcmRlckNvbG9yPVwiI2ZmZmZmZjtcIj5cbiAgICAgICAgPExhYmVsIDp0ZXh0PVwibWVzc2FnZS50ZXh0XCIgdGV4dFdyYXA9XCJ0cnVlXCIgd2lkdGg9XCI2NSVcIiAvPlxuICAgICAgICA8SW1hZ2Ugdi1pZj1cIm1lc3NhZ2UuaW1nXCIgaGVpZ2h0PVwiMTAwXCIgOnNyYz1cIm1lc3NhZ2UuaW1nXCJcbiAgICAgICAgICAgIEB0YXA9XCJvcGVuUGhvdG9cIiAvPlxuICAgICAgICA8TGFiZWwgOnRleHQ9XCJtZXNzYWdlLnRpbWVcIiB3aWR0aD1cIjE4JVwiIHZlcnRpY2FsQWxpZ25tZW50PVwiY2VudGVyXCJcbiAgICAgICAgICAgIGZvbnRTaXplPVwiMTJcIiAvPlxuICAgICAgICA8SW1hZ2Ugdi1pZj1cIm1lc3NhZ2UuZGVsaXZlcmVkID09PSBudWxsXCIgY2xhc3M9XCJsb2dvXCJcbiAgICAgICAgICAgIHNyYz1cIn4vaW1hZ2VzL3RpY2stMS5wbmdcIiB3aWR0aD1cIjEwXCI+PC9JbWFnZT5cbiAgICAgICAgPEltYWdlIHYtaWY9XCJtZXNzYWdlLmRlbGl2ZXJlZCA9PT0gZmFsc2VcIiBjbGFzcz1cImxvZ29cIlxuICAgICAgICAgICAgc3JjPVwifi9pbWFnZXMvdGljay0yLnBuZ1wiIHdpZHRoPVwiMTNcIj48L0ltYWdlPlxuICAgICAgICA8SW1hZ2Ugdi1pZj1cIm1lc3NhZ2UuZGVsaXZlcmVkID09PSB0cnVlXCIgY2xhc3M9XCJsb2dvXCJcbiAgICAgICAgICAgIHNyYz1cIn4vaW1hZ2VzL3RpY2stMy5wbmdcIiB3aWR0aD1cIjE0XCI+PC9JbWFnZT5cbiAgICA8L1dyYXBMYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IFtcIm1lc3NhZ2VcIl0sXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIG9wZW5QaG90bygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdvcGVuLXBob3RvJywge1xuICAgICAgICAgICAgICAgICAgICBzcmM6IHRoaXMubWVzc2FnZS5pbWdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuPC9zdHlsZT4iLCI8dGVtcGxhdGU+XG4gICAgPFBhZ2U+XG4gICAgICAgIDxBY3Rpb25CYXIgc3R5bGU9XCJiYWNrZ3JvdW5kQ29sb3I6ICMwNzVFNTQ7IGNvbG9yOiAjZmZmZmZmO1wiXG4gICAgICAgICAgICBpb3M6aG9yaXpvbnRhbEFsaWdubWVudD1cImxlZnRcIiBhbmRyb2lkOmhvcml6b250YWxBbGlnbm1lbnQ9XCJsZWZ0XCI+XG4gICAgICAgICAgICA8TmF2aWdhdGlvbkJ1dHRvbiB0ZXh0PVwiPC1cIiBhbmRyb2lkLnN5c3RlbUljb249XCJpY19tZW51X2JhY2tcIlxuICAgICAgICAgICAgICAgIEB0YXA9XCJ0b01haW5QYWdlXCI+XG4gICAgICAgICAgICA8L05hdmlnYXRpb25CdXR0b24+XG4gICAgICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiNTAsYXV0byw3MFwiIHJvd3M9XCIqXCIgd2lkdGg9XCIxMDAlXCJcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudD1cImNlbnRlclwiIGFsaWduSXRlbXM9XCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgIGp1c3RpZnlJdGVtcz1cImNlbnRlclwiIGlvczpob3Jpem9udGFsQWxpZ25tZW50PVwibGVmdFwiXG4gICAgICAgICAgICAgICAgYW5kcm9pZDpob3Jpem9udGFsQWxpZ25tZW50PVwibGVmdFwiPlxuICAgICAgICAgICAgICAgIDxJbWFnZSBjb2w9XCIwXCIgcm93PVwiMFwiIDpzcmM9XCJwaG90b1NyY1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGh1bWIgaW1nLWNpcmNsZVwiIGhlaWdodD1cIjQwXCIgd2lkdGg9XCI0MFwiIC8+XG4gICAgICAgICAgICAgICAgPExhYmVsIDp0ZXh0PVwib3Bwb25lbnROYW1lXCIgY29sPVwiMVwiIHJvdz1cIjBcIiBhbGlnblNlbGY9XCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICB3aWR0aD1cIjYwJVwiIGZvbnRTaXplPVwiMThcIiBoZWlnaHQ9XCIyMFwiIC8+XG4gICAgICAgICAgICAgICAgPExhYmVsIHRleHQ9XCJvbmxpbmVcIiB3aWR0aD1cIjMwXCIgY29sPVwiMlwiIHJvdz1cIjBcIiBoZWlnaHQ9XCIxMlwiXG4gICAgICAgICAgICAgICAgICAgIGZvbnRTaXplPVwiMTBcIiAvPlxuICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICA8L0FjdGlvbkJhcj5cblxuXG4gICAgICAgIDxHcmlkTGF5b3V0IGNvbHVtbnM9XCIqXCIgcm93cz1cIiosIDI2MFwiPlxuICAgICAgICAgICAgPExpc3RWaWV3IGZvcj1cIm1lc3NhZ2UgaW4gbWVzc2FnZXNcIiByb3c9XCIwXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImhlaWdodDoxMDAlOyBwYWRkaW5nOiAxMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjZTZmN2ZmO1wiXG4gICAgICAgICAgICAgICAgc2VwYXJhdG9yQ29sb3I9XCJ0cmFuc3BhcmVudFwiPlxuICAgICAgICAgICAgICAgIDx2LXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8R3JpZExheW91dCA6Y29sdW1ucz1cIm1lc3NhZ2UuaXNPd25lciA/ICcyMCwgKicgOiAnKiwgMjAnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M9XCJhdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TWVzc2FnZUl0ZW0gOm1lc3NhZ2U9XCJtZXNzYWdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBAb3Blbi1waG90bz1cIm9wZW5QaG90b1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgICAgICAgICA8L3YtdGVtcGxhdGU+XG4gICAgICAgICAgICA8L0xpc3RWaWV3PlxuXG4gICAgICAgICAgICA8Q2FzZXMgOmNhc2VzPVwiY2FzZXNcIiBAc2VsZWN0PVwib25UYXBDYXNlXCIgLz5cblxuICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgPC9QYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgSG9tZSBmcm9tIFwiLi9Ib21lXCI7XG4gICAgaW1wb3J0IFBob3RvIGZyb20gXCIuL1Bob3RvXCI7XG4gICAgY29uc3QgQ2FjaGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZS1jYWNoZVwiKS5DYWNoZTtcbiAgICBpbXBvcnQgTWVzc2FnZUl0ZW0gZnJvbSBcIi4vTWVzc2FnZUl0ZW1cIjtcbiAgICBpbXBvcnQgQ2FzZXMgZnJvbSBcIi4vQ2FzZXNcIjtcblxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgSG9tZSxcbiAgICAgICAgICAgIFBob3RvLFxuICAgICAgICAgICAgTWVzc2FnZUl0ZW0sXG4gICAgICAgICAgICBDYXNlc1xuICAgICAgICB9LFxuICAgICAgICBwcm9wczogW1wiaWRcIiwgXCJwaG90b1wiLCBcIm5hbWVcIl0sXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkTGlzdFBpY2tlckluZGV4OiAwLFxuICAgICAgICAgICAgICAgIG9wcG9uZW50TmFtZTogXCJcIixcbiAgICAgICAgICAgICAgICBwaG90b1NyYzogXCJ+L2ltYWdlcy9sb2dvLWNhbGwucG5nXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFtdLFxuICAgICAgICAgICAgICAgIGNhc2VzOiBbXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWVzc2FnZSBtb3VudGVkXCIsIHRoaXMuaWQsIHRoaXMucGhvdG8sIHRoaXMubmFtZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5waG90bykge1xuICAgICAgICAgICAgICAgIHRoaXMucGhvdG9TcmMgPSB0aGlzLnBob3RvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vcHBvbmVudE5hbWUgPSB0aGlzLm5hbWU7XG4gICAgICAgICAgICB0aGlzLiRiYWNrZW5kU2VydmljZS5nZXRNZXNzYWdlcyh0aGlzLmlkKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcyA9IHJlc3VsdDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kYmFja2VuZFNlcnZpY2UuZ2V0Q3VycmVudFN0YXR1cyh0aGlzLmlkKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXNlcyA9IHJlc3VsdC5yZXNwb25zZUNhc2VzLm1hcChpdGVtID0+IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgLnRleHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHRvTWFpblBhZ2UoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGVUbyhIb21lKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9uVGFwQ2FzZShpbmRleCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGJhY2tlbmRTZXJ2aWNlLnNlbGVjdENhc2UodGhpcy5jYXNlc1tpbmRleF0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb3BlblBob3RvKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZVRvKFBob3RvLCB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IGl0ZW0uc3JjXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuICAgIC5hbnN3ZXItYnRuIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzI2MjMyMztcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gICAgfVxuXG4gICAgLmZhciB7XG4gICAgICAgIGZvbnQtZmFtaWx5OiBcIkZvbnQgQXdlc29tZSA1IEZyZWVcIiwgXCJmYS1yZWd1bGFyLTQwMFwiO1xuICAgIH1cblxuICAgIC5tZXNzYWdlLXcge1xuICAgICAgICBwYWRkaW5nOiAzMHB4O1xuICAgICAgICBtYXJnaW46IDVweCA4cHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDJweCAycHggNXB4IDFweCAjNjY2O1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjY2NjYztcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2MzZmZjMztcbiAgICB9XG5cbiAgICAubWVzc2FnZS1yIHtcbiAgICAgICAgcGFkZGluZzogMzBweDtcbiAgICAgICAgbWFyZ2luOiA1cHggOHB4O1xuICAgICAgICBib3gtc2hhZG93OiAycHggMnB4IDVweCAxcHggIzY2NjtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2NjY2M7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgfVxuPC9zdHlsZT4iLCI8dGVtcGxhdGU+XG4gICAgPFBhZ2U+XG4gICAgICAgIDxGbGV4Ym94TGF5b3V0IGZsZXhEaXJlY3Rpb249XCJyb3dcIiBiYWNrZ3JvdW5kQ29sb3I9XCIjMDAwXCI+XG4gICAgICAgICAgICA8SW1hZ2Ugdi1pZj1cInNyY1wiIDpzcmM9XCJzcmNcIiAvPlxuICAgICAgICAgICAgPExhYmVsIHYtZWxzZSB0ZXh0PVwiSW1hZ2Ugbm90IGxvYWRlZFwiIC8+XG4gICAgICAgIDwvRmxleGJveExheW91dD5cbiAgICA8L1BhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGltcG9ydCBNZXNzYWdlcyBmcm9tIFwiLi9NZXNzYWdlc1wiO1xuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IFtcInNyY1wiXSxcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgdG9NZXNzYWdlcygpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZVRvKE1lc3NhZ2VzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cblxuPHN0eWxlPlxuPC9zdHlsZT4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcbi5wYWdlW2RhdGEtdi1jMjc0ODJjNF0ge1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG4uZm9ybVtkYXRhLXYtYzI3NDgyYzRdIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDMwO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDMwO1xcbiAgICBmbGV4LWdyb3c6IDI7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxufVxcbi5sb2dvW2RhdGEtdi1jMjc0ODJjNF0ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAxMjtcXG4gICAgaGVpZ2h0OiA5MDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcbi5oZWFkZXJbZGF0YS12LWMyNzQ4MmM0XSB7XFxuICAgIGhvcml6b250YWwtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1zaXplOiAyNTtcXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgbWFyZ2luLWJvdHRvbTogNzA7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgY29sb3I6ICNENTFBMUE7XFxufVxcbi5pbnB1dC1maWVsZFtkYXRhLXYtYzI3NDgyYzRdIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMjU7XFxufVxcbi5pbnB1dFtkYXRhLXYtYzI3NDgyYzRdIHtcXG4gICAgZm9udC1zaXplOiAxODtcXG4gICAgcGxhY2Vob2xkZXItY29sb3I6ICNBOEE4QTg7XFxufVxcbi5pbnB1dFtkYXRhLXYtYzI3NDgyYzRdOmRpc2FibGVkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIG9wYWNpdHk6IDAuNTtcXG59XFxuLmJ0bi1wcmltYXJ5W2RhdGEtdi1jMjc0ODJjNF0ge1xcbiAgICBtYXJnaW46IDMwIDUgMTUgNTtcXG59XFxuLmxvZ2luLWxhYmVsW2RhdGEtdi1jMjc0ODJjNF0ge1xcbiAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjQThBOEE4O1xcbiAgICBmb250LXNpemU6IDE2O1xcbn1cXG4uc2lnbi11cC1sYWJlbFtkYXRhLXYtYzI3NDgyYzRdIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMjA7XFxufVxcbi5ib2xkW2RhdGEtdi1jMjc0ODJjNF0ge1xcbiAgICBjb2xvcjogIzAwMDAwMDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG4gICAgY29uc3QgYXBwbGljYXRpb24gPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTtcbiAgICByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIpO1xuXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzLmZvckVhY2ggPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBleHBvcnRzLmZvckVhY2goY3NzRXhwb3J0ID0+IHtcbiAgICAgICAgICAgIGlmIChjc3NFeHBvcnQubGVuZ3RoID4gMSAmJiBjc3NFeHBvcnRbMV0pIHtcbiAgICAgICAgICAgICAgICAvLyBhcHBseWluZyB0aGUgc2Vjb25kIGl0ZW0gb2YgdGhlIGV4cG9ydCBhcyBpdCBjb250YWlucyB0aGUgY3NzIGNvbnRlbnRzXG4gICAgICAgICAgICAgICAgYXBwbGljYXRpb24uYWRkQ3NzKGNzc0V4cG9ydFsxXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbjtcbiAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgICBtb2R1bGUuaG90LmFjY2VwdCgpO1xuICAgICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoKCkgPT4ge1xuICAgICAgICAgICAgZ2xvYmFsLmhtclJlZnJlc2goeyB0eXBlOiAnc3R5bGUnLCBwYXRoOiAnLi9jb21wb25lbnRzL0xvZ2luLnZ1ZScgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4uYW5zd2VyLWJ0biB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICMyNjIzMjM7XFxuICAgIGNvbG9yOiAjZmZmZmZmO1xcbiAgICBmb250LXNpemU6IDE4cHg7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xcbn1cXG4uZmFyIHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJGb250IEF3ZXNvbWUgNSBGcmVlXFxcIiwgXFxcImZhLXJlZ3VsYXItNDAwXFxcIjtcXG59XFxuLm1lc3NhZ2UtdyB7XFxuICAgIHBhZGRpbmc6IDMwcHg7XFxuICAgIG1hcmdpbjogNXB4IDhweDtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA1cHggMXB4ICM2NjY7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjY2NjO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzNmZmMzO1xcbn1cXG4ubWVzc2FnZS1yIHtcXG4gICAgcGFkZGluZzogMzBweDtcXG4gICAgbWFyZ2luOiA1cHggOHB4O1xcbiAgICBib3gtc2hhZG93OiAycHggMnB4IDVweCAxcHggIzY2NjtcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2NjY2M7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuICAgIGNvbnN0IGFwcGxpY2F0aW9uID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIik7XG4gICAgcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc3R5bGluZy9zdHlsZS1zY29wZVwiKTtcblxuICAgIGlmICh0eXBlb2YgZXhwb3J0cy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZXhwb3J0cy5mb3JFYWNoKGNzc0V4cG9ydCA9PiB7XG4gICAgICAgICAgICBpZiAoY3NzRXhwb3J0Lmxlbmd0aCA+IDEgJiYgY3NzRXhwb3J0WzFdKSB7XG4gICAgICAgICAgICAgICAgLy8gYXBwbHlpbmcgdGhlIHNlY29uZCBpdGVtIG9mIHRoZSBleHBvcnQgYXMgaXQgY29udGFpbnMgdGhlIGNzcyBjb250ZW50c1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFkZENzcyhjc3NFeHBvcnRbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG47XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vY29tcG9uZW50cy9NZXNzYWdlcy52dWUnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJHcmlkTGF5b3V0XCIsXG4gICAge1xuICAgICAgYXR0cnM6IHtcbiAgICAgICAgY29sdW1uczogXCIqXCIsXG4gICAgICAgIHJvd3M6IFwiYXV0bywgYXV0bywgYXV0bywgYXV0b1wiLFxuICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgIHJvdzogXCIxXCIsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJsaWdodGdyYXlcIlxuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX3ZtLl9sKF92bS5jYXNlcywgZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICBfYyhcIkJ1dHRvblwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBpdGVtLCByb3c6IGluZGV4IH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdm0ub25UYXBDYXNlKGluZGV4KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgICAgfSlcbiAgICBdLFxuICAgIDJcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJQYWdlXCIsXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiQWN0aW9uQmFyXCIsXG4gICAgICAgIHsgYXR0cnM6IHsgdGl0bGU6IF92bS5Db25zdHMuQVBQX05BTUUgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJBY3Rpb25JdGVtXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIHRhcDogXCJvbkRlbGV0ZVwiLFxuICAgICAgICAgICAgICBcImlvcy5zeXN0ZW1JY29uXCI6IFwiOVwiLFxuICAgICAgICAgICAgICBcImlvcy5wb3NpdGlvblwiOiBcImxlZnRcIixcbiAgICAgICAgICAgICAgXCJhbmRyb2lkLnN5c3RlbUljb25cIjogXCJpY19tZW51X3ByZWZlcmVuY2VzXCIsXG4gICAgICAgICAgICAgIFwiYW5kcm9pZC5wb3NpdGlvblwiOiBcImFjdGlvbkJhclwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXCJBY3Rpb25JdGVtXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgIFwiaW9zLnN5c3RlbUljb25cIjogXCI5XCIsXG4gICAgICAgICAgICAgIFwiaW9zLnBvc2l0aW9uXCI6IFwibGVmdFwiLFxuICAgICAgICAgICAgICBcImFuZHJvaWQuc3lzdGVtSWNvblwiOiBcImljX2xvY2tfbG9ja1wiLFxuICAgICAgICAgICAgICBcImFuZHJvaWQucG9zaXRpb25cIjogXCJhY3Rpb25CYXJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgIHRhcDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF92bS50YXBMb2dvdXQoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF9jKFxuICAgICAgICBcIlNjcm9sbFZpZXdcIixcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJMaXN0Vmlld1wiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsaXN0LWdyb3VwXCIsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IGl0ZW1zOiBfdm0uaXRlbXMsIFwiK2FsaWFzXCI6IFwiaXRlbVwiIH0sXG4gICAgICAgICAgICAgIG9uOiB7IGl0ZW1UYXA6IF92bS5vbkl0ZW1UYXAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJ2LXRlbXBsYXRlXCIsIHtcbiAgICAgICAgICAgICAgICBzY29wZWRTbG90czogX3ZtLl91KFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcImRlZmF1bHRcIixcbiAgICAgICAgICAgICAgICAgICAgZm46IGZ1bmN0aW9uKHJlZikge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gcmVmLml0ZW1cbiAgICAgICAgICAgICAgICAgICAgICB2YXIgJGluZGV4ID0gcmVmLiRpbmRleFxuICAgICAgICAgICAgICAgICAgICAgIHZhciAkZXZlbiA9IHJlZi4kZXZlblxuICAgICAgICAgICAgICAgICAgICAgIHZhciAkb2RkID0gcmVmLiRvZGRcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2MoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1ncm91cC1pdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHJvd3M6IFwiKlwiLCBjb2x1bW5zOiBcImF1dG8sICpcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0aHVtYiBpbWctY2lyY2xlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjBcIiwgY29sOiBcIjBcIiwgc3JjOiBpdGVtLnNyYyB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiMFwiLCBjb2w6IFwiMVwiLCB0ZXh0OiBpdGVtLnRleHQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJQYWdlXCIsXG4gICAgeyBhdHRyczogeyBhY3Rpb25CYXJIaWRkZW46IFwidHJ1ZVwiIH0gfSxcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJGbGV4Ym94TGF5b3V0XCIsXG4gICAgICAgIHsgc3RhdGljQ2xhc3M6IFwicGFnZVwiIH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiZm9ybVwiIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxvZ29cIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyBzcmM6IFwifi9pbWFnZXMvbG9nby5wbmdcIiB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJoZWFkZXJcIixcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBfdm0uQ29uc3RzLkFQUF9OQU1FIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgICAgIHsgYXR0cnM6IHsgcm93czogXCJhdXRvLCBhdXRvLCBhdXRvLCBhdXRvXCIgfSB9LFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZmllbGRcIiwgYXR0cnM6IHsgcm93OiBcIjBcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGludDogXCJFbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpc0VuYWJsZWQ6ICFfdm0ucHJvY2Vzc2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5Ym9hcmRUeXBlOiBcImVtYWlsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jb3JyZWN0OiBcImZhbHNlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jYXBpdGFsaXphdGlvblR5cGU6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5LZXlUeXBlOiBcIm5leHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLnVzZXIuZW1haWxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5QcmVzczogX3ZtLmZvY3VzUGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0udXNlciwgXCJlbWFpbFwiLCAkZXZlbnQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIlN0YWNrTGF5b3V0XCIsIHsgc3RhdGljQ2xhc3M6IFwiaHItbGlnaHRcIiB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJpbnB1dC1maWVsZFwiLCBhdHRyczogeyByb3c6IFwiMVwiIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJwYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5hYmxlZDogIV92bS5wcm9jZXNzaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIlBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3VyZTogXCJ0cnVlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybktleVR5cGU6IF92bS5pc0xvZ2dpbmdJbiA/IFwiZG9uZVwiIDogXCJuZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS51c2VyLnBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuUHJlc3M6IF92bS5mb2N1c0NvbmZpcm1QYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KF92bS51c2VyLCBcInBhc3N3b3JkXCIsICRldmVudC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiU3RhY2tMYXlvdXRcIiwgeyBzdGF0aWNDbGFzczogXCJoci1saWdodFwiIH0pXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXNob3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICFfdm0uaXNMb2dnaW5nSW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiIWlzTG9nZ2luZ0luXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImlucHV0LWZpZWxkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjJcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwiY29uZmlybVBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVkOiAhX3ZtLnByb2Nlc3NpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiQ29uZmlybSBwYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN1cmU6IFwidHJ1ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5LZXlUeXBlOiBcIm5leHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLnVzZXIuY29uZmlybVBhc3N3b3JkXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dENoYW5nZTogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS4kc2V0KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnVzZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbmZpcm1QYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJGV2ZW50LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJTdGFja0xheW91dFwiLCB7IHN0YXRpY0NsYXNzOiBcImhyLWxpZ2h0XCIgfSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2hvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtc2hvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogIV92bS5pc0xvZ2dpbmdJbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCIhaXNMb2dnaW5nSW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZmllbGRcIixcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyByb3c6IFwiM1wiIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiVGV4dEZpZWxkXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZjogXCJuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpbnB1dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVkOiAhX3ZtLnByb2Nlc3NpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiWW91ciBuYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3VyZTogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5LZXlUeXBlOiBcImRvbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLnVzZXIubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0udXNlciwgXCJuYW1lXCIsICRldmVudC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiU3RhY2tMYXlvdXRcIiwgeyBzdGF0aWNDbGFzczogXCJoci1saWdodFwiIH0pXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfYyhcIkFjdGl2aXR5SW5kaWNhdG9yXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcm93U3BhbjogXCIzXCIsIGJ1c3k6IF92bS5wcm9jZXNzaW5nIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF9jKFwiQnV0dG9uXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJidG4gYnRuLXByaW1hcnkgbS10LTIwXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5pc0xvZ2dpbmdJbiA/IFwiTG9nIEluXCIgOiBcIlNpZ24gVXBcIixcbiAgICAgICAgICAgICAgICAgIGlzRW5hYmxlZDogIV92bS5wcm9jZXNzaW5nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjogeyB0YXA6IF92bS5zdWJtaXQgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibG9naW4tbGFiZWxcIixcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgXCIqdi1zaG93XCI6IFwiaXNMb2dnaW5nSW5cIixcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwiRm9yZ290IHlvdXIgcGFzc3dvcmQ/XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmZvcmdvdFBhc3N3b3JkKClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkxhYmVsXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxvZ2luLWxhYmVsIHNpZ24tdXAtbGFiZWxcIixcbiAgICAgICAgICAgICAgb246IHsgdGFwOiBfdm0udG9nZ2xlRm9ybSB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcIkZvcm1hdHRlZFN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIF9jKFwiU3BhblwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLmlzTG9nZ2luZ0luXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwiRG9u4oCZdCBoYXZlIGFuIGFjY291bnQ/IFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiQmFjayB0byBMb2dpblwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgX2MoXCJTcGFuXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBfdm0uaXNMb2dnaW5nSW4gPyBcIlNpZ24gdXBcIiA6IFwiXCIgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJXcmFwTGF5b3V0XCIsXG4gICAge1xuICAgICAgY2xhc3M6IF92bS5tZXNzYWdlLmlzT3duZXIgPyBcIm1lc3NhZ2Utd1wiIDogXCJtZXNzYWdlLXJcIixcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIGNvbDogX3ZtLm1lc3NhZ2UuaXNPd25lciA/IDEgOiAwLFxuICAgICAgICBvcmllbnRhdGlvbjogXCJob3Jpem9udGFsXCIsXG4gICAgICAgIGJvcmRlclJhZGl1czogXCI1XCIsXG4gICAgICAgIGJvcmRlcldpZHRoOiBcIjBcIixcbiAgICAgICAgYm9yZGVyQ29sb3I6IFwiI2ZmZmZmZjtcIlxuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgIGF0dHJzOiB7IHRleHQ6IF92bS5tZXNzYWdlLnRleHQsIHRleHRXcmFwOiBcInRydWVcIiwgd2lkdGg6IFwiNjUlXCIgfVxuICAgICAgfSksXG4gICAgICBfdm0ubWVzc2FnZS5pbWdcbiAgICAgICAgPyBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IGhlaWdodDogXCIxMDBcIiwgc3JjOiBfdm0ubWVzc2FnZS5pbWcgfSxcbiAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLm9wZW5QaG90byB9XG4gICAgICAgICAgfSlcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICBhdHRyczoge1xuICAgICAgICAgIHRleHQ6IF92bS5tZXNzYWdlLnRpbWUsXG4gICAgICAgICAgd2lkdGg6IFwiMTglXCIsXG4gICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgZm9udFNpemU6IFwiMTJcIlxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIF92bS5tZXNzYWdlLmRlbGl2ZXJlZCA9PT0gbnVsbFxuICAgICAgICA/IF9jKFwiSW1hZ2VcIiwge1xuICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibG9nb1wiLFxuICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBcIn4vaW1hZ2VzL3RpY2stMS5wbmdcIiwgd2lkdGg6IFwiMTBcIiB9XG4gICAgICAgICAgfSlcbiAgICAgICAgOiBfdm0uX2UoKSxcbiAgICAgIF92bS5tZXNzYWdlLmRlbGl2ZXJlZCA9PT0gZmFsc2VcbiAgICAgICAgPyBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxvZ29cIixcbiAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogXCJ+L2ltYWdlcy90aWNrLTIucG5nXCIsIHdpZHRoOiBcIjEzXCIgfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0ubWVzc2FnZS5kZWxpdmVyZWQgPT09IHRydWVcbiAgICAgICAgPyBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxvZ29cIixcbiAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogXCJ+L2ltYWdlcy90aWNrLTMucG5nXCIsIHdpZHRoOiBcIjE0XCIgfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJQYWdlXCIsXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiQWN0aW9uQmFyXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGF0aWNTdHlsZTogeyBiYWNrZ3JvdW5kQ29sb3I6IFwiIzA3NUU1NFwiLCBjb2xvcjogXCIjZmZmZmZmXCIgfSxcbiAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgXCJpb3M6aG9yaXpvbnRhbEFsaWdubWVudFwiOiBcImxlZnRcIixcbiAgICAgICAgICAgIFwiYW5kcm9pZDpob3Jpem9udGFsQWxpZ25tZW50XCI6IFwibGVmdFwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXCJOYXZpZ2F0aW9uQnV0dG9uXCIsIHtcbiAgICAgICAgICAgIGF0dHJzOiB7IHRleHQ6IFwiPC1cIiwgXCJhbmRyb2lkLnN5c3RlbUljb25cIjogXCJpY19tZW51X2JhY2tcIiB9LFxuICAgICAgICAgICAgb246IHsgdGFwOiBfdm0udG9NYWluUGFnZSB9XG4gICAgICAgICAgfSksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBcIjUwLGF1dG8sNzBcIixcbiAgICAgICAgICAgICAgICByb3dzOiBcIipcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBqdXN0aWZ5SXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJpb3M6aG9yaXpvbnRhbEFsaWdubWVudFwiOiBcImxlZnRcIixcbiAgICAgICAgICAgICAgICBcImFuZHJvaWQ6aG9yaXpvbnRhbEFsaWdubWVudFwiOiBcImxlZnRcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJ0aHVtYiBpbWctY2lyY2xlXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIwXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgc3JjOiBfdm0ucGhvdG9TcmMsXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiNDBcIixcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjQwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgdGV4dDogX3ZtLm9wcG9uZW50TmFtZSxcbiAgICAgICAgICAgICAgICAgIGNvbDogXCIxXCIsXG4gICAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgYWxpZ25TZWxmOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IFwiNjAlXCIsXG4gICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIxOFwiLFxuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjIwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgdGV4dDogXCJvbmxpbmVcIixcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjMwXCIsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMlwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIxMlwiLFxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTBcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApLFxuICAgICAgX2MoXG4gICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IGNvbHVtbnM6IFwiKlwiLCByb3dzOiBcIiosIDI2MFwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJMaXN0Vmlld1wiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNTdHlsZToge1xuICAgICAgICAgICAgICAgIGhlaWdodDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgcGFkZGluZzogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiNlNmY3ZmZcIlxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgc2VwYXJhdG9yQ29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgICAgICAgICBpdGVtczogX3ZtLm1lc3NhZ2VzLFxuICAgICAgICAgICAgICAgIFwiK2FsaWFzXCI6IFwibWVzc2FnZVwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi10ZW1wbGF0ZVwiLCB7XG4gICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHJlZi5tZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgdmFyICRpbmRleCA9IHJlZi4kaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgJGV2ZW4gPSByZWYuJGV2ZW5cbiAgICAgICAgICAgICAgICAgICAgICB2YXIgJG9kZCA9IHJlZi4kb2RkXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uczogbWVzc2FnZS5pc093bmVyID8gXCIyMCwgKlwiIDogXCIqLCAyMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IFwiYXV0b1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF9jKFwiTWVzc2FnZUl0ZW1cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IG1lc3NhZ2U6IG1lc3NhZ2UgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjogeyBcIm9wZW4tcGhvdG9cIjogX3ZtLm9wZW5QaG90byB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX2MoXCJDYXNlc1wiLCB7XG4gICAgICAgICAgICBhdHRyczogeyBjYXNlczogX3ZtLmNhc2VzIH0sXG4gICAgICAgICAgICBvbjogeyBzZWxlY3Q6IF92bS5vblRhcENhc2UgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJQYWdlXCIsXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiRmxleGJveExheW91dFwiLFxuICAgICAgICB7IGF0dHJzOiB7IGZsZXhEaXJlY3Rpb246IFwicm93XCIsIGJhY2tncm91bmRDb2xvcjogXCIjMDAwXCIgfSB9LFxuICAgICAgICBbXG4gICAgICAgICAgX3ZtLnNyY1xuICAgICAgICAgICAgPyBfYyhcIkltYWdlXCIsIHsgYXR0cnM6IHsgc3JjOiBfdm0uc3JjIH0gfSlcbiAgICAgICAgICAgIDogX2MoXCJMYWJlbFwiLCB7IGF0dHJzOiB7IHRleHQ6IFwiSW1hZ2Ugbm90IGxvYWRlZFwiIH0gfSlcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKVxuICAgIF0sXG4gICAgMVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC5jc3NcIjogXCIuL2FwcC5jc3NcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi8gc3luYyBeXFxcXC5cXFxcL2FwcFxcXFwuKGNzc3xzY3NzfGxlc3N8c2FzcykkXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2FwcC5jc3NcIjogXCIuL2FwcC5jc3NcIixcblx0XCIuL2FwcC5qc1wiOiBcIi4vYXBwLmpzXCIsXG5cdFwiLi9jb25zdHMuanNcIjogXCIuL2NvbnN0cy5qc1wiLFxuXHRcIi4vcm91dGVzL2luZGV4LmpzXCI6IFwiLi9yb3V0ZXMvaW5kZXguanNcIixcblx0XCIuL3NlcnZpY2VzL2JhY2tlbmQtc2VydmljZS5qc1wiOiBcIi4vc2VydmljZXMvYmFja2VuZC1zZXJ2aWNlLmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgcmVjdXJzaXZlICg/PCFcXFxcYkFwcF9SZXNvdXJjZXNcXFxcYi4qKSg/PCFcXFxcLlxcXFwvXFxcXGJ0ZXN0c1xcXFxiXFxcXC8uKj8pXFxcXC4oeG1sfGNzc3xqc3woPzwhXFxcXC5kXFxcXC4pdHN8KD88IVxcXFxiX1tcXFxcdy1dKlxcXFwuKXNjc3MpJFwiOyIsImdsb2JhbC5yZWdpc3Rlck1vZHVsZShcIn5uYXRpdmVzY3JpcHQtdGhlbWUtY29yZS9jc3MvY29yZS5saWdodC5jc3NcIiwgKCkgPT4gcmVxdWlyZShcIiFuYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svY3NzMmpzb24tbG9hZGVyP3VzZUZvckltcG9ydHMhbmF0aXZlc2NyaXB0LXRoZW1lLWNvcmUvY3NzL2NvcmUubGlnaHQuY3NzXCIpKTtcbmdsb2JhbC5yZWdpc3Rlck1vZHVsZShcIm5hdGl2ZXNjcmlwdC10aGVtZS1jb3JlL2Nzcy9jb3JlLmxpZ2h0LmNzc1wiLCAoKSA9PiByZXF1aXJlKFwiIW5hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9jc3MyanNvbi1sb2FkZXI/dXNlRm9ySW1wb3J0cyFuYXRpdmVzY3JpcHQtdGhlbWUtY29yZS9jc3MvY29yZS5saWdodC5jc3NcIikpO21vZHVsZS5leHBvcnRzID0ge1widHlwZVwiOlwic3R5bGVzaGVldFwiLFwic3R5bGVzaGVldFwiOntcInJ1bGVzXCI6W3tcInR5cGVcIjpcImltcG9ydFwiLFwiaW1wb3J0XCI6XCInfm5hdGl2ZXNjcmlwdC10aGVtZS1jb3JlL2Nzcy9jb3JlLmxpZ2h0LmNzcydcIn0se1widHlwZVwiOlwicnVsZVwiLFwic2VsZWN0b3JzXCI6W1wiLmJ0bi1wcmltYXJ5XCJdLFwiZGVjbGFyYXRpb25zXCI6W3tcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiaGVpZ2h0XCIsXCJ2YWx1ZVwiOlwiNTBcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJiYWNrZ3JvdW5kLWNvbG9yXCIsXCJ2YWx1ZVwiOlwiI0Q1MUExQVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImJvcmRlci1yYWRpdXNcIixcInZhbHVlXCI6XCI1XCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC1zaXplXCIsXCJ2YWx1ZVwiOlwiMjBcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJmb250LXdlaWdodFwiLFwidmFsdWVcIjpcIjYwMFwifV19LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5idG4tcHJpbWFyeTpkaXNhYmxlZFwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcIm9wYWNpdHlcIixcInZhbHVlXCI6XCIwLjVcIn1dfV0sXCJwYXJzaW5nRXJyb3JzXCI6W119fTs7XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vYXBwLmNzcycgfSk7XG4gICAgICAgIH0pXG4gICAgfVxuIiwiaW1wb3J0IFZ1ZSBmcm9tIFwibmF0aXZlc2NyaXB0LXZ1ZVwiO1xuXG5pbXBvcnQgcm91dGVzIGZyb20gXCIuL3JvdXRlc1wiO1xuaW1wb3J0IEJhY2tlbmRTZXJ2aWNlIGZyb20gXCIuL3NlcnZpY2VzL2JhY2tlbmQtc2VydmljZVwiO1xuXG4vLyBVbmNvbW1tZW50IHRoZSBmb2xsb3dpbmcgdG8gc2VlIE5hdGl2ZVNjcmlwdC1WdWUgb3V0cHV0IGxvZ3Ncbi8vIFZ1ZS5jb25maWcuc2lsZW50ID0gZmFsc2U7XG5cbmNvbnN0IGJhY2tlbmRTZXJ2aWNlID0gbmV3IEJhY2tlbmRTZXJ2aWNlKCk7XG5WdWUucHJvdG90eXBlLiRiYWNrZW5kU2VydmljZSA9IGJhY2tlbmRTZXJ2aWNlO1xuXG5uZXcgVnVlKHtcbiAgcmVuZGVyOiBoID0+IGgoXCJmcmFtZVwiLCBbaChiYWNrZW5kU2VydmljZS5pc0xvZ2dlZEluKCkgPyByb3V0ZXMuaG9tZSA6IHJvdXRlcy5sb2dpbildKVxufSkuJHN0YXJ0KCk7XG4iLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0Nhc2VzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yZTRiM2Q3OCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9DYXNlcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0Nhc2VzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiZDpcXFxcZ2l0aHViXFxcXG1lZXQtc2ltdWxhdG9yXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzJlNGIzZDc4JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzJlNGIzZDc4JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzJlNGIzZDc4JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9DYXNlcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MmU0YjNkNzgmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMmU0YjNkNzgnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvQ2FzZXMudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Nhc2VzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Nhc2VzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9DYXNlcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MmU0YjNkNzgmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0hvbWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTY3NDEwZjNhJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0hvbWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Ib21lLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiZDpcXFxcZ2l0aHViXFxcXG1lZXQtc2ltdWxhdG9yXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzY3NDEwZjNhJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzY3NDEwZjNhJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzY3NDEwZjNhJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Ib21lLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02NzQxMGYzYSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc2NzQxMGYzYScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiY29tcG9uZW50cy9Ib21lLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Ib21lLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hvbWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hvbWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTY3NDEwZjNhJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YzI3NDgyYzQmc2NvcGVkPXRydWUmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vTG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vTG9naW4udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9YzI3NDgyYzQmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBcImMyNzQ4MmM0XCIsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiZDpcXFxcZ2l0aHViXFxcXG1lZXQtc2ltdWxhdG9yXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJ2MyNzQ4MmM0JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2MyNzQ4MmM0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2MyNzQ4MmM0JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YzI3NDgyYzQmc2NvcGVkPXRydWUmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignYzI3NDgyYzQnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvTG9naW4udnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9YzI3NDgyYzQmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmaWQ9YzI3NDgyYzQmc2NvcGVkPXRydWUmbGFuZz1jc3MmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWMyNzQ4MmM0JnNjb3BlZD10cnVlJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9NZXNzYWdlSXRlbS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MmNjOWM4YWYmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vTWVzc2FnZUl0ZW0udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9NZXNzYWdlSXRlbS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcImQ6XFxcXGdpdGh1YlxcXFxtZWV0LXNpbXVsYXRvclxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCcyY2M5YzhhZicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCcyY2M5YzhhZicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCcyY2M5YzhhZicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vTWVzc2FnZUl0ZW0udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTJjYzljOGFmJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzJjYzljOGFmJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL01lc3NhZ2VJdGVtLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9NZXNzYWdlSXRlbS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9NZXNzYWdlSXRlbS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTWVzc2FnZUl0ZW0udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTJjYzljOGFmJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9NZXNzYWdlcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWUzZmMzYTcmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vTWVzc2FnZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9NZXNzYWdlcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmltcG9ydCBzdHlsZTAgZnJvbSBcIi4vTWVzc2FnZXMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcImQ6XFxcXGdpdGh1YlxcXFxtZWV0LXNpbXVsYXRvclxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc1ZTNmYzNhNycpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc1ZTNmYzNhNycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc1ZTNmYzNhNycsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vTWVzc2FnZXMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVlM2ZjM2E3JlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzVlM2ZjM2E3Jywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL01lc3NhZ2VzLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9NZXNzYWdlcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9NZXNzYWdlcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01lc3NhZ2VzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9Y3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svc3R5bGUtaG90LWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2FwcGx5LWNzcy1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMy0yIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01lc3NhZ2VzLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9Y3NzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01lc3NhZ2VzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ZTNmYzNhNyZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vUGhvdG8udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVhOTZmZTMyJlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL1Bob3RvLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vUGhvdG8udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJkOlxcXFxnaXRodWJcXFxcbWVldC1zaW11bGF0b3JcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNWE5NmZlMzInKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNWE5NmZlMzInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNWE5NmZlMzInLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1Bob3RvLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01YTk2ZmUzMiZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc1YTk2ZmUzMicsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiY29tcG9uZW50cy9QaG90by52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGhvdG8udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGhvdG8udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1Bob3RvLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01YTk2ZmUzMiZcIiIsImNvbnN0IENvbnN0cyA9IHtcclxuICAgIEFQUF9OQU1FOiAnRGF0aW5nIFNpbXVsYXRvcidcclxufTtcclxuXHJcbmV4cG9ydCB7IENvbnN0cyB9OyIsImltcG9ydCBMb2dpbiBmcm9tIFwiLi4vY29tcG9uZW50cy9Mb2dpblwiO1xuaW1wb3J0IEhvbWUgZnJvbSBcIi4uL2NvbXBvbmVudHMvSG9tZVwiO1xuaW1wb3J0IE1lc3NhZ2VzIGZyb20gXCIuLi9jb21wb25lbnRzL01lc3NhZ2VzXCI7XG5pbXBvcnQgUGhvdG8gZnJvbSBcIi4uL2NvbXBvbmVudHMvUGhvdG9cIjtcblxuY29uc3Qgcm91dGVzID0ge1xuICAgIGxvZ2luOiBMb2dpbixcbiAgICBob21lOiBIb21lLFxuICAgIG1lc3NhZ2VzOiBNZXNzYWdlcyxcbiAgICBwaG90bzogUGhvdG9cbn1cbmV4cG9ydCBkZWZhdWx0IHJvdXRlczsiLCIvLyBUaGUgZm9sbG93aW5nIGlzIGEgc2FtcGxlIGltcGxlbWVudGF0aW9uIG9mIGEgYmFja2VuZCBzZXJ2aWNlIHVzaW5nIFByb2dyZXNzIEtpbnZleSAoaHR0cHM6Ly93d3cucHJvZ3Jlc3MuY29tL2tpbnZleSkuXG4vLyBGZWVsIGZyZWUgdG8gc3dhcCBpbiB5b3VyIG93biBzZXJ2aWNlIC8gQVBJcyAvIGV0YyBoZXJlIGZvciB5b3VyIG93biBhcHBzLlxuXG4vL2ltcG9ydCAqIGFzIEtpbnZleSBmcm9tIFwia2ludmV5LW5hdGl2ZXNjcmlwdC1zZGtcIjtcblxuLypLaW52ZXkuaW5pdCh7XG4gICAgYXBwS2V5OiBcImtpZF9TeVk4TFlPOE1cIixcbiAgICBhcHBTZWNyZXQ6IFwiMDkyODI5ODVkN2M1NDBmN2IwNzZhOWM3ZmQ4ODRjNzdcIlxufSk7Ki9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2VuZFNlcnZpY2Uge1xuXG4gICAgaXNMb2dnZWRJbigpIHtcbiAgICAgICAgLy9yZXR1cm4gISFLaW52ZXkuVXNlci5nZXRBY3RpdmVVc2VyKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGxvZ2luKHVzZXIpIHtcbiAgICAgICAgLy9yZXR1cm4gS2ludmV5LlVzZXIubG9naW4odXNlci5lbWFpbCwgdXNlci5wYXNzd29yZCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgLy9yZXR1cm4gS2ludmV5LlVzZXIubG9nb3V0KCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKHVzZXIpIHtcbiAgICAgICAgLy9yZXR1cm4gS2ludmV5LlVzZXIuc2lnbnVwKHsgdXNlcm5hbWU6IHVzZXIuZW1haWwsIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkIH0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRDb250YWN0cyh1c2VyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1c2VycyA9IFt7XG4gICAgICAgICAgICAgICAgaWQ6IFwiMTFcIixcbiAgICAgICAgICAgICAgICB0ZXh0OiBcItCb0LjQtNCwXCIsXG4gICAgICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vaS5waW5pbWcuY29tLzIzNngvNTQvNTcvMjgvNTQ1NzI4NDhmMjdlNmUyNmQ5NTUyMjZiMWQzNDMzMDUuanBnXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiMTNcIixcbiAgICAgICAgICAgICAgICB0ZXh0OiBcItCg0L7QvNCwXCIsXG4gICAgICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vaW1hZ2VzLnBleGVscy5jb20vcGhvdG9zLzIwOTkyMjUvcGV4ZWxzLXBob3RvLTIwOTkyMjUuanBlZz9hdXRvPWNvbXByZXNzJmNzPXRpbnlzcmdiJnc9MjAwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICByZXNvbHZlKHVzZXJzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0TWVzc2FnZXModXNlcikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShbe1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHRpbWU6IFwiMjIuMDEgMTE6MDBcIixcbiAgICAgICAgICAgICAgICBkZWxpdmVyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJIaSFcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpc093bmVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRpbWU6IFwiMjIuMDEgMTE6MjBcIixcbiAgICAgICAgICAgICAgICBkZWxpdmVyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJIZWxsbyFcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpc093bmVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRpbWU6IFwiMjIuMDEgMTE6MjBcIixcbiAgICAgICAgICAgICAgICBkZWxpdmVyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJIZWxsbyFcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpc093bmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCIsXG4gICAgICAgICAgICAgICAgaW1nOiBcImh0dHBzOi8vaS5waW5pbWcuY29tLzIzNngvNTQvNTcvMjgvNTQ1NzI4NDhmMjdlNmUyNmQ5NTUyMjZiMWQzNDMzMDUuanBnXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogbnVsbCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvISBIZWxsbyFIZWxsbyEgSGVsbG8hSGVsbG8hIEhlbGxvIUhlbGxvISBIZWxsbyEgSGVsbG8hIEhlbGxvISBIZWxsbyEgSGVsbG8hIEhlbGxvIVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudFN0YXR1cyh1c2VyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICBvbmxpbmU6IHRydWUsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VDYXNlczogW1xuICAgICAgICAgICAgICAgICAgICB7IGlkOiAxLCB0ZXh0OiAnSGVsbG8nIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6IDQsIHRleHQ6ICdCeWUnIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VsZWN0Q2FzZShzZWxlY3RlZENhc2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZWxlY3RDYXNlJywgc2VsZWN0ZWRDYXNlKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdnVlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9idW5kbGUtZW50cnktcG9pbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3RleHQvZm9ybWF0dGVkLXN0cmluZ1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3RleHQvc3BhblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FjdGlvbi1iYXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9hY3Rpdml0eS1pbmRpY2F0b3JcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3JkZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9ib3R0b20tbmF2aWdhdGlvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvbnRlbnQtdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RhdGUtcGlja2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZS9hY3Rpdml0eVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2h0bWwtdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2UtY2FjaGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9kb2NrLWxheW91dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZmxleGJveC1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2dyaWQtbGF5b3V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9sYXlvdXQtYmFzZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy93cmFwLWxheW91dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3QtcGlja2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BsYWNlaG9sZGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvcHJvZ3Jlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9wcm94eS12aWV3LWNvbnRhaW5lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Njcm9sbC12aWV3XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlZ21lbnRlZC1iYXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zbGlkZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc3dpdGNoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLW5hdmlnYXRpb24tYmFzZS90YWItY29udGVudC1pdGVtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLW5hdmlnYXRpb24tYmFzZS90YWItc3RyaXBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItbmF2aWdhdGlvbi1iYXNlL3RhYi1zdHJpcC1pdGVtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWJzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC1maWVsZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RleHQtdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RpbWUtcGlja2VyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvd2ViLXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91dGlscy90eXBlc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3htbFwiKTsiXSwic291cmNlUm9vdCI6IiJ9