var admin = (function() {
  var model = {

  };
  var controller = {
    init : function() {
      view.toggle();
      var button = $("#toggleAdmin");
      button.onclick = view.toggle;

    },
    adminOpened : function(){
      model.cat = runApp.model;

    },
    save : function() {

    }
  };

  var view = {
    getSaveButton : function() {
      return $("#admin-save");
    },
    getCancelButton : function() {
      return $("#admin-cancel");
    },
    getAdminView : function() {
      return $("#admin");
    },
    toggle : function() {
      view.getAdminView().toggleClass('invisible');
      if (!view.getAdminView().hasClass('invisible')){
        controller.adminOpened();
      }
    },
    render : function() {
      
    }

  };

  controller.init();

});