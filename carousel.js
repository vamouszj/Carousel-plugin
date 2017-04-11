(function(global, factory, plug) {
	factory(global.jQuery, plug);
})(window, function($, plug) {
	var _DEFAULTS_ = {
		Automatic : true,
		Data : 2000,
		initEvent : 'click'
	};

	$.fn[plug] = function(options) {  //在jQuery的原型之上扩展的方法  $.fn[plug]
		//得到所有的li
		//console.log(this);   //此处的this是一个jQuery对象，谁调用plug方法，这个this就指向的是谁
		var $dots = $(this).find("ol").find("li");
		var num = $dots.length - 1;
		var _this = $(this);
		var $width = _this.width();
		var time = 0;
		var $index = 0;

		$.extend(this, _DEFAULTS_, options);
		//extend给当前的对象扩展属性（原来的要，扩展的也要）    以默认为优先  以用户配置为覆盖
		$dots.on(this.initEvent, function() {
			//停止定时器
			clearInterval(time);
			$but = $(this);
			$index = $but.index();    //前面的Img数目

			$but.addClass('active').siblings('li').removeClass('active');
			$('.scroll').animate({left: -$index*$width}, _this.Data);

			//开启定时器
			play();
		});
		$('.prev').click(function() {
			controlPreAndNext(false);
		});
		$('.next').click(function() {
			controlPreAndNext(true);
		});

		function controlPreAndNext(isNext) {
			clearInterval(time);
			
			switch(isNext) {
				case false : 
					$index--;
					$index = $index < 0 ? num : $index;
					break;
				case true : 
					$index++;
					$index = $index > num ? 0 : $index;
					break;
				default :
					break;
			}

			if($index < 0) {
				$index = num;
			}
			$('.scroll').animate({left: -$index*$width}, _this.Data);
			$dots.eq($index).addClass('active').siblings('li').removeClass('active');
			play();
		}


		if(this.Automatic) {
			play();
		}
 
		function play() {
			time = setInterval(function() {
				$index++;
				if($index > num) {
					$('.scroll').css("left", 0);
					$index = 0;
				}
				$('.scroll').animate({left : -$index*$width}, _this.Data);
				$dots.eq($index).addClass('active').siblings('li').removeClass('active');

			}, 4000);
		}


	};

}, "carousel");


(function(root, fun, options) {
	fun(root, options);
})(window, function() {
	
}, "name");    //这里可以写window.jQuery