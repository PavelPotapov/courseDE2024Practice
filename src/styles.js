const files = await import.meta.webpackContext("./", {
	regExp: /\.pcss/,
	mode: "eager",
})
const styles = await Promise.all(files.keys().map((path) => files(path)))
export { styles }
