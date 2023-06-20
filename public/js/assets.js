
const tileImgList = [
	"img/grass16p.png",
	"img/bricks0116p.png",
	"img/bricks0216p.png",
	"img/floor01.png"
]
const tileImgs = []
export const tileImgObsList = [
	false,
	true,
	true
]

const spriteImgList = [
	"img/test-guy.png",
	"img/roof.png",
	"img/doorClosed.png",
	"img/doorOpen.png"
]
const spriteImgs = []

const propImgList = [
	"img/tree.png"
]
const propImgs = []

// x offset, y offset, x width, y width, obstructed (a list of tiles this prop obstructs)
export const propImgInfo = [
	// First one is for null entry at 0, ignore it
	{xOff:0, yOff:0, xWid:1, yWid:1, obs:[]},
	// List starts here
	{xOff:-1, yOff:0, xWid:3, yWid:4, obs:[{xOff:0, yOff:0}]}
]

export async function loadAssets() {
	for(let i = 0; i < tileImgList.length; i++) {
		tileImgs.push(await loadImage(tileImgList[i]))
	}
	for(let i = 0; i < spriteImgList.length; i++) {
		spriteImgs.push(await loadImage(spriteImgList[i]))
	}
	propImgs.push(null)
	for(let i = 0; i < propImgList.length; i++) {
		propImgs.push(await loadImage(propImgList[i]))
	}
	return [tileImgs, spriteImgs, propImgs]
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
