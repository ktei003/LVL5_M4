const cleanText = require('../functions/cleanText')

test('Correctly cleans a string', () => {
	expect(
		cleanText("Hello$World")
		).toBe("Hello World")
})