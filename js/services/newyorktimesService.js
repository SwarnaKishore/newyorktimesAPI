codeWalkThrough.factory('newyorktimesService', function($http) {
    return {
        getRequestedResults: function(searchString, startYear, endYear) {
       	    var baseSearchURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=a56b24ab430f4f9badd6af40ba347eb3&sort=oldest';
        	if(searchString !== "")
             {
        		baseSearchURL = baseSearchURL + '&q="'+ searchString + '"';
        	 }

            if(startYear !== "")
            {
                baseSearchURL = baseSearchURL + '&begin_date='+ startYear + '0101';
            }

            if(endYear !== "")
            {
                baseSearchURL = baseSearchURL + '&end_date='+ endYear + '0101';
            }
        
            return $http.get(baseSearchURL);
        }
    };
});
