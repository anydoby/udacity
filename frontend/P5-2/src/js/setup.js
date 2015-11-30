var ENTER_KEY = 13;
var app = app || {};
var $b = Backbone;

function parseDob(input) {
  var dob = /((\d{1,2})\s+)?(January|February|March|April|May|June|July|August|September|October|November|December)\s+((\d{1,2})\s+)?(\d{4})/g;
  var match = dob.exec(input);
  if (match) {
    var day = match[2] || match[5] || 1;
    var month = match[3] || 1;
    var year = match[6];
    return new Date(month + ' ' + day + ', ' + year);
  } else {
    var age = /\d+/g;
    var match = age.exec(input);
    if (match) {
      var date = new Date();
      date.setFullYear(date.getFullYear() - match[0]);
      return date;
    }
  }
}

function parseSex(input) {
  var pattern = /(Man|Male|M|Boy)|(Woman|Female|W|Girl)/i;
  var match = pattern.exec(input);
  if (match) {
    return match[1] ? 'M' : 'W';
  }
}

function parseWeight(input) {
  var pattern = /((\d+\.?\d*)\s*(kg|kilos|kilo|k|kilogram))|((\d+\.?\d*)\s*(l|lb|lbs|pound|pounds))/i;
  var match = pattern.exec(input);
  if (match) {
    return match[2] || match[5] * 0.453592;
  }
}

function parseHeight(input) {
  var pattern = /((\d+\.?\d*)\s*(m|meters|meter))|((\d+\.?\d*)\s*(cm|centimeters|centimeter))|((\d+\.?\d*)\s*('|foot|feet|ft))|((\d+\.?\d*)\s*("|inch|in|inches))/ig;
  var match;
  var total = 0;
  while (match = pattern.exec(input)) {
    if (match[1]) {
      total += match[2] * 100;
    }
    if (match[4]) {
      total += match[5] * 1;
    }
    if (match[7]) {
      total += match[8] * 30.48;
    }
    if (match[10]) {
      total += match[11] * 2.54;
    }
  }
  if (total != 0) {
    return total;
  }
}

(function() {
  app.User = $b.Model.extend({
    localStorage : new $b.LocalStorage("ht-user")
  });

  app.SetupWizzard = $b.View.extend({
    el : $('#setup'),
    events : {
      "keypress input" : "checkEnterKey"
    },
    step : 0,
    steps : [ {
      id : 'name',
      validation : function(input) {
        return /\w+/g.test(input) ? input : null;
      }
    }, {
      id : 'dob',
      validation : function(input) {
        return parseDob(input);
      }
    }, {
      id : 'sex',
      validation : function(input) {
        return parseSex(input);
      }
    }, {
      id : 'activity',
      validation : function(input) {
        var times = /\d+/g;
        return times.test(input) ? input.trim() : null;
      }
    }, {
      id : 'weight',
      validation : function(input) {
        return parseWeight(input);
      }
    }, {
      id : 'height',
      validation : function(input) {
        return parseHeight(input);
      }
    }

    ],

    initialize : function() {
      this.field = this.$('#setup-' + this.currentStep() + '-field');
    },

    currentStep : function() {
      return this.steps[this.step].id;
    },

    validate : function() {
      return this.steps[this.step].validation;
    },

    render : function() {
      this.steps.forEach(function(s) {
        this.$('#setup-' + s.id).addClass('hidden');
        this.$('#setup-' + s.id + "-error").addClass('hidden');
      });
      this.$el.removeClass('hidden');
      this.$('#setup-' + this.currentStep()).removeClass('hidden');
    },

    checkEnterKey : function(e) {
      if (e.keyCode === ENTER_KEY) {
        this.nextStep();
      }
    },

    setStep : function(step) {
      this.step = step;
      if (this.step < this.steps.length) {
        // go to next step in the wizzard
        this.initialize();
        this.render();
        app.router.navigate("setup/" + step);
      } else {
        // end of wizzard
        this.done();
      }
    },

    nextStep : function() {
      var input = this.field.val();
      var currentStep = this.currentStep();
      var parsedAndValidatedValue;
      if (parsedAndValidatedValue = this.validate()(input)) {
        this.model.set(currentStep, parsedAndValidatedValue);
        this.setStep(this.step + 1);
      } else {
        // show error if validation failed
        this.$('#setup-' + currentStep + "-error").removeClass('hidden');
      }
    },
    done : function() {
      this.model.save();
      this.$el.addClass("hidden");
      var today = new Date();
      app.router.navigate("day/" + today.getFullYear() + "-" + today.getMonth() + "-" + today.getDay());
    }
  });

})();