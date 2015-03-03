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
	var color_level = ((depth * 16 + 32).toString(16));
	var color = "#" + color_level + color_level + color_level;
	var indent = make_tabs(depth);
	var parent = '<rect fill="' + color + '" x="' + box.left + '" y="' + box.top + '" width="' + box.width + '" height="' + box.height + '"/>';
	var children = (box.children || []).map(par(render_box, depth + 1)).join("");
	return "\n" + indent + parent + label + children;
}

function make_tabs(depth) {
	var result = "\t";
	while (depth--) result += "\t";
	return result;
}
