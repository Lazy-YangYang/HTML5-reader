(function () {
    //定义键名加上prefix的localStorage的存取
    var Util = (function () {
        var prefix = 'html5_reader'

        var StorageGetter = function (key) {
            return localStorage.getItem(prefix + key);
        }

        var StorageSetter = function (key, val) {
            return localStorage.setItem(prefix + key, val);
        }

        var getBSONP = function (url, callback) {
            return $.jsonp({
                url: url,
                cache: true,
                callback: 'duokan_fiction_chapter',
                success: function (result) {
                    var data = atob(result);
                    var json = decodeURIComponent(escape(data))
                    callback(json);
                }
            })
        }

        return {
            getBSONP: getBSONP,
            StorageGetter: StorageGetter,
            StorageSetter: StorageSetter,
        }
    })()
    var Dom = {
        top_nav: $('#top-nav'),
        bottom_nav: $('#nav-bottom'),
        font_content: $('#font-content'),
        font_btn: $('#font-btn')
    }
    var Win = $(window);
    var Doc = $(document);
    var RootContainer = $('#fition_container');
    var initFontSize = parseInt(Util.StorageGetter('font_size')) || 14;
    var readerUI;
    var readerModel;



    function main() {
        //入口函数
        RootContainer.css('font-size', initFontSize);
        EventHadnlder();
        readerUI = readerBaseFrame(RootContainer);
        readerModel = new ReaderModel();
        readerModel.init(function (data) {
            readerUI(data)
        })

    }

    function ReaderModel() {
        //todo 实现和阅读器相关的数据交互方法
        var ChapterID;
        var ChapterLength;
        var init = function (callback) {
            getFicitonInfo(function () {
                getChapterContent(ChapterID, function (data) {
                    callback(data)
                })
            })
        }

        var getFicitonInfo = function (callback) {
            $.get('data/chapter.json', function (data) {
                ChapterID = Util.StorageGetter('ChapterID') || data.chapters[1].chapter_id;
                ChapterLength = data.chapters.length;
                callback && callback()
            }, 'json')
        }

        var getChapterContent = function (id, callback) {
            $.get('data/data' + id + '.json', function (data) {
                if (data.result == 0) {
                    var url = data.jsonp;
                    Util.getBSONP(url, function (data) {
                        callback && callback(data)
                    });
                }
            }, 'json')
        }

        var prevChapter = function () {
            if (ChapterID == 1) {
                return
            }
            ChapterID = parseInt(ChapterID) - 1;
            Util.StorageSetter('ChapterID', ChapterID);
            getChapterContent(ChapterID, function (data) {
                readerUI(data);
            })
        }

        var nextChapter = function () {
            console.log(ChapterLength)
            if (ChapterID == ChapterLength) {
                return
            }
            ChapterID = parseInt(ChapterID) + 1;
            Util.StorageSetter('ChapterID', ChapterID);
            getChapterContent(ChapterID, function (data) {
                readerUI(data);
            })
        }

        return {
            prevChapter: prevChapter,
            nextChapter: nextChapter,
            init: init
        }
    }

    function readerBaseFrame(container) {
        //渲染基本的UI结构
        //解析章节数据
        function parseChapterData(jsonData) {
            var jsonObj = JSON.parse(jsonData);
            var html = "<h4>" + jsonObj.t + "</h4>";
            for (var i = 0; i < jsonObj.p.length; i++) {
                html += "<p>" + jsonObj.p[i] + "</p>";
            }
            return html;
        }
        return function (data) {
            container.html(parseChapterData(data));
        }
    }


    function EventHadnlder() {
        //todo
        $('#action_mid').click(function () {
            if (Dom.top_nav.css('display') == 'none') {
                Dom.bottom_nav.show();
                Dom.top_nav.show();
            } else {
                Dom.bottom_nav.hide();
                Dom.top_nav.hide();
            }
        })

        $('#font-btn').click(function () {
            if (Dom.font_content.css('display') == 'none') {
                Dom.font_content.show();
                Dom.font_btn.addClass('current')
            } else {
                Dom.font_content.hide();
                Dom.font_btn.removeClass('current')
            }
        })

        $('#night_day').click(function () {
            //TODOc触发背景切换事件
        })

        $('#large-font').click(function () {
            if (initFontSize >= 20) {
                return;
            }
            initFontSize += 1;
            RootContainer.css('font-size', initFontSize);
            Util.StorageSetter('font_size', initFontSize);
        })

        $('#small-font').click(function () {
            if (initFontSize <= 10) {
                return;
            }
            initFontSize -= 1;
            RootContainer.css('font-size', initFontSize);
            Util.StorageSetter('font_size', initFontSize);
        })
        $('#prev').click(function () {
            readerModel.prevChapter();
        })
        $('#next').click(function () {
            readerModel.nextChapter();
        })
        Win.scroll(function () {
            Dom.bottom_nav.hide();
            Dom.top_nav.hide();
            Dom.font_content.hide();
            Dom.font_btn.removeClass('current')
        })

    }

    main();
})()