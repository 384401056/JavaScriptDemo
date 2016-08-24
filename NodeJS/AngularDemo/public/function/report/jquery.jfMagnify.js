(function($) {
    'use strict';
    $.jfMagnify = function(element, options) {
        var plugin = this;
        var $element = $(element);
        var dataatts = $element.data();
        var ratioW;
        var ratioH;
        var maggedElCX = 0;
        var maggedZoneCY = 0;
        var magGlassCX = 0;
        var magGlassCY = 0;
        var $magGlass;
        var $magnifiedElement;
        var $magnifiedRing;
        var $magnifiedZone;
        var $aToMag;

        var defaults = {
            center: true,
            scale: 2,
            minScale: 2,
            maxScale: 12,
            defScale: 2,
            spend: 0.5,
            cursor: false,
            round: true,
            width: 130,
            height: 130,
            shadow: "0 8px 17px 0 rgba(0, 0, 0, 0.2)",
            border: "2px solid #EEEEEE",
            zIndex: 666,
            containment: element,
            magnifyGlass: '.magnify_glass',
            magnifiedElement: '.magnified_element',
            magnifiedRing: '.mg_ring',
            magnifiedZone: '.mg_zone',
            elementToMagnify: '.element_to_magnify'
        };

        plugin.settings = {};

        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options, dataatts);
            $aToMag = $element.find(plugin.settings.elementToMagnify);
            if($element.find(plugin.settings.magnifyGlass).length === 0){
                var magGlassStr = [];
                magGlassStr.push('<div class="magnify_glass">');
                magGlassStr.push('<div class="mg_ring"></div>');
                magGlassStr.push('<div class="mg_zone"></div>');
                magGlassStr.push('</div>');
                $element.prepend(magGlassStr.join(''));
            }
            $magGlass = $element.find(plugin.settings.magnifyGlass);
            $magnifiedRing = $element.find(plugin.settings.magnifiedRing);
            $magnifiedZone = $element.find(plugin.settings.magnifiedZone);
            $aToMag.css({
                "position": "relative"
            });
            $element.css({
                "overflow": "hidden",
                "position": "relative"
            });
            $magGlass.css({
                "position": "absolute",
                "visibility": "hidden",
                "cursor": plugin.settings.cursor ? "crosshair" : "none",
                "width": plugin.settings.width,
                "height": plugin.settings.height,
                "z-index": plugin.settings.zIndex,
            });
            $magnifiedRing.css({
                "width": "100%",
                "height": "100%",
                "position": "absolute",
                "background": "none",
                "pointer-events": "none",
                "-moz-box-shadow": plugin.settings.shadow,
                "-webkit-box-shadow": plugin.settings.shadow,
                "-ms-box-shadow": plugin.settings.shadow,
                "box-shadow": plugin.settings.shadow,
                "border": plugin.settings.border,
                "border-radius": plugin.settings.round ? "50%" : "none",
                "z-index": 20
            });
            $magnifiedZone.css({
                "width": "100%",
                "height": "100%",
                "position": "absolute",
                "left": 0,
                "top": 0,
                "background": "none",
                "pointer-events": "none",
                "overflow": "hidden",
                "border-radius": plugin.settings.round ? "50%" : "none",
                "z-index": 10
            });

            var cloned = $aToMag.clone(true);
            $magnifiedElement = $(cloned).removeAttr('id').addClass(plugin.settings.magnifiedElement.slice(1));
            $magnifiedZone.append($magnifiedElement);

            plugin.settings.scale = plugin.settings.defScale;

            $(window).bind("resize", setUpMagnify);
            $element.mouseenter(function() {
                $magGlass.mousewheel(function(event, delta) {
                    var scaleNum = plugin.settings.scale;
                    if(delta > 0) {
                        scaleNum += plugin.settings.spend;
                        if (scaleNum >= plugin.settings.maxScale) {
                            scaleNum = plugin.settings.maxScale;
                        };
                    }else {
                        scaleNum -= plugin.settings.spend;
                        if (scaleNum <= plugin.settings.minScale) {
                            scaleNum = plugin.settings.minScale;
                        };
                    }
                    plugin.settings.scale = scaleNum;
                    setUpMagnify();
                    return false;
                });
                $magGlass.css("visibility", "visible");
            });
            $element.mouseleave(function() {
                $magGlass.css({
                    "left": 0,
                    "top": 0,
                    "visibility":"hidden"
                });
                
                plugin.settings.scale = plugin.settings.defScale;
                setUpMagnify();
                if ($magGlass.is(':animated')) {
                    $magGlass.stop();
                }
            });

            $element.mousemove(function(e) {
              var glassW = $magGlass.width();
              var glassH = $magGlass.height();
              if($magGlass.css("visibility") == "hidden") {
            	  $magGlass.unmousewheel();
            	  $magGlass.mousewheel(function(event, delta) {
                      var scaleNum = plugin.settings.scale;
                      if(delta > 0) {
                          scaleNum += plugin.settings.spend;
                          if (scaleNum >= plugin.settings.maxScale) {
                              scaleNum = plugin.settings.maxScale;
                          };
                      }else {
                          scaleNum -= plugin.settings.spend;
                          if (scaleNum <= plugin.settings.minScale) {
                              scaleNum = plugin.settings.minScale;
                          };
                      }
                      plugin.settings.scale = scaleNum;
                      setUpMagnify();
                      return false;
                  });
            	  $magGlass.css({
                      "top": e.pageY - $aToMag.offset().top - glassH / 2,
                      "left": e.pageX - $aToMag.offset().left - glassW / 2,
                      "visibility": "visible"
                  });
              }else {
            	  $magGlass.css({
                      "top": e.pageY - $aToMag.offset().top - glassH / 2,
                      "left": e.pageX - $aToMag.offset().left - glassW / 2
                  });
              }
              
              plugin.update();
            });

            $magGlass.draggable({
                containment: plugin.settings.containment,
                drag: function() {
                    plugin.update();
                    if ($magGlass.is(':animated')) {
                        $magGlass.stop();
                    }
                },
            });

            $('img').attr('draggable', false);

            setUpMagnify();
            if ($magGlass.is(':animated')) {
                $magGlass.stop();
            }
        };

        function setUpMagnify() {
            $magnifiedElement.css({
                'transform-origin': 'top left',
                '-ms-transform-origin': 'top left',
                '-webkit-transform-origin': 'top left',
                '-moz-transform-origin': 'top left',
                'transform': 'scale(' + plugin.settings.scale + ',' + plugin.settings.scale + ')',
                '-ms-transform': 'scale(' + plugin.settings.scale + ',' + plugin.settings.scale + ')',
                '-webkit-transform': 'scale(' + plugin.settings.scale + ',' + plugin.settings.scale + ')',
                '-moz-transform': 'scale(' + plugin.settings.scale + ',' + plugin.settings.scale + ')',
                'top': '0',
                'width': $aToMag.get(0).getBoundingClientRect().width,
                'height': $aToMag.get(0).getBoundingClientRect().height,
            });
            var aToMagW = $aToMag.get(0).getBoundingClientRect().width;
            var bigW = $magnifiedElement.get(0).getBoundingClientRect().width;
            var aToMagH = $aToMag.get(0).getBoundingClientRect().height;
            var bigH = $magnifiedElement.get(0).getBoundingClientRect().height;


            ratioW = getRatio(aToMagW, bigW);
            ratioH = getRatio(aToMagH, bigH);

            if (plugin.settings.center) {
                maggedElCX = $magnifiedElement.parent().outerWidth() / 2;
                maggedZoneCY = $magnifiedElement.parent().outerHeight() / 2;
                magGlassCX = $magGlass.outerWidth() / 2;
                magGlassCY = $magGlass.outerWidth() / 2;
            }
            plugin.update();
        }

        plugin.update = function() {
            var scrollToX = flipNum(($magGlass.position().left + magGlassCX) / ratioW);
            var scrollToY = flipNum(($magGlass.position().top + magGlassCY) / ratioH);
            $magnifiedElement.css({
                'left': scrollToX + maggedElCX,
                'top': scrollToY + maggedZoneCY
            });
        };

        plugin.destroy = function() {
            $(window).unbind("resize", setUpMagnify);
            if ($magGlass.is(':animated')) {
                $magGlass.stop();
            }
            $magGlass.unbind();
            $magGlass.draggable("destroy");
            $magnifiedElement.remove();
            $element.unbind();
            $element.removeData('jfMagnify', plugin);
            plugin = null;
        };

        plugin.scaleMe = function(arg_scale) {
            plugin.settings.scale = arg_scale;
            setUpMagnify();
        };

        function getRatio(_num1, _num2) {
            var theNum;
            if (_num1 > _num2) {
                theNum = _num2 / _num1;
            } else {
                theNum = _num1 / _num2;
            }
            return theNum;
        }

        function flipNum(_num) {
            var theNum = _num * -1;
            return theNum;
        }
        plugin.init();
    };

    $.fn.jfMagnify = function(options) {
        return this.each(function() {
            if (undefined === $(this).data('jfMagnify')) {
                var plugin = new $.jfMagnify(this, options);
                $(this).data('jfMagnify', plugin);
            }
        });
    };
})(jQuery);