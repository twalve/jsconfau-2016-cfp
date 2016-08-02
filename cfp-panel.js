(function(){
	const CFPV = {
		buttons: ["👍👍","👍","👍👎","👎","👎👎"],
		build: function () {
			const shadow = document.createElement("div");

			for (let button in this.buttons) {
				const span = document.createElement("span");
				const div = document.createElement("div");
				const label = document.createElement("label");

				span.innerHTML = "[" + (button * 1 + 1) + "]";
				div.innerHTML = this.buttons[button];
				label.setAttribute("for", "option_" + button);
				label.setAttribute("class", "btn btn-default");
				label.setAttribute("role", "button");
				div.appendChild(span);
				label.appendChild(div);
				shadow.appendChild(label);
			}

			return shadow.innerHTML;
		},
		lite: function () {
			let panel = document.createElement("nav");
			panel.id = "panel";
			panel.innerHTML = this.build();
			document.querySelector("body").appendChild(panel);
		},
		shortcut: function (event) {
			let comments = document.querySelector("[name='comments']");

			if (comments !== document.activeElement) {
				if (event.keyCode > 48 && event.keyCode < 56) { // 1 == 49 ... 7 == 55
					let key = event.keyCode - 49;
					let selector = "#option_" + key; // to access zero indexed radio button

					document.querySelector(selector).click();
				}
			}
		},
		submit: function (event) {
			const form = document.querySelector(".Proposal form");
			const button = form.querySelector("button");
			if (form && button) {button.click()};
		},
		listen: function () {
			document.querySelector("body").addEventListener("change", CFPV.submit);
			document.querySelector("body").addEventListener("keyup", CFPV.shortcut);
		},
		search: function () {
			function pair (string) {
				let keyValue = string.split("=");
				if (keyValue[0] === "lite") {
					CFPV[keyValue[0]]();
				}
			}

			if (window.location.search) {
				let queries = window.location.search.substring(1);
				queries = queries.replace(/&amp;/gi, "&");

				if (queries.indexOf("=") === -1) {
					pair(queries);
				} else {
					queries = queries.split("&");
					for (let query in queries) {
						pair(queries[query]);
					}
				}
			}/* else {
				pair("lite");// development mode
			}*/
		},
		init: function () {
			this.search();
			this.listen();
		}
	};
	window.CFPV = CFPV;
	CFPV.init();
}());
