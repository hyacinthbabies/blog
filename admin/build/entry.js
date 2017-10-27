/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "ef57bbb4441d93f017f8"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/admin/build/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _config = __webpack_require__(1);

	var _config2 = _interopRequireDefault(_config);

	var _configLazyload = __webpack_require__(2);

	var _configLazyload2 = _interopRequireDefault(_configLazyload);

	var _configRouter = __webpack_require__(3);

	var _configRouter2 = _interopRequireDefault(_configRouter);

	var _main = __webpack_require__(6);

	var _main2 = _interopRequireDefault(_main);

	var _uiLoad = __webpack_require__(7);

	var _uiLoad2 = _interopRequireDefault(_uiLoad);

	var _uiNav = __webpack_require__(8);

	var _uiNav2 = _interopRequireDefault(_uiNav);

	var _uiButterbar = __webpack_require__(9);

	var _uiButterbar2 = _interopRequireDefault(_uiButterbar);

	var _uiToggleclass = __webpack_require__(10);

	var _uiToggleclass2 = _interopRequireDefault(_uiToggleclass);

	var _uiPagination = __webpack_require__(11);

	var _uiPagination2 = _interopRequireDefault(_uiPagination);

	var _wangEditor = __webpack_require__(12);

	var _wangEditor2 = _interopRequireDefault(_wangEditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	angular.module('app').config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

	    // lazy controller, directive and service
	    myApp.controller = $controllerProvider.register;
	    myApp.directive = $compileProvider.directive;
	    myApp.filter = $filterProvider.register;
	    myApp.factory = $provide.factory;
	    myApp.service = $provide.service;
	    myApp.constant = $provide.constant;
	    myApp.value = $provide.value;
	}]);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	angular.module('app').config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
	    // We configure ocLazyLoad to use the lib script.js as the async loader
	    $ocLazyLoadProvider.config({
	        debug: false,
	        events: true,
	        modules: [{
	            name: 'ui.calendar',
	            files: ['framework/modules/angular-ui-calendar/calendar.js']
	        }]
	    });
	}]);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/*
	路由配置
	 */
	angular.module('app').run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	    $rootScope.$state = $state;
	    $rootScope.$stateParams = $stateParams;
	}]).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	    $urlRouterProvider.otherwise('/access/signin');
	    $stateProvider.state('app', {
	        abstract: true, //表明此状态不能被显性激活，只能被子状态隐性激活
	        url: '/app',
	        templateUrl: 'tpl/app.html'
	    }).state('app.article-list', {
	        url: '/article-list',
	        templateUrl: 'tpl/articles_list.html',
	        resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
	            // loadMyControl: ['$ocLazyLoad',
	            //     function($ocLazyLoad) {
	            //         return $ocLazyLoad.load(['js/controllers/articles_list.js']);
	            //     }
	            // ]
	            loadListController: function loadListController($q, $ocLazyLoad) {
	                return $q(function (resolve) {
	                    __webpack_require__.e/* nsure */(1, function () {
	                        // load whole module
	                        var module = __webpack_require__(4);
	                        $ocLazyLoad.load({ name: 'app' });
	                        resolve(module.controller);
	                    });
	                });
	            }
	        }
	    }).state('app.article-detail', {
	        url: '/article-detail',
	        templateUrl: 'tpl/articles_detail.html',
	        resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
	            // loadMyControl: ['$ocLazyLoad',
	            //     function($ocLazyLoad) {
	            //         return $ocLazyLoad.load(['js/controllers/articles_detail.js']);
	            //     }
	            // ]
	            loadDetailController: function loadDetailController($q, $ocLazyLoad) {
	                return $q(function (resolve) {
	                    __webpack_require__.e/* nsure */(2, function () {
	                        // load whole module
	                        var module = __webpack_require__(5);
	                        $ocLazyLoad.load({ name: 'app' });
	                        resolve(module.controller);
	                    });
	                });
	            }
	        }
	    }).state('app.article-update', {
	        url: '/article-update',
	        templateUrl: 'tpl/articles_update.html',
	        resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
	            loadMyControl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                return $ocLazyLoad.load(['js/controllers/articles_update.js', 'framework/wangeditor/css/wangEditor.min.css', 'framework/wangeditor/wangEditor.min.js']);
	            }]
	        }
	    }).state('app.calendar', {
	        url: '/calendar',
	        templateUrl: 'tpl/app_calendar.html',
	        resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
	            loadMyControl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                return $ocLazyLoad.load(['framework/jquery/fullcalendar/fullcalendar.css', 'framework/jquery/fullcalendar/theme.css', 'framework/jquery/jquery-ui-1.10.3.custom.min.js', 'framework/libs/moment.min.js', 'framework/jquery/fullcalendar/fullcalendar.min.js', 'js/app/calendar/calendar.js']).then(function () {
	                    return $ocLazyLoad.load('ui.calendar');
	                });
	            }]
	        }
	    })
	    // pages
	    .state('app.page', {
	        url: '/page',
	        template: '<div ui-view class="fade-in-down"></div>'
	    }).state('app.page.profile', {
	        url: '/profile',
	        templateUrl: 'tpl/page_profile.html',
	        resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
	            loadMyControl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                return $ocLazyLoad.load(['js/controllers/app_profile.js']);
	            }]
	        }
	    }).state('access', {
	        url: '/access',
	        template: '<div ui-view class="fade-in-right-big smooth"></div>'
	    }).state('access.signin', {
	        url: '/signin',
	        templateUrl: 'tpl/page_signin.html',
	        resolve: { //被使用来处理异步数据调用，以下是返回一个 promise
	            //     deps: ['uiLoad',
	            //         function(uiLoad) {
	            //             return uiLoad.load(['js/controllers/signin.js']);
	            //         }
	            //     ]
	            loadMyControl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                return $ocLazyLoad.load(['js/controllers/signin.js']);
	            }]
	        }
	    }).state('access.signup', {
	        url: '/signup',
	        templateUrl: 'tpl/page_signup.html'
	        // resolve: {//被使用来处理异步数据调用，以下是返回一个 promise
	        //     deps: ['uiLoad',
	        //       function( uiLoad ){
	        //         return uiLoad.load( ['js/controllers/signup.js'] );
	        //     }]
	        // }
	    }).state('access.forgotpwd', {
	        url: '/forgotpwd',
	        templateUrl: 'tpl/page_forgetpwd.html'
	    }).state('mind', {
	        abstract: true,
	        url: '/mind',
	        templateUrl: 'tpl/mind.html'
	    }).state('mind.contact', {
	        url: '/contact',
	        templateUrl: 'tpl/mind_contact.html',
	        resolve: { //被使用来处理异步数据调用，以下是返回一个 promise

	            loadMyControl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                return $ocLazyLoad.load(['js/controllers/contact.js']);
	            }]
	        }
	    }).state('mind.account', {
	        url: '/account',
	        templateUrl: 'tpl/mind_account.html',
	        resolve: { //被使用来处理异步数据调用，以下是返回一个 promise

	            loadMyControl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                return $ocLazyLoad.load(['js/controllers/contact.js']);
	            }]
	        }
	    }).state('mind.check', {
	        url: '/check',
	        templateUrl: 'tpl/mind_check.html',
	        resolve: { //被使用来处理异步数据调用，以下是返回一个 promise

	            loadMyControl: ['$ocLazyLoad', function ($ocLazyLoad) {
	                return $ocLazyLoad.load(['js/controllers/contact.js']);
	            }]
	        }
	    });
	}]);

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

	'use strict';

	angular.module('app').controller('AppCtrl', ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {
	    // add 'ie' classes to html
	    // var isIE = !!navigator.userAgent.match(/MSIE/i);
	    // isIE && angular.element($window.document.body).addClass('ie');
	    // isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
	    // config
	    $scope.app = {
	        name: 'Hyacinth',
	        version: '1.3.3',
	        // for chart colors
	        color: {
	            primary: '#7266ba',
	            info: '#23b7e5',
	            success: '#27c24c',
	            warning: '#fad733',
	            danger: '#f05050',
	            light: '#e8eff0',
	            dark: '#3a3f51',
	            black: '#1c2b36'
	        },
	        settings: {
	            themeID: 1,
	            navbarHeaderColor: 'bg-black',
	            navbarCollapseColor: 'bg-white-only',
	            asideColor: 'bg-black',
	            headerFixed: true,
	            asideFixed: false,
	            asideFolded: false,
	            asideDock: false,
	            container: false
	        }
	    };
	    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
	        if (toState.name == 'access.signin' || toState.name == 'access.signup' || toState.name == 'access.forgotpwd') return; // 如果是进入登录界面则允许
	        // 如果用户不存在
	        //最好再多加cookie记录
	        if (!$rootScope.user || !$rootScope.user.token) {
	            event.preventDefault(); // 取消默认跳转行为
	            $state.go("access.signin", { from: fromState.name, w: 'notLogin' }); //跳转到登录界面
	        }
	    });
	}]);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * 0.1.1
	 * Deferred load js/css file, used for ui-jq.js and Lazy Loading.
	 * 
	 * @ flatfull.com All Rights Reserved.
	 * Author url: #user/flatfull
	 */

	angular.module('ui.load', []).service('uiLoad', ['$document', '$q', '$timeout', function ($document, $q, $timeout) {

		var loaded = [];
		var promise = false;
		var deferred = $q.defer();

		/**
	  * Chain loads the given sources
	  * @param srcs array, script or css
	  * @returns {*} Promise that will be resolved once the sources has been loaded.
	  */
		this.load = function (srcs) {
			srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
			var self = this;
			if (!promise) {
				promise = deferred.promise;
			}
			angular.forEach(srcs, function (src) {
				promise = promise.then(function () {
					return src.indexOf('.css') >= 0 ? self.loadCSS(src) : self.loadScript(src);
				});
			});
			deferred.resolve();
			return promise;
		};

		/**
	  * Dynamically loads the given script
	  * @param src The url of the script to load dynamically
	  * @returns {*} Promise that will be resolved once the script has been loaded.
	  */
		this.loadScript = function (src) {
			if (loaded[src]) return loaded[src].promise;

			var deferred = $q.defer();
			var script = $document[0].createElement('script');
			script.src = src;
			script.onload = function (e) {
				$timeout(function () {
					deferred.resolve(e);
				});
			};
			script.onerror = function (e) {
				$timeout(function () {
					deferred.reject(e);
				});
			};
			$document[0].body.appendChild(script);
			loaded[src] = deferred;

			return deferred.promise;
		};

		/**
	  * Dynamically loads the given CSS file
	  * @param href The url of the CSS to load dynamically
	  * @returns {*} Promise that will be resolved once the CSS file has been loaded.
	  */
		this.loadCSS = function (href) {
			if (loaded[href]) return loaded[href].promise;

			var deferred = $q.defer();
			var style = $document[0].createElement('link');
			style.rel = 'stylesheet';
			style.type = 'text/css';
			style.href = href;
			style.onload = function (e) {
				$timeout(function () {
					deferred.resolve(e);
				});
			};
			style.onerror = function (e) {
				$timeout(function () {
					deferred.reject(e);
				});
			};
			$document[0].head.appendChild(style);
			loaded[href] = deferred;

			return deferred.promise;
		};
	}]);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	angular.module('app').directive('uiNav', ['$timeout', function ($timeout) {
	  return {
	    restrict: 'AC',
	    link: function link(scope, el, attr) {
	      var _window = $(window),
	          _mb = 768,
	          wrap = $('.app-aside'),
	          next,
	          backdrop = '.dropdown-backdrop';
	      // unfolded
	      el.on('click', 'a', function (e) {
	        next && next.trigger('mouseleave.nav');
	        var _this = $(this);
	        _this.parent().siblings(".active").toggleClass('active');
	        _this.next().is('ul') && _this.parent().toggleClass('active') && e.preventDefault();
	        // mobile
	        _this.next().is('ul') || _window.width() < _mb && $('.app-aside').removeClass('show off-screen');
	      });

	      // folded & fixed
	      el.on('mouseenter', 'a', function (e) {
	        next && next.trigger('mouseleave.nav');
	        $('> .nav', wrap).remove();
	        if (!$('.app-aside-fixed.app-aside-folded').length || _window.width() < _mb || $('.app-aside-dock').length) return;
	        var _this = $(e.target),
	            top,
	            w_h = $(window).height(),
	            offset = 50,
	            min = 150;

	        !_this.is('a') && (_this = _this.closest('a'));
	        if (_this.next().is('ul')) {
	          next = _this.next();
	        } else {
	          return;
	        }

	        _this.parent().addClass('active');
	        top = _this.parent().position().top + offset;
	        next.css('top', top);
	        if (top + next.height() > w_h) {
	          next.css('bottom', 0);
	        }
	        if (top + min > w_h) {
	          next.css('bottom', w_h - top - offset).css('top', 'auto');
	        }
	        next.appendTo(wrap);

	        next.on('mouseleave.nav', function (e) {
	          $(backdrop).remove();
	          next.appendTo(_this.parent());
	          next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto');
	          _this.parent().removeClass('active');
	        });

	        $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on('click', function (next) {
	          next && next.trigger('mouseleave.nav');
	        });
	      });

	      wrap.on('mouseleave', function (e) {
	        next && next.trigger('mouseleave.nav');
	        $('> .nav', wrap).remove();
	      });
	    }
	  };
	}]);

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	angular.module('app').directive('uiButterbar', ['$rootScope', '$anchorScroll', function ($rootScope, $anchorScroll) {
	  return {
	    restrict: 'AC',
	    template: '<span class="bar"></span>',
	    link: function link(scope, el, attrs) {
	      el.addClass('butterbar hide');
	      scope.$on('$stateChangeStart', function (event) {
	        $anchorScroll();
	        el.removeClass('hide').addClass('active');
	      });
	      scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
	        event.targetScope.$watch('$viewContentLoaded', function () {
	          el.addClass('hide').removeClass('active');
	        });
	      });
	    }
	  };
	}]);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	'use strict';

	angular.module('app').directive('uiToggleClass', ['$timeout', '$document', function ($timeout, $document) {
	    return {
	        restrict: 'AC',
	        link: function link(scope, el, attr) {
	            el.on('click', function (e) {
	                e.preventDefault();
	                var classes = attr.uiToggleClass.split(','),
	                    targets = attr.target && attr.target.split(',') || Array(el),
	                    key = 0;
	                angular.forEach(classes, function (_class) {
	                    var target = targets[targets.length && key];
	                    _class.indexOf('*') !== -1 && magic(_class, target);
	                    $(target).toggleClass(_class);
	                    key++;
	                });
	                $(el).toggleClass('active');

	                function magic(_class, target) {
	                    var patt = new RegExp('\\s' + _class.replace(/\*/g, '[A-Za-z0-9-_]+').split(' ').join('\\s|\\s') + '\\s', 'g');
	                    var cn = ' ' + $(target)[0].className + ' ';
	                    while (patt.test(cn)) {
	                        cn = cn.replace(patt, ' ');
	                    }
	                    $(target)[0].className = $.trim(cn);
	                }
	            });
	        }
	    };
	}]);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';

	angular.module('app').constant('ngPaginationConfig', {
	    visiblePageCount: 6,
	    firstText: 'First',
	    lastText: 'Last',
	    prevText: 'Prev',
	    nextText: 'Next',
	    showIfOnePage: false,
	    showFirstLastText: true,
	    gotoText: 'Goto Page',
	    showGoto: false
	}).directive("uiPagination", ['ngPaginationConfig', function (ngPaginationConfig) {
	    return {
	        link: function link(scope, element, attrs) {
	            var visiblePageCount = angular.isDefined(attrs.visiblePageCount) ? attrs.visiblePageCount : ngPaginationConfig.visiblePageCount;
	            scope.firstText = angular.isDefined(attrs.firstText) ? attrs.firstText : ngPaginationConfig.firstText;
	            scope.lastText = angular.isDefined(attrs.lastText) ? attrs.lastText : ngPaginationConfig.lastText;
	            scope.prevText = angular.isDefined(attrs.prevText) ? attrs.prevText : ngPaginationConfig.prevText;
	            scope.nextText = angular.isDefined(attrs.nextText) ? attrs.nextText : ngPaginationConfig.nextText;
	            scope.showFirstLastText = angular.isDefined(attrs.showFirstLastText) ? attrs.showFirstLastText : ngPaginationConfig.showFirstLastText;
	            scope.showIfOnePage = angular.isDefined(attrs.showIfOnePage) ? attrs.showIfOnePage : ngPaginationConfig.showIfOnePage;
	            scope.gotoText = angular.isDefined(attrs.gotoText) ? attrs.gotoText : ngPaginationConfig.gotoText;
	            scope.showGoto = angular.isDefined(attrs.showGoto) ? attrs.showGoto : ngPaginationConfig.showGoto;
	            scope.currentPage = 1;

	            scope.pageChange = function (page) {
	                if (page >= 1 && page <= scope.pageCount) {
	                    scope.currentPage = page;
	                } else {
	                    scope.currentPage = 1;
	                }
	            };

	            scope.keyupHanlder = function (e) {
	                var value = e.target.value;
	                var parsedValue = parseInt(value, 10);
	                if (!Number.isNaN(parsedValue)) {
	                    if (parsedValue >= 1 && parsedValue <= scope.pageCount) {} else if (parsedValue < 1) {
	                        e.target.value = 1;
	                    } else {
	                        e.target.value = scope.pageCount;
	                    }
	                    if (e.keyCode === 13) {
	                        // pressed enter
	                        scope.currentPage = parsedValue;
	                    }
	                } else {
	                    if (e.preventDefault) {
	                        e.preventDefault();
	                    } else {
	                        return false;
	                    }
	                }
	            };

	            function build() {
	                var low, high, v;

	                scope.pagenums = [];

	                if (scope.pageCount === 0) {
	                    return;
	                }
	                if (scope.currentPage > scope.pageCount) {
	                    scope.currentPage = 1;
	                }

	                if (scope.pageCount <= visiblePageCount) {
	                    low = 1;
	                    high = scope.pageCount;
	                } else {
	                    v = Math.ceil(visiblePageCount / 2);
	                    low = Math.max(scope.currentPage - v, 1);
	                    high = Math.min(low + visiblePageCount - 1, scope.pageCount);

	                    if (scope.pageCount - high < v) {
	                        low = high - visiblePageCount + 1;
	                    }
	                }

	                for (; low <= high; low++) {
	                    scope.pagenums.push(low);
	                }
	            }

	            scope.$watch('currentPage', function (a, b) {
	                if (a !== b) {
	                    build();
	                    scope.onPageChange();
	                }
	            });

	            scope.$watch('pageCount', function (a, b) {
	                if (!!a) {
	                    build();
	                }
	            });
	        },
	        replace: true,
	        restrict: "E",
	        scope: {
	            pageCount: '=',
	            currentPage: '=',
	            onPageChange: '&'
	        },
	        template: '<div class="ng-pagination"><ul ng-if="pageCount>1 || showIfOnePage"><li ng-click="pageChange(1)" ng-if="showFirstLastText">{{firstText}}</li>' + '<li ng-click="pageChange(currentPage-1>0?currentPage-1:1)">{{prevText}}</li>' + '<li ng-repeat="pagenum in pagenums track by pagenum" ng-click="pageChange(pagenum)" ng-class="{active:currentPage===pagenum}">{{pagenum}}</li>' + '<li ng-click="pageChange(currentPage+1<=pageCount?currentPage+1:pageCount)">{{nextText}}</li>' + '<li ng-click="pageChange(pageCount)" ng-if="showFirstLastText">{{lastText}}</li></ul>' + '<lable ng-if="showGoto">{{gotoText}}<input type="text" ng-keyup="keyupHanlder($event)"></label></div>'
	    };
	}]);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	angular.module('app').directive('wangeditor', function () {
	    return {
	        restrict: 'A',
	        require: '?ngModel',
	        link: function link(scope, element, attrs, ngModel) {
	            // 初始化 编辑器内容
	            if (!ngModel) {
	                return;
	            } // do nothing if no ng-model
	            // Specify how UI should be updated
	            ngModel.$render = function () {
	                element.html(ngModel.$viewValue || '');
	            };
	            // Listen for change events to enable binding
	            element.on('blur keyup change', function () {
	                scope.$apply(readViewText);
	            });
	            // No need to initialize, AngularJS will initialize the text based on ng-model attribute
	            // Write data to the model
	            function readViewText() {
	                var html = element.html();
	                // When we clear the content editable the browser leaves a <br> behind
	                // If strip-br attribute is provided then we strip this out
	                if (attrs.stripBr && html === '<br>') {
	                    html = '';
	                }
	                ngModel.$setViewValue(html);
	            }
	            // 创建编辑器
	            var editor = new wangEditor(element);
	            //去掉定位，由于路由一变化，地图会报错，所以暂时去掉
	            editor.config.menus = $.map(wangEditor.config.menus, function (item, key) {
	                if (item === 'location') {
	                    return null;
	                }
	                return item;
	            });
	            // editor.$editorContainer.css('z-index', 20);
	            editor.config.mapAk = 'gGFTp2HHbC4mqtcld5zZVwh66g5rl5GR';
	            editor.config.uploadImgUrl = '/files/upload';
	            editor.config.uploadImgFileName = 'pic';
	            editor.config.uploadImgFns.onload = function (resultText, xhr) {
	                var url = resultText;
	                var originalName = editor.uploadImgOriginalName || '';
	                // var url = JSON.parse(jsonResult) && JSON.parse(jsonResult).entity.newFileName;
	                editor.command(null, 'insertHtml', '<img src="' + url + '" alt="' + originalName + '" style="max-width:100%;"/>');
	                // 如果不想要 img 的 max-width 样式，也可以这样插入：
	                // editor.command(null, 'InsertImage', resultText);
	            };

	            // 自定义timeout事件
	            editor.config.uploadImgFns.ontimeout = function (xhr) {
	                alert('上传超时');
	            };
	            // 自定义error事件
	            editor.config.uploadImgFns.onerror = function (xhr) {
	                alert('上传错误');
	            };
	            editor.create();
	        }
	    };
	});

/***/ })
/******/ ]);