var Jimp = require("jimp"), fs = require("fs");

var pixels = [
	['⬛', 43],
	['⚫', 44],
	['🖤', 46],
	['🔳', 110],
	['🔲', 113],
	['🤍', 119],
	['⚪', 152],
	['⬜', 180]
];
var getpx = lum => pixels.reduce((prev,curr) => Math.abs(curr[1] - lum) < Math.abs(prev[1] - lum) ? curr : prev)[0];


async function rasterize(file) {
	var img = await Jimp.read(file);
	var raster = "";
	for (let y = 0; y < img.bitmap.height; y++) {
		for (let x = 0; x < img.bitmap.width; x++) {
			let {r,g,b} = Jimp.intToRGBA(img.getPixelColor(x,y));
			let lum = Math.floor((r+g+b)/3);
			raster += getpx(lum);
		}
		raster += '\n';
	}
	return raster;
}

fs.readdirSync("frames").forEach(async file => {
	var raster = await rasterize(`frames/${file}`);
	fs.writeFileSync(`rasters/${file}.txt`, raster);
});