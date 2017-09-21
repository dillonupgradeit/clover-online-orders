(function( $ ) {
	'use strict';
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-left",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    swal.setDefaults({ customClass: 'moo-custom-dialog-class' });
    jQuery( document ).ready(function($) {
        jQuery('#moo_OnlineStoreContainer').removeClass('moo_loading');
        jQuery('.demo').imagesRotation({
            interval: 1000,     // ms
            intervalFirst: 500, // first image change, ms
            callback: null});      // first argument would be the current image url
    });

})(jQuery);


function moo_btn_addToCartFIWM(event,item_uuid,qty_static)
{

    event.preventDefault();
    //Change button content to loading
    var target = event.target;
    jQuery(target).text('Loading options...');
    if(qty_static)
        var qty = 1;
    else
        var qty = 1;

    jQuery.get(moo_RestUrl+"moo-clover/v1/items/"+item_uuid, function (data) {
        //Change button text
        jQuery(target).text("ADD TO CART");

        if(data != null)
        {
                mooBuildModifiersPanel(data.modifier_groups,item_uuid,qty);
        }
        else
        {
            //Change butn text
            jQuery(target).text("ADD TO CART");
            swal({ title: "Error", text: 'We cannot Load the options for this item, please refresh the page or contact us',   type: "error",   confirmButtonText: "ok" });
        }
    }).fail(function (data) {
        //Change butn text
        jQuery(target).text("ADD TO CART");
        swal({ title: "Error", text: 'We cannot Load the options for this item, please refresh the page or contact us',   type: "error",   confirmButtonText: "ok" });
    });
}
function moo_btn_addToCart(event,item_uuid,qty_static)
{
    event.preventDefault();
    if(qty_static)
        var qty = 1;
    else
        var qty = 1;

    //var qty = parseInt(jQuery("#moo-itemQty-for-"+item_id).val());

    var body = {
        item_uuid:item_uuid,
        item_qty:qty,
        item_modifiers:{}
    };
    swal({
        html:
        '<div class="moo-msgPopup">Adding the item to your cart</div>' +
        '<img src="'+ moo_params['plugin_img']+'/loading.gif" class="moo-imgPopup"/>',
        showConfirmButton: false
    });

    /* Add to cart the item */
    jQuery.post(moo_RestUrl+"moo-clover/v1/cart", body,function (data) {
        if(data != null)
        {
            swal({
                title:"Item added",
                showCancelButton: true,
                cancelButtonText: 'Close',
                confirmButtonText: 'Cart page',
                type:"success"
            }).then(function () {
                window.location.replace(moo_CartPage)
            });
        }
        else
        {
            swal({
                title:"Item not added, try again",
                type:"error"
            });
        }
    }).fail(function ( data ) {
        swal({
            title:"Item not added, try again",
            text:"Check your internet connection or contact us",
            type:"error"
        });
    }).done(function ( data ) {
        console.log(data);
    });
}