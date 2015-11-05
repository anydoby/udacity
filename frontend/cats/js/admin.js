var admin = (function() {
  var model = {
      cat : null
  };
  var controller = {
    init : function() {
      view.toggle();
      var button = $("#toggleAdmin");
      button.click( function(){
        view.toggle();
        if (view.isVisible()) {          
          model.cat = $.extend({},catsModel.selectedCat);
          view.render();
        }
      });
      view.getSaveButton().click(controller.save);
      view.getCancelButton().click(controller.closeAdmin);
    },
    getCat : function() {
      return model.cat;
    },
    save : function() {
      var form = view.getAdminForm();
      var object = form.serializeObject();
      $.extend(catsModel.selectedCat, object);
      catsController.renderAll();
      view.toggle();
    },
    closeAdmin : function(){
      view.toggle();
    }
  };

  var view = {
    getSaveButton : function() {
      return $("#admin-save");
    },
    isVisible : function(){
      return !view.getAdminView().hasClass('invisible');
    },
    getCancelButton : function() {
      return $("#admin-cancel");
    },
    getAdminView : function() {
      return $("#admin");
    },
    toggle : function() {
      view.getAdminView().toggleClass('invisible');
    },
    getAdminForm : function() {
      return $("#admin-form");
    },
    render : function() {
      if (controller.getCat()) {
        view.getAdminForm().populate(controller.getCat());
      }
    }
  };

  controller.init();

});