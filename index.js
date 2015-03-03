var layout = require("css-layout");
var par = require("par");

module.exports = render;

function render(nodes) {
	layout.fillNodes(nodes);
	layout.computeLayout(nodes);
	var extracted_nodes = layout.extractNodes(nodes);
	return render_boxes(extracted_nodes);
}

function render_boxes(boxes) {
	var width = boxes.width;
	var height = boxes.height;
	return '<svg width="' + width + '" height="' + height + '">' + render_box(0, boxes) + "\n</svg>";
}

function render_box(depth, box) {
	var label = "\t<!-- Depth:" + depth + " -->";
	var indent = make_tabs(depth);
	var color = make_color(depth);
	var parent = '<rect fill="' + color + '" x="' + box.left + '" y="' + box.top + '" width="' + box.width + '" height="' + box.height + '"/>';
	return "\n" + indent + parent + label + render_children(depth, box);
}

function render_children(depth, box) {
	var children = box.children;
	if (!children || !children.length) return "";
	var indent = make_tabs(depth);
	var rendered = children.map(par(render_box, depth + 1)).join("");
	return "\n" + indent + '<g transform="translate(' + box.left + ',' + box.top + ')">' + rendered + "\n" + indent + "</g>";
}

function make_color(depth) {
	var color_level = ((depth * 16 + 32).toString(16));
	var color = "#" + color_level + color_level + color_level;
	return color;
}

function make_tabs(depth) {
	var result = "\t";
	while (depth--) result += "\t";
	return result;
}
