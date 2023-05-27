
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

const propImgList = [
	"img/tree.png"
]
const propImgs = []

// x offset, y offset, x width, y width, obstructed (a list of tiles this prop obstructs)
export const propImgInfo = [
	{xOff:-1, yOff:0, xWid:3, yWidz:4, obs:[]}
]


export const tileImgObsList = [
	false,
	true,
	true
]

const testSpriteImg = "img/test-guy.png"
const roofSpriteImg = "img/roof.png"

export async function loadAssets() {
	for(let i = 0; i < tileHighlightList.length; i++) {
		tileHighlights.push(await loadImage(tileHighlightList[i]))
	}
	for(let i = 0; i < tileImgList.length; i++) {
		tileImgs.push(await loadImage(tileImgList[i]))
	}
	for(let i = 0; i < propImgList.length; i++) {
		propImgs.push(await loadImage(propImgList[i]))
	}
	const testSprite = await loadImage(testSpriteImg)
	const roofSprite = await loadImage(roofSpriteImg)
	return [tileHighlights, tileImgs, testSprite, roofSprite]
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
