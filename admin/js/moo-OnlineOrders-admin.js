(function( $ ) {
	'use strict';
    window.moo_loading = '<svg xmlns="http://www.w3.org/2000/svg" width="44px" height="44px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"></animate></rect></svg>';
    moo_Update_stats();

})( jQuery );
function tab_clicked(tab)
{
    var Nb_Tabs=5; // Number for tabs
    for(var i=1;i<=Nb_Tabs;i++) {
        jQuery('#MooPanel_tabContent'+i).hide();
        jQuery('#MooPanel_tab'+i).removeClass("MooPanel_Selected");
    }
    jQuery('#MooPanel_tabContent'+tab).show();
    jQuery('#MooPanel_tab'+tab).addClass("MooPanel_Selected");
}
function MooPanel_ImportItems(event)
{
    event.preventDefault();
    jQuery('#MooPanelSectionImport').html(window.moo_loading);
    Moo_ImportCategories();
}
var flag_key_noy_found=false;
function Moo_ImportCategories()
{
    jQuery.post(moo_params.ajaxurl,{'action':'moo_import_categories'}, function (data) {
            if(data.status == 'Success')
            {

                if(data.data == "Please verify your Key in page settings") {
                    flag_key_noy_found=true;
                    jQuery('#MooPanelSectionImport').html('Please verify your API Key<br/> ');
                }
                else
                    jQuery('#MooPanelSectionImport').append('<br/> '+data.data);
            }
            else
                jQuery('#MooPanelSectionImport').append('<br/> '+"Error when importing the categories, please try again");
        }
    ).done(function () {
            Moo_ImportLabels();
        });
}

function Moo_ImportLabels()
{
    if(!flag_key_noy_found)
        jQuery.post(moo_params.ajaxurl,{'action':'moo_import_labels'}, function (data) {
                if(data.status=='Success')
                    jQuery('#MooPanelSectionImport').append('<br/> '+data.data);
                else
                    jQuery('#MooPanelSectionImport').append('<br/> '+"Error when importing the label, please try again");
            }
        ).done(function () {
                Moo_ImportTaxes();
            });
}
function Moo_ImportTaxes()
{
    jQuery.post(moo_params.ajaxurl,{'action':'moo_import_taxes'}, function (data) {
            if(data.status=='Success')
                jQuery('#MooPanelSectionImport').append('<br/> '+data.data);
            else
                jQuery('#MooPanelSectionImport').append('<br/> '+"Error when importing the taxes rates, please try again");
        }
    ).done(function () {
            Moo_ImportItems();
        });
}
function Moo_ImportItems()
{
    jQuery.post(moo_params.ajaxurl,{'action':'moo_import_items'}, function (data) {
            if(data.status=='Success')
                jQuery('#MooPanelSectionImport').append('<br/> '+data.data);
            else
                jQuery('#MooPanelSectionImport').append('<br/> '+"Error when importing the products, please try again");
        }
    ).done(function () {
            jQuery('#MooPanelSectionImport').html("All of your data was successfully imported from Clover POS"+'<br/> ');
            moo_Update_stats();
    });
}

function moo_Update_stats()
{
    jQuery.post(moo_params.ajaxurl,{'action':'moo_get_stats'}, function (data) {
            if(data.status=='Success'){
                jQuery({someValue: 0}).animate({someValue: data.products}, {
                    duration: 5000,
                    easing:'swing',
                    step: function() {jQuery('#MooPanelStats_Products').html(Math.round(this.someValue));}
                });
                jQuery({someValue: 0}).animate({someValue: data.cats}, {
                    duration: 3000,
                    easing:'swing',
                    step: function() {jQuery('#MooPanelStats_Cats').html(Math.round(this.someValue));}
                });
                jQuery({someValue: 0}).animate({someValue: data.labels}, {
                    duration: 3000,
                    easing:'swing',
                    step: function() {jQuery('#MooPanelStats_Labels').html(Math.round(this.someValue));}
                });
                jQuery({someValue: 0}).animate({someValue: data.taxes}, {
                    duration: 3000,
                    easing:'swing',
                    step: function() {jQuery('#MooPanelStats_Taxes').html(Math.round(this.someValue));}
                });
            }

        }
    ).done(function () {
            console.log("DONE")
        });
}

function MooChangeOT_Status(uuid)
{
    var ot_status = jQuery('#myonoffswitch_'+uuid).prop('checked');
    jQuery.post(moo_params.ajaxurl,{'action':'moo_update_ot_status',"ot_uuid":uuid,"ot_status":ot_status}, function (data) {
           console.log(data);
        }
    );
};

function MooPanelRefrechOT(e)
{
    e.preventDefault();
    jQuery.post(moo_params.ajaxurl,{'action':'moo_import_ordertypes'}, function (data) {
        if(data.status == "Success"){
            location.reload();
        }
    }
);
}

function MooSendFeedBack(e)
{
    e.preventDefault();
    var msg =  jQuery("#Moofeedback").val()
    jQuery.post(moo_params.ajaxurl,{'action':'moo_send_feedback','message':msg}, function (data) {
        if(data.status == "Success"){
            alert("Thank you for your feedback.");
            jQuery("#Moofeedback").val("");
        }
    }
);
}