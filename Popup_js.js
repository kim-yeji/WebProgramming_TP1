/* 레이어 팝업 */
function layer_open() {
	var temp = document.getElementById('addLayer');
	var bg = document.getElementById('backLayer');
	var layer = document.getElementById('layerId');

	if (bg) {
		layer.style.display = 'block';
	} else {
		temp.style.display = 'block';
	}

	var width = (window.innerWidth - parseInt(temp.style.width)) / 2;
	var height = 170;
	// var height = (window.innerHeight - parseInt(temp.style.height))/3;
	temp.style.left = width + 'px';
	temp.style.top = height + 'px';

	document.getElementById('btnClose').onclick = function(e) {
		if (bg) {
			layer.style.display = 'none';
		} else {
			temp.style.display = 'none';
		}
		e.preventDefault();
		/*웹을 이용하다가 backspace를 누르면 이전페이지로 넘어가거나 tab키를 누를때 다음 DOM 객체로 넘어갈 때가 있는데
		preventDefault()는 이것들을 방지한다. 단순히 click에 대한 처리를 하도록 해준다.*/
	}
}
