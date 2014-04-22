Handlebars.registerHelper('isChecked', function(context, options) {
  return ($(".context").is(':checked')) ? options.fn : options.inverse;
});