define(['node'], function(Node) {
	var TessellatedNode = function(config) {
		this.parent.init(this, config);
	};

	TessellatedNode.extend(Node);

	return TessellatedNode;
});
