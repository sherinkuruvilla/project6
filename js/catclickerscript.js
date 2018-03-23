
function clickerEventHandler(e) {

    var $body = $('body');
    var clickedElem = '#'+ $(this).attr("id");
    var catid = Number(clickedElem.replace("#catimg",""));
    //alert(catid);
    if (catid === 1) {
        catname='jack';
    } else if (catid === 2){
        catname = 'jill';
    };
    var $catImg = $(clickedElem);

    var clickCount = '#'+'clickCount'+catid.toString();
    //alert(clickCount + '  ' + clickedElem);
    var $clickCount = $('#clickCount'+catid.toString());
    var $catName = $('#catname'+catid.toString());

    // clear out old data before new request
    var clickCount=Number($clickCount.text()) +1;
    $clickCount.text(clickCount);
    $catName.text(catname);
    //alert(e.number);

    return false;
};

$('#catimg1').click(clickerEventHandler);
$('#catimg2').click(clickerEventHandler);
