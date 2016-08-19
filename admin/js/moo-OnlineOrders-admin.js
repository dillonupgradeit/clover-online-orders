jQuery(document).ready(function($){
    window.moo_loading = '<svg xmlns="http://www.w3.org/2000/svg" width="44px" height="44px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default"><rect x="0" y="0" width="100" height="100" fill="none" class="bk"></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(0 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(30 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(60 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(90 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(120 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(150 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(180 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(210 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(240 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(270 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(300 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"></animate></rect><rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(330 50 50) translate(0 -30)">  <animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"></animate></rect></svg>';
    window.moo_first_time = true; // this variable is used to make sure the an action is happen only one time
    window.moo_nb_allItems =0;
    moo_Update_stats();
    Moo_GetOrderTypes();
    $('.moo-color-field').wpColorPicker();
    if($('#moo_progressbar_container').length == 1)
         window.bar = new ProgressBar.Line('#moo_progressbar_container', {
                strokeWidth: 4,
                easing: 'easeInOut',
                duration: 1400,
                color: '#496F4E',
                trailColor: '#eee',
                trailWidth: 1,
                svgStyle: {width: '100%', height: '100%'},
                text: {
                    style: {
                        // Text color.
                        // Default: same as stroke color (options.color)
                        color: '#999',
                        position: 'absolute',
                        right: '0',
                        top: '30px',
                        padding: 0,
                        margin: 0,
                        transform: null
                    },
                    autoStyleContainer: false
                },
                from: {color: '#FFEA82'},
                to: {color: '#ED6A5A'}
        });

});
function tab_clicked(tab)
{
    var Nb_Tabs=10; // Number for tabs
    for(var i=1;i<=Nb_Tabs;i++) {
        jQuery('#MooPanel_tabContent'+i).hide();
        jQuery('#MooPanel_tab'+i).removeClass("MooPanel_Selected");
    }
    jQuery('#MooPanel_tabContent'+tab).show();
    jQuery('#MooPanel_tab'+tab).addClass("MooPanel_Selected");
    jQuery('#MooPanel_sidebar').css('min-height',jQuery('#MooPanel_main').height()+72+'px');

    if(tab==8 &&  window.moo_first_time == true)
    {
        moo_getLatLongforMapDa();
        window.moo_first_time = false;
        moo_setup_existing_zones();
    }

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
            Moo_GetOrderTypes();
        });
}
function Moo_GetOrderTypes()
    {
        if(document.querySelector('#MooOrderTypesContent') != null)
            jQuery.post(moo_params.ajaxurl,{'action':'moo_getAllOrderTypes'}, function (data) {
            if(data.status == 'success')
            {
                var orderTypes = {};
                try {
                    orderTypes = JSON.parse(data.data);
                } catch (e) {
                    console.log("Parsing error: orderTypes");
                }
                var html='';
                html +='<div class="Moo_option-title">';

                if(orderTypes.length>0){
                    html += '<div class="label"><strong>Name</strong></div><div class="onoffswitch"><strong>Disable/Enable</strong></div>';
                    html += '<div class="onoffswitch" style="margin-left: 60px;width: 150px;">';
                    html += '<strong>Show customer address</strong></div><div style="float: right"><strong>DELETE</strong></div></div>';

                    for(var i=0;i<orderTypes.length;i++) {
                        var $ot = orderTypes[i];
                        if($ot.label == "") continue;
                        html +='<div class="Moo_option-item">';
                        html +="<div class='label'>"+($ot.label)+"</div>";
                        //enable/disable
                        html +='<div class="onoffswitch" onchange="MooChangeOT_Status(\''+$ot.ot_uuid +'\')" title="'+(($ot.status==1)?"Disable":"Enable")+' this order types">';
                        html +='<input type="checkbox" name="onoffswitch[]" class="onoffswitch-checkbox" id="myonoffswitch_'+$ot.ot_uuid+'"'+(($ot.status==1)?"checked":"")+'>';
                        html +='<label class="onoffswitch-label" for="myonoffswitch_'+$ot.ot_uuid +'">';
                        html +='<span class="onoffswitch-inner"></span> <span class="onoffswitch-switch"></span></label></div>';
                        //show shipping adress
                        html +='<div class="onoffswitch" onchange="MooChangeOT_showSa(\''+$ot.ot_uuid +'\')" style="margin-left: 100px" title="Hide/Show the shipping address for this order types">';
                        html +='<input type="checkbox" name="onoffswitch[]" class="onoffswitch-checkbox" id="myonoffswitch_sa_'+$ot.ot_uuid+'"'+(($ot.show_sa==1)?"checked":"")+'>';
                        html +='<label class="onoffswitch-label" for="myonoffswitch_sa_'+$ot.ot_uuid +'">';
                        html +='<span class="onoffswitch-inner"></span> <span class="onoffswitch-switch"></span></label></div>';
                        //delete
                        html +='<div  style="float: right"><a href="#" title="Delete this order types from the wordpress Database" onclick="Moo_deleteOrderType(event,\''+$ot.ot_uuid+'\')">DELETE</a></div></div>';
                    }
                }
                else
                  html = "<div style='text-align: center'>You don't have any OrderTypes,<br/> please import your data by clicking on <b>Import Items</b></div>";

               document.querySelector('#MooOrderTypesContent').innerHTML = html;
            }
            else
                document.querySelector('#MooOrderTypesContent').innerHTML  ="<div style='text-align: center'>Please verify your API Key<br/></div>";

        }
    );
}

function moo_Update_stats()
{
    jQuery.post(moo_params.ajaxurl,{'action':'moo_get_stats'}, function (data) {
            if(data.status=='Success'){
                window.moo_nb_allItems = data.products;
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
                setTimeout(function(){
                    jQuery('#MooPanelStats_Products').html(data.products);
                    jQuery('#MooPanelStats_Cats').html(data.cats);
                    jQuery('#MooPanelStats_Labels').html(data.labels);
                    jQuery('#MooPanelStats_Taxes').html(data.taxes);
                },5000);
            }

        }
    );
}

function MooChangeOT_Status(uuid)
{
    var ot_status = jQuery('#myonoffswitch_'+uuid).prop('checked');
    jQuery.post(moo_params.ajaxurl,{'action':'moo_update_ot_status',"ot_uuid":uuid,"ot_status":ot_status}, function (data) {
           console.log(data);
        }
    );
};
function MooChangeOT_showSa(uuid)
{
    var ot_showSa = jQuery('#myonoffswitch_sa_'+uuid).prop('checked');
    jQuery.post(moo_params.ajaxurl,{'action':'moo_update_ot_showSa',"ot_uuid":uuid,"show_sa":ot_showSa}, function (data) {
           console.log(data);
        }
    );
};
function moo_addordertype(e)
{
    e.preventDefault();

    var label   = document.querySelector('#Moo_AddOT_label').value;
    var taxable = document.querySelector('#Moo_AddOT_taxable_oui').checked ;
    if(label == "") alert("Please enter a label for your order Type")
    else
    {
        jQuery('#Moo_AddOT_loading').html(window.moo_loading);
        jQuery('#Moo_AddOT_btn').hide();

        jQuery.post(moo_params.ajaxurl,{'action':'moo_add_ot',"label":label,"taxable":taxable}, function (data) {
            if(data.status=='success')
            {
                if(data.message == '401 Unauthorized') jQuery('#Moo_AddOT_loading').html('Verify your API key');
                else
                {
                    Moo_GetOrderTypes();
                    jQuery('#Moo_AddOT_loading').html('');
                    jQuery('#Moo_AddOT_btn').show();
                }

            }
            else
            {
                jQuery('#Moo_AddOT_loading').html('Verify your API key');
            }


            }
        );
    }

}
function Moo_deleteOrderType(e,uuid)
{
    e.preventDefault();
    jQuery.post(moo_params.ajaxurl,{'action':'moo_delete_ot',"uuid":uuid}, function (data) {
            Moo_GetOrderTypes();
        }
    );
}

function MooSendFeedBack(e)
{
    e.preventDefault();
    var msg =  jQuery("#Moofeedback").val();
    var email =  jQuery("#MoofeedbackEmail").val();
    if(msg == '')
    {
        alert("Please enter your message");
    }
    else
    {
        jQuery.post(moo_params.ajaxurl,{'action':'moo_send_feedback','message':msg,'email':email}, function (data) {
            if(data.status == "Success"){
                alert("Thank you for your feedback.");
                jQuery("#Moofeedback").val("");
            }
        });
    }
}
/* Modifiers Panel */

function Moo_changeModifierGroupName(uuid)
{
    var mg_name = jQuery('#Moo_ModifierGroupNewName_'+uuid).val();
    jQuery.post(moo_params.ajaxurl,{'action':'moo_change_modifiergroup_name',"mg_uuid":uuid,"mg_name":mg_name}, function (data) {
           jQuery('#Moo_ModifierGroupSaveName_'+uuid).show();
        }
    );
    setTimeout(function () {
        jQuery('#Moo_ModifierGroupSaveName_'+uuid).hide();
    }, 5000);


}
function MooChangeModifier_Status(uuid)
{
    var mg_status = jQuery('#myonoffswitch_'+uuid).prop('checked');
    jQuery.post(moo_params.ajaxurl,{'action':'moo_update_modifiergroup_status',"mg_uuid":uuid,"mg_status":mg_status}, function (data) {
            console.log(data);
        }
    );
}
/* Categories Panel */
function Moo_changeCategoryName(uuid)
{
    var cat_name = jQuery('#Moo_categoryNewName_'+uuid).val();
    if(cat_name != '')
        jQuery.post(moo_params.ajaxurl,{'action':'moo_change_category_name',"cat_uuid":uuid,"cat_name":cat_name}, function (data) {
                jQuery('#Moo_CategorySaveName_'+uuid).show();
            }
        );
        setTimeout(function () {
            jQuery('#Moo_CategorySaveName_'+uuid).hide();
        }, 5000);


}
function MooChangeCategory_Status(uuid)
{
    var cat_status = jQuery('#myonoffswitch_'+uuid).prop('checked');
    jQuery.post(moo_params.ajaxurl,{'action':'moo_update_category_status',"cat_uuid":uuid,"cat_status":cat_status}, function (data) {
            console.log(data);
        }
    );
}

/* Upload Imges function */
var media_uploader  = null;
var moo_item_images = [];

function open_media_uploader_image()
{
    media_uploader = wp.media({
        frame:    "post",
        state:    "insert",
        multiple: false
    });

    media_uploader.on("insert", function(){
        var json = media_uploader.state().get("selection").first().toJSON();
        var image_url = json.url;
        var image_caption = json.caption;
        var image_title = json.title;
        moo_item_images[image_title] = image_url;
        moo_display_item_images();
    });
    media_uploader.open();
}

function moo_display_item_images()
{
    jQuery('#moo_itemimagesection').html('');
    for(i in moo_item_images ){
        var image = moo_item_images[i];
        var html = '<div class="moo_itemsimages_oneimg">'+
                   '<div><img src="'+image+'" alt=""></div>'+
                   '<div class="moo_itemsimages_oneimg_options"><a href="#" onclick="moo_delete_item_images(\''+i+'\')">delete</a></div></div>';
        jQuery('#moo_itemimagesection').append(html);

    }

}
function moo_delete_item_images(id)
{
    delete(moo_item_images[id]);
    moo_display_item_images();
}
function moo_save_item_images(uuid)
{
    var description = jQuery('#moo_item_description').val();
    var images = [];
    for(i in moo_item_images ){
        var img = moo_item_images[i];
        images.push(img);
    }
    if(description.length>250)
    {
        alert("Description too long");
        return
    }
    if(description != "" || Object.keys(moo_item_images).length>0)
    {
        jQuery.post(moo_params.ajaxurl,{'action':'moo_save_items_with_images',"item_uuid":uuid,"description":description,"images":images}, function (data) {
                if(data.status == 'Success')
                {
                    if(data.data==true)
                    {
                        alert("Your changes were saved");
                        history.back();
                    }

                    else
                    // echo error message
                        alert("Error when saving your changes, please try again")
                }
                else
                // echo error message
                    alert("Error when saving your changes, please try again")
            }
        );
    }
    else
    {
        history.back();
    }

}

function moo_get_item_with_images(uuid)
{
    jQuery.post(moo_params.ajaxurl,{'action':'moo_get_items_with_images',"item_uuid":uuid}, function (data) {
        var items = data.data;
        for(i in items ){
            var item = items[i];
            if(item._id)
                moo_item_images[item._id] = item.url;
        }
        moo_display_item_images();
        jQuery('#moo_item_description').val(items[0].description);
        jQuery('#moo_item_name').text(items[0].name);
        jQuery('#moo_item_price').text("$"+items[0].price/100);
    }
    );
}

function MooPanel_UpdateItems(event)
{
    event.preventDefault();
    window.bar.animate(0.01);
    window.bar.setText('1 %');
    moo_upadateItemsPerPage(0)
}
function MooPanel_UpdateCategories(event)
{
    event.preventDefault();
    window.bar.animate(0.01);
    window.bar.setText('1 %');

    jQuery.post(moo_params.ajaxurl,{'action':'moo_update_categories'}, function (data)
        {
            window.bar.animate(0.5);
            window.bar.setText('50 %');
        }
    ).done(function () {
            alert("Categories updated");
            window.bar.animate(1.0);
            window.bar.setText('100 %');

    });
}
function MooPanel_UpdateModifiers(event)
{
    event.preventDefault();
    window.bar.animate(0.01);
    window.bar.setText('1 %');
    jQuery.post(moo_params.ajaxurl,{'action':'moo_update_modifiers_groups'}, function (data)
        {
            window.bar.animate(0.5);
            window.bar.setText('50 %');
        }
    ).done(function () {
        jQuery.post(moo_params.ajaxurl,{'action':'moo_update_modifiers'}, function (data)
            {
                window.bar.animate(1.0);
                window.bar.setText('100 %');
            }
        ).done(function () {
            alert("Modifiers updated");
            window.bar.animate(1.0);
            window.bar.setText('100 %');

        });

    });
}
function moo_upadateItemsPerPage(page)
{
    var received = 0;
    jQuery.post(moo_params.ajaxurl,{'action':'moo_update_items','page':page}, function (data)
    {
        received = data.received;
        var percent_loaded = data.received*100/window.moo_nb_allItems;
        if(percent_loaded == null)
            percent_loaded = 1;
        window.bar.animate(bar.value()+percent_loaded/100);
        window.bar.setText(Math.round(percent_loaded+bar.value()*100) + ' %');
    }
    ).done(function () {
        if(received>0)
            moo_upadateItemsPerPage(page+1)
        else
        {
            alert("Items updated");
            window.bar.animate(1.0);
            window.bar.setText('100 %');
            moo_Update_stats();

        }
    });
}
