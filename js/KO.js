var Cat = function(){
    this.clickCount=ko.observable(0);
    this.name=ko.observable('lola');
    this.imgSrc=ko.observable('img/kitten1.jpg');
    this.nicknames=ko.observableArray([{name:'Mr.T'},{name:'cutiepie'},{name:'funky monkey',},{name:'popo'}]);
    //this.nicknams=ko.observableArray(['Mr.T','cutiepied','funky monkey','popo']); //$data


    this.upperName=ko.computed(function(){
        return this.name().toUpperCase();
    }, this);

    this.level=ko.computed(function(){
        if (this.clickCount() < 10) {
            return 'Infant';
        } else if (this.clickCount() < 25) {
            return 'Teen';
        } else {
            return 'Adult';
        };
    }, this);

};

var viewCatModel = function(){
    this.currentCat=ko.observable(new Cat());
    incrementCounter=function(){
        this.currentCat().clickCount(this.currentCat().clickCount() + 1);
    };
};



ko.applyBindings(new viewCatModel());

