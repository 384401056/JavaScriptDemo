/**
 * 天气js
 */

angular
	.module('app')
	.directive(
		'weather',
		function() {
			var directive = {};
			
			directive.restrict = 'E';
            directive.template = "<c ng-repeat='x in resweather | limitTo:1'> <c ng-repeat='y in x.weather_data | limitTo:1'> {{resdate.substring(0, 4)+'年'}} {{y.date.split(' ')[1]+'&nbsp;&nbsp;&nbsp;&nbsp;'+nowtime.getHours()+':'+nowtime.getMinutes()+':'+(nowtime.getSeconds()> 9 ? nowtime.getSeconds() : +'0'+nowtime.getSeconds())+'&nbsp;&nbsp;&nbsp;&nbsp;'+y.date.split(' ')[0] +'&nbsp;&nbsp;&nbsp;&nbsp;'+ x.currentCity +'&nbsp;&nbsp;&nbsp;&nbsp;'+ y.temperature+'&nbsp;&nbsp;&nbsp;&nbsp;'+y.date.split(' ')[2]}}<c ng-repeat='z in resdatenation.f1 | limitTo:1'><img src=img/weatherpic/{{z.fa==''?+'night/'+z.fb:+'day/'+z.fa}}.png width=20 height=20/> {{z.fa==''?tq[z.fb]:tq[z.fa]}}&nbsp;&nbsp;&nbsp;&nbsp;{{z.fg==''?fl[z.fh]:fl[z.fg]}}&nbsp;&nbsp;&nbsp;&nbsp;{{z.fe==''?fx[z.ff]:fx[z.fe]}} </c></c></c>";
			return directive;
		});