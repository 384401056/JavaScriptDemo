//判断事件兼容性
function myAddEvent(obj, sEvent, fn) {
	if (obj.attachEvent()) {
		obj.attachEvent('on' + sEvent, fn);
	} else {
		obj.addEventListener(sEvent, fn, false);
	}
}

window.onload = function() {
	var oImg = $("#img_map");
	console.log(oImg+"123");
	var _value = $("._value");
	var _group = $("._group");
	var iNum = 1;

	function handMouseWheel(ev) {
		var oEvent = ev || event;
		var oBtn = true;

		oBtn = oEvent.wheelDelta ? oEvent.wheelDelta < 0 : oEvent.detail > 0;

		if (oBtn) {
			//向下滚动触发事件
			iNum += 0.05;
			oImg.style.transform = 'scale(' + iNum + ')';
			_value.show();
			_group.show();
			console.log(iNum);
		} else {
			//向上滚动触发事件
			console.log(oLable.length);
			iNum -= 0.05;

			if (iNum <= 0.5) {
				iNum = 0.5;
				_value.hide();
				_group.hide();
			}
			oImg.style.transform = 'scale(' + iNum + ')';
			console.log(iNum);
		}
		if (oEvent.preventDefault) {
			oEvent.preventDefault();
		}
		return false;
	}

	myAddEvent(oImg, 'mousewheel', handMouseWheel);
	myAddEvent(oImg, 'DOMMouseScroll', handMouseWheel);
}