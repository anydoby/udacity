var Cat = function(title, src) {
  this.title = title;
  this.src = src;
  this.count = 0;
};

Cat.prototype.constructor = Cat;
Cat.prototype.getCount = function() {
  return this.count;
};
Cat.prototype.incrementCount = function() {
  this.count++;
};

var runApp = (function() {
  var model = {
    cats : [ new Cat('Cat 1', 'http://dreamatico.com/data_images/cat/cat-1.jpg'),
        new Cat('Cat 2', 'http://dreamatico.com/data_images/cat/cat-2.jpg'),
        new Cat('Cat 3', 'http://dreamatico.com/data_images/cat/cat-3.jpg'),
        new Cat('Cat 4', 'http://dreamatico.com/data_images/cat/cat-4.jpg'),
        new Cat('Cat 5', 'http://dreamatico.com/data_images/cat/cat-5.jpg'), ],

  };
  var controller = {

    init : function() {
      controller.selectCat.call(model.cats[0]);
    },

    selectCat : function() {
      model.selectedCat = this;
      controller.renderAll();
    },

    renderAll : function() {
      views.forEach(function(view) {
        view.render();
      });
    },

    getSelectedCat : function() {
      return model.selectedCat;
    },

    getCats : function() {
      return model.cats;
    },

    catClicked : function() {
      this.incrementCount();
      controller.renderAll();
    }

  };

  var views = [ {
    render : function() {
      var catsList = document.getElementById('cats-list');
      catsList.innerHTML = '';
      controller.getCats().forEach(function(cat) {
        var c = document.createElement('div');
        c.innerHTML = cat.title;
        c.onclick = controller.selectCat.bind(cat);
        catsList.appendChild(c);
      });
    }
  }, {
    render : function() {
      var img = document.getElementById("cat-image");
      var counter = document.getElementById("counter");
      if (controller.getSelectedCat()) {
        img.src = controller.getSelectedCat().src;
        img.onclick = controller.catClicked.bind(controller.getSelectedCat());
        counter.innerHTML = controller.getSelectedCat().getCount();
      } else {
        img.src = '';
        counter.innerHTML = '';
      }
    }
  } ];

  controller.init();
});