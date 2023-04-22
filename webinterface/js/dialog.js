/*DIALOGS

- record (delete)
- twitch (renotify, delete)
- twitter (delete)
- reddit (delete)
- customcommands (delete, delete all)
- moderation (autoaction, auto moderator)
- backups (delete, delete all, interval backups, publish, backup preview, create)
- templates (delete, report)

*/


var head = document.getElementsByTagName('HEAD')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';  
link.type = 'text/css';
link.href = 'js/css/dialog.css';  
head.appendChild(link);

var globalSettings = {};

function getGlobalSettings(){
	return globalSettings;
}

class Dialog{
	dialogOuter;
	dialogInner;

	constructor(){
		let dialogOuter = document.createElement("div");
		dialogOuter.classList.add("dialog-background");
		this.dialogOuter = dialogOuter;

		let dialogInner = document.createElement("div");
		dialogInner.classList.add("dialog-foreground");
		this.dialogInner = dialogInner;
		dialogOuter.appendChild(dialogInner);

		document.body.appendChild(dialogOuter);
	}

	addHeader(header){
		if(!header instanceof DialogHeader) throw new Error("Header must be of type " + DialogHeader.name);

		this.dialogInner.appendChild(header.build());
		
		return this;
	}

	addField(field){
		if(!field instanceof DialogField) throw new Error("Field must be of type " + DialogField.name);

		this.dialogInner.appendChild(field.build());

		return this;
	}

	addFieldAtIndex(field, idx){
		if(!field instanceof DialogField) throw new Error("Field must be of type " + DialogField.name);

		this.dialogInner.insertBefore(field.build(), this.dialogInner.children[idx]);

		return this;
	}

	getFields(){
		return Array.from(this.dialogInner.children);
	}

	removeFieldByID(id){
		let fields = this.dialogInner.getElementsByClassName("dialog-field");
		let filteredField = Array.from(fields).find(f => f.id == id);

		filteredField.remove();

		return this;
	}

	removeFields(skip, end){
		let fields = this.dialogInner.getElementsByClassName("dialog-field");
		Array.from(fields).splice(skip, end).forEach(field => field.remove());
	}

	changeFieldIndexByID(id, idx){
		let fields = this.dialogInner.getElementsByClassName("dialog-field");
		let field = Array.from(fields).find(f => f.id == id);
		if(field == null) throw new Error("Field doesnt exist. Check ID");
		field.parentNode.insertBefore(field, fields[idx]);
		return this;
	}

	close(){
		let dialogs = document.getElementsByClassName("dialog-background");
		Array.from(dialogs).forEach(d => d.remove());
		return this;
	}

	changeDialog(newDialog){
		newDialog.dialogOuter.remove();
		this.dialogOuter.replaceChild(newDialog.dialogInner, this.dialogInner);
		return this;
	}

	reloadSettingsDescriptors(settings, onChange, skip){
		let descriptors = settings.getSettingDescriptors().slice();
        globalSettings = settings;

		if(skip != null) this.removeFields(skip);

		for(let descriptor of descriptors){
			let f = getDialogDescriptorField(descriptor, value => {
				if(descriptor.getType() == SettingType.MAP){
					Object.assign(globalSettings[descriptor.getName()], value);
				}else if(descriptor.getType() == SettingType.LIST){
					globalSettings[descriptor.getName()] = value.slice();
				}else{
					globalSettings[descriptor.getName()] = value;
				}
				onChange();
			});
			this.addField(f);
		}
		return this;
	}

	fromSettings(settings, onChange){
		this.reloadSettingsDescriptors(settings, onChange);
		return this;
	}

	asMap(descriptor, callback){
		let tmpEntry = {};

		let keyField = getDialogDescriptorField(descriptor.getKeyDescriptor(), key => tmpEntry.key = key);
		this.addField(keyField);

		let valueField = getDialogDescriptorField(descriptor.getValueDescriptor(), value => {
			tmpEntry.value = (descriptor.getValueDescriptor().getType() == SettingType.COLOR ? hexToDecimal(value) : value);
		});
		this.addField(valueField);

		let add = new UIButton("Add");
		add.setStyle("background-color: var(--green);");
		add.onInteract(() => {
			if(tmpEntry.key == null){
				showAlert("Invalid key", true);
				return;
			}

			if(tmpEntry.value == null){
				showAlert("Invalid value", true);
				return;
			}

			this.close();

			let fEntry = {};
			if(tmpEntry.key.getClass().isEnum()) tmpEntry.key = tmpEntry.key.name();
			fEntry[tmpEntry.key.toString()] = tmpEntry.value;

			callback(fEntry);
		});

		let cancel = new UIButton("Cancel");
		cancel.setStyle("background-color: rgba(255, 255, 255, 0.1);");
		cancel.onInteract(() => this.close());

		this.addField(new DialogEmptyField()
			.addUIElement(add)
			.addUIElement(cancel)
			.setStyle("flex-direction: row;"));
	}

}

class DialogHeader{
	header;
	headerTextContent;
	headerActions;
	actionClose;

	constructor(){
		let header = document.createElement("div");
		header.classList.add("dialog-header");
		this.header = header;

		let headerTextContent = document.createElement("div");
		headerTextContent.classList.add("dialog-header-text");
		this.headerTextContent = headerTextContent;
		header.appendChild(headerTextContent);

		let headerActions = document.createElement("div");
		headerActions.classList.add("dialog-header-actions");
		this.headerActions = headerActions;
		header.appendChild(headerActions);

		let actionClose = document.createElement("a");
		actionClose.classList.add("dialog-close");
		actionClose.text = "✖";
		actionClose.addEventListener('click', () => {
			let dialogs = document.getElementsByClassName("dialog-background");
			Array.from(dialogs).forEach(d => d.remove());
		});
		this.actionClose = actionClose;
		headerActions.appendChild(actionClose);

		return this;
	}

	setTitle(title){
		if(title == null) throw new Error("Title == null");

		let el = document.createElement("a");
		el.classList.add("dialog-header-text-title");
		el.text = title;
		this.headerTextContent.appendChild(el);

		return this;
	}

	setSubtitle(subtitle){
		if(subtitle == null) throw new Error("Subtitle == null");

		let el = document.createElement("a");
		el.classList.add("dialog-header-text-subtitle");
		el.innerText = subtitle
		this.headerTextContent.appendChild(el);

		return this;
	}

	setStyle(css){
		this.header.style = css;
		return this;
	}

	build(){
		return this.header;
	}
}

class DialogField{
	field;
	fieldHeader;
	fieldHeaderText;
	fieldBody;

	constructor(){
		let field = document.createElement("div");
		field.classList.add("dialog-field");

		let fieldHeader = document.createElement("div");
		fieldHeader.classList.add("dialog-field-header");
		this.fieldHeader = fieldHeader;
		field.appendChild(fieldHeader);

		let fieldHeaderText = document.createElement("div");
		fieldHeaderText.classList.add("field-header-text");
		this.fieldHeaderText = fieldHeaderText;
		fieldHeader.appendChild(fieldHeaderText);

		let foldField = document.createElement("img");
		foldField.src = "/img/arrow.svg";
		fieldHeader.appendChild(foldField);

		let fieldBody = document.createElement("div");
		fieldBody.classList.add("dialog-field-body");
		this.fieldBody = fieldBody;
		field.appendChild(fieldBody);

		foldField.addEventListener('click', () => {
			fieldBody.classList.toggle("folded");
			foldField.classList.toggle("down");
		});

		this.field = field;

		return this;
	}

	setTitle(title){
		if(title == null) throw new Error("Title == null");

		let el = document.createElement("a");
		el.classList.add("field-header-title");
		el.text = title;
		this.fieldHeaderText.appendChild(el);

		return this;
	}

	setSubtitle(subtitle){
		if(subtitle == null) throw new Error("Subtitle == null");

		let el = document.createElement("a");
		el.classList.add("field-header-subtitle");
		el.text = subtitle;
		this.fieldHeaderText.appendChild(el);

		return this;
	}

	replaceField(newField){
		this.field.parentElement.replaceChild(newField.build(), this.field);
		return this;
	}

	setFieldID(id){
		this.field.id = id;
		return this;
	}

	addElement(el){
		let fieldBody = this.fieldBody;

		fieldBody.appendChild(el);

		return this;
	}

	addUIElement(el){
		let fieldBody = this.fieldBody;

		fieldBody.appendChild(el.build());

		return this;
	}

	purgeFieldElements(skip){
		Array.from(this.fieldBody.children).splice(skip).forEach(f => f.remove());
		return this;
	}

	setStyle(style){
		this.fieldBody.style = style;
		return this;
	}

	build(){
		return this.field;
	}
}

class DialogEmptyField{
	field;
	fieldBody;

	constructor(){
		let field = document.createElement("div");
		field.classList.add("dialog-field");

		let fieldBody = document.createElement("div");
		fieldBody.classList.add("dialog-field-body");
		fieldBody.classList.add("no-header");
		this.fieldBody = fieldBody;
		field.appendChild(fieldBody);

		this.field = field;

		return this;
	}

	setFieldID(id){
		this.field.id = id;
		return this;
	}

	addElement(el){
		let fieldBody = this.fieldBody;

		fieldBody.appendChild(el);

		return this;
	}

	addUIElement(el){
		let fieldBody = this.fieldBody;

		fieldBody.appendChild(el.build());

		return this;
	}

	setStyle(style){
		this.fieldBody.style = style;
		return this;
	}

	build(){
		return this.field;
	}
}

function getDialogDescriptorField(descriptor, callback){
	let f = new DialogField();
	f.setTitle(descriptor.getFriendlyName());
	let value = globalSettings[descriptor.getName()];
	switch(descriptor.getType()){
		case SettingType.STRING:
			let string = new UIInput();
			if(value != null) string.setValue(value);
			string.onChange(() => callback(string.getValue()));
			f.addUIElement(string);
			break;
		case SettingType.INTEGER:
			let integer = new UIInput();
			integer.setAttribute("maxlength", 3)
			integer.setRegexInputFilter(/^.{0,256}$/);
			if(value != null) integer.setValue(value);
			integer.onChange(() => callback(integer.value));
			f.addUIElement(integer);
			break;
		case SettingType.BOOLEAN:
			let boolean = new UIDropdown();
			boolean.addBooleans(() => callback(c.getAttribute("value") === "true"));
			boolean.selectFirst((el) => callback(el.getAttribute("value") === "true"));
			if(value != null) boolean.findElementByAttribute("value", value.toString());
			f.addUIElement(boolean);
			break;
		case SettingType.DOUBLE:
			let double = new UIInput();
			if(value != null) double.setValue(value);
			double.setAttribute("maxlength", 3)
			double.onChange(() => callback(parseFloat(double.getValue())));
			f.addUIElement(double);
			break;
		case SettingType.COLOR:
			let picker = new UIColorPicker();
			if(value != null) picker.setValue(value);
			picker.onInteract(() => callback(picker.getValue()));
			f.addUIElement(picker);
			break;
		case SettingType.ROLE:
			let role = new UIDropdown();
			role.addRoles((role) => callback(role.getID()));
			role.selectFirst((el) => callback(el.getAttribute("value")));
			if(value != null) role.findElementByAttribute("value", value);
			f.addUIElement(role);
			break;
		case SettingType.MEMBER:
			let member = new UIDropdown();
			member.addMembers((member) => callback(member.getID()));
			member.selectFirst((el) => callback(el.getAttribute("value")));
			if(value != null) member.findElementByAttribute("value", value);
			f.addUIElement(member);
			break;
		case SettingType.TEXT_CHANNEL:
			let textchannel = new UIDropdown();
			textchannel.addMembers((textchannel) => callback(textchannel.getID()));
			textchannel.selectFirst((el) => callback(el.getAttribute("value")));
			if(value != null) textchhannel.findElementByAttribute("value", value);
			f.addUIElement(textchannel);
			break;
		case SettingType.VOICE_CHANNEL:
			let voicechannel = new UIDropdown();
			voicechannel.addMembers((voicechannel) => callback(voicechannel.getID()));
			voicechannel.selectFirst((el) => callback(el.getAttribute("value")));
			if(value != null) voicechannel.findElementByAttribute("value", value);
			f.addUIElement(voicechannel);
			break;
		case SettingType.CATEGORY:
			let category = new UIDropdown();
			category.addMembers((category) => callback(category.getID()));
			category.selectFirst((el) => callback(el.getAttribute("value")));
			if(value != null) category.findElementByAttribute("value", value);
			f.addUIElement(category);
			break;
		case SettingType.MAP:
			let tmpMap = (value != null ? value : {});
			let addEl = document.createElement("a");
			addEl.id = "dynamic-site-add-something"
			addEl.text = "+";
			addEl.addEventListener('click', () => {
				let d = new Dialog();
				d.addHeader(new DialogHeader()
					.setTitle("Change element color"));
				d.asMap(descriptor, mapEntry => {
					f.purgeFieldElements(1);
					Object.assign(tmpMap, mapEntry);
					Object.entries(tmpMap).forEach(entry => {
						let e = document.createElement("a");
						e.classList.add("dynamic-site-map-entry");
						e.text = entry[0].replaceAll("_", " ").toLowerCase();
						e.style.borderRight = "3px solid " + getHexColor(entry[1]);

						let delImg = document.createElement("img");
						delImg.addEventListener('click', () => {
							delete tmpMap[entry[0]];
							e.remove();
							callback(tmpMap);
						});
						delImg.setAttribute("alt", "Delete");
						delImg.setAttribute("src", "../img/trash.svg");
						e.appendChild(delImg);

						f.addElement(e);
					});
					callback(tmpMap);
				});
			});
			f.addElement(addEl);

			
			Object.entries(value).forEach(entry => {
				let e = document.createElement("a");
				e.classList.add("dynamic-site-map-entry");
				e.text = entry[0].replaceAll("_", " ").toLowerCase();
				e.style.borderRight = "3px solid " + getHexColor(entry[1]);

				let delImg = document.createElement("img");
				delImg.addEventListener('click', () => {
					delete tmpMap[entry[0]];
					e.remove();
					callback(tmpMap);
				});
				delImg.setAttribute("alt", "Delete");
				delImg.setAttribute("src", "../img/trash.svg");
				e.appendChild(delImg);

				f.addElement(e);
			});
			break;
		case SettingType.LIST:
			let list = new UIListSelector();

			if(descriptor.getValueDescriptor().getEnumName() != null){
				let tmpList = (value != null ? value : []);

				value.forEach(e => {
					list.addListElement(new UIListSelectorElement()
						.addText(e.name().replaceAll("_", " ").toLowerCase())
						.onRemove(() => {
							tmpList.splice(tmpList.indexOf(e), 1);
							callback(tmpList);
						}));
				});

				window[descriptor.getValueDescriptor().getEnumName()].values().forEach(e => {
					let name = e.name().replaceAll("_", " ").toLowerCase();
					let el = new UIListSelectorAddableElement();
					el.addText(name);
					el.setAttribute("value", e.name());
					el.onInteract(() => {
						tmpList.push(e);
						list.addListElement(new UIListSelectorElement()
							.addText(name)
							.onRemove(() => {
								tmpList.splice(tmpList.indexOf(e), 1);
								callback(tmpList);
							}));
						callback(tmpList);
					});
					list.addAddableElement(el);
				});

				f.addUIElement(list);
			}
			break;
		case SettingType.ENUM:
			let en = new UIDropdown();
			let eClass = window[descriptor.getEnumName()];
			eClass.values().forEach(e => {
				let name = e.name().replaceAll("_", " ").toLowerCase();
				let el = new UIDropdownElement();
				el.addText(name);
				el.setAttribute("value", e.name());
				el.onInteract(() => callback(eClass.valueOf(e.name())));
				en.addUIElement(el);
			});
			en.selectFirst((el) => callback(eClass.valueOf(el.getAttribute("value"))));
			if(globalSettings[descriptor.getName()] != null) {
				en.findElementByAttribute("value", globalSettings[descriptor.getName()].name());
			}
			f.addUIElement(en);
			break;
	}
	return f;
}