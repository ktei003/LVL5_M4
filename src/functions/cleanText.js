const cleanText = (text) => text.replace(/[^a-zA-Z0-9 ]/g, " ").trim();
	
module.exports = cleanText