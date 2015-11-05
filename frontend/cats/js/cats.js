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
  catsModel = {
    cats : [ new Cat('Cat 1', 'http://dreamatico.com/data_images/cat/cat-1.jpg'),
        new Cat('Cat 2', 'http://dreamatico.com/data_images/cat/cat-2.jpg'),
        new Cat('Cat 3', 'http://dreamatico.com/data_images/cat/cat-3.jpg'),
        new Cat('Cat 4', 'http://dreamatico.com/data_images/cat/cat-4.jpg'),
        new Cat('Cat 5', 'http://dreamatico.com/data_images/cat/cat-5.jpg'), ],
    selectedCat : null
  };
  catsController = {

    init : function() {
      catsController.selectCat.call(catsModel.cats[0]);
    },

    selectCat : function() {
      catsModel.selectedCat = this;
      catsController.renderAll();
    },

    renderAll : function() {
      views.forEach(function(view) {
        view.render();
      });
    },

    getSelectedCat : function() {
      return catsModel.selectedCat;
    },

    getCats : function() {
      return catsModel.cats;
    },

    catClicked : function() {
      this.incrementCount();
      catsController.renderAll();
    }

  };

  var views = [ {
    render : function() {
      var catsList = $('#cats-list');
      catsList.empty();
      catsController.getCats().forEach(function(cat) {
        var c = document.createElement('div');
        c.innerHTML = cat.title;
        c.onclick = catsController.selectCat.bind(cat);
        catsList.append(c);
      });
    }
  }, {
    render : function() {
      var img = $("#cat-image");
      var counter = $("#counter");
      if (catsController.getSelectedCat()) {
        img.attr('src',catsController.getSelectedCat().src);
        img.attr('title',catsController.getSelectedCat().title);
        img.off("click");
        img.click(catsController.catClicked.bind(catsController.getSelectedCat()));
        counter.text(catsController.getSelectedCat().getCount());
      } else {
        img.attr('src','');
        img.attr('title','');
        img.off("click");
        counter.text('');
      }
    }
  } ];

  catsController.init();
});