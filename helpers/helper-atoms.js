(function() {
  module.exports.register = function(Handlebars, options) {

    var grunt  = require('grunt');
    path = require('path');

    /*
     * Function for using minimatch patterns to grab the files and render a list
     */
    var atoms = function(src) {
      var content;
      return content = grunt.file.expand(src).map(function(path) {
        return {path: path};
      }).map(function(obj) {

        var filecontent = globFiles(obj.path);
        var filename = path.basename(obj.path, '.hbs').replace('helper-', '');
        return  filecontent + '\n';
      }).join(grunt.util.normalizelf(grunt.util.linefeed));
    };

    var globFiles = function(src) {
      var content = grunt.file.expand(src).map(grunt.file.read).join(grunt.util.normalizelf(grunt.util.linefeed));
      return content;
    };


    Handlebars.registerHelper('if_lt', function(context, options) {
        if (context < options.hash.compare)
            return options.fn(this);
        return options.inverse(this);
    });


  Handlebars.registerHelper('ifEven', function (index, options) {
   if(index%2 == 0)
      return options.fn(this);
   else 
      return options.inverse(this);
   });





    /*
     * atoms helper
     */
    Handlebars.registerHelper("atoms", function(src) {
      return new Handlebars.SafeString(atoms(src));
    });



    Handlebars.registerHelper('to_fixed', function(a) {
     
        return Number(a).toFixed(2);
    });


    Handlebars.registerHelper('times', function(n, block) {
      var accum = '';
      for(var i = 0; i < n; ++i)
        accum += block.fn(i);
      return accum;
    });

     Handlebars.registerHelper('times1', function(n, block) {
      var accum = '';
      for(var i = 1; i < n+1; ++i)
        accum += block.fn(i);
      return accum;
    });

     Handlebars.registerHelper('if_eq', function(a, b, opts) {
      if(a == b)
        return opts.fn(this);
      else
        return opts.inverse(this);
    });
     Handlebars.registerHelper('unless_eq', function(context, options) {
        if (context == options.hash.compare)
            return options.inverse(this);
        return options.fn(this);
    });

     Handlebars.registerHelper('for', function(from, to, incr, block) {
      var accum = '';
      for(var i = from; i < to; i += incr)
        accum += block.fn(i);
      return accum;
    });

//      Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
//     lvalue = parseFloat(lvalue);
//     rvalue = parseFloat(rvalue);
        
//     return {
//         "+": lvalue + rvalue,
//         "-": lvalue - rvalue,
//         "*": lvalue * rvalue,
//         "/": lvalue / rvalue,
//         "%": lvalue % rvalue
//     }[operator];
// });










    Handlebars.registerHelper('default',function(options) {
        if (!this._switch_break_) {
            return options.fn(this);
        }
    });

Handlebars.registerHelper('switch', function(value, options) {
       this._switch_value_ = value;
        this._switch_break_ = false;
        var html = options.fn(this);
        delete this._switch_break_;
        delete this._switch_value_;
        return html;
});

Handlebars.registerHelper('case', function() {
     var args = Array.prototype.slice.call(arguments);
        var options    = args.pop();
        var caseValues = args;

        if (this._switch_break_ || caseValues.indexOf(this._switch_value_) === -1) {
            return '';
        } else {
            if (options.hash.break === true) {
                this._switch_break_ = true;
            }
            return options.fn(this);
        }
});


helpers.random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};












  };
}).call(this);
