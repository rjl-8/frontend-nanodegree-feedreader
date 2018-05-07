/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test to loop through all the feeds
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have urls that are not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names that are not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /* Test functions related to the menu */
    describe('The menu', function() {

        /* A test that ensures the menu element is
         * hidden by default. 
         */
        it('the menu will be hidden to start', function() {
            expect($('body')).toBeDefined();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * validates the menu showing on the first click and then
          * disappearing on the second click
          */
        it('the menu will become visible when the menu icon is clicked and invisible on a subsequent click', function() {
            expect($('body')).toBeDefined();

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test functions related to the entries of the initial feed */
    describe('Initial Entries', function() {

        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * This required an asynchronous solution.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('loadFeed runs and there is at least a single entry', function(done) {
            expect(document.getElementsByTagName('article').length).toBeGreaterThan(0);
            done();
        });
    });

    /* Test functions related to the entries of other feeds */
    describe('New Feed Selection', function() {

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * This required the loading of two feeds and capturing their
         * contents for comparison.
         * This required an asynchronous solution.
         */
        var feed0 = [],
            feed1 = [];
        beforeEach(function(done) {
            var thefeeds = document.getElementsByTagName('article');

            // load feed 0.  as part of the callback for loadFeed(0)
            // capture the results of loadFeed(0) and then call
            // loadFeed(1).  as part of the callback for loadFeed(1)
            // capture the results of loadFeed(1) and then call done
            loadFeed(0, function() {
                // capture contents after load feed 0 completes
                for (var i = 0; i < thefeeds.length; i++) {
                    feed0.push(thefeeds[i])
                }

                // load feed 1
                loadFeed(1, function() {
                    // capture contents after load feed 1 completes
                    for (var i = 0; i < thefeeds.length; i++) {
                        feed1.push(thefeeds[i])
                    }

                    // finally done
                    done();
                });
            });
        });

        it('the content changes when loadFeed runs', function(done) {
            // make sure feed1 loaded something
            expect(feed1.length).toBeGreaterThan(0);
            // make sure its different than feed0
            expect(feed0).not.toBe(feed1);
            done();
        });
    });
}());
