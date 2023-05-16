
const tileHighlightList = [
	"img/selected-tile-grey.png",
	"img/selected-tile-red.png",
	"img/selected-tile-green.png",
	"img/selected-tile-blue.png"
]
const tileHighlights = []

const tileImgList = [
	"img/grass16p.png",
	"img/bricks0116p.png",
	"img/bricks0216p.png"
]
const tileImgs = []

export const tileImgObsList = [
	false,
	true,
	true
]

const testSpriteImg = "img/test-guy.png"

export async function loadAssets() {
	for(let i = 0; i < tileHighlightList.length; i++) {
		tileHighlights.push(await loadImage(tileHighlightList[i]))
	}
	for(let i = 0; i < tileImgList.length; i++) {
		tileImgs.push(await loadImage(tileImgList[i]))
	}
	const testSprite = await loadImage(testSpriteImg)
	return [tileHighlights, tileImgs, testSprite]
}

/** @returns {Promise<HTMLImageElement>} */
function loadImage(url) {
	return new Promise((resolve) => {
		const image = new Image()
		image.onload = () =>{
			resolve(image)
		}
		image.src = url
	})
}
