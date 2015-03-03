var render = require("../");

show_nodes(make_main());

$("button").onclick = re_render_nodes;
$("textarea").onkeydown = handle_tabs;

function re_render_nodes() {
	var raw = $("textarea").value;
	try {
		var nodes = JSON.parse(raw);
		show_nodes(nodes);
	} catch (e) {
		console.error(e);
		$("#error").innerText = e.message;
	}
}

function show_nodes(nodes) {
	var node_src = JSON.stringify(nodes, null, "\t");

	var image = render(nodes);

	$("main").innerHTML = image;
	$("#raw_image").innerText = image;
	$("#raw_nodes").innerText = node_src;
	$("textarea").value = node_src;
}

function make_main() {
	return {
		_id: "main",
		style: {
			height: 500,
			width: 500
		},
		children: [
			make_header(),
			make_content(),
			make_footer(),
		]
	}
}

function make_header() {
	return {
		_id: "header",
		style: {
			height: 80,
			flexDirection: "row",
			padding: 8
		},
		children: [{
			_id: "header-menu-button",
			style: {
				width: 60,
				margin: 4
			}
		}, {
			_id: "header-message",
			style: {
				flex: 1,
				margin: 4
			}
		}]
	}
}

function make_content() {
	return {
		_id: "content",
		style: {
			flex: 1,
			margin: 4,
			padding: 4
		},
		children: [
			make_post(),
			make_post()
		]
	}
}

function make_post() {
	return {
		_id: "post",
		style: {
			flex: 1,
			margin: 8
		}
	}
}

function make_post_children() {
	return [{
		style: {
			height: 40,
			width: 40
		}
	}, {
		style: {
			padding: 4
		},
		children: [
			make_post_line(),
			make_post_line()
		]
	}]
}

function make_post_line() {
	return {
		_id: "post-line",
		style: {
			height: 12,
			padding: 6,
			margin: 12
		}
	}
}

function make_footer() {
	return {
		_id: "footer",
		style: {
			height: 50,
			margin: 4
		}
	}
}

function $(query) {
	var elements = document.querySelectorAll(query);
	if (elements.length <= 1) return elements[0];
	return [].slice.call(elements);
}

// Taken from http://jsfiddle.net/tovic/2wAzx/embedded/result,js/
function handle_tabs(e) {
	var el = e.target;
	if (e.keyCode === 9) { // tab was pressed
		// get caret position/selection
		var val = el.value,
			start = el.selectionStart,
			end = el.selectionEnd;
		// set textarea value to: text before caret + tab + text after caret
		el.value = val.substring(0, start) + '\t' + val.substring(end);
		// put caret at right position again
		el.selectionStart = el.selectionEnd = start + 1;
		// prevent the focus lose
		e.preventDefault();
		return false;
	}
}
