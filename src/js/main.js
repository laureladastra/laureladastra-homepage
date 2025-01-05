$(function () {
  const $window = $(window),
    $body = $('body')
  // $agent = $('#UserAgent').val(navigator.userAgent)

  // Breakpoints.
  breakpoints({
    default: ['1681px', null],
    xlarge: ['1281px', '1680px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: ['361px', '480px'],
    xxsmall: [null, '360px'],
    xxxsmall: [null, '224px'],
    xxxxsmall: [null, '197px']
  })

  // Animations

  // Play initial animations on page load.
  $window.on('load', function () {
    // NOTE old method for fading in text
    // currently deactivated in favor of jQuery method
    // window.setTimeout(function () {
    //   $body.removeClass('is-preload')
    // }, 100)
  })

  $('.intro header').animate({ opacity: 1 }, 1000)

  // Set Date
  const date = new Date().getFullYear()
  $('#date').text(`${date}.`)

  // Hack: Enable IE workarounds.
  if (browser.name == 'ie') $body.addClass('is-ie')

  // Mobile?
  if (browser.mobile) $body.addClass('is-mobile')

  // Polyfill: Object fit.
  if (!browser.canUse('object-fit')) {
    $('.image[data-position]').each(function () {
      var $this = $(this),
        $img = $this.children('img')

      // Apply img as background.
      $this
        .css('background-image', 'url("' + $img.attr('src') + '")')
        .css('background-position', $this.data('position'))
        .css('background-size', 'cover')
        .css('background-repeat', 'no-repeat')

      // Hide img.
      $img.css('opacity', '0')
    })

    $('.gallery > a').each(function () {
      var $this = $(this),
        $img = $this.children('img')

      // Apply img as background.
      $this
        .css('background-image', 'url("' + $img.attr('src') + '")')
        .css('background-position', 'center')
        .css('background-size', 'cover')
        .css('background-repeat', 'no-repeat')

      // Hide img.
      $img.css('opacity', '0')
    })
  }

  // Gallery.
  $('.gallery')
    .on('click', 'a', function (event) {
      var $a = $(this),
        $gallery = $a.parents('.gallery'),
        $modal = $gallery.children('.modal'),
        $modalImg = $modal.find('img'),
        href = $a.attr('href')

      // Not an image? Bail.
      if (!href.match(/\.(jpg|gif|png|mp4)$/)) return

      // Prevent default.
      event.preventDefault()
      event.stopPropagation()

      // Locked? Bail.
      if ($modal[0]._locked) return

      // Lock.
      $modal[0]._locked = true

      // Set src.
      $modalImg.attr('src', href)

      // Set visible.
      $modal.addClass('visible')

      // Focus.
      $modal.focus()

      // Delay.
      setTimeout(function () {
        // Unlock.
        $modal[0]._locked = false
      }, 600)
    })
    .on('click', '.modal', function (event) {
      var $modal = $(this),
        $modalImg = $modal.find('img')

      // Locked? Bail.
      if ($modal[0]._locked) return

      // Already hidden? Bail.
      if (!$modal.hasClass('visible')) return

      // Stop propagation.
      event.stopPropagation()

      // Lock.
      $modal[0]._locked = true

      // Clear visible, loaded.
      $modal.removeClass('loaded')

      // Delay.
      setTimeout(function () {
        $modal.removeClass('visible')

        setTimeout(function () {
          // Clear src.
          $modalImg.attr('src', '')

          // Unlock.
          $modal[0]._locked = false

          // Focus.
          $body.focus()
        }, 475)
      }, 125)
    })
    .on('keypress', '.modal', function (event) {
      var $modal = $(this)

      // Escape? Hide modal.
      if (event.keyCode == 27) $modal.trigger('click')
    })
    .on('mouseup mousedown mousemove', '.modal', function (event) {
      // Stop propagation.
      event.stopPropagation()
    })
    .prepend(
      '<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>'
    )
    .find('img')
    .on('load', function () {
      var $modalImg = $(this),
        $modal = $modalImg.parents('.modal')

      setTimeout(function () {
        // No longer visible? Bail.
        if (!$modal.hasClass('visible')) return

        // Set loaded.
        $modal.addClass('loaded')
      }, 275)
    })

  // Mobile navbar toggle behaviour

  function toggleButton(state) {
    $button = $('#navbar-button')

    if (state == 'off') {
      $button.removeClass('toggle-close')
      $('#navbar-toggle').show()
      $button.addClass('toggle-open')
    }
    if (state == 'on') {
      $button.removeClass('toggle-open')
      $('#navbar-toggle').hide()
      $button.addClass('toggle-close').fadeOut(0).fadeIn(400)
    }
  }

  function closeNavBar() {
    const navLinks = $('.nav-item').find()
    const menuToggle = $('#navbarNav')
    const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: 'false' })

    navLinks.each((i) => {
      i.addEventListener('click', () => {
        bsCollapse.toggle()
      })
    })
  }

  // Hack: disable autoplay for in-app browsers

  // Listeners

  $(document).on('click', (e) => {
    const $this = $(e.target)
    const width = $(window).width()

    // Revert default color for links in #icon

    if ($this.is('a') && $this.hasClass('icon')) {
      $this.blur()
    }

    if (width < 992) {
      if (
        $('#navbarNav').hasClass('collapse') &&
        $('#navbarNav').hasClass('show')
      ) {
        closeNavBar()
        toggleButton('off')
      } else if ($this.hasClass('signature')) {
        if ($('#navbar-button').hasClass('collapsed')) {
          toggleButton('off')
        }
      }
    }

    // Toggle small navigation menu

    if (width < 992) {
      if (
        $('#navbarNav').hasClass('collapse') &&
        $('#navbarNav').hasClass('show')
      ) {
        closeNavBar()
        toggleButton('off')
      } else if ($this.hasClass('signature')) {
        if ($('#navbar-button').hasClass('collapsed')) {
          toggleButton('off')
        }
      }
    }
  })

  // Display correct navigation menu state and toggle icon based

  $(document).on('scroll', function () {
    const width = $(window).width()

    if (width > 224) {
      if (
        $('#navbarNav').hasClass('collapse') &&
        $('#navbarNav').hasClass('show')
      ) {
        closeNavBar()
        toggleButton('off')
      }
    }
  })

  $('#navbar-button').on('click', function () {
    const $this = $(this)
    if (!$this.hasClass('collapsed')) {
      toggleButton('on')
    } else {
      toggleButton('off')
    }
  })

  /* Modal */

  $(document).on('show.bs.modal', function (e) {
    const video = $(e.target).find('video')
    const width = $(window).width()

    if (width > 224) {
      $('html').css('overflow', 'hidden')
      if (width > 992) {
        video.trigger('play')
      }
    }
  })

  $(document).on('hide.bs.modal', function (e) {
    const video = $(e.target).find('video')
    const width = $(window).width()

    if (width > 224) {
      const $this = $('html')
      $this.css('overflow', 'unset')
      $this.css('overflow-x', 'hidden')

      if (width > 992) {
        video.trigger('pause')
      }
    }
  })
})
