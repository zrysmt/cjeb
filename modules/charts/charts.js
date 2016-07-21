// require.config({
//     paths: {
//         echarts: '../common/js/dist'
//     }
// });

define(function(require, exports, module) {

    // require('echarts/chart/map');
    // require('echarts/chart/bar');
    // require('echarts/chart/line');

    var charts = {

        init: function(root) { //暂时不需要
            // var ec = require('echarts');
            // var initInd = $(root).attr('initInd');
            // var indtab = $(root).attr('tab');
            // var thmmapId = this.getchartId();
            // var dom = document.getElementById(thmmapId);
            // var type = 'theme';
            // var indName = $(root).text();
            // var year = indName == '水资源' ? 2012 : 2008;
            // this.cnty = '上海';
            // this.myChart = echarts.init(dom);
            // this.myChart.showLoading();
            // this.myChart.hideLoading();
            // this.initOpt();
            // this.addval2chart(initInd, year, indtab, type);
        },
        initOpt: function() {
            this.thm = {};
            this.chart = {};
            this.thm.option = { //专题图的配置
                backgroundColor: '#fff',
                animation: true,
                animationDuration: 1000,
                animationEasing: 'cubicInOut',
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'cubicInOut',
                title: {
                    x: 'center',
                    y: 'top'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}'
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    textStyle: { fontFamily: 'Microsoft YaHei' },
                    feature: {
                        dataView: { show: true, readOnly: true },
                        // dataZoom: { show: true },
                        // magicType: {
                        //     show: true,
                        //     type: ['line', 'bar', 'stack', 'tiled']
                        // },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                // dataRange: {
                //     realtime: false,
                //     itemHeight: 80,
                //     //splitNumber:6,
                //     //borderWidth:1, 
                //     textStyle: { color: '#333333' },
                //     text: ['高', '低'],
                //     calculable: true
                // },
                visualMap: {
                    min: 0,
                    max: 1000000,
                    text: ['高', '低'],
                    realtime: false,
                    calculable: true,
                    inRange: {
                        color: ['lightskyblue', 'yellow', 'orangered']
                    }
                },
                series: [{
                    type: 'map',
                    mapType: 'china',
                    roam: true,
                    center: [112, 28],
                    zoom: 2,
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(100,149,237,1)',
                            borderWidth: 0.5,
                            areaStyle: {
                                color: '#9ec7f3'
                            },
                            label: { show: false, textStyle: { color: '#439f55', fontSize: 12, fontFamily: 'Microsoft YaHei' } }
                        },
                        emphasis: {
                            areaStyle: {
                                color: '#feda9d'
                            },
                            label: { show: true, textStyle: { color: '#439f55', fontSize: 12, fontFamily: 'Microsoft YaHei' } }
                        }
                    }
                }]
            };
            this.chart.option = {
                backgroundColor: '#fff',
                title: {
                    //text: '',
                    x: 'center',
                    y: 'top'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'left',
                    y: '12',
                    textStyle: {
                        color: '#333333',
                        fontFamily: 'Microsoft YaHei'
                    },
                    data: []
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    x: 'right',
                    y: 'center',
                    feature: {
                        magicType: { show: true, type: ['line', 'bar'] }, //'stack','tiled'
                        dataZoom: { show: true },
                        dataView: { show: true },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#333333',
                            fontFamily: 'Microsoft YaHei'
                        }
                    },
                    data: []
                }],
                yAxis: [{
                    logLabelBase: 10,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#333333',
                            fontFamily: 'Microsoft YaHei'
                        }
                    }
                }],
                series: [{
                    type: '',
                    data: [],
                    markLine: {
                        data: [
                            { type: 'average', name: '平均值' }
                        ]
                    }
                }]
            };
        },
        initChart: function(type) {
            var option = type == 'theme' ? this.thm.option : this.chart.option;
            var thmmapId = this.getchartId();
            var dom = document.getElementById(thmmapId);
            this.myChart = echarts.init(dom);
            this.myChart.showLoading();
            this.myChart.hideLoading();
            // this.myChart.clear();
            this.myChart.setOption(option);
            // this.myChart.restore();
        },
        show: function() {
            var mainId = this.getmainwinId();
            var winclass = this.getwinclass();
            $('.' + winclass).hide();
            $('#' + mainId).show();
        },
        hide: function() {
            var mainId = this.getmainwinId();
            $('#' + mainId).hide();
        },
        arrowshow: function() {
            var arrowId = this.getarrowId();
            $('#' + arrowId).attr({ 'title': '切换至历年变化折线图', 'to': 'line' }).css('background', 'url(modules/charts/imgs/arrow_right.png) no-repeat').show('slow');
        },
        arrowhide: function() {
            var arrowId = this.getarrowId();
            $('#' + arrowId).hide('slow');
        },
        _adjustMap4lowres: function() {
            var self = this;
            var option = self.thm.option;
            if ($(window).width() <= 1200) {
                option.dataRange.itemHeight = 8;
                var loc = option.series[0].mapLocation;
                loc.x = -440;
                loc.y = -40;
                loc.height = 1000;
                loc.width = 1000;
            }
        },
        _getmin4thm: function(val) {
            var value = (val + '').split('.');
            var min = value[0];
            if (min.length > 2 || (min.length == 2 && min[0] != '-')) {
                var tmp = min[2] == 9 ? '-' + (parseInt(min[1]) + 1) + '0' : '-' + min[1] + (parseInt(min[2]) + 1);
                min = min[0] == '-' ? tmp * Math.pow(10, min.length - 3) : (min[0] + min[1]) * Math.pow(10, min.length - 2);
            } else {
                min = min[0] == '-' ? -10 : 0;
            }
            return min;
        },
        _getmax4thm: function(val) {
            var value = (val + '').split('.');
            var max = value[0];
            if (max.length > 2 || (max.length == 2 && max[0] != '-')) {
                var tmp = max[1] == 9 ? (parseInt(max[0]) + 1) + '0' : max[0] + (parseInt(max[1]) + 1);
                max = max[0] == '-' ? ('-' + max[1] + max[2]) * Math.pow(10, max.length - 3) : tmp * Math.pow(10, max.length - 2);
            } else {
                max = max[0] == '-' ? 0 : 10;
            }
            return max;
        },
        /**
         * [_proRst4map ]
         * @param  {[Object]} rst  [数据库查询(字段查询)结果:queryResult]
         * @param  {[type]} ind  [description]
         * @param  {[type]} karr [description]
         * @param  {[type]} unit [description]
         * @param  {[String]} type [theme或者其它]
         * @return {[type]}      [description]
         */
        _proRst4map: function(rst, ind, karr, unit, type) {
            var self = this;
            var option = self.thm.option;
            var v_inx = karr[1];
            var data = [],
                value = [];
            var units = unit ? '(' + unit + ')' : '';
            for (var j = 0; j < rst.length; j++) {
                var obj = {};
                obj.name = rst[j]['V2']; //城市名
                var val = rst[j][v_inx];
                obj.value = val; //指标的值
                // console.log(val);
                if (val != '') value.push(val);
                var s = obj.name;
                data.push(obj);
            }
            option.series[0].data = data;
            option.series[0].name = ind;
            /* if (value.length != 0) {
                 option.dataRange.color = ['#F08080', '#f1f075', '#8acff2'];
                 var min = util.minval(value),
                     max = util.maxval(value);
                 option.dataRange.min = self._getmin4thm(min);
                 option.dataRange.max = self._getmax4thm(max);
             } else {
                 option.dataRange.color = ['#e5e5e5', '#e5e5e5', '#e5e5e5'];
                 option.dataRange.min = 0;
                 option.dataRange.max = 0;
                 util.showTipWin('暂未提供数据');
             }*/
            option.tooltip.formatter = function(params) {
                // console.log(params);
                if (typeof params.value == 'number') {
                    if (params.value != '') {
                        var value = (params.value.toFixed(2) + '').split('.');
                        var decimal = value[1] ? '.' + value[1][0] + value[1][1] : '';
                        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + decimal;
                        return params.seriesName + units + '<br/>' + params.name + ' : ' + value;
                    } else {
                        return params.name + '：-';
                    }
                } else {
                    return params.name;
                }
            };
            self._adjustMap4lowres();
            self.initChart('theme');
        },
        _proRst4chart: function(rst, ind, karr, unit, type) {
           
            var self = this;
            console.info(karr + unit + type);
            var option = self.chart.option;
            var k_inx = 'V2';
            // var magicType = ['bar'];
            if (type == 'line') {
                k_inx = 'V4';
                // rst.reverse();
                // magicType.unshift('line');
            }
            var v_inx = karr[1];
            var data = [],
                tmpArr = [],
                valueArr = [];
            var units = unit ? '(' + unit + ')' : '';
            for (var j = 0; j < rst.length; j++) {
                tmpArr.push(rst[j][k_inx]);
                var val = rst[j][v_inx] == '' ? '-' : rst[j][v_inx];
                if (val != '-') valueArr.push(val);
                data.push(val);
            }
            console.log(tmpArr);
            console.log(data);

            option.yAxis[0].type = 'value';
            option.xAxis[0].data = tmpArr;
            option.series[0].type = type;
            option.series[0].data = data;
            option.series[0].name = option.legend.data[0] = ind + units;
            // option.toolbox.feature.magicType.type = magicType;
            var max = util.maxval(valueArr),
                min = util.minval(valueArr),
                logval = Math.pow(10, 9);
            if (max >= logval || min <= -logval) option.yAxis[0].type = 'log';
            if (valueArr.length == 0) util.showTipWin('暂未提供数据');
            option.tooltip.formatter = function(params) {
                if (!params || params.length == 0) return;
                var params = params[0];
                if (params.value != '-' && params.value) {
                    var value = (params.value.toFixed(2) + '').split('.');
                    var decimal = value[1] ? '.' + value[1][0] + value[1][1] : '';
                    value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + decimal;
                    return params.name + ' : ' + value;
                } else {
                    return params.name + '：-';
                }
            }
            self.initChart('chart');
        },
        _reqData: function(rst, ind, year_cnty, tab, type) {
            var self = this;

            var fldArr = ['V2', rst[0].FIELD];
            var filter;
            if (type == 'line') {
                fldArr[0] = 'V4';
                filter = "V2 = '" + year_cnty + "'";
            } else {
                filter = "V4 ='" + year_cnty + "'";
            }
            console.log(filter);

            var unit = rst[0].UNIT;
            var flds = util.fldsArrTostring(fldArr);
            var option = {
                "scriptname": "CJEB.charts.getIndValue",
                "field": flds,
                "tablename": tab,
                "filter": filter
            };
            var succ = type == 'theme' ? self._proRst4map : self._proRst4chart;
            var sqlservice = new gEcnu.WebsqlScript({
                'processCompleted': function(data) {
                    var queryResult = data.queryResult;
                    console.log(queryResult);
                    util.bindContext(self, succ, queryResult, ind, fldArr, unit, type);
                },
                'processFailed': function() { alert('请求失败'); }
            });
            sqlservice.processAscyn(option);
        },
        addval2chart: function(ind, year_cnty, table, type) {
            var self = this;
            this.initOpt();

            console.log(ind + ' ' + year_cnty + ' ' + table + ' ' + type);
            if (type == 'line') {
                self.cnty = year_cnty || '上海市';
                if (!year_cnty) year_cnty = '上海市';
            } else {
                self.year = year_cnty || '2008';
                if (!year_cnty) year_cnty = '2008';
                if (type == 'bar') {
                    self.arrowshow();
                } else {
                    self.arrowhide();
                }
            }
            self.ind = ind, self.tab = table;
            var tab = 'fieldsdef'; //查询出表中每列代表的含义
            var filter = "fieldRealname = '" + ind + "'";
            filter += "AND tabname = '" + table + "'";
            var option = {
                "scriptname": "CJEB.charts.getIndFld",
                "ind": ind,
                "tablename": tab,
                "filter": filter
            };
            if (ind.indexOf("(") > 0) { //指标中有'()'的情况
                var indArr = ind.split('(');
                ind = indArr[0];
                var unit = indArr[1].substring(0, indArr[1].length - 1);
                option.filter = "fieldRealname = '" + ind + "'AND tabname = '" + table + "' AND unit = '" + unit + "'";
            }
            var succ = self._reqData;
            var sqlservice = new gEcnu.WebsqlScript({
                'processCompleted': function(data) {
                    var queryResult = data.queryResult;
                    console.log(queryResult);
                    util.bindContext(self, succ, queryResult, ind, year_cnty, table, type);
                },
                'processFailed': function() { alert('请求失败'); }
            });
            sqlservice.processAscyn(option);
        },
        toggle4chart: function(root) {
            var toType = $(root).attr('to');
            var chartId = this.getchartId();
            var boxId = this.getyear_cnty_boxId();
            var subTabId = this.getsubTabId();
            $('#' + chartId).css('left', 'initial');
            $('#' + boxId).css('left', 'initial');
            var width_ct = $('#' + chartId).css('width');
            var width_box = $('#' + boxId).css('width');
            console.log(width_ct);
            var sub_year_cntyId = this.getsubyearcntyId();
            var cnty = this.cnty,
                year = this.year;
            if (toType == 'line') {
                // var len = cnty.length;
                // var state = len > 5 ? '城市:' : (len == 5 && $(window).width() <= 1200) ? '城市:' : '城 市：';
                this.trigger('initbox', '城市');
                // $('#' + chartId).css('width', 0).animate({ width: width_ct });
                $('#' + boxId).css('width', 0).animate({ width: width_box });
                $(root).attr({ 'title': '切换回柱状图', 'to': 'bar' }).css('background', 'url(modules/charts/imgs/arrow_left.png) no-repeat');
                $('#' + sub_year_cntyId).attr('type', '城市').text(cnty).prev().text('城 市:');
                $('#' + subTabId).children('.select').eq(0).attr('type', 'line');
            } else {
                this.trigger('initbox', '年份');
                var chartDom = document.getElementById(chartId);
                var boxDom = document.getElementById(boxId);
                var left_ct = chartDom.offsetLeft;
                var left_box = boxDom.offsetLeft;
                // $('#' + chartId).css({ 'left': left_ct, 'width': 0 }).animate({ width: width_ct });
                $('#' + boxId).css({ 'left': left_box, 'width': 0 }).animate({ width: width_box });
                $(root).attr({ 'title': '切换至历年变化折线图', 'to': 'line' }).css('background', 'url(modules/charts/imgs/arrow_right.png) no-repeat');
                $('#' + sub_year_cntyId).attr('type', '年份').text(year + '年').prev().text('年 份：');
                $('#' + subTabId).children('.select').eq(0).attr('type', 'bar');
            }
        },
        getMapId: function() {
            return 'mapview';
        },
        getchartwinId: function() {
            return 'chartwin';
        },
        getchartId: function() {
            return 'chartPool';
        },
        getyear_cnty_boxId: function() {
            return 'year_cnty_box';
        },
        getmainboxId: function() {
            return 'mainbox';
        },
        getsubyearcntyId: function() {
            return 'sub_year_cnty';
        },
        getarrowId: function() {
            return 'toggle_logo';
        },
        getsubTabId: function() {
            return 'subTab';
        },
        getmainwinId: function() {
            return 'mainwin';
        },
        getwinclass: function() {
            return 'window';
        }

    };

    $('#toggle_logo').on('click', function() {
        var ind = charts.ind;
        var tab = charts.tab;
        var year = charts.year;
        var cnty = charts.cnty;
        var toType = $(this).attr('to');
        console.log(year + ' ' + cnty + ' ' + toType);
        charts.toggle4chart(this);
        if (toType == 'line') {
            charts.addval2chart(ind, cnty, tab, toType);
        } else {
            charts.addval2chart(ind, year, tab, toType);
        }

    });

    module.exports = charts;

});
