/*
 * Images rotation jQuery plugin | 2014-08-12
 * Copyright (c) 2013-2014 sladex | MIT License
 * https://github.com/sladex/images-rotation
 */

$.fn.imagesRotation = function (options) {
    var defaults = {
            images: [],         // urls to images
            dataAttr: 'images', // html5 data- attribute which contains an array with urls to images
            imgSelector: 'img', // element to change
            interval: 500,     // ms
            intervalFirst: 0, // first image change, ms
            callback: null      // first argument would be the current image url
        },
        settings = $.extend({}, defaults, options);

    var clearRotationInterval = function ($el) {
            clearInterval($el.data('imagesRotaionTimeout'));
            $el.removeData('imagesRotaionTimeout');
            clearInterval($el.data('imagesRotaionInterval'));
            $el.removeData('imagesRotaionInterval');
        },
        getImagesArray = function ($this) {
            var images = settings.images.length ? settings.images : $this.data(settings.dataAttr);
            return $.isArray(images) ? images : false;
        },
        preload = function (arr) {  // images preloader
            $(arr).each(function () {

                if ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3)) {
                    $('<img/>')[0].src = 'assets/img/' + this + '@2x.jpg';
                } else {
                  $('<img/>')[0].src = 'assets/img/' + this + '.jpg';
                }
            });
        },
        init = function () {
            var imagesToPreload = [];
            this.each(function () {  // preload next image
                var images = getImagesArray($(this));
                if (images && images.length > 1) {
                    imagesToPreload.push(images[1]);
                    imagesToPreload.push(images[2]);
                    imagesToPreload.push(images[3]);
                }
                console.log(images);
            });
            preload(imagesToPreload);
        };

    init.call(this);

    this.on('mouseenter.imagesRotation', function () {
        var $this = $(this),
            $img = settings.imgSelector ? $(settings.imgSelector, $this) : null,
            images = getImagesArray($this),
            imagesLength = images ? images.length : null,
            changeImg = function () {
                var prevIndex = $this.data('imagesRotationIndex') || 0,
                    index = (prevIndex + 1 < imagesLength) ? prevIndex + 1 : 0,
                    nextIndex = (index + 1 < imagesLength) ? index + 1 : 0;
                $this.data('imagesRotationIndex', index);
                if ($img && $img.length > 0) {
                    if ($img.is('img')) {
                        $img.attr('src', 'assets/img/' + images[index] + '.jpg');
                        $img.attr('srcset', 'assets/img/' + images[index] + '.jpg 1x, assets/img/' + images[index] + '@2x.jpg 2x');
                    }
                    else {
                        $img.css('background-image', 'url(' + images[index] + ')');
                    }
                }
                if (settings.callback) {
                    settings.callback(images[index]);
                }
                ;
                // preload([images[nextIndex]]); // preload next image
            };
        if (imagesLength) {
            clearRotationInterval($this); // in case of dummy intervals
            var timeout = setTimeout(function () {
                changeImg();
                var interval = setInterval(changeImg, settings.interval);
                $this.data('imagesRotaionInterval', interval); // store to clear interval on mouseleave
            }, settings.intervalFirst);
            $this.data('imagesRotaionTimeout', timeout);
        }
    }).on('mouseleave.imagesRotation', function () {
        clearRotationInterval($(this));
    }).on('imagesRotationRemove', function () {
        var $this = $(this);
        $this.off('.imagesRotation');
        clearRotationInterval($this);
    });
};

$.fn.imagesRotationRemove = function () {
    this.trigger('imagesRotationRemove');
};
