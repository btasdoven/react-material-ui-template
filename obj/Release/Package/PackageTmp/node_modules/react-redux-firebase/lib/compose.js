'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirebase = undefined;

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _app = require('firebase/app');

var firebase = _interopRequireWildcard(_app);

require('firebase/auth');

require('firebase/database');

require('firebase/storage');

var _constants = require('./constants');

var _utils = require('./utils');

var _actions = require('./actions');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var firebaseInstance = void 0;

exports.default = function (fbConfig, otherConfig) {
  return function (next) {
    return function (reducer, initialState, middleware) {
      var store = next(reducer, initialState, middleware);
      var dispatch = store.dispatch;

      var configs = _extends({}, _constants.defaultConfig, fbConfig, otherConfig);

      (0, _utils.validateConfig)(configs);

      try {
        firebase.initializeApp(fbConfig);
      } catch (err) {}
      if (configs.enableLogging) {
        firebase.database.enableLogging(configs.enableLogging);
      }

      if (configs.ReactNative) {
        configs.enableRedirectHandling = false;
        var AsyncStorage = configs.ReactNative.AsyncStorage;

        firebase.INTERNAL.extendNamespace({
          INTERNAL: {
            reactNative: {
              AsyncStorage: AsyncStorage
            }
          }
        });
      }

      var rootRef = firebase.database().ref();

      var instance = Object.defineProperty(firebase, '_', {
        value: {
          watchers: {},
          config: configs,
          authUid: null
        },
        writable: true,
        enumerable: true,
        configurable: true
      });

      var withMeta = function withMeta(method, path, value, onComplete) {
        if ((0, _isObject3.default)(value)) {
          var prefix = method === 'update' ? 'updated' : 'created';
          var dataWithMeta = _extends({}, value, _defineProperty({}, prefix + 'At', firebase.database.ServerValue.TIMESTAMP));
          if (instance.auth().currentUser) {
            dataWithMeta[prefix + 'By'] = instance.auth().currentUser.uid;
          }
          return rootRef.child(path)[method](dataWithMeta, onComplete);
        }
        return rootRef.child(path)[method](value, onComplete);
      };

      var set = function set(path, value, onComplete) {
        return rootRef.child(path).set(value, onComplete);
      };

      var setWithMeta = function setWithMeta(path, value, onComplete) {
        return withMeta('set', path, value, onComplete);
      };

      var push = function push(path, value, onComplete) {
        return rootRef.child(path).push(value, onComplete);
      };

      var pushWithMeta = function pushWithMeta(path, value, onComplete) {
        return withMeta('push', path, value, onComplete);
      };

      var update = function update(path, value, onComplete) {
        return rootRef.child(path).update(value, onComplete);
      };

      var updateWithMeta = function updateWithMeta(path, value, onComplete) {
        return withMeta('update', path, value, onComplete);
      };

      var remove = function remove(path, onComplete) {
        return rootRef.child(path).remove(onComplete);
      };

      var uniqueSet = function uniqueSet(path, value, onComplete) {
        return rootRef.child(path).transaction(function (d) {
          return d === null ? value : undefined;
        }).then(function (_ref) {
          var committed = _ref.committed,
              snapshot = _ref.snapshot;

          if (!committed) {
            var newError = new Error('Path already exists.');
            if (onComplete) onComplete(newError);
            return Promise.reject(newError);
          }
          if (onComplete) onComplete(snapshot);
          return snapshot;
        });
      };

      var uploadFile = function uploadFile(path, file, dbPath) {
        return _actions.storageActions.uploadFile(dispatch, instance, { path: path, file: file, dbPath: dbPath });
      };

      var uploadFiles = function uploadFiles(path, files, dbPath) {
        return _actions.storageActions.uploadFiles(dispatch, instance, { path: path, files: files, dbPath: dbPath });
      };

      var deleteFile = function deleteFile(path, dbPath) {
        return _actions.storageActions.deleteFile(dispatch, instance, { path: path, dbPath: dbPath });
      };

      var watchEvent = function watchEvent(type, path, options) {
        return _actions.queryActions.watchEvent(instance, dispatch, (0, _isObject3.default)(options) ? _extends({ type: type, path: path }, options) : { type: type, path: path, storeAs: options });
      };

      var unWatchEvent = function unWatchEvent(type, path, options) {
        return _actions.queryActions.unWatchEvent(instance, dispatch, (0, _isObject3.default)(options) ? _extends({ type: type, path: path }, options) : { type: type, path: path, storeAs: options });
      };

      var login = function login(credentials) {
        return _actions.authActions.login(dispatch, instance, credentials);
      };

      var logout = function logout() {
        return _actions.authActions.logout(dispatch, instance);
      };

      var createUser = function createUser(credentials, profile) {
        return _actions.authActions.createUser(dispatch, instance, credentials, profile);
      };

      var resetPassword = function resetPassword(credentials) {
        return _actions.authActions.resetPassword(dispatch, instance, credentials);
      };

      var confirmPasswordReset = function confirmPasswordReset(code, password) {
        return _actions.authActions.confirmPasswordReset(dispatch, instance, code, password);
      };

      var verifyPasswordResetCode = function verifyPasswordResetCode(code) {
        return _actions.authActions.verifyPasswordResetCode(dispatch, instance, code);
      };

      var updateProfile = function updateProfile(profile) {
        return _actions.authActions.updateProfile(dispatch, instance, profile);
      };

      var updateAuth = function updateAuth(authUpdate) {
        return _actions.authActions.updateAuth(dispatch, instance, authUpdate);
      };

      var updateEmail = function updateEmail(email, updateInProfile) {
        return _actions.authActions.updateEmail(dispatch, instance, email, updateInProfile);
      };

      firebase.helpers = {
        ref: function ref(path) {
          return firebase.database().ref(path);
        },
        set: set,
        setWithMeta: setWithMeta,
        uniqueSet: uniqueSet,
        push: push,
        pushWithMeta: pushWithMeta,
        remove: remove,
        update: update,
        updateWithMeta: updateWithMeta,
        login: login,
        logout: logout,
        uploadFile: uploadFile,
        uploadFiles: uploadFiles,
        deleteFile: deleteFile,
        createUser: createUser,
        resetPassword: resetPassword,
        confirmPasswordReset: confirmPasswordReset,
        verifyPasswordResetCode: verifyPasswordResetCode,
        watchEvent: watchEvent,
        unWatchEvent: unWatchEvent,
        updateProfile: updateProfile,
        updateAuth: updateAuth,
        updateEmail: updateEmail,
        storage: function storage(app) {
          return firebase.storage(app);
        },
        messaging: function messaging(app) {
          return firebase.messaging(app);
        }
      };

      _actions.authActions.init(dispatch, instance);

      store.firebase = instance;
      firebaseInstance = _extends({}, instance, instance.helpers);

      return store;
    };
  };
};

var getFirebase = exports.getFirebase = function getFirebase() {
  if (!firebaseInstance) {
    throw new Error('Firebase instance does not yet exist. Check your compose function.');
  }

  return firebaseInstance;
};