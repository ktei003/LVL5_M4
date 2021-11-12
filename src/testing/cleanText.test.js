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
	test(`Cleaned ${text}`, () => {
		expect(cleanText(text)).toBe("hello x world")
	})
})