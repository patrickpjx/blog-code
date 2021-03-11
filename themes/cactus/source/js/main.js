/**
 * Sets up Justified Gallery.
 */
if (!!$.prototype.justifiedGallery) {
    var options = {
        rowHeight: 140,
        margins: 4,
        lastRow: 'justify',
    };
    $('.article-gallery').justifiedGallery(options);
}

$(document).ready(function () {
    /**
     * Shows the responsive navigation menu on mobile.
     */
    $('#header > #nav > ul > .icon').click(function () {
        $('#header > #nav > ul').toggleClass('responsive');
    });

    /**
     * Controls the different versions of  the menu in blog post articles
     * for Desktop, tablet and mobile.
     */
});
