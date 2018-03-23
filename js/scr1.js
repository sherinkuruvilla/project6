// clear the screen for testing
document.body.innerHTML = '';

var nums = [1,2,3,4,5];

var list = document.createElement('ul');
list.innerHTML='Select a cat';
document.body.appendChild(list);



var kittens = ['lola','fema','hira','mala','sita']

// Let's loop over the numbers in our array
for (var i = 0; i < nums.length; i++) {

    // This is the number we're on...
    var num = nums[i];

    // We're creating a DOM element for the number

    var item = document.createElement('li');
    item.textContent = 'cat ' + num;

    var display = document.createElement('div');
    display.textContent=kittens[num-1];
    var img = document.createElement('img');
    img.src='img/kitten' + num + '.jpg';
    img.height = '200';
    display.appendChild(img)
    var counter = document.createElement('div');
    counter.textContent='0';
    display.appendChild(counter);
    display.id = 'display'+num;
    display.className = 'cats'
    display.style.display = 'none';

    // ... and when we click, alert the value of `num`
    item.addEventListener('click', (function(numCopy) {
        return function() {
            //alert(numCopy);
            elems = document.getElementsByClassName('cats')
            var i;
            for (i = 0; i < elems.length; i++) {
                elems[i].style.display = 'none';
            }

            elem=document.getElementById('display'+numCopy)
            elem.style.display = 'block';
//alert(elem.children[1].textContent)
            var clickCount=Number(elem.children[1].textContent) +1;
            elem.children[1].textContent = clickCount;



        };
    })(num));

    list.appendChild(item);



    document.body.appendChild(display);





};