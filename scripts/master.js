window.onload = function(){
  document.querySelector('#search').addEventListener('click', function(){
    var query = document.querySelector('#query').value;
    var result = null;
    
    $(function() {
      $.ajax({url:"https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&search=" + query,
         success:function(data){
            result = data;
           parseResponse(result, document.querySelector('.search-results'));
         },
         error:function() {
            alert("Error");
         },
         dataType:"jsonp",
         type:"post"
      });
    });
    
    //this function receive json data from wikipedia and is parsed, returning dom elements
    function parseResponse(data, parent){
       parent.innerHTML = '';
       if (data.error){
         var errorPopup = document.createElement('div');
         errorPopup.className = 'error-popup';
         errorPopup.innerHTML = '<h2>Error:</h2>' + data.error.info;
         parent.appendChild(errorPopup);
       } else {
         for (var i = 0; i < data[1].length; i++){
           var childElement = document.createElement('li');
           childElement.className = 'result';
           childElement.innerHTML = '<a href="' + data[3][i] + '"><p class="article-title">' + data[1][i] + '</p><p>' + data[2][i] + '</p></a>';
           parent.appendChild(childElement);
         }
       }
    }
  });
  
  document.querySelector('#random').addEventListener('click', function(){
    window.location.href = 'https://en.wikipedia.org/wiki/Special:Random';
  });
}