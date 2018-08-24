
var YOIL = [ "Mon", "Tue", "Wed", "Thu", "Fri" ];

//header에 있는 addToDo버튼을 눌렀을 때 실행되는 동작들
function addTodo(){
	  //초기화
	var itemDay = document.getElementById("itemDay");
	var itemPrior = document.getElementById("itemPrior");
	var itemName = document.getElementById("itemName");
	var itemContent = document.getElementById("itemContent");

	layer_open("addLayer");

	//팝업창 뜰 때 초기화
	itemDay.value = "Mon";
	itemPrior.value = "";
	itemName.value = "";
	itemContent.value = "";


	  //처음 add창에는 우선순위가 보이지 않음
	document.getElementById("priorDiv").style.display = 'none';
	document.getElementById("btnLayer").value = "Add";
	  //btnLayer 누르면 addItem함수를 호출함
	document.getElementById("btnLayer").onclick = function(){

			addItem();

	}
}


//아이템(일정적힌 박스)을 요일섹션에 집어넣는다
function addItem(){
	var itemDay = document.getElementById("itemDay");
	var itemName = document.getElementById("itemName");
	var itemContent = document.getElementById("itemContent");

	if(!itemName.value){
		alert('제목을 입력하세요.');
		return;
	}
	if(! itemContent.value ){
		alert('내용을 입력하세요.');
		return;
	}

 	var num = 1;
	//만약 요일 리스트가 한 개 이상 존재한다면, 요일 리스트 중에 가장 마지막에 있는 Item의 우선순위에 +1을 한다.
 	if(document.getElementById(itemDay.value).lastChild.lastChild){
 		num = parseInt(document.getElementById(itemDay.value).lastChild.lastChild.getAttribute('prior')) + 1;
 	}

	//--- Item 생성시작  ---//
	var iBoxDiv = document.createElement("div");
 	iBoxDiv.className = 'iBox';
  iBoxDiv.setAttribute('prior', num);
  iBoxDiv.setAttribute('content', itemContent.value);
 	var iCloseDiv = document.createElement("div");
 	iCloseDiv.className = 'rAr';
 	var iCloseSpan = document.createElement("img");
 	iCloseSpan.className = 'iClose';
 	iCloseSpan.appendChild(document.createElement("img"));
  iCloseSpan.setAttribute('src',"img/remove-symbol.png");
 	iCloseSpan.onclick = function(){
 	    this.parentNode.parentNode.remove();
 	};
 	iCloseDiv.appendChild(iCloseSpan);
 	var itemNameDiv = document.createElement("div");
 	itemNameDiv.className = 'itemC';
 	itemNameDiv.appendChild(document.createTextNode(itemName.value));

 	iBoxDiv.appendChild(iCloseDiv);
 	iBoxDiv.appendChild(itemNameDiv);
 	iBoxDiv.onclick = function(){
 		modPopup(this);
 	};
 	//--- Item 생성 끝 ---//

	//DOM에 추가
 	document.getElementById(itemDay.value).lastChild.appendChild(iBoxDiv);

 	//레이어팝업 닫기
	document.getElementById("btnClose").click();
}

//아이템을 누르면 수정창이 뜬다.
function modPopup(obj){
	var day = obj.parentNode.parentNode.getAttribute("id");
	var prior = obj.getAttribute("prior");
	var itemName = obj.lastChild.innerText;
	var itemContent = obj.getAttribute("content");

	layer_open();

	  //숨겼었던 우선순위 박스를 보여준다.
	document.getElementById("priorDiv").style.display = 'block';
  //기존에 작성한 값을 셋팅
	document.getElementById("itemDay").value = day;
	document.getElementById("itemPrior").value = prior;
	document.getElementById("itemName").value = itemName;
	document.getElementById("itemContent").value = itemContent;
//확인버튼의 글자와 이벤트를 수정한다
	document.getElementById("btnLayer").value = "Done";
	document.getElementById("btnLayer").onclick = function(){
		modItem(obj);
	}
}

//수정-> 기존의 박스르 ㄹ삭제하고 새로운 박스로 교체해준다.
function modItem(obj){
  //새로 작성한 값
	var itemDay = document.getElementById("itemDay");
	var itemPrior = document.getElementById("itemPrior");
	var itemName = document.getElementById("itemName");
	var itemContent = document.getElementById("itemContent");


	if(!itemName.value){
		alert('제목을 입력하세요.');
		return;
	}
	if(! itemContent.value ){
		alert('내용을 입력하세요.');
		return;
	}

  //--- Item 생성시작  ---//
  var iBoxDiv = document.createElement("div");
  iBoxDiv.className = 'iBox';
  iBoxDiv.setAttribute('prior', itemPrior.value);
  iBoxDiv.setAttribute('content', itemContent.value);
  var iCloseDiv = document.createElement("div");
  iCloseDiv.className = 'rAr';
  var iCloseSpan = document.createElement("img");
  iCloseSpan.className = 'iClose';
  iCloseSpan.appendChild(document.createElement("img"));
    iCloseSpan.setAttribute('src',"img/remove-symbol.png");
  iCloseSpan.onclick = function(){
      this.parentNode.parentNode.remove();
  };
  iCloseDiv.appendChild(iCloseSpan);
  var itemNameDiv = document.createElement("div");
  itemNameDiv.className = 'itemC';
  itemNameDiv.appendChild(document.createTextNode(itemName.value));

  iBoxDiv.appendChild(iCloseDiv);
  iBoxDiv.appendChild(itemNameDiv);

  iBoxDiv.onclick = function(){
    modPopup(this);
  };
  //--- Item 생성 끝 ---//

 	//기존 Item 삭제
 	obj.remove();

//요일 밑에 있는 박스들을 nodes에 저장해준다(배열형식)
	var nodes = document.getElementById(itemDay.value).lastChild.childNodes;

	if(nodes.length == 0){		//일정이 하나도 없는경우(아이템박스가 하나 있다가 삭제되고 다시 생성 될 때)
		document.getElementById(itemDay.value).lastChild.appendChild(iBoxDiv);
	}
	//리스트가 한 개 이상일 경우
	else{
		var chk = -1;
		for(var i=0; i<nodes.length; i++){
			if(nodes[i].getAttribute('prior') < itemPrior.value){
				continue;
			}else{
			 	nodes[i].parentNode.insertBefore(iBoxDiv, nodes[i]);
				chk = i;
				break;
			}
		}
		  //chk -1인 경우는 새로 생성한 Item의 우선순위가 가장 낮을경우임 (맨 뒤에 생성해줘야한다)
		if(chk == -1){
			document.getElementById(itemDay.value).lastChild.appendChild(iBoxDiv);
		}
	}

	  //레이어 팝업창 닫기
	document.getElementById("btnClose").click();
}


//일정의 title이나 요일로 검색한다.
function searchItem() {
	var itemDay = document.getElementById("searchDay").value;
	var itemName = document.getElementById("searchItem").value;
	if (itemName.trim().length == 0) {  //trim은 공백을 제거해준다. 공백을 제거한 길이가 0이라면 빈칸이라는 뜻
		itemName = "";
	}

	  //모든 일정들을 일단 숨긴다
	var elements = document.getElementsByClassName("iBox");//아이템들을 배열에 넣어넣어~
	for (var n = 0; n < elements.length; n++) {
		elements[n].style.display = 'none';
	}


	if (itemDay != "" && itemName != "") {			//====[1] day검색어와 item검색어 두 개를 이용해서 검색 하고 싶을 때
		for (var i = 0; i < YOIL.length; i++) {
			if (YOIL[i] == itemDay) {
				var itemList = document.getElementById(YOIL[i]).lastChild.childNodes;
				if (itemList != null) {
					for (var j = 0; j < itemList.length; j++) {
						if (itemList[j].lastChild.innerText == itemName) {
							itemList[j].style.display = 'block';
						}
					}
				}
			}
		}
	} else {
		if (itemDay != "") {		//====[2] 요일별로만 검색 하고 싶을 때
			var itemList = document.getElementById(itemDay).lastChild.childNodes;
			for (var j = 0; j < itemList.length; j++) {
				itemList[j].style.display = 'block';
			}
		} else if (itemName != "") {		  //====[3] Title만 검색 하고 싶을 때
			for (var i = 0; i < YOIL.length; i++) {
				var itemList = document.getElementById(YOIL[i]).lastChild.childNodes;
				if (itemList != null) {
					for (var j = 0; j < itemList.length; j++) {
						if (itemList[j].lastChild.innerText == itemName) {
							itemList[j].style.display = 'block';
						}
					}
				}
			}
		} else {		 //====[4] 모두 다 보여준다.
			elements = document.getElementsByClassName("iBox");
			for (var n = 0; n < elements.length; n++) {
				elements[n].style.display = 'block';
			}
		}
	}

}
