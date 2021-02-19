$(function() {
  
    $('#attachment').on('change', function(event) {
      var filename = $($(this).val().match(/([^\/\\]+)$/)).get(1);
      
      // file not choosed
      if (typeof filename === 'undefined') {
         return false;
      }
      
      var $file = $(this).closest('.form__file');
      
      $file
        .addClass('form__file--attached')
        .find('.form__file-filename')
        .html(filename);
      
      $file
        .find('.form__file-input')
        .prop('disabled', true);
      
      // list of files
      var $files = $('#attachment-files');
      
      // show files list
      if ($files.find('li').length === 0) {
        $files.removeClass('form__files--hide').addClass('form__files--show');
      }
      
      // create a new item
      var $item = $('<li/>')
        .addClass('form__files-item')
        .addClass('form__files-item--loading')
        .append($('<span/>').addClass('form__files-item-link').html(filename))
        .append($('<span/>').addClass('form__files-item-remove').attr('data-file-remove', true).html('Remove'))
        .append($('<span/>').addClass('form__files-item-progress'))
        .append($('<input/>').attr({ type: 'hidden', name: 'attachments[]', value: '{}'}));
      
      $files.append($item);
      
      // progress bar
      $item.find('.form__files-item-progress').animate({ width: '100%' }, 2000);
      
      $('#attachment-files').trigger('contentChanged');
      
      setTimeout(function() {
        $file.removeClass('form__file--attached');
  
        $file
          .find('.form__file-input')
          .prop('disabled', false);
        
        var v = $file.find('.form__file-filename').data('placeholder');
        $file.find('.form__file-filename').html(v);
        $file.find('.form__file-input').val('');
        
        $item
          .removeClass('form__files-item--loading')
          .addClass('form__files-item--done');
        
        $item.find('.form__files-item-link').replaceWith(function() {
          var text = $.trim($(this).text());
          return $('<a/>').attr({ href: '#', target: '_blank' }).addClass('form__files-item-link').html(text);
        });
        
        var _itemData = JSON.stringify({
            id: uuidv4(),
            name: filename,
            url_view: '',
            url_delete: ''
        }, null, '');
        
        $item
          .find('input[type=hidden]')
          .val(_itemData);
        
        console.log('File uploaded: ', JSON.parse(_itemData));
        
        $item.find('[data-file-remove=true]').on('click', function() {
          var $removeItem = $(this).closest('.form__files-item')
            , itemData = JSON.parse($removeItem.find('input[type=hidden]').attr('value'));
  
          // ajax request
          console.log('File deleted: ', itemData.id);
          
          $removeItem.addClass('form__files-item--hide');
          
          // hide files list
          if ($files.find('li').length <= 1) {
            $files.removeClass('form__files--show').addClass('form__files--hide');
          }
          
          $('#attachment-files').trigger('contentChanged');
          
          setTimeout(function() {
            $removeItem.remove();
          }, 500);
          
        });
      }, 2000);
    });
    
    $('#attachment-files').on('contentChanged', function() {
    //   console.log(1);
    //   console.log($('li', this).length);
      
      // $(this).each(function() {
      //   if ($(this).length <= 1) {
      //     $(this).removeClass('form__files--show').addClass('form__files--hide');
      //   }
      // });
    });
    
    // $("ul").children().length
    
    function uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  });