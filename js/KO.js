var viewCatModel = function(){
    this.clickCount=ko.observable(0);
    this.name=ko.observable('lola');
    this.imgSrc=ko.observable('img/kitten1.jpg');
    this.nicknames=['Mr.T','cutiepie','funky monkey','popo'];

    incrementCounter=function(){
        this.clickCount(this.clickCount() + 1);
    };

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

ko.applyBindings(new viewCatModel());

