import $ from 'jquery'

module.export = () => {
    let checkState = ''
    const countChecked = () => {
        if (checkState === 'all') {
            $(".bulk_action input[name='table_records']").iCheck('check')
        }
        if (checkState === 'none') {
            $(".bulk_action input[name='table_records']").iCheck('uncheck')
        }

        const checkCount = $(".bulk_action input[name='table_records']:checked").length

        if (checkCount) {
            $('.column-title').hide()
            $('.bulk-actions').show()
            $('.action-cnt').html(`${checkCount} Records Selected`)
        } else {
            $('.column-title').show()
            $('.bulk-actions').hide()
        }
    }

    // Resizing
    $(window).resize(function () {
        $('.right_col').css('min-height', $(window).height())
    })
    // Resizing

    // Sidebar
    const $MENU_TOGGLE_BUTTON = $('#menu_toggle')
    const CURRENT_URL = window.location.href.split('?')[0]
    const $BODY = $('body')
    const $SIDEBAR_MENU = $('#sidebar-menu')
    const $SIDEBAR_FOOTER = $('.sidebar-footer')
    const $LEFT_COL = $('.left_col')
    const $RIGHT_COL = $('.right_col')
    const $NAV_MENU = $('.nav_menu')

    const $FOOTER = $('footer')
    // TODO: This is some kind of easy fix, maybe we can improve this
    const setContentHeight = function () {
        // reset height
        $RIGHT_COL.css('min-height', $(window).height())

        const bodyHeight = $BODY.outerHeight()

        const footerHeight = $BODY.hasClass('footer_fixed') ? 0 : $FOOTER.height()

        const leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height()

        let contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight

        // normalize content
        contentHeight -= $NAV_MENU.height() + footerHeight

        $RIGHT_COL.css('min-height', contentHeight)
    }

    $SIDEBAR_MENU.find('a:not(.disabled)').on('click', function () {
        const $li = $(this).parent()

        if ($li.is('.active')) {
            /*
                        $li.removeClass('active active-sm');
                        $('ul:first', $li).slideUp(function() {
                            setContentHeight();
                        });
            */
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active active-sm')
                $SIDEBAR_MENU.find('li ul').slideUp()
            }

            $li.addClass('active')

            $('ul:first', $li).slideDown(function () {
                setContentHeight()
            })
        }
    })

    // toggle small or large menu
    $MENU_TOGGLE_BUTTON.on('click', function () {
        if ($BODY.hasClass('nav-md')) {
            $SIDEBAR_MENU.find('li.active ul').hide()
            // $SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $SIDEBAR_MENU.find('li.active-sm ul').show()
            // $SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $BODY.toggleClass('nav-md nav-sm')

        setContentHeight()
    })

    // check active menu
    $SIDEBAR_MENU.find(`a[href="${CURRENT_URL}"]`).parent('li').addClass('current-page')

    $SIDEBAR_MENU.find('a').filter(function () {
        return this.href === CURRENT_URL
    }).parent('li').addClass('current-page').parents('ul').slideDown(function () {
        setContentHeight()
    }).parent().addClass('active')

    // recompute content when resizing
    $(window).smartresize(function () {
        setContentHeight()
    })

    setContentHeight()

    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
        $('.menu_fixed').mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'minimal',
            mouseWheel: { preventDefault: true }
        })
    }
    // /Sidebar

    // Panel toolbox
    $('.collapse-link').on('click', function () {
        const $BOX_PANEL = $(this).closest('.x_panel')

        const $ICON = $(this).find('i')

        const $BOX_CONTENT = $BOX_PANEL.find('.x_content')

        // fix for some div with hardcoded fix class
        if ($BOX_PANEL.attr('style')) {
            $BOX_CONTENT.slideToggle(200, function () {
                $BOX_PANEL.removeAttr('style')
            })
        } else {
            $BOX_CONTENT.slideToggle(200)
            $BOX_PANEL.css('height', 'auto')
        }

        $ICON.toggleClass('fa-chevron-up fa-chevron-down')
    })

    $('.close-link').click(function () {
        const $BOX_PANEL = $(this).closest('.x_panel')

        $BOX_PANEL.remove()
    })
    // /Panel toolbox

    // Tooltip
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    })
    // /Tooltip

    // Progressbar
    if ($('.progress .progress-bar')[0]) {
        $('.progress .progress-bar').progressbar()
    }
    // /Progressbar

    // Switchery
    /*
    if ($('.js-switch')[0]) {
        const elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'))
        elems.forEach(function (html) {
            const switchery = new Switchery(html, {
                color: '#26B99A'
            })
        })
    }
    */
    // /Switchery

    // iCheck
    if ($('input.flat')[0]) {
        $(document).ready(function () {
            $('input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            })
        })
    }
    // /iCheck

    // Table
    $('table input').on('ifChecked', function () {
        checkState = ''
        $(this).parent().parent().parent().addClass('selected')
        countChecked()
    })
    $('table input').on('ifUnchecked', function () {
        checkState = ''
        $(this).parent().parent().parent().removeClass('selected')
        countChecked()
    })
    $('.bulk_action input').on('ifChecked', function () {
        checkState = ''
        $(this).parent().parent().parent().addClass('selected')
        countChecked()
    })
    $('.bulk_action input').on('ifUnchecked', function () {
        checkState = ''
        $(this).parent().parent().parent().removeClass('selected')
        countChecked()
    })
    $('.bulk_action input#check-all').on('ifChecked', function () {
        checkState = 'all'
        countChecked()
    })
    $('.bulk_action input#check-all').on('ifUnchecked', function () {
        checkState = 'none'
        countChecked()
    })

    // Accordion
    $('.expand').on('click', function () {
        $(this).next().slideToggle(200)
        const $expand = $(this).find('>:first-child')

        if ($expand.text() === '+') {
            $expand.text('-')
        } else {
            $expand.text('+')
        }
    })

    // NProgress
    /*
    if (typeof NProgress !== 'undefined') {
        $(document).ready(function () {
            NProgress.start()
        })

        $(window).load(function () {
            NProgress.done()
        })
    }
    */
}

/**
     * Resize function without multiple trigger
     *
     * Usage:
     * $(window).smartresize(function(){
     *     // code here
     * });
     */
(function ($, sr) {
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    const debounce = function (func, threshold, execAsap) {
        let timeout

        return function debounced () {
            const obj = this
            const args = arguments
            const delayed = () => {
                if (!execAsap) func.apply(obj, args)
                timeout = null
            }

            if (timeout) clearTimeout(timeout)
            else if (execAsap) func.apply(obj, args)

            timeout = setTimeout(delayed, threshold || 100)
        }
    }

    // smartresize
    $.fn[sr] = function (fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr) }
})($, 'smartresize')
