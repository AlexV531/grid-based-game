
export function DialogueNode(option, response) {

	this.value = {
		option: option,
		response: response
	};
	this.children = [];
	this.parent = null;

	this.setParentNode = function(node) {
		this.parent = node;
	}

	this.getParentNode = function() {
		return this.parent;
	}

	this.addChild = function(node) {
		node.setParentNode(this);
		this.children[this.children.length] = node;
	}

	this.getChildren = function() {
		return this.children;
	}

	this.removeChildren = function() {
		this.children = [];
	}
}