// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   ['plugins/jquery/charts/easypiechart/jquery.easy-pie-chart.js'],
      sparkline:      ['plugins/jquery/charts/sparkline/jquery.sparkline.min.js'],
      plot:           ['plugins/jquery/charts/flot/jquery.flot.min.js', 
                          'plugins/jquery/charts/flot/jquery.flot.resize.js',
                          'plugins/jquery/charts/flot/jquery.flot.tooltip.min.js',
                          'plugins/jquery/charts/flot/jquery.flot.spline.js',
                          'plugins/jquery/charts/flot/jquery.flot.orderBars.js',
                          'plugins/jquery/charts/flot/jquery.flot.pie.min.js'],
      slimScroll:     ['plugins/jquery/slimscroll/jquery.slimscroll.min.js'],
      sortable:       ['plugins/jquery/sortable/jquery.sortable.js'],
      nestable:       ['plugins/jquery/nestable/jquery.nestable.js',
                          'plugins/jquery/nestable/nestable.css'],
      filestyle:      ['plugins/jquery/file/bootstrap-filestyle.min.js'],
      slider:         ['plugins/jquery/slider/bootstrap-slider.js',
                          'plugins/jquery/slider/slider.css'],
      chosen:         ['plugins/jquery/chosen/chosen.jquery.min.js',
                          'plugins/jquery/chosen/chosen.css'],
      TouchSpin:      ['plugins/jquery/spinner/jquery.bootstrap-touchspin.min.js',
                          'plugins/jquery/spinner/jquery.bootstrap-touchspin.css'],
      wysiwyg:        ['plugins/jquery/wysiwyg/bootstrap-wysiwyg.js',
                          'plugins/jquery/wysiwyg/jquery.hotkeys.js'],
      dataTable:      ['plugins/jquery/datatables/jquery.dataTables.min.js',
                          'plugins/jquery/datatables/dataTables.bootstrap.js',
                          'plugins/jquery/datatables/dataTables.bootstrap.css'],
      vectorMap:      ['plugins/jquery/jvectormap/jquery-jvectormap.min.js', 
                          'plugins/jquery/jvectormap/jquery-jvectormap-world-mill-en.js',
                          'plugins/jquery/jvectormap/jquery-jvectormap-us-aea-en.js',
                          'plugins/jquery/jvectormap/jquery-jvectormap.css'],
      footable:       ['plugins/jquery/footable/footable.all.min.js',
                          'plugins/jquery/footable/footable.core.css']
      }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: [
              {
                  name: 'ngGrid',
                  files: [
                      'plugins/modules/ng-grid/ng-grid.min.js',
                      'plugins/modules/ng-grid/ng-grid.min.css',
                      'plugins/modules/ng-grid/theme.css'
                  ]
              },
              {
                  name: 'ui.select',
                  files: [
                      'plugins/modules/angular-ui-select/select.min.js',
                      'plugins/modules/angular-ui-select/select.min.css'
                  ]
              },
              {
                  name:'angularFileUpload',
                  files: [
                    'plugins/modules/angular-file-upload/angular-file-upload.min.js'
                  ]
              },
              {
                  name:'ui.calendar',
                  files: ['plugins/modules/angular-ui-calendar/calendar.js']
              },
              {
                  name: 'ngImgCrop',
                  files: [
                      'plugins/modules/ngImgCrop/ng-img-crop.js',
                      'plugins/modules/ngImgCrop/ng-img-crop.css'
                  ]
              },
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      'plugins/modules/angular-bootstrap-nav-tree/abn_tree_directive.js',
                      'plugins/modules/angular-bootstrap-nav-tree/abn_tree.css'
                  ]
              },
              {
                  name: 'toaster',
                  files: [
                      'plugins/modules/angularjs-toaster/toaster.js',
                      'plugins/modules/angularjs-toaster/toaster.css'
                  ]
              },
              {
                  name: 'textAngular',
                  files: [
                      'plugins/modules/textAngular/textAngular-sanitize.min.js',
                      'plugins/modules/textAngular/textAngular.min.js'
                  ]
              },
              {
                  name: 'vr.directives.slider',
                  files: [
                      'plugins/modules/angular-slider/angular-slider.min.js',
                      'plugins/modules/angular-slider/angular-slider.css'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular',
                  files: [
                      'plugins/modules/videogular/videogular.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.controls',
                  files: [
                      'plugins/modules/videogular/plugins/controls.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.buffering',
                  files: [
                      'plugins/modules/videogular/plugins/buffering.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.overlayplay',
                  files: [
                      'plugins/modules/videogular/plugins/overlay-play.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.poster',
                  files: [
                      'plugins/modules/videogular/plugins/poster.min.js'
                  ]
              },
              {
                  name: 'com.2fdevs.videogular.plugins.imaads',
                  files: [
                      'plugins/modules/videogular/plugins/ima-ads.min.js'
                  ]
              }
          ]
      });
  }])
;