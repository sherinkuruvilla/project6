var data_cats = {
    init:function(){
        cats=[
            {name:'lola', imgsrc:'img/kitten1.jpg', lastcount: 0},
            {name:'sita', imgsrc:'img/kitten2.jpg', lastcount: 0},
            {name:'manu', imgsrc:'img/kitten3.jpg', lastcount: 0},
            {name:'chakki', imgsrc:'img/kitten4.jpg', lastcount: 0},
            {name:'poocha', imgsrc:'img/kitten5.jpg', lastcount: 0}
        ];
        this.currentCat=cats[0];
    },
    currentCat: {},
    getAll: function(){
        return cats;
    }
};

var octopus = {
    init: function(){
        data_cats.init();
        view_admin.init();
        view_list.init();
        view_cat.init();

    },
    setCurrentCat: function(obj){
        data_cats.currentCat=obj;
    },
    getCurrentCat: function(){
        return data_cats.currentCat;
    },
    getAllCats: function(){
        return data_cats.getAll();
    },
    clickCat:function(){
        data_cats.currentCat.lastcount +=1;
        view_cat.render();
    },
    clickCat:function(){
        data_cats.currentCat.lastcount +=1;
        view_cat.render();
    }
};

var view_list = {
    init: function() {
        this.catListElem=document.getElementById('cat-list');
        view_list.render();
    },
    render: function(){
        this.catListElem.innerHTML='';
        var i = 0;
        octopus.getAllCats().forEach(function(cat){
            var catItem=document.createElement('div')
            catItem.innerHTML=cat.name;
            catItem.setAttribute("class", "cat-name");
            catItem.setAttribute("id", "cat-name" + i);
            catItem.addEventListener("click",function(e){
                return function(obj){
                        octopus.setCurrentCat(obj);
                        view_cat.render();
                }(cat);
            });
            document.getElementById('cat-list').appendChild(catItem);
            i += 1;
        });
    }
};

var view_cat = {
    init: function() {
        this.catFrameNameElem=document.getElementById('cat-frame-name');
        this.clickCounterElem=document.getElementById('click-counter');
        this.catImageElem=document.getElementById('cat-image');
        this.catImageElem.addEventListener("click",function(e){
            octopus.clickCat();
            });
        this.render();
    },
    render: function(){
        var cat=octopus.getCurrentCat();
        this.catFrameNameElem.textContent=cat.name;
        this.clickCounterElem.textContent=cat.lastcount;
        this.catImageElem.src=cat.imgsrc;
        view_admin.hideAdmin();
    }
};

var view_admin = {
    init: function(){
        this.adminBtnElem=document.getElementById('admin-btn');
        this.adminElem=document.getElementById('admin');
        this.catNameInputElem=document.getElementById('cat-name-input');
        this.ImgSrcInputElem=document.getElementById('cat-image-input');
        this.clickCounterInputElem=document.getElementById('click-counter-input');
        this.cancelBtnElem=document.getElementById('cancel-btn');
        this.submitBtnElem=document.getElementById('submit-btn');
        this.adminBtnElem.addEventListener("click", function(e){
            view_admin.displayAdmin();
        });
        this.cancelBtnElem.addEventListener("click", function(e){
            view_admin.hideAdmin();
        });
        this.submitBtnElem.addEventListener("click", function(e){
            view_admin.save();
        });
    },
    displayAdmin:function(){
        var cat=octopus.getCurrentCat();
        this.catNameInputElem.value=cat.name;
        this.ImgSrcInputElem.value=cat.imgsrc;
        this.clickCounterInputElem.value=cat.lastcount;
        this.adminElem.style.display='block';
       // alert('display');
    },
    hideAdmin:function(){
        this.adminElem.style.display='none';
      //  alert('hide');
    },
    save:function(){
      var cat=octopus.getCurrentCat();
      cat.name=this.catNameInputElem.value;
      cat.imgsrc=this.ImgSrcInputElem.value;
      cat.lastcount=Number(this.clickCounterInputElem.value);
      view_list.render();
      view_cat.render();
      this.adminElem.style.display='none';
    }
};
octopus.init();