$('#delete').on('click', function(e){
    e.preventDefault();
    
    
    $('input:checked').each(function(index, val){
       var $id = $(this).attr('id');
       var $this = $(this);
       
       $.ajax({
           url: '/contacts/'+$id,
           method: 'DELETE'
       }).done(function(){
           $this.parents('tr').remove();
       });
    });
})