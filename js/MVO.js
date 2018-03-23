var data_cats = {
    init:function(){
        //if (!localStorage.cats) {
        //Initialize and/or empty the localstorage when page refresh or loads.
        localStorage.cats = JSON.stringify([]);
        //}
    },
    add: function(obj){
        var cats=JSON.parse(localStorage.cats);
        cats.push(obj);
        localStorage.cats=JSON.stringify(cats);
    },
    update: function(id, obj){
        var cats=JSON.parse(localStorage.cats);
        cats[id]=obj;
        localStorage.cats=JSON.stringify(cats);
    },
    getAll: function(){
        return JSON.parse(localStorage.cats);
    },
    getById: function(id){
        return JSON.parse(localStorage.cats)[id];
    }
};

var octopus = {
    init: function(){
        data_cats.init();

        data_cats.add({name:'lola', imgsrc:'img/kitten1.jpg', lastcount: 0});
        data_cats.add({name:'sita', imgsrc:'img/kitten2.jpg', lastcount: 0});
        data_cats.add({name:'manu', imgsrc:'img/kitten3.jpg', lastcount: 0});
        data_cats.add({name:'chakki', imgsrc:'img/kitten4.jpg', lastcount: 0});
        data_cats.add({name:'poocha', imgsrc:'img/kitten5.jpg', lastcount: 0});

        view_list.init();
        view_cat.init();
    },
    getAllCats: function(){
        return data_cats.getAll();
    },
    clickCat: function(catId){
        thisCat=data_cats.getById(catId);
        thisCat.lastcount +=1;
        data_cats.update(catId, thisCat)
        return thisCat.lastcount;
    }
};

var view_list = {
    init: function() {
        this.cat_list=document.getElementById('cat-list');
        view_list.render();
    },
    render: function(){
        var htmlStr = '';
        var i = 0;
        octopus.getAllCats().forEach(function(cat){
            var catItem=document.createElement('div')
            catItem.innerHTML=cat.name;
            catItem.setAttribute("class", "cat-name");
            catItem.setAttribute("id", "cat-name" + i);
            catItem.addEventListener("click",function(e){
                var catId=e.target.id.replace('cat-name','cat-frame')
                var catFrames=document.getElementsByClassName('cat-frame');
                [].forEach.call(catFrames, function(catFrame){
                    catFrame.style.display='none';
                });
                document.getElementById(catId).style.display='block';
            });
            document.getElementById('cat-list').appendChild(catItem);
            i += 1;
        });
    }
};

var view_cat = {
    init: function() {
        this.cat_display=document.getElementById('cat-display');
        view_cat.render();
    },
    render: function(){
        var htmlStr = '';
        var i=0;
        octopus.getAllCats().forEach(function(cat){
            var catImg=document.createElement('div')
            var htmlStr =  '<p>' + cat.name + '  ' +
                        '<span class="click-counter">0</span>' + '</p>' +
                        '<img class="cat-image" src="' + cat.imgsrc + '">' ;
            catImg.innerHTML=htmlStr;
            catImg.setAttribute("class", "cat-frame");
            catImg.setAttribute("id", "cat-frame" + i);

            document.getElementById('cat-display').appendChild(catImg);

            i += 1;
        });
        $('.cat-display').on('click', '.cat-frame', function(e){
                var thisCat = e.target.closest('.cat-frame');
                var catId = thisCat.id.replace('cat-frame','');
                var clickCount=octopus.clickCat(catId);
                var clickCountDiv=thisCat.getElementsByClassName("click-counter")[0];
                //alert(clickCountDiv);
                clickCountDiv.innerHTML=clickCount;
                //alert(clickCount);
                return false;
        });
    }
};

octopus.init();