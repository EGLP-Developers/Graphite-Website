var head = document.getElementsByTagName('HEAD')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';  
link.type = 'text/css';
link.href = 'js/css/embed.css';  
head.appendChild(link);

var fields = [];

class Embed{
	title;
	text;

	constructor(){
		return this;
	};

	setTitle(title){
		this.title = title;
	}

	getTitle(){
		return this.title;
	}

	setText(text){
		this.text = text;
	}

	getText(){
		return this.text;
	}

	/*MORE*/

	getHTMLEmbed(){
		let colorStripeCodes = ["#fff", "#607d8a", "#ff7673", "#ffbb5c", "#ffd74e", "#6de194", "#63ecdb", "#5acff5", "#70b1ff", "#b072ff"];

		let outerDiv = document.createElement("div");
		outerDiv.classList.add("embed-outer");

		//Thumbnail
		let thumbnail = document.createElement("div");
		thumbnail.classList.add("embed-thumbnail");
		outerDiv.appendChild(thumbnail);

		let thumbnailSVG = document.createElement("img");
		thumbnailSVG.src = "/img/image_placeholder.svg";
		thumbnail.appendChild(thumbnailSVG);

		let thumbnailSVGUpload = document.createElement("input");
		thumbnailSVGUpload.type = "file";
		thumbnailSVGUpload.style.display = "none";
		thumbnail.appendChild(thumbnailSVGUpload);

		thumbnailSVG.onclick = () => $(thumbnailSVGUpload).click();
		thumbnailSVGUpload.onchange = () => readURL(thumbnailSVG, thumbnailSVGUpload);


		//Color stripe
		let colorStripe = document.createElement("div");
		colorStripe.classList.add("embed-color-stripe");
		outerDiv.appendChild(colorStripe);

		let colorStripeTitle = document.createElement("label");
		colorStripeTitle.classList.add("embed-subtitle");
		colorStripeTitle.textContent = "Stripe color";
		colorStripe.appendChild(colorStripeTitle);

		let colorStripeInner = document.createElement("div");
		colorStripeInner.classList.add("embed-color-stripe-inner");
		colorStripe.appendChild(colorStripeInner);

		for(let colorStripeCode of colorStripeCodes){
			let colorStripeLbl = document.createElement("label");
			colorStripeLbl.classList.add("embed-color-stripe-lbl");
			colorStripeLbl.style.backgroundColor = colorStripeCode;
			colorStripeLbl.onclick = () => {
				outerDiv.style.borderLeft = "3px solid " + colorStripeCode;
			}
			colorStripeInner.appendChild(colorStripeLbl);
		}

		let rgbPicker = document.createElement("div");
		rgbPicker.classList.add("embed-color-picker");
		colorStripeInner.appendChild(rgbPicker);

		let picker = document.createElement("input");
		picker.type = "color";
		picker.id = "embed-rgb-picker";
		picker.onchange = () => {
			outerDiv.style.borderLeft = "3px solid " + picker.value;
		}
		rgbPicker.appendChild(picker);

		let rgbLbl = document.createElement("label");
		rgbLbl.classList.add("embed-color-stripe-lbl");
		rgbLbl.setAttribute("for", "embed-rgb-picker");
		rgbPicker.appendChild(rgbLbl);

		//Author
		let author = document.createElement("div");
		author.classList.add("embed-author");
		outerDiv.appendChild(author);

		let authorTitle = document.createElement("label");
		authorTitle.classList.add("embed-subtitle");
		authorTitle.textContent = "Author";
		author.appendChild(authorTitle);

		let authorInner = document.createElement("div");
		authorInner.classList.add("embed-author-inner");
		author.appendChild(authorInner);

		let authorImg = document.createElement("div");
		authorImg.classList.add("embed-author-image");
		authorInner.appendChild(authorImg);

		let authorSVG = document.createElement("img");
		authorSVG.src = "/img/image_placeholder.svg";
		authorImg.appendChild(authorSVG);

		let authorInput = document.createElement("input");
		authorInput.classList.add("embed-input");
		authorInput.placeholder = "Author name";
		authorInner.appendChild(authorInput);

		let authorSVGUpload = document.createElement("input");
		authorSVGUpload.type = "file";
		authorSVGUpload.style.display = "none";
		authorInner.appendChild(authorSVGUpload);

		authorSVG.onclick = () => $(authorSVGUpload).click();
		authorSVGUpload.onchange = () => readURL(authorSVG, authorSVGUpload);

		//Title
		let title = document.createElement("div");
		title.classList.add("embed-title");
		outerDiv.appendChild(title);

		let embedTitle = document.createElement("label");
		embedTitle.classList.add("embed-subtitle");
		embedTitle.textContent = "Title";
		title.appendChild(embedTitle);

		let titleInput = document.createElement("input");
		titleInput.classList.add("embed-input");
		titleInput.placeholder = (this.title == null ? "Title text" : this.title);
		title.appendChild(titleInput);

		//Text
		let text = document.createElement("div");
		text.classList.add("embed-text");
		outerDiv.appendChild(text);

		let embedText = document.createElement("label");
		embedText.classList.add("embed-subtitle");
		embedText.textContent = "Text";
		text.appendChild(embedText);

		let textInputOuter = document.createElement("div");
		textInputOuter.classList.add("embed-textarea");
		text.appendChild(textInputOuter);
	
		let area = document.createElement("textarea");
		area.setAttribute("name", "text");
		area.setAttribute("maxlength", 2000);
		if(this.text != null) area.value = this.text;
		textInputOuter.appendChild(area);
	
		let chars = document.createElement("p");
		chars.innerText = "/2000";
		textInputOuter.appendChild(chars);
		
		let charsLeft = document.createElement("span");
		charsLeft.innerText = 0;
		chars.appendChild(charsLeft);
	
		area.addEventListener('keyup', () => {
			if(area.value.length > 2000) return;
			charsLeft.innerText = area.value.length;
		});
	
		/*if(onInput != null){
			area.addEventListener('change', () => {
				onInput(area.value);
				area.blur();
			});
		}*/
	
		setTimeout(() => charsLeft.innerText = area.value.length, 100);

		//Fields
		let fields = document.createElement("div");
		fields.classList.add("embed-fields");
		outerDiv.appendChild(fields);

		let embedFieldsTitle = document.createElement("label");
		embedFieldsTitle.classList.add("embed-subtitle");
		embedFieldsTitle.textContent = "Additional fields";
		fields.appendChild(embedFieldsTitle);

		let fieldsInner = document.createElement("div");
		fieldsInner.classList.add("embed-fields-inner");
		fields.appendChild(fieldsInner);

		fieldsInner.appendChild(new EmbedField());

		let addField = document.createElement("button");
		addField.classList.add("embed-add-field");
		addField.textContent = "Add field";
		addField.onclick = () => {
			fieldsInner.appendChild(new EmbedField())
		}
		fields.appendChild(addField);

		//Image
		let image = document.createElement("div");
		image.classList.add("embed-image");
		outerDiv.appendChild(image);

		let imageSVG = document.createElement("img");
		imageSVG.src = "/img/image_placeholder.svg";
		image.appendChild(imageSVG);

		let imageSVGUpload = document.createElement("input");
		imageSVGUpload.type = "file";
		imageSVGUpload.style.display = "none";
		image.appendChild(imageSVGUpload);

		imageSVG.onclick = () => $(imageSVGUpload).click();
		imageSVGUpload.onchange = () => readURL(imageSVG, imageSVGUpload);

		//Footer
		let footer = document.createElement("div");
		footer.classList.add("embed-footer");
		outerDiv.appendChild(footer);

		let footerTitle = document.createElement("label");
		footerTitle.classList.add("embed-subtitle");
		footerTitle.textContent = "Footer";
		footer.appendChild(footerTitle);

		let footerInner = document.createElement("div");
		footerInner.classList.add("embed-footer-inner");
		footer.appendChild(footerInner);

		let footerImg = document.createElement("div");
		footerImg.classList.add("embed-footer-image");
		footerInner.appendChild(footerImg);

		let footerSVG = document.createElement("img");
		footerSVG.src = "/img/image_placeholder.svg";
		footerSVG.id = "footer-image-svg";
		footerImg.appendChild(footerSVG);

		let footerSVGUpload = document.createElement("input");
		footerSVGUpload.type = "file";
		footerSVGUpload.style.display = "none";
		footerInner.appendChild(footerSVGUpload);

		footerSVG.onclick = () => $(footerSVGUpload).click();
		footerSVGUpload.onchange = () => readURL(footerSVG, footerSVGUpload);


		let footerInput = document.createElement("input");
		footerInput.classList.add("embed-input");
		footerInput.placeholder = "Footer text";
		footerInner.appendChild(footerInput);

		return outerDiv;
	}
}

class EmbedField{
	constructor(callback){
		let field = document.createElement("div");
		field.classList.add("embed-field-outer");

		let contentSide = document.createElement("div");
		contentSide.classList.add("embed-field-content-side");
		field.appendChild(contentSide);

		let name = document.createElement("input");
		name.classList.add("embed-input");
		name.placeholder = "Field name";
		contentSide.appendChild(name);

		let value = document.createElement("input");
		value.classList.add("embed-input");
		value.placeholder = "Field value";
		contentSide.appendChild(value);

		let actionSide = document.createElement("div");
		actionSide.classList.add("embed-field-action-side");
		field.appendChild(actionSide);

		let delField = document.createElement("img");
		delField.src = "/img/trash.svg";
		delField.classList.add("embed-delete-field");
		delField.onclick = () => {
			if(fields.length <= 1) return;
			field.remove();
			removeArrayElement(fields, field);
		}
		actionSide.appendChild(delField);

		let inline = document.createElement("img");
		inline.src = "/img/inline_embed.svg";
		actionSide.appendChild(inline);

		fields.push(field);

		return field;
	};
}

function readURL(target, input) {
	if(target == null){
		alert("No target on file upload");
		return;
	}

	if (input.files && input.files[0]) {
		var reader = new FileReader();

		reader.onload = function (e) {
			$(target)
				.attr('src', e.target.result)
				.attr('style', 'display: flex; width: 100%; max-height: 100%; border-radius: 5px;');
		};

		reader.readAsDataURL(input.files[0]);
	}
}