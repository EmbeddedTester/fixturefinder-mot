// Admin password service server: PtmKbnhBzA_Yc8Wuadad!!§§
var FixtureRetriever = function() {

    var clearOldData = function() {
        $('.fixtures .info .numberOfFixtures').empty();
        $('.fixtures .fixture').remove();
    };

    var fixtures = [];
    FixtureFinder.FixtureRetriever = {
        filterCurrentWith: function(filter) {
            FixtureParser.parseFixtures(filter(fixtures));
        },
        getFixturesByDate: function(date, filter) {
            var url = 'https://fixturefinder.proxy.beeceptor.com/fixture-finder/fixtures/' + date + '?callback=?';
            $('.spinner').fadeIn(1000);

            FixtureFinder.setDateWithCurrentLanguage(date, FixtureFinder.currentLanguage);
            clearOldData();

            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                jsonpCallback: 'jsonCallback',
                contentType: "application/json",
                dataType: 'jsonp',
                success: function(json) {
                    fixtures = json.fixtures;
                    FixtureParser.parseFixtures(filter(fixtures));
                },
                error: function(json) {
                    console.log(json.messages);
                }
            }).done(function() {
                $('.spinner').fadeOut(1000);
            });
        }
    }
}();
