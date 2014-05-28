$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.url = 'http://localhost:3000' + options.url;
});

$.fn.serializeObject = function() {
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};


    $('input:checkbox').change(function () {
    if ($('input[type=checkbox]:checked').length > 0) {
        $('#btnCheckin').show();
    } else {
        $('#btnCheckin').hide();
    }
});
