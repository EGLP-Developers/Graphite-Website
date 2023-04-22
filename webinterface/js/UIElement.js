var head = document.getElementsByTagName('HEAD')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';  
link.type = 'text/css';
link.href = 'js/css/ui-element.css';  
head.appendChild(link);

class UIInput{
    input;

    constructor(){
        let input = document.createElement("input");
        input.type = "text";
        input.classList.add("ui-input");

        this.input = input;
    }

    setPlaceholder(text){
        this.input.placeholder = text;
        return this;
    }

    setStyle(css){
        this.input.style = css;
        return this;
    }

    setID(id){
        this.input.id = id;
        return this;
    }

    setAttribute(attr, value){
        this.input.setAttribute(attr, value);
        return this;
    }

    setValue(val){
        this.input.value = val;
        return this;
    }

    getValue(){
        return this.input.value;
    }

    setRegexInputFilter(regex){
        setRegexInputFilter(this.input, regex)
    }

    onChange(callback){
        this.input.addEventListener('change', () => callback(this.input));
        return this;
    }

    onKeyUp(callback){
        this.input.addEventListener('keyup', () => callback(this.input));
    }

    onEnter(callback){
        this.input.addEventListener('keyup', (event) => {
            if(event.keyCode === 13){
                event.preventDefault();
                if(this.input.value == "") return;
                callback();
                this.input.value = "";
            }
        });
        return this;
    }

    build(){
        return this.input;
    }
}

class UIEmptyElement{
    element;

    constructor(){
        let element = document.createElement("div");
        element.classList.add("ui-empty-element");

        this.element = element;
    }

    setStyle(css){
        this.element.style = css;
        return this;
    }

    setID(id){
        this.element.id = id;
        return this;
    }

    build(){
        return this.element;
    }
}

class UINote{
    note;

    constructor(title, text){
        let note = document.createElement("div");
        note.classList.add("ui-note");

        if(title != null){
            let noteTitle = document.createElement("a");
            noteTitle.classList.add("ui-note-title");
            noteTitle.text = title;
            note.appendChild(noteTitle);
        }

        if(text != null){
            let noteText = document.createElement("a");
            noteText.classList.add("ui-note-text");
            noteText.text = text;
            note.appendChild(noteText);
        }

        this.note = note;
    }

    hide(){
        $(this.note).hide();
        return this;
    }

    show(){
        $(this.note).show();
        return this;
    }

    setStyle(css){
        this.note.style = css;
        return this;
    }

    red(){
        this.note.style = "background-color: rgba(191, 56, 56, .1); border: 1px solid rgba(191, 56, 56, .7); color: rgba(191, 56, 56, .7);";
        return this;
    }

    build(){
        return this.note;
    }
}

class UIButton{
    button;

    constructor(text){
        let button = document.createElement("button");
        button.classList.add("ui-button");
        button.innerText = text;

        this.button = button;
    }

    setText(text){
        this.button.innerText = text;
        return this;
    }

    setStyle(css){
        this.button.style = css;
        return this;
    }

    setID(id){
        this.button.id = id;
        return this;
    }

    setAttribute(attr, value){
        this.button.setAttribute(attr, value);
        return this;
    }

    removeAttribute(attr){
        this.button.removeAttribute(attr);
        return this;
    }

    onInteract(callback){
        this.button.addEventListener('click', callback);
        return this;
    }

    build(){
        return this.button;
    }
}

class UICheckbox{
    switch;

    constructor(){
        let mSwitch = document.createElement("label");
        mSwitch.classList.add("ui-switch");

        let mSwitchInp = document.createElement("input");
        mSwitchInp.setAttribute("type", "checkbox");
        mSwitchInp.classList.add("ui-checkbox");
        mSwitch.appendChild(mSwitchInp);

        let mSwitchSpan = document.createElement("span");
        mSwitchSpan.classList.add("ui-toggle-thumb");
        mSwitch.appendChild(mSwitchSpan);

        let mSwitchSVG_1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        mSwitchSVG_1.setAttribute("width", "36");
        mSwitchSVG_1.setAttribute("height", "36");
        mSwitchSVG_1.setAttribute("viewBox", "0 0 24 24");
        mSwitchSVG_1.setAttribute("style", "fill:#4ADE80;transform:;-ms-filter:");
        mSwitchSpan.appendChild(mSwitchSVG_1);

        let mSwitchSVG_1_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        mSwitchSVG_1_path.setAttribute("d", "M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z");
        mSwitchSVG_1.appendChild(mSwitchSVG_1_path);

        let mSwitchSVG_2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        mSwitchSVG_2.setAttribute("width", "36");
        mSwitchSVG_2.setAttribute("height", "36");
        mSwitchSVG_2.setAttribute("viewBox", "0 0 24 24");
        mSwitchSVG_2.setAttribute("style", "fill:#F87171;transform:;-ms-filter:");
        mSwitchSpan.appendChild(mSwitchSVG_2);

        let mSwitchSVG_2_path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        mSwitchSVG_2_path.setAttribute("d", "M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z");
        mSwitchSVG_2.appendChild(mSwitchSVG_2_path);

        this.switch = mSwitch;
    }

    setID(id){
        this.switch.id = id;
        return this;
    }

    setAttribute(attr, value){
        this.switch.firstChild.setAttribute(attr, value);
        return this;
    }

    getAttribute(attr){
        return this.switch.firstChild.getAttribute(attr);
    }

    getCheckboxInput(){
        return this.switch.firstChild;
    }

    setStyle(css){
        this.switch.style = css;
        return this;
    }

    onInteract(callback){
        this.switch.firstChild.addEventListener('click', () => callback(this.switch.firstChild));
        return this;
    }

    build(){
        return this.switch;
    }
}

class UICheckboxWithText{
    checkboxContainer;
    checkbox;
    input;

    constructor(){
        let checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("ui-checkbox-with-text");
        this.checkboxContainer = checkboxContainer;

        let checkbox = new UICheckbox();
        this.checkbox = checkbox;
        checkboxContainer.appendChild(checkbox.build());
    }

    setText(text){
        let checkboxText = document.createElement("a");
        checkboxText.classList.add("ui-checkbox-with-text-text");
        checkboxText.text = text;
        this.checkboxContainer.appendChild(checkboxText);
        return this;
    }

    setID(id){
        this.checkbox.setID(id);
        return this;
    }

    setAttribute(attr, value){
        this.checkbox.setAttribute(attr, value);
        return this;
    }

    getAttribute(attr){
        return this.checkbox.getAttribute(attr);
    }

    getCheckbox(){
        return this.checkbox;
    }

    getCheckboxInput(){
        return this.checkbox.getCheckboxInput();
    }

    setStyle(css){
        this.checkboxContainer.style = css;
        return this;
    }

    onInteract(callback){
        this.checkbox.onInteract(callback);
        return this;
    }

    build(){
        return this.checkboxContainer;
    }
}

class UIDropdown{
    dropdown;
    dropdownContent;
    dropdownRawContent = [];
    dropdownLeft;
    dropdownRight;

    constructor(){
        let dropdown = document.createElement("div");
        dropdown.classList.add("ui-dropdown");

        let leftSide = document.createElement("div");
        leftSide.classList.add("ui-dropdown-left");
        this.dropdownLeft = leftSide;
        dropdown.appendChild(leftSide);

        let rightSide = document.createElement("div");
        rightSide.classList.add("ui-dropdown-right");
        this.dropdownRight = rightSide;
        dropdown.appendChild(rightSide);
	
		let arrow = document.createElement("img");
		arrow.setAttribute("src", "../img/white-arrow.svg");
		rightSide.appendChild(arrow);

        let content = document.createElement("div");
        content.classList.add("ui-dropdown-content");
        this.dropdownContent = content;
        dropdown.appendChild(content);

        let searchContent = document.createElement("input");
        searchContent.classList.add("ui-dropdown-search");
        searchContent.placeholder = "Search...";
        content.appendChild(searchContent);

        dropdown.addEventListener('click', (event) => {
            let includedElements = [dropdown, rightSide, leftSide, arrow];

            let leftDropdownSite = document.getElementsByClassName("ui-dropdown-left")[0];

            if(leftDropdownSite != null){
                let dropdownElementsText = leftDropdownSite.getElementsByClassName("ui-dropdown-element-text");
                let dropdownElementsSubtext = leftDropdownSite.getElementsByClassName("ui-dropdown-element-subtext");
                let dropdownElementsImage = leftDropdownSite.getElementsByClassName("ui-dropdown-element-image");
    
    
                Array.from(dropdownElementsText).forEach(el => includedElements.push(el))
                Array.from(dropdownElementsSubtext).forEach(el => includedElements.push(el))
                Array.from(dropdownElementsImage).forEach(el => includedElements.push(el))
            }

            if(includedElements.includes(event.target)){
                arrow.classList.toggle("up");
                content.classList.toggle("visible");
            }
        });
	
		searchContent.addEventListener('input', () => {
			for(let c of content.children){
				let el = c.getElementsByClassName("ui-dropdown-element")[0];
				c.style.display = (el.text.toLowerCase().includes(searchContent.value.toLowerCase()) ? "flex" : "none");
			}
		});
	
		window.addEventListener('mouseup', (event) => {
            let excludedElements = [dropdown, content, searchContent, arrow];

            let leftDropdownSite = document.getElementsByClassName("ui-dropdown-left")[0];

            if(leftDropdownSite != null){
                let dropdownElementsText = leftDropdownSite.getElementsByClassName("ui-dropdown-element-text");
                let dropdownElementsSubtext = leftDropdownSite.getElementsByClassName("ui-dropdown-element-subtext");
                let dropdownElementsImage = leftDropdownSite.getElementsByClassName("ui-dropdown-element-image");
    
                Array.from(dropdownElementsText).forEach(el => excludedElements.push(el))
                Array.from(dropdownElementsSubtext).forEach(el => excludedElements.push(el))
                Array.from(dropdownElementsImage).forEach(el => excludedElements.push(el))
            }

			if(!excludedElements.includes(event.target)) {
				content.classList.remove("visible");
				arrow.classList.remove("up");
			}
		});

        this.dropdown = dropdown;
    }

    addUIElement(element){
        if(!element instanceof UIDropdownElement) throw new Error("Element must be of type " + UIDropdownElement.name);

        this.dropdownRawContent.push(element);
        this.dropdownContent.appendChild(element.build());

        return this;
    }

	addUIElements(elements){
		if(!Array.isArray(elements)) throw new Error("Not an array");
		elements.forEach(el => {
            this.dropdownRawContent.push(el);
            this.dropdownContent.appendChild(el.build());
        });
		return this;
	}

    addTextChannels(callback){
        for(let textchannel of textchannels){
            let el = new UIDropdownElement();
            el.addImage("/img/hash.svg");
            el.addText(textchannel.getName());
            if(textchannel.getCategory() != null){
                el.addSubtext(textchannel.getCategory().getName());
            }
            el.setAttribute("value", textchannel.getID());
            el.onInteract(() => callback(textchannel, el));
            this.dropdownRawContent.push(el);
            this.dropdownContent.appendChild(el.build());
        }
        return this;
    }

    addNewsChannels(callback){
        for(let newschannel of newschannels){
            let el = new UIDropdownElement();
            el.addImage("/img/hash.svg");
            el.addText(newschannel.getName());
            if(newschannel.getCategory() != null){
                el.addSubtext(newschannel.getCategory().getName());
            }
            el.setAttribute("value", newschannel.getID());
            el.onInteract(() => callback(newschannel, el));
            this.dropdownRawContent.push(el);
            this.dropdownContent.appendChild(el.build());
        }
        return this;
    }

    addVoiceChannels(callback){
        for(let voicechannel of voicechannels){
            let el = new UIDropdownElement();
            el.addImage("/img/volume_up.svg");
            el.addText(voicechannel.getName());
            if(voicechannel.getCategory() != null){
                el.addSubtext(voicechannel.getCategory().getName());
            }
            el.setAttribute("value", voicechannel.getID());
            el.onInteract(() => callback(voicechannel, el));
            this.dropdownRawContent.push(el);
            this.addUIElement(el);
        }
        return this;
    }

    addStageChannels(callback){
        for(let stagechannel of stagechannels){
            let el = new UIDropdownElement();
            el.addImage("/img/volume_up.svg");
            el.addText(stagechannel.getName());
            if(stagechannel.getCategory() != null){
                el.addSubtext(stagechannel.getCategory().getName());
            }
            el.setAttribute("value", stagechannel.getID());
            el.onInteract(() => callback(stagechannel, el));
            this.dropdownRawContent.push(el);
            this.addUIElement(el);
        }
        return this;
    }

    addCategories(callback){
        for(let category of categories){
            let el = new UIDropdownElement();
            el.addText(category.getName());
            el.setAttribute("value", category.getID());
            el.onInteract(() => callback(category, el));
            this.dropdownRawContent.push(el);
            this.addUIElement(el);
        }
        return this;
    }

    addMembers(callback){
        for(let member of members){
            let el = new UIDropdownElement();
            el.addText(member.getName());
            el.setAttribute("value", member.getID());
            el.onInteract(() => callback(member, el));
            this.dropdownRawContent.push(el);
            this.addUIElement(el);
        }
        return this;
    }

    addBooleans(callback){
        for(let bool of ["Yes", "No"]){
            let boolean = (bool == "Yes" ? true : false);
            let el = new UIDropdownElement();
            el.addText(boolean.toString());
            el.setAttribute("value", boolean);
            el.onInteract(() => callback(boolean, el));
            this.dropdownRawContent.push(el);
            this.addUIElement(el);
        }
        return this;
    }

    addRoles(callback, removePublicRole = false){
        for(let role of roles){
			if(removePublicRole && role.isPublicRole()) continue;

            let el = new UIDropdownElement();
            el.addImage("/img/at.svg");
            el.addText(role.getName());
            el.setStyle("color: " + getHexColor(role.getColorRaw()) + ";");
            el.setAttribute("value", role.getID());
            el.onInteract(() => callback(role, el));
            this.dropdownRawContent.push(el);
            this.addUIElement(el);
        }
        return this;
    }

    addGuilds(callback){
        for(let permittedGuild of permittedGuilds){
            let el = new UIDropdownElement();
            el.addText(permittedGuild.getName());
            el.setAttribute("value", permittedGuild.getID());
            el.onInteract(() => callback(permittedGuild, el));
            this.dropdownRawContent.push(el);
            this.addUIElement(el);
        }
        return this;
    }

    findElementByAttribute(attr, val, callback){
        let el = this.dropdownRawContent.find(el => el.getAttribute(attr) == val);
        el.select();
        if(callback != null) callback(el);
        return this;
    }

    removeElementByAttribute(attr, val){
        let el = this.dropdownRawContent.find(el => el.getAttribute(attr) == val);
        if(el != null) el.dropdownElement.remove();
        return this;
    }

    selectFirst(callback){
        let el = this.dropdownRawContent[0];
        el.select();
        if(callback != null) callback(el)
        return this;
    }

    setPlaceholder(text){
        while(this.dropdownLeft.firstChild) this.dropdownLeft.removeChild(this.dropdownLeft.firstChild);
        let elementText = document.createElement("div");
        elementText.classList.add("ui-dropdown-element-text");
        elementText.innerText = text;
        this.dropdownLeft.appendChild(elementText);
        return this;
    }

    x(callback){
		let x = document.createElement("img");
        x.classList.add("ui-dropdown-reset");
		x.setAttribute("src", "../img/trash.svg");
        x.addEventListener('click', (event) => {
            event.stopPropagation();
            callback();
        });
		this.dropdownRight.appendChild(x);
    }

    build(){
        return this.dropdown;
    }
}

class UIDropdownElement{
    dropdownElement;
    dropdownTiles = [];

    constructor(){
        let element = document.createElement("div");
        element.classList.add("ui-dropdown-element");
        element.addEventListener('click', () => this.select());
        this.dropdownElement = element;
    }

    select(){
        let dropdown = this.dropdownElement.parentElement.parentElement;
        let con = dropdown.getElementsByClassName("ui-dropdown-left")[0];
        while(con.firstChild) con.removeChild(con.firstChild);
        Array.from(this.dropdownTiles).forEach(el => con.appendChild(el));
        return this;
    }

    addText(text){
        let elementText = document.createElement("div");
        elementText.classList.add("ui-dropdown-element-text");
        elementText.innerText = text;
        this.dropdownTiles.push(elementText.cloneNode(true));
        this.dropdownElement.appendChild(elementText);
        return this;
    }

    addSubtext(text){
        let elementSubtext = document.createElement("div");
        elementSubtext.classList.add("ui-dropdown-element-subtext");
        elementSubtext.innerText = text;
        this.dropdownTiles.push(elementSubtext.cloneNode(true));
        this.dropdownElement.appendChild(elementSubtext);
        return this;
    }

    addImage(src){
        let elementImage = document.createElement("img");
        elementImage.classList.add("ui-dropdown-element-image");
        elementImage.src = src;
        this.dropdownTiles.push(elementImage.cloneNode(true));
        this.dropdownElement.appendChild(elementImage);
        return this;
    }

    setAttribute(attr, value){
        this.dropdownElement.setAttribute(attr, value);
        return this;
    }

    getAttribute(attr){
        return this.dropdownElement.getAttribute(attr);
    }

    setStyle(css){
        this.dropdownElement.style = css;
        return this;
    }

    onRemove(callback){
        let elementRemove = document.createElement("img");
        elementRemove.classList.add("ui-dropdown-element-remove");
        elementRemove.src = "/img/CustomCommands/delete.svg";
        elementRemove.addEventListener('click', (event) => {
            event.stopPropagation();
            this.dropdownElement.remove();
            callback();
        });
        this.dropdownElement.appendChild(elementRemove);
        return this;
    }

    onInteract(callback){
        this.dropdownElement.addEventListener('click', () => callback());
        return this;
    }

    build(){
        return this.dropdownElement;
    }
}

class UITextInput{
    textInput;
    area;
    maxChars = 255;
    chars;

    constructor(){
        let textInput = document.createElement("div");
        textInput.classList.add("ui-text-input");
        this.textInput = textInput;

        let area = document.createElement("textarea");
        area.setAttribute("name", "text");
        area.setAttribute("maxlength", this.maxChars);
        this.area = area;
        textInput.appendChild(area);

        let chars = document.createElement("p");
        chars.innerText = "/" + this.maxChars;
        this.chars = chars;
        textInput.appendChild(chars);
            
        let charsLeft = document.createElement("p");
        charsLeft.innerText = 0;
        chars.appendChild(charsLeft);

        area.addEventListener('keyup', () => {
            if(area.value.length > this.maxChars) return;
            charsLeft.innerText = area.value.length;
        });

        setTimeout(() => charsLeft.innerText = area.value.length, 100);
    }

    setID(id){
        this.area.id = id;
        return this;
    }

    setValue(text){
        this.area.value = text;
        return this;
    }

    getValue(){
        return this.area.value;
    }

    readonly(){
        this.area.setAttribute("readonly", "readonly");
        return this;
    }

    onInteract(callback){
        this.area.addEventListener('change', () => {
            callback(this.area.value);
            this.area.blur();
        });
        return this;
    }

    build(){
        return this.textInput;
    }
}

class UIMinMaxSelector{
    selector;
    input;
    min;
    max;

    steps = 1;
    maxValue = 100;

    constructor(){
        let selector = document.createElement("div");
        selector.classList.add("ui-minmax-selector");
        this.selector = selector;

		let min = document.createElement("a");
		min.text = "-";
		min.classList.add("ui-minmax-min");
        this.min = min;
		min.addEventListener('click', () => {
			if(parseInt(inp.value) == 0 || isNaN(inp.value)) return;
			inp.value = parseInt(inp.value) - this.steps;
		});
        selector.appendChild(min);

		let inp = document.createElement("input");
		inp.classList.add("ui-minmax-input");
		inp.setAttribute("maxlength", 3);
		setInputFilter(inp, function(value) {
			return /^\d*?\d*$/.test(value);
		});
		inp.addEventListener('change', () => {
			if(inp.value == "") inp.value = 0;
		});
        this.input = inp;
        selector.appendChild(inp);

		let max = document.createElement("a");
		max.text = "+";
		max.classList.add("ui-minmax-max");
        this.max = max;
		max.addEventListener('click', () => {
			if((parseInt(inp.value) > this.maxValue) || isNaN(inp.value)) return;
			inp.value = parseInt(inp.value) + this.steps;
		});
        selector.appendChild(max);
    }

    onInteract(callback){
        let inp = this.input;
        let min = this.min;
        let max = this.max;

		min.addEventListener('click', () => callback(parseInt(inp.value)));
		inp.addEventListener('keyup', () => callback(inp.value == "" ? 0 : parseInt(inp.value)));
		max.addEventListener('click', () => callback(parseInt(inp.value)));

        return this;
    }

    setSteps(steps){
        this.steps = steps;
        return this;
    }

    setMaxValue(val){
        this.maxValue = val;
        return this;
    }

    getValue(){
        return this.input.value;
    }

    setValue(val){
        this.input.value = val;
        return this;
    }

    build(){
        return this.selector;
    }
}

class UIDrop{
    drop;

    constructor(){
		let drop = document.createElement("div");
		drop.classList.add("ui-drop");
		drop.addEventListener('dragover', (event) => event.preventDefault());
        this.drop = drop;
    }

    hide(){
        $(this.drop).hide();
        return this;
    }

    show(){
        $(this.drop).show();
        return this;
    }

    setText(text){
        this.drop.innerText = text;
        return this;
    }

    setStyle(css){
        this.drop.style = css;
        return this;
    }

    onDrop(callback){
		this.drop.addEventListener('drop', (event) => {
            event.preventDefault();
            callback(event, this.drop);
        });
        return this;
    }

    setAttribute(attr, val){
        this.drop.setAttribute(attr, val);
        return this;
    }

    getAttribute(attr){
        return this.drop.getAttribute(attr);
    }

    build(){
        return this.drop;
    }
}

class UIColorPicker{
    picker;
    input;
    label;

    constructor(){
        let picker = document.createElement("div");
        picker.classList.add("ui-color-picker");
        this.picker = picker;

		let inp = document.createElement("input");
		inp.setAttribute("type", "color");
		inp.id = "ui-color-picker-input";
        this.input = inp;
		picker.appendChild(inp);

		let lbl = document.createElement("label");
        lbl.id = "ui-color-picker-label";
		lbl.setAttribute("for", "ui-color-picker-input");
		lbl.innerText = "Color";
        this.label = lbl;
		picker.appendChild(lbl);

        inp.addEventListener('input', () => {
            lbl.style.borderLeft = "5px solid " + inp.value;
        });
    }

    onInteract(callback){
        let inp = this.input;
        inp.addEventListener('input', () => callback(hexToDecimal(inp.value)));
        return this;
    }

    setValue(value){
        if(isColor(value)) throw new Error("Not a color");
        let c = isNaN(value) ? value : hexToDecimal(value);
        this.input.value = c;
        this.label.style.borderLeft = "5px solid " + c;
        return this;
    }

    getValue(){
        return this.input.value;
    }

    build(){
        return this.picker;
    }
}

class UIListSelector{
    selector;
    selectorUnsortedList;
    selectorContent;

    constructor(){
		let selector = document.createElement("div");
		selector.classList.add("ui-selector");
        this.selector = selector;

		let selectorInner = document.createElement("div");
		selectorInner.classList.add("ui-selector-inner");
		selector.appendChild(selectorInner);

		let ul = document.createElement("ul");
		ul.classList.add("ui-selector-ul");
        this.selectorUnsortedList = ul;
		selectorInner.appendChild(ul);

		let li = document.createElement("li");
		li.classList.add("ui-selector-li");
		ul.appendChild(li);

		let add = document.createElement("a");
		add.classList.add("ui-selector-add");
		add.text = "+";
		add.addEventListener('click', () => con.classList.toggle("visible"));
		li.appendChild(add);

		let con = document.createElement("div");
		con.classList.add("ui-selector-content");
        this.selectorContent = con;
		selector.appendChild(con);

		let search = document.createElement("input");
        search.classList.add("ui-selector-search");
		search.setAttribute("placeholder", "Search...");
		con.appendChild(search);

		search.addEventListener('input', () => {
			for(let c of con.children){
                if(c == search) continue;
				let isSearchable = c.getAttribute("disabled") == null || c.getAttribute("disabled") == "false";
                let searchableText = "";
                for(let el of Array.from(c.children)){
                    if(el.classList.contains("ui-selector-addable-element-image")) continue;
                    searchableText += " " + el.innerText;
                }
				c.style.display = (isSearchable && searchableText.toLowerCase().includes(search.value.toLowerCase()) ? "flex" : "none");
			}
		});
	
		window.addEventListener('mouseup', (event) => {
            let addableElements = con.getElementsByClassName("ui-selector-addable-element");
            let addableElementsText = con.getElementsByClassName("ui-selector-addable-element-text");
            let addableElementsSubtext = con.getElementsByClassName("ui-selector-addable-element-subtext");
            let addableElementsImage = con.getElementsByClassName("ui-selector-addable-element-image");

            let excludedElements = [selector, selectorInner, ul, li, add, con, search];
            Array.from(addableElements).forEach(el => excludedElements.push(el))
            Array.from(addableElementsText).forEach(el => excludedElements.push(el))
            Array.from(addableElementsSubtext).forEach(el => excludedElements.push(el))
            Array.from(addableElementsImage).forEach(el => excludedElements.push(el))

			if(!excludedElements.includes(event.target)) con.classList.remove("visible");
		});
    }

    removeAddableOption(){
        let el = this.selector.getElementsByClassName("ui-selector-li")[0];
        el.remove();
    }

    addListElement(element){
        let el = Array.from(this.selectorContent.children).find(el => el.getAttribute("value") == element.getAttribute("value"));
        if(el != null) el.setAttribute("disabled", true);

        this.selectorUnsortedList.appendChild(element.build());
        return this;
    }

    clearListElements(){
        Array.from(this.selectorUnsortedList.children).forEach(el => el.remove());
        return this;
    }

    addAddableElement(element){
        this.selectorContent.appendChild(element.build());
        return this;
    }

    setStyle(css){
        this.selector.style = css;
        return this;
    }

    setContentStyle(css){
        this.selectorContent.style = css;
        return this;
    }

    findElementByValue(val){
        let el = Array.from(this.selectorContent.children).find(el => el.getAttribute("value") == val);
        return el;
    }

    /*disableAddableElementsByValue(elements){
        if(!Array.isArray(elements)) throw new Error("Elements needs to be an Array");
        for(let element of elements){
            let el = Array.from(this.selectorContent.children).find(el => el.getAttribute("value") == element);
            if(el == null) continue;
            el.style.display = "none";
        }
        return this;
    }*/

    addTextChannels(callback){
        for(let textchannel of textchannels){
            let el = new UIListSelectorAddableElement();
            el.addImage("/img/hash.svg");
            el.addText(textchannel.getName());
            if(textchannel.getCategory() != null){
                el.addSubtext(textchannel.getCategory().getName());
            }
            el.setAttribute("value", textchannel.getID());
            el.onInteract(() => callback(textchannel, el));
            this.addAddableElement(el);
        }
        return this;
    }

    addNewsChannels(callback){
        for(let newschannel of newschannels){
            let el = new UIListSelectorAddableElement();
            el.addImage("/img/hash.svg");
            el.addText(newschannel.getName());
            if(newschannel.getCategory() != null){
                el.addSubtext(newschannel.getCategory().getName());
            }
            el.setAttribute("value", newschannel.getID());
            el.onInteract(() => callback(newschannel, el));
            this.addAddableElement(el);
        }
        return this;
    }

    addVoiceChannels(callback){
        for(let voicechannel of voicechannels){
            let el = new UIListSelectorAddableElement();
            el.addImage("/img/volume_up.svg");
            el.addText(voicechannel.getName());
            if(voicechannel.getCategory() != null){
                el.addSubtext(voicechannel.getCategory().getName());
            }
            el.setAttribute("value", voicechannel.getID());
            el.onInteract(() => callback(voicechannel, el));
            this.addAddableElement(el);
        }
        return this;
    }

    addStageChannels(callback){
        for(let stagechannel of stagechannels){
            let el = new UIListSelectorAddableElement();
            el.addImage("/img/volume_up.svg");
            el.addText(stagechannel.getName());
            if(stagechannel.getCategory() != null){
                el.addSubtext(stagechannel.getCategory().getName());
            }
            el.setAttribute("value", stagechannel.getID());
            el.onInteract(() => callback(stagechannel, el));
            this.addAddableElement(el);
        }
        return this;
    }

    addCategories(callback){
        for(let category of categories){
            let el = new UIListSelectorAddableElement();
            el.addText(category.getName());
            el.setAttribute("value", category.getID());
            el.onInteract(() => callback(category, el));
            this.addAddableElement(el);
        }
        return this;
    }

    addMembers(callback){
        for(let member of members){
            let el = new UIListSelectorAddableElement();
            el.addText(member.getName());
            el.setAttribute("value", member.getID());
            el.onInteract(() => callback(member, el));
            this.addAddableElement(el);
        }
        return this;
    }

    addBooleans(callback){
        for(let bool of ["Yes", "No"]){
            let boolean = (bool == "Yes" ? true : false);
            let el = new UIListSelectorAddableElement();
            el.addText(boolean);
            el.onInteract(() => callback(boolean, el));
            this.addAddableElement(el);
        }
        return this;
    }

    addRoles(callback, removePublicRole = false){
        for(let role of roles){
			if(removePublicRole && role.isPublicRole()) continue;

            let el = new UIListSelectorAddableElement();
            el.addImage("/img/at.svg");
            el.addText(role.getName());
            el.setStyle("color: " + getHexColor(role.getColorRaw()) + ";");
            el.setAttribute("value", role.getID());
            el.onInteract(() => callback(role, el));
            this.addAddableElement(el);
        }
        return this;
    }

    build(){
        return this.selector;
    }
}

class UIListSelectorElement{
    listSelectorElement;

    constructor(){
        let element = document.createElement("div");
        element.classList.add("ui-selector-element");
        this.listSelectorElement = element;
    }

    addText(text){
        let elementText = document.createElement("div");
        elementText.classList.add("ui-selector-element-text");
        elementText.innerText = text;
        this.listSelectorElement.appendChild(elementText);
        return this;
    }

    addSubtext(text){
        let elementSubtext = document.createElement("div");
        elementSubtext.classList.add("ui-selector-element-subtext");
        elementSubtext.innerText = text;
        this.listSelectorElement.appendChild(elementSubtext);
        return this;
    }

    addImage(src){
        let elementImage = document.createElement("img");
        elementImage.classList.add("ui-selector-element-image");
        elementImage.src = src;
        this.listSelectorElement.appendChild(elementImage);
        return this;
    }

    setAttribute(attr, value){
        this.listSelectorElement.setAttribute(attr, value);
        return this;
    }

    getAttribute(attr){
        return this.listSelectorElement.getAttribute(attr);
    }

    setStyle(css){
        this.listSelectorElement.style = css;
        return this;
    }

    onRemove(callback){
        let elementRemove = document.createElement("img");
        elementRemove.classList.add("ui-selector-element-remove");
        elementRemove.src = "/img/CustomCommands/delete.svg";
        elementRemove.addEventListener('click', (event) => {
            event.stopPropagation();

            let content = this.listSelectorElement.parentElement.parentElement.parentElement.getElementsByClassName("ui-selector-content")[0];
            let item = Array.from(content.children).find(el => el.getAttribute("value") == this.listSelectorElement.getAttribute("value"));
            if(item == null) throw new Error("Item can't be found. Value doesn't match.");
            item.removeAttribute("disabled");

            this.listSelectorElement.remove();

            callback();
        });
        this.listSelectorElement.appendChild(elementRemove);
        return this;
    }

    onInteract(callback){
        this.listSelectorElement.addEventListener('click', (event) => {
            event.stopPropagation();
            callback();
        });
        return this;
    }

    build(){
        return this.listSelectorElement;
    }
}

class UIListSelectorAddableElement{
    addableElement;
    addableTiles = [];

    constructor(){
        let element = document.createElement("div");
        element.classList.add("ui-selector-addable-element");
        this.addableElement = element;
    }

    addText(text){
        let elementText = document.createElement("div");
        elementText.classList.add("ui-selector-addable-element-text");
        elementText.innerText = text;
        this.addableTiles.push(elementText.cloneNode(true));
        this.addableElement.appendChild(elementText);
        return this;
    }

    addSubtext(text){
        let elementSubtext = document.createElement("div");
        elementSubtext.classList.add("ui-selector-addable-element-subtext");
        elementSubtext.innerText = text;
        this.addableTiles.push(elementSubtext.cloneNode(true));
        this.addableElement.appendChild(elementSubtext);
        return this;
    }

    addImage(src){
        let elementImage = document.createElement("img");
        elementImage.classList.add("ui-selector-addable-element-image");
        elementImage.src = src;
        this.addableTiles.push(elementImage.cloneNode(true));
        this.addableElement.appendChild(elementImage);
        return this;
    }

    setAttribute(attr, value){
        this.addableElement.setAttribute(attr, value);
        return this;
    }

    getAttribute(attr){
        return this.addableElement.getAttribute(attr);
    }

    setStyle(css){
        this.addableElement.style = css;
        return this;
    }

    onInteract(callback){
        this.addableElement.addEventListener('click', (event) => {
            event.stopPropagation();
            this.addableElement.setAttribute("disabled", true);
            callback();
        });
        return this;
    }

    build(){
        return this.addableElement;
    }
}