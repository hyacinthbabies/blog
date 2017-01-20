/**
 * calendarDemoApp - 0.1.3
 */

myApp.controller('FullcalendarCtrl', ['$scope', '$modal', '$filter', function($scope, $modal, $filter) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    /* event source that pulls from google.com */
    $scope.eventSource = {
        url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
        className: 'gcal-event', // an option!
        currentTimezone: 'America/Chicago' // an option!
    };

    /* event source that contains custom events on the scope */
    $scope.events = [
        // { title: 'All Day Event', start: new Date(y, m, 1), className: ['b-l b-2x b-info'], location: 'New York', info: 'This a all day event that will start from 9:00 am to 9:00 pm, have fun!' },
        // { title: 'Dance class', start: new Date(y, m, 3), end: new Date(y, m, 4, 9, 30), allDay: false, className: ['b-l b-2x b-danger'], location: 'London', info: 'Two days dance training class.' },
        // { title: 'Game racing', start: new Date(y, m, 6, 16, 0), className: ['b-l b-2x b-info'], location: 'Hongkong', info: 'The most big racing of this year.' },
        // { title: 'Soccer', start: new Date(y, m, 8, 15, 0), className: ['b-l b-2x b-info'], location: 'Rio', info: 'Do not forget to watch.' },
        // { title: 'Family', start: new Date(y, m, 9, 19, 30), end: new Date(y, m, 9, 20, 30), className: ['b-l b-2x b-success'], info: 'Family party' },
        // { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2), className: ['bg-success bg'], location: 'HD City', info: 'It is a long long event' },
        // { title: 'Play game', start: new Date(y, m, d - 1, 16, 0), className: ['b-l b-2x b-info'], location: 'Tokyo', info: 'Tokyo Game Racing' },
        // { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false, className: ['b-l b-2x b-primary'], location: 'New York', info: 'Party all day' },
        // { title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), alDay: false, className: ['b-l b-2x b-warning'], location: 'Home Town', info: 'Repeat every day' },
        // { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/', className: ['b-l b-2x b-primary'] },
        // { title: 'Feed cat', start: new Date(y, m + 1, 6, 18, 0), className: ['b-l b-2x b-info'] }
    ];

    /* alert on dayClick */
    $scope.precision = 400;
    $scope.lastClickTime = 0;
    $scope.alertOnEventClick = function(date, jsEvent, view) {
        var time = new Date().getTime();
        if (time - $scope.lastClickTime <= $scope.precision) {
            $scope.events.push({
                title: 'New Event',
                start: date,
                className: ['b-l b-2x b-info']
            });
        }
        $scope.lastClickTime = time;
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    $scope.overlay = $('.fc-overlay');
    $scope.alertOnMouseOver = function(event, jsEvent, view) {
        $scope.event = event;
        $scope.overlay.removeClass('left right').find('.arrow').removeClass('left right top pull-up');
        var wrap = $(jsEvent.target).closest('.fc-event');
        var cal = wrap.closest('.calendar');
        var left = wrap.offset().left - cal.offset().left;
        var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
        if (right > $scope.overlay.width()) {
            $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
        } else if (left > $scope.overlay.width()) {
            $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
        } else {
            $scope.overlay.find('.arrow').addClass('top');
        }
        (wrap.find('.fc-overlay').length == 0) && wrap.append($scope.overlay);
    }

    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: true,
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            //设置语言是为了不走calendar.js的默认配置
            lang: 'zh',
            dayNamesShort: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            dayClick: $scope.alertOnEventClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventMouseover: $scope.alertOnMouseOver
        }
    };

    /* add custom event*/
    $scope.addEvent = function() {
        $scope.open();
    };

    /* remove event */
    $scope.remove = function(index) {
        $scope.events.splice(index, 1);
    };

    /* Change View */
    $scope.changeView = function(view, calendar) {
        $('.calendar').fullCalendar('changeView', view);
    };

    $scope.today = function(calendar) {
        $('.calendar').fullCalendar('today');
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];
    //模态框
    $scope.open = function(message) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            backdrop: "static",
            // size: 'sm',
            resolve: { //这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                events: function() { //modalContent是一个回调函数
                    return $scope.events; //这个值会被模态框的控制器获取到
                }
            }
        });
        // modalInstance.opened.then(function() { // 模态窗口打开之后执行的函数  
        //     // 表单验证
            
        // });
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
}]);
myApp.controller('ModalInstanceCtrl', function($scope, $filter, $modalInstance, events) {
    var date = new Date();
    var dateFilter = $filter('date');

    $scope.calendarObj = {
            title: '',
            info: '',
            dateStart: new Date(dateFilter(date, 'yyyy-MM-dd')),
            dateEnd: new Date(dateFilter(date, 'yyyy-MM-dd')),
            location: '',
            className: ['b-l b-2x b-info']
        }
        // 标签颜色
    $scope.colors = ['primary', 'info', 'success', 'warning', 'danger', 'dark'];
    $scope.note = {
        color: 'primary'
    };


    $scope.ok = function() {

        var dStart = $scope.calendarObj.dateStart.getDate();
        var mStart = $scope.calendarObj.dateStart.getMonth();
        var yStart = $scope.calendarObj.dateStart.getFullYear();
        var hStart = $scope.calendarObj.dateStart.getHours();
        var dEnd = $scope.calendarObj.dateEnd.getDate();
        var mEnd = $scope.calendarObj.dateEnd.getMonth();
        var yEnd = $scope.calendarObj.dateEnd.getFullYear();
        var hEnd = $scope.calendarObj.dateEnd.getHours();
        events.push({
            title: $scope.calendarObj.title,
            info: $scope.calendarObj.info,
            start: new Date(yStart, mStart, dStart, hStart),
            end: new Date(yEnd, mEnd, dEnd, hEnd),
            location: $scope.calendarObj.location,
            className: ['bg-' + $scope.note.color + ' bg']
        });
        $modalInstance.close();
    };
    $scope.cancel = function() {
        $modalInstance.dismiss();
    };
});
