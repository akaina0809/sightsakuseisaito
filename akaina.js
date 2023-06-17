function convert() {
	let name = document.getElementById("name").value
	let honbun = document.getElementById("honbun").value
	let resultbox = document.getElementById("result")
	let copybtn = document.getElementById("copy_btn")
	let downloadbtn = document.getElementById("download_btn")
	copybtn.value = "コピーする";

	let resultpanel =   `///*///${name.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\t/g, '\\t')}///*///\n\nimport { world } from "@minecraft/server";
world.beforeEvents.chatSend.subscribe((eventData) => {
const player = eventData.sender;`

	if (name === '') {
		window.alert('オリジナル名が空欄です。\nコマンド名には分かりやすい名前を入力してください。')
		return;
	}
//${currentgyou.replace('h>', '')}//

	for (let i = 0; i < honbun.split('\n').length; i++) {
		console.log(i)
		let currentgyou = honbun.split(/\r\n|\r|\n/)[i].replace(/\\/g, '\\\\')
		if (i > 0) resultpanel = resultpanel + '\n'
		if (currentgyou.startsWith('h>')) {
			resultpanel = resultpanel +  `
		case '${currentgyou.replace('h>', '')}':
	eventData.cancel = true;`
			continue
		}
		if (currentgyou.startsWith('c>')) {
			resultpanel = resultpanel +  `player.runCommandAsync('${currentgyou.replace('c>', '')}');
			break;`
			continue
		}

		//HSPで作ってたときのやつと互換性を維持するためのやつ
		if (currentgyou.startsWith('htp:h>')) {
			resultpanel = resultpanel + `
		case '${currentgyou.replace('htp:h>', '')}':
	eventData.cancel = true;`
			continue
		}

		if (currentgyou.startsWith('htp:c>')) {
			resultpanel = resultpanel + `player.runCommandAsync('${currentgyou.replace('htp:c>', '')}');
			break;`
			continue
		}


	
	resultpanel = resultpanel + `
	if (!player.hasTag('${currentgyou}')) return;
	switch (eventData.message) {`
	}
	resultpanel = resultpanel + '\ndefault: break;}});'
	resultbox.value = resultpanel
	downloadbtn.disabled = false;
	copybtn.disabled = false;
}

function copy_to_clip() {
	let resultbox = document.getElementById("result")
	let copybtn = document.getElementById("copy_btn")
	if (navigator.clipboard) {
		navigator.clipboard.writeText(resultbox.value)
		copybtn.value = "コピーしました!";
	} else {
		alert("大変申し訳ありませんが、お使いのブラウザはクリップボードにコピーに対応しておりません。\nResult欄から手動でコピーしてください。");
	}
}

function download_file() {
	let content = document.getElementById("result").value;
	let blob = new Blob([ content ], { "type": "text/plain" });
	let link = document.createElement('a');
	link.download = "main.js";
	link.href = URL.createObjectURL(blob);
	link.click();
	URL.revokeObjectURL(link.href)
}
