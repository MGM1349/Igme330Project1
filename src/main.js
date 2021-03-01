import * as utils from "./utils.js";

function init(){
	let canvas = document.querySelector('canvas');
	let ctx = canvas.getContext('2d');
    ctx.fillRect(0,0,800,600);
}

export{init};