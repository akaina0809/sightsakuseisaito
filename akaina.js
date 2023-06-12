function convert() {
	let name = document.getElementById("name").value
	let honbun = document.getElementById("honbun").value
	let resultbox = document.getElementById("result")
	let copybtn = document.getElementById("copy_btn")
	let downloadbtn = document.getElementById("download_btn")
	copybtn.value = "コピーする";

	let resultpanel =   `///*///${name.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\t/g, '\\t')}///*///\n\nimport {world,system} from"@minecraft/server";import {ActionFormData,ModalFormData}from"@minecraft/server-ui";system.events.beforeWatchdogTerminate.subscribe(data => {data.cancel = true});\n\n\nworld.events.beforeChat.subscribe(ev => {`

	if (name === '') {
		window.alert('オリジナル名が空欄です。\n名前には分かりやすい名前を入力してください。')
		return;
	}


	for (let i = 0; i < honbun.split('\n').length; i++) {
		console.log(i)
		let currentgyou = honbun.split(/\r\n|\r|\n/)[i].replace(/\\/g, '\\\\')
		if (i > 0) resultpanel = resultpanel + '\n'
		if (currentgyou.startsWith('h>')) {
			resultpanel = resultpanel +  `player.runCommandAsync('${currentgyou.replace('h>', '')}');}`
			continue
		}

		//HSPで作ってたときのやつと互換性を維持するためのやつ
		if (currentgyou.startsWith('htp:h>')) {
			resultpanel = resultpanel + `
			     player.runCommandAsync(${currentgyou.replace('htp:h>', '')})';}`
			continue
		}


	
	resultpanel = resultpanel + `
	      if (ev.message.startsWith("${currentgyou}")) {
	        ev.cancel = true;
	        const player = ev.sender;`
	}
	resultpanel = resultpanel + '});'
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
