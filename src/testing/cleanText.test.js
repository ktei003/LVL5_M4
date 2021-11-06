const cleanText = require('../functions/cleanText')

const testArray = [
	"hello world",
	"hello%world",
	"!hello world",
	";hello?world!",
	"hello;world",
	"hello world?"
]

testArray.forEach(text => {
	test('Correctly cleans a string', () => {
		expect(cleanText(text)).toBe("hello world")
	})
})