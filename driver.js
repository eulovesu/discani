var Discord = require("discord.js"), fs = require("fs");

global.bots = fs.readFileSync("tokens.txt","utf8").trim().split("\n").map(token => {
	var client = new Discord.Client();
	client.login(token);
	return client;
});

var fc = fs.readdirSync("rasters").length;
var frames = [];
for (let i = 1; i <= fc; i++) frames.push(fs.readFileSync(`rasters/frame${i}.png.txt`,"utf8"));

var bi = 0, fi = 0;

global.play = async function play() {
	let frame = frames[++fi];
	if (!frame) return;
	bots[++bi%bots.length].channels.resolve('978534843388407901').send('```'+frame+'```');
	setTimeout(play, 100);
}
