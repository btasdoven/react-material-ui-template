'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFile = exports.uploadFiles = exports.uploadFile = undefined;

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

var _actions = require('../utils/actions');

var _storage = require('../utils/storage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FILE_UPLOAD_START = _constants.actionTypes.FILE_UPLOAD_START,
    FILE_UPLOAD_ERROR = _constants.actionTypes.FILE_UPLOAD_ERROR,
    FILE_UPLOAD_PROGRESS = _constants.actionTypes.FILE_UPLOAD_PROGRESS,
    FILE_UPLOAD_COMPLETE = _constants.actionTypes.FILE_UPLOAD_COMPLETE,
    FILE_DELETE_START = _constants.actionTypes.FILE_DELETE_START,
    FILE_DELETE_ERROR = _constants.actionTypes.FILE_DELETE_ERROR,
    FILE_DELETE_COMPLETE = _constants.actionTypes.FILE_DELETE_COMPLETE;

var uploadFileWithProgress = function uploadFileWithProgress(dispatch, firebase, _ref) {
  var path = _ref.path,
      file = _ref.file;

  var uploadEvent = firebase.storage().ref(path + '/' + file.name).put(file);

  var unListen = uploadEvent.on(firebase.storage.TaskEvent.STATE_CHANGED, {
    next: function next(snapshot) {
      dispatch({
        type: FILE_UPLOAD_PROGRESS,
        path: path,
        payload: {
          snapshot: snapshot,
          percent: Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100)
        }
      });
    },
    error: function error(err) {
      dispatch({ type: FILE_UPLOAD_ERROR, path: path, payload: err });
      unListen();
    },
    complete: function complete() {
      dispatch({ type: FILE_UPLOAD_COMPLETE, path: path, payload: file });
      unListen();
    }
  });
  return uploadEvent;
};

var uploadFile = exports.uploadFile = function uploadFile(dispatch, firebase, config) {
  if (!firebase.storage) {
    throw new Error('Firebase storage is required to upload files');
  }
  var path = config.path,
      file = config.file,
      dbPath = config.dbPath,
      _config$options = config.options,
      options = _config$options === undefined ? { progress: false } : _config$options;

  var nameFromOptions = options.name && (0, _isFunction3.default)(options.name) ? options.name(file, firebase, config) : options.name;
  var filename = nameFromOptions || file.name;

  dispatch({ type: FILE_UPLOAD_START, payload: _extends({}, config, { filename: filename }) });

  var uploadPromise = function uploadPromise() {
    return options.progress ? uploadFileWithProgress(dispatch, firebase, { path: path, file: file }) : firebase.storage().ref(path + '/' + filename).put(file);
  };

  return uploadPromise().then(function (uploadTaskSnaphot) {
    if (!dbPath || !firebase.database) {
      dispatch({
        type: FILE_UPLOAD_COMPLETE,
        meta: _extends({}, config, { filename: filename }),
        payload: { uploadTaskSnaphot: uploadTaskSnaphot }
      });
      return { uploadTaskSnaphot: uploadTaskSnaphot };
    }
    var _uploadTaskSnaphot$me = uploadTaskSnaphot.metadata,
        name = _uploadTaskSnaphot$me.name,
        fullPath = _uploadTaskSnaphot$me.fullPath,
        downloadURLs = _uploadTaskSnaphot$me.downloadURLs;
    var fileMetadataFactory = firebase._.config.fileMetadataFactory;

    var fileData = (0, _isFunction3.default)(fileMetadataFactory) ? fileMetadataFactory(uploadTaskSnaphot, firebase) : {
      name: name,
      fullPath: fullPath,
      downloadURL: downloadURLs[0],
      createdAt: firebase.database.ServerValue.TIMESTAMP
    };

    return firebase.database().ref(dbPath).push(fileData).then(function (metaDataSnapshot) {
      var payload = {
        snapshot: metaDataSnapshot,
        key: metaDataSnapshot.key,
        File: fileData,
        uploadTaskSnaphot: uploadTaskSnaphot,
        metaDataSnapshot: metaDataSnapshot
      };
      dispatch({
        type: FILE_UPLOAD_COMPLETE,
        meta: _extends({}, config, { filename: filename }),
        payload: payload
      });
      return payload;
    });
  }).catch(function (err) {
    dispatch({ type: FILE_UPLOAD_ERROR, path: path, payload: err });
    return Promise.reject(err);
  });
};

var uploadFiles = function uploadFiles(dispatch, firebase, _ref2) {
  var files = _ref2.files,
      other = _objectWithoutProperties(_ref2, ['files']);

  return Promise.all((0, _map3.default)(files, function (file) {
    return uploadFile(dispatch, firebase, _extends({ file: file }, other));
  }));
};

exports.uploadFiles = uploadFiles;
var deleteFile = exports.deleteFile = function deleteFile(dispatch, firebase, _ref3) {
  var path = _ref3.path,
      dbPath = _ref3.dbPath;
  return (0, _actions.wrapInDispatch)(dispatch, {
    method: _storage.deleteFile,
    args: [firebase, { path: path, dbPath: dbPath }],
    types: [FILE_DELETE_START, FILE_DELETE_COMPLETE, FILE_DELETE_ERROR]
  });
};