var cats = [
    {
        title:'Cat face', src: 'http://www.google.nl/imgres?imgurl=http://dreamatico.com/data_images/cat/cat-6.jpg&imgrefurl=http://dreamatico.com/cat.html&h=1600&w=2560&tbnid=krrt7OEGWrXF5M:&docid=uM9xYXupwP9z-M&ei=JoQ3VvPDFYX9Up_fuJgG&tbm=isch&ved=0CDUQMygAMABqFQoTCPPuyOGJ8sgCFYW-FAodny8OYw'
    },
    {
        title:'Another cat', src: 'http://www.google.nl/imgres?imgurl=https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a.jpeg&imgrefurl=https://twitter.com/cats&h=640&w=638&tbnid=W79MI-OOcqCHsM:&docid=6ePtmzlTUw5vJM&ei=JoQ3VvPDFYX9Up_fuJgG&tbm=isch&ved=0CDcQMygCMAJqFQoTCPPuyOGJ8sgCFYW-FAodny8OYw'
    }
];

var selectCat = function() {
    var catSource = this.src;
    console.log(this);
};

function populateCatsList(){
    var catsList = document.getElementById('cats-list');
    cats.forEach(function (cat) {
        var c = document.createElement('div');
        c.innerHTML = cat.title;
        c.onclick = selectCat.bind(cat);
        catsList.appendChild(c);
    });
}