myApp.directive('wangeditor', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            // 初始化 编辑器内容
            if (!ngModel) {
                return;
            } // do nothing if no ng-model
            // Specify how UI should be updated
            ngModel.$render = function() {
                element.html(ngModel.$viewValue || '');
            };
            // Listen for change events to enable binding
            element.on('blur keyup change', function() {
                scope.$apply(readViewText);
            });
            // No need to initialize, AngularJS will initialize the text based on ng-model attribute
            // Write data to the model
            function readViewText() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if (attrs.stripBr && html === '<br>') {
                    html = '';
                }
                ngModel.$setViewValue(html);
            }
            // 创建编辑器
            var editor = new wangEditor(element);
            //去掉定位，由于路由一变化，地图会报错，所以暂时去掉
            editor.config.menus = $.map(wangEditor.config.menus, function(item, key) {
                 if (item === 'location') {
                     return null;
                 }
                 return item;
             });
            // editor.$editorContainer.css('z-index', 20);
            editor.config.mapAk = 'gGFTp2HHbC4mqtcld5zZVwh66g5rl5GR';
            editor.config.uploadImgUrl = 'http://127.0.0.1:3000/files/upload';
            editor.config.uploadImgFileName = 'pic';
            editor.config.uploadImgFns.onload = function(resultText, xhr) {
                var url = resultText;
                var originalName = editor.uploadImgOriginalName || '';
                // var url = JSON.parse(jsonResult) && JSON.parse(jsonResult).entity.newFileName;
                editor.command(null, 'insertHtml', '<img src="' + url + '" alt="' + originalName + '" style="max-width:100%;"/>');
                // 如果不想要 img 的 max-width 样式，也可以这样插入：
                // editor.command(null, 'InsertImage', resultText);
            };

            // 自定义timeout事件
            editor.config.uploadImgFns.ontimeout = function(xhr) {
                alert('上传超时');
            };
            // 自定义error事件
            editor.config.uploadImgFns.onerror = function(xhr) {
                alert('上传错误');
            };
            editor.create();
        }
    };
});
