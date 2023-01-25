function setUI()
{
	let buttons = []
	let vsliders = []
	let hsliders = []
	let chkboxs = []
    	
	let code = chuckEditor.getValue()
	let lines = code.split("\n")
	for(var i = 0; i < lines.length; i++){
		var temp = lines[i].split(" ")
		for(var j = 0; j < temp.length; j++){
			if(temp[j] === "global"){
				if(temp[j+1] === "float"){
					vsliders.push(temp[j+2].replace(';',''))
				}
				if(temp[j+1] === "Event"){
					buttons.push(temp[j+2].replace(';',''))
				}
				if(temp[j+1] === "int"){
					if(temp[j+3] === "//gui" && temp[j+4] === "bool"){
						chkboxs.push(temp[j+2].replace(';',''))
					} else {
						hsliders.push(temp[j+2].replace(';',''))
					}
				}
			}
		}
	}
		
	var Panel
		
	try{
		Panel = document.getElementById("panel")
	} catch (exceptionVar) {

	}

	let declaring = ""
		
	for(var i = 0; i < vsliders.length; i++){
		declaring += "let "+vsliders[i]+" = 0;\n"
	}

	for(var i = 0; i < chkboxs.length; i++){
		declaring += "let "+chkboxs[i]+" = false;\n"
	}
		
	for(var i = 0; i < hsliders.length; i++){
		declaring += "let "+hsliders[i]+" = 0;\n"
	}
	
	let p5header = "//This code as autogenerated by webChuckUI\n"
	declaring += `document.addEventListener("touchmove", (e) => {}, { passive: false });

let cnv

let dark
let darkOff

function setup() {
	//cnv = createCanvas(${Panel.offsetWidth}, ${Panel.offsetHeight})
	cnv = createCanvas(800, 600)
	cnv.id("p5Canvas")
	cnv.parent("panel")
	cnv.style('display','none')
	${darkMode ? "cnv.class('p5Canvas dark')" : ""}
	cnv.style('position','sticky')
	cnv.style('top','0px')
	cnv.style('min-width','100%')
	cnv.style('min-height','100%')
}

function windowResized() {
    //resizeCanvas(${Panel.offsetWidth}, ${Panel.offsetHeight})
}

function draw() {
darkOn = 255
darkOff = 0
background(darkOn);
fill(darkOff);
textSize(6);

`		
	//TODO: - Make all measures relative to canvas not fixed px
	//      - Set main grids to fit some posible (general) scenarios

	for(var i = 0; i < vsliders.length; i++){
		declaring += "fill(darkOff)\n"
		//declaring += 'text("'+vsliders[i].slice(0, 8)+'",'+((35*i)+(hsliders[i] ? 240 : 20))+",80);\n"
		//declaring += vsliders[i] + " = vslider(" + vsliders[i]+","+((35*i)+(hsliders[i] ? 250 : 30))+",90,"+Panel.offsetHeight*0.7+",0,1);\n"
		declaring += 'text("'+vsliders[i].slice(0, 8)+'",'+((35*i)+(chkboxs[i] ? Math.ceil(Panel.offsetWidth*0.6) : 20))+",80)\n"
		declaring += vsliders[i] + " = vslider(" + vsliders[i]+","+((35*i)+(chkboxs[i] ? Math.ceil(Panel.offsetWidth*0.6) : 30))+",90,"+Math.ceil(Panel.offsetHeight*0.7)+",0,1)\n"
	}

	for(var i = 0; i < hsliders.length; i++){
		declaring += "fill(darkOff);\n"
		declaring += 'text("'+hsliders[i].slice(0, 8)+'",20,'+((35*i)+85)+");\n"
		declaring += hsliders[i] + " = slider(" + hsliders[i]+",20,"+((35*i)+90)+",200,0,100);\n"
	}

	for(var i = 0; i < chkboxs.length; i++){
		declaring += "fill(darkOff)\n"
		declaring += 'text("'+chkboxs[i].slice(0, 8)+'",'+ ((i%8*40)+10) + ","+(i < 8 ? 10 : 50)+")\n"
		declaring += `fill(${chkboxs[i]} ? 60 : 200)\n`
		declaring += chkboxs[i] + " = checkbox("+chkboxs[i]+","+ ((i%8*40)+10) + ","+ (i < 8 ? 10 : 50) +",30,30)\n"
	}

	for(var i = 0; i < buttons.length; i++){
		declaring += "fill(darkOff);\n"
		declaring += 'text("'+buttons[i].slice(0, 8)+'",'+ ((i*60)+10) + ",10)\n"
		declaring += "fill(darkOn);\n"
		declaring += "if(button(" + ((i*60)+10) + ",10,50,50)){"+"theChuck.broadcastEvent("+'"'+buttons[i]+'")}\n'
	}
		
	declaring += "activateGUI();\n"
	declaring += `if(mouseIsPressed) {\n`
	declaring += 'if(theChuck){\n'

	for(var i = 0; i < vsliders.length; i++){
		declaring += 'theChuck.setFloat("'+vsliders[i]+'",'+vsliders[i]+")\n"
	}

	for(var i = 0; i < hsliders.length; i++){
		declaring += 'theChuck.setInt("'+hsliders[i]+'",int('+hsliders[i]+"))\n"
	}

	for(var i = 0; i < chkboxs.length; i++){
		declaring += 'theChuck.setInt("'+chkboxs[i]+'",int('+chkboxs[i]+"))\n"
	}

	declaring += '}\n}\n}'
	//TODO fix reposition and size on windowResize
		
	var script = p5header + declaring
	// Debug autogenerated code here:
	//console.log(script)
	return script
}
    	
function UI(){
	window.location.reload(true)
}

eval(setUI())
    
let graphicStatus = 2

function drawing(s){

	var console = document.getElementById("console")
	var visCanvas = document.getElementById("canvas")
	var p5can = document.getElementById("p5Canvas")
	graphicStatus = s

  	switch(graphicStatus){
		case 0:
			console.style.display = 'none'
			visCanvas.style.display = 'none'
			p5can.style.display = 'flex'
		break;
		case 1:
			console.style.display = 'none'
			p5can.style.display = 'none'
			visCanvas.style.display = 'flex'
		break;
		case 2:
			visCanvas.style.display = 'none'
			p5can.style.display = 'none'
			console.style.display = 'flex'
		break;
	}
}
  
