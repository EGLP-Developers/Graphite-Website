var graphiteURL = window.location.protocol + "//" + window.location.hostname;
var websocketURL = window.location.protocol.replace("http", "ws") + "//" + window.location.hostname + "/ws";

class Packet {

	constructor(id, referrerID, success, botIdentifier, guildID, requestMethod, data, errorMessage) {
		this.id = id;
		this.referrerID = referrerID;
		this.success = success;
		this.botIdentifier = botIdentifier;
		this.guildID = guildID;
		this.requestMethod = requestMethod;
		this.data = data;
		this.errorMessage = errorMessage;
	}

	getID() {
		return this.id;
	}

	getReferrerID() {
		return this.referrerID;
	}

	isSuccess() {
		return this.success;
	}

	getBotIdentifier() {
		return this.botIdentifier;
	}

	getGuildID() {
		return this.guildID;
	}

	getRequestMethod() {
		return this.requestMethod;
	}

	getData() {
		return this.data;
	}

	getErrorMessage() {
		return this.errorMessage;
	}

	serialize() {
		return JSON.stringify(this);
	}

	static deserialize(rawPacket) {
		return new Packet(rawPacket.id, rawPacket.referrerID, rawPacket.success, rawPacket.botIdentifier, rawPacket.guildID, rawPacket.requestMethod, Webinterface.deserializeObject(rawPacket.data), rawPacket.errorMessage);
	}

	static of(botIdentifier, guildID, requestMethod, data) {
		return new Packet(Packet.randomID(), null, true, botIdentifier, guildID, requestMethod, data, null);
	}

	static randomID() {
		return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
	}

}

class Webinterface {

	static isLoggedIn(){
		let sessionID = window.localStorage.getItem("sessionID");
		return sessionID != null;
	}

	static logout(redirect = true){
		let sessionID = window.localStorage.getItem("sessionID");
		if(sessionID != null) window.localStorage.removeItem("sessionID");
		if(redirect) location.href = "/";
	}

	static init() {
		Webinterface.packetQueue = [];

		let init = false;
		return new Promise((resolve, reject) => {
			Webinterface.webSocket = new WebSocket(websocketURL);

			Webinterface.webSocket.onerror = function(event) {
				reject(event);
				return;
			}

			Webinterface.webSocket.onclose = function(event) {
				if(event.code == 1006) {
					// Abnormal closure, assume the bot has crashed/forcefully gone offline
					Webinterface.logout(false);
					window.location.replace("/offline?msg=Lost connection to the bot, please try again in a few minutes (1)");
					return;
				}else if(event.code == 1008) {
					// Policy violation, something has gone wrong
					Webinterface.logout(false);
					window.location.replace("/offline?msg=An unknown error occurred, try again in a few minutes (3)");
					return;
				}
				return;
			}

			Webinterface.webSocket.addEventListener("message", event => {
				let packet = Packet.deserialize(JSON.parse(event.data));
				if(!Webinterface.initialized) {
					// Packet can only be the "init" packet
					let data = packet.getData();
					for(let d of data.descriptors) {
						Webinterface.deserializeClassDescriptor(d);
					}
					Webinterface.initialized = true;

					for(let d of data.descriptors) {
						Webinterface.postDeserializeClassDescriptor(d);
					}

					resolve();
					return;
				}

				if(packet.getReferrerID() != null) {
					for(let idx in Webinterface.packetQueue) {
						let p = Webinterface.packetQueue[idx];
						if(p.packet.getID() == packet.getReferrerID()) {
							p.resolve(packet);
							Webinterface.packetQueue.splice(idx, 1);
							return;
						}
					}
				}

				if(packet.getRequestMethod() == "disconnect") {
					// Bot is shutting down
					Webinterface.logout(false);
					let msg = "Lost connection to the bot, please try again in a few minutes (2)";
					window.location.replace("/offline?msg=" + msg);
					return;
				}

				if(packet.getRequestMethod() == "broadcast") {
					alert(packet.getData().message);
					return;
				}

				for(let handlerName in Webinterface.customHandlers) {
					if(packet.getRequestMethod() == handlerName) {
						Webinterface.customHandlers[handlerName](packet);
					}
				}
			});
		})
	}

	static sendPacket(packet) {
		return new Promise((resolve) => {
			Webinterface.packetQueue.push({packet: packet, resolve: resolve});
			Webinterface.webSocket.send(packet.serialize());
		});
	}

	static registerCustomHandler(handlerName, callback) {
		Webinterface.customHandlers[handlerName] = callback;
	}

	static getSelectedGuildID() {
		let params = new URLSearchParams(window.location.search);
		return params.get("server");
	}

	static deserializeObject(obj) {
		if(!Webinterface.initialized) return obj;
		if(obj === null || obj !== Object(obj) || typeof obj == "function") return obj;
		if(obj instanceof Array) {
			for(let i = 0; i < obj.length; i++) {
				obj[i] = Webinterface.deserializeObject(obj[i]);
			}
		}
		if(obj._jsClass != null) {
			let objClass = obj._jsClass;
			let cls = window[objClass];
			if(cls.descriptor.is_enum) {
				return cls.valueOf(obj.enum_value);
			}
			obj.__proto__ = cls.prototype;
		}
		for(let key in obj) {
			obj[key] = Webinterface.deserializeObject(obj[key]);
		}
		return obj;
	}

	static setDefaultBot(botIdentifier) {
		Webinterface.defaultBot = botIdentifier;
	}

	static getDefaultBot() {
		return Webinterface.defaultBot;
	}

	static createMethod(desc, methodName, method, isStatic) {
		switch(method.type) {
			case "calling":
				let func = function() {
					let self = this;
					let fArgs = arguments;
					let p = new Promise(async function(resolve, reject) {
						if(fArgs.length != method.params.length) throw "Invalid amount of args given. Got " + fArgs.length + ", need " + method.params.length;
						let dat = {};
						for(let i = 0; i < method.params.length; i++) {
							let param = method.params[i];
							// dat[param.name] = Webinterface.formatType(fArgs[i]);
							dat[param.name] = fArgs[i];
						}
						if(!isStatic) {
							for(let param of method.calling_params) {
								dat[param] = self[param] == null ? null : self[param];
							}
						}

						let packet = Packet.of(Webinterface.getDefaultBot(), method.with_guild ? Webinterface.getSelectedGuildID() : null, method.calling, dat);
						let response = await Webinterface.sendPacket(packet);
						if(!response.isSuccess()) {
							showAlert(response.getErrorMessage(), true);
							
							//let error = "Got error \"" + response.getErrorMessage() + "\" for method " + desc.name + "." + methodName + " (calling " + method.calling + ")";
							//reject(error);
							return;
						}
						let res = response.getData();
						for(let ret of method.returning) {
							res = res[ret];
						}
						resolve(Webinterface.deserializeObject(res));
					});
					return p;
				};
				if(isStatic) {
					window[desc.name][methodName] = func;
				}else {
					window[desc.name].prototype[methodName] = func;
				}
				break;
			case "getter":
				window[desc.name].prototype[methodName] = function() {
					return this[method.value];
				}
				break;
			case "setter":
				window[desc.name].prototype[methodName] = function(val) {
					this[method.value] = val;
				}
				break;
		}
	}

	static deserializeClassDescriptor(desc) {
		window[desc.name] = function() {
			this._jsClass = desc.name;
		};

		window[desc.name].descriptor = desc;
		window[desc.name].prototype.getClass = function() {return window[desc.name];};
		window[desc.name].isEnum = function() {
			return desc.is_enum;
		}

		window[desc.name].cast = function(obj) {
			obj.__proto__ = window[desc.name].prototype;
			obj._jsClass = desc.name;
			if(desc.is_enum && obj instanceof String) {
				return window[desc.name].values()[obj];
			}
			return obj;
		};

		window[desc.name].newInstance = function() {
			return window[desc.name].cast({});
		};

		for(let methodName in desc.instance_methods) {
			let method = desc.instance_methods[methodName];
			Webinterface.createMethod(desc, methodName, method, false);
		}

		for(let methodName in desc.static_methods) {
			let method = desc.static_methods[methodName];
			Webinterface.createMethod(desc, methodName, method, true);
		}

		if(desc.is_enum) {
			window[desc.name].values = function() {return values;};
			window[desc.name].valueOf = function(valName) {return window[desc.name][valName];};

			let values = [];
			for(let val in desc.enum_values) {
				let value = window[desc.name].cast(desc.enum_values[val]);
				value.name = function() {return val;};
				value.enum_value = val;
				let ordinal = values.length;
				value.ordinal = function() {return ordinal;};
				values.push(value);
				window[desc.name][val] = value;
			}
		}

		return window[desc.name];
	}

	static postDeserializeClassDescriptor(desc) {
		if(desc.is_enum) {
			for(let enumValue of window[desc.name].values()) {
				for(let f in enumValue) {
					enumValue[f] = Webinterface.deserializeObject(enumValue[f]);
				}
			}
		}
	}

}

function finished0(restoreSession, loginCode, onFinished, redirectURL) {
	if(redirectURL == null) redirectURL = "/webinterface";
	Webinterface.customHandlers = {};

	if(window.done) { // Webinterface-Stuff ist schon geladen
		Webinterface.sendPacket(Packet.of(null, Webinterface.getSelectedGuildID(), "updateSelectedGuild", null));
		if(onFinished != null) onFinished();
		return;
	}

	// Webinterface-Stuff muss geladen werden
	window.done = true;
	(async() => {
		await Webinterface.init(); // Connect and initialize classes

		if(restoreSession) {
			let sessionID = window.localStorage.getItem("sessionID");
			if(sessionID == null) {
				window.location.href = "/login?redirect=" + encodeURIComponent(redirectURL);
				return;
			}

			let response = await Webinterface.sendPacket(Packet.of(null, null, "setSession", {sessionID: sessionID}));
			if(!response.isSuccess()) {
				alert(response.getErrorMessage());
				return;
			}

			if(!response.getData().sessionValid) {
				window.localStorage.removeItem("sessionID");
				window.location.href = "/login?redirect=" + encodeURIComponent(redirectURL);
				return;
			}
		}else {
			let response = await Webinterface.sendPacket(Packet.of(null, null, "login", {code: loginCode}));
			if(!response.isSuccess()) {
				alert(response.getErrorMessage());
				return;
			}

			window.localStorage.setItem("sessionID", response.getData().sessionID);
			window.location.href = redirectURL;
		}

		if(onFinished != null) {
			Webinterface.sendPacket(Packet.of(null, Webinterface.getSelectedGuildID(), "updateSelectedGuild", null));
			setTimeout(onFinished, 100);
		}
	})();
}

function finished(onFinished, redirectURL) {
	finished0(true, null, onFinished, redirectURL);
}
