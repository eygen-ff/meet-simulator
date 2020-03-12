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



var nsUuid = __webpack_require__("../node_modules/nativescript-uuid/index.js");

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
      },
      deviceUuid: null
    };
  },

  mounted() {
    this.deviceUuid = nsUuid.getUUID();
    this.processing = true;
    this.$backendService.checkDeviceAutoLogin(this.deviceUuid).then(payload => {
      this.processing = false;
      /*if (payload.result === true) {
          console.log('mounted result navigate', payload);
          this.$navigateTo(Home, {
              clearHistory: true
          });
      }*/

      this.isLoggingIn = true;
      this.$navigateTo(_Home__WEBPACK_IMPORTED_MODULE_0__["default"], {
        clearHistory: true
      });
    }).catch(e => {
      console.log('auot login error', e);
      this.processing = false;
    }); //console.log('login device', this.deviceUuid);
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
	"./models/UserModel.js": "./models/UserModel.js",
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
nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a.prototype.$backendService = backendService; //Vue.prototype.$nsUuid = nsUuid;

new nativescript_vue__WEBPACK_IMPORTED_MODULE_0___default.a({
  created() {//backendService.autoLogin(nsUuid.getUUID())
  },

  data() {},

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

/***/ "./models/UserModel.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UserModel; });
class UserModel {}

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
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_UserModel_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./models/UserModel.js");
// The following is a sample implementation of a backend service using Progress Kinvey (https://www.progress.com/kinvey).
// Feel free to swap in your own service / APIs / etc here for your own apps.
//import * as Kinvey from "kinvey-nativescript-sdk";

/*Kinvey.init({
    appKey: "kid_SyY8LYO8M",
    appSecret: "09282985d7c540f7b076a9c7fd884c77"
});*/


var User = {
  isLoggedIn: false
};
class BackendService {
  constructor() {
    this.user = null;
    this.uuid = null;
  }

  isLoading() {
    return this.loading;
  }

  getHeaders() {
    return {
      'Authorization': 'uuid ' + this.uuid
    };
  }

  isLoggedIn() {
    console.log('isLoggedIn', User.isLoggedIn);
    return User.isLoggedIn;
  }

  checkDeviceAutoLogin(uuid) {
    //this.device.uuid = uuid;
    return new Promise((resolve, reject) => {
      //setTimeout(() => {
      //this.user = new UserModel();
      User.isLoggedIn = true;
      console.log('checkDeviceAutoLogin result');
      resolve({
        result: true
      }); //}, 3000);
    });
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
    var uuid = nsUuid.getUUID();
    console.log("getContacts >> The device UUID is ".concat(uuid));
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

/***/ "@nativescript/core/platform/platform":
/***/ (function(module, exports) {

module.exports = require("@nativescript/core/platform/platform");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vY29tcG9uZW50cy9DYXNlcy52dWUiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvSG9tZS52dWUiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvTG9naW4udnVlIiwid2VicGFjazovLy9jb21wb25lbnRzL01lc3NhZ2VJdGVtLnZ1ZSIsIndlYnBhY2s6Ly8vY29tcG9uZW50cy9NZXNzYWdlcy52dWUiLCJ3ZWJwYWNrOi8vL2NvbXBvbmVudHMvUGhvdG8udnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTG9naW4udnVlPzAxNDciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NZXNzYWdlcy52dWU/MGRlMyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Nhc2VzLnZ1ZT8yZjRmIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvSG9tZS52dWU/YjY2YiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0xvZ2luLnZ1ZT8zY2U4Iiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTWVzc2FnZUl0ZW0udnVlPzQ5MzciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NZXNzYWdlcy52dWU/Yzk0ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1Bob3RvLnZ1ZT80ZDE3Iiwid2VicGFjazovLy8uIHN5bmMgbm9ucmVjdXJzaXZlIF5cXC5cXC9hcHBcXC4oY3NzfHNjc3N8bGVzc3xzYXNzKSQiLCJ3ZWJwYWNrOi8vL1xcYl9bXFx3LV0qXFwuKXNjc3MpJCIsIndlYnBhY2s6Ly8vLi9hcHAuY3NzIiwid2VicGFjazovLy8uL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Nhc2VzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Nhc2VzLnZ1ZT9kYTdmIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvQ2FzZXMudnVlP2NmMWYiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Ib21lLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hvbWUudnVlPzU2MjUiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Ib21lLnZ1ZT84MzQyIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTG9naW4udnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTG9naW4udnVlP2U2MDYiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9Mb2dpbi52dWU/MjEyNCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0xvZ2luLnZ1ZT9mYjRmIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTWVzc2FnZUl0ZW0udnVlIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTWVzc2FnZUl0ZW0udnVlPzk5ZWMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NZXNzYWdlSXRlbS52dWU/YzIwNiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL01lc3NhZ2VzLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL01lc3NhZ2VzLnZ1ZT9kN2IxIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvTWVzc2FnZXMudnVlPzU4N2YiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9NZXNzYWdlcy52dWU/ZGIxZiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1Bob3RvLnZ1ZSIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1Bob3RvLnZ1ZT82YWZjIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvUGhvdG8udnVlPzliZmEiLCJ3ZWJwYWNrOi8vLy4vY29uc3RzLmpzIiwid2VicGFjazovLy8uL21vZGVscy9Vc2VyTW9kZWwuanMiLCJ3ZWJwYWNrOi8vLy4vcm91dGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2JhY2tlbmQtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAbmF0aXZlc2NyaXB0L2NvcmUvcGxhdGZvcm0vcGxhdGZvcm1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuYXRpdmVzY3JpcHQtdnVlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvYnVuZGxlLWVudHJ5LXBvaW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3RleHQvZm9ybWF0dGVkLXN0cmluZ1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdGV4dC9zcGFuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9hY3Rpb24tYmFyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9hY3Rpdml0eS1pbmRpY2F0b3JcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvYm90dG9tLW5hdmlnYXRpb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2J1dHRvblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29udGVudC12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RhdGUtcGlja2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWUvYWN0aXZpdHlcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2h0bWwtdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ltYWdlLWNhY2hlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYWJlbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZG9jay1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZmxleGJveC1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZ3JpZC1sYXlvdXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvbGF5b3V0LWJhc2VcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvc3RhY2stbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3dyYXAtbGF5b3V0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXBpY2tlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wbGFjZWhvbGRlclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvcHJvZ3Jlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Byb3h5LXZpZXctY29udGFpbmVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zY3JvbGwtdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VnbWVudGVkLWJhclwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2xpZGVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zdHlsaW5nL3N0eWxlLXNjb3BlXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLWNvbnRlbnQtaXRlbVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLW5hdmlnYXRpb24tYmFzZS90YWItc3RyaXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLXN0cmlwLWl0ZW1cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi12aWV3XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWJzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LXZpZXdcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RpbWUtcGlja2VyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidG5zLWNvcmUtbW9kdWxlcy91aS93ZWItdmlld1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInRucy1jb3JlLW1vZHVsZXMvdXRpbHMvdHlwZXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bnMtY29yZS1tb2R1bGVzL3htbFwiIl0sIm5hbWVzIjpbInJvdXRlcyIsIkJhY2tlbmRTZXJ2aWNlIiwiYmFja2VuZFNlcnZpY2UiLCJWdWUiLCJjcmVhdGVkIiwiZGF0YSIsIiRzdGFydCIsIkNvbnN0cyIsIkFQUF9OQU1FIiwiVXNlck1vZGVsIiwibG9naW4iLCJMb2dpbiIsImhvbWUiLCJIb21lIiwibWVzc2FnZXMiLCJNZXNzYWdlcyIsInBob3RvIiwiUGhvdG8iLCJVc2VyIiwiaXNMb2dnZWRJbiIsImNvbnN0cnVjdG9yIiwidXNlciIsInV1aWQiLCJpc0xvYWRpbmciLCJsb2FkaW5nIiwiZ2V0SGVhZGVycyIsImNvbnNvbGUiLCJsb2ciLCJjaGVja0RldmljZUF1dG9Mb2dpbiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVzdWx0IiwibG9nb3V0IiwicmVnaXN0ZXIiLCJnZXRDb250YWN0cyIsIm5zVXVpZCIsImdldFVVSUQiLCJ1c2VycyIsImlkIiwidGV4dCIsInNyYyIsImdldE1lc3NhZ2VzIiwiaXNPd25lciIsInRpbWUiLCJkZWxpdmVyZWQiLCJpbWciLCJnZXRDdXJyZW50U3RhdHVzIiwib25saW5lIiwicmVzcG9uc2VDYXNlcyIsInNlbGVjdENhc2UiLCJzZWxlY3RlZENhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFZ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QUksRUFBRTtBQUFmLFNBRFcsRUFFWDtBQUFFRCxZQUFFLEVBQUUsQ0FBTjtBQUFTQyxjQUFJLEVBQUU7QUFBZixTQUZXO0FBRlgsT0FBRCxDQUFQO0FBT0gsS0FSTSxDQUFQO0FBU0g7O0FBRURVLFlBQVUsQ0FBQ0MsWUFBRCxFQUFlO0FBQ3JCLFdBQU8sSUFBSXRCLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDcENMLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLFlBQVosRUFBMEJ3QixZQUExQjtBQUNBckIsYUFBTztBQUNWLEtBSE0sQ0FBUDtBQUlIOztBQTNNK0IsQzs7Ozs7OztBQ2xCcEMsaUU7Ozs7Ozs7QUNBQSw2Qzs7Ozs7OztBQ0FBLHlEOzs7Ozs7O0FDQUEsaUU7Ozs7Ozs7QUNBQSxtRTs7Ozs7OztBQ0FBLHlEOzs7Ozs7O0FDQUEsc0Q7Ozs7Ozs7QUNBQSxtRTs7Ozs7OztBQ0FBLHVEOzs7Ozs7O0FDQUEsMkQ7Ozs7Ozs7QUNBQSxtRTs7Ozs7OztBQ0FBLHVEOzs7Ozs7O0FDQUEsa0U7Ozs7Ozs7QUNBQSx1RDs7Ozs7OztBQ0FBLDZEOzs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7QUNBQSw0RDs7Ozs7OztBQ0FBLHNEOzs7Ozs7O0FDQUEsK0Q7Ozs7Ozs7QUNBQSwwRDs7Ozs7OztBQ0FBLHNEOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSxzRDs7Ozs7OztBQ0FBLHdFOzs7Ozs7O0FDQUEsb0U7Ozs7Ozs7QUNBQSx1RTs7Ozs7OztBQ0FBLG9FOzs7Ozs7O0FDQUEsb0U7Ozs7Ozs7QUNBQSxxRTs7Ozs7OztBQ0FBLG9FOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSwwRDs7Ozs7OztBQ0FBLHFEOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSx5RDs7Ozs7OztBQ0FBLHFFOzs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7QUNBQSwyRDs7Ozs7OztBQ0FBLDhEOzs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7QUNBQSxvRTs7Ozs7OztBQ0FBLHVEOzs7Ozs7O0FDQUEscUY7Ozs7Ozs7QUNBQSw4RTs7Ozs7OztBQ0FBLG1GOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSxxRDs7Ozs7OztBQ0FBLDJEOzs7Ozs7O0FDQUEsMEQ7Ozs7Ozs7QUNBQSw0RDs7Ozs7OztBQ0FBLHlEOzs7Ozs7O0FDQUEseUQ7Ozs7Ozs7QUNBQSxpRCIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cIipcIiByb3dzPVwiYXV0bywgYXV0bywgYXV0bywgYXV0b1wiIHdpZHRoPVwiMTAwJVwiIHJvdz1cIjFcIlxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I9XCJsaWdodGdyYXlcIj5cbiAgICAgICAgPHRlbXBsYXRlIHYtZm9yPVwiKGl0ZW0sIGluZGV4KSBpbiBjYXNlc1wiPlxuICAgICAgICAgICAgPEJ1dHRvbiA6dGV4dD1cIml0ZW1cIiA6cm93PVwiaW5kZXhcIiBAdGFwPVwib25UYXBDYXNlKGluZGV4KVwiIC8+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgIDwhLS0gQnV0dG9uIHRleHQ9XCJCdXR0b25cIiBAdGFwPVwib25CdXR0b25UYXBcIiAvIC0tPlxuICAgIDwvR3JpZExheW91dD5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOiBbXCJjYXNlc1wiXSxcbiAgICAgICAgZGF0YSgpIHtcbiAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgb25CdXR0b25UYXAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0Jyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblRhcENhc2UoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZW1pdCBzZWxlY3RcIiwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoXCJzZWxlY3RcIiwgaW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG48L3N0eWxlPiIsIjx0ZW1wbGF0ZT5cbiAgICA8UGFnZT5cbiAgICAgICAgPEFjdGlvbkJhciA6dGl0bGU9XCJDb25zdHMuQVBQX05BTUVcIj5cbiAgICAgICAgICAgIDxBY3Rpb25JdGVtIHRhcD1cIm9uRGVsZXRlXCIgaW9zLnN5c3RlbUljb249XCI5XCIgaW9zLnBvc2l0aW9uPVwibGVmdFwiXG4gICAgICAgICAgICAgICAgYW5kcm9pZC5zeXN0ZW1JY29uPVwiaWNfbWVudV9wcmVmZXJlbmNlc1wiXG4gICAgICAgICAgICAgICAgYW5kcm9pZC5wb3NpdGlvbj1cImFjdGlvbkJhclwiPlxuICAgICAgICAgICAgPC9BY3Rpb25JdGVtPlxuICAgICAgICAgICAgPEFjdGlvbkl0ZW0gQHRhcD1cInRhcExvZ291dCgpXCIgaW9zLnN5c3RlbUljb249XCI5XCJcbiAgICAgICAgICAgICAgICBpb3MucG9zaXRpb249XCJsZWZ0XCIgYW5kcm9pZC5zeXN0ZW1JY29uPVwiaWNfbG9ja19sb2NrXCJcbiAgICAgICAgICAgICAgICBhbmRyb2lkLnBvc2l0aW9uPVwiYWN0aW9uQmFyXCI+XG4gICAgICAgICAgICA8L0FjdGlvbkl0ZW0+XG4gICAgICAgIDwvQWN0aW9uQmFyPlxuXG4gICAgICAgIDxTY3JvbGxWaWV3PlxuICAgICAgICAgICAgPExpc3RWaWV3IGZvcj1cIml0ZW0gaW4gaXRlbXNcIiBjbGFzcz1cImxpc3QtZ3JvdXBcIlxuICAgICAgICAgICAgICAgIEBpdGVtVGFwPVwib25JdGVtVGFwXCI+XG4gICAgICAgICAgICAgICAgPHYtdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDxHcmlkTGF5b3V0IGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCIgcm93cz1cIipcIlxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucz1cImF1dG8sICpcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxJbWFnZSByb3c9XCIwXCIgY29sPVwiMFwiIDpzcmM9XCJpdGVtLnNyY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJ0aHVtYiBpbWctY2lyY2xlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMYWJlbCByb3c9XCIwXCIgY29sPVwiMVwiIDp0ZXh0PVwiaXRlbS50ZXh0XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgICAgICAgICAgICAgIDwvdi10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvTGlzdFZpZXc+XG4gICAgICAgIDwvU2Nyb2xsVmlldz5cblxuICAgIDwvUGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IExvZ2luIGZyb20gXCIuL0xvZ2luXCI7XG4gICAgaW1wb3J0IE1lc3NhZ2VzIGZyb20gXCIuL01lc3NhZ2VzXCI7XG4gICAgY29uc3QgQ2FjaGUgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZS1jYWNoZVwiKS5DYWNoZTtcbiAgICBjb25zdCBmcm9tRmlsZSA9IHJlcXVpcmUoXCJpbWFnZS1zb3VyY2VcIikuZnJvbUZpbGU7XG4gICAgaW1wb3J0IHtcbiAgICAgICAgQ29uc3RzXG4gICAgfSBmcm9tIFwiLi4vY29uc3RzLmpzXCI7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgICAgICBDb25zdHM6IENvbnN0cyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIllvdSBoYXZlIHN1Y2Nlc3NmdWxseSBhdXRoZW50aWNhdGVkLiBUaGlzIGlzIHdoZXJlIHlvdSBidWlsZCB5b3VyIGNvcmUgYXBwbGljYXRpb24gZnVuY3Rpb25hbGl0eS5cIlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgbW91bnRlZCgpIHtcbiAgICAgICAgICAgIHRoaXMuJGJhY2tlbmRTZXJ2aWNlLmdldENvbnRhY3RzKCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMgPSByZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgb25JdGVtVGFwOiBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgICAgIFwiTmF2aWdhdGUgdG8gbWVzc2FnZXMgXCIgKyBhcmdzLmluZGV4ICsgXCIgdGFwcGVkXCIsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNbYXJncy5pbmRleF1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlVG8oTWVzc2FnZXMsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLml0ZW1zW2FyZ3MuaW5kZXhdLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5pdGVtc1thcmdzLmluZGV4XS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcGhvdG86IHRoaXMuaXRlbXNbYXJncy5pbmRleF0uc3JjXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHRhcExvZ291dCgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvZ291dFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRiYWNrZW5kU2VydmljZS5sb2dvdXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZVRvKExvZ2luLCB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG48L3N0eWxlPiIsIjx0ZW1wbGF0ZT5cbiAgICA8UGFnZSBhY3Rpb25CYXJIaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIDxGbGV4Ym94TGF5b3V0IGNsYXNzPVwicGFnZVwiPlxuICAgICAgICAgICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwiZm9ybVwiPlxuICAgICAgICAgICAgICAgIDxJbWFnZSBjbGFzcz1cImxvZ29cIiBzcmM9XCJ+L2ltYWdlcy9sb2dvLnBuZ1wiPjwvSW1hZ2U+XG4gICAgICAgICAgICAgICAgPExhYmVsIGNsYXNzPVwiaGVhZGVyXCIgOnRleHQ9XCJDb25zdHMuQVBQX05BTUVcIj48L0xhYmVsPlxuXG4gICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgcm93cz1cImF1dG8sIGF1dG8sIGF1dG8sIGF1dG9cIj5cbiAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IHJvdz1cIjBcIiBjbGFzcz1cImlucHV0LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIGNsYXNzPVwiaW5wdXRcIiBoaW50PVwiRW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppc0VuYWJsZWQ9XCIhcHJvY2Vzc2luZ1wiIGtleWJvYXJkVHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY29ycmVjdD1cImZhbHNlXCIgYXV0b2NhcGl0YWxpemF0aW9uVHlwZT1cIm5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHYtbW9kZWw9XCJ1c2VyLmVtYWlsXCIgcmV0dXJuS2V5VHlwZT1cIm5leHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEByZXR1cm5QcmVzcz1cImZvY3VzUGFzc3dvcmRcIj48L1RleHRGaWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBjbGFzcz1cImhyLWxpZ2h0XCI+PC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cblxuICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgcm93PVwiMVwiIGNsYXNzPVwiaW5wdXQtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgY2xhc3M9XCJpbnB1dFwiIHJlZj1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6aXNFbmFibGVkPVwiIXByb2Nlc3NpbmdcIiBoaW50PVwiUGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3VyZT1cInRydWVcIiB2LW1vZGVsPVwidXNlci5wYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOnJldHVybktleVR5cGU9XCJpc0xvZ2dpbmdJbiA/ICdkb25lJyA6ICduZXh0J1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQHJldHVyblByZXNzPVwiZm9jdXNDb25maXJtUGFzc3dvcmRcIj48L1RleHRGaWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBjbGFzcz1cImhyLWxpZ2h0XCI+PC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cblxuICAgICAgICAgICAgICAgICAgICA8U3RhY2tMYXlvdXQgcm93PVwiMlwiIHYtc2hvdz1cIiFpc0xvZ2dpbmdJblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImlucHV0LWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGV4dEZpZWxkIGNsYXNzPVwiaW5wdXRcIiByZWY9XCJjb25maXJtUGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppc0VuYWJsZWQ9XCIhcHJvY2Vzc2luZ1wiIGhpbnQ9XCJDb25maXJtIHBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN1cmU9XCJ0cnVlXCIgdi1tb2RlbD1cInVzZXIuY29uZmlybVBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5LZXlUeXBlPVwibmV4dFwiPjwvVGV4dEZpZWxkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0YWNrTGF5b3V0IGNsYXNzPVwiaHItbGlnaHRcIj48L1N0YWNrTGF5b3V0PlxuICAgICAgICAgICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCByb3c9XCIzXCIgdi1zaG93PVwiIWlzTG9nZ2luZ0luXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZmllbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxUZXh0RmllbGQgY2xhc3M9XCJpbnB1dFwiIHJlZj1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDppc0VuYWJsZWQ9XCIhcHJvY2Vzc2luZ1wiIGhpbnQ9XCJZb3VyIG5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3VyZT1cImZhbHNlXCIgdi1tb2RlbD1cInVzZXIubmFtZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuS2V5VHlwZT1cImRvbmVcIj48L1RleHRGaWVsZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdGFja0xheW91dCBjbGFzcz1cImhyLWxpZ2h0XCI+PC9TdGFja0xheW91dD5cbiAgICAgICAgICAgICAgICAgICAgPC9TdGFja0xheW91dD5cblxuICAgICAgICAgICAgICAgICAgICA8QWN0aXZpdHlJbmRpY2F0b3Igcm93U3Bhbj1cIjNcIiA6YnVzeT1cInByb2Nlc3NpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9BY3Rpdml0eUluZGljYXRvcj5cbiAgICAgICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG5cbiAgICAgICAgICAgICAgICA8QnV0dG9uIDp0ZXh0PVwiaXNMb2dnaW5nSW4gPyAnTG9nIEluJyA6ICdTaWduIFVwJ1wiXG4gICAgICAgICAgICAgICAgICAgIDppc0VuYWJsZWQ9XCIhcHJvY2Vzc2luZ1wiIEB0YXA9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBtLXQtMjBcIj48L0J1dHRvbj5cbiAgICAgICAgICAgICAgICA8TGFiZWwgKnYtc2hvdz1cImlzTG9nZ2luZ0luXCIgdGV4dD1cIkZvcmdvdCB5b3VyIHBhc3N3b3JkP1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibG9naW4tbGFiZWxcIiBAdGFwPVwiZm9yZ290UGFzc3dvcmQoKVwiPjwvTGFiZWw+XG4gICAgICAgICAgICA8L1N0YWNrTGF5b3V0PlxuXG4gICAgICAgICAgICA8TGFiZWwgY2xhc3M9XCJsb2dpbi1sYWJlbCBzaWduLXVwLWxhYmVsXCIgQHRhcD1cInRvZ2dsZUZvcm1cIj5cbiAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkU3RyaW5nPlxuICAgICAgICAgICAgICAgICAgICA8U3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgOnRleHQ9XCJpc0xvZ2dpbmdJbiA/ICdEb27igJl0IGhhdmUgYW4gYWNjb3VudD8gJyA6ICdCYWNrIHRvIExvZ2luJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8L1NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFuIDp0ZXh0PVwiaXNMb2dnaW5nSW4gPyAnU2lnbiB1cCcgOiAnJ1wiIGNsYXNzPVwiYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICA8L1NwYW4+XG4gICAgICAgICAgICAgICAgPC9Gb3JtYXR0ZWRTdHJpbmc+XG4gICAgICAgICAgICA8L0xhYmVsPlxuICAgICAgICA8L0ZsZXhib3hMYXlvdXQ+XG4gICAgPC9QYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgSG9tZSBmcm9tIFwiLi9Ib21lXCI7XG4gICAgaW1wb3J0IHtcbiAgICAgICAgQ29uc3RzXG4gICAgfSBmcm9tIFwiLi4vY29uc3RzLmpzXCI7XG4gICAgY29uc3QgbnNVdWlkID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC11dWlkXCIpO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBDb25zdHM6IENvbnN0cyxcbiAgICAgICAgICAgICAgICBpc0xvZ2dpbmdJbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcm9jZXNzaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybVBhc3N3b3JkOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZXZpY2VVdWlkOiBudWxsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LFxuICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgdGhpcy5kZXZpY2VVdWlkID0gbnNVdWlkLmdldFVVSUQoKTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiRiYWNrZW5kU2VydmljZS5jaGVja0RldmljZUF1dG9Mb2dpbih0aGlzLmRldmljZVV1aWQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKHBheWxvYWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8qaWYgKHBheWxvYWQucmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW91bnRlZCByZXN1bHQgbmF2aWdhdGUnLCBwYXlsb2FkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlVG8oSG9tZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9nZ2luZ0luID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGVUbyhIb21lLCB7Y2xlYXJIaXN0b3J5OiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2F1b3QgbG9naW4gZXJyb3InLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdsb2dpbiBkZXZpY2UnLCB0aGlzLmRldmljZVV1aWQpO1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICB0b2dnbGVGb3JtKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNMb2dnaW5nSW4gPSAhdGhpcy5pc0xvZ2dpbmdJbjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHN1Ym1pdCgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudXNlci5lbWFpbCB8fCAhdGhpcy51c2VyLnBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxlcnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBcIlBsZWFzZSBwcm92aWRlIGJvdGggYW4gZW1haWwgYWRkcmVzcyBhbmQgcGFzc3dvcmQuXCJcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNMb2dnaW5nSW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dpbigpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBsb2dpbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRiYWNrZW5kU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAubG9naW4odGhpcy51c2VyKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlVG8oSG9tZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxlcnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVbmZvcnR1bmF0ZWx5IHdlIGNvdWxkIG5vdCBmaW5kIHlvdXIgYWNjb3VudC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVnaXN0ZXIoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudXNlci5wYXNzd29yZCAhPSB0aGlzLnVzZXIuY29uZmlybVBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWxlcnQoXCJZb3VyIHBhc3N3b3JkcyBkbyBub3QgbWF0Y2guXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuJGJhY2tlbmRTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgIC5yZWdpc3Rlcih0aGlzLnVzZXIpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGVydChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvZ2dpbmdJbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxlcnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJVbmZvcnR1bmF0ZWx5IHdlIHdlcmUgdW5hYmxlIHRvIGNyZWF0ZSB5b3VyIGFjY291bnQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZm9yZ290UGFzc3dvcmQoKSB7XG4gICAgICAgICAgICAgICAgcHJvbXB0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiRm9yZ290IFBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRW50ZXIgdGhlIGVtYWlsIGFkZHJlc3MgeW91IHVzZWQgdG8gcmVnaXN0ZXIgZm9yIEFQUCBOQU1FIHRvIHJlc2V0IHlvdXIgcGFzc3dvcmQuXCIsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0VHlwZTogXCJlbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VGV4dDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCIsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsXCJcbiAgICAgICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGJhY2tlbmRTZXJ2aWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlc2V0UGFzc3dvcmQoZGF0YS50ZXh0LnRyaW0oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxlcnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIllvdXIgcGFzc3dvcmQgd2FzIHN1Y2Nlc3NmdWxseSByZXNldC4gUGxlYXNlIGNoZWNrIHlvdXIgZW1haWwgZm9yIGluc3RydWN0aW9ucyBvbiBjaG9vc2luZyBhIG5ldyBwYXNzd29yZC5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbGVydChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiVW5mb3J0dW5hdGVseSwgYW4gZXJyb3Igb2NjdXJyZWQgcmVzZXR0aW5nIHlvdXIgcGFzc3dvcmQuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZm9jdXNQYXNzd29yZCgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRyZWZzLnBhc3N3b3JkLm5hdGl2ZVZpZXcuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb2N1c0NvbmZpcm1QYXNzd29yZCgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNMb2dnaW5nSW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kcmVmcy5jb25maXJtUGFzc3dvcmQubmF0aXZlVmlldy5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGFsZXJ0KG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJBUFAgTkFNRVwiLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuICAgIC5wYWdlIHtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB9XG5cbiAgICAuZm9ybSB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAzMDtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAzMDtcbiAgICAgICAgZmxleC1ncm93OiAyO1xuICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgIH1cblxuICAgIC5sb2dvIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTI7XG4gICAgICAgIGhlaWdodDogOTA7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIH1cblxuICAgIC5oZWFkZXIge1xuICAgICAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGZvbnQtc2l6ZTogMjU7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDcwO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGNvbG9yOiAjRDUxQTFBO1xuICAgIH1cblxuICAgIC5pbnB1dC1maWVsZCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDI1O1xuICAgIH1cblxuICAgIC5pbnB1dCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTg7XG4gICAgICAgIHBsYWNlaG9sZGVyLWNvbG9yOiAjQThBOEE4O1xuICAgIH1cblxuICAgIC5pbnB1dDpkaXNhYmxlZCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgICBvcGFjaXR5OiAwLjU7XG4gICAgfVxuXG4gICAgLmJ0bi1wcmltYXJ5IHtcbiAgICAgICAgbWFyZ2luOiAzMCA1IDE1IDU7XG4gICAgfVxuXG4gICAgLmxvZ2luLWxhYmVsIHtcbiAgICAgICAgaG9yaXpvbnRhbC1hbGlnbjogY2VudGVyO1xuICAgICAgICBjb2xvcjogI0E4QThBODtcbiAgICAgICAgZm9udC1zaXplOiAxNjtcbiAgICB9XG5cbiAgICAuc2lnbi11cC1sYWJlbCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwO1xuICAgIH1cblxuICAgIC5ib2xkIHtcbiAgICAgICAgY29sb3I6ICMwMDAwMDA7XG4gICAgfVxuPC9zdHlsZT4iLCI8dGVtcGxhdGU+XG4gICAgPFdyYXBMYXlvdXQgOmNvbD1cIm1lc3NhZ2UuaXNPd25lciA/IDEgOiAwXCIgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCJcbiAgICAgICAgYm9yZGVyUmFkaXVzPVwiNVwiIDpjbGFzcz1cIm1lc3NhZ2UuaXNPd25lciA/ICdtZXNzYWdlLXcnIDogJ21lc3NhZ2UtcidcIlxuICAgICAgICBib3JkZXJXaWR0aD1cIjBcIiBib3JkZXJDb2xvcj1cIiNmZmZmZmY7XCI+XG4gICAgICAgIDxMYWJlbCA6dGV4dD1cIm1lc3NhZ2UudGV4dFwiIHRleHRXcmFwPVwidHJ1ZVwiIHdpZHRoPVwiNjUlXCIgLz5cbiAgICAgICAgPEltYWdlIHYtaWY9XCJtZXNzYWdlLmltZ1wiIGhlaWdodD1cIjEwMFwiIDpzcmM9XCJtZXNzYWdlLmltZ1wiXG4gICAgICAgICAgICBAdGFwPVwib3BlblBob3RvXCIgLz5cbiAgICAgICAgPExhYmVsIDp0ZXh0PVwibWVzc2FnZS50aW1lXCIgd2lkdGg9XCIxOCVcIiB2ZXJ0aWNhbEFsaWdubWVudD1cImNlbnRlclwiXG4gICAgICAgICAgICBmb250U2l6ZT1cIjEyXCIgLz5cbiAgICAgICAgPEltYWdlIHYtaWY9XCJtZXNzYWdlLmRlbGl2ZXJlZCA9PT0gbnVsbFwiIGNsYXNzPVwibG9nb1wiXG4gICAgICAgICAgICBzcmM9XCJ+L2ltYWdlcy90aWNrLTEucG5nXCIgd2lkdGg9XCIxMFwiPjwvSW1hZ2U+XG4gICAgICAgIDxJbWFnZSB2LWlmPVwibWVzc2FnZS5kZWxpdmVyZWQgPT09IGZhbHNlXCIgY2xhc3M9XCJsb2dvXCJcbiAgICAgICAgICAgIHNyYz1cIn4vaW1hZ2VzL3RpY2stMi5wbmdcIiB3aWR0aD1cIjEzXCI+PC9JbWFnZT5cbiAgICAgICAgPEltYWdlIHYtaWY9XCJtZXNzYWdlLmRlbGl2ZXJlZCA9PT0gdHJ1ZVwiIGNsYXNzPVwibG9nb1wiXG4gICAgICAgICAgICBzcmM9XCJ+L2ltYWdlcy90aWNrLTMucG5nXCIgd2lkdGg9XCIxNFwiPjwvSW1hZ2U+XG4gICAgPC9XcmFwTGF5b3V0PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOiBbXCJtZXNzYWdlXCJdLFxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBvcGVuUGhvdG8oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnb3Blbi1waG90bycsIHtcbiAgICAgICAgICAgICAgICAgICAgc3JjOiB0aGlzLm1lc3NhZ2UuaW1nXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbjwvc3R5bGU+IiwiPHRlbXBsYXRlPlxuICAgIDxQYWdlPlxuICAgICAgICA8QWN0aW9uQmFyIHN0eWxlPVwiYmFja2dyb3VuZENvbG9yOiAjMDc1RTU0OyBjb2xvcjogI2ZmZmZmZjtcIlxuICAgICAgICAgICAgaW9zOmhvcml6b250YWxBbGlnbm1lbnQ9XCJsZWZ0XCIgYW5kcm9pZDpob3Jpem9udGFsQWxpZ25tZW50PVwibGVmdFwiPlxuICAgICAgICAgICAgPE5hdmlnYXRpb25CdXR0b24gdGV4dD1cIjwtXCIgYW5kcm9pZC5zeXN0ZW1JY29uPVwiaWNfbWVudV9iYWNrXCJcbiAgICAgICAgICAgICAgICBAdGFwPVwidG9NYWluUGFnZVwiPlxuICAgICAgICAgICAgPC9OYXZpZ2F0aW9uQnV0dG9uPlxuICAgICAgICAgICAgPEdyaWRMYXlvdXQgY29sdW1ucz1cIjUwLGF1dG8sNzBcIiByb3dzPVwiKlwiIHdpZHRoPVwiMTAwJVwiXG4gICAgICAgICAgICAgICAgdmVydGljYWxBbGlnbm1lbnQ9XCJjZW50ZXJcIiBhbGlnbkl0ZW1zPVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICBqdXN0aWZ5SXRlbXM9XCJjZW50ZXJcIiBpb3M6aG9yaXpvbnRhbEFsaWdubWVudD1cImxlZnRcIlxuICAgICAgICAgICAgICAgIGFuZHJvaWQ6aG9yaXpvbnRhbEFsaWdubWVudD1cImxlZnRcIj5cbiAgICAgICAgICAgICAgICA8SW1hZ2UgY29sPVwiMFwiIHJvdz1cIjBcIiA6c3JjPVwicGhvdG9TcmNcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInRodW1iIGltZy1jaXJjbGVcIiBoZWlnaHQ9XCI0MFwiIHdpZHRoPVwiNDBcIiAvPlxuICAgICAgICAgICAgICAgIDxMYWJlbCA6dGV4dD1cIm9wcG9uZW50TmFtZVwiIGNvbD1cIjFcIiByb3c9XCIwXCIgYWxpZ25TZWxmPVwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg9XCI2MCVcIiBmb250U2l6ZT1cIjE4XCIgaGVpZ2h0PVwiMjBcIiAvPlxuICAgICAgICAgICAgICAgIDxMYWJlbCB0ZXh0PVwib25saW5lXCIgd2lkdGg9XCIzMFwiIGNvbD1cIjJcIiByb3c9XCIwXCIgaGVpZ2h0PVwiMTJcIlxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT1cIjEwXCIgLz5cbiAgICAgICAgICAgIDwvR3JpZExheW91dD5cbiAgICAgICAgPC9BY3Rpb25CYXI+XG5cblxuICAgICAgICA8R3JpZExheW91dCBjb2x1bW5zPVwiKlwiIHJvd3M9XCIqLCAyNjBcIj5cbiAgICAgICAgICAgIDxMaXN0VmlldyBmb3I9XCJtZXNzYWdlIGluIG1lc3NhZ2VzXCIgcm93PVwiMFwiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJoZWlnaHQ6MTAwJTsgcGFkZGluZzogMTBweDsgYmFja2dyb3VuZC1jb2xvcjogI2U2ZjdmZjtcIlxuICAgICAgICAgICAgICAgIHNlcGFyYXRvckNvbG9yPVwidHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICAgICAgICA8di10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPEdyaWRMYXlvdXQgOmNvbHVtbnM9XCJtZXNzYWdlLmlzT3duZXIgPyAnMjAsIConIDogJyosIDIwJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzPVwiYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VJdGVtIDptZXNzYWdlPVwibWVzc2FnZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQG9wZW4tcGhvdG89XCJvcGVuUGhvdG9cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L0dyaWRMYXlvdXQ+XG4gICAgICAgICAgICAgICAgPC92LXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9MaXN0Vmlldz5cblxuICAgICAgICAgICAgPENhc2VzIDpjYXNlcz1cImNhc2VzXCIgQHNlbGVjdD1cIm9uVGFwQ2FzZVwiIC8+XG5cbiAgICAgICAgPC9HcmlkTGF5b3V0PlxuICAgIDwvUGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgaW1wb3J0IEhvbWUgZnJvbSBcIi4vSG9tZVwiO1xuICAgIGltcG9ydCBQaG90byBmcm9tIFwiLi9QaG90b1wiO1xuICAgIGNvbnN0IENhY2hlID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2UtY2FjaGVcIikuQ2FjaGU7XG4gICAgaW1wb3J0IE1lc3NhZ2VJdGVtIGZyb20gXCIuL01lc3NhZ2VJdGVtXCI7XG4gICAgaW1wb3J0IENhc2VzIGZyb20gXCIuL0Nhc2VzXCI7XG5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgICAgIEhvbWUsXG4gICAgICAgICAgICBQaG90byxcbiAgICAgICAgICAgIE1lc3NhZ2VJdGVtLFxuICAgICAgICAgICAgQ2FzZXNcbiAgICAgICAgfSxcbiAgICAgICAgcHJvcHM6IFtcImlkXCIsIFwicGhvdG9cIiwgXCJuYW1lXCJdLFxuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZExpc3RQaWNrZXJJbmRleDogMCxcbiAgICAgICAgICAgICAgICBvcHBvbmVudE5hbWU6IFwiXCIsXG4gICAgICAgICAgICAgICAgcGhvdG9TcmM6IFwifi9pbWFnZXMvbG9nby1jYWxsLnBuZ1wiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbXSxcbiAgICAgICAgICAgICAgICBjYXNlczogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1lc3NhZ2UgbW91bnRlZFwiLCB0aGlzLmlkLCB0aGlzLnBob3RvLCB0aGlzLm5hbWUpO1xuICAgICAgICAgICAgaWYgKHRoaXMucGhvdG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnBob3RvU3JjID0gdGhpcy5waG90bztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub3Bwb25lbnROYW1lID0gdGhpcy5uYW1lO1xuICAgICAgICAgICAgdGhpcy4kYmFja2VuZFNlcnZpY2UuZ2V0TWVzc2FnZXModGhpcy5pZCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWVzc2FnZXMgPSByZXN1bHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGJhY2tlbmRTZXJ2aWNlLmdldEN1cnJlbnRTdGF0dXModGhpcy5pZCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FzZXMgPSByZXN1bHQucmVzcG9uc2VDYXNlcy5tYXAoaXRlbSA9PiBpdGVtXG4gICAgICAgICAgICAgICAgICAgIC50ZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICB0b01haW5QYWdlKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJG5hdmlnYXRlVG8oSG9tZSk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBvblRhcENhc2UoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRiYWNrZW5kU2VydmljZS5zZWxlY3RDYXNlKHRoaXMuY2FzZXNbaW5kZXhdKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9wZW5QaG90byhpdGVtKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGVUbyhQaG90bywge1xuICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBpdGVtLnNyY1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgICAuYW5zd2VyLWJ0biB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyNjIzMjM7XG4gICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICAgIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICAgIH1cblxuICAgIC5mYXIge1xuICAgICAgICBmb250LWZhbWlseTogXCJGb250IEF3ZXNvbWUgNSBGcmVlXCIsIFwiZmEtcmVndWxhci00MDBcIjtcbiAgICB9XG5cbiAgICAubWVzc2FnZS13IHtcbiAgICAgICAgcGFkZGluZzogMzBweDtcbiAgICAgICAgbWFyZ2luOiA1cHggOHB4O1xuICAgICAgICBib3gtc2hhZG93OiAycHggMnB4IDVweCAxcHggIzY2NjtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2NjY2M7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjM2ZmYzM7XG4gICAgfVxuXG4gICAgLm1lc3NhZ2UtciB7XG4gICAgICAgIHBhZGRpbmc6IDMwcHg7XG4gICAgICAgIG1hcmdpbjogNXB4IDhweDtcbiAgICAgICAgYm94LXNoYWRvdzogMnB4IDJweCA1cHggMXB4ICM2NjY7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjY2NjO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgIH1cbjwvc3R5bGU+IiwiPHRlbXBsYXRlPlxuICAgIDxQYWdlPlxuICAgICAgICA8RmxleGJveExheW91dCBmbGV4RGlyZWN0aW9uPVwicm93XCIgYmFja2dyb3VuZENvbG9yPVwiIzAwMFwiPlxuICAgICAgICAgICAgPEltYWdlIHYtaWY9XCJzcmNcIiA6c3JjPVwic3JjXCIgLz5cbiAgICAgICAgICAgIDxMYWJlbCB2LWVsc2UgdGV4dD1cIkltYWdlIG5vdCBsb2FkZWRcIiAvPlxuICAgICAgICA8L0ZsZXhib3hMYXlvdXQ+XG4gICAgPC9QYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBpbXBvcnQgTWVzc2FnZXMgZnJvbSBcIi4vTWVzc2FnZXNcIjtcbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOiBbXCJzcmNcIl0sXG4gICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIHRvTWVzc2FnZXMoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGVUbyhNZXNzYWdlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbjwvc3R5bGU+IiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcXG4ucGFnZVtkYXRhLXYtYzI3NDgyYzRdIHtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLmZvcm1bZGF0YS12LWMyNzQ4MmM0XSB7XFxuICAgIG1hcmdpbi1sZWZ0OiAzMDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAzMDtcXG4gICAgZmxleC1ncm93OiAyO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbn1cXG4ubG9nb1tkYXRhLXYtYzI3NDgyYzRdIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMTI7XFxuICAgIGhlaWdodDogOTA7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG4uaGVhZGVyW2RhdGEtdi1jMjc0ODJjNF0ge1xcbiAgICBob3Jpem9udGFsLWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtc2l6ZTogMjU7XFxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICAgIG1hcmdpbi1ib3R0b206IDcwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjRDUxQTFBO1xcbn1cXG4uaW5wdXQtZmllbGRbZGF0YS12LWMyNzQ4MmM0XSB7XFxuICAgIG1hcmdpbi1ib3R0b206IDI1O1xcbn1cXG4uaW5wdXRbZGF0YS12LWMyNzQ4MmM0XSB7XFxuICAgIGZvbnQtc2l6ZTogMTg7XFxuICAgIHBsYWNlaG9sZGVyLWNvbG9yOiAjQThBOEE4O1xcbn1cXG4uaW5wdXRbZGF0YS12LWMyNzQ4MmM0XTpkaXNhYmxlZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBvcGFjaXR5OiAwLjU7XFxufVxcbi5idG4tcHJpbWFyeVtkYXRhLXYtYzI3NDgyYzRdIHtcXG4gICAgbWFyZ2luOiAzMCA1IDE1IDU7XFxufVxcbi5sb2dpbi1sYWJlbFtkYXRhLXYtYzI3NDgyYzRdIHtcXG4gICAgaG9yaXpvbnRhbC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogI0E4QThBODtcXG4gICAgZm9udC1zaXplOiAxNjtcXG59XFxuLnNpZ24tdXAtbGFiZWxbZGF0YS12LWMyNzQ4MmM0XSB7XFxuICAgIG1hcmdpbi1ib3R0b206IDIwO1xcbn1cXG4uYm9sZFtkYXRhLXYtYzI3NDgyYzRdIHtcXG4gICAgY29sb3I6ICMwMDAwMDA7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuICAgIGNvbnN0IGFwcGxpY2F0aW9uID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIik7XG4gICAgcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc3R5bGluZy9zdHlsZS1zY29wZVwiKTtcblxuICAgIGlmICh0eXBlb2YgZXhwb3J0cy5mb3JFYWNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgZXhwb3J0cy5mb3JFYWNoKGNzc0V4cG9ydCA9PiB7XG4gICAgICAgICAgICBpZiAoY3NzRXhwb3J0Lmxlbmd0aCA+IDEgJiYgY3NzRXhwb3J0WzFdKSB7XG4gICAgICAgICAgICAgICAgLy8gYXBwbHlpbmcgdGhlIHNlY29uZCBpdGVtIG9mIHRoZSBleHBvcnQgYXMgaXQgY29udGFpbnMgdGhlIGNzcyBjb250ZW50c1xuICAgICAgICAgICAgICAgIGFwcGxpY2F0aW9uLmFkZENzcyhjc3NFeHBvcnRbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG47XG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgICAgbW9kdWxlLmhvdC5hY2NlcHQoKTtcbiAgICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKCgpID0+IHtcbiAgICAgICAgICAgIGdsb2JhbC5obXJSZWZyZXNoKHsgdHlwZTogJ3N0eWxlJywgcGF0aDogJy4vY29tcG9uZW50cy9Mb2dpbi52dWUnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuLmFuc3dlci1idG4ge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjYyMzIzO1xcbiAgICBjb2xvcjogI2ZmZmZmZjtcXG4gICAgZm9udC1zaXplOiAxOHB4O1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG59XFxuLmZhciB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiRm9udCBBd2Vzb21lIDUgRnJlZVxcXCIsIFxcXCJmYS1yZWd1bGFyLTQwMFxcXCI7XFxufVxcbi5tZXNzYWdlLXcge1xcbiAgICBwYWRkaW5nOiAzMHB4O1xcbiAgICBtYXJnaW46IDVweCA4cHg7XFxuICAgIGJveC1zaGFkb3c6IDJweCAycHggNXB4IDFweCAjNjY2O1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NjY2NjYztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2MzZmZjMztcXG59XFxuLm1lc3NhZ2UtciB7XFxuICAgIHBhZGRpbmc6IDMwcHg7XFxuICAgIG1hcmdpbjogNXB4IDhweDtcXG4gICAgYm94LXNoYWRvdzogMnB4IDJweCA1cHggMXB4ICM2NjY7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2NjY2NjO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cbiAgICBjb25zdCBhcHBsaWNhdGlvbiA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCIpO1xuICAgIHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7XG5cbiAgICBpZiAodHlwZW9mIGV4cG9ydHMuZm9yRWFjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGV4cG9ydHMuZm9yRWFjaChjc3NFeHBvcnQgPT4ge1xuICAgICAgICAgICAgaWYgKGNzc0V4cG9ydC5sZW5ndGggPiAxICYmIGNzc0V4cG9ydFsxXSkge1xuICAgICAgICAgICAgICAgIC8vIGFwcGx5aW5nIHRoZSBzZWNvbmQgaXRlbSBvZiB0aGUgZXhwb3J0IGFzIGl0IGNvbnRhaW5zIHRoZSBjc3MgY29udGVudHNcbiAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbi5hZGRDc3MoY3NzRXhwb3J0WzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuO1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2NvbXBvbmVudHMvTWVzc2FnZXMudnVlJyB9KTtcbiAgICAgICAgfSlcbiAgICB9XG4iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiR3JpZExheW91dFwiLFxuICAgIHtcbiAgICAgIGF0dHJzOiB7XG4gICAgICAgIGNvbHVtbnM6IFwiKlwiLFxuICAgICAgICByb3dzOiBcImF1dG8sIGF1dG8sIGF1dG8sIGF1dG9cIixcbiAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICByb3c6IFwiMVwiLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwibGlnaHRncmF5XCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF92bS5fbChfdm0uY2FzZXMsIGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgX2MoXCJCdXR0b25cIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogaXRlbSwgcm93OiBpbmRleCB9LFxuICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLm9uVGFwQ2FzZShpbmRleClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICAgIH0pXG4gICAgXSxcbiAgICAyXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiUGFnZVwiLFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcIkFjdGlvbkJhclwiLFxuICAgICAgICB7IGF0dHJzOiB7IHRpdGxlOiBfdm0uQ29uc3RzLkFQUF9OQU1FIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiQWN0aW9uSXRlbVwiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICB0YXA6IFwib25EZWxldGVcIixcbiAgICAgICAgICAgICAgXCJpb3Muc3lzdGVtSWNvblwiOiBcIjlcIixcbiAgICAgICAgICAgICAgXCJpb3MucG9zaXRpb25cIjogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgIFwiYW5kcm9pZC5zeXN0ZW1JY29uXCI6IFwiaWNfbWVudV9wcmVmZXJlbmNlc1wiLFxuICAgICAgICAgICAgICBcImFuZHJvaWQucG9zaXRpb25cIjogXCJhY3Rpb25CYXJcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF9jKFwiQWN0aW9uSXRlbVwiLCB7XG4gICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICBcImlvcy5zeXN0ZW1JY29uXCI6IFwiOVwiLFxuICAgICAgICAgICAgICBcImlvcy5wb3NpdGlvblwiOiBcImxlZnRcIixcbiAgICAgICAgICAgICAgXCJhbmRyb2lkLnN5c3RlbUljb25cIjogXCJpY19sb2NrX2xvY2tcIixcbiAgICAgICAgICAgICAgXCJhbmRyb2lkLnBvc2l0aW9uXCI6IFwiYWN0aW9uQmFyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICB0YXA6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdm0udGFwTG9nb3V0KClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgICksXG4gICAgICBfYyhcbiAgICAgICAgXCJTY3JvbGxWaWV3XCIsXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiTGlzdFZpZXdcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGlzdC1ncm91cFwiLFxuICAgICAgICAgICAgICBhdHRyczogeyBpdGVtczogX3ZtLml0ZW1zLCBcIithbGlhc1wiOiBcIml0ZW1cIiB9LFxuICAgICAgICAgICAgICBvbjogeyBpdGVtVGFwOiBfdm0ub25JdGVtVGFwIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF9jKFwidi10ZW1wbGF0ZVwiLCB7XG4gICAgICAgICAgICAgICAgc2NvcGVkU2xvdHM6IF92bS5fdShbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJkZWZhdWx0XCIsXG4gICAgICAgICAgICAgICAgICAgIGZuOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlZi5pdGVtXG4gICAgICAgICAgICAgICAgICAgICAgdmFyICRpbmRleCA9IHJlZi4kaW5kZXhcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgJGV2ZW4gPSByZWYuJGV2ZW5cbiAgICAgICAgICAgICAgICAgICAgICB2YXIgJG9kZCA9IHJlZi4kb2RkXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxpc3QtZ3JvdXAtaXRlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyByb3dzOiBcIipcIiwgY29sdW1uczogXCJhdXRvLCAqXCIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGh1bWIgaW1nLWNpcmNsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCIwXCIsIGNvbDogXCIwXCIsIHNyYzogaXRlbS5zcmMgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjBcIiwgY29sOiBcIjFcIiwgdGV4dDogaXRlbS50ZXh0IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiUGFnZVwiLFxuICAgIHsgYXR0cnM6IHsgYWN0aW9uQmFySGlkZGVuOiBcInRydWVcIiB9IH0sXG4gICAgW1xuICAgICAgX2MoXG4gICAgICAgIFwiRmxleGJveExheW91dFwiLFxuICAgICAgICB7IHN0YXRpY0NsYXNzOiBcInBhZ2VcIiB9LFxuICAgICAgICBbXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImZvcm1cIiB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsb2dvXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgc3JjOiBcIn4vaW1hZ2VzL2xvZ28ucG5nXCIgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogX3ZtLkNvbnN0cy5BUFBfTkFNRSB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgICAgICAgICB7IGF0dHJzOiB7IHJvd3M6IFwiYXV0bywgYXV0bywgYXV0bywgYXV0b1wiIH0gfSxcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICB7IHN0YXRpY0NsYXNzOiBcImlucHV0LWZpZWxkXCIsIGF0dHJzOiB7IHJvdzogXCIwXCIgfSB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhpbnQ6IFwiRW1haWxcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVkOiAhX3ZtLnByb2Nlc3NpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleWJvYXJkVHlwZTogXCJlbWFpbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY29ycmVjdDogXCJmYWxzZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY2FwaXRhbGl6YXRpb25UeXBlOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuS2V5VHlwZTogXCJuZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS51c2VyLmVtYWlsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuUHJlc3M6IF92bS5mb2N1c1Bhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRzZXQoX3ZtLnVzZXIsIFwiZW1haWxcIiwgJGV2ZW50LnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJTdGFja0xheW91dFwiLCB7IHN0YXRpY0NsYXNzOiBcImhyLWxpZ2h0XCIgfSlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgICAgICBcIlN0YWNrTGF5b3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHsgc3RhdGljQ2xhc3M6IFwiaW5wdXQtZmllbGRcIiwgYXR0cnM6IHsgcm93OiBcIjFcIiB9IH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwicGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImlucHV0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpc0VuYWJsZWQ6ICFfdm0ucHJvY2Vzc2luZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGludDogXCJQYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN1cmU6IFwidHJ1ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5LZXlUeXBlOiBfdm0uaXNMb2dnaW5nSW4gPyBcImRvbmVcIiA6IFwibmV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0udXNlci5wYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblByZXNzOiBfdm0uZm9jdXNDb25maXJtUGFzc3dvcmQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChfdm0udXNlciwgXCJwYXNzd29yZFwiLCAkZXZlbnQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIlN0YWNrTGF5b3V0XCIsIHsgc3RhdGljQ2xhc3M6IFwiaHItbGlnaHRcIiB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgICAgIFwiU3RhY2tMYXlvdXRcIixcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGl2ZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzaG93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJhd05hbWU6IFwidi1zaG93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAhX3ZtLmlzTG9nZ2luZ0luLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcIiFpc0xvZ2dpbmdJblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJpbnB1dC1maWVsZFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHJvdzogXCIyXCIgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgX2MoXCJUZXh0RmllbGRcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmOiBcImNvbmZpcm1QYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5hYmxlZDogIV92bS5wcm9jZXNzaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIkNvbmZpcm0gcGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdXJlOiBcInRydWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuS2V5VHlwZTogXCJuZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS51c2VyLmNvbmZpcm1QYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRDaGFuZ2U6IGZ1bmN0aW9uKCRldmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfdm0uJHNldChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS51c2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb25maXJtUGFzc3dvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRldmVudC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgIF9jKFwiU3RhY2tMYXlvdXRcIiwgeyBzdGF0aWNDbGFzczogXCJoci1saWdodFwiIH0pXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgXCJTdGFja0xheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aXZlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNob3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LXNob3dcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICFfdm0uaXNMb2dnaW5nSW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwiIWlzTG9nZ2luZ0luXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImlucHV0LWZpZWxkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgcm93OiBcIjNcIiB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIlRleHRGaWVsZFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWY6IFwibmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiaW5wdXRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzRW5hYmxlZDogIV92bS5wcm9jZXNzaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBoaW50OiBcIllvdXIgbmFtZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN1cmU6IFwiZmFsc2VcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuS2V5VHlwZTogXCJkb25lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS51c2VyLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0Q2hhbmdlOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLiRzZXQoX3ZtLnVzZXIsIFwibmFtZVwiLCAkZXZlbnQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICBfYyhcIlN0YWNrTGF5b3V0XCIsIHsgc3RhdGljQ2xhc3M6IFwiaHItbGlnaHRcIiB9KVxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgX2MoXCJBY3Rpdml0eUluZGljYXRvclwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJzOiB7IHJvd1NwYW46IFwiM1wiLCBidXN5OiBfdm0ucHJvY2Vzc2luZyB9XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBfYyhcIkJ1dHRvblwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwiYnRuIGJ0bi1wcmltYXJ5IG0tdC0yMFwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiBfdm0uaXNMb2dnaW5nSW4gPyBcIkxvZyBJblwiIDogXCJTaWduIFVwXCIsXG4gICAgICAgICAgICAgICAgICBpc0VuYWJsZWQ6ICFfdm0ucHJvY2Vzc2luZ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb246IHsgdGFwOiBfdm0uc3VibWl0IH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxvZ2luLWxhYmVsXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIFwiKnYtc2hvd1wiOiBcImlzTG9nZ2luZ0luXCIsXG4gICAgICAgICAgICAgICAgICB0ZXh0OiBcIkZvcmdvdCB5b3VyIHBhc3N3b3JkP1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgdGFwOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF92bS5mb3Jnb3RQYXNzd29yZCgpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJMYWJlbFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsb2dpbi1sYWJlbCBzaWduLXVwLWxhYmVsXCIsXG4gICAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLnRvZ2dsZUZvcm0gfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXG4gICAgICAgICAgICAgICAgXCJGb3JtYXR0ZWRTdHJpbmdcIixcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBfYyhcIlNwYW5cIiwge1xuICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5pc0xvZ2dpbmdJblxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIkRvbuKAmXQgaGF2ZSBhbiBhY2NvdW50PyBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkJhY2sgdG8gTG9naW5cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgIF9jKFwiU3BhblwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHsgdGV4dDogX3ZtLmlzTG9nZ2luZ0luID8gXCJTaWduIHVwXCIgOiBcIlwiIH1cbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAxXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAxXG4gICAgICAgICAgKVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiV3JhcExheW91dFwiLFxuICAgIHtcbiAgICAgIGNsYXNzOiBfdm0ubWVzc2FnZS5pc093bmVyID8gXCJtZXNzYWdlLXdcIiA6IFwibWVzc2FnZS1yXCIsXG4gICAgICBhdHRyczoge1xuICAgICAgICBjb2w6IF92bS5tZXNzYWdlLmlzT3duZXIgPyAxIDogMCxcbiAgICAgICAgb3JpZW50YXRpb246IFwiaG9yaXpvbnRhbFwiLFxuICAgICAgICBib3JkZXJSYWRpdXM6IFwiNVwiLFxuICAgICAgICBib3JkZXJXaWR0aDogXCIwXCIsXG4gICAgICAgIGJvcmRlckNvbG9yOiBcIiNmZmZmZmY7XCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIF9jKFwiTGFiZWxcIiwge1xuICAgICAgICBhdHRyczogeyB0ZXh0OiBfdm0ubWVzc2FnZS50ZXh0LCB0ZXh0V3JhcDogXCJ0cnVlXCIsIHdpZHRoOiBcIjY1JVwiIH1cbiAgICAgIH0pLFxuICAgICAgX3ZtLm1lc3NhZ2UuaW1nXG4gICAgICAgID8gX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyBoZWlnaHQ6IFwiMTAwXCIsIHNyYzogX3ZtLm1lc3NhZ2UuaW1nIH0sXG4gICAgICAgICAgICBvbjogeyB0YXA6IF92bS5vcGVuUGhvdG8gfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfYyhcIkxhYmVsXCIsIHtcbiAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICB0ZXh0OiBfdm0ubWVzc2FnZS50aW1lLFxuICAgICAgICAgIHdpZHRoOiBcIjE4JVwiLFxuICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgIGZvbnRTaXplOiBcIjEyXCJcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBfdm0ubWVzc2FnZS5kZWxpdmVyZWQgPT09IG51bGxcbiAgICAgICAgPyBfYyhcIkltYWdlXCIsIHtcbiAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImxvZ29cIixcbiAgICAgICAgICAgIGF0dHJzOiB7IHNyYzogXCJ+L2ltYWdlcy90aWNrLTEucG5nXCIsIHdpZHRoOiBcIjEwXCIgfVxuICAgICAgICAgIH0pXG4gICAgICAgIDogX3ZtLl9lKCksXG4gICAgICBfdm0ubWVzc2FnZS5kZWxpdmVyZWQgPT09IGZhbHNlXG4gICAgICAgID8gX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsb2dvXCIsXG4gICAgICAgICAgICBhdHRyczogeyBzcmM6IFwifi9pbWFnZXMvdGljay0yLnBuZ1wiLCB3aWR0aDogXCIxM1wiIH1cbiAgICAgICAgICB9KVxuICAgICAgICA6IF92bS5fZSgpLFxuICAgICAgX3ZtLm1lc3NhZ2UuZGVsaXZlcmVkID09PSB0cnVlXG4gICAgICAgID8gX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICBzdGF0aWNDbGFzczogXCJsb2dvXCIsXG4gICAgICAgICAgICBhdHRyczogeyBzcmM6IFwifi9pbWFnZXMvdGljay0zLnBuZ1wiLCB3aWR0aDogXCIxNFwiIH1cbiAgICAgICAgICB9KVxuICAgICAgICA6IF92bS5fZSgpXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiUGFnZVwiLFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcIkFjdGlvbkJhclwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljU3R5bGU6IHsgYmFja2dyb3VuZENvbG9yOiBcIiMwNzVFNTRcIiwgY29sb3I6IFwiI2ZmZmZmZlwiIH0sXG4gICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgIFwiaW9zOmhvcml6b250YWxBbGlnbm1lbnRcIjogXCJsZWZ0XCIsXG4gICAgICAgICAgICBcImFuZHJvaWQ6aG9yaXpvbnRhbEFsaWdubWVudFwiOiBcImxlZnRcIlxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwiTmF2aWdhdGlvbkJ1dHRvblwiLCB7XG4gICAgICAgICAgICBhdHRyczogeyB0ZXh0OiBcIjwtXCIsIFwiYW5kcm9pZC5zeXN0ZW1JY29uXCI6IFwiaWNfbWVudV9iYWNrXCIgfSxcbiAgICAgICAgICAgIG9uOiB7IHRhcDogX3ZtLnRvTWFpblBhZ2UgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJHcmlkTGF5b3V0XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogXCI1MCxhdXRvLDcwXCIsXG4gICAgICAgICAgICAgICAgcm93czogXCIqXCIsXG4gICAgICAgICAgICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgIHZlcnRpY2FsQWxpZ25tZW50OiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAganVzdGlmeUl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwiaW9zOmhvcml6b250YWxBbGlnbm1lbnRcIjogXCJsZWZ0XCIsXG4gICAgICAgICAgICAgICAgXCJhbmRyb2lkOmhvcml6b250YWxBbGlnbm1lbnRcIjogXCJsZWZ0XCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgX2MoXCJJbWFnZVwiLCB7XG4gICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6IFwidGh1bWIgaW1nLWNpcmNsZVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7XG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMFwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIHNyYzogX3ZtLnBob3RvU3JjLFxuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjQwXCIsXG4gICAgICAgICAgICAgICAgICB3aWR0aDogXCI0MFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IF92bS5vcHBvbmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICBjb2w6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgcm93OiBcIjBcIixcbiAgICAgICAgICAgICAgICAgIGFsaWduU2VsZjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiBcIjYwJVwiLFxuICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMThcIixcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIyMFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX2MoXCJMYWJlbFwiLCB7XG4gICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6IFwib25saW5lXCIsXG4gICAgICAgICAgICAgICAgICB3aWR0aDogXCIzMFwiLFxuICAgICAgICAgICAgICAgICAgY29sOiBcIjJcIixcbiAgICAgICAgICAgICAgICAgIHJvdzogXCIwXCIsXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMTJcIixcbiAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjEwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgIClcbiAgICAgICAgXSxcbiAgICAgICAgMVxuICAgICAgKSxcbiAgICAgIF9jKFxuICAgICAgICBcIkdyaWRMYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyBjb2x1bW5zOiBcIipcIiwgcm93czogXCIqLCAyNjBcIiB9IH0sXG4gICAgICAgIFtcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwiTGlzdFZpZXdcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3RhdGljU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMTAwJVwiLFxuICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZTZmN2ZmXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICByb3c6IFwiMFwiLFxuICAgICAgICAgICAgICAgIHNlcGFyYXRvckNvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgaXRlbXM6IF92bS5tZXNzYWdlcyxcbiAgICAgICAgICAgICAgICBcIithbGlhc1wiOiBcIm1lc3NhZ2VcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInYtdGVtcGxhdGVcIiwge1xuICAgICAgICAgICAgICAgIHNjb3BlZFNsb3RzOiBfdm0uX3UoW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiZGVmYXVsdFwiLFxuICAgICAgICAgICAgICAgICAgICBmbjogZnVuY3Rpb24ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSByZWYubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgIHZhciAkaW5kZXggPSByZWYuJGluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgdmFyICRldmVuID0gcmVmLiRldmVuXG4gICAgICAgICAgICAgICAgICAgICAgdmFyICRvZGQgPSByZWYuJG9kZFxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiR3JpZExheW91dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IG1lc3NhZ2UuaXNPd25lciA/IFwiMjAsICpcIiA6IFwiKiwgMjBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBcImF1dG9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcIk1lc3NhZ2VJdGVtXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyczogeyBtZXNzYWdlOiBtZXNzYWdlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb246IHsgXCJvcGVuLXBob3RvXCI6IF92bS5vcGVuUGhvdG8gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIDFcbiAgICAgICAgICApLFxuICAgICAgICAgIF9jKFwiQ2FzZXNcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHsgY2FzZXM6IF92bS5jYXNlcyB9LFxuICAgICAgICAgICAgb246IHsgc2VsZWN0OiBfdm0ub25UYXBDYXNlIH1cbiAgICAgICAgICB9KVxuICAgICAgICBdLFxuICAgICAgICAxXG4gICAgICApXG4gICAgXSxcbiAgICAxXG4gIClcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwiUGFnZVwiLFxuICAgIFtcbiAgICAgIF9jKFxuICAgICAgICBcIkZsZXhib3hMYXlvdXRcIixcbiAgICAgICAgeyBhdHRyczogeyBmbGV4RGlyZWN0aW9uOiBcInJvd1wiLCBiYWNrZ3JvdW5kQ29sb3I6IFwiIzAwMFwiIH0gfSxcbiAgICAgICAgW1xuICAgICAgICAgIF92bS5zcmNcbiAgICAgICAgICAgID8gX2MoXCJJbWFnZVwiLCB7IGF0dHJzOiB7IHNyYzogX3ZtLnNyYyB9IH0pXG4gICAgICAgICAgICA6IF9jKFwiTGFiZWxcIiwgeyBhdHRyczogeyB0ZXh0OiBcIkltYWdlIG5vdCBsb2FkZWRcIiB9IH0pXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsInZhciBtYXAgPSB7XG5cdFwiLi9hcHAuY3NzXCI6IFwiLi9hcHAuY3NzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8obWFwLCByZXEpKSB7XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBtYXBbcmVxXTtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4vIHN5bmMgXlxcXFwuXFxcXC9hcHBcXFxcLihjc3N8c2Nzc3xsZXNzfHNhc3MpJFwiOyIsInZhciBtYXAgPSB7XG5cdFwiLi9hcHAuY3NzXCI6IFwiLi9hcHAuY3NzXCIsXG5cdFwiLi9hcHAuanNcIjogXCIuL2FwcC5qc1wiLFxuXHRcIi4vY29uc3RzLmpzXCI6IFwiLi9jb25zdHMuanNcIixcblx0XCIuL21vZGVscy9Vc2VyTW9kZWwuanNcIjogXCIuL21vZGVscy9Vc2VyTW9kZWwuanNcIixcblx0XCIuL3JvdXRlcy9pbmRleC5qc1wiOiBcIi4vcm91dGVzL2luZGV4LmpzXCIsXG5cdFwiLi9zZXJ2aWNlcy9iYWNrZW5kLXNlcnZpY2UuanNcIjogXCIuL3NlcnZpY2VzL2JhY2tlbmQtc2VydmljZS5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuLyBzeW5jIHJlY3Vyc2l2ZSAoPzwhXFxcXGJBcHBfUmVzb3VyY2VzXFxcXGIuKikoPzwhXFxcXC5cXFxcL1xcXFxidGVzdHNcXFxcYlxcXFwvLio/KVxcXFwuKHhtbHxjc3N8anN8KD88IVxcXFwuZFxcXFwuKXRzfCg/PCFcXFxcYl9bXFxcXHctXSpcXFxcLilzY3NzKSRcIjsiLCJnbG9iYWwucmVnaXN0ZXJNb2R1bGUoXCJ+bmF0aXZlc2NyaXB0LXRoZW1lLWNvcmUvY3NzL2NvcmUubGlnaHQuY3NzXCIsICgpID0+IHJlcXVpcmUoXCIhbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL2NzczJqc29uLWxvYWRlcj91c2VGb3JJbXBvcnRzIW5hdGl2ZXNjcmlwdC10aGVtZS1jb3JlL2Nzcy9jb3JlLmxpZ2h0LmNzc1wiKSk7XG5nbG9iYWwucmVnaXN0ZXJNb2R1bGUoXCJuYXRpdmVzY3JpcHQtdGhlbWUtY29yZS9jc3MvY29yZS5saWdodC5jc3NcIiwgKCkgPT4gcmVxdWlyZShcIiFuYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svY3NzMmpzb24tbG9hZGVyP3VzZUZvckltcG9ydHMhbmF0aXZlc2NyaXB0LXRoZW1lLWNvcmUvY3NzL2NvcmUubGlnaHQuY3NzXCIpKTttb2R1bGUuZXhwb3J0cyA9IHtcInR5cGVcIjpcInN0eWxlc2hlZXRcIixcInN0eWxlc2hlZXRcIjp7XCJydWxlc1wiOlt7XCJ0eXBlXCI6XCJpbXBvcnRcIixcImltcG9ydFwiOlwiJ35uYXRpdmVzY3JpcHQtdGhlbWUtY29yZS9jc3MvY29yZS5saWdodC5jc3MnXCJ9LHtcInR5cGVcIjpcInJ1bGVcIixcInNlbGVjdG9yc1wiOltcIi5idG4tcHJpbWFyeVwiXSxcImRlY2xhcmF0aW9uc1wiOlt7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImhlaWdodFwiLFwidmFsdWVcIjpcIjUwXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiYmFja2dyb3VuZC1jb2xvclwiLFwidmFsdWVcIjpcIiNENTFBMUFcIn0se1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJib3JkZXItcmFkaXVzXCIsXCJ2YWx1ZVwiOlwiNVwifSx7XCJ0eXBlXCI6XCJkZWNsYXJhdGlvblwiLFwicHJvcGVydHlcIjpcImZvbnQtc2l6ZVwiLFwidmFsdWVcIjpcIjIwXCJ9LHtcInR5cGVcIjpcImRlY2xhcmF0aW9uXCIsXCJwcm9wZXJ0eVwiOlwiZm9udC13ZWlnaHRcIixcInZhbHVlXCI6XCI2MDBcIn1dfSx7XCJ0eXBlXCI6XCJydWxlXCIsXCJzZWxlY3RvcnNcIjpbXCIuYnRuLXByaW1hcnk6ZGlzYWJsZWRcIl0sXCJkZWNsYXJhdGlvbnNcIjpbe1widHlwZVwiOlwiZGVjbGFyYXRpb25cIixcInByb3BlcnR5XCI6XCJvcGFjaXR5XCIsXCJ2YWx1ZVwiOlwiMC41XCJ9XX1dLFwicGFyc2luZ0Vycm9yc1wiOltdfX07O1xuICAgIGlmIChtb2R1bGUuaG90KSB7XG4gICAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KCk7XG4gICAgICAgIG1vZHVsZS5ob3QuZGlzcG9zZSgoKSA9PiB7XG4gICAgICAgICAgICBnbG9iYWwuaG1yUmVmcmVzaCh7IHR5cGU6ICdzdHlsZScsIHBhdGg6ICcuL2FwcC5jc3MnIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiIsImltcG9ydCBWdWUgZnJvbSBcIm5hdGl2ZXNjcmlwdC12dWVcIjtcblxuaW1wb3J0IHJvdXRlcyBmcm9tIFwiLi9yb3V0ZXNcIjtcbmltcG9ydCBCYWNrZW5kU2VydmljZSBmcm9tIFwiLi9zZXJ2aWNlcy9iYWNrZW5kLXNlcnZpY2VcIjtcblxuLy8gVW5jb21tbWVudCB0aGUgZm9sbG93aW5nIHRvIHNlZSBOYXRpdmVTY3JpcHQtVnVlIG91dHB1dCBsb2dzXG4vLyBWdWUuY29uZmlnLnNpbGVudCA9IGZhbHNlO1xuXG5jb25zdCBiYWNrZW5kU2VydmljZSA9IG5ldyBCYWNrZW5kU2VydmljZSgpO1xuVnVlLnByb3RvdHlwZS4kYmFja2VuZFNlcnZpY2UgPSBiYWNrZW5kU2VydmljZTtcbi8vVnVlLnByb3RvdHlwZS4kbnNVdWlkID0gbnNVdWlkO1xuXG5uZXcgVnVlKHtcbiAgY3JlYXRlZCgpIHtcbiAgICAvL2JhY2tlbmRTZXJ2aWNlLmF1dG9Mb2dpbihuc1V1aWQuZ2V0VVVJRCgpKVxuICB9LFxuICBkYXRhKCkge1xuICB9LFxuICByZW5kZXI6IGggPT4gaChcImZyYW1lXCIsIFtoKGJhY2tlbmRTZXJ2aWNlLmlzTG9nZ2VkSW4oKSA/IHJvdXRlcy5ob21lIDogcm91dGVzLmxvZ2luKV0pXG59KS4kc3RhcnQoKTtcbiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vQ2FzZXMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTJlNGIzZDc4JlwiXG5pbXBvcnQgc2NyaXB0IGZyb20gXCIuL0Nhc2VzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vQ2FzZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJkOlxcXFxnaXRodWJcXFxcbWVldC1zaW11bGF0b3JcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnMmU0YjNkNzgnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMmU0YjNkNzgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMmU0YjNkNzgnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0Nhc2VzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yZTRiM2Q3OCZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCcyZTRiM2Q3OCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiY29tcG9uZW50cy9DYXNlcy52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2FzZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vQ2FzZXMudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvdGVtcGxhdGVMb2FkZXIuanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0Nhc2VzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yZTRiM2Q3OCZcIiIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vSG9tZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9Njc0MTBmM2EmXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vSG9tZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0hvbWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJkOlxcXFxnaXRodWJcXFxcbWVldC1zaW11bGF0b3JcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnNjc0MTBmM2EnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnNjc0MTBmM2EnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnNjc0MTBmM2EnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0hvbWUudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTY3NDEwZjNhJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzY3NDEwZjNhJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL0hvbWUudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL0hvbWUudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSG9tZS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vSG9tZS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9Njc0MTBmM2EmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1jMjc0ODJjNCZzY29wZWQ9dHJ1ZSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9Mb2dpbi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1jMjc0ODJjNCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIFwiYzI3NDgyYzRcIixcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJkOlxcXFxnaXRodWJcXFxcbWVldC1zaW11bGF0b3JcXFxcbm9kZV9tb2R1bGVzXFxcXHZ1ZS1ob3QtcmVsb2FkLWFwaVxcXFxkaXN0XFxcXGluZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFhcGkuaXNSZWNvcmRlZCgnYzI3NDgyYzQnKSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnYzI3NDgyYzQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnYzI3NDgyYzQnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL0xvZ2luLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1jMjc0ODJjNCZzY29wZWQ9dHJ1ZSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCdjMjc0ODJjNCcsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwiY29tcG9uZW50cy9Mb2dpbi52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTG9naW4udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTMtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1jMjc0ODJjNCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvbmF0aXZlc2NyaXB0LWRldi13ZWJwYWNrL3N0eWxlLWhvdC1sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9hcHBseS1jc3MtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTMtMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZpZD1jMjc0ODJjNCZzY29wZWQ9dHJ1ZSZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9Mb2dpbi52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9YzI3NDgyYzQmc2NvcGVkPXRydWUmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL01lc3NhZ2VJdGVtLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0yY2M5YzhhZiZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9NZXNzYWdlSXRlbS52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL01lc3NhZ2VJdGVtLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiZDpcXFxcZ2l0aHViXFxcXG1lZXQtc2ltdWxhdG9yXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzJjYzljOGFmJykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzJjYzljOGFmJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzJjYzljOGFmJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9NZXNzYWdlSXRlbS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MmNjOWM4YWYmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignMmNjOWM4YWYnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvTWVzc2FnZUl0ZW0udnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01lc3NhZ2VJdGVtLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01lc3NhZ2VJdGVtLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9NZXNzYWdlSXRlbS52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9MmNjOWM4YWYmXCIiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IGZyb20gXCIuL01lc3NhZ2VzLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD01ZTNmYzNhNyZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9NZXNzYWdlcy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcbmV4cG9ydCAqIGZyb20gXCIuL01lc3NhZ2VzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuaW1wb3J0IHN0eWxlMCBmcm9tIFwiLi9NZXNzYWdlcy52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7XG4gIHZhciBhcGkgPSByZXF1aXJlKFwiZDpcXFxcZ2l0aHViXFxcXG1lZXQtc2ltdWxhdG9yXFxcXG5vZGVfbW9kdWxlc1xcXFx2dWUtaG90LXJlbG9hZC1hcGlcXFxcZGlzdFxcXFxpbmRleC5qc1wiKVxuICBhcGkuaW5zdGFsbChyZXF1aXJlKCd2dWUnKSlcbiAgaWYgKGFwaS5jb21wYXRpYmxlKSB7XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICAgIGlmICghYXBpLmlzUmVjb3JkZWQoJzVlM2ZjM2E3JykpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJzVlM2ZjM2E3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJzVlM2ZjM2E3JywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9NZXNzYWdlcy52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWUzZmMzYTcmXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwaS5yZXJlbmRlcignNWUzZmMzYTcnLCB7XG4gICAgICAgIHJlbmRlcjogcmVuZGVyLFxuICAgICAgICBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZuc1xuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5jb21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcImNvbXBvbmVudHMvTWVzc2FnZXMudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01lc3NhZ2VzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL01lc3NhZ2VzLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTWVzc2FnZXMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL25hdGl2ZXNjcmlwdC1kZXYtd2VicGFjay9zdHlsZS1ob3QtbG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9uYXRpdmVzY3JpcHQtZGV2LXdlYnBhY2svYXBwbHktY3NzLWxvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0zLTIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTWVzc2FnZXMudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vTWVzc2FnZXMudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVlM2ZjM2E3JlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9QaG90by52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NWE5NmZlMzImXCJcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vUGhvdG8udnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9QaG90by52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcImQ6XFxcXGdpdGh1YlxcXFxtZWV0LXNpbXVsYXRvclxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc1YTk2ZmUzMicpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc1YTk2ZmUzMicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc1YTk2ZmUzMicsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vUGhvdG8udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVhOTZmZTMyJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzVhOTZmZTMyJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJjb21wb25lbnRzL1Bob3RvLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9QaG90by52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9QaG90by52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vUGhvdG8udnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTVhOTZmZTMyJlwiIiwiY29uc3QgQ29uc3RzID0ge1xyXG4gICAgQVBQX05BTUU6ICdEYXRpbmcgU2ltdWxhdG9yJ1xyXG59O1xyXG5cclxuZXhwb3J0IHsgQ29uc3RzIH07IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlck1vZGVsIHtcclxuICAgIFxyXG59ICIsImltcG9ydCBMb2dpbiBmcm9tIFwiLi4vY29tcG9uZW50cy9Mb2dpblwiO1xuaW1wb3J0IEhvbWUgZnJvbSBcIi4uL2NvbXBvbmVudHMvSG9tZVwiO1xuaW1wb3J0IE1lc3NhZ2VzIGZyb20gXCIuLi9jb21wb25lbnRzL01lc3NhZ2VzXCI7XG5pbXBvcnQgUGhvdG8gZnJvbSBcIi4uL2NvbXBvbmVudHMvUGhvdG9cIjtcblxuY29uc3Qgcm91dGVzID0ge1xuICAgIGxvZ2luOiBMb2dpbixcbiAgICBob21lOiBIb21lLFxuICAgIG1lc3NhZ2VzOiBNZXNzYWdlcyxcbiAgICBwaG90bzogUGhvdG9cbn1cbmV4cG9ydCBkZWZhdWx0IHJvdXRlczsiLCIvLyBUaGUgZm9sbG93aW5nIGlzIGEgc2FtcGxlIGltcGxlbWVudGF0aW9uIG9mIGEgYmFja2VuZCBzZXJ2aWNlIHVzaW5nIFByb2dyZXNzIEtpbnZleSAoaHR0cHM6Ly93d3cucHJvZ3Jlc3MuY29tL2tpbnZleSkuXG4vLyBGZWVsIGZyZWUgdG8gc3dhcCBpbiB5b3VyIG93biBzZXJ2aWNlIC8gQVBJcyAvIGV0YyBoZXJlIGZvciB5b3VyIG93biBhcHBzLlxuXG4vL2ltcG9ydCAqIGFzIEtpbnZleSBmcm9tIFwia2ludmV5LW5hdGl2ZXNjcmlwdC1zZGtcIjtcblxuLypLaW52ZXkuaW5pdCh7XG4gICAgYXBwS2V5OiBcImtpZF9TeVk4TFlPOE1cIixcbiAgICBhcHBTZWNyZXQ6IFwiMDkyODI5ODVkN2M1NDBmN2IwNzZhOWM3ZmQ4ODRjNzdcIlxufSk7Ki9cblxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCBVc2VyTW9kZWwgZnJvbSAnLi4vbW9kZWxzL1VzZXJNb2RlbC5qcyc7XG5cblxuY29uc3QgVXNlciA9IHtcbiAgICBpc0xvZ2dlZEluOiBmYWxzZVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2VuZFNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4gICAgICAgIHRoaXMudXVpZCA9IG51bGw7XG4gICAgfVxuXG4gICAgaXNMb2FkaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkaW5nO1xuICAgIH1cblxuICAgIGdldEhlYWRlcnMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICd1dWlkICcgKyB0aGlzLnV1aWRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzTG9nZ2VkSW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdpc0xvZ2dlZEluJywgVXNlci5pc0xvZ2dlZEluKTtcbiAgICAgICAgcmV0dXJuIFVzZXIuaXNMb2dnZWRJbjtcbiAgICB9XG5cbiAgICBjaGVja0RldmljZUF1dG9Mb2dpbih1dWlkKSB7XG4gICAgICAgIC8vdGhpcy5kZXZpY2UudXVpZCA9IHV1aWQ7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAvL3NldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vdGhpcy51c2VyID0gbmV3IFVzZXJNb2RlbCgpO1xuICAgICAgICAgICAgICAgIFVzZXIuaXNMb2dnZWRJbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrRGV2aWNlQXV0b0xvZ2luIHJlc3VsdCcpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQ6IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vfSwgMzAwMCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ2luKHVzZXIpIHtcbiAgICAgICAgLy9yZXR1cm4gS2ludmV5LlVzZXIubG9naW4odXNlci5lbWFpbCwgdXNlci5wYXNzd29yZCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgLy9yZXR1cm4gS2ludmV5LlVzZXIubG9nb3V0KCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyKHVzZXIpIHtcbiAgICAgICAgLy9yZXR1cm4gS2ludmV5LlVzZXIuc2lnbnVwKHsgdXNlcm5hbWU6IHVzZXIuZW1haWwsIHBhc3N3b3JkOiB1c2VyLnBhc3N3b3JkIH0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRDb250YWN0cyh1c2VyKSB7XG4gICAgICAgIGNvbnN0IHV1aWQgPSBuc1V1aWQuZ2V0VVVJRCgpO1xuICAgICAgICBjb25zb2xlLmxvZyhgZ2V0Q29udGFjdHMgPj4gVGhlIGRldmljZSBVVUlEIGlzICR7dXVpZH1gKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXNlcnMgPSBbe1xuICAgICAgICAgICAgICAgIGlkOiBcIjExXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCLQm9C40LTQsFwiLFxuICAgICAgICAgICAgICAgIHNyYzogXCJodHRwczovL2kucGluaW1nLmNvbS8yMzZ4LzU0LzU3LzI4LzU0NTcyODQ4ZjI3ZTZlMjZkOTU1MjI2YjFkMzQzMzA1LmpwZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiBcIjEzXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCLQoNC+0LzQsFwiLFxuICAgICAgICAgICAgICAgIHNyYzogXCJodHRwczovL2ltYWdlcy5wZXhlbHMuY29tL3Bob3Rvcy8yMDk5MjI1L3BleGVscy1waG90by0yMDk5MjI1LmpwZWc/YXV0bz1jb21wcmVzcyZjcz10aW55c3JnYiZ3PTIwMFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgcmVzb2x2ZSh1c2Vycyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldE1lc3NhZ2VzKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoW3tcbiAgICAgICAgICAgICAgICBpc093bmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjAwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGkhXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aW1lOiBcIjIyLjAxIDExOjIwXCIsXG4gICAgICAgICAgICAgICAgZGVsaXZlcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRleHQ6IFwiSGVsbG8hXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaXNPd25lcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiLFxuICAgICAgICAgICAgICAgIGltZzogXCJodHRwczovL2kucGluaW1nLmNvbS8yMzZ4LzU0LzU3LzI4LzU0NTcyODQ4ZjI3ZTZlMjZkOTU1MjI2YjFkMzQzMzA1LmpwZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBcIkhlbGxvIVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlzT3duZXI6IHRydWUsXG4gICAgICAgICAgICAgICAgdGltZTogXCIyMi4wMSAxMToyMFwiLFxuICAgICAgICAgICAgICAgIGRlbGl2ZXJlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJIZWxsbyFcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpc093bmVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRpbWU6IFwiMjIuMDEgMTE6MjBcIixcbiAgICAgICAgICAgICAgICBkZWxpdmVyZWQ6IG51bGwsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJIZWxsbyEgSGVsbG8hSGVsbG8hIEhlbGxvIUhlbGxvISBIZWxsbyFIZWxsbyEgSGVsbG8hIEhlbGxvISBIZWxsbyEgSGVsbG8hIEhlbGxvISBIZWxsbyFcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRTdGF0dXModXNlcikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgb25saW5lOiB0cnVlLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlQ2FzZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogMSwgdGV4dDogJ0hlbGxvJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IGlkOiA0LCB0ZXh0OiAnQnllJyB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNlbGVjdENhc2Uoc2VsZWN0ZWRDYXNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2VsZWN0Q2FzZScsIHNlbGVjdGVkQ2FzZSk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQG5hdGl2ZXNjcmlwdC9jb3JlL3BsYXRmb3JtL3BsYXRmb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC12dWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2J1bmRsZS1lbnRyeS1wb2ludHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdGV4dC9mb3JtYXR0ZWQtc3RyaW5nXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdGV4dC9zcGFuXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvYWN0aW9uLWJhclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2FjdGl2aXR5LWluZGljYXRvclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvcmRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2JvdHRvbS1uYXZpZ2F0aW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvYnV0dG9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvY29udGVudC12aWV3XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvZGF0ZS1waWNrZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9mcmFtZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lL2FjdGl2aXR5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvaHRtbC12aWV3XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvaW1hZ2VcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZS1jYWNoZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xhYmVsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9hYnNvbHV0ZS1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2RvY2stbGF5b3V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9mbGV4Ym94LWxheW91dFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xheW91dHMvZ3JpZC1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL2xheW91dC1iYXNlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3dyYXAtbGF5b3V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC1waWNrZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvcGxhY2Vob2xkZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9wcm9ncmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Byb3h5LXZpZXctY29udGFpbmVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXdcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zZWFyY2gtYmFyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VnbWVudGVkLWJhclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NsaWRlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3N0eWxpbmcvc3R5bGUtc2NvcGVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS9zd2l0Y2hcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItbmF2aWdhdGlvbi1iYXNlL3RhYi1jb250ZW50LWl0ZW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItbmF2aWdhdGlvbi1iYXNlL3RhYi1zdHJpcFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi1uYXZpZ2F0aW9uLWJhc2UvdGFiLXN0cmlwLWl0ZW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS90ZXh0LWZpZWxkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvdGV4dC12aWV3XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvdWkvdGltZS1waWNrZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy91aS93ZWItdmlld1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL3V0aWxzL3R5cGVzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMveG1sXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=