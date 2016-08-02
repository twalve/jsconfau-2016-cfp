(function(){
	const CFPV = {
		buttons: ["👍👍","👍","👍👎","👎","👎👎"],
		build: function () {
			const shadow = document.createElement("div");

			for (let button in this.buttons) {
				const div = document.createElement("div");
				const label = document.createElement("label");

				div.innerHTML = this.buttons[button];
				label.setAttribute("for", "option_" + button);
				label.setAttribute("class", "btn btn-default");
				label.setAttribute("role", "button");
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
		submit: function (event) {
			const form = document.querySelector(".Proposal form");
			const button = form.querySelector("button");
			if (form && button) {button.click()};
		},
		listen: function () {
			document.querySelector("body").addEventListener("change", CFPV.submit);
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
			} else {
				pair("lite");// development mode
			}
		},
		init: function () {
			this.search();
			this.listen();
		}
	};
	window.CFPV = CFPV;
	CFPV.init();
}());
