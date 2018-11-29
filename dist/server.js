/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "bff5d214875a056c8be8";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
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
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
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
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
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
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function(moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function(moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function(moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function(moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t\"[HMR] Consider using the NamedModulesPlugin for module names.\"\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function(level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function(level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function(level) {\n\tlogLevel = level;\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/*globals __resourceQuery */\nif (true) {\n\tvar hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tvar checkForUpdate = function checkForUpdate(fromUpdate) {\n\t\tif (module.hot.status() === \"idle\") {\n\t\t\tmodule.hot\n\t\t\t\t.check(true)\n\t\t\t\t.then(function(updatedModules) {\n\t\t\t\t\tif (!updatedModules) {\n\t\t\t\t\t\tif (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\t\t\t\t\tcheckForUpdate(true);\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tvar status = module.hot.status();\n\t\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot apply update.\");\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] \" + (err.stack || err.message));\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] You need to restart the application!\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlog(\n\t\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\t\"[HMR] Update failed: \" + (err.stack || err.message)\n\t\t\t\t\t\t);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t}\n\t};\n\tsetInterval(checkForUpdate, hotPollInterval);\n} else {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?100\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst users_module_1 = __webpack_require__(/*! ./components/users/users.module */ \"./src/components/users/users.module.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/config/index.ts\");\nconst auth_module_1 = __webpack_require__(/*! ./components/auth/auth.module */ \"./src/components/auth/auth.module.ts\");\nconst files_module_1 = __webpack_require__(/*! ./components/files/files.module */ \"./src/components/files/files.module.ts\");\nconst orders_module_1 = __webpack_require__(/*! ./components/orders/orders.module */ \"./src/components/orders/orders.module.ts\");\nconst messages_module_1 = __webpack_require__(/*! ./components/messages/messages.module */ \"./src/components/messages/messages.module.ts\");\nconst chats_module_1 = __webpack_require__(/*! ./components/chats/chats.module */ \"./src/components/chats/chats.module.ts\");\nlet AppModule = class AppModule {\n};\nAppModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forRoot(config_1.ORM_CONFIG),\n            users_module_1.UsersModule,\n            auth_module_1.AuthModule,\n            files_module_1.FilesModule,\n            orders_module_1.OrdersModule,\n            messages_module_1.MessagesModule,\n            chats_module_1.ChatsModule,\n        ],\n        controllers: [],\n        providers: [],\n    })\n], AppModule);\nexports.AppModule = AppModule;\n\n\n//# sourceURL=webpack:///./src/app.module.ts?");

/***/ }),

/***/ "./src/components/auth/auth.controller.ts":
/*!************************************************!*\
  !*** ./src/components/auth/auth.controller.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst login_dto_1 = __webpack_require__(/*! ./dto/login.dto */ \"./src/components/auth/dto/login.dto.ts\");\nconst users_service_1 = __webpack_require__(/*! ../users/services/users.service */ \"./src/components/users/services/users.service.ts\");\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\nconst auth_service_1 = __webpack_require__(/*! ./auth.service */ \"./src/components/auth/auth.service.ts\");\nconst hash_service_1 = __webpack_require__(/*! ../core/services/hash.service */ \"./src/components/core/services/hash.service.ts\");\nconst exchangeToken_dto_1 = __webpack_require__(/*! ./dto/exchangeToken.dto */ \"./src/components/auth/dto/exchangeToken.dto.ts\");\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst user_decorator_1 = __webpack_require__(/*! ../../helpers/decorators/user.decorator */ \"./src/helpers/decorators/user.decorator.ts\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\nconst change_password_dto_1 = __webpack_require__(/*! ./dto/change-password.dto */ \"./src/components/auth/dto/change-password.dto.ts\");\nconst reset_password_dto_1 = __webpack_require__(/*! ./dto/reset-password.dto */ \"./src/components/auth/dto/reset-password.dto.ts\");\nlet AuthController = class AuthController {\n    constructor(usersService, hashService, authService) {\n        this.usersService = usersService;\n        this.hashService = hashService;\n        this.authService = authService;\n    }\n    login(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const user = yield this.usersService.findOneByEmail(payload.email, true);\n            if (!user) {\n                throw new common_1.UnauthorizedException(messages_enum_1.Messages.USER_NOT_FOUND);\n            }\n            const isValidPassword = yield this.hashService.compareHash(payload.password, user.password);\n            if (!isValidPassword) {\n                throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_PASSWORD);\n            }\n            return yield this.authService.singIn(user);\n        });\n    }\n    exchangeToken(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.authService.exchangeToken(payload.refreshToken);\n        });\n    }\n    googleLogin() { }\n    googleLoginCallback(user, res) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (user) {\n                res.redirect(`/auth/google/success?userId=${user.id}`);\n            }\n            else {\n                res.redirect('/auth/google/fail');\n            }\n        });\n    }\n    googleSuccess(userId) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const user = yield this.usersService.findOne(+userId);\n            if (user) {\n                return yield this.authService.singIn(user);\n            }\n        });\n    }\n    googleFail() {\n        return __awaiter(this, void 0, void 0, function* () {\n            return new common_1.UnauthorizedException(messages_enum_1.Messages.FAILED_GOOGLE_AUTH);\n        });\n    }\n    changePassword(user, payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const isValid = yield this.hashService.compareHash(payload.oldPassword, user.password);\n            if (!isValid) {\n                throw new common_1.BadRequestException(messages_enum_1.Messages.INVALID_PASSWORD);\n            }\n            const newPassword = yield this.hashService.generateHash(payload.newPassword);\n            yield this.usersService.updateOne(user.id, { password: newPassword });\n        });\n    }\n    verifyEmail(user) {\n        return __awaiter(this, void 0, void 0, function* () {\n        });\n    }\n    resetPassword(body) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const user = yield this.usersService.findOneByEmail(body.email);\n            if (!user) {\n                throw new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND);\n            }\n            yield this.authService.resetPassword(user);\n        });\n    }\n};\n__decorate([\n    common_1.Post('login'),\n    swagger_1.ApiOperation({ title: 'Login for generating access token' }),\n    __param(0, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [login_dto_1.LoginDto]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"login\", null);\n__decorate([\n    common_1.Post('token'),\n    swagger_1.ApiOperation({ title: 'Exchange refresh token for new access token' }),\n    __param(0, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [exchangeToken_dto_1.ExchangeTokenDto]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"exchangeToken\", null);\n__decorate([\n    common_1.Get('google'),\n    common_1.UseGuards(passport_1.AuthGuard('google')),\n    swagger_1.ApiOperation({ title: 'Login via google' }),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", void 0)\n], AuthController.prototype, \"googleLogin\", null);\n__decorate([\n    common_1.Get('google/callback'),\n    common_1.UseGuards(passport_1.AuthGuard('google')),\n    swagger_1.ApiOperation({ title: 'Callback for google authentication' }),\n    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Res()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object, Object]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"googleLoginCallback\", null);\n__decorate([\n    common_1.Get('google/success'),\n    swagger_1.ApiOperation({ title: 'Google success authentication' }),\n    __param(0, common_1.Query('userId')),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"googleSuccess\", null);\n__decorate([\n    common_1.Get('google/fail'),\n    swagger_1.ApiOperation({ title: 'Google failed authentication' }),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"googleFail\", null);\n__decorate([\n    common_1.Put('changePassword'),\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\n    swagger_1.ApiBearerAuth(),\n    swagger_1.ApiOperation({ title: 'Create new password' }),\n    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [user_entity_1.User, change_password_dto_1.ChangePasswordDto]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"changePassword\", null);\n__decorate([\n    common_1.Get('verifyEmail'),\n    common_1.HttpCode(common_1.HttpStatus.ACCEPTED),\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\n    swagger_1.ApiBearerAuth(),\n    swagger_1.ApiOperation({ title: 'Verify your email' }),\n    __param(0, user_decorator_1.ReqUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [user_entity_1.User]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"verifyEmail\", null);\n__decorate([\n    common_1.Post('resetPassword'),\n    common_1.HttpCode(common_1.HttpStatus.ACCEPTED),\n    swagger_1.ApiOperation({ title: 'Reset password' }),\n    __param(0, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [reset_password_dto_1.ResetPasswordDto]),\n    __metadata(\"design:returntype\", Promise)\n], AuthController.prototype, \"resetPassword\", null);\nAuthController = __decorate([\n    common_1.Controller('auth'),\n    swagger_1.ApiUseTags('Auth'),\n    __metadata(\"design:paramtypes\", [users_service_1.UsersService,\n        hash_service_1.HashService,\n        auth_service_1.AuthService])\n], AuthController);\nexports.AuthController = AuthController;\n\n\n//# sourceURL=webpack:///./src/components/auth/auth.controller.ts?");

/***/ }),

/***/ "./src/components/auth/auth.module.ts":
/*!********************************************!*\
  !*** ./src/components/auth/auth.module.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst users_module_1 = __webpack_require__(/*! ../users/users.module */ \"./src/components/users/users.module.ts\");\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst jwt_1 = __webpack_require__(/*! @nestjs/jwt */ \"@nestjs/jwt\");\nconst index_1 = __webpack_require__(/*! ../../config/index */ \"./src/config/index.ts\");\nconst auth_controller_1 = __webpack_require__(/*! ./auth.controller */ \"./src/components/auth/auth.controller.ts\");\nconst auth_service_1 = __webpack_require__(/*! ./auth.service */ \"./src/components/auth/auth.service.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst RefreshToken_entity_1 = __webpack_require__(/*! ./entities/RefreshToken.entity */ \"./src/components/auth/entities/RefreshToken.entity.ts\");\nconst jwt_strategy_1 = __webpack_require__(/*! ./strategies/jwt.strategy */ \"./src/components/auth/strategies/jwt.strategy.ts\");\nconst google_strategy_1 = __webpack_require__(/*! ./strategies/google.strategy */ \"./src/components/auth/strategies/google.strategy.ts\");\nconst core_module_1 = __webpack_require__(/*! ../core/core.module */ \"./src/components/core/core.module.ts\");\nconst user_hashes_module_1 = __webpack_require__(/*! ../user-hashes/user-hashes.module */ \"./src/components/user-hashes/user-hashes.module.ts\");\nlet AuthModule = class AuthModule {\n};\nAuthModule = __decorate([\n    common_1.Module({\n        imports: [\n            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),\n            jwt_1.JwtModule.register({\n                secretOrPrivateKey: index_1.JWT_SECRET,\n                signOptions: {\n                    expiresIn: index_1.JWT_EXPIRES,\n                },\n            }),\n            users_module_1.UsersModule,\n            core_module_1.CoreModule,\n            user_hashes_module_1.UserHashesModule,\n            typeorm_1.TypeOrmModule.forFeature([RefreshToken_entity_1.RefreshToken]),\n        ],\n        exports: [auth_service_1.AuthService],\n        controllers: [auth_controller_1.AuthController],\n        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, google_strategy_1.GoogleStrategy],\n    })\n], AuthModule);\nexports.AuthModule = AuthModule;\n\n\n//# sourceURL=webpack:///./src/components/auth/auth.module.ts?");

/***/ }),

/***/ "./src/components/auth/auth.service.ts":
/*!*********************************************!*\
  !*** ./src/components/auth/auth.service.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst jwt_1 = __webpack_require__(/*! @nestjs/jwt */ \"@nestjs/jwt\");\nconst users_service_1 = __webpack_require__(/*! ../users/services/users.service */ \"./src/components/users/services/users.service.ts\");\nconst config_1 = __webpack_require__(/*! ../../config */ \"./src/config/index.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst RefreshToken_entity_1 = __webpack_require__(/*! ./entities/RefreshToken.entity */ \"./src/components/auth/entities/RefreshToken.entity.ts\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\nconst uid = __webpack_require__(/*! uid-safe */ \"uid-safe\");\nconst user_hashes_service_1 = __webpack_require__(/*! ../user-hashes/user-hashes.service */ \"./src/components/user-hashes/user-hashes.service.ts\");\nconst hash_types_enum_1 = __webpack_require__(/*! ../../helpers/enums/hash-types.enum */ \"./src/helpers/enums/hash-types.enum.ts\");\nconst email_sending_service_1 = __webpack_require__(/*! ../core/services/email-sending.service */ \"./src/components/core/services/email-sending.service.ts\");\nconst email_templates_service_1 = __webpack_require__(/*! ../core/services/email-templates.service */ \"./src/components/core/services/email-templates.service.ts\");\nconst template_types_enum_1 = __webpack_require__(/*! ../../helpers/enums/template-types.enum */ \"./src/helpers/enums/template-types.enum.ts\");\nconst email_titles_enum_1 = __webpack_require__(/*! ../../helpers/enums/email-titles.enum */ \"./src/helpers/enums/email-titles.enum.ts\");\nconst websockets_1 = __webpack_require__(/*! @nestjs/websockets */ \"@nestjs/websockets\");\nlet AuthService = class AuthService {\n    constructor(usersService, jwtService, userHashesService, emailSendingService, emailTemplatesService, refreshTokensRepository) {\n        this.usersService = usersService;\n        this.jwtService = jwtService;\n        this.userHashesService = userHashesService;\n        this.emailSendingService = emailSendingService;\n        this.emailTemplatesService = emailTemplatesService;\n        this.refreshTokensRepository = refreshTokensRepository;\n    }\n    singIn(user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const jwtPayload = { email: user.email, id: user.id };\n            const accessToken = this.jwtService.sign(jwtPayload);\n            const refreshTokenRecord = yield this.refreshTokensRepository.findOne({ user });\n            if (refreshTokenRecord) {\n                return {\n                    accessToken,\n                    refreshToken: refreshTokenRecord.token,\n                    expiresIn: config_1.JWT_EXPIRES,\n                };\n            }\n            const refreshToken = uid.sync(30);\n            const newRefreshTokenRecord = new RefreshToken_entity_1.RefreshToken();\n            newRefreshTokenRecord.token = refreshToken;\n            newRefreshTokenRecord.user = user;\n            yield this.refreshTokensRepository.save(newRefreshTokenRecord);\n            return {\n                accessToken,\n                refreshToken,\n                expiresIn: config_1.JWT_EXPIRES,\n            };\n        });\n    }\n    validateUser(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.usersService.findOneByEmail(payload.email);\n        });\n    }\n    exchangeToken(token) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const tokenRecord = yield this.refreshTokensRepository.findOne({ token }, { relations: ['user'] });\n            if (!tokenRecord) {\n                throw new common_1.NotFoundException(messages_enum_1.Messages.REFRESH_TOKEN_NOT_FOUND);\n            }\n            yield this.refreshTokensRepository.delete(tokenRecord.id);\n            return yield this.singIn(tokenRecord.user);\n        });\n    }\n    verifyEmail({ firstName, lastName, email, id }) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.userHashesService.createOne(id, hash_types_enum_1.HashTypes.EMAIL_VERIFICATION);\n            const content = this.emailTemplatesService.getTemplate(template_types_enum_1.TemplateTypes.EMAIL_VERIFICATION, {\n                firstName,\n                lastName,\n            });\n            yield this.emailSendingService.sendSystemEmail(email, this.emailTemplatesService.createSubject(email_titles_enum_1.EmailTitles.EMAIL_VERIFICATION), content);\n        });\n    }\n    decodeToken(token) {\n        const res = this.jwtService.decode(token, {});\n        if (!res || typeof res !== 'object') {\n            throw new websockets_1.WsException(messages_enum_1.Messages.INVALID_TOKEN);\n        }\n        delete res.iat;\n        delete res.exp;\n        return res;\n    }\n    resetPassword({ firstName, lastName, email, id }) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.userHashesService.createOne(id, hash_types_enum_1.HashTypes.RESET_PASSWORD);\n            const content = this.emailTemplatesService.getTemplate(template_types_enum_1.TemplateTypes.EMAIL_VERIFICATION, {\n                firstName,\n                lastName,\n            });\n            yield this.emailSendingService.sendSystemEmail(email, this.emailTemplatesService.createSubject(email_titles_enum_1.EmailTitles.RESET_PASSWORD), content);\n        });\n    }\n};\nAuthService = __decorate([\n    common_1.Injectable(),\n    __param(5, typeorm_1.InjectRepository(RefreshToken_entity_1.RefreshToken)),\n    __metadata(\"design:paramtypes\", [users_service_1.UsersService,\n        jwt_1.JwtService,\n        user_hashes_service_1.UserHashesService,\n        email_sending_service_1.EmailSendingService,\n        email_templates_service_1.EmailTemplatesService,\n        typeorm_2.Repository])\n], AuthService);\nexports.AuthService = AuthService;\n\n\n//# sourceURL=webpack:///./src/components/auth/auth.service.ts?");

/***/ }),

/***/ "./src/components/auth/dto/change-password.dto.ts":
/*!********************************************************!*\
  !*** ./src/components/auth/dto/change-password.dto.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst index_1 = __webpack_require__(/*! ../../../config/index */ \"./src/config/index.ts\");\nclass ChangePasswordDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.MinLength(index_1.PASSWORD_LENGTH),\n    __metadata(\"design:type\", String)\n], ChangePasswordDto.prototype, \"oldPassword\", void 0);\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.MinLength(index_1.PASSWORD_LENGTH),\n    __metadata(\"design:type\", String)\n], ChangePasswordDto.prototype, \"newPassword\", void 0);\nexports.ChangePasswordDto = ChangePasswordDto;\n\n\n//# sourceURL=webpack:///./src/components/auth/dto/change-password.dto.ts?");

/***/ }),

/***/ "./src/components/auth/dto/exchangeToken.dto.ts":
/*!******************************************************!*\
  !*** ./src/components/auth/dto/exchangeToken.dto.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass ExchangeTokenDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", String)\n], ExchangeTokenDto.prototype, \"refreshToken\", void 0);\nexports.ExchangeTokenDto = ExchangeTokenDto;\n\n\n//# sourceURL=webpack:///./src/components/auth/dto/exchangeToken.dto.ts?");

/***/ }),

/***/ "./src/components/auth/dto/login.dto.ts":
/*!**********************************************!*\
  !*** ./src/components/auth/dto/login.dto.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nclass LoginDto {\n}\n__decorate([\n    class_validator_1.IsEmail(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], LoginDto.prototype, \"email\", void 0);\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.MinLength(6),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], LoginDto.prototype, \"password\", void 0);\nexports.LoginDto = LoginDto;\n\n\n//# sourceURL=webpack:///./src/components/auth/dto/login.dto.ts?");

/***/ }),

/***/ "./src/components/auth/dto/reset-password.dto.ts":
/*!*******************************************************!*\
  !*** ./src/components/auth/dto/reset-password.dto.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nclass ResetPasswordDto {\n}\n__decorate([\n    class_validator_1.IsEmail(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], ResetPasswordDto.prototype, \"email\", void 0);\nexports.ResetPasswordDto = ResetPasswordDto;\n\n\n//# sourceURL=webpack:///./src/components/auth/dto/reset-password.dto.ts?");

/***/ }),

/***/ "./src/components/auth/entities/RefreshToken.entity.ts":
/*!*************************************************************!*\
  !*** ./src/components/auth/entities/RefreshToken.entity.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst user_entity_1 = __webpack_require__(/*! ../../users/user.entity */ \"./src/components/users/user.entity.ts\");\nlet RefreshToken = class RefreshToken {\n};\n__decorate([\n    typeorm_1.PrimaryGeneratedColumn(),\n    __metadata(\"design:type\", Number)\n], RefreshToken.prototype, \"id\", void 0);\n__decorate([\n    typeorm_1.Column('varchar'),\n    typeorm_1.Index(),\n    __metadata(\"design:type\", String)\n], RefreshToken.prototype, \"token\", void 0);\n__decorate([\n    typeorm_1.OneToOne(type => user_entity_1.User),\n    typeorm_1.JoinColumn(),\n    __metadata(\"design:type\", user_entity_1.User)\n], RefreshToken.prototype, \"user\", void 0);\nRefreshToken = __decorate([\n    typeorm_1.Entity()\n], RefreshToken);\nexports.RefreshToken = RefreshToken;\n\n\n//# sourceURL=webpack:///./src/components/auth/entities/RefreshToken.entity.ts?");

/***/ }),

/***/ "./src/components/auth/strategies/google.strategy.ts":
/*!***********************************************************!*\
  !*** ./src/components/auth/strategies/google.strategy.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst passport_google_oauth20_1 = __webpack_require__(/*! passport-google-oauth20 */ \"passport-google-oauth20\");\nconst index_1 = __webpack_require__(/*! ../../../config/index */ \"./src/config/index.ts\");\nconst users_service_1 = __webpack_require__(/*! ../../users/services/users.service */ \"./src/components/users/services/users.service.ts\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nlet GoogleStrategy = class GoogleStrategy extends passport_1.PassportStrategy(passport_google_oauth20_1.Strategy, 'google') {\n    constructor(usersService) {\n        super({\n            clientID: index_1.GOOGLE_CLIENT_ID,\n            clientSecret: index_1.GOOGLE_CLIENT_SECRET,\n            callbackURL: index_1.GOOGLE_CALLBACK_URL,\n            passReqToCallback: true,\n            scope: ['openid', 'email'],\n        });\n        this.usersService = usersService;\n    }\n    validate(req, acessToken, refreshToken, profile, done) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const user = yield this.usersService.findOneByGoogleId(profile.id);\n                if (user) {\n                    return done(null, user);\n                }\n                const newUser = yield this.usersService.createByGoogle({\n                    firstName: profile.name.familyName,\n                    lastName: profile.name.givenName,\n                    email: profile.emails[0].value,\n                    googleId: profile.id,\n                });\n                return done(null, newUser);\n            }\n            catch (e) {\n                done(e, false);\n            }\n        });\n    }\n};\nGoogleStrategy = __decorate([\n    common_1.Injectable(),\n    __metadata(\"design:paramtypes\", [users_service_1.UsersService])\n], GoogleStrategy);\nexports.GoogleStrategy = GoogleStrategy;\n\n\n//# sourceURL=webpack:///./src/components/auth/strategies/google.strategy.ts?");

/***/ }),

/***/ "./src/components/auth/strategies/jwt.strategy.ts":
/*!********************************************************!*\
  !*** ./src/components/auth/strategies/jwt.strategy.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst passport_jwt_1 = __webpack_require__(/*! passport-jwt */ \"passport-jwt\");\nconst auth_service_1 = __webpack_require__(/*! ../auth.service */ \"./src/components/auth/auth.service.ts\");\nconst index_1 = __webpack_require__(/*! ../../../config/index */ \"./src/config/index.ts\");\nconst messages_enum_1 = __webpack_require__(/*! ../../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\nlet JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy, 'jwt') {\n    constructor(authService) {\n        super({\n            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),\n            secretOrKey: index_1.JWT_SECRET,\n        });\n        this.authService = authService;\n    }\n    validate(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const user = yield this.authService.validateUser(payload);\n            if (!user) {\n                throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_TOKEN);\n            }\n            return user;\n        });\n    }\n};\nJwtStrategy = __decorate([\n    common_1.Injectable(),\n    __metadata(\"design:paramtypes\", [auth_service_1.AuthService])\n], JwtStrategy);\nexports.JwtStrategy = JwtStrategy;\n\n\n//# sourceURL=webpack:///./src/components/auth/strategies/jwt.strategy.ts?");

/***/ }),

/***/ "./src/components/chats/auth-socket.guard.ts":
/*!***************************************************!*\
  !*** ./src/components/chats/auth-socket.guard.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nlet AuthSocketGuard = class AuthSocketGuard {\n    canActivate(context) {\n        const socket = context.getArgByIndex(0);\n        console.log(socket.quer);\n        return false;\n    }\n};\nAuthSocketGuard = __decorate([\n    common_1.Injectable()\n], AuthSocketGuard);\nexports.AuthSocketGuard = AuthSocketGuard;\n\n\n//# sourceURL=webpack:///./src/components/chats/auth-socket.guard.ts?");

/***/ }),

/***/ "./src/components/chats/chat.entity.ts":
/*!*********************************************!*\
  !*** ./src/components/chats/chat.entity.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\nconst message_entity_1 = __webpack_require__(/*! ../messages/message.entity */ \"./src/components/messages/message.entity.ts\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nlet Chat = class Chat extends base_entity_1.BaseEntity {\n};\n__decorate([\n    typeorm_1.Column('varchar'),\n    __metadata(\"design:type\", String)\n], Chat.prototype, \"name\", void 0);\n__decorate([\n    typeorm_1.ManyToMany(type => user_entity_1.User, user => user.chats),\n    typeorm_2.JoinTable(),\n    __metadata(\"design:type\", Array)\n], Chat.prototype, \"users\", void 0);\n__decorate([\n    typeorm_1.OneToMany(type => message_entity_1.Message, message => message.chat),\n    __metadata(\"design:type\", Array)\n], Chat.prototype, \"messages\", void 0);\nChat = __decorate([\n    typeorm_1.Entity()\n], Chat);\nexports.Chat = Chat;\n\n\n//# sourceURL=webpack:///./src/components/chats/chat.entity.ts?");

/***/ }),

/***/ "./src/components/chats/chats.actions.ts":
/*!***********************************************!*\
  !*** ./src/components/chats/chats.actions.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ADD_NEW_USER = 'ADD_NEW_USER';\nexports.UPDATED_CHAT = 'UPDATED_CHAT';\nclass UpdatedChat {\n    constructor(data) {\n        this.data = data;\n        this.event = exports.UPDATED_CHAT;\n    }\n}\nexports.UpdatedChat = UpdatedChat;\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.actions.ts?");

/***/ }),

/***/ "./src/components/chats/chats.controller.ts":
/*!**************************************************!*\
  !*** ./src/components/chats/chats.controller.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst chats_service_1 = __webpack_require__(/*! ./chats.service */ \"./src/components/chats/chats.service.ts\");\nconst user_decorator_1 = __webpack_require__(/*! ../../helpers/decorators/user.decorator */ \"./src/helpers/decorators/user.decorator.ts\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\nconst create_chat_dto_1 = __webpack_require__(/*! ./dto/http/create-chat.dto */ \"./src/components/chats/dto/http/create-chat.dto.ts\");\nconst find_chats_list_dto_1 = __webpack_require__(/*! ./dto/http/find-chats-list.dto */ \"./src/components/chats/dto/http/find-chats-list.dto.ts\");\nconst update_chat_dto_1 = __webpack_require__(/*! ./dto/http/update-chat.dto */ \"./src/components/chats/dto/http/update-chat.dto.ts\");\nlet ChatsController = class ChatsController {\n    constructor(chatsService) {\n        this.chatsService = chatsService;\n    }\n    findAll(query) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (query.ids) {\n                return yield this.chatsService.findManyByIds(query);\n            }\n            else {\n                return yield this.chatsService.findMany(query);\n            }\n        });\n    }\n    createOne(user, payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            payload.userIds.push(user.id);\n            return yield this.chatsService.createOne(payload);\n        });\n    }\n    updateOne(id, payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.chatsService.updateOne(id, payload);\n        });\n    }\n    deleteOne(user, id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.chatsService.deleteOne(id, user.id);\n        });\n    }\n};\n__decorate([\n    common_1.Get(),\n    swagger_1.ApiOperation({ title: 'Get list of chats for particular user' }),\n    __param(0, common_1.Query()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [find_chats_list_dto_1.FindChatsListDto]),\n    __metadata(\"design:returntype\", Promise)\n], ChatsController.prototype, \"findAll\", null);\n__decorate([\n    common_1.Post(),\n    swagger_1.ApiOperation({ title: 'Get list of chats for particular user' }),\n    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [user_entity_1.User, create_chat_dto_1.CreateChatDto]),\n    __metadata(\"design:returntype\", Promise)\n], ChatsController.prototype, \"createOne\", null);\n__decorate([\n    common_1.Put(':id'),\n    swagger_1.ApiOperation({ title: 'Update particular chat' }),\n    __param(0, common_1.Param('id')), __param(1, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, update_chat_dto_1.UpdateChatDto]),\n    __metadata(\"design:returntype\", Promise)\n], ChatsController.prototype, \"updateOne\", null);\n__decorate([\n    common_1.Delete(':id'),\n    swagger_1.ApiOperation({ title: 'Leave particular chat or delete if no users left' }),\n    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Param('id')),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [user_entity_1.User, Number]),\n    __metadata(\"design:returntype\", Promise)\n], ChatsController.prototype, \"deleteOne\", null);\nChatsController = __decorate([\n    common_1.Controller('chats'),\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\n    swagger_1.ApiUseTags('Chats'),\n    swagger_1.ApiBearerAuth(),\n    __metadata(\"design:paramtypes\", [chats_service_1.ChatsService])\n], ChatsController);\nexports.ChatsController = ChatsController;\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.controller.ts?");

/***/ }),

/***/ "./src/components/chats/chats.gateway.ts":
/*!***********************************************!*\
  !*** ./src/components/chats/chats.gateway.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst websockets_1 = __webpack_require__(/*! @nestjs/websockets */ \"@nestjs/websockets\");\nconst add_message_dto_1 = __webpack_require__(/*! ./dto/http/add-message.dto */ \"./src/components/chats/dto/http/add-message.dto.ts\");\nconst chatsActions = __webpack_require__(/*! ./chats.actions */ \"./src/components/chats/chats.actions.ts\");\nconst messagesActions = __webpack_require__(/*! ../messages/messages.actions */ \"./src/components/messages/messages.actions.ts\");\nconst messages_service_1 = __webpack_require__(/*! ../messages/messages.service */ \"./src/components/messages/messages.service.ts\");\nconst chats_service_1 = __webpack_require__(/*! ./chats.service */ \"./src/components/chats/chats.service.ts\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst add_new_user_dto_1 = __webpack_require__(/*! ./dto/sockets/add-new-user.dto */ \"./src/components/chats/dto/sockets/add-new-user.dto.ts\");\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\nconst auth_service_1 = __webpack_require__(/*! ../auth/auth.service */ \"./src/components/auth/auth.service.ts\");\nlet ChatsGateway = class ChatsGateway {\n    constructor(chatsService, messagesService, authService) {\n        this.chatsService = chatsService;\n        this.messagesService = messagesService;\n        this.authService = authService;\n    }\n    handleConnection(client) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { token } = client.handshake.query;\n            if (!token) {\n                throw new websockets_1.WsException(messages_enum_1.Messages.AUTH_TOKEN_NOT_FOUND);\n            }\n            const data = this.authService.decodeToken(token);\n            console.log(data);\n        });\n    }\n    onAttendUser(client, { chatId, userId }) {\n        client.join(chatId);\n        this.chatsService.addNewUser(chatId, userId);\n    }\n    onAddMessage(client, payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const message = yield this.messagesService.addMessage(payload);\n            if (message) {\n                const action = new messagesActions.AddMessage(message);\n                this.server.to(payload.chatId).emit(action.event, action.data);\n            }\n        });\n    }\n    emitMessage(group, action) {\n        this.server.to(group).emit(action.event, action.data);\n    }\n};\n__decorate([\n    websockets_1.WebSocketServer(),\n    __metadata(\"design:type\", Object)\n], ChatsGateway.prototype, \"server\", void 0);\n__decorate([\n    websockets_1.SubscribeMessage(chatsActions.ADD_NEW_USER),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object, add_new_user_dto_1.AddNewUserDto]),\n    __metadata(\"design:returntype\", void 0)\n], ChatsGateway.prototype, \"onAttendUser\", null);\n__decorate([\n    websockets_1.SubscribeMessage(messagesActions.ADD_MESSAGE),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object, add_message_dto_1.AddMessageDto]),\n    __metadata(\"design:returntype\", Promise)\n], ChatsGateway.prototype, \"onAddMessage\", null);\nChatsGateway = __decorate([\n    websockets_1.WebSocketGateway({ namespace: 'messages' }),\n    common_1.UsePipes(new common_1.ValidationPipe()),\n    __metadata(\"design:paramtypes\", [chats_service_1.ChatsService,\n        messages_service_1.MessagesService,\n        auth_service_1.AuthService])\n], ChatsGateway);\nexports.ChatsGateway = ChatsGateway;\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.gateway.ts?");

/***/ }),

/***/ "./src/components/chats/chats.module.ts":
/*!**********************************************!*\
  !*** ./src/components/chats/chats.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst chats_gateway_1 = __webpack_require__(/*! ./chats.gateway */ \"./src/components/chats/chats.gateway.ts\");\nconst chats_service_1 = __webpack_require__(/*! ./chats.service */ \"./src/components/chats/chats.service.ts\");\nconst chat_entity_1 = __webpack_require__(/*! ./chat.entity */ \"./src/components/chats/chat.entity.ts\");\nconst chats_controller_1 = __webpack_require__(/*! ./chats.controller */ \"./src/components/chats/chats.controller.ts\");\nconst messages_module_1 = __webpack_require__(/*! ../messages/messages.module */ \"./src/components/messages/messages.module.ts\");\nconst users_module_1 = __webpack_require__(/*! ../users/users.module */ \"./src/components/users/users.module.ts\");\nconst core_1 = __webpack_require__(/*! @nestjs/core */ \"@nestjs/core\");\nconst auth_socket_guard_1 = __webpack_require__(/*! ./auth-socket.guard */ \"./src/components/chats/auth-socket.guard.ts\");\nconst auth_module_1 = __webpack_require__(/*! ../auth/auth.module */ \"./src/components/auth/auth.module.ts\");\nlet ChatsModule = class ChatsModule {\n};\nChatsModule = __decorate([\n    common_1.Module({\n        imports: [\n            messages_module_1.MessagesModule,\n            typeorm_1.TypeOrmModule.forFeature([chat_entity_1.Chat]),\n            users_module_1.UsersModule,\n            auth_module_1.AuthModule,\n        ],\n        controllers: [chats_controller_1.ChatsController],\n        providers: [\n            chats_gateway_1.ChatsGateway,\n            chats_service_1.ChatsService,\n            { provide: core_1.APP_GUARD, useClass: auth_socket_guard_1.AuthSocketGuard },\n        ],\n    })\n], ChatsModule);\nexports.ChatsModule = ChatsModule;\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.module.ts?");

/***/ }),

/***/ "./src/components/chats/chats.service.ts":
/*!***********************************************!*\
  !*** ./src/components/chats/chats.service.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst chat_entity_1 = __webpack_require__(/*! ./chat.entity */ \"./src/components/chats/chat.entity.ts\");\nconst websockets_1 = __webpack_require__(/*! @nestjs/websockets */ \"@nestjs/websockets\");\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\nconst users_service_1 = __webpack_require__(/*! ../users/services/users.service */ \"./src/components/users/services/users.service.ts\");\nlet ChatsService = class ChatsService {\n    constructor(chatsRepository, usersService) {\n        this.chatsRepository = chatsRepository;\n        this.usersService = usersService;\n    }\n    findMany(query) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const options = {\n                where: {},\n                relations: [],\n            };\n            if (query.userId) {\n                options.where = {\n                    users: {\n                        id: query.userId,\n                    },\n                };\n            }\n            options.relations = this.getRelations(query);\n            return yield this.chatsRepository.find(options);\n        });\n    }\n    findManyByIds(query) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const relations = this.getRelations(query);\n            return yield this.chatsRepository.findByIds(query.ids, { relations });\n        });\n    }\n    addNewUser(chatId, userId) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const [chat, user] = yield Promise.all([\n                this.chatsRepository.findOne(chatId),\n                this.usersService.findOne(userId),\n            ]);\n            if (!user) {\n                throw new websockets_1.WsException(messages_enum_1.Messages.USER_NOT_FOUND);\n            }\n            if (!chat) {\n                throw new websockets_1.WsException(messages_enum_1.Messages.CHAT_NOT_FOUND);\n            }\n            const foundUser = chat.users.find(({ id }) => id === userId);\n            if (!foundUser) {\n                chat.users.push(user);\n            }\n            return yield this.chatsRepository.save(chat);\n        });\n    }\n    getRelations(query) {\n        const relations = [];\n        if (query.includeMessages) {\n            relations.push('messages');\n        }\n        if (query.includeUsers) {\n            relations.push('users');\n        }\n        return relations;\n    }\n    findManyWithPagination(query) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const options = {\n                where: {},\n                relations: [],\n                skip: (query.page - 1) * query.limit,\n                take: query.limit,\n            };\n            if (query.userId) {\n                options.where = {\n                    users: {\n                        id: query.userId,\n                    },\n                };\n            }\n            options.relations = this.getRelations(query);\n            const [data, totalCount] = yield this.chatsRepository.findAndCount(options);\n            return {\n                page: query.page,\n                itemsPerPage: query.limit,\n                totalCount,\n                data,\n            };\n        });\n    }\n    findOne(id, query) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const relations = [];\n            if (query.includeMessages) {\n                relations.push('messages');\n            }\n            if (query.includeUsers) {\n                relations.push('users');\n            }\n            return yield this.chatsRepository.findOne({\n                id,\n            }, { relations });\n        });\n    }\n    createOne(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const chat = new chat_entity_1.Chat();\n            chat.name = payload.name;\n            chat.createdAt = new Date();\n            chat.users = payload.userIds.map(id => ({ id }));\n            return yield this.findOne(chat.id, { includeUsers: true });\n        });\n    }\n    updateOne(id, payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.chatsRepository.update(id, payload);\n            return yield this.chatsRepository.findOne(id);\n        });\n    }\n    deleteOne(id, userId) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const chat = yield this.chatsRepository.findOne(id, { relations: ['users'] });\n            if (chat) {\n                chat.users = chat.users.filter((user) => user.id !== userId);\n                if (chat.users.length === 0) {\n                    yield this.chatsRepository.delete({ id });\n                }\n                else {\n                    yield this.chatsRepository.save(chat);\n                }\n            }\n        });\n    }\n};\nChatsService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(chat_entity_1.Chat)),\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository,\n        users_service_1.UsersService])\n], ChatsService);\nexports.ChatsService = ChatsService;\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.service.ts?");

/***/ }),

/***/ "./src/components/chats/dto/http/add-message.dto.ts":
/*!**********************************************************!*\
  !*** ./src/components/chats/dto/http/add-message.dto.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass AddMessageDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", String)\n], AddMessageDto.prototype, \"text\", void 0);\n__decorate([\n    class_validator_1.IsNumber(),\n    __metadata(\"design:type\", Number)\n], AddMessageDto.prototype, \"authorId\", void 0);\n__decorate([\n    class_validator_1.IsNumber(),\n    __metadata(\"design:type\", Number)\n], AddMessageDto.prototype, \"chatId\", void 0);\nexports.AddMessageDto = AddMessageDto;\n\n\n//# sourceURL=webpack:///./src/components/chats/dto/http/add-message.dto.ts?");

/***/ }),

/***/ "./src/components/chats/dto/http/create-chat.dto.ts":
/*!**********************************************************!*\
  !*** ./src/components/chats/dto/http/create-chat.dto.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass CreateChatDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", String)\n], CreateChatDto.prototype, \"name\", void 0);\n__decorate([\n    class_validator_1.IsArray(),\n    __metadata(\"design:type\", Array)\n], CreateChatDto.prototype, \"userIds\", void 0);\nexports.CreateChatDto = CreateChatDto;\n\n\n//# sourceURL=webpack:///./src/components/chats/dto/http/create-chat.dto.ts?");

/***/ }),

/***/ "./src/components/chats/dto/http/find-chats-list.dto.ts":
/*!**************************************************************!*\
  !*** ./src/components/chats/dto/http/find-chats-list.dto.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst pagination_dto_1 = __webpack_require__(/*! ../../../core/dto/pagination.dto */ \"./src/components/core/dto/pagination.dto.ts\");\nclass FindChatsListDto extends pagination_dto_1.PaginationDto {\n}\n__decorate([\n    class_validator_1.IsOptional(),\n    class_validator_1.ArrayNotEmpty(),\n    __metadata(\"design:type\", Array)\n], FindChatsListDto.prototype, \"ids\", void 0);\n__decorate([\n    class_validator_1.IsBooleanString(),\n    class_validator_1.IsOptional(),\n    __metadata(\"design:type\", Boolean)\n], FindChatsListDto.prototype, \"includeMessages\", void 0);\n__decorate([\n    class_validator_1.IsBooleanString(),\n    class_validator_1.IsOptional(),\n    __metadata(\"design:type\", Boolean)\n], FindChatsListDto.prototype, \"includeUsers\", void 0);\n__decorate([\n    class_validator_1.IsOptional(),\n    class_validator_1.IsNumberString(),\n    __metadata(\"design:type\", Boolean)\n], FindChatsListDto.prototype, \"userId\", void 0);\nexports.FindChatsListDto = FindChatsListDto;\n\n\n//# sourceURL=webpack:///./src/components/chats/dto/http/find-chats-list.dto.ts?");

/***/ }),

/***/ "./src/components/chats/dto/http/update-chat.dto.ts":
/*!**********************************************************!*\
  !*** ./src/components/chats/dto/http/update-chat.dto.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass UpdateChatDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.IsOptional(),\n    __metadata(\"design:type\", String)\n], UpdateChatDto.prototype, \"name\", void 0);\nexports.UpdateChatDto = UpdateChatDto;\n\n\n//# sourceURL=webpack:///./src/components/chats/dto/http/update-chat.dto.ts?");

/***/ }),

/***/ "./src/components/chats/dto/sockets/add-new-user.dto.ts":
/*!**************************************************************!*\
  !*** ./src/components/chats/dto/sockets/add-new-user.dto.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass AddNewUserDto {\n}\n__decorate([\n    class_validator_1.IsNumber(),\n    __metadata(\"design:type\", Number)\n], AddNewUserDto.prototype, \"userId\", void 0);\n__decorate([\n    class_validator_1.IsNumber(),\n    __metadata(\"design:type\", Number)\n], AddNewUserDto.prototype, \"chatId\", void 0);\nexports.AddNewUserDto = AddNewUserDto;\n\n\n//# sourceURL=webpack:///./src/components/chats/dto/sockets/add-new-user.dto.ts?");

/***/ }),

/***/ "./src/components/comments/comment.entity.ts":
/*!***************************************************!*\
  !*** ./src/components/comments/comment.entity.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\nlet Comment = class Comment extends base_entity_1.BaseEntity {\n};\n__decorate([\n    typeorm_1.Column('text'),\n    __metadata(\"design:type\", String)\n], Comment.prototype, \"text\", void 0);\n__decorate([\n    typeorm_1.ManyToOne(type => user_entity_1.User),\n    typeorm_1.JoinColumn(),\n    __metadata(\"design:type\", user_entity_1.User)\n], Comment.prototype, \"author\", void 0);\nComment = __decorate([\n    typeorm_1.Entity()\n], Comment);\nexports.Comment = Comment;\n\n\n//# sourceURL=webpack:///./src/components/comments/comment.entity.ts?");

/***/ }),

/***/ "./src/components/comments/comments.module.ts":
/*!****************************************************!*\
  !*** ./src/components/comments/comments.module.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst comments_service_1 = __webpack_require__(/*! ./comments.service */ \"./src/components/comments/comments.service.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst comment_entity_1 = __webpack_require__(/*! ./comment.entity */ \"./src/components/comments/comment.entity.ts\");\nlet CommentsModule = class CommentsModule {\n};\nCommentsModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment]),\n        ],\n        exports: [comments_service_1.CommentsService],\n        controllers: [],\n        providers: [\n            comments_service_1.CommentsService,\n        ],\n    })\n], CommentsModule);\nexports.CommentsModule = CommentsModule;\n\n\n//# sourceURL=webpack:///./src/components/comments/comments.module.ts?");

/***/ }),

/***/ "./src/components/comments/comments.service.ts":
/*!*****************************************************!*\
  !*** ./src/components/comments/comments.service.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst comment_entity_1 = __webpack_require__(/*! ./comment.entity */ \"./src/components/comments/comment.entity.ts\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nlet CommentsService = class CommentsService {\n    constructor(commentsRepository) {\n        this.commentsRepository = commentsRepository;\n    }\n    createOne(payload, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const newComment = Object.assign({}, new comment_entity_1.Comment(), payload, { author: user });\n            return yield this.commentsRepository.save(newComment);\n        });\n    }\n    updateOne(id, payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.commentsRepository.update(id, Object.assign({}, payload));\n            return yield this.commentsRepository.findOne(id);\n        });\n    }\n    deleteOne(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n        });\n    }\n};\nCommentsService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(comment_entity_1.Comment)),\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository])\n], CommentsService);\nexports.CommentsService = CommentsService;\n\n\n//# sourceURL=webpack:///./src/components/comments/comments.service.ts?");

/***/ }),

/***/ "./src/components/comments/dto/create-comment.dto.ts":
/*!***********************************************************!*\
  !*** ./src/components/comments/dto/create-comment.dto.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nclass CreateCommentDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.MinLength(1),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], CreateCommentDto.prototype, \"text\", void 0);\n__decorate([\n    class_validator_1.IsInt(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", Number)\n], CreateCommentDto.prototype, \"productId\", void 0);\nexports.CreateCommentDto = CreateCommentDto;\n\n\n//# sourceURL=webpack:///./src/components/comments/dto/create-comment.dto.ts?");

/***/ }),

/***/ "./src/components/core/base.entity.ts":
/*!********************************************!*\
  !*** ./src/components/core/base.entity.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nlet BaseEntity = class BaseEntity {\n};\n__decorate([\n    typeorm_1.PrimaryGeneratedColumn(),\n    __metadata(\"design:type\", Number)\n], BaseEntity.prototype, \"id\", void 0);\n__decorate([\n    typeorm_1.Column({ nullable: true }),\n    __metadata(\"design:type\", Date)\n], BaseEntity.prototype, \"createdAt\", void 0);\n__decorate([\n    typeorm_1.Column({ nullable: true }),\n    __metadata(\"design:type\", Date)\n], BaseEntity.prototype, \"updatedAt\", void 0);\n__decorate([\n    typeorm_1.Column({ nullable: true }),\n    __metadata(\"design:type\", Date)\n], BaseEntity.prototype, \"deletedAt\", void 0);\n__decorate([\n    typeorm_1.Column({ default: false }),\n    __metadata(\"design:type\", Boolean)\n], BaseEntity.prototype, \"deleted\", void 0);\nBaseEntity = __decorate([\n    typeorm_1.Entity()\n], BaseEntity);\nexports.BaseEntity = BaseEntity;\n\n\n//# sourceURL=webpack:///./src/components/core/base.entity.ts?");

/***/ }),

/***/ "./src/components/core/core.module.ts":
/*!********************************************!*\
  !*** ./src/components/core/core.module.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst hash_service_1 = __webpack_require__(/*! ./services/hash.service */ \"./src/components/core/services/hash.service.ts\");\nconst email_sending_service_1 = __webpack_require__(/*! ./services/email-sending.service */ \"./src/components/core/services/email-sending.service.ts\");\nconst email_templates_service_1 = __webpack_require__(/*! ./services/email-templates.service */ \"./src/components/core/services/email-templates.service.ts\");\nconst exportedProviders = [\n    hash_service_1.HashService,\n    email_sending_service_1.EmailSendingService,\n    email_templates_service_1.EmailTemplatesService,\n];\nlet CoreModule = class CoreModule {\n};\nCoreModule = __decorate([\n    common_1.Module({\n        imports: [],\n        exports: [...exportedProviders],\n        controllers: [],\n        providers: [...exportedProviders],\n    })\n], CoreModule);\nexports.CoreModule = CoreModule;\n\n\n//# sourceURL=webpack:///./src/components/core/core.module.ts?");

/***/ }),

/***/ "./src/components/core/dto/pagination.dto.ts":
/*!***************************************************!*\
  !*** ./src/components/core/dto/pagination.dto.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass PaginationDto {\n}\n__decorate([\n    class_validator_1.IsOptional(),\n    class_validator_1.IsNumberString(),\n    __metadata(\"design:type\", Number)\n], PaginationDto.prototype, \"page\", void 0);\n__decorate([\n    class_validator_1.IsOptional(),\n    class_validator_1.IsNumberString(),\n    __metadata(\"design:type\", Number)\n], PaginationDto.prototype, \"limit\", void 0);\nexports.PaginationDto = PaginationDto;\n\n\n//# sourceURL=webpack:///./src/components/core/dto/pagination.dto.ts?");

/***/ }),

/***/ "./src/components/core/services/email-sending.service.ts":
/*!***************************************************************!*\
  !*** ./src/components/core/services/email-sending.service.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst sgEmail = __webpack_require__(/*! @sendgrid/mail */ \"@sendgrid/mail\");\nconst config_1 = __webpack_require__(/*! ../../../config */ \"./src/config/index.ts\");\nlet EmailSendingService = class EmailSendingService {\n    constructor() {\n        this.client = sgEmail;\n        this.client.setApiKey(config_1.SENDGRID_KEY);\n    }\n    sendSystemEmail(email, subject, template) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                yield this.client.send({\n                    from: config_1.SYSTEM_EMAIL,\n                    to: email,\n                    subject,\n                    html: template,\n                });\n            }\n            catch (e) {\n                throw new common_1.InternalServerErrorException();\n            }\n        });\n    }\n};\nEmailSendingService = __decorate([\n    common_1.Injectable(),\n    __metadata(\"design:paramtypes\", [])\n], EmailSendingService);\nexports.EmailSendingService = EmailSendingService;\n\n\n//# sourceURL=webpack:///./src/components/core/services/email-sending.service.ts?");

/***/ }),

/***/ "./src/components/core/services/email-templates.service.ts":
/*!*****************************************************************!*\
  !*** ./src/components/core/services/email-templates.service.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst template_types_enum_1 = __webpack_require__(/*! ../../../helpers/enums/template-types.enum */ \"./src/helpers/enums/template-types.enum.ts\");\nconst pug_1 = __webpack_require__(/*! pug */ \"pug\");\nconst path_1 = __webpack_require__(/*! path */ \"path\");\nconst config_1 = __webpack_require__(/*! ../../../config */ \"./src/config/index.ts\");\nlet EmailTemplatesService = class EmailTemplatesService {\n    getTemplate(type, data) {\n        switch (type) {\n            case template_types_enum_1.TemplateTypes.EMAIL_VERIFICATION:\n                return this.renderTemplate('email-verification')(data);\n            case template_types_enum_1.TemplateTypes.RESET_PASSWORD:\n                return this.renderTemplate('reset-password')(data);\n        }\n    }\n    renderTemplate(filename) {\n        return pug_1.compileFile(path_1.join(config_1.EMAIL_TEMPLATES_FOLDER, `${filename}.pug`));\n    }\n    createSubject(title) {\n        return `${config_1.APP_NAME} ${title}`;\n    }\n};\nEmailTemplatesService = __decorate([\n    common_1.Injectable()\n], EmailTemplatesService);\nexports.EmailTemplatesService = EmailTemplatesService;\n\n\n//# sourceURL=webpack:///./src/components/core/services/email-templates.service.ts?");

/***/ }),

/***/ "./src/components/core/services/hash.service.ts":
/*!******************************************************!*\
  !*** ./src/components/core/services/hash.service.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\nlet HashService = class HashService {\n    constructor() {\n        this.SALT_ROUNDS = 10;\n    }\n    generateHash(str) {\n        return bcrypt.hash(str, this.SALT_ROUNDS);\n    }\n    compareHash(str, hash) {\n        return bcrypt.compare(str, hash);\n    }\n};\nHashService = __decorate([\n    common_1.Injectable()\n], HashService);\nexports.HashService = HashService;\n\n\n//# sourceURL=webpack:///./src/components/core/services/hash.service.ts?");

/***/ }),

/***/ "./src/components/files/file.entity.ts":
/*!*********************************************!*\
  !*** ./src/components/files/file.entity.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst product_entity_1 = __webpack_require__(/*! ../products/product.entity */ \"./src/components/products/product.entity.ts\");\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\nlet File = class File extends base_entity_1.BaseEntity {\n};\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], File.prototype, \"url\", void 0);\n__decorate([\n    typeorm_1.Column({ nullable: true }),\n    __metadata(\"design:type\", String)\n], File.prototype, \"publicId\", void 0);\n__decorate([\n    typeorm_1.ManyToOne(type => product_entity_1.Product),\n    __metadata(\"design:type\", product_entity_1.Product)\n], File.prototype, \"product\", void 0);\nFile = __decorate([\n    typeorm_1.Entity()\n], File);\nexports.File = File;\n\n\n//# sourceURL=webpack:///./src/components/files/file.entity.ts?");

/***/ }),

/***/ "./src/components/files/files.controller.ts":
/*!**************************************************!*\
  !*** ./src/components/files/files.controller.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst files_service_1 = __webpack_require__(/*! ./files.service */ \"./src/components/files/files.service.ts\");\nlet FilesController = class FilesController {\n    constructor(filesService) {\n        this.filesService = filesService;\n    }\n    uploadFile(file) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.filesService.uploadFile(file);\n        });\n    }\n    uploadFilesList(files) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.filesService.uploadFilesList(files);\n        });\n    }\n};\n__decorate([\n    common_1.Post(''),\n    common_1.UseInterceptors(common_1.FileInterceptor('file')),\n    swagger_1.ApiOperation({ title: 'Upload one file' }),\n    __param(0, common_1.UploadedFile()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object]),\n    __metadata(\"design:returntype\", Promise)\n], FilesController.prototype, \"uploadFile\", null);\n__decorate([\n    common_1.Post('list'),\n    common_1.UseInterceptors(common_1.FilesInterceptor('files')),\n    swagger_1.ApiOperation({ title: 'Upload one file' }),\n    __param(0, common_1.UploadedFile()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Array]),\n    __metadata(\"design:returntype\", Promise)\n], FilesController.prototype, \"uploadFilesList\", null);\nFilesController = __decorate([\n    common_1.Controller('files'),\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\n    swagger_1.ApiUseTags('Files'),\n    __metadata(\"design:paramtypes\", [files_service_1.FilesService])\n], FilesController);\nexports.FilesController = FilesController;\n\n\n//# sourceURL=webpack:///./src/components/files/files.controller.ts?");

/***/ }),

/***/ "./src/components/files/files.module.ts":
/*!**********************************************!*\
  !*** ./src/components/files/files.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst files_service_1 = __webpack_require__(/*! ./files.service */ \"./src/components/files/files.service.ts\");\nconst file_entity_1 = __webpack_require__(/*! ./file.entity */ \"./src/components/files/file.entity.ts\");\nconst files_controller_1 = __webpack_require__(/*! ./files.controller */ \"./src/components/files/files.controller.ts\");\nlet FilesModule = class FilesModule {\n};\nFilesModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forFeature([file_entity_1.File]),\n            common_1.MulterModule.register({\n                dest: './upload',\n            }),\n        ],\n        exports: [files_service_1.FilesService, common_1.MulterModule],\n        controllers: [files_controller_1.FilesController],\n        providers: [files_service_1.FilesService],\n    })\n], FilesModule);\nexports.FilesModule = FilesModule;\n\n\n//# sourceURL=webpack:///./src/components/files/files.module.ts?");

/***/ }),

/***/ "./src/components/files/files.service.ts":
/*!***********************************************!*\
  !*** ./src/components/files/files.service.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst cloudinary = __webpack_require__(/*! cloudinary */ \"cloudinary\");\nconst path_1 = __webpack_require__(/*! path */ \"path\");\nconst util_1 = __webpack_require__(/*! util */ \"util\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst config_1 = __webpack_require__(/*! ../../config */ \"./src/config/index.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst file_entity_1 = __webpack_require__(/*! ./file.entity */ \"./src/components/files/file.entity.ts\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\ncloudinary.v2.uploader.upload = util_1.promisify(cloudinary.v2.uploader.upload);\nconst unlink = util_1.promisify(fs.unlink);\nlet FilesService = class FilesService {\n    constructor(filesRepository) {\n        this.filesRepository = filesRepository;\n        this.cloudinary = cloudinary;\n        this.cloudinary.config({\n            cloud_name: config_1.CLOUDINARY_CLOUD_NAME,\n            api_key: config_1.CLOUDINARY_API_KEY,\n            api_secret: config_1.CLOUDINARY_API_SECRET,\n        });\n    }\n    findOne(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.filesRepository.findOne(id);\n        });\n    }\n    uploadFile(file) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const path = path_1.join(config_1.FILES_UPLOAD_FOLDER, file.filename);\n            const { url, public_id } = yield this.cloudinary.v2.uploader.upload(path);\n            yield unlink(path);\n            const newFile = Object.assign({}, new file_entity_1.File(), { url, publicId: public_id });\n            return yield this.filesRepository.save(newFile);\n        });\n    }\n    uploadFilesList(files) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const uploadedFiles = yield Promise.all(files.map(file => this.cloudinary.v2.uploader.upload(path_1.join(config_1.FILES_UPLOAD_FOLDER, file.filename))));\n            return yield this.filesRepository.save(uploadedFiles.map(({ url, public_id }) => {\n                return Object.assign({}, new file_entity_1.File(), { url, publicId: public_id });\n            }));\n        });\n    }\n    deleteOne(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const file = yield this.filesRepository.findOne(id);\n            if (!file) {\n                throw new common_1.NotFoundException(messages_enum_1.Messages.FILE_NOT_FOUND);\n            }\n            yield this.cloudinary.v2.uploader.destroy(file.publicId);\n            yield this.filesRepository.delete({ id });\n        });\n    }\n};\nFilesService = __decorate([\n    __param(0, typeorm_1.InjectRepository(file_entity_1.File)),\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository])\n], FilesService);\nexports.FilesService = FilesService;\n\n\n//# sourceURL=webpack:///./src/components/files/files.service.ts?");

/***/ }),

/***/ "./src/components/messages/dto/add-message.dto.ts":
/*!********************************************************!*\
  !*** ./src/components/messages/dto/add-message.dto.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nclass AddMessageDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", String)\n], AddMessageDto.prototype, \"text\", void 0);\n__decorate([\n    class_validator_1.IsNumber(),\n    __metadata(\"design:type\", Number)\n], AddMessageDto.prototype, \"authorId\", void 0);\n__decorate([\n    class_validator_1.IsNumber(),\n    __metadata(\"design:type\", Number)\n], AddMessageDto.prototype, \"chatId\", void 0);\nexports.AddMessageDto = AddMessageDto;\n\n\n//# sourceURL=webpack:///./src/components/messages/dto/add-message.dto.ts?");

/***/ }),

/***/ "./src/components/messages/message.entity.ts":
/*!***************************************************!*\
  !*** ./src/components/messages/message.entity.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\nconst chat_entity_1 = __webpack_require__(/*! ../chats/chat.entity */ \"./src/components/chats/chat.entity.ts\");\nlet Message = class Message {\n};\n__decorate([\n    typeorm_1.PrimaryGeneratedColumn(),\n    __metadata(\"design:type\", Number)\n], Message.prototype, \"id\", void 0);\n__decorate([\n    typeorm_1.Column('varchar'),\n    __metadata(\"design:type\", String)\n], Message.prototype, \"text\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], Message.prototype, \"createdAt\", void 0);\n__decorate([\n    typeorm_1.ManyToOne(type => user_entity_1.User),\n    typeorm_1.JoinColumn(),\n    __metadata(\"design:type\", user_entity_1.User)\n], Message.prototype, \"author\", void 0);\n__decorate([\n    typeorm_1.ManyToOne(type => chat_entity_1.Chat, chat => chat.messages),\n    typeorm_1.JoinColumn(),\n    __metadata(\"design:type\", chat_entity_1.Chat)\n], Message.prototype, \"chat\", void 0);\nMessage = __decorate([\n    typeorm_1.Entity()\n], Message);\nexports.Message = Message;\n\n\n//# sourceURL=webpack:///./src/components/messages/message.entity.ts?");

/***/ }),

/***/ "./src/components/messages/messages.actions.ts":
/*!*****************************************************!*\
  !*** ./src/components/messages/messages.actions.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.ADD_MESSAGE = 'ADD_MESSAGE';\nexports.UPDATE_MESSAGE = 'UPDATE_MESSAGE';\nexports.REMOVE_MESSAGE = 'REMOVE_MESSAGE';\nclass AddMessage {\n    constructor(data) {\n        this.data = data;\n        this.event = exports.ADD_MESSAGE;\n    }\n}\nexports.AddMessage = AddMessage;\nclass UpdateMessage {\n    constructor(data) {\n        this.data = data;\n        this.event = exports.UPDATE_MESSAGE;\n    }\n}\nexports.UpdateMessage = UpdateMessage;\nclass RemoveMessage {\n    constructor(data = null) {\n        this.data = data;\n        this.event = exports.REMOVE_MESSAGE;\n    }\n}\nexports.RemoveMessage = RemoveMessage;\n\n\n//# sourceURL=webpack:///./src/components/messages/messages.actions.ts?");

/***/ }),

/***/ "./src/components/messages/messages.gateway.ts":
/*!*****************************************************!*\
  !*** ./src/components/messages/messages.gateway.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst websockets_1 = __webpack_require__(/*! @nestjs/websockets */ \"@nestjs/websockets\");\nconst actions = __webpack_require__(/*! ./messages.actions */ \"./src/components/messages/messages.actions.ts\");\nconst add_message_dto_1 = __webpack_require__(/*! ./dto/add-message.dto */ \"./src/components/messages/dto/add-message.dto.ts\");\nconst messages_service_1 = __webpack_require__(/*! ./messages.service */ \"./src/components/messages/messages.service.ts\");\nlet MessagesGateway = class MessagesGateway {\n    constructor(messagesService) {\n        this.messagesService = messagesService;\n    }\n    handleConnection(client) {\n        console.log('New');\n    }\n    onAttendUser(client, { chatId }) {\n        client.join(chatId);\n    }\n    onAddMessage(client, payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            this.server.to(payload.chatId).emit(actions.ADD_MESSAGE, { title: 'Response' });\n        });\n    }\n};\n__decorate([\n    websockets_1.WebSocketServer(),\n    __metadata(\"design:type\", Object)\n], MessagesGateway.prototype, \"server\", void 0);\n__decorate([\n    websockets_1.SubscribeMessage('ADD_USER'),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object, Object]),\n    __metadata(\"design:returntype\", void 0)\n], MessagesGateway.prototype, \"onAttendUser\", null);\n__decorate([\n    websockets_1.SubscribeMessage(actions.ADD_MESSAGE),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Object, add_message_dto_1.AddMessageDto]),\n    __metadata(\"design:returntype\", Promise)\n], MessagesGateway.prototype, \"onAddMessage\", null);\nMessagesGateway = __decorate([\n    websockets_1.WebSocketGateway({ namespace: 'messages' }),\n    __metadata(\"design:paramtypes\", [messages_service_1.MessagesService])\n], MessagesGateway);\nexports.MessagesGateway = MessagesGateway;\n\n\n//# sourceURL=webpack:///./src/components/messages/messages.gateway.ts?");

/***/ }),

/***/ "./src/components/messages/messages.module.ts":
/*!****************************************************!*\
  !*** ./src/components/messages/messages.module.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst messages_service_1 = __webpack_require__(/*! ./messages.service */ \"./src/components/messages/messages.service.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst message_entity_1 = __webpack_require__(/*! ./message.entity */ \"./src/components/messages/message.entity.ts\");\nconst messages_gateway_1 = __webpack_require__(/*! ./messages.gateway */ \"./src/components/messages/messages.gateway.ts\");\nlet MessagesModule = class MessagesModule {\n};\nMessagesModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message]),\n        ],\n        controllers: [],\n        exports: [messages_service_1.MessagesService],\n        providers: [messages_service_1.MessagesService, messages_gateway_1.MessagesGateway],\n    })\n], MessagesModule);\nexports.MessagesModule = MessagesModule;\n\n\n//# sourceURL=webpack:///./src/components/messages/messages.module.ts?");

/***/ }),

/***/ "./src/components/messages/messages.service.ts":
/*!*****************************************************!*\
  !*** ./src/components/messages/messages.service.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst message_entity_1 = __webpack_require__(/*! ./message.entity */ \"./src/components/messages/message.entity.ts\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nlet MessagesService = class MessagesService {\n    constructor(messagesRepository) {\n        this.messagesRepository = messagesRepository;\n    }\n    addMessage(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const newMessage = Object.assign({}, new message_entity_1.Message(), { text: payload.text, author: { id: payload.authorId }, createdAt: new Date().toISOString() });\n            return yield this.messagesRepository.save(newMessage);\n        });\n    }\n    updateMessage(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.messagesRepository.update({\n                id: payload.id,\n            }, {\n                text: payload.text,\n            });\n            return this.messagesRepository.findOne({ relations: ['author'] });\n        });\n    }\n    removeMessage(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.messagesRepository.delete({ id });\n        });\n    }\n};\nMessagesService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(message_entity_1.Message)),\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository])\n], MessagesService);\nexports.MessagesService = MessagesService;\n\n\n//# sourceURL=webpack:///./src/components/messages/messages.service.ts?");

/***/ }),

/***/ "./src/components/orders/dto/create-order.dto.ts":
/*!*******************************************************!*\
  !*** ./src/components/orders/dto/create-order.dto.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst card_cvv_validator_1 = __webpack_require__(/*! ../../../helpers/card-validators/card-cvv.validator */ \"./src/helpers/card-validators/card-cvv.validator.ts\");\nconst card_expires_in_validator_1 = __webpack_require__(/*! ../../../helpers/card-validators/card-expires-in.validator */ \"./src/helpers/card-validators/card-expires-in.validator.ts\");\nclass CreateOrderDto {\n}\n__decorate([\n    class_validator_1.IsCreditCard(),\n    __metadata(\"design:type\", Number)\n], CreateOrderDto.prototype, \"cardNumber\", void 0);\n__decorate([\n    class_validator_1.IsNumber(),\n    class_validator_1.Validate(card_cvv_validator_1.CardCvvValidator),\n    __metadata(\"design:type\", Number)\n], CreateOrderDto.prototype, \"cvv\", void 0);\n__decorate([\n    class_validator_1.IsDate(),\n    class_validator_1.Validate(card_expires_in_validator_1.CardExpiresInValidator),\n    __metadata(\"design:type\", Date)\n], CreateOrderDto.prototype, \"expiresIn\", void 0);\n__decorate([\n    class_validator_1.ArrayNotEmpty(),\n    __metadata(\"design:type\", Array)\n], CreateOrderDto.prototype, \"productIds\", void 0);\nexports.CreateOrderDto = CreateOrderDto;\n\n\n//# sourceURL=webpack:///./src/components/orders/dto/create-order.dto.ts?");

/***/ }),

/***/ "./src/components/orders/order.entity.ts":
/*!***********************************************!*\
  !*** ./src/components/orders/order.entity.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\nconst product_entity_1 = __webpack_require__(/*! ../products/product.entity */ \"./src/components/products/product.entity.ts\");\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\nlet Order = class Order extends base_entity_1.BaseEntity {\n};\n__decorate([\n    typeorm_1.ManyToOne(type => user_entity_1.User),\n    typeorm_1.JoinColumn(),\n    __metadata(\"design:type\", user_entity_1.User)\n], Order.prototype, \"user\", void 0);\n__decorate([\n    typeorm_1.ManyToMany(type => product_entity_1.Product, product => product.orders),\n    __metadata(\"design:type\", Array)\n], Order.prototype, \"products\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", Number)\n], Order.prototype, \"totalPrice\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", Number)\n], Order.prototype, \"totalCount\", void 0);\nOrder = __decorate([\n    typeorm_1.Entity()\n], Order);\nexports.Order = Order;\n\n\n//# sourceURL=webpack:///./src/components/orders/order.entity.ts?");

/***/ }),

/***/ "./src/components/orders/orders.controller.ts":
/*!****************************************************!*\
  !*** ./src/components/orders/orders.controller.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst create_order_dto_1 = __webpack_require__(/*! ./dto/create-order.dto */ \"./src/components/orders/dto/create-order.dto.ts\");\nconst orders_service_1 = __webpack_require__(/*! ./orders.service */ \"./src/components/orders/orders.service.ts\");\nconst products_service_1 = __webpack_require__(/*! ../products/products.service */ \"./src/components/products/products.service.ts\");\nlet OrdersController = class OrdersController {\n    constructor(ordersService, productsService) {\n        this.ordersService = ordersService;\n        this.productsService = productsService;\n    }\n    createOne(body) {\n        return __awaiter(this, void 0, void 0, function* () {\n        });\n    }\n};\n__decorate([\n    common_1.Post(''),\n    swagger_1.ApiOperation({ title: 'Create new order' }),\n    __param(0, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [create_order_dto_1.CreateOrderDto]),\n    __metadata(\"design:returntype\", Promise)\n], OrdersController.prototype, \"createOne\", null);\nOrdersController = __decorate([\n    common_1.Controller('orders'),\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\n    swagger_1.ApiUseTags('Orders'),\n    __metadata(\"design:paramtypes\", [orders_service_1.OrdersService,\n        products_service_1.ProductsService])\n], OrdersController);\nexports.OrdersController = OrdersController;\n\n\n//# sourceURL=webpack:///./src/components/orders/orders.controller.ts?");

/***/ }),

/***/ "./src/components/orders/orders.module.ts":
/*!************************************************!*\
  !*** ./src/components/orders/orders.module.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst order_entity_1 = __webpack_require__(/*! ./order.entity */ \"./src/components/orders/order.entity.ts\");\nconst orders_controller_1 = __webpack_require__(/*! ./orders.controller */ \"./src/components/orders/orders.controller.ts\");\nconst orders_service_1 = __webpack_require__(/*! ./orders.service */ \"./src/components/orders/orders.service.ts\");\nconst products_module_1 = __webpack_require__(/*! ../products/products.module */ \"./src/components/products/products.module.ts\");\nconst users_module_1 = __webpack_require__(/*! ../users/users.module */ \"./src/components/users/users.module.ts\");\nlet OrdersModule = class OrdersModule {\n};\nOrdersModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order]),\n            products_module_1.ProductsModule,\n            users_module_1.UsersModule,\n        ],\n        controllers: [orders_controller_1.OrdersController],\n        providers: [orders_service_1.OrdersService],\n        exports: [],\n    })\n], OrdersModule);\nexports.OrdersModule = OrdersModule;\n\n\n//# sourceURL=webpack:///./src/components/orders/orders.module.ts?");

/***/ }),

/***/ "./src/components/orders/orders.service.ts":
/*!*************************************************!*\
  !*** ./src/components/orders/orders.service.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nlet OrdersService = class OrdersService {\n};\nOrdersService = __decorate([\n    common_1.Injectable()\n], OrdersService);\nexports.OrdersService = OrdersService;\n\n\n//# sourceURL=webpack:///./src/components/orders/orders.service.ts?");

/***/ }),

/***/ "./src/components/products/dto/create-product.dto.ts":
/*!***********************************************************!*\
  !*** ./src/components/products/dto/create-product.dto.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nclass CreateProductDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], CreateProductDto.prototype, \"title\", void 0);\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.IsOptional(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], CreateProductDto.prototype, \"description\", void 0);\n__decorate([\n    class_validator_1.IsNumber(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", Number)\n], CreateProductDto.prototype, \"mainImageId\", void 0);\n__decorate([\n    class_validator_1.IsInt(),\n    class_validator_1.Min(0),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", Number)\n], CreateProductDto.prototype, \"quantity\", void 0);\n__decorate([\n    class_validator_1.IsNumber(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", Number)\n], CreateProductDto.prototype, \"price\", void 0);\nexports.CreateProductDto = CreateProductDto;\n\n\n//# sourceURL=webpack:///./src/components/products/dto/create-product.dto.ts?");

/***/ }),

/***/ "./src/components/products/dto/update-product.dto.ts":
/*!***********************************************************!*\
  !*** ./src/components/products/dto/update-product.dto.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nclass UpdateProductDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], UpdateProductDto.prototype, \"title\", void 0);\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.IsOptional(),\n    swagger_1.ApiModelPropertyOptional(),\n    __metadata(\"design:type\", String)\n], UpdateProductDto.prototype, \"description\", void 0);\n__decorate([\n    class_validator_1.IsNumber(),\n    class_validator_1.Min(0),\n    class_validator_1.IsOptional(),\n    swagger_1.ApiModelPropertyOptional(),\n    __metadata(\"design:type\", Number)\n], UpdateProductDto.prototype, \"quantity\", void 0);\n__decorate([\n    class_validator_1.IsNumber(),\n    class_validator_1.Min(0),\n    class_validator_1.IsOptional(),\n    swagger_1.ApiModelPropertyOptional(),\n    __metadata(\"design:type\", Number)\n], UpdateProductDto.prototype, \"price\", void 0);\nexports.UpdateProductDto = UpdateProductDto;\n\n\n//# sourceURL=webpack:///./src/components/products/dto/update-product.dto.ts?");

/***/ }),

/***/ "./src/components/products/product.entity.ts":
/*!***************************************************!*\
  !*** ./src/components/products/product.entity.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\nconst file_entity_1 = __webpack_require__(/*! ../files/file.entity */ \"./src/components/files/file.entity.ts\");\nconst order_entity_1 = __webpack_require__(/*! ../orders/order.entity */ \"./src/components/orders/order.entity.ts\");\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\nlet Product = class Product extends base_entity_1.BaseEntity {\n};\n__decorate([\n    typeorm_1.Column('varchar'),\n    __metadata(\"design:type\", String)\n], Product.prototype, \"title\", void 0);\n__decorate([\n    typeorm_1.Column({ type: 'text', nullable: true }),\n    __metadata(\"design:type\", String)\n], Product.prototype, \"description\", void 0);\n__decorate([\n    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.products),\n    typeorm_1.JoinColumn(),\n    __metadata(\"design:type\", user_entity_1.User)\n], Product.prototype, \"seller\", void 0);\n__decorate([\n    typeorm_1.OneToOne(type => file_entity_1.File),\n    typeorm_1.JoinColumn(),\n    __metadata(\"design:type\", file_entity_1.File)\n], Product.prototype, \"mainImage\", void 0);\n__decorate([\n    typeorm_1.OneToMany(type => file_entity_1.File, image => image.product),\n    __metadata(\"design:type\", Array)\n], Product.prototype, \"images\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", Number)\n], Product.prototype, \"quantity\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", Number)\n], Product.prototype, \"price\", void 0);\n__decorate([\n    typeorm_1.ManyToMany(type => order_entity_1.Order, order => order.products),\n    __metadata(\"design:type\", Array)\n], Product.prototype, \"orders\", void 0);\nProduct = __decorate([\n    typeorm_1.Entity()\n], Product);\nexports.Product = Product;\n\n\n//# sourceURL=webpack:///./src/components/products/product.entity.ts?");

/***/ }),

/***/ "./src/components/products/products.controller.ts":
/*!********************************************************!*\
  !*** ./src/components/products/products.controller.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst create_product_dto_1 = __webpack_require__(/*! ./dto/create-product.dto */ \"./src/components/products/dto/create-product.dto.ts\");\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst products_service_1 = __webpack_require__(/*! ./products.service */ \"./src/components/products/products.service.ts\");\nconst files_service_1 = __webpack_require__(/*! ../files/files.service */ \"./src/components/files/files.service.ts\");\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\nconst user_decorator_1 = __webpack_require__(/*! ../../helpers/decorators/user.decorator */ \"./src/helpers/decorators/user.decorator.ts\");\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\nconst create_comment_dto_1 = __webpack_require__(/*! ../comments/dto/create-comment.dto */ \"./src/components/comments/dto/create-comment.dto.ts\");\nconst comments_service_1 = __webpack_require__(/*! ../comments/comments.service */ \"./src/components/comments/comments.service.ts\");\nconst update_product_dto_1 = __webpack_require__(/*! ./dto/update-product.dto */ \"./src/components/products/dto/update-product.dto.ts\");\nlet ProductsController = class ProductsController {\n    constructor(productsService, commentsService, filesService) {\n        this.productsService = productsService;\n        this.commentsService = commentsService;\n        this.filesService = filesService;\n    }\n    createOne(payload, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const mainImage = yield this.filesService.findOne(payload.mainImageId);\n            if (!mainImage) {\n                throw new common_1.NotFoundException(messages_enum_1.Messages.FILE_NOT_FOUND);\n            }\n            const productData = Object.assign({}, payload, { mainImage });\n            return yield this.productsService.createOne(productData, user);\n        });\n    }\n    updateOne(id, payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.productsService.updateOne(id, payload);\n        });\n    }\n    createProductComment(productId, payload, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const product = yield this.productsService.findOne(productId, {});\n            if (!product) {\n                throw new common_1.NotFoundException(messages_enum_1.Messages.PRODUCT_NOT_FOUND);\n            }\n            yield this.commentsService.createOne(payload, user);\n            return yield this.productsService.findOne(productId, { includeComments: true });\n        });\n    }\n    updateProductComment(productId, commentId, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const product = yield this.productsService.findOne(productId, {});\n            if (!product || product.seller.id !== user.id) {\n                throw new common_1.ForbiddenException(messages_enum_1.Messages.INVALID_RIGHTS_TO_DELETE_COMMENT);\n            }\n            yield this.commentsService.deleteOne(commentId);\n            return yield this.productsService.findOne(productId, { includeComments: true });\n        });\n    }\n    deleteOne(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.productsService.deleteOne(id);\n        });\n    }\n};\n__decorate([\n    common_1.Post(),\n    swagger_1.ApiOperation({ title: 'Create new product' }),\n    __param(0, common_1.Body()), __param(1, user_decorator_1.ReqUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [create_product_dto_1.CreateProductDto, user_entity_1.User]),\n    __metadata(\"design:returntype\", Promise)\n], ProductsController.prototype, \"createOne\", null);\n__decorate([\n    common_1.Put(':id'),\n    swagger_1.ApiOperation({ title: 'Update existing product by id' }),\n    __param(0, common_1.Param('id')), __param(1, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, update_product_dto_1.UpdateProductDto]),\n    __metadata(\"design:returntype\", Promise)\n], ProductsController.prototype, \"updateOne\", null);\n__decorate([\n    common_1.Put(':productId/comments'),\n    swagger_1.ApiOperation({ title: 'Create comment for product' }),\n    __param(0, common_1.Param('productId')),\n    __param(1, common_1.Body()),\n    __param(2, user_decorator_1.ReqUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, create_comment_dto_1.CreateCommentDto,\n        user_entity_1.User]),\n    __metadata(\"design:returntype\", Promise)\n], ProductsController.prototype, \"createProductComment\", null);\n__decorate([\n    common_1.Delete(':productId/comments/:commentId'),\n    swagger_1.ApiOperation({ title: 'Delete comment', description: 'It can be done only by seller of product' }),\n    __param(0, common_1.Param('productId')),\n    __param(1, common_1.Param('commentId')),\n    __param(2, user_decorator_1.ReqUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number, Number, user_entity_1.User]),\n    __metadata(\"design:returntype\", Promise)\n], ProductsController.prototype, \"updateProductComment\", null);\n__decorate([\n    common_1.Delete(':id'),\n    __param(0, common_1.Param('id')),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number]),\n    __metadata(\"design:returntype\", Promise)\n], ProductsController.prototype, \"deleteOne\", null);\nProductsController = __decorate([\n    common_1.Controller('products'),\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\n    swagger_1.ApiUseTags('Products'),\n    swagger_1.ApiBearerAuth(),\n    __metadata(\"design:paramtypes\", [products_service_1.ProductsService,\n        comments_service_1.CommentsService,\n        files_service_1.FilesService])\n], ProductsController);\nexports.ProductsController = ProductsController;\n\n\n//# sourceURL=webpack:///./src/components/products/products.controller.ts?");

/***/ }),

/***/ "./src/components/products/products.module.ts":
/*!****************************************************!*\
  !*** ./src/components/products/products.module.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst products_controller_1 = __webpack_require__(/*! ./products.controller */ \"./src/components/products/products.controller.ts\");\nconst products_service_1 = __webpack_require__(/*! ./products.service */ \"./src/components/products/products.service.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst product_entity_1 = __webpack_require__(/*! ./product.entity */ \"./src/components/products/product.entity.ts\");\nconst files_module_1 = __webpack_require__(/*! ../files/files.module */ \"./src/components/files/files.module.ts\");\nconst comments_module_1 = __webpack_require__(/*! ../comments/comments.module */ \"./src/components/comments/comments.module.ts\");\nlet ProductsModule = class ProductsModule {\n};\nProductsModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),\n            files_module_1.FilesModule,\n            comments_module_1.CommentsModule,\n        ],\n        exports: [products_service_1.ProductsService],\n        controllers: [products_controller_1.ProductsController],\n        providers: [products_service_1.ProductsService],\n    })\n], ProductsModule);\nexports.ProductsModule = ProductsModule;\n\n\n//# sourceURL=webpack:///./src/components/products/products.module.ts?");

/***/ }),

/***/ "./src/components/products/products.service.ts":
/*!*****************************************************!*\
  !*** ./src/components/products/products.service.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)\n            t[p[i]] = s[p[i]];\n    return t;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst product_entity_1 = __webpack_require__(/*! ./product.entity */ \"./src/components/products/product.entity.ts\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nlet ProductsService = class ProductsService {\n    constructor(productsRepository) {\n        this.productsRepository = productsRepository;\n    }\n    findMany(query) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return this.productsRepository.find();\n        });\n    }\n    findOne(id, query) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return this.productsRepository.findOne(id);\n        });\n    }\n    createOne(payload, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { mainImageId } = payload, data = __rest(payload, [\"mainImageId\"]);\n            const newProduct = Object.assign({}, new product_entity_1.Product(), data, { seller: user });\n            return yield this.productsRepository.save(newProduct);\n        });\n    }\n    updateOne(id, payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.productsRepository.update(id, payload);\n            return yield this.productsRepository.findOne(id, {\n                relations: ['mainImage', 'images'],\n            });\n        });\n    }\n    deleteOne(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.productsRepository.delete(id);\n        });\n    }\n};\nProductsService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(product_entity_1.Product)),\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository])\n], ProductsService);\nexports.ProductsService = ProductsService;\n\n\n//# sourceURL=webpack:///./src/components/products/products.service.ts?");

/***/ }),

/***/ "./src/components/user-hashes/user-hash.entity.ts":
/*!********************************************************!*\
  !*** ./src/components/user-hashes/user-hash.entity.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nlet UserHash = class UserHash {\n};\n__decorate([\n    typeorm_2.PrimaryGeneratedColumn(),\n    __metadata(\"design:type\", Number)\n], UserHash.prototype, \"id\", void 0);\n__decorate([\n    typeorm_1.Column('varchar'),\n    __metadata(\"design:type\", String)\n], UserHash.prototype, \"hash\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", Number)\n], UserHash.prototype, \"userId\", void 0);\nUserHash = __decorate([\n    typeorm_1.Entity()\n], UserHash);\nexports.UserHash = UserHash;\n\n\n//# sourceURL=webpack:///./src/components/user-hashes/user-hash.entity.ts?");

/***/ }),

/***/ "./src/components/user-hashes/user-hashes.module.ts":
/*!**********************************************************!*\
  !*** ./src/components/user-hashes/user-hashes.module.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst core_module_1 = __webpack_require__(/*! ../core/core.module */ \"./src/components/core/core.module.ts\");\nconst user_hashes_service_1 = __webpack_require__(/*! ./user-hashes.service */ \"./src/components/user-hashes/user-hashes.service.ts\");\nconst user_hash_entity_1 = __webpack_require__(/*! ./user-hash.entity */ \"./src/components/user-hashes/user-hash.entity.ts\");\nlet UserHashesModule = class UserHashesModule {\n};\nUserHashesModule = __decorate([\n    common_1.Module({\n        imports: [\n            typeorm_1.TypeOrmModule.forFeature([user_hash_entity_1.UserHash]),\n            core_module_1.CoreModule,\n        ],\n        providers: [user_hashes_service_1.UserHashesService],\n        exports: [user_hashes_service_1.UserHashesService],\n    })\n], UserHashesModule);\nexports.UserHashesModule = UserHashesModule;\n\n\n//# sourceURL=webpack:///./src/components/user-hashes/user-hashes.module.ts?");

/***/ }),

/***/ "./src/components/user-hashes/user-hashes.service.ts":
/*!***********************************************************!*\
  !*** ./src/components/user-hashes/user-hashes.service.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst user_hash_entity_1 = __webpack_require__(/*! ./user-hash.entity */ \"./src/components/user-hashes/user-hash.entity.ts\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst hash_service_1 = __webpack_require__(/*! ../core/services/hash.service */ \"./src/components/core/services/hash.service.ts\");\nlet UserHashesService = class UserHashesService {\n    constructor(userHashesRepository, hashService) {\n        this.userHashesRepository = userHashesRepository;\n        this.hashService = hashService;\n    }\n    findOneByHash(hash) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.userHashesRepository.findOne({ hash });\n        });\n    }\n    createOne(userId, type) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const userHash = new user_hash_entity_1.UserHash();\n            userHash.hash = yield this.hashService.generateHash(JSON.stringify({ userId, type }));\n            userHash.userId = userId;\n            return yield this.userHashesRepository.save(userHash);\n        });\n    }\n    deleteOne(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.userHashesRepository.delete({ id });\n        });\n    }\n};\nUserHashesService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(user_hash_entity_1.UserHash)),\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository,\n        hash_service_1.HashService])\n], UserHashesService);\nexports.UserHashesService = UserHashesService;\n\n\n//# sourceURL=webpack:///./src/components/user-hashes/user-hashes.service.ts?");

/***/ }),

/***/ "./src/components/users/dto/create-user.dto.ts":
/*!*****************************************************!*\
  !*** ./src/components/users/dto/create-user.dto.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nclass CreateUserDto {\n}\n__decorate([\n    class_validator_1.IsString(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], CreateUserDto.prototype, \"firstName\", void 0);\n__decorate([\n    class_validator_1.IsString(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], CreateUserDto.prototype, \"lastName\", void 0);\n__decorate([\n    class_validator_1.IsEmail(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], CreateUserDto.prototype, \"email\", void 0);\n__decorate([\n    class_validator_1.IsString(),\n    class_validator_1.MinLength(6),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], CreateUserDto.prototype, \"password\", void 0);\nexports.CreateUserDto = CreateUserDto;\n\n\n//# sourceURL=webpack:///./src/components/users/dto/create-user.dto.ts?");

/***/ }),

/***/ "./src/components/users/dto/find-users-list.dto.ts":
/*!*********************************************************!*\
  !*** ./src/components/users/dto/find-users-list.dto.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst pagination_dto_1 = __webpack_require__(/*! ../../core/dto/pagination.dto */ \"./src/components/core/dto/pagination.dto.ts\");\nclass FindUsersListDto extends pagination_dto_1.PaginationDto {\n}\n__decorate([\n    class_validator_1.IsNumberString(),\n    class_validator_1.IsOptional(),\n    __metadata(\"design:type\", Number)\n], FindUsersListDto.prototype, \"ageFrom\", void 0);\n__decorate([\n    class_validator_1.IsNumberString(),\n    class_validator_1.IsOptional(),\n    __metadata(\"design:type\", Number)\n], FindUsersListDto.prototype, \"ageTo\", void 0);\n__decorate([\n    class_validator_1.IsBooleanString(),\n    class_validator_1.IsOptional(),\n    __metadata(\"design:type\", Boolean)\n], FindUsersListDto.prototype, \"onlySellers\", void 0);\nexports.FindUsersListDto = FindUsersListDto;\n\n\n//# sourceURL=webpack:///./src/components/users/dto/find-users-list.dto.ts?");

/***/ }),

/***/ "./src/components/users/dto/update-user.dto.ts":
/*!*****************************************************!*\
  !*** ./src/components/users/dto/update-user.dto.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nclass UpdateUserDto {\n}\n__decorate([\n    class_validator_1.IsOptional(),\n    class_validator_1.IsString(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], UpdateUserDto.prototype, \"firstName\", void 0);\n__decorate([\n    class_validator_1.IsOptional(),\n    class_validator_1.IsString(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], UpdateUserDto.prototype, \"lastName\", void 0);\n__decorate([\n    class_validator_1.IsOptional(),\n    class_validator_1.IsNumber(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", Number)\n], UpdateUserDto.prototype, \"age\", void 0);\n__decorate([\n    class_validator_1.IsOptional(),\n    class_validator_1.IsEmail(),\n    swagger_1.ApiModelProperty(),\n    __metadata(\"design:type\", String)\n], UpdateUserDto.prototype, \"email\", void 0);\nexports.UpdateUserDto = UpdateUserDto;\n\n\n//# sourceURL=webpack:///./src/components/users/dto/update-user.dto.ts?");

/***/ }),

/***/ "./src/components/users/entities/user-role.entity.ts":
/*!***********************************************************!*\
  !*** ./src/components/users/entities/user-role.entity.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst user_entity_1 = __webpack_require__(/*! ../user.entity */ \"./src/components/users/user.entity.ts\");\nlet UserRole = class UserRole {\n};\n__decorate([\n    typeorm_1.PrimaryGeneratedColumn(),\n    __metadata(\"design:type\", Number)\n], UserRole.prototype, \"id\", void 0);\n__decorate([\n    typeorm_1.OneToMany(type => user_entity_1.User, user => user.role),\n    __metadata(\"design:type\", user_entity_1.User)\n], UserRole.prototype, \"user\", void 0);\n__decorate([\n    typeorm_1.Column('varchar'),\n    __metadata(\"design:type\", String)\n], UserRole.prototype, \"name\", void 0);\nUserRole = __decorate([\n    typeorm_1.Entity()\n], UserRole);\nexports.UserRole = UserRole;\n\n\n//# sourceURL=webpack:///./src/components/users/entities/user-role.entity.ts?");

/***/ }),

/***/ "./src/components/users/services/users.service.ts":
/*!********************************************************!*\
  !*** ./src/components/users/services/users.service.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst user_entity_1 = __webpack_require__(/*! ../user.entity */ \"./src/components/users/user.entity.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst hash_service_1 = __webpack_require__(/*! ../../core/services/hash.service */ \"./src/components/core/services/hash.service.ts\");\nconst roles_enum_1 = __webpack_require__(/*! ../../../helpers/enums/roles.enum */ \"./src/helpers/enums/roles.enum.ts\");\nconst messages_enum_1 = __webpack_require__(/*! ../../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\nlet UsersService = class UsersService {\n    constructor(usersRepository, hashService) {\n        this.usersRepository = usersRepository;\n        this.hashService = hashService;\n    }\n    findMany(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const queryBuilder = this.prepareBuilder(this.usersRepository.createQueryBuilder('user'), payload);\n            return yield queryBuilder.getMany();\n        });\n    }\n    prepareBuilder(queryBuilder, query) {\n        if (query.ageFrom) {\n            queryBuilder.where('age > :ageFrom', { ageFrom: query.ageFrom });\n        }\n        if (query.ageTo) {\n            queryBuilder.where('age < :ageTo', { ageTo: query.ageTo });\n        }\n        if (query.onlySellers) {\n            queryBuilder.where('roleId = :roleId', { roleId: roles_enum_1.Roles.BUYER });\n        }\n        return queryBuilder;\n    }\n    findManyWithPagination(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const skip = (payload.page - 1) * payload.limit;\n            const queryBuilder = this.prepareBuilder(this.usersRepository.createQueryBuilder('user'), payload);\n            const totalCount = yield queryBuilder.getCount();\n            const data = yield queryBuilder.skip(skip).take(payload.limit).getMany();\n            return {\n                page: payload.page,\n                itemsPerPage: payload.limit,\n                totalCount,\n                data,\n            };\n        });\n    }\n    findOne(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const user = yield this.usersRepository.findOne(id);\n            if (!user) {\n                throw new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND);\n            }\n            return user;\n        });\n    }\n    findOneByEmail(email, includePassword = false) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const query = this.usersRepository.createQueryBuilder('user')\n                .where('email = :email', { email });\n            if (includePassword) {\n                query.addSelect('user.password');\n            }\n            return yield query.getOne();\n        });\n    }\n    findOneByGoogleId(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.usersRepository.findOne({ googleId: id });\n        });\n    }\n    createOne(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const passwordHash = yield this.hashService.generateHash(payload.password);\n            const newUser = Object.assign({}, new user_entity_1.User(), payload, { password: passwordHash });\n            return yield this.usersRepository.save(newUser);\n        });\n    }\n    createByGoogle(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const newUser = Object.assign({}, new user_entity_1.User(), payload);\n            return yield this.usersRepository.save(newUser);\n        });\n    }\n    updateOne(id, payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.usersRepository.update({ id }, payload);\n            return yield this.usersRepository.findOne(id);\n        });\n    }\n    deleteOne(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.usersRepository.delete({ id });\n        });\n    }\n};\nUsersService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository,\n        hash_service_1.HashService])\n], UsersService);\nexports.UsersService = UsersService;\n\n\n//# sourceURL=webpack:///./src/components/users/services/users.service.ts?");

/***/ }),

/***/ "./src/components/users/user.entity.ts":
/*!*********************************************!*\
  !*** ./src/components/users/user.entity.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst user_role_entity_1 = __webpack_require__(/*! ./entities/user-role.entity */ \"./src/components/users/entities/user-role.entity.ts\");\nconst product_entity_1 = __webpack_require__(/*! ../products/product.entity */ \"./src/components/products/product.entity.ts\");\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\nconst chat_entity_1 = __webpack_require__(/*! ../chats/chat.entity */ \"./src/components/chats/chat.entity.ts\");\nlet User = class User extends base_entity_1.BaseEntity {\n};\n__decorate([\n    typeorm_1.Column({ type: 'varchar' }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"firstName\", void 0);\n__decorate([\n    typeorm_1.Column({ type: 'varchar' }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"lastName\", void 0);\n__decorate([\n    typeorm_1.Column({ nullable: true }),\n    __metadata(\"design:type\", Number)\n], User.prototype, \"age\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    typeorm_1.Index(),\n    __metadata(\"design:type\", String)\n], User.prototype, \"email\", void 0);\n__decorate([\n    typeorm_1.Column({ nullable: true }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"password\", void 0);\n__decorate([\n    typeorm_1.ManyToOne(type => user_role_entity_1.UserRole),\n    typeorm_1.JoinColumn(),\n    __metadata(\"design:type\", user_role_entity_1.UserRole)\n], User.prototype, \"role\", void 0);\n__decorate([\n    typeorm_1.OneToMany(type => product_entity_1.Product, product => product.seller),\n    __metadata(\"design:type\", Array)\n], User.prototype, \"products\", void 0);\n__decorate([\n    typeorm_1.Column({ nullable: true }),\n    __metadata(\"design:type\", String)\n], User.prototype, \"googleId\", void 0);\n__decorate([\n    typeorm_1.Column({ type: 'boolean', default: false }),\n    __metadata(\"design:type\", Boolean)\n], User.prototype, \"emailVerified\", void 0);\n__decorate([\n    typeorm_1.Column({ type: 'boolean', default: false }),\n    __metadata(\"design:type\", Boolean)\n], User.prototype, \"phoneVerified\", void 0);\n__decorate([\n    typeorm_1.ManyToMany(type => chat_entity_1.Chat, chat => chat.users),\n    __metadata(\"design:type\", Array)\n], User.prototype, \"chats\", void 0);\n__decorate([\n    typeorm_1.Column({ type: 'boolean', default: false }),\n    __metadata(\"design:type\", Boolean)\n], User.prototype, \"online\", void 0);\nUser = __decorate([\n    typeorm_1.Entity()\n], User);\nexports.User = User;\n\n\n//# sourceURL=webpack:///./src/components/users/user.entity.ts?");

/***/ }),

/***/ "./src/components/users/users.controller.ts":
/*!**************************************************!*\
  !*** ./src/components/users/users.controller.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst create_user_dto_1 = __webpack_require__(/*! ./dto/create-user.dto */ \"./src/components/users/dto/create-user.dto.ts\");\nconst users_service_1 = __webpack_require__(/*! ./services/users.service */ \"./src/components/users/services/users.service.ts\");\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\nconst find_users_list_dto_1 = __webpack_require__(/*! ./dto/find-users-list.dto */ \"./src/components/users/dto/find-users-list.dto.ts\");\nconst update_user_dto_1 = __webpack_require__(/*! ./dto/update-user.dto */ \"./src/components/users/dto/update-user.dto.ts\");\nconst user_decorator_1 = __webpack_require__(/*! ../../helpers/decorators/user.decorator */ \"./src/helpers/decorators/user.decorator.ts\");\nconst user_entity_1 = __webpack_require__(/*! ./user.entity */ \"./src/components/users/user.entity.ts\");\nlet UsersController = class UsersController {\n    constructor(usersService) {\n        this.usersService = usersService;\n    }\n    findMany(query) {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (query.page && query.limit) {\n                return yield this.usersService.findManyWithPagination(query);\n            }\n            return yield this.usersService.findMany(query);\n        });\n    }\n    findOne(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.usersService.findOne(id);\n        });\n    }\n    create(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const user = yield this.usersService.findOneByEmail(payload.email);\n            if (user) {\n                throw new common_1.BadRequestException(messages_enum_1.Messages.USER_ALREADY_EXISTS);\n            }\n            return yield this.usersService.createOne(payload);\n        });\n    }\n    updateProfile(payload, user) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return yield this.usersService.updateOne(user.id, payload);\n        });\n    }\n    deleteUser(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            yield this.usersService.deleteOne(id);\n        });\n    }\n};\n__decorate([\n    common_1.Get(),\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\n    swagger_1.ApiOperation({ title: 'Fetch list of users' }),\n    __param(0, common_1.Query()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [find_users_list_dto_1.FindUsersListDto]),\n    __metadata(\"design:returntype\", Promise)\n], UsersController.prototype, \"findMany\", null);\n__decorate([\n    common_1.Get(':id'),\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\n    swagger_1.ApiOperation({ title: 'Get particular user by id' }),\n    __param(0, common_1.Param('id')),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number]),\n    __metadata(\"design:returntype\", Promise)\n], UsersController.prototype, \"findOne\", null);\n__decorate([\n    common_1.Post(),\n    swagger_1.ApiOperation({ title: 'Creating new user' }),\n    __param(0, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [create_user_dto_1.CreateUserDto]),\n    __metadata(\"design:returntype\", Promise)\n], UsersController.prototype, \"create\", null);\n__decorate([\n    common_1.Put('me'),\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\n    swagger_1.ApiBearerAuth(),\n    swagger_1.ApiOperation({ title: 'Update your profile' }),\n    __param(0, common_1.Body()), __param(1, user_decorator_1.ReqUser()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [update_user_dto_1.UpdateUserDto, user_entity_1.User]),\n    __metadata(\"design:returntype\", Promise)\n], UsersController.prototype, \"updateProfile\", null);\n__decorate([\n    common_1.Delete(':id'),\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\n    swagger_1.ApiBearerAuth(),\n    swagger_1.ApiOperation({ title: 'Delete user by id' }),\n    __param(0, common_1.Param('id')),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [Number]),\n    __metadata(\"design:returntype\", Promise)\n], UsersController.prototype, \"deleteUser\", null);\nUsersController = __decorate([\n    common_1.Controller('users'),\n    __metadata(\"design:paramtypes\", [users_service_1.UsersService])\n], UsersController);\nexports.UsersController = UsersController;\n\n\n//# sourceURL=webpack:///./src/components/users/users.controller.ts?");

/***/ }),

/***/ "./src/components/users/users.module.ts":
/*!**********************************************!*\
  !*** ./src/components/users/users.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst core_module_1 = __webpack_require__(/*! ../core/core.module */ \"./src/components/core/core.module.ts\");\nconst user_role_entity_1 = __webpack_require__(/*! ./entities/user-role.entity */ \"./src/components/users/entities/user-role.entity.ts\");\nconst user_entity_1 = __webpack_require__(/*! ./user.entity */ \"./src/components/users/user.entity.ts\");\nconst users_service_1 = __webpack_require__(/*! ./services/users.service */ \"./src/components/users/services/users.service.ts\");\nconst users_controller_1 = __webpack_require__(/*! ./users.controller */ \"./src/components/users/users.controller.ts\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nlet UsersModule = class UsersModule {\n};\nUsersModule = __decorate([\n    common_1.Module({\n        imports: [\n            core_module_1.CoreModule,\n            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_role_entity_1.UserRole]),\n        ],\n        exports: [users_service_1.UsersService],\n        controllers: [users_controller_1.UsersController],\n        providers: [users_service_1.UsersService],\n    })\n], UsersModule);\nexports.UsersModule = UsersModule;\n\n\n//# sourceURL=webpack:///./src/components/users/users.module.ts?");

/***/ }),

/***/ "./src/config/coludinary.config.ts":
/*!*****************************************!*\
  !*** ./src/config/coludinary.config.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst path_1 = __webpack_require__(/*! path */ \"path\");\nexports.CLOUDINARY_CLOUD_NAME = 'dkvyhy1hr';\nexports.CLOUDINARY_API_KEY = '785611567955674';\nexports.CLOUDINARY_API_SECRET = '0oc_djHhKTlL2mZZmeG8JyMS8v8';\nexports.FILES_UPLOAD_FOLDER = path_1.resolve(__dirname, '../../upload');\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/config/coludinary.config.ts?");

/***/ }),

/***/ "./src/config/common.config.ts":
/*!*************************************!*\
  !*** ./src/config/common.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.PASSWORD_LENGTH = 6;\nexports.APP_NAME = 'Astra-Store';\nexports.PORT = 4000;\n\n\n//# sourceURL=webpack:///./src/config/common.config.ts?");

/***/ }),

/***/ "./src/config/database.config.ts":
/*!***************************************!*\
  !*** ./src/config/database.config.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.DB_HOST = 'localhost';\nexports.DB_PORT = 5432;\nexports.DB_USER = 'postgres';\nexports.DB_PASSWORD = 'qwerty1';\nexports.DB_NAME = 'astra_store';\n\n\n//# sourceURL=webpack:///./src/config/database.config.ts?");

/***/ }),

/***/ "./src/config/emails.config.ts":
/*!*************************************!*\
  !*** ./src/config/emails.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst path_1 = __webpack_require__(/*! path */ \"path\");\nexports.SYSTEM_EMAIL = 'gogunov00@gmail.com';\nexports.SENDGRID_KEY = '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';\nexports.EMAIL_TEMPLATES_FOLDER = path_1.resolve(__dirname, '../templates');\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/config/emails.config.ts?");

/***/ }),

/***/ "./src/config/google.config.ts":
/*!*************************************!*\
  !*** ./src/config/google.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.GOOGLE_CLIENT_ID = '28234399443-i32gbk49djgk94jk16dghdskg9u9c3jp.apps.googleusercontent.com';\nexports.GOOGLE_CLIENT_SECRET = 'Q5tf2uQofbSpIeAP2Rx4gSsc';\nexports.GOOGLE_CALLBACK_URL = '/auth/google/callback';\n\n\n//# sourceURL=webpack:///./src/config/google.config.ts?");

/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nfunction __export(m) {\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\n}\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__export(__webpack_require__(/*! ./common.config */ \"./src/config/common.config.ts\"));\n__export(__webpack_require__(/*! ./coludinary.config */ \"./src/config/coludinary.config.ts\"));\n__export(__webpack_require__(/*! ./emails.config */ \"./src/config/emails.config.ts\"));\n__export(__webpack_require__(/*! ./database.config */ \"./src/config/database.config.ts\"));\n__export(__webpack_require__(/*! ./coludinary.config */ \"./src/config/coludinary.config.ts\"));\n__export(__webpack_require__(/*! ./jwt.config */ \"./src/config/jwt.config.ts\"));\n__export(__webpack_require__(/*! ./stripe.config */ \"./src/config/stripe.config.ts\"));\n__export(__webpack_require__(/*! ./orm.config */ \"./src/config/orm.config.ts\"));\n__export(__webpack_require__(/*! ./google.config */ \"./src/config/google.config.ts\"));\n\n\n//# sourceURL=webpack:///./src/config/index.ts?");

/***/ }),

/***/ "./src/config/jwt.config.ts":
/*!**********************************!*\
  !*** ./src/config/jwt.config.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.JWT_SECRET = 'Hello, my dear friend';\nexports.JWT_EXPIRES = 3600 * 24;\n\n\n//# sourceURL=webpack:///./src/config/jwt.config.ts?");

/***/ }),

/***/ "./src/config/orm.config.ts":
/*!**********************************!*\
  !*** ./src/config/orm.config.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/config/index.ts\");\nexports.ORM_CONFIG = {\n    type: 'postgres',\n    host: index_1.DB_HOST,\n    port: index_1.DB_PORT,\n    username: index_1.DB_USER,\n    password: index_1.DB_PASSWORD,\n    database: index_1.DB_NAME,\n    entities: [`${__dirname}/../../**/*.entity.ts`],\n    logging: true,\n    synchronize: true,\n};\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/config/orm.config.ts?");

/***/ }),

/***/ "./src/config/stripe.config.ts":
/*!*************************************!*\
  !*** ./src/config/stripe.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.STRIPE_PUBLIC_KEY = 'pk_test_U3tOJR0mr9NvYz1pYjwtmi1q';\nexports.STRIPE_SECRET_KEY = 'sk_test_393aej0Ej9NaA7DwrE2eZqSh';\n\n\n//# sourceURL=webpack:///./src/config/stripe.config.ts?");

/***/ }),

/***/ "./src/helpers/card-validators/card-cvv.validator.ts":
/*!***********************************************************!*\
  !*** ./src/helpers/card-validators/card-cvv.validator.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst cardValidator = __webpack_require__(/*! card-validator */ \"card-validator\");\nclass CardCvvValidator {\n    validate(value, validationArguments) {\n        const { isValid } = cardValidator.cvv(value);\n        return isValid;\n    }\n}\nexports.CardCvvValidator = CardCvvValidator;\n\n\n//# sourceURL=webpack:///./src/helpers/card-validators/card-cvv.validator.ts?");

/***/ }),

/***/ "./src/helpers/card-validators/card-expires-in.validator.ts":
/*!******************************************************************!*\
  !*** ./src/helpers/card-validators/card-expires-in.validator.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst cardValidator = __webpack_require__(/*! card-validator */ \"card-validator\");\nclass CardExpiresInValidator {\n    validate(value, validationArguments) {\n        const { isValid } = cardValidator.expiresIn(value);\n        return isValid;\n    }\n}\nexports.CardExpiresInValidator = CardExpiresInValidator;\n\n\n//# sourceURL=webpack:///./src/helpers/card-validators/card-expires-in.validator.ts?");

/***/ }),

/***/ "./src/helpers/decorators/user.decorator.ts":
/*!**************************************************!*\
  !*** ./src/helpers/decorators/user.decorator.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nexports.ReqUser = common_1.createParamDecorator((data, req) => {\n    return req.user;\n});\n\n\n//# sourceURL=webpack:///./src/helpers/decorators/user.decorator.ts?");

/***/ }),

/***/ "./src/helpers/enums/email-titles.enum.ts":
/*!************************************************!*\
  !*** ./src/helpers/enums/email-titles.enum.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar EmailTitles;\n(function (EmailTitles) {\n    EmailTitles[\"RESET_PASSWORD\"] = \"Reset Password Message\";\n    EmailTitles[\"EMAIL_VERIFICATION\"] = \"Email Verification Message\";\n})(EmailTitles = exports.EmailTitles || (exports.EmailTitles = {}));\n\n\n//# sourceURL=webpack:///./src/helpers/enums/email-titles.enum.ts?");

/***/ }),

/***/ "./src/helpers/enums/hash-types.enum.ts":
/*!**********************************************!*\
  !*** ./src/helpers/enums/hash-types.enum.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar HashTypes;\n(function (HashTypes) {\n    HashTypes[\"EMAIL_VERIFICATION\"] = \"emailVerificationHash\";\n    HashTypes[\"RESET_PASSWORD\"] = \"resetPasswordHash\";\n})(HashTypes = exports.HashTypes || (exports.HashTypes = {}));\n\n\n//# sourceURL=webpack:///./src/helpers/enums/hash-types.enum.ts?");

/***/ }),

/***/ "./src/helpers/enums/messages.enum.ts":
/*!********************************************!*\
  !*** ./src/helpers/enums/messages.enum.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Messages;\n(function (Messages) {\n    Messages[\"USER_ALREADY_EXISTS\"] = \"User already exists\";\n    Messages[\"USER_NOT_FOUND\"] = \"User doesn't exists\";\n    Messages[\"INVALID_TOKEN\"] = \"Invalid access token\";\n    Messages[\"INVALID_PASSWORD\"] = \"Invalid password\";\n    Messages[\"REFRESH_TOKEN_NOT_FOUND\"] = \"Refresh token not found\";\n    Messages[\"FAILED_GOOGLE_AUTH\"] = \"Failed to login by google\";\n    Messages[\"FILE_NOT_FOUND\"] = \"File is not found\";\n    Messages[\"PRODUCT_NOT_FOUND\"] = \"Product not found\";\n    Messages[\"INVALID_RIGHTS_TO_DELETE_COMMENT\"] = \"Only owner of product can remove comments\";\n    Messages[\"EMAIL_VERIFICATION_HASH_NOT_FOUND\"] = \"Email verification not found\";\n    Messages[\"CHAT_NOT_FOUND\"] = \"Chat not found\";\n    Messages[\"AUTH_TOKEN_NOT_FOUND\"] = \"Authorization token not found\";\n})(Messages = exports.Messages || (exports.Messages = {}));\n\n\n//# sourceURL=webpack:///./src/helpers/enums/messages.enum.ts?");

/***/ }),

/***/ "./src/helpers/enums/roles.enum.ts":
/*!*****************************************!*\
  !*** ./src/helpers/enums/roles.enum.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Roles;\n(function (Roles) {\n    Roles[Roles[\"BUYER\"] = 1] = \"BUYER\";\n    Roles[Roles[\"SELLER\"] = 2] = \"SELLER\";\n    Roles[Roles[\"ADMIN\"] = 3] = \"ADMIN\";\n})(Roles = exports.Roles || (exports.Roles = {}));\n\n\n//# sourceURL=webpack:///./src/helpers/enums/roles.enum.ts?");

/***/ }),

/***/ "./src/helpers/enums/template-types.enum.ts":
/*!**************************************************!*\
  !*** ./src/helpers/enums/template-types.enum.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar TemplateTypes;\n(function (TemplateTypes) {\n    TemplateTypes[\"EMAIL_VERIFICATION\"] = \"emailVerificationTemplate\";\n    TemplateTypes[\"RESET_PASSWORD\"] = \"resetPasswordTemplate\";\n})(TemplateTypes = exports.TemplateTypes || (exports.TemplateTypes = {}));\n\n\n//# sourceURL=webpack:///./src/helpers/enums/template-types.enum.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst core_1 = __webpack_require__(/*! @nestjs/core */ \"@nestjs/core\");\nconst app_module_1 = __webpack_require__(/*! ./app.module */ \"./src/app.module.ts\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/config/index.ts\");\nfunction bootstrap() {\n    return __awaiter(this, void 0, void 0, function* () {\n        const app = yield core_1.NestFactory.create(app_module_1.AppModule);\n        app.useGlobalPipes(new common_1.ValidationPipe());\n        const options = new swagger_1.DocumentBuilder()\n            .setTitle('Astra-store')\n            .setDescription('Platform for selling and buying products online')\n            .setVersion('0.1.0')\n            .addTag('Sales')\n            .build();\n        const document = swagger_1.SwaggerModule.createDocument(app, options);\n        swagger_1.SwaggerModule.setup('api', app, document);\n        yield app.listen(config_1.PORT);\n        if (true) {\n            module.hot.accept();\n            module.hot.dispose(() => app.close());\n        }\n    });\n}\nbootstrap();\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ 0:
/*!************************************************!*\
  !*** multi webpack/hot/poll?100 ./src/main.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"./node_modules/webpack/hot/poll.js?100\");\nmodule.exports = __webpack_require__(/*! ./src/main.ts */\"./src/main.ts\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/common\");\n\n//# sourceURL=webpack:///external_%22@nestjs/common%22?");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/core\");\n\n//# sourceURL=webpack:///external_%22@nestjs/core%22?");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/jwt\");\n\n//# sourceURL=webpack:///external_%22@nestjs/jwt%22?");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/passport\");\n\n//# sourceURL=webpack:///external_%22@nestjs/passport%22?");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/swagger\");\n\n//# sourceURL=webpack:///external_%22@nestjs/swagger%22?");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/typeorm\");\n\n//# sourceURL=webpack:///external_%22@nestjs/typeorm%22?");

/***/ }),

/***/ "@nestjs/websockets":
/*!*************************************!*\
  !*** external "@nestjs/websockets" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/websockets\");\n\n//# sourceURL=webpack:///external_%22@nestjs/websockets%22?");

/***/ }),

/***/ "@sendgrid/mail":
/*!*********************************!*\
  !*** external "@sendgrid/mail" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@sendgrid/mail\");\n\n//# sourceURL=webpack:///external_%22@sendgrid/mail%22?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"bcrypt\");\n\n//# sourceURL=webpack:///external_%22bcrypt%22?");

/***/ }),

/***/ "card-validator":
/*!*********************************!*\
  !*** external "card-validator" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"card-validator\");\n\n//# sourceURL=webpack:///external_%22card-validator%22?");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"class-validator\");\n\n//# sourceURL=webpack:///external_%22class-validator%22?");

/***/ }),

/***/ "cloudinary":
/*!*****************************!*\
  !*** external "cloudinary" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cloudinary\");\n\n//# sourceURL=webpack:///external_%22cloudinary%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "passport-google-oauth20":
/*!******************************************!*\
  !*** external "passport-google-oauth20" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-google-oauth20\");\n\n//# sourceURL=webpack:///external_%22passport-google-oauth20%22?");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"passport-jwt\");\n\n//# sourceURL=webpack:///external_%22passport-jwt%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pug":
/*!**********************!*\
  !*** external "pug" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pug\");\n\n//# sourceURL=webpack:///external_%22pug%22?");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"reflect-metadata\");\n\n//# sourceURL=webpack:///external_%22reflect-metadata%22?");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"typeorm\");\n\n//# sourceURL=webpack:///external_%22typeorm%22?");

/***/ }),

/***/ "uid-safe":
/*!***************************!*\
  !*** external "uid-safe" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uid-safe\");\n\n//# sourceURL=webpack:///external_%22uid-safe%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

/***/ })

/******/ });