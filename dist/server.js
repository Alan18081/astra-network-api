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
/******/ 	var hotCurrentHash = "79842c6b80a325efdd52";
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
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst users_module_1 = __webpack_require__(/*! ./components/users/users.module */ \"./src/components/users/users.module.ts\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/config/index.ts\");\r\nconst auth_module_1 = __webpack_require__(/*! ./components/auth/auth.module */ \"./src/components/auth/auth.module.ts\");\r\nconst files_module_1 = __webpack_require__(/*! ./components/files/files.module */ \"./src/components/files/files.module.ts\");\r\nconst orders_module_1 = __webpack_require__(/*! ./components/orders/orders.module */ \"./src/components/orders/orders.module.ts\");\r\nconst messages_module_1 = __webpack_require__(/*! ./components/messages/messages.module */ \"./src/components/messages/messages.module.ts\");\r\nconst chats_module_1 = __webpack_require__(/*! ./components/chats/chats.module */ \"./src/components/chats/chats.module.ts\");\r\nlet AppModule = class AppModule {\r\n};\r\nAppModule = __decorate([\r\n    common_1.Module({\r\n        imports: [\r\n            typeorm_1.TypeOrmModule.forRoot(config_1.ORM_CONFIG),\r\n            users_module_1.UsersModule,\r\n            auth_module_1.AuthModule,\r\n            files_module_1.FilesModule,\r\n            orders_module_1.OrdersModule,\r\n            messages_module_1.MessagesModule,\r\n            chats_module_1.ChatsModule,\r\n        ],\r\n        controllers: [],\r\n        providers: [],\r\n    })\r\n], AppModule);\r\nexports.AppModule = AppModule;\r\n\n\n//# sourceURL=webpack:///./src/app.module.ts?");

/***/ }),

/***/ "./src/components/auth/auth.controller.ts":
/*!************************************************!*\
  !*** ./src/components/auth/auth.controller.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst login_dto_1 = __webpack_require__(/*! ./dto/login.dto */ \"./src/components/auth/dto/login.dto.ts\");\r\nconst users_service_1 = __webpack_require__(/*! ../users/services/users.service */ \"./src/components/users/services/users.service.ts\");\r\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\r\nconst auth_service_1 = __webpack_require__(/*! ./auth.service */ \"./src/components/auth/auth.service.ts\");\r\nconst hash_service_1 = __webpack_require__(/*! ../core/services/hash.service */ \"./src/components/core/services/hash.service.ts\");\r\nconst exchangeToken_dto_1 = __webpack_require__(/*! ./dto/exchangeToken.dto */ \"./src/components/auth/dto/exchangeToken.dto.ts\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst user_decorator_1 = __webpack_require__(/*! ../../helpers/decorators/user.decorator */ \"./src/helpers/decorators/user.decorator.ts\");\r\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\r\nconst change_password_dto_1 = __webpack_require__(/*! ./dto/change-password.dto */ \"./src/components/auth/dto/change-password.dto.ts\");\r\nconst reset_password_dto_1 = __webpack_require__(/*! ./dto/reset-password.dto */ \"./src/components/auth/dto/reset-password.dto.ts\");\r\nlet AuthController = class AuthController {\r\n    constructor(usersService, hashService, authService) {\r\n        this.usersService = usersService;\r\n        this.hashService = hashService;\r\n        this.authService = authService;\r\n    }\r\n    login(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = yield this.usersService.findOneByEmail(payload.email, true);\r\n            if (!user) {\r\n                throw new common_1.UnauthorizedException(messages_enum_1.Messages.USER_NOT_FOUND);\r\n            }\r\n            const isValidPassword = yield this.hashService.compareHash(payload.password, user.password);\r\n            if (!isValidPassword) {\r\n                throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_PASSWORD);\r\n            }\r\n            return yield this.authService.singIn(user);\r\n        });\r\n    }\r\n    exchangeToken(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.authService.exchangeToken(payload.refreshToken);\r\n        });\r\n    }\r\n    googleLogin() { }\r\n    googleLoginCallback(user, res) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (user) {\r\n                res.redirect(`/auth/google/success?userId=${user.id}`);\r\n            }\r\n            else {\r\n                res.redirect('/auth/google/fail');\r\n            }\r\n        });\r\n    }\r\n    googleSuccess(userId) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = yield this.usersService.findOne(+userId);\r\n            if (user) {\r\n                return yield this.authService.singIn(user);\r\n            }\r\n        });\r\n    }\r\n    googleFail() {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return new common_1.UnauthorizedException(messages_enum_1.Messages.FAILED_GOOGLE_AUTH);\r\n        });\r\n    }\r\n    changePassword(user, payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const isValid = yield this.hashService.compareHash(payload.oldPassword, user.password);\r\n            if (!isValid) {\r\n                throw new common_1.BadRequestException(messages_enum_1.Messages.INVALID_PASSWORD);\r\n            }\r\n            const newPassword = yield this.hashService.generateHash(payload.newPassword);\r\n            yield this.usersService.updateOne(user.id, { password: newPassword });\r\n        });\r\n    }\r\n    verifyEmail(user) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n        });\r\n    }\r\n    resetPassword(body) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = yield this.usersService.findOneByEmail(body.email);\r\n            if (!user) {\r\n                throw new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND);\r\n            }\r\n            yield this.authService.resetPassword(user);\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    common_1.Post('login'),\r\n    swagger_1.ApiOperation({ title: 'Login for generating access token' }),\r\n    __param(0, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [login_dto_1.LoginDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], AuthController.prototype, \"login\", null);\r\n__decorate([\r\n    common_1.Post('token'),\r\n    swagger_1.ApiOperation({ title: 'Exchange refresh token for new access token' }),\r\n    __param(0, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [exchangeToken_dto_1.ExchangeTokenDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], AuthController.prototype, \"exchangeToken\", null);\r\n__decorate([\r\n    common_1.Get('google'),\r\n    common_1.UseGuards(passport_1.AuthGuard('google')),\r\n    swagger_1.ApiOperation({ title: 'Login via google' }),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", []),\r\n    __metadata(\"design:returntype\", void 0)\r\n], AuthController.prototype, \"googleLogin\", null);\r\n__decorate([\r\n    common_1.Get('google/callback'),\r\n    common_1.UseGuards(passport_1.AuthGuard('google')),\r\n    swagger_1.ApiOperation({ title: 'Callback for google authentication' }),\r\n    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Res()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object, Object]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], AuthController.prototype, \"googleLoginCallback\", null);\r\n__decorate([\r\n    common_1.Get('google/success'),\r\n    swagger_1.ApiOperation({ title: 'Google success authentication' }),\r\n    __param(0, common_1.Query('userId')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], AuthController.prototype, \"googleSuccess\", null);\r\n__decorate([\r\n    common_1.Get('google/fail'),\r\n    swagger_1.ApiOperation({ title: 'Google failed authentication' }),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", []),\r\n    __metadata(\"design:returntype\", Promise)\r\n], AuthController.prototype, \"googleFail\", null);\r\n__decorate([\r\n    common_1.Put('changePassword'),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    swagger_1.ApiBearerAuth(),\r\n    swagger_1.ApiOperation({ title: 'Create new password' }),\r\n    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [user_entity_1.User, change_password_dto_1.ChangePasswordDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], AuthController.prototype, \"changePassword\", null);\r\n__decorate([\r\n    common_1.Get('verifyEmail'),\r\n    common_1.HttpCode(common_1.HttpStatus.ACCEPTED),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    swagger_1.ApiBearerAuth(),\r\n    swagger_1.ApiOperation({ title: 'Verify your email' }),\r\n    __param(0, user_decorator_1.ReqUser()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [user_entity_1.User]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], AuthController.prototype, \"verifyEmail\", null);\r\n__decorate([\r\n    common_1.Post('resetPassword'),\r\n    common_1.HttpCode(common_1.HttpStatus.ACCEPTED),\r\n    swagger_1.ApiOperation({ title: 'Reset password' }),\r\n    __param(0, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [reset_password_dto_1.ResetPasswordDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], AuthController.prototype, \"resetPassword\", null);\r\nAuthController = __decorate([\r\n    common_1.Controller('auth'),\r\n    swagger_1.ApiUseTags('Auth'),\r\n    __metadata(\"design:paramtypes\", [users_service_1.UsersService,\r\n        hash_service_1.HashService,\r\n        auth_service_1.AuthService])\r\n], AuthController);\r\nexports.AuthController = AuthController;\r\n\n\n//# sourceURL=webpack:///./src/components/auth/auth.controller.ts?");

/***/ }),

/***/ "./src/components/auth/auth.module.ts":
/*!********************************************!*\
  !*** ./src/components/auth/auth.module.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst users_module_1 = __webpack_require__(/*! ../users/users.module */ \"./src/components/users/users.module.ts\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst jwt_1 = __webpack_require__(/*! @nestjs/jwt */ \"@nestjs/jwt\");\r\nconst index_1 = __webpack_require__(/*! ../../config/index */ \"./src/config/index.ts\");\r\nconst auth_controller_1 = __webpack_require__(/*! ./auth.controller */ \"./src/components/auth/auth.controller.ts\");\r\nconst auth_service_1 = __webpack_require__(/*! ./auth.service */ \"./src/components/auth/auth.service.ts\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst RefreshToken_entity_1 = __webpack_require__(/*! ./entities/RefreshToken.entity */ \"./src/components/auth/entities/RefreshToken.entity.ts\");\r\nconst jwt_strategy_1 = __webpack_require__(/*! ./strategies/jwt.strategy */ \"./src/components/auth/strategies/jwt.strategy.ts\");\r\nconst google_strategy_1 = __webpack_require__(/*! ./strategies/google.strategy */ \"./src/components/auth/strategies/google.strategy.ts\");\r\nconst core_module_1 = __webpack_require__(/*! ../core/core.module */ \"./src/components/core/core.module.ts\");\r\nconst user_hashes_module_1 = __webpack_require__(/*! ../user-hashes/user-hashes.module */ \"./src/components/user-hashes/user-hashes.module.ts\");\r\nlet AuthModule = class AuthModule {\r\n};\r\nAuthModule = __decorate([\r\n    common_1.Module({\r\n        imports: [\r\n            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),\r\n            jwt_1.JwtModule.register({\r\n                secretOrPrivateKey: index_1.JWT_SECRET,\r\n                signOptions: {\r\n                    expiresIn: index_1.JWT_EXPIRES,\r\n                },\r\n            }),\r\n            users_module_1.UsersModule,\r\n            core_module_1.CoreModule,\r\n            user_hashes_module_1.UserHashesModule,\r\n            typeorm_1.TypeOrmModule.forFeature([RefreshToken_entity_1.RefreshToken]),\r\n        ],\r\n        exports: [auth_service_1.AuthService],\r\n        controllers: [auth_controller_1.AuthController],\r\n        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, google_strategy_1.GoogleStrategy],\r\n    })\r\n], AuthModule);\r\nexports.AuthModule = AuthModule;\r\n\n\n//# sourceURL=webpack:///./src/components/auth/auth.module.ts?");

/***/ }),

/***/ "./src/components/auth/auth.service.ts":
/*!*********************************************!*\
  !*** ./src/components/auth/auth.service.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst jwt_1 = __webpack_require__(/*! @nestjs/jwt */ \"@nestjs/jwt\");\r\nconst users_service_1 = __webpack_require__(/*! ../users/services/users.service */ \"./src/components/users/services/users.service.ts\");\r\nconst config_1 = __webpack_require__(/*! ../../config */ \"./src/config/index.ts\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst RefreshToken_entity_1 = __webpack_require__(/*! ./entities/RefreshToken.entity */ \"./src/components/auth/entities/RefreshToken.entity.ts\");\r\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\r\nconst uid = __webpack_require__(/*! uid-safe */ \"uid-safe\");\r\nconst user_hashes_service_1 = __webpack_require__(/*! ../user-hashes/user-hashes.service */ \"./src/components/user-hashes/user-hashes.service.ts\");\r\nconst hash_types_enum_1 = __webpack_require__(/*! ../../helpers/enums/hash-types.enum */ \"./src/helpers/enums/hash-types.enum.ts\");\r\nconst email_sending_service_1 = __webpack_require__(/*! ../core/services/email-sending.service */ \"./src/components/core/services/email-sending.service.ts\");\r\nconst email_templates_service_1 = __webpack_require__(/*! ../core/services/email-templates.service */ \"./src/components/core/services/email-templates.service.ts\");\r\nconst template_types_enum_1 = __webpack_require__(/*! ../../helpers/enums/template-types.enum */ \"./src/helpers/enums/template-types.enum.ts\");\r\nconst email_titles_enum_1 = __webpack_require__(/*! ../../helpers/enums/email-titles.enum */ \"./src/helpers/enums/email-titles.enum.ts\");\r\nlet AuthService = class AuthService {\r\n    constructor(usersService, jwtService, userHashesService, emailSendingService, emailTemplatesService, refreshTokensRepository) {\r\n        this.usersService = usersService;\r\n        this.jwtService = jwtService;\r\n        this.userHashesService = userHashesService;\r\n        this.emailSendingService = emailSendingService;\r\n        this.emailTemplatesService = emailTemplatesService;\r\n        this.refreshTokensRepository = refreshTokensRepository;\r\n    }\r\n    singIn(user) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const jwtPayload = { email: user.email, id: user.id };\r\n            const accessToken = this.jwtService.sign(jwtPayload);\r\n            const refreshTokenRecord = yield this.refreshTokensRepository.findOne({ user });\r\n            if (refreshTokenRecord) {\r\n                return {\r\n                    accessToken,\r\n                    refreshToken: refreshTokenRecord.token,\r\n                    expiresIn: config_1.JWT_EXPIRES,\r\n                };\r\n            }\r\n            const refreshToken = uid.sync(30);\r\n            const newRefreshTokenRecord = new RefreshToken_entity_1.RefreshToken();\r\n            newRefreshTokenRecord.token = refreshToken;\r\n            newRefreshTokenRecord.user = user;\r\n            yield this.refreshTokensRepository.save(newRefreshTokenRecord);\r\n            return {\r\n                accessToken,\r\n                refreshToken,\r\n                expiresIn: config_1.JWT_EXPIRES,\r\n            };\r\n        });\r\n    }\r\n    validateUser(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.usersService.findOneByEmail(payload.email);\r\n        });\r\n    }\r\n    exchangeToken(token) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const tokenRecord = yield this.refreshTokensRepository.findOne({ token }, { relations: ['user'] });\r\n            if (!tokenRecord) {\r\n                throw new common_1.NotFoundException(messages_enum_1.Messages.REFRESH_TOKEN_NOT_FOUND);\r\n            }\r\n            yield this.refreshTokensRepository.delete(tokenRecord.id);\r\n            return yield this.singIn(tokenRecord.user);\r\n        });\r\n    }\r\n    verifyEmail({ firstName, lastName, email, id }) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.userHashesService.createOne(id, hash_types_enum_1.HashTypes.EMAIL_VERIFICATION);\r\n            const content = this.emailTemplatesService.getTemplate(template_types_enum_1.TemplateTypes.EMAIL_VERIFICATION, {\r\n                firstName,\r\n                lastName,\r\n            });\r\n            yield this.emailSendingService.sendSystemEmail(email, this.emailTemplatesService.createSubject(email_titles_enum_1.EmailTitles.EMAIL_VERIFICATION), content);\r\n        });\r\n    }\r\n    decodeToken(token) {\r\n        return this.jwtService.decode(token);\r\n    }\r\n    resetPassword({ firstName, lastName, email, id }) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.userHashesService.createOne(id, hash_types_enum_1.HashTypes.RESET_PASSWORD);\r\n            const content = this.emailTemplatesService.getTemplate(template_types_enum_1.TemplateTypes.EMAIL_VERIFICATION, {\r\n                firstName,\r\n                lastName,\r\n            });\r\n            yield this.emailSendingService.sendSystemEmail(email, this.emailTemplatesService.createSubject(email_titles_enum_1.EmailTitles.RESET_PASSWORD), content);\r\n        });\r\n    }\r\n};\r\nAuthService = __decorate([\r\n    common_1.Injectable(),\r\n    __param(5, typeorm_1.InjectRepository(RefreshToken_entity_1.RefreshToken)),\r\n    __metadata(\"design:paramtypes\", [users_service_1.UsersService,\r\n        jwt_1.JwtService,\r\n        user_hashes_service_1.UserHashesService,\r\n        email_sending_service_1.EmailSendingService,\r\n        email_templates_service_1.EmailTemplatesService,\r\n        typeorm_2.Repository])\r\n], AuthService);\r\nexports.AuthService = AuthService;\r\n\n\n//# sourceURL=webpack:///./src/components/auth/auth.service.ts?");

/***/ }),

/***/ "./src/components/auth/dto/change-password.dto.ts":
/*!********************************************************!*\
  !*** ./src/components/auth/dto/change-password.dto.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nconst index_1 = __webpack_require__(/*! ../../../config/index */ \"./src/config/index.ts\");\r\nclass ChangePasswordDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    class_validator_1.MinLength(index_1.PASSWORD_LENGTH),\r\n    __metadata(\"design:type\", String)\r\n], ChangePasswordDto.prototype, \"oldPassword\", void 0);\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    class_validator_1.MinLength(index_1.PASSWORD_LENGTH),\r\n    __metadata(\"design:type\", String)\r\n], ChangePasswordDto.prototype, \"newPassword\", void 0);\r\nexports.ChangePasswordDto = ChangePasswordDto;\r\n\n\n//# sourceURL=webpack:///./src/components/auth/dto/change-password.dto.ts?");

/***/ }),

/***/ "./src/components/auth/dto/exchangeToken.dto.ts":
/*!******************************************************!*\
  !*** ./src/components/auth/dto/exchangeToken.dto.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nclass ExchangeTokenDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    __metadata(\"design:type\", String)\r\n], ExchangeTokenDto.prototype, \"refreshToken\", void 0);\r\nexports.ExchangeTokenDto = ExchangeTokenDto;\r\n\n\n//# sourceURL=webpack:///./src/components/auth/dto/exchangeToken.dto.ts?");

/***/ }),

/***/ "./src/components/auth/dto/login.dto.ts":
/*!**********************************************!*\
  !*** ./src/components/auth/dto/login.dto.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass LoginDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsEmail(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], LoginDto.prototype, \"email\", void 0);\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    class_validator_1.MinLength(6),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], LoginDto.prototype, \"password\", void 0);\r\nexports.LoginDto = LoginDto;\r\n\n\n//# sourceURL=webpack:///./src/components/auth/dto/login.dto.ts?");

/***/ }),

/***/ "./src/components/auth/dto/reset-password.dto.ts":
/*!*******************************************************!*\
  !*** ./src/components/auth/dto/reset-password.dto.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass ResetPasswordDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsEmail(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], ResetPasswordDto.prototype, \"email\", void 0);\r\nexports.ResetPasswordDto = ResetPasswordDto;\r\n\n\n//# sourceURL=webpack:///./src/components/auth/dto/reset-password.dto.ts?");

/***/ }),

/***/ "./src/components/auth/entities/RefreshToken.entity.ts":
/*!*************************************************************!*\
  !*** ./src/components/auth/entities/RefreshToken.entity.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst user_entity_1 = __webpack_require__(/*! ../../users/user.entity */ \"./src/components/users/user.entity.ts\");\r\nlet RefreshToken = class RefreshToken {\r\n};\r\n__decorate([\r\n    typeorm_1.PrimaryGeneratedColumn(),\r\n    __metadata(\"design:type\", Number)\r\n], RefreshToken.prototype, \"id\", void 0);\r\n__decorate([\r\n    typeorm_1.Column('varchar'),\r\n    typeorm_1.Index(),\r\n    __metadata(\"design:type\", String)\r\n], RefreshToken.prototype, \"token\", void 0);\r\n__decorate([\r\n    typeorm_1.OneToOne(type => user_entity_1.User),\r\n    typeorm_1.JoinColumn(),\r\n    __metadata(\"design:type\", user_entity_1.User)\r\n], RefreshToken.prototype, \"user\", void 0);\r\nRefreshToken = __decorate([\r\n    typeorm_1.Entity()\r\n], RefreshToken);\r\nexports.RefreshToken = RefreshToken;\r\n\n\n//# sourceURL=webpack:///./src/components/auth/entities/RefreshToken.entity.ts?");

/***/ }),

/***/ "./src/components/auth/strategies/google.strategy.ts":
/*!***********************************************************!*\
  !*** ./src/components/auth/strategies/google.strategy.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst passport_google_oauth20_1 = __webpack_require__(/*! passport-google-oauth20 */ \"passport-google-oauth20\");\r\nconst index_1 = __webpack_require__(/*! ../../../config/index */ \"./src/config/index.ts\");\r\nconst users_service_1 = __webpack_require__(/*! ../../users/services/users.service */ \"./src/components/users/services/users.service.ts\");\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nlet GoogleStrategy = class GoogleStrategy extends passport_1.PassportStrategy(passport_google_oauth20_1.Strategy, 'google') {\r\n    constructor(usersService) {\r\n        super({\r\n            clientID: index_1.GOOGLE_CLIENT_ID,\r\n            clientSecret: index_1.GOOGLE_CLIENT_SECRET,\r\n            callbackURL: index_1.GOOGLE_CALLBACK_URL,\r\n            passReqToCallback: true,\r\n            scope: ['openid', 'email'],\r\n        });\r\n        this.usersService = usersService;\r\n    }\r\n    validate(req, acessToken, refreshToken, profile, done) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                const user = yield this.usersService.findOneByGoogleId(profile.id);\r\n                if (user) {\r\n                    return done(null, user);\r\n                }\r\n                const newUser = yield this.usersService.createByGoogle({\r\n                    firstName: profile.name.familyName,\r\n                    lastName: profile.name.givenName,\r\n                    email: profile.emails[0].value,\r\n                    googleId: profile.id,\r\n                });\r\n                return done(null, newUser);\r\n            }\r\n            catch (e) {\r\n                done(e, false);\r\n            }\r\n        });\r\n    }\r\n};\r\nGoogleStrategy = __decorate([\r\n    common_1.Injectable(),\r\n    __metadata(\"design:paramtypes\", [users_service_1.UsersService])\r\n], GoogleStrategy);\r\nexports.GoogleStrategy = GoogleStrategy;\r\n\n\n//# sourceURL=webpack:///./src/components/auth/strategies/google.strategy.ts?");

/***/ }),

/***/ "./src/components/auth/strategies/jwt.strategy.ts":
/*!********************************************************!*\
  !*** ./src/components/auth/strategies/jwt.strategy.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst passport_jwt_1 = __webpack_require__(/*! passport-jwt */ \"passport-jwt\");\r\nconst auth_service_1 = __webpack_require__(/*! ../auth.service */ \"./src/components/auth/auth.service.ts\");\r\nconst index_1 = __webpack_require__(/*! ../../../config/index */ \"./src/config/index.ts\");\r\nconst messages_enum_1 = __webpack_require__(/*! ../../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\r\nlet JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy, 'jwt') {\r\n    constructor(authService) {\r\n        super({\r\n            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),\r\n            secretOrKey: index_1.JWT_SECRET,\r\n        });\r\n        this.authService = authService;\r\n    }\r\n    validate(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = yield this.authService.validateUser(payload);\r\n            if (!user) {\r\n                throw new common_1.UnauthorizedException(messages_enum_1.Messages.INVALID_TOKEN);\r\n            }\r\n            return user;\r\n        });\r\n    }\r\n};\r\nJwtStrategy = __decorate([\r\n    common_1.Injectable(),\r\n    __metadata(\"design:paramtypes\", [auth_service_1.AuthService])\r\n], JwtStrategy);\r\nexports.JwtStrategy = JwtStrategy;\r\n\n\n//# sourceURL=webpack:///./src/components/auth/strategies/jwt.strategy.ts?");

/***/ }),

/***/ "./src/components/chats/auth-socket.guard.ts":
/*!***************************************************!*\
  !*** ./src/components/chats/auth-socket.guard.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nlet AuthSocketGuard = class AuthSocketGuard {\r\n    canActivate(context) {\r\n        const socket = context.getArgByIndex(0);\r\n        console.log(socket.quer);\r\n        return false;\r\n    }\r\n};\r\nAuthSocketGuard = __decorate([\r\n    common_1.Injectable()\r\n], AuthSocketGuard);\r\nexports.AuthSocketGuard = AuthSocketGuard;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/auth-socket.guard.ts?");

/***/ }),

/***/ "./src/components/chats/chat.entity.ts":
/*!*********************************************!*\
  !*** ./src/components/chats/chat.entity.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\r\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\r\nconst message_entity_1 = __webpack_require__(/*! ../messages/message.entity */ \"./src/components/messages/message.entity.ts\");\r\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nlet Chat = class Chat extends base_entity_1.BaseEntity {\r\n};\r\n__decorate([\r\n    typeorm_1.Column('varchar'),\r\n    __metadata(\"design:type\", String)\r\n], Chat.prototype, \"name\", void 0);\r\n__decorate([\r\n    typeorm_1.ManyToMany(type => user_entity_1.User, user => user.chats),\r\n    typeorm_2.JoinTable(),\r\n    __metadata(\"design:type\", Array)\r\n], Chat.prototype, \"users\", void 0);\r\n__decorate([\r\n    typeorm_1.OneToMany(type => message_entity_1.Message, message => message.chat),\r\n    __metadata(\"design:type\", Array)\r\n], Chat.prototype, \"messages\", void 0);\r\nChat = __decorate([\r\n    typeorm_1.Entity()\r\n], Chat);\r\nexports.Chat = Chat;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/chat.entity.ts?");

/***/ }),

/***/ "./src/components/chats/chats.actions.ts":
/*!***********************************************!*\
  !*** ./src/components/chats/chats.actions.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.ADD_NEW_USER = 'ADD_NEW_USER';\r\nexports.UPDATED_CHAT = 'UPDATED_CHAT';\r\nclass UpdatedChat {\r\n    constructor(data) {\r\n        this.data = data;\r\n        this.event = exports.UPDATED_CHAT;\r\n    }\r\n}\r\nexports.UpdatedChat = UpdatedChat;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.actions.ts?");

/***/ }),

/***/ "./src/components/chats/chats.controller.ts":
/*!**************************************************!*\
  !*** ./src/components/chats/chats.controller.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst chats_service_1 = __webpack_require__(/*! ./chats.service */ \"./src/components/chats/chats.service.ts\");\r\nconst user_decorator_1 = __webpack_require__(/*! ../../helpers/decorators/user.decorator */ \"./src/helpers/decorators/user.decorator.ts\");\r\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\r\nconst create_chat_dto_1 = __webpack_require__(/*! ./dto/http/create-chat.dto */ \"./src/components/chats/dto/http/create-chat.dto.ts\");\r\nconst find_chats_list_dto_1 = __webpack_require__(/*! ./dto/http/find-chats-list.dto */ \"./src/components/chats/dto/http/find-chats-list.dto.ts\");\r\nconst update_chat_dto_1 = __webpack_require__(/*! ./dto/http/update-chat.dto */ \"./src/components/chats/dto/http/update-chat.dto.ts\");\r\nlet ChatsController = class ChatsController {\r\n    constructor(chatsService) {\r\n        this.chatsService = chatsService;\r\n    }\r\n    findAll(query) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (query.ids) {\r\n                return yield this.chatsService.findManyByIds(query);\r\n            }\r\n            else {\r\n                return yield this.chatsService.findMany(query);\r\n            }\r\n        });\r\n    }\r\n    createOne(user, payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            payload.userIds.push(user.id);\r\n            return yield this.chatsService.createOne(payload);\r\n        });\r\n    }\r\n    updateOne(id, payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.chatsService.updateOne(id, payload);\r\n        });\r\n    }\r\n    deleteOne(user, id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.chatsService.deleteOne(id, user.id);\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    common_1.Get(),\r\n    swagger_1.ApiOperation({ title: 'Get list of chats for particular user' }),\r\n    __param(0, common_1.Query()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [find_chats_list_dto_1.FindChatsListDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ChatsController.prototype, \"findAll\", null);\r\n__decorate([\r\n    common_1.Post(),\r\n    swagger_1.ApiOperation({ title: 'Get list of chats for particular user' }),\r\n    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [user_entity_1.User, create_chat_dto_1.CreateChatDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ChatsController.prototype, \"createOne\", null);\r\n__decorate([\r\n    common_1.Put(':id'),\r\n    swagger_1.ApiOperation({ title: 'Update particular chat' }),\r\n    __param(0, common_1.Param('id')), __param(1, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Number, update_chat_dto_1.UpdateChatDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ChatsController.prototype, \"updateOne\", null);\r\n__decorate([\r\n    common_1.Delete(':id'),\r\n    swagger_1.ApiOperation({ title: 'Leave particular chat or delete if no users left' }),\r\n    __param(0, user_decorator_1.ReqUser()), __param(1, common_1.Param('id')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [user_entity_1.User, Number]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ChatsController.prototype, \"deleteOne\", null);\r\nChatsController = __decorate([\r\n    common_1.Controller('chats'),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    swagger_1.ApiUseTags('Chats'),\r\n    swagger_1.ApiBearerAuth(),\r\n    __metadata(\"design:paramtypes\", [chats_service_1.ChatsService])\r\n], ChatsController);\r\nexports.ChatsController = ChatsController;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.controller.ts?");

/***/ }),

/***/ "./src/components/chats/chats.gateway.ts":
/*!***********************************************!*\
  !*** ./src/components/chats/chats.gateway.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst websockets_1 = __webpack_require__(/*! @nestjs/websockets */ \"@nestjs/websockets\");\r\nconst add_message_dto_1 = __webpack_require__(/*! ./dto/http/add-message.dto */ \"./src/components/chats/dto/http/add-message.dto.ts\");\r\nconst chatsActions = __webpack_require__(/*! ./chats.actions */ \"./src/components/chats/chats.actions.ts\");\r\nconst messagesActions = __webpack_require__(/*! ../messages/messages.actions */ \"./src/components/messages/messages.actions.ts\");\r\nconst messages_service_1 = __webpack_require__(/*! ../messages/messages.service */ \"./src/components/messages/messages.service.ts\");\r\nconst chats_service_1 = __webpack_require__(/*! ./chats.service */ \"./src/components/chats/chats.service.ts\");\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst add_new_user_dto_1 = __webpack_require__(/*! ./dto/sockets/add-new-user.dto */ \"./src/components/chats/dto/sockets/add-new-user.dto.ts\");\r\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\r\nconst auth_service_1 = __webpack_require__(/*! ../auth/auth.service */ \"./src/components/auth/auth.service.ts\");\r\nlet ChatsGateway = class ChatsGateway {\r\n    constructor(chatsService, messagesService, authService) {\r\n        this.chatsService = chatsService;\r\n        this.messagesService = messagesService;\r\n        this.authService = authService;\r\n    }\r\n    handleConnection(client) {\r\n        const token = client.handshake.query;\r\n        if (!token) {\r\n            throw new websockets_1.WsException(messages_enum_1.Messages.AUTH_TOKEN_NOT_FOUND);\r\n        }\r\n        const data = this.authService.decodeToken(token);\r\n        console.log(data);\r\n    }\r\n    onAttendUser(client, { chatId, userId }) {\r\n        client.join(chatId);\r\n        console.log('Attending new user');\r\n        this.chatsService.addNewUser(chatId, userId);\r\n    }\r\n    onAddMessage(client, payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const message = yield this.messagesService.addMessage(payload);\r\n            if (message) {\r\n                const action = new messagesActions.AddMessage(message);\r\n                this.server.to(payload.chatId).emit(action.event, action.data);\r\n            }\r\n        });\r\n    }\r\n    emitMessage(group, action) {\r\n        this.server.to(group).emit(action.event, action.data);\r\n    }\r\n};\r\n__decorate([\r\n    websockets_1.WebSocketServer(),\r\n    __metadata(\"design:type\", Object)\r\n], ChatsGateway.prototype, \"server\", void 0);\r\n__decorate([\r\n    websockets_1.SubscribeMessage(chatsActions.ADD_NEW_USER),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object, add_new_user_dto_1.AddNewUserDto]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], ChatsGateway.prototype, \"onAttendUser\", null);\r\n__decorate([\r\n    websockets_1.SubscribeMessage(messagesActions.ADD_MESSAGE),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object, add_message_dto_1.AddMessageDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ChatsGateway.prototype, \"onAddMessage\", null);\r\nChatsGateway = __decorate([\r\n    websockets_1.WebSocketGateway({ namespace: 'messages' }),\r\n    common_1.UsePipes(new common_1.ValidationPipe()),\r\n    __metadata(\"design:paramtypes\", [chats_service_1.ChatsService,\r\n        messages_service_1.MessagesService,\r\n        auth_service_1.AuthService])\r\n], ChatsGateway);\r\nexports.ChatsGateway = ChatsGateway;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.gateway.ts?");

/***/ }),

/***/ "./src/components/chats/chats.module.ts":
/*!**********************************************!*\
  !*** ./src/components/chats/chats.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst chats_gateway_1 = __webpack_require__(/*! ./chats.gateway */ \"./src/components/chats/chats.gateway.ts\");\r\nconst chats_service_1 = __webpack_require__(/*! ./chats.service */ \"./src/components/chats/chats.service.ts\");\r\nconst chat_entity_1 = __webpack_require__(/*! ./chat.entity */ \"./src/components/chats/chat.entity.ts\");\r\nconst chats_controller_1 = __webpack_require__(/*! ./chats.controller */ \"./src/components/chats/chats.controller.ts\");\r\nconst messages_module_1 = __webpack_require__(/*! ../messages/messages.module */ \"./src/components/messages/messages.module.ts\");\r\nconst users_module_1 = __webpack_require__(/*! ../users/users.module */ \"./src/components/users/users.module.ts\");\r\nconst core_1 = __webpack_require__(/*! @nestjs/core */ \"@nestjs/core\");\r\nconst auth_socket_guard_1 = __webpack_require__(/*! ./auth-socket.guard */ \"./src/components/chats/auth-socket.guard.ts\");\r\nconst auth_module_1 = __webpack_require__(/*! ../auth/auth.module */ \"./src/components/auth/auth.module.ts\");\r\nlet ChatsModule = class ChatsModule {\r\n};\r\nChatsModule = __decorate([\r\n    common_1.Module({\r\n        imports: [\r\n            messages_module_1.MessagesModule,\r\n            typeorm_1.TypeOrmModule.forFeature([chat_entity_1.Chat]),\r\n            users_module_1.UsersModule,\r\n            auth_module_1.AuthModule,\r\n        ],\r\n        controllers: [chats_controller_1.ChatsController],\r\n        providers: [\r\n            chats_gateway_1.ChatsGateway,\r\n            chats_service_1.ChatsService,\r\n            { provide: core_1.APP_GUARD, useClass: auth_socket_guard_1.AuthSocketGuard },\r\n        ],\r\n    })\r\n], ChatsModule);\r\nexports.ChatsModule = ChatsModule;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.module.ts?");

/***/ }),

/***/ "./src/components/chats/chats.service.ts":
/*!***********************************************!*\
  !*** ./src/components/chats/chats.service.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst chat_entity_1 = __webpack_require__(/*! ./chat.entity */ \"./src/components/chats/chat.entity.ts\");\r\nconst websockets_1 = __webpack_require__(/*! @nestjs/websockets */ \"@nestjs/websockets\");\r\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\r\nconst users_service_1 = __webpack_require__(/*! ../users/services/users.service */ \"./src/components/users/services/users.service.ts\");\r\nlet ChatsService = class ChatsService {\r\n    constructor(chatsRepository, usersService) {\r\n        this.chatsRepository = chatsRepository;\r\n        this.usersService = usersService;\r\n    }\r\n    findMany(query) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const options = {\r\n                where: {},\r\n                relations: [],\r\n            };\r\n            if (query.userId) {\r\n                options.where = {\r\n                    users: {\r\n                        id: query.userId,\r\n                    },\r\n                };\r\n            }\r\n            options.relations = this.getRelations(query);\r\n            return yield this.chatsRepository.find(options);\r\n        });\r\n    }\r\n    findManyByIds(query) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const relations = this.getRelations(query);\r\n            return yield this.chatsRepository.findByIds(query.ids, { relations });\r\n        });\r\n    }\r\n    addNewUser(chatId, userId) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const [chat, user] = yield Promise.all([\r\n                this.chatsRepository.findOne(chatId),\r\n                this.usersService.findOne(userId),\r\n            ]);\r\n            if (!user) {\r\n                throw new websockets_1.WsException(messages_enum_1.Messages.USER_NOT_FOUND);\r\n            }\r\n            if (!chat) {\r\n                throw new websockets_1.WsException(messages_enum_1.Messages.CHAT_NOT_FOUND);\r\n            }\r\n            const foundUser = chat.users.find(({ id }) => id === userId);\r\n            if (!foundUser) {\r\n                chat.users.push(user);\r\n            }\r\n            return yield this.chatsRepository.save(chat);\r\n        });\r\n    }\r\n    getRelations(query) {\r\n        const relations = [];\r\n        if (query.includeMessages) {\r\n            relations.push('messages');\r\n        }\r\n        if (query.includeUsers) {\r\n            relations.push('users');\r\n        }\r\n        return relations;\r\n    }\r\n    findManyWithPagination(query) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const options = {\r\n                where: {},\r\n                relations: [],\r\n                skip: (query.page - 1) * query.limit,\r\n                take: query.limit,\r\n            };\r\n            if (query.userId) {\r\n                options.where = {\r\n                    users: {\r\n                        id: query.userId,\r\n                    },\r\n                };\r\n            }\r\n            options.relations = this.getRelations(query);\r\n            const [data, totalCount] = yield this.chatsRepository.findAndCount(options);\r\n            return {\r\n                page: query.page,\r\n                itemsPerPage: query.limit,\r\n                totalCount,\r\n                data,\r\n            };\r\n        });\r\n    }\r\n    findOne(id, query) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const relations = [];\r\n            if (query.includeMessages) {\r\n                relations.push('messages');\r\n            }\r\n            if (query.includeUsers) {\r\n                relations.push('users');\r\n            }\r\n            return yield this.chatsRepository.findOne({\r\n                id,\r\n            }, { relations });\r\n        });\r\n    }\r\n    createOne(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const chat = new chat_entity_1.Chat();\r\n            chat.name = payload.name;\r\n            chat.createdAt = new Date();\r\n            chat.users = payload.userIds.map(id => ({ id }));\r\n            return yield this.findOne(chat.id, { includeUsers: true });\r\n        });\r\n    }\r\n    updateOne(id, payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.chatsRepository.update(id, payload);\r\n            return yield this.chatsRepository.findOne(id);\r\n        });\r\n    }\r\n    deleteOne(id, userId) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const chat = yield this.chatsRepository.findOne(id, { relations: ['users'] });\r\n            if (chat) {\r\n                chat.users = chat.users.filter((user) => user.id !== userId);\r\n                if (chat.users.length === 0) {\r\n                    yield this.chatsRepository.delete({ id });\r\n                }\r\n                else {\r\n                    yield this.chatsRepository.save(chat);\r\n                }\r\n            }\r\n        });\r\n    }\r\n};\r\nChatsService = __decorate([\r\n    common_1.Injectable(),\r\n    __param(0, typeorm_1.InjectRepository(chat_entity_1.Chat)),\r\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository,\r\n        users_service_1.UsersService])\r\n], ChatsService);\r\nexports.ChatsService = ChatsService;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/chats.service.ts?");

/***/ }),

/***/ "./src/components/chats/dto/http/add-message.dto.ts":
/*!**********************************************************!*\
  !*** ./src/components/chats/dto/http/add-message.dto.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nclass AddMessageDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    __metadata(\"design:type\", String)\r\n], AddMessageDto.prototype, \"text\", void 0);\r\n__decorate([\r\n    class_validator_1.IsNumber(),\r\n    __metadata(\"design:type\", Number)\r\n], AddMessageDto.prototype, \"authorId\", void 0);\r\n__decorate([\r\n    class_validator_1.IsNumber(),\r\n    __metadata(\"design:type\", Number)\r\n], AddMessageDto.prototype, \"chatId\", void 0);\r\nexports.AddMessageDto = AddMessageDto;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/dto/http/add-message.dto.ts?");

/***/ }),

/***/ "./src/components/chats/dto/http/create-chat.dto.ts":
/*!**********************************************************!*\
  !*** ./src/components/chats/dto/http/create-chat.dto.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nclass CreateChatDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    __metadata(\"design:type\", String)\r\n], CreateChatDto.prototype, \"name\", void 0);\r\n__decorate([\r\n    class_validator_1.IsArray(),\r\n    __metadata(\"design:type\", Array)\r\n], CreateChatDto.prototype, \"userIds\", void 0);\r\nexports.CreateChatDto = CreateChatDto;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/dto/http/create-chat.dto.ts?");

/***/ }),

/***/ "./src/components/chats/dto/http/find-chats-list.dto.ts":
/*!**************************************************************!*\
  !*** ./src/components/chats/dto/http/find-chats-list.dto.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nconst pagination_dto_1 = __webpack_require__(/*! ../../../core/dto/pagination.dto */ \"./src/components/core/dto/pagination.dto.ts\");\r\nclass FindChatsListDto extends pagination_dto_1.PaginationDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsOptional(),\r\n    class_validator_1.ArrayNotEmpty(),\r\n    __metadata(\"design:type\", Array)\r\n], FindChatsListDto.prototype, \"ids\", void 0);\r\n__decorate([\r\n    class_validator_1.IsBooleanString(),\r\n    class_validator_1.IsOptional(),\r\n    __metadata(\"design:type\", Boolean)\r\n], FindChatsListDto.prototype, \"includeMessages\", void 0);\r\n__decorate([\r\n    class_validator_1.IsBooleanString(),\r\n    class_validator_1.IsOptional(),\r\n    __metadata(\"design:type\", Boolean)\r\n], FindChatsListDto.prototype, \"includeUsers\", void 0);\r\n__decorate([\r\n    class_validator_1.IsOptional(),\r\n    class_validator_1.IsNumberString(),\r\n    __metadata(\"design:type\", Boolean)\r\n], FindChatsListDto.prototype, \"userId\", void 0);\r\nexports.FindChatsListDto = FindChatsListDto;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/dto/http/find-chats-list.dto.ts?");

/***/ }),

/***/ "./src/components/chats/dto/http/update-chat.dto.ts":
/*!**********************************************************!*\
  !*** ./src/components/chats/dto/http/update-chat.dto.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nclass UpdateChatDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    class_validator_1.IsOptional(),\r\n    __metadata(\"design:type\", String)\r\n], UpdateChatDto.prototype, \"name\", void 0);\r\nexports.UpdateChatDto = UpdateChatDto;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/dto/http/update-chat.dto.ts?");

/***/ }),

/***/ "./src/components/chats/dto/sockets/add-new-user.dto.ts":
/*!**************************************************************!*\
  !*** ./src/components/chats/dto/sockets/add-new-user.dto.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nclass AddNewUserDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsNumber(),\r\n    __metadata(\"design:type\", Number)\r\n], AddNewUserDto.prototype, \"userId\", void 0);\r\n__decorate([\r\n    class_validator_1.IsNumber(),\r\n    __metadata(\"design:type\", Number)\r\n], AddNewUserDto.prototype, \"chatId\", void 0);\r\nexports.AddNewUserDto = AddNewUserDto;\r\n\n\n//# sourceURL=webpack:///./src/components/chats/dto/sockets/add-new-user.dto.ts?");

/***/ }),

/***/ "./src/components/comments/comment.entity.ts":
/*!***************************************************!*\
  !*** ./src/components/comments/comment.entity.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\r\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\r\nlet Comment = class Comment extends base_entity_1.BaseEntity {\r\n};\r\n__decorate([\r\n    typeorm_1.Column('text'),\r\n    __metadata(\"design:type\", String)\r\n], Comment.prototype, \"text\", void 0);\r\n__decorate([\r\n    typeorm_1.ManyToOne(type => user_entity_1.User),\r\n    typeorm_1.JoinColumn(),\r\n    __metadata(\"design:type\", user_entity_1.User)\r\n], Comment.prototype, \"author\", void 0);\r\nComment = __decorate([\r\n    typeorm_1.Entity()\r\n], Comment);\r\nexports.Comment = Comment;\r\n\n\n//# sourceURL=webpack:///./src/components/comments/comment.entity.ts?");

/***/ }),

/***/ "./src/components/comments/comments.module.ts":
/*!****************************************************!*\
  !*** ./src/components/comments/comments.module.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst comments_service_1 = __webpack_require__(/*! ./comments.service */ \"./src/components/comments/comments.service.ts\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst comment_entity_1 = __webpack_require__(/*! ./comment.entity */ \"./src/components/comments/comment.entity.ts\");\r\nlet CommentsModule = class CommentsModule {\r\n};\r\nCommentsModule = __decorate([\r\n    common_1.Module({\r\n        imports: [\r\n            typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment]),\r\n        ],\r\n        exports: [comments_service_1.CommentsService],\r\n        controllers: [],\r\n        providers: [\r\n            comments_service_1.CommentsService,\r\n        ],\r\n    })\r\n], CommentsModule);\r\nexports.CommentsModule = CommentsModule;\r\n\n\n//# sourceURL=webpack:///./src/components/comments/comments.module.ts?");

/***/ }),

/***/ "./src/components/comments/comments.service.ts":
/*!*****************************************************!*\
  !*** ./src/components/comments/comments.service.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst comment_entity_1 = __webpack_require__(/*! ./comment.entity */ \"./src/components/comments/comment.entity.ts\");\r\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nlet CommentsService = class CommentsService {\r\n    constructor(commentsRepository) {\r\n        this.commentsRepository = commentsRepository;\r\n    }\r\n    createOne(payload, user) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const newComment = Object.assign({}, new comment_entity_1.Comment(), payload, { author: user });\r\n            return yield this.commentsRepository.save(newComment);\r\n        });\r\n    }\r\n    updateOne(id, payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.commentsRepository.update(id, Object.assign({}, payload));\r\n            return yield this.commentsRepository.findOne(id);\r\n        });\r\n    }\r\n    deleteOne(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n        });\r\n    }\r\n};\r\nCommentsService = __decorate([\r\n    common_1.Injectable(),\r\n    __param(0, typeorm_1.InjectRepository(comment_entity_1.Comment)),\r\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository])\r\n], CommentsService);\r\nexports.CommentsService = CommentsService;\r\n\n\n//# sourceURL=webpack:///./src/components/comments/comments.service.ts?");

/***/ }),

/***/ "./src/components/comments/dto/create-comment.dto.ts":
/*!***********************************************************!*\
  !*** ./src/components/comments/dto/create-comment.dto.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass CreateCommentDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    class_validator_1.MinLength(1),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], CreateCommentDto.prototype, \"text\", void 0);\r\n__decorate([\r\n    class_validator_1.IsInt(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", Number)\r\n], CreateCommentDto.prototype, \"productId\", void 0);\r\nexports.CreateCommentDto = CreateCommentDto;\r\n\n\n//# sourceURL=webpack:///./src/components/comments/dto/create-comment.dto.ts?");

/***/ }),

/***/ "./src/components/core/base.entity.ts":
/*!********************************************!*\
  !*** ./src/components/core/base.entity.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nlet BaseEntity = class BaseEntity {\r\n};\r\n__decorate([\r\n    typeorm_1.PrimaryGeneratedColumn(),\r\n    __metadata(\"design:type\", Number)\r\n], BaseEntity.prototype, \"id\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ nullable: true }),\r\n    __metadata(\"design:type\", Date)\r\n], BaseEntity.prototype, \"createdAt\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ nullable: true }),\r\n    __metadata(\"design:type\", Date)\r\n], BaseEntity.prototype, \"updatedAt\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ nullable: true }),\r\n    __metadata(\"design:type\", Date)\r\n], BaseEntity.prototype, \"deletedAt\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ default: false }),\r\n    __metadata(\"design:type\", Boolean)\r\n], BaseEntity.prototype, \"deleted\", void 0);\r\nBaseEntity = __decorate([\r\n    typeorm_1.Entity()\r\n], BaseEntity);\r\nexports.BaseEntity = BaseEntity;\r\n\n\n//# sourceURL=webpack:///./src/components/core/base.entity.ts?");

/***/ }),

/***/ "./src/components/core/core.module.ts":
/*!********************************************!*\
  !*** ./src/components/core/core.module.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst hash_service_1 = __webpack_require__(/*! ./services/hash.service */ \"./src/components/core/services/hash.service.ts\");\r\nconst email_sending_service_1 = __webpack_require__(/*! ./services/email-sending.service */ \"./src/components/core/services/email-sending.service.ts\");\r\nconst email_templates_service_1 = __webpack_require__(/*! ./services/email-templates.service */ \"./src/components/core/services/email-templates.service.ts\");\r\nconst exportedProviders = [\r\n    hash_service_1.HashService,\r\n    email_sending_service_1.EmailSendingService,\r\n    email_templates_service_1.EmailTemplatesService,\r\n];\r\nlet CoreModule = class CoreModule {\r\n};\r\nCoreModule = __decorate([\r\n    common_1.Module({\r\n        imports: [],\r\n        exports: [...exportedProviders],\r\n        controllers: [],\r\n        providers: [...exportedProviders],\r\n    })\r\n], CoreModule);\r\nexports.CoreModule = CoreModule;\r\n\n\n//# sourceURL=webpack:///./src/components/core/core.module.ts?");

/***/ }),

/***/ "./src/components/core/dto/pagination.dto.ts":
/*!***************************************************!*\
  !*** ./src/components/core/dto/pagination.dto.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nclass PaginationDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsOptional(),\r\n    class_validator_1.IsNumberString(),\r\n    __metadata(\"design:type\", Number)\r\n], PaginationDto.prototype, \"page\", void 0);\r\n__decorate([\r\n    class_validator_1.IsOptional(),\r\n    class_validator_1.IsNumberString(),\r\n    __metadata(\"design:type\", Number)\r\n], PaginationDto.prototype, \"limit\", void 0);\r\nexports.PaginationDto = PaginationDto;\r\n\n\n//# sourceURL=webpack:///./src/components/core/dto/pagination.dto.ts?");

/***/ }),

/***/ "./src/components/core/services/email-sending.service.ts":
/*!***************************************************************!*\
  !*** ./src/components/core/services/email-sending.service.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst sgEmail = __webpack_require__(/*! @sendgrid/mail */ \"@sendgrid/mail\");\r\nconst config_1 = __webpack_require__(/*! ../../../config */ \"./src/config/index.ts\");\r\nlet EmailSendingService = class EmailSendingService {\r\n    constructor() {\r\n        this.client = sgEmail;\r\n        this.client.setApiKey(config_1.SENDGRID_KEY);\r\n    }\r\n    sendSystemEmail(email, subject, template) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            try {\r\n                yield this.client.send({\r\n                    from: config_1.SYSTEM_EMAIL,\r\n                    to: email,\r\n                    subject,\r\n                    html: template,\r\n                });\r\n            }\r\n            catch (e) {\r\n                throw new common_1.InternalServerErrorException();\r\n            }\r\n        });\r\n    }\r\n};\r\nEmailSendingService = __decorate([\r\n    common_1.Injectable(),\r\n    __metadata(\"design:paramtypes\", [])\r\n], EmailSendingService);\r\nexports.EmailSendingService = EmailSendingService;\r\n\n\n//# sourceURL=webpack:///./src/components/core/services/email-sending.service.ts?");

/***/ }),

/***/ "./src/components/core/services/email-templates.service.ts":
/*!*****************************************************************!*\
  !*** ./src/components/core/services/email-templates.service.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst template_types_enum_1 = __webpack_require__(/*! ../../../helpers/enums/template-types.enum */ \"./src/helpers/enums/template-types.enum.ts\");\r\nconst pug_1 = __webpack_require__(/*! pug */ \"pug\");\r\nconst path_1 = __webpack_require__(/*! path */ \"path\");\r\nconst config_1 = __webpack_require__(/*! ../../../config */ \"./src/config/index.ts\");\r\nlet EmailTemplatesService = class EmailTemplatesService {\r\n    getTemplate(type, data) {\r\n        switch (type) {\r\n            case template_types_enum_1.TemplateTypes.EMAIL_VERIFICATION:\r\n                return this.renderTemplate('email-verification')(data);\r\n            case template_types_enum_1.TemplateTypes.RESET_PASSWORD:\r\n                return this.renderTemplate('reset-password')(data);\r\n        }\r\n    }\r\n    renderTemplate(filename) {\r\n        return pug_1.compileFile(path_1.join(config_1.EMAIL_TEMPLATES_FOLDER, `${filename}.pug`));\r\n    }\r\n    createSubject(title) {\r\n        return `${config_1.APP_NAME} ${title}`;\r\n    }\r\n};\r\nEmailTemplatesService = __decorate([\r\n    common_1.Injectable()\r\n], EmailTemplatesService);\r\nexports.EmailTemplatesService = EmailTemplatesService;\r\n\n\n//# sourceURL=webpack:///./src/components/core/services/email-templates.service.ts?");

/***/ }),

/***/ "./src/components/core/services/hash.service.ts":
/*!******************************************************!*\
  !*** ./src/components/core/services/hash.service.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst bcrypt = __webpack_require__(/*! bcrypt */ \"bcrypt\");\r\nlet HashService = class HashService {\r\n    constructor() {\r\n        this.SALT_ROUNDS = 10;\r\n    }\r\n    generateHash(str) {\r\n        return bcrypt.hash(str, this.SALT_ROUNDS);\r\n    }\r\n    compareHash(str, hash) {\r\n        return bcrypt.compare(str, hash);\r\n    }\r\n};\r\nHashService = __decorate([\r\n    common_1.Injectable()\r\n], HashService);\r\nexports.HashService = HashService;\r\n\n\n//# sourceURL=webpack:///./src/components/core/services/hash.service.ts?");

/***/ }),

/***/ "./src/components/files/file.entity.ts":
/*!*********************************************!*\
  !*** ./src/components/files/file.entity.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst product_entity_1 = __webpack_require__(/*! ../products/product.entity */ \"./src/components/products/product.entity.ts\");\r\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\r\nlet File = class File extends base_entity_1.BaseEntity {\r\n};\r\n__decorate([\r\n    typeorm_1.Column(),\r\n    __metadata(\"design:type\", String)\r\n], File.prototype, \"url\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ nullable: true }),\r\n    __metadata(\"design:type\", String)\r\n], File.prototype, \"publicId\", void 0);\r\n__decorate([\r\n    typeorm_1.ManyToOne(type => product_entity_1.Product),\r\n    __metadata(\"design:type\", product_entity_1.Product)\r\n], File.prototype, \"product\", void 0);\r\nFile = __decorate([\r\n    typeorm_1.Entity()\r\n], File);\r\nexports.File = File;\r\n\n\n//# sourceURL=webpack:///./src/components/files/file.entity.ts?");

/***/ }),

/***/ "./src/components/files/files.controller.ts":
/*!**************************************************!*\
  !*** ./src/components/files/files.controller.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst files_service_1 = __webpack_require__(/*! ./files.service */ \"./src/components/files/files.service.ts\");\r\nlet FilesController = class FilesController {\r\n    constructor(filesService) {\r\n        this.filesService = filesService;\r\n    }\r\n    uploadFile(file) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.filesService.uploadFile(file);\r\n        });\r\n    }\r\n    uploadFilesList(files) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.filesService.uploadFilesList(files);\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    common_1.Post(''),\r\n    common_1.UseInterceptors(common_1.FileInterceptor('file')),\r\n    swagger_1.ApiOperation({ title: 'Upload one file' }),\r\n    __param(0, common_1.UploadedFile()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], FilesController.prototype, \"uploadFile\", null);\r\n__decorate([\r\n    common_1.Post('list'),\r\n    common_1.UseInterceptors(common_1.FilesInterceptor('files')),\r\n    swagger_1.ApiOperation({ title: 'Upload one file' }),\r\n    __param(0, common_1.UploadedFile()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Array]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], FilesController.prototype, \"uploadFilesList\", null);\r\nFilesController = __decorate([\r\n    common_1.Controller('files'),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    swagger_1.ApiUseTags('Files'),\r\n    __metadata(\"design:paramtypes\", [files_service_1.FilesService])\r\n], FilesController);\r\nexports.FilesController = FilesController;\r\n\n\n//# sourceURL=webpack:///./src/components/files/files.controller.ts?");

/***/ }),

/***/ "./src/components/files/files.module.ts":
/*!**********************************************!*\
  !*** ./src/components/files/files.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst files_service_1 = __webpack_require__(/*! ./files.service */ \"./src/components/files/files.service.ts\");\r\nconst file_entity_1 = __webpack_require__(/*! ./file.entity */ \"./src/components/files/file.entity.ts\");\r\nconst files_controller_1 = __webpack_require__(/*! ./files.controller */ \"./src/components/files/files.controller.ts\");\r\nlet FilesModule = class FilesModule {\r\n};\r\nFilesModule = __decorate([\r\n    common_1.Module({\r\n        imports: [\r\n            typeorm_1.TypeOrmModule.forFeature([file_entity_1.File]),\r\n            common_1.MulterModule.register({\r\n                dest: './upload',\r\n            }),\r\n        ],\r\n        exports: [files_service_1.FilesService, common_1.MulterModule],\r\n        controllers: [files_controller_1.FilesController],\r\n        providers: [files_service_1.FilesService],\r\n    })\r\n], FilesModule);\r\nexports.FilesModule = FilesModule;\r\n\n\n//# sourceURL=webpack:///./src/components/files/files.module.ts?");

/***/ }),

/***/ "./src/components/files/files.service.ts":
/*!***********************************************!*\
  !*** ./src/components/files/files.service.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst cloudinary = __webpack_require__(/*! cloudinary */ \"cloudinary\");\r\nconst path_1 = __webpack_require__(/*! path */ \"path\");\r\nconst util_1 = __webpack_require__(/*! util */ \"util\");\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst config_1 = __webpack_require__(/*! ../../config */ \"./src/config/index.ts\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst file_entity_1 = __webpack_require__(/*! ./file.entity */ \"./src/components/files/file.entity.ts\");\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\r\ncloudinary.v2.uploader.upload = util_1.promisify(cloudinary.v2.uploader.upload);\r\nconst unlink = util_1.promisify(fs.unlink);\r\nlet FilesService = class FilesService {\r\n    constructor(filesRepository) {\r\n        this.filesRepository = filesRepository;\r\n        this.cloudinary = cloudinary;\r\n        this.cloudinary.config({\r\n            cloud_name: config_1.CLOUDINARY_CLOUD_NAME,\r\n            api_key: config_1.CLOUDINARY_API_KEY,\r\n            api_secret: config_1.CLOUDINARY_API_SECRET,\r\n        });\r\n    }\r\n    findOne(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.filesRepository.findOne(id);\r\n        });\r\n    }\r\n    uploadFile(file) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const path = path_1.join(config_1.FILES_UPLOAD_FOLDER, file.filename);\r\n            const { url, public_id } = yield this.cloudinary.v2.uploader.upload(path);\r\n            yield unlink(path);\r\n            const newFile = Object.assign({}, new file_entity_1.File(), { url, publicId: public_id });\r\n            return yield this.filesRepository.save(newFile);\r\n        });\r\n    }\r\n    uploadFilesList(files) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const uploadedFiles = yield Promise.all(files.map(file => this.cloudinary.v2.uploader.upload(path_1.join(config_1.FILES_UPLOAD_FOLDER, file.filename))));\r\n            return yield this.filesRepository.save(uploadedFiles.map(({ url, public_id }) => {\r\n                return Object.assign({}, new file_entity_1.File(), { url, publicId: public_id });\r\n            }));\r\n        });\r\n    }\r\n    deleteOne(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const file = yield this.filesRepository.findOne(id);\r\n            if (!file) {\r\n                throw new common_1.NotFoundException(messages_enum_1.Messages.FILE_NOT_FOUND);\r\n            }\r\n            yield this.cloudinary.v2.uploader.destroy(file.publicId);\r\n            yield this.filesRepository.delete({ id });\r\n        });\r\n    }\r\n};\r\nFilesService = __decorate([\r\n    __param(0, typeorm_1.InjectRepository(file_entity_1.File)),\r\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository])\r\n], FilesService);\r\nexports.FilesService = FilesService;\r\n\n\n//# sourceURL=webpack:///./src/components/files/files.service.ts?");

/***/ }),

/***/ "./src/components/messages/dto/add-message.dto.ts":
/*!********************************************************!*\
  !*** ./src/components/messages/dto/add-message.dto.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nclass AddMessageDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    __metadata(\"design:type\", String)\r\n], AddMessageDto.prototype, \"text\", void 0);\r\n__decorate([\r\n    class_validator_1.IsNumber(),\r\n    __metadata(\"design:type\", Number)\r\n], AddMessageDto.prototype, \"authorId\", void 0);\r\n__decorate([\r\n    class_validator_1.IsNumber(),\r\n    __metadata(\"design:type\", Number)\r\n], AddMessageDto.prototype, \"chatId\", void 0);\r\nexports.AddMessageDto = AddMessageDto;\r\n\n\n//# sourceURL=webpack:///./src/components/messages/dto/add-message.dto.ts?");

/***/ }),

/***/ "./src/components/messages/message.entity.ts":
/*!***************************************************!*\
  !*** ./src/components/messages/message.entity.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\r\nconst chat_entity_1 = __webpack_require__(/*! ../chats/chat.entity */ \"./src/components/chats/chat.entity.ts\");\r\nlet Message = class Message {\r\n};\r\n__decorate([\r\n    typeorm_1.PrimaryGeneratedColumn(),\r\n    __metadata(\"design:type\", Number)\r\n], Message.prototype, \"id\", void 0);\r\n__decorate([\r\n    typeorm_1.Column('varchar'),\r\n    __metadata(\"design:type\", String)\r\n], Message.prototype, \"text\", void 0);\r\n__decorate([\r\n    typeorm_1.Column(),\r\n    __metadata(\"design:type\", String)\r\n], Message.prototype, \"createdAt\", void 0);\r\n__decorate([\r\n    typeorm_1.ManyToOne(type => user_entity_1.User),\r\n    typeorm_1.JoinColumn(),\r\n    __metadata(\"design:type\", user_entity_1.User)\r\n], Message.prototype, \"author\", void 0);\r\n__decorate([\r\n    typeorm_1.ManyToOne(type => chat_entity_1.Chat, chat => chat.messages),\r\n    typeorm_1.JoinColumn(),\r\n    __metadata(\"design:type\", chat_entity_1.Chat)\r\n], Message.prototype, \"chat\", void 0);\r\nMessage = __decorate([\r\n    typeorm_1.Entity()\r\n], Message);\r\nexports.Message = Message;\r\n\n\n//# sourceURL=webpack:///./src/components/messages/message.entity.ts?");

/***/ }),

/***/ "./src/components/messages/messages.actions.ts":
/*!*****************************************************!*\
  !*** ./src/components/messages/messages.actions.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.ADD_MESSAGE = 'ADD_MESSAGE';\r\nexports.UPDATE_MESSAGE = 'UPDATE_MESSAGE';\r\nexports.REMOVE_MESSAGE = 'REMOVE_MESSAGE';\r\nclass AddMessage {\r\n    constructor(data) {\r\n        this.data = data;\r\n        this.event = exports.ADD_MESSAGE;\r\n    }\r\n}\r\nexports.AddMessage = AddMessage;\r\nclass UpdateMessage {\r\n    constructor(data) {\r\n        this.data = data;\r\n        this.event = exports.UPDATE_MESSAGE;\r\n    }\r\n}\r\nexports.UpdateMessage = UpdateMessage;\r\nclass RemoveMessage {\r\n    constructor(data = null) {\r\n        this.data = data;\r\n        this.event = exports.REMOVE_MESSAGE;\r\n    }\r\n}\r\nexports.RemoveMessage = RemoveMessage;\r\n\n\n//# sourceURL=webpack:///./src/components/messages/messages.actions.ts?");

/***/ }),

/***/ "./src/components/messages/messages.gateway.ts":
/*!*****************************************************!*\
  !*** ./src/components/messages/messages.gateway.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst websockets_1 = __webpack_require__(/*! @nestjs/websockets */ \"@nestjs/websockets\");\r\nconst actions = __webpack_require__(/*! ./messages.actions */ \"./src/components/messages/messages.actions.ts\");\r\nconst add_message_dto_1 = __webpack_require__(/*! ./dto/add-message.dto */ \"./src/components/messages/dto/add-message.dto.ts\");\r\nconst messages_service_1 = __webpack_require__(/*! ./messages.service */ \"./src/components/messages/messages.service.ts\");\r\nlet MessagesGateway = class MessagesGateway {\r\n    constructor(messagesService) {\r\n        this.messagesService = messagesService;\r\n    }\r\n    handleConnection(client) {\r\n        console.log('New');\r\n    }\r\n    onAttendUser(client, { chatId }) {\r\n        client.join(chatId);\r\n    }\r\n    onAddMessage(client, payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            this.server.to(payload.chatId).emit(actions.ADD_MESSAGE, { title: 'Response' });\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    websockets_1.WebSocketServer(),\r\n    __metadata(\"design:type\", Object)\r\n], MessagesGateway.prototype, \"server\", void 0);\r\n__decorate([\r\n    websockets_1.SubscribeMessage('ADD_USER'),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object, Object]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], MessagesGateway.prototype, \"onAttendUser\", null);\r\n__decorate([\r\n    websockets_1.SubscribeMessage(actions.ADD_MESSAGE),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object, add_message_dto_1.AddMessageDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], MessagesGateway.prototype, \"onAddMessage\", null);\r\nMessagesGateway = __decorate([\r\n    websockets_1.WebSocketGateway({ namespace: 'messages' }),\r\n    __metadata(\"design:paramtypes\", [messages_service_1.MessagesService])\r\n], MessagesGateway);\r\nexports.MessagesGateway = MessagesGateway;\r\n\n\n//# sourceURL=webpack:///./src/components/messages/messages.gateway.ts?");

/***/ }),

/***/ "./src/components/messages/messages.module.ts":
/*!****************************************************!*\
  !*** ./src/components/messages/messages.module.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst messages_service_1 = __webpack_require__(/*! ./messages.service */ \"./src/components/messages/messages.service.ts\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst message_entity_1 = __webpack_require__(/*! ./message.entity */ \"./src/components/messages/message.entity.ts\");\r\nconst messages_gateway_1 = __webpack_require__(/*! ./messages.gateway */ \"./src/components/messages/messages.gateway.ts\");\r\nlet MessagesModule = class MessagesModule {\r\n};\r\nMessagesModule = __decorate([\r\n    common_1.Module({\r\n        imports: [\r\n            typeorm_1.TypeOrmModule.forFeature([message_entity_1.Message]),\r\n        ],\r\n        controllers: [],\r\n        exports: [messages_service_1.MessagesService],\r\n        providers: [messages_service_1.MessagesService, messages_gateway_1.MessagesGateway],\r\n    })\r\n], MessagesModule);\r\nexports.MessagesModule = MessagesModule;\r\n\n\n//# sourceURL=webpack:///./src/components/messages/messages.module.ts?");

/***/ }),

/***/ "./src/components/messages/messages.service.ts":
/*!*****************************************************!*\
  !*** ./src/components/messages/messages.service.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst message_entity_1 = __webpack_require__(/*! ./message.entity */ \"./src/components/messages/message.entity.ts\");\r\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nlet MessagesService = class MessagesService {\r\n    constructor(messagesRepository) {\r\n        this.messagesRepository = messagesRepository;\r\n    }\r\n    addMessage(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const newMessage = Object.assign({}, new message_entity_1.Message(), { text: payload.text, author: { id: payload.authorId }, createdAt: new Date().toISOString() });\r\n            return yield this.messagesRepository.save(newMessage);\r\n        });\r\n    }\r\n    updateMessage(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.messagesRepository.update({\r\n                id: payload.id,\r\n            }, {\r\n                text: payload.text,\r\n            });\r\n            return this.messagesRepository.findOne({ relations: ['author'] });\r\n        });\r\n    }\r\n    removeMessage(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.messagesRepository.delete({ id });\r\n        });\r\n    }\r\n};\r\nMessagesService = __decorate([\r\n    common_1.Injectable(),\r\n    __param(0, typeorm_1.InjectRepository(message_entity_1.Message)),\r\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository])\r\n], MessagesService);\r\nexports.MessagesService = MessagesService;\r\n\n\n//# sourceURL=webpack:///./src/components/messages/messages.service.ts?");

/***/ }),

/***/ "./src/components/orders/dto/create-order.dto.ts":
/*!*******************************************************!*\
  !*** ./src/components/orders/dto/create-order.dto.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nconst card_cvv_validator_1 = __webpack_require__(/*! ../../../helpers/card-validators/card-cvv.validator */ \"./src/helpers/card-validators/card-cvv.validator.ts\");\r\nconst card_expires_in_validator_1 = __webpack_require__(/*! ../../../helpers/card-validators/card-expires-in.validator */ \"./src/helpers/card-validators/card-expires-in.validator.ts\");\r\nclass CreateOrderDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsCreditCard(),\r\n    __metadata(\"design:type\", Number)\r\n], CreateOrderDto.prototype, \"cardNumber\", void 0);\r\n__decorate([\r\n    class_validator_1.IsNumber(),\r\n    class_validator_1.Validate(card_cvv_validator_1.CardCvvValidator),\r\n    __metadata(\"design:type\", Number)\r\n], CreateOrderDto.prototype, \"cvv\", void 0);\r\n__decorate([\r\n    class_validator_1.IsDate(),\r\n    class_validator_1.Validate(card_expires_in_validator_1.CardExpiresInValidator),\r\n    __metadata(\"design:type\", Date)\r\n], CreateOrderDto.prototype, \"expiresIn\", void 0);\r\n__decorate([\r\n    class_validator_1.ArrayNotEmpty(),\r\n    __metadata(\"design:type\", Array)\r\n], CreateOrderDto.prototype, \"productIds\", void 0);\r\nexports.CreateOrderDto = CreateOrderDto;\r\n\n\n//# sourceURL=webpack:///./src/components/orders/dto/create-order.dto.ts?");

/***/ }),

/***/ "./src/components/orders/order.entity.ts":
/*!***********************************************!*\
  !*** ./src/components/orders/order.entity.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\r\nconst product_entity_1 = __webpack_require__(/*! ../products/product.entity */ \"./src/components/products/product.entity.ts\");\r\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\r\nlet Order = class Order extends base_entity_1.BaseEntity {\r\n};\r\n__decorate([\r\n    typeorm_1.ManyToOne(type => user_entity_1.User),\r\n    typeorm_1.JoinColumn(),\r\n    __metadata(\"design:type\", user_entity_1.User)\r\n], Order.prototype, \"user\", void 0);\r\n__decorate([\r\n    typeorm_1.ManyToMany(type => product_entity_1.Product, product => product.orders),\r\n    __metadata(\"design:type\", Array)\r\n], Order.prototype, \"products\", void 0);\r\n__decorate([\r\n    typeorm_1.Column(),\r\n    __metadata(\"design:type\", Number)\r\n], Order.prototype, \"totalPrice\", void 0);\r\n__decorate([\r\n    typeorm_1.Column(),\r\n    __metadata(\"design:type\", Number)\r\n], Order.prototype, \"totalCount\", void 0);\r\nOrder = __decorate([\r\n    typeorm_1.Entity()\r\n], Order);\r\nexports.Order = Order;\r\n\n\n//# sourceURL=webpack:///./src/components/orders/order.entity.ts?");

/***/ }),

/***/ "./src/components/orders/orders.controller.ts":
/*!****************************************************!*\
  !*** ./src/components/orders/orders.controller.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst create_order_dto_1 = __webpack_require__(/*! ./dto/create-order.dto */ \"./src/components/orders/dto/create-order.dto.ts\");\r\nconst orders_service_1 = __webpack_require__(/*! ./orders.service */ \"./src/components/orders/orders.service.ts\");\r\nconst products_service_1 = __webpack_require__(/*! ../products/products.service */ \"./src/components/products/products.service.ts\");\r\nlet OrdersController = class OrdersController {\r\n    constructor(ordersService, productsService) {\r\n        this.ordersService = ordersService;\r\n        this.productsService = productsService;\r\n    }\r\n    createOne(body) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    common_1.Post(''),\r\n    swagger_1.ApiOperation({ title: 'Create new order' }),\r\n    __param(0, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [create_order_dto_1.CreateOrderDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], OrdersController.prototype, \"createOne\", null);\r\nOrdersController = __decorate([\r\n    common_1.Controller('orders'),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    swagger_1.ApiUseTags('Orders'),\r\n    __metadata(\"design:paramtypes\", [orders_service_1.OrdersService,\r\n        products_service_1.ProductsService])\r\n], OrdersController);\r\nexports.OrdersController = OrdersController;\r\n\n\n//# sourceURL=webpack:///./src/components/orders/orders.controller.ts?");

/***/ }),

/***/ "./src/components/orders/orders.module.ts":
/*!************************************************!*\
  !*** ./src/components/orders/orders.module.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst order_entity_1 = __webpack_require__(/*! ./order.entity */ \"./src/components/orders/order.entity.ts\");\r\nconst orders_controller_1 = __webpack_require__(/*! ./orders.controller */ \"./src/components/orders/orders.controller.ts\");\r\nconst orders_service_1 = __webpack_require__(/*! ./orders.service */ \"./src/components/orders/orders.service.ts\");\r\nconst products_module_1 = __webpack_require__(/*! ../products/products.module */ \"./src/components/products/products.module.ts\");\r\nconst users_module_1 = __webpack_require__(/*! ../users/users.module */ \"./src/components/users/users.module.ts\");\r\nlet OrdersModule = class OrdersModule {\r\n};\r\nOrdersModule = __decorate([\r\n    common_1.Module({\r\n        imports: [\r\n            typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order]),\r\n            products_module_1.ProductsModule,\r\n            users_module_1.UsersModule,\r\n        ],\r\n        controllers: [orders_controller_1.OrdersController],\r\n        providers: [orders_service_1.OrdersService],\r\n        exports: [],\r\n    })\r\n], OrdersModule);\r\nexports.OrdersModule = OrdersModule;\r\n\n\n//# sourceURL=webpack:///./src/components/orders/orders.module.ts?");

/***/ }),

/***/ "./src/components/orders/orders.service.ts":
/*!*************************************************!*\
  !*** ./src/components/orders/orders.service.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nlet OrdersService = class OrdersService {\r\n};\r\nOrdersService = __decorate([\r\n    common_1.Injectable()\r\n], OrdersService);\r\nexports.OrdersService = OrdersService;\r\n\n\n//# sourceURL=webpack:///./src/components/orders/orders.service.ts?");

/***/ }),

/***/ "./src/components/products/dto/create-product.dto.ts":
/*!***********************************************************!*\
  !*** ./src/components/products/dto/create-product.dto.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass CreateProductDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], CreateProductDto.prototype, \"title\", void 0);\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    class_validator_1.IsOptional(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], CreateProductDto.prototype, \"description\", void 0);\r\n__decorate([\r\n    class_validator_1.IsNumber(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", Number)\r\n], CreateProductDto.prototype, \"mainImageId\", void 0);\r\n__decorate([\r\n    class_validator_1.IsInt(),\r\n    class_validator_1.Min(0),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", Number)\r\n], CreateProductDto.prototype, \"quantity\", void 0);\r\n__decorate([\r\n    class_validator_1.IsNumber(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", Number)\r\n], CreateProductDto.prototype, \"price\", void 0);\r\nexports.CreateProductDto = CreateProductDto;\r\n\n\n//# sourceURL=webpack:///./src/components/products/dto/create-product.dto.ts?");

/***/ }),

/***/ "./src/components/products/dto/update-product.dto.ts":
/*!***********************************************************!*\
  !*** ./src/components/products/dto/update-product.dto.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass UpdateProductDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], UpdateProductDto.prototype, \"title\", void 0);\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    class_validator_1.IsOptional(),\r\n    swagger_1.ApiModelPropertyOptional(),\r\n    __metadata(\"design:type\", String)\r\n], UpdateProductDto.prototype, \"description\", void 0);\r\n__decorate([\r\n    class_validator_1.IsNumber(),\r\n    class_validator_1.Min(0),\r\n    class_validator_1.IsOptional(),\r\n    swagger_1.ApiModelPropertyOptional(),\r\n    __metadata(\"design:type\", Number)\r\n], UpdateProductDto.prototype, \"quantity\", void 0);\r\n__decorate([\r\n    class_validator_1.IsNumber(),\r\n    class_validator_1.Min(0),\r\n    class_validator_1.IsOptional(),\r\n    swagger_1.ApiModelPropertyOptional(),\r\n    __metadata(\"design:type\", Number)\r\n], UpdateProductDto.prototype, \"price\", void 0);\r\nexports.UpdateProductDto = UpdateProductDto;\r\n\n\n//# sourceURL=webpack:///./src/components/products/dto/update-product.dto.ts?");

/***/ }),

/***/ "./src/components/products/product.entity.ts":
/*!***************************************************!*\
  !*** ./src/components/products/product.entity.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\r\nconst file_entity_1 = __webpack_require__(/*! ../files/file.entity */ \"./src/components/files/file.entity.ts\");\r\nconst order_entity_1 = __webpack_require__(/*! ../orders/order.entity */ \"./src/components/orders/order.entity.ts\");\r\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\r\nlet Product = class Product extends base_entity_1.BaseEntity {\r\n};\r\n__decorate([\r\n    typeorm_1.Column('varchar'),\r\n    __metadata(\"design:type\", String)\r\n], Product.prototype, \"title\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ type: 'text', nullable: true }),\r\n    __metadata(\"design:type\", String)\r\n], Product.prototype, \"description\", void 0);\r\n__decorate([\r\n    typeorm_1.ManyToOne(type => user_entity_1.User, user => user.products),\r\n    typeorm_1.JoinColumn(),\r\n    __metadata(\"design:type\", user_entity_1.User)\r\n], Product.prototype, \"seller\", void 0);\r\n__decorate([\r\n    typeorm_1.OneToOne(type => file_entity_1.File),\r\n    typeorm_1.JoinColumn(),\r\n    __metadata(\"design:type\", file_entity_1.File)\r\n], Product.prototype, \"mainImage\", void 0);\r\n__decorate([\r\n    typeorm_1.OneToMany(type => file_entity_1.File, image => image.product),\r\n    __metadata(\"design:type\", Array)\r\n], Product.prototype, \"images\", void 0);\r\n__decorate([\r\n    typeorm_1.Column(),\r\n    __metadata(\"design:type\", Number)\r\n], Product.prototype, \"quantity\", void 0);\r\n__decorate([\r\n    typeorm_1.Column(),\r\n    __metadata(\"design:type\", Number)\r\n], Product.prototype, \"price\", void 0);\r\n__decorate([\r\n    typeorm_1.ManyToMany(type => order_entity_1.Order, order => order.products),\r\n    __metadata(\"design:type\", Array)\r\n], Product.prototype, \"orders\", void 0);\r\nProduct = __decorate([\r\n    typeorm_1.Entity()\r\n], Product);\r\nexports.Product = Product;\r\n\n\n//# sourceURL=webpack:///./src/components/products/product.entity.ts?");

/***/ }),

/***/ "./src/components/products/products.controller.ts":
/*!********************************************************!*\
  !*** ./src/components/products/products.controller.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst create_product_dto_1 = __webpack_require__(/*! ./dto/create-product.dto */ \"./src/components/products/dto/create-product.dto.ts\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst products_service_1 = __webpack_require__(/*! ./products.service */ \"./src/components/products/products.service.ts\");\r\nconst files_service_1 = __webpack_require__(/*! ../files/files.service */ \"./src/components/files/files.service.ts\");\r\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\r\nconst user_decorator_1 = __webpack_require__(/*! ../../helpers/decorators/user.decorator */ \"./src/helpers/decorators/user.decorator.ts\");\r\nconst user_entity_1 = __webpack_require__(/*! ../users/user.entity */ \"./src/components/users/user.entity.ts\");\r\nconst create_comment_dto_1 = __webpack_require__(/*! ../comments/dto/create-comment.dto */ \"./src/components/comments/dto/create-comment.dto.ts\");\r\nconst comments_service_1 = __webpack_require__(/*! ../comments/comments.service */ \"./src/components/comments/comments.service.ts\");\r\nconst update_product_dto_1 = __webpack_require__(/*! ./dto/update-product.dto */ \"./src/components/products/dto/update-product.dto.ts\");\r\nlet ProductsController = class ProductsController {\r\n    constructor(productsService, commentsService, filesService) {\r\n        this.productsService = productsService;\r\n        this.commentsService = commentsService;\r\n        this.filesService = filesService;\r\n    }\r\n    createOne(payload, user) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const mainImage = yield this.filesService.findOne(payload.mainImageId);\r\n            if (!mainImage) {\r\n                throw new common_1.NotFoundException(messages_enum_1.Messages.FILE_NOT_FOUND);\r\n            }\r\n            const productData = Object.assign({}, payload, { mainImage });\r\n            return yield this.productsService.createOne(productData, user);\r\n        });\r\n    }\r\n    updateOne(id, payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.productsService.updateOne(id, payload);\r\n        });\r\n    }\r\n    createProductComment(productId, payload, user) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const product = yield this.productsService.findOne(productId, {});\r\n            if (!product) {\r\n                throw new common_1.NotFoundException(messages_enum_1.Messages.PRODUCT_NOT_FOUND);\r\n            }\r\n            yield this.commentsService.createOne(payload, user);\r\n            return yield this.productsService.findOne(productId, { includeComments: true });\r\n        });\r\n    }\r\n    updateProductComment(productId, commentId, user) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const product = yield this.productsService.findOne(productId, {});\r\n            if (!product || product.seller.id !== user.id) {\r\n                throw new common_1.ForbiddenException(messages_enum_1.Messages.INVALID_RIGHTS_TO_DELETE_COMMENT);\r\n            }\r\n            yield this.commentsService.deleteOne(commentId);\r\n            return yield this.productsService.findOne(productId, { includeComments: true });\r\n        });\r\n    }\r\n    deleteOne(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.productsService.deleteOne(id);\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    common_1.Post(),\r\n    swagger_1.ApiOperation({ title: 'Create new product' }),\r\n    __param(0, common_1.Body()), __param(1, user_decorator_1.ReqUser()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [create_product_dto_1.CreateProductDto, user_entity_1.User]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ProductsController.prototype, \"createOne\", null);\r\n__decorate([\r\n    common_1.Put(':id'),\r\n    swagger_1.ApiOperation({ title: 'Update existing product by id' }),\r\n    __param(0, common_1.Param('id')), __param(1, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Number, update_product_dto_1.UpdateProductDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ProductsController.prototype, \"updateOne\", null);\r\n__decorate([\r\n    common_1.Put(':productId/comments'),\r\n    swagger_1.ApiOperation({ title: 'Create comment for product' }),\r\n    __param(0, common_1.Param('productId')),\r\n    __param(1, common_1.Body()),\r\n    __param(2, user_decorator_1.ReqUser()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Number, create_comment_dto_1.CreateCommentDto,\r\n        user_entity_1.User]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ProductsController.prototype, \"createProductComment\", null);\r\n__decorate([\r\n    common_1.Delete(':productId/comments/:commentId'),\r\n    swagger_1.ApiOperation({ title: 'Delete comment', description: 'It can be done only by seller of product' }),\r\n    __param(0, common_1.Param('productId')),\r\n    __param(1, common_1.Param('commentId')),\r\n    __param(2, user_decorator_1.ReqUser()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Number, Number, user_entity_1.User]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ProductsController.prototype, \"updateProductComment\", null);\r\n__decorate([\r\n    common_1.Delete(':id'),\r\n    __param(0, common_1.Param('id')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Number]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], ProductsController.prototype, \"deleteOne\", null);\r\nProductsController = __decorate([\r\n    common_1.Controller('products'),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    swagger_1.ApiUseTags('Products'),\r\n    swagger_1.ApiBearerAuth(),\r\n    __metadata(\"design:paramtypes\", [products_service_1.ProductsService,\r\n        comments_service_1.CommentsService,\r\n        files_service_1.FilesService])\r\n], ProductsController);\r\nexports.ProductsController = ProductsController;\r\n\n\n//# sourceURL=webpack:///./src/components/products/products.controller.ts?");

/***/ }),

/***/ "./src/components/products/products.module.ts":
/*!****************************************************!*\
  !*** ./src/components/products/products.module.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst products_controller_1 = __webpack_require__(/*! ./products.controller */ \"./src/components/products/products.controller.ts\");\r\nconst products_service_1 = __webpack_require__(/*! ./products.service */ \"./src/components/products/products.service.ts\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst product_entity_1 = __webpack_require__(/*! ./product.entity */ \"./src/components/products/product.entity.ts\");\r\nconst files_module_1 = __webpack_require__(/*! ../files/files.module */ \"./src/components/files/files.module.ts\");\r\nconst comments_module_1 = __webpack_require__(/*! ../comments/comments.module */ \"./src/components/comments/comments.module.ts\");\r\nlet ProductsModule = class ProductsModule {\r\n};\r\nProductsModule = __decorate([\r\n    common_1.Module({\r\n        imports: [\r\n            typeorm_1.TypeOrmModule.forFeature([product_entity_1.Product]),\r\n            files_module_1.FilesModule,\r\n            comments_module_1.CommentsModule,\r\n        ],\r\n        exports: [products_service_1.ProductsService],\r\n        controllers: [products_controller_1.ProductsController],\r\n        providers: [products_service_1.ProductsService],\r\n    })\r\n], ProductsModule);\r\nexports.ProductsModule = ProductsModule;\r\n\n\n//# sourceURL=webpack:///./src/components/products/products.module.ts?");

/***/ }),

/***/ "./src/components/products/products.service.ts":
/*!*****************************************************!*\
  !*** ./src/components/products/products.service.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __rest = (this && this.__rest) || function (s, e) {\r\n    var t = {};\r\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\r\n        t[p] = s[p];\r\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\r\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)\r\n            t[p[i]] = s[p[i]];\r\n    return t;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst product_entity_1 = __webpack_require__(/*! ./product.entity */ \"./src/components/products/product.entity.ts\");\r\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nlet ProductsService = class ProductsService {\r\n    constructor(productsRepository) {\r\n        this.productsRepository = productsRepository;\r\n    }\r\n    findMany(query) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return this.productsRepository.find();\r\n        });\r\n    }\r\n    findOne(id, query) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return this.productsRepository.findOne(id);\r\n        });\r\n    }\r\n    createOne(payload, user) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const { mainImageId } = payload, data = __rest(payload, [\"mainImageId\"]);\r\n            const newProduct = Object.assign({}, new product_entity_1.Product(), data, { seller: user });\r\n            return yield this.productsRepository.save(newProduct);\r\n        });\r\n    }\r\n    updateOne(id, payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.productsRepository.update(id, payload);\r\n            return yield this.productsRepository.findOne(id, {\r\n                relations: ['mainImage', 'images'],\r\n            });\r\n        });\r\n    }\r\n    deleteOne(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.productsRepository.delete(id);\r\n        });\r\n    }\r\n};\r\nProductsService = __decorate([\r\n    common_1.Injectable(),\r\n    __param(0, typeorm_1.InjectRepository(product_entity_1.Product)),\r\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository])\r\n], ProductsService);\r\nexports.ProductsService = ProductsService;\r\n\n\n//# sourceURL=webpack:///./src/components/products/products.service.ts?");

/***/ }),

/***/ "./src/components/user-hashes/user-hash.entity.ts":
/*!********************************************************!*\
  !*** ./src/components/user-hashes/user-hash.entity.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nlet UserHash = class UserHash {\r\n};\r\n__decorate([\r\n    typeorm_2.PrimaryGeneratedColumn(),\r\n    __metadata(\"design:type\", Number)\r\n], UserHash.prototype, \"id\", void 0);\r\n__decorate([\r\n    typeorm_1.Column('varchar'),\r\n    __metadata(\"design:type\", String)\r\n], UserHash.prototype, \"hash\", void 0);\r\n__decorate([\r\n    typeorm_1.Column(),\r\n    __metadata(\"design:type\", Number)\r\n], UserHash.prototype, \"userId\", void 0);\r\nUserHash = __decorate([\r\n    typeorm_1.Entity()\r\n], UserHash);\r\nexports.UserHash = UserHash;\r\n\n\n//# sourceURL=webpack:///./src/components/user-hashes/user-hash.entity.ts?");

/***/ }),

/***/ "./src/components/user-hashes/user-hashes.module.ts":
/*!**********************************************************!*\
  !*** ./src/components/user-hashes/user-hashes.module.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst core_module_1 = __webpack_require__(/*! ../core/core.module */ \"./src/components/core/core.module.ts\");\r\nconst user_hashes_service_1 = __webpack_require__(/*! ./user-hashes.service */ \"./src/components/user-hashes/user-hashes.service.ts\");\r\nconst user_hash_entity_1 = __webpack_require__(/*! ./user-hash.entity */ \"./src/components/user-hashes/user-hash.entity.ts\");\r\nlet UserHashesModule = class UserHashesModule {\r\n};\r\nUserHashesModule = __decorate([\r\n    common_1.Module({\r\n        imports: [\r\n            typeorm_1.TypeOrmModule.forFeature([user_hash_entity_1.UserHash]),\r\n            core_module_1.CoreModule,\r\n        ],\r\n        providers: [user_hashes_service_1.UserHashesService],\r\n        exports: [user_hashes_service_1.UserHashesService],\r\n    })\r\n], UserHashesModule);\r\nexports.UserHashesModule = UserHashesModule;\r\n\n\n//# sourceURL=webpack:///./src/components/user-hashes/user-hashes.module.ts?");

/***/ }),

/***/ "./src/components/user-hashes/user-hashes.service.ts":
/*!***********************************************************!*\
  !*** ./src/components/user-hashes/user-hashes.service.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst user_hash_entity_1 = __webpack_require__(/*! ./user-hash.entity */ \"./src/components/user-hashes/user-hash.entity.ts\");\r\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst hash_service_1 = __webpack_require__(/*! ../core/services/hash.service */ \"./src/components/core/services/hash.service.ts\");\r\nlet UserHashesService = class UserHashesService {\r\n    constructor(userHashesRepository, hashService) {\r\n        this.userHashesRepository = userHashesRepository;\r\n        this.hashService = hashService;\r\n    }\r\n    findOneByHash(hash) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.userHashesRepository.findOne({ hash });\r\n        });\r\n    }\r\n    createOne(userId, type) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const userHash = new user_hash_entity_1.UserHash();\r\n            userHash.hash = yield this.hashService.generateHash(JSON.stringify({ userId, type }));\r\n            userHash.userId = userId;\r\n            return yield this.userHashesRepository.save(userHash);\r\n        });\r\n    }\r\n    deleteOne(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.userHashesRepository.delete({ id });\r\n        });\r\n    }\r\n};\r\nUserHashesService = __decorate([\r\n    common_1.Injectable(),\r\n    __param(0, typeorm_1.InjectRepository(user_hash_entity_1.UserHash)),\r\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository,\r\n        hash_service_1.HashService])\r\n], UserHashesService);\r\nexports.UserHashesService = UserHashesService;\r\n\n\n//# sourceURL=webpack:///./src/components/user-hashes/user-hashes.service.ts?");

/***/ }),

/***/ "./src/components/users/dto/create-user.dto.ts":
/*!*****************************************************!*\
  !*** ./src/components/users/dto/create-user.dto.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass CreateUserDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], CreateUserDto.prototype, \"firstName\", void 0);\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], CreateUserDto.prototype, \"lastName\", void 0);\r\n__decorate([\r\n    class_validator_1.IsEmail(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], CreateUserDto.prototype, \"email\", void 0);\r\n__decorate([\r\n    class_validator_1.IsString(),\r\n    class_validator_1.MinLength(6),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], CreateUserDto.prototype, \"password\", void 0);\r\nexports.CreateUserDto = CreateUserDto;\r\n\n\n//# sourceURL=webpack:///./src/components/users/dto/create-user.dto.ts?");

/***/ }),

/***/ "./src/components/users/dto/find-users-list.dto.ts":
/*!*********************************************************!*\
  !*** ./src/components/users/dto/find-users-list.dto.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nconst pagination_dto_1 = __webpack_require__(/*! ../../core/dto/pagination.dto */ \"./src/components/core/dto/pagination.dto.ts\");\r\nclass FindUsersListDto extends pagination_dto_1.PaginationDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsNumberString(),\r\n    class_validator_1.IsOptional(),\r\n    __metadata(\"design:type\", Number)\r\n], FindUsersListDto.prototype, \"ageFrom\", void 0);\r\n__decorate([\r\n    class_validator_1.IsNumberString(),\r\n    class_validator_1.IsOptional(),\r\n    __metadata(\"design:type\", Number)\r\n], FindUsersListDto.prototype, \"ageTo\", void 0);\r\n__decorate([\r\n    class_validator_1.IsBooleanString(),\r\n    class_validator_1.IsOptional(),\r\n    __metadata(\"design:type\", Boolean)\r\n], FindUsersListDto.prototype, \"onlySellers\", void 0);\r\nexports.FindUsersListDto = FindUsersListDto;\r\n\n\n//# sourceURL=webpack:///./src/components/users/dto/find-users-list.dto.ts?");

/***/ }),

/***/ "./src/components/users/dto/update-user.dto.ts":
/*!*****************************************************!*\
  !*** ./src/components/users/dto/update-user.dto.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nclass UpdateUserDto {\r\n}\r\n__decorate([\r\n    class_validator_1.IsOptional(),\r\n    class_validator_1.IsString(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], UpdateUserDto.prototype, \"firstName\", void 0);\r\n__decorate([\r\n    class_validator_1.IsOptional(),\r\n    class_validator_1.IsString(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], UpdateUserDto.prototype, \"lastName\", void 0);\r\n__decorate([\r\n    class_validator_1.IsOptional(),\r\n    class_validator_1.IsNumber(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", Number)\r\n], UpdateUserDto.prototype, \"age\", void 0);\r\n__decorate([\r\n    class_validator_1.IsOptional(),\r\n    class_validator_1.IsEmail(),\r\n    swagger_1.ApiModelProperty(),\r\n    __metadata(\"design:type\", String)\r\n], UpdateUserDto.prototype, \"email\", void 0);\r\nexports.UpdateUserDto = UpdateUserDto;\r\n\n\n//# sourceURL=webpack:///./src/components/users/dto/update-user.dto.ts?");

/***/ }),

/***/ "./src/components/users/entities/user-role.entity.ts":
/*!***********************************************************!*\
  !*** ./src/components/users/entities/user-role.entity.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(/*! reflect-metadata */ \"reflect-metadata\");\r\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst user_entity_1 = __webpack_require__(/*! ../user.entity */ \"./src/components/users/user.entity.ts\");\r\nlet UserRole = class UserRole {\r\n};\r\n__decorate([\r\n    typeorm_1.PrimaryGeneratedColumn(),\r\n    __metadata(\"design:type\", Number)\r\n], UserRole.prototype, \"id\", void 0);\r\n__decorate([\r\n    typeorm_1.OneToMany(type => user_entity_1.User, user => user.role),\r\n    __metadata(\"design:type\", user_entity_1.User)\r\n], UserRole.prototype, \"user\", void 0);\r\n__decorate([\r\n    typeorm_1.Column('varchar'),\r\n    __metadata(\"design:type\", String)\r\n], UserRole.prototype, \"name\", void 0);\r\nUserRole = __decorate([\r\n    typeorm_1.Entity()\r\n], UserRole);\r\nexports.UserRole = UserRole;\r\n\n\n//# sourceURL=webpack:///./src/components/users/entities/user-role.entity.ts?");

/***/ }),

/***/ "./src/components/users/services/users.service.ts":
/*!********************************************************!*\
  !*** ./src/components/users/services/users.service.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst user_entity_1 = __webpack_require__(/*! ../user.entity */ \"./src/components/users/user.entity.ts\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst hash_service_1 = __webpack_require__(/*! ../../core/services/hash.service */ \"./src/components/core/services/hash.service.ts\");\r\nconst roles_enum_1 = __webpack_require__(/*! ../../../helpers/enums/roles.enum */ \"./src/helpers/enums/roles.enum.ts\");\r\nconst messages_enum_1 = __webpack_require__(/*! ../../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\r\nlet UsersService = class UsersService {\r\n    constructor(usersRepository, hashService) {\r\n        this.usersRepository = usersRepository;\r\n        this.hashService = hashService;\r\n    }\r\n    findMany(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const queryBuilder = this.prepareBuilder(this.usersRepository.createQueryBuilder('user'), payload);\r\n            return yield queryBuilder.getMany();\r\n        });\r\n    }\r\n    prepareBuilder(queryBuilder, query) {\r\n        if (query.ageFrom) {\r\n            queryBuilder.where('age > :ageFrom', { ageFrom: query.ageFrom });\r\n        }\r\n        if (query.ageTo) {\r\n            queryBuilder.where('age < :ageTo', { ageTo: query.ageTo });\r\n        }\r\n        if (query.onlySellers) {\r\n            queryBuilder.where('roleId = :roleId', { roleId: roles_enum_1.Roles.BUYER });\r\n        }\r\n        return queryBuilder;\r\n    }\r\n    findManyWithPagination(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const skip = (payload.page - 1) * payload.limit;\r\n            const queryBuilder = this.prepareBuilder(this.usersRepository.createQueryBuilder('user'), payload);\r\n            const totalCount = yield queryBuilder.getCount();\r\n            const data = yield queryBuilder.skip(skip).take(payload.limit).getMany();\r\n            return {\r\n                page: payload.page,\r\n                itemsPerPage: payload.limit,\r\n                totalCount,\r\n                data,\r\n            };\r\n        });\r\n    }\r\n    findOne(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = yield this.usersRepository.findOne(id);\r\n            if (!user) {\r\n                throw new common_1.NotFoundException(messages_enum_1.Messages.USER_NOT_FOUND);\r\n            }\r\n            return user;\r\n        });\r\n    }\r\n    findOneByEmail(email, includePassword = false) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const query = this.usersRepository.createQueryBuilder('user')\r\n                .where('email = :email', { email });\r\n            if (includePassword) {\r\n                query.addSelect('user.password');\r\n            }\r\n            return yield query.getOne();\r\n        });\r\n    }\r\n    findOneByGoogleId(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.usersRepository.findOne({ googleId: id });\r\n        });\r\n    }\r\n    createOne(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const passwordHash = yield this.hashService.generateHash(payload.password);\r\n            const newUser = Object.assign({}, new user_entity_1.User(), payload, { password: passwordHash });\r\n            return yield this.usersRepository.save(newUser);\r\n        });\r\n    }\r\n    createByGoogle(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const newUser = Object.assign({}, new user_entity_1.User(), payload);\r\n            return yield this.usersRepository.save(newUser);\r\n        });\r\n    }\r\n    updateOne(id, payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.usersRepository.update({ id }, payload);\r\n            return yield this.usersRepository.findOne(id);\r\n        });\r\n    }\r\n    deleteOne(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.usersRepository.delete({ id });\r\n        });\r\n    }\r\n};\r\nUsersService = __decorate([\r\n    common_1.Injectable(),\r\n    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),\r\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository,\r\n        hash_service_1.HashService])\r\n], UsersService);\r\nexports.UsersService = UsersService;\r\n\n\n//# sourceURL=webpack:///./src/components/users/services/users.service.ts?");

/***/ }),

/***/ "./src/components/users/user.entity.ts":
/*!*********************************************!*\
  !*** ./src/components/users/user.entity.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\r\nconst user_role_entity_1 = __webpack_require__(/*! ./entities/user-role.entity */ \"./src/components/users/entities/user-role.entity.ts\");\r\nconst product_entity_1 = __webpack_require__(/*! ../products/product.entity */ \"./src/components/products/product.entity.ts\");\r\nconst base_entity_1 = __webpack_require__(/*! ../core/base.entity */ \"./src/components/core/base.entity.ts\");\r\nconst chat_entity_1 = __webpack_require__(/*! ../chats/chat.entity */ \"./src/components/chats/chat.entity.ts\");\r\nlet User = class User extends base_entity_1.BaseEntity {\r\n};\r\n__decorate([\r\n    typeorm_1.Column({ type: 'varchar' }),\r\n    __metadata(\"design:type\", String)\r\n], User.prototype, \"firstName\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ type: 'varchar' }),\r\n    __metadata(\"design:type\", String)\r\n], User.prototype, \"lastName\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ nullable: true }),\r\n    __metadata(\"design:type\", Number)\r\n], User.prototype, \"age\", void 0);\r\n__decorate([\r\n    typeorm_1.Column(),\r\n    typeorm_1.Index(),\r\n    __metadata(\"design:type\", String)\r\n], User.prototype, \"email\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ nullable: true }),\r\n    __metadata(\"design:type\", String)\r\n], User.prototype, \"password\", void 0);\r\n__decorate([\r\n    typeorm_1.ManyToOne(type => user_role_entity_1.UserRole),\r\n    typeorm_1.JoinColumn(),\r\n    __metadata(\"design:type\", user_role_entity_1.UserRole)\r\n], User.prototype, \"role\", void 0);\r\n__decorate([\r\n    typeorm_1.OneToMany(type => product_entity_1.Product, product => product.seller),\r\n    __metadata(\"design:type\", Array)\r\n], User.prototype, \"products\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ nullable: true }),\r\n    __metadata(\"design:type\", String)\r\n], User.prototype, \"googleId\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ type: 'boolean', default: false }),\r\n    __metadata(\"design:type\", Boolean)\r\n], User.prototype, \"emailVerified\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ type: 'boolean', default: false }),\r\n    __metadata(\"design:type\", Boolean)\r\n], User.prototype, \"phoneVerified\", void 0);\r\n__decorate([\r\n    typeorm_1.ManyToMany(type => chat_entity_1.Chat, chat => chat.users),\r\n    __metadata(\"design:type\", Array)\r\n], User.prototype, \"chats\", void 0);\r\n__decorate([\r\n    typeorm_1.Column({ type: 'boolean', default: false }),\r\n    __metadata(\"design:type\", Boolean)\r\n], User.prototype, \"online\", void 0);\r\nUser = __decorate([\r\n    typeorm_1.Entity()\r\n], User);\r\nexports.User = User;\r\n\n\n//# sourceURL=webpack:///./src/components/users/user.entity.ts?");

/***/ }),

/***/ "./src/components/users/users.controller.ts":
/*!**************************************************!*\
  !*** ./src/components/users/users.controller.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\r\n    return function (target, key) { decorator(target, key, paramIndex); }\r\n};\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst create_user_dto_1 = __webpack_require__(/*! ./dto/create-user.dto */ \"./src/components/users/dto/create-user.dto.ts\");\r\nconst users_service_1 = __webpack_require__(/*! ./services/users.service */ \"./src/components/users/services/users.service.ts\");\r\nconst messages_enum_1 = __webpack_require__(/*! ../../helpers/enums/messages.enum */ \"./src/helpers/enums/messages.enum.ts\");\r\nconst passport_1 = __webpack_require__(/*! @nestjs/passport */ \"@nestjs/passport\");\r\nconst find_users_list_dto_1 = __webpack_require__(/*! ./dto/find-users-list.dto */ \"./src/components/users/dto/find-users-list.dto.ts\");\r\nconst update_user_dto_1 = __webpack_require__(/*! ./dto/update-user.dto */ \"./src/components/users/dto/update-user.dto.ts\");\r\nconst user_decorator_1 = __webpack_require__(/*! ../../helpers/decorators/user.decorator */ \"./src/helpers/decorators/user.decorator.ts\");\r\nconst user_entity_1 = __webpack_require__(/*! ./user.entity */ \"./src/components/users/user.entity.ts\");\r\nlet UsersController = class UsersController {\r\n    constructor(usersService) {\r\n        this.usersService = usersService;\r\n    }\r\n    findMany(query) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            if (query.page && query.limit) {\r\n                return yield this.usersService.findManyWithPagination(query);\r\n            }\r\n            return yield this.usersService.findMany(query);\r\n        });\r\n    }\r\n    findOne(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.usersService.findOne(id);\r\n        });\r\n    }\r\n    create(payload) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            const user = yield this.usersService.findOneByEmail(payload.email);\r\n            if (user) {\r\n                throw new common_1.BadRequestException(messages_enum_1.Messages.USER_ALREADY_EXISTS);\r\n            }\r\n            return yield this.usersService.createOne(payload);\r\n        });\r\n    }\r\n    updateProfile(payload, user) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            return yield this.usersService.updateOne(user.id, payload);\r\n        });\r\n    }\r\n    deleteUser(id) {\r\n        return __awaiter(this, void 0, void 0, function* () {\r\n            yield this.usersService.deleteOne(id);\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    common_1.Get(),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    swagger_1.ApiOperation({ title: 'Fetch list of users' }),\r\n    __param(0, common_1.Query()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [find_users_list_dto_1.FindUsersListDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UsersController.prototype, \"findMany\", null);\r\n__decorate([\r\n    common_1.Get(':id'),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    swagger_1.ApiOperation({ title: 'Get particular user by id' }),\r\n    __param(0, common_1.Param('id')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Number]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UsersController.prototype, \"findOne\", null);\r\n__decorate([\r\n    common_1.Post(),\r\n    swagger_1.ApiOperation({ title: 'Creating new user' }),\r\n    __param(0, common_1.Body()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [create_user_dto_1.CreateUserDto]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UsersController.prototype, \"create\", null);\r\n__decorate([\r\n    common_1.Put('me'),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    swagger_1.ApiBearerAuth(),\r\n    swagger_1.ApiOperation({ title: 'Update your profile' }),\r\n    __param(0, common_1.Body()), __param(1, user_decorator_1.ReqUser()),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [update_user_dto_1.UpdateUserDto, user_entity_1.User]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UsersController.prototype, \"updateProfile\", null);\r\n__decorate([\r\n    common_1.Delete(':id'),\r\n    common_1.UseGuards(passport_1.AuthGuard('jwt')),\r\n    swagger_1.ApiBearerAuth(),\r\n    swagger_1.ApiOperation({ title: 'Delete user by id' }),\r\n    __param(0, common_1.Param('id')),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Number]),\r\n    __metadata(\"design:returntype\", Promise)\r\n], UsersController.prototype, \"deleteUser\", null);\r\nUsersController = __decorate([\r\n    common_1.Controller('users'),\r\n    __metadata(\"design:paramtypes\", [users_service_1.UsersService])\r\n], UsersController);\r\nexports.UsersController = UsersController;\r\n\n\n//# sourceURL=webpack:///./src/components/users/users.controller.ts?");

/***/ }),

/***/ "./src/components/users/users.module.ts":
/*!**********************************************!*\
  !*** ./src/components/users/users.module.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst core_module_1 = __webpack_require__(/*! ../core/core.module */ \"./src/components/core/core.module.ts\");\r\nconst user_role_entity_1 = __webpack_require__(/*! ./entities/user-role.entity */ \"./src/components/users/entities/user-role.entity.ts\");\r\nconst user_entity_1 = __webpack_require__(/*! ./user.entity */ \"./src/components/users/user.entity.ts\");\r\nconst users_service_1 = __webpack_require__(/*! ./services/users.service */ \"./src/components/users/services/users.service.ts\");\r\nconst users_controller_1 = __webpack_require__(/*! ./users.controller */ \"./src/components/users/users.controller.ts\");\r\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\r\nlet UsersModule = class UsersModule {\r\n};\r\nUsersModule = __decorate([\r\n    common_1.Module({\r\n        imports: [\r\n            core_module_1.CoreModule,\r\n            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, user_role_entity_1.UserRole]),\r\n        ],\r\n        exports: [users_service_1.UsersService],\r\n        controllers: [users_controller_1.UsersController],\r\n        providers: [users_service_1.UsersService],\r\n    })\r\n], UsersModule);\r\nexports.UsersModule = UsersModule;\r\n\n\n//# sourceURL=webpack:///./src/components/users/users.module.ts?");

/***/ }),

/***/ "./src/config/coludinary.config.ts":
/*!*****************************************!*\
  !*** ./src/config/coludinary.config.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst path_1 = __webpack_require__(/*! path */ \"path\");\r\nexports.CLOUDINARY_CLOUD_NAME = 'dkvyhy1hr';\r\nexports.CLOUDINARY_API_KEY = '785611567955674';\r\nexports.CLOUDINARY_API_SECRET = '0oc_djHhKTlL2mZZmeG8JyMS8v8';\r\nexports.FILES_UPLOAD_FOLDER = path_1.resolve(__dirname, '../../upload');\r\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/config/coludinary.config.ts?");

/***/ }),

/***/ "./src/config/common.config.ts":
/*!*************************************!*\
  !*** ./src/config/common.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.PASSWORD_LENGTH = 6;\r\nexports.APP_NAME = 'Astra-Store';\r\nexports.PORT = 4000;\r\n\n\n//# sourceURL=webpack:///./src/config/common.config.ts?");

/***/ }),

/***/ "./src/config/database.config.ts":
/*!***************************************!*\
  !*** ./src/config/database.config.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.DB_HOST = 'localhost';\r\nexports.DB_PORT = 5432;\r\nexports.DB_USER = 'postgres';\r\nexports.DB_PASSWORD = 'postgres';\r\nexports.DB_NAME = 'astra_store';\r\n\n\n//# sourceURL=webpack:///./src/config/database.config.ts?");

/***/ }),

/***/ "./src/config/emails.config.ts":
/*!*************************************!*\
  !*** ./src/config/emails.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst path_1 = __webpack_require__(/*! path */ \"path\");\r\nexports.SYSTEM_EMAIL = 'gogunov00@gmail.com';\r\nexports.SENDGRID_KEY = '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';\r\nexports.EMAIL_TEMPLATES_FOLDER = path_1.resolve(__dirname, '../templates');\r\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/config/emails.config.ts?");

/***/ }),

/***/ "./src/config/google.config.ts":
/*!*************************************!*\
  !*** ./src/config/google.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.GOOGLE_CLIENT_ID = '28234399443-i32gbk49djgk94jk16dghdskg9u9c3jp.apps.googleusercontent.com';\r\nexports.GOOGLE_CLIENT_SECRET = 'Q5tf2uQofbSpIeAP2Rx4gSsc';\r\nexports.GOOGLE_CALLBACK_URL = '/auth/google/callback';\r\n\n\n//# sourceURL=webpack:///./src/config/google.config.ts?");

/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nfunction __export(m) {\r\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\r\n}\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__export(__webpack_require__(/*! ./common.config */ \"./src/config/common.config.ts\"));\r\n__export(__webpack_require__(/*! ./coludinary.config */ \"./src/config/coludinary.config.ts\"));\r\n__export(__webpack_require__(/*! ./emails.config */ \"./src/config/emails.config.ts\"));\r\n__export(__webpack_require__(/*! ./database.config */ \"./src/config/database.config.ts\"));\r\n__export(__webpack_require__(/*! ./coludinary.config */ \"./src/config/coludinary.config.ts\"));\r\n__export(__webpack_require__(/*! ./jwt.config */ \"./src/config/jwt.config.ts\"));\r\n__export(__webpack_require__(/*! ./stripe.config */ \"./src/config/stripe.config.ts\"));\r\n__export(__webpack_require__(/*! ./orm.config */ \"./src/config/orm.config.ts\"));\r\n__export(__webpack_require__(/*! ./google.config */ \"./src/config/google.config.ts\"));\r\n\n\n//# sourceURL=webpack:///./src/config/index.ts?");

/***/ }),

/***/ "./src/config/jwt.config.ts":
/*!**********************************!*\
  !*** ./src/config/jwt.config.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.JWT_SECRET = 'Hello, my dear friend';\r\nexports.JWT_EXPIRES = 3600 * 24;\r\n\n\n//# sourceURL=webpack:///./src/config/jwt.config.ts?");

/***/ }),

/***/ "./src/config/orm.config.ts":
/*!**********************************!*\
  !*** ./src/config/orm.config.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(__dirname) {\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/config/index.ts\");\r\nexports.ORM_CONFIG = {\r\n    type: 'postgres',\r\n    host: index_1.DB_HOST,\r\n    port: index_1.DB_PORT,\r\n    username: index_1.DB_USER,\r\n    password: index_1.DB_PASSWORD,\r\n    database: index_1.DB_NAME,\r\n    entities: [`${__dirname}/../../**/*.entity.ts`],\r\n    logging: true,\r\n    synchronize: true,\r\n};\r\n\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./src/config/orm.config.ts?");

/***/ }),

/***/ "./src/config/stripe.config.ts":
/*!*************************************!*\
  !*** ./src/config/stripe.config.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.STRIPE_PUBLIC_KEY = 'pk_test_U3tOJR0mr9NvYz1pYjwtmi1q';\r\nexports.STRIPE_SECRET_KEY = 'sk_test_393aej0Ej9NaA7DwrE2eZqSh';\r\n\n\n//# sourceURL=webpack:///./src/config/stripe.config.ts?");

/***/ }),

/***/ "./src/helpers/card-validators/card-cvv.validator.ts":
/*!***********************************************************!*\
  !*** ./src/helpers/card-validators/card-cvv.validator.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst cardValidator = __webpack_require__(/*! card-validator */ \"card-validator\");\r\nclass CardCvvValidator {\r\n    validate(value, validationArguments) {\r\n        const { isValid } = cardValidator.cvv(value);\r\n        return isValid;\r\n    }\r\n}\r\nexports.CardCvvValidator = CardCvvValidator;\r\n\n\n//# sourceURL=webpack:///./src/helpers/card-validators/card-cvv.validator.ts?");

/***/ }),

/***/ "./src/helpers/card-validators/card-expires-in.validator.ts":
/*!******************************************************************!*\
  !*** ./src/helpers/card-validators/card-expires-in.validator.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst cardValidator = __webpack_require__(/*! card-validator */ \"card-validator\");\r\nclass CardExpiresInValidator {\r\n    validate(value, validationArguments) {\r\n        const { isValid } = cardValidator.expiresIn(value);\r\n        return isValid;\r\n    }\r\n}\r\nexports.CardExpiresInValidator = CardExpiresInValidator;\r\n\n\n//# sourceURL=webpack:///./src/helpers/card-validators/card-expires-in.validator.ts?");

/***/ }),

/***/ "./src/helpers/decorators/user.decorator.ts":
/*!**************************************************!*\
  !*** ./src/helpers/decorators/user.decorator.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nexports.ReqUser = common_1.createParamDecorator((data, req) => {\r\n    return req.user;\r\n});\r\n\n\n//# sourceURL=webpack:///./src/helpers/decorators/user.decorator.ts?");

/***/ }),

/***/ "./src/helpers/enums/email-titles.enum.ts":
/*!************************************************!*\
  !*** ./src/helpers/enums/email-titles.enum.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar EmailTitles;\r\n(function (EmailTitles) {\r\n    EmailTitles[\"RESET_PASSWORD\"] = \"Reset Password Message\";\r\n    EmailTitles[\"EMAIL_VERIFICATION\"] = \"Email Verification Message\";\r\n})(EmailTitles = exports.EmailTitles || (exports.EmailTitles = {}));\r\n\n\n//# sourceURL=webpack:///./src/helpers/enums/email-titles.enum.ts?");

/***/ }),

/***/ "./src/helpers/enums/hash-types.enum.ts":
/*!**********************************************!*\
  !*** ./src/helpers/enums/hash-types.enum.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar HashTypes;\r\n(function (HashTypes) {\r\n    HashTypes[\"EMAIL_VERIFICATION\"] = \"emailVerificationHash\";\r\n    HashTypes[\"RESET_PASSWORD\"] = \"resetPasswordHash\";\r\n})(HashTypes = exports.HashTypes || (exports.HashTypes = {}));\r\n\n\n//# sourceURL=webpack:///./src/helpers/enums/hash-types.enum.ts?");

/***/ }),

/***/ "./src/helpers/enums/messages.enum.ts":
/*!********************************************!*\
  !*** ./src/helpers/enums/messages.enum.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Messages;\r\n(function (Messages) {\r\n    Messages[\"USER_ALREADY_EXISTS\"] = \"User already exists\";\r\n    Messages[\"USER_NOT_FOUND\"] = \"User doesn't exists\";\r\n    Messages[\"INVALID_TOKEN\"] = \"Invalid access token\";\r\n    Messages[\"INVALID_PASSWORD\"] = \"Invalid password\";\r\n    Messages[\"REFRESH_TOKEN_NOT_FOUND\"] = \"Refresh token not found\";\r\n    Messages[\"FAILED_GOOGLE_AUTH\"] = \"Failed to login by google\";\r\n    Messages[\"FILE_NOT_FOUND\"] = \"File is not found\";\r\n    Messages[\"PRODUCT_NOT_FOUND\"] = \"Product not found\";\r\n    Messages[\"INVALID_RIGHTS_TO_DELETE_COMMENT\"] = \"Only owner of product can remove comments\";\r\n    Messages[\"EMAIL_VERIFICATION_HASH_NOT_FOUND\"] = \"Email verification not found\";\r\n    Messages[\"CHAT_NOT_FOUND\"] = \"Chat not found\";\r\n    Messages[\"AUTH_TOKEN_NOT_FOUND\"] = \"Authorization token not found\";\r\n})(Messages = exports.Messages || (exports.Messages = {}));\r\n\n\n//# sourceURL=webpack:///./src/helpers/enums/messages.enum.ts?");

/***/ }),

/***/ "./src/helpers/enums/roles.enum.ts":
/*!*****************************************!*\
  !*** ./src/helpers/enums/roles.enum.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar Roles;\r\n(function (Roles) {\r\n    Roles[Roles[\"BUYER\"] = 1] = \"BUYER\";\r\n    Roles[Roles[\"SELLER\"] = 2] = \"SELLER\";\r\n    Roles[Roles[\"ADMIN\"] = 3] = \"ADMIN\";\r\n})(Roles = exports.Roles || (exports.Roles = {}));\r\n\n\n//# sourceURL=webpack:///./src/helpers/enums/roles.enum.ts?");

/***/ }),

/***/ "./src/helpers/enums/template-types.enum.ts":
/*!**************************************************!*\
  !*** ./src/helpers/enums/template-types.enum.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar TemplateTypes;\r\n(function (TemplateTypes) {\r\n    TemplateTypes[\"EMAIL_VERIFICATION\"] = \"emailVerificationTemplate\";\r\n    TemplateTypes[\"RESET_PASSWORD\"] = \"resetPasswordTemplate\";\r\n})(TemplateTypes = exports.TemplateTypes || (exports.TemplateTypes = {}));\r\n\n\n//# sourceURL=webpack:///./src/helpers/enums/template-types.enum.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst core_1 = __webpack_require__(/*! @nestjs/core */ \"@nestjs/core\");\r\nconst app_module_1 = __webpack_require__(/*! ./app.module */ \"./src/app.module.ts\");\r\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\r\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\r\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/config/index.ts\");\r\nfunction bootstrap() {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const app = yield core_1.NestFactory.create(app_module_1.AppModule);\r\n        app.useGlobalPipes(new common_1.ValidationPipe());\r\n        const options = new swagger_1.DocumentBuilder()\r\n            .setTitle('Astra-store')\r\n            .setDescription('Platform for selling and buying products online')\r\n            .setVersion('0.1.0')\r\n            .addTag('Sales')\r\n            .build();\r\n        const document = swagger_1.SwaggerModule.createDocument(app, options);\r\n        swagger_1.SwaggerModule.setup('api', app, document);\r\n        yield app.listen(config_1.PORT);\r\n        if (true) {\r\n            module.hot.accept();\r\n            module.hot.dispose(() => app.close());\r\n        }\r\n    });\r\n}\r\nbootstrap();\r\n\n\n//# sourceURL=webpack:///./src/main.ts?");

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