
   codeWalkThrough.controller('newyorktimesController',function ($scope, newyorktimesService, $log, $timeout)
   {
  
      $scope.startYear = 1850;
      $scope.endYear = 2017;
      $scope.searchString = "";
      $scope.showArticles = false;
      $scope.articles = [];
      $scope.lastSearchAt = "";

      $scope.checkIfEnterKeyWasPressed = function($event)
      {
        var keyCode = $event.which || $event.keyCode;
        if (keyCode === 13) 
        {
         fetchQueryResults();
         $scope.showArticles = true;
        }
      };

      $scope.yearSelectionChanged = function()
      {
        fetchQueryResults();
        $scope.showArticles = true;
      }

      function fetchQueryResults()
      {
        $scope.lastSearchAt = new Date();
        newyorktimesService.getRequestedResults($scope.searchString, $scope.startYear, $scope.endYear).then(function(apiResponse)
        {
            for(i = 0; i < apiResponse.data.response.docs.length; i++)
            {
              var item = apiResponse.data.response.docs[i];
              var article = {};
              article.title = item.headline.main;
              article.url = item.web_url;
              article.date = moment(item.pub_date).format('MMMM Do YYYY');
              article.paragraph = getArticleParagraph(item);
              $scope.articles[i] = article;
            }

        });
      }

      function getArticleParagraph(item)
      {
        if(item.lead_paragraph !== "")
        {
          return item.lead_paragraph;
        }

        if(item.abstract !== "")
        {
          return item.abstract;
        }

        if(item.snippet !== "")
        {
          return item.snippet;
        }

      }

      var slider = document.getElementById('yearSlider');
      noUiSlider.create(slider, {
         start: [1850, 2017],
         connect: true,
         step: 1,
         range: {
           'min': 1850,
           'max': 2017
         },
         format: wNumb({
           decimals: 0
         })
      });

      slider.noUiSlider.on('update', function( values, handle )
      {
        $timeout(function() 
        {
          $scope.startYear = values[0];
          $scope.endYear = values[1];
        }, 100);

        $timeout(function() 
        {
           if($scope.lastSearchAt == "" || 
            ((new Date().getTime() - $scope.lastSearchAt.getTime())/1000 > 2))
           {
              $scope.yearSelectionChanged();
           }
        }, 1000)
      });
      

   });
      
