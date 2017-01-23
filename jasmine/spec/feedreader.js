/* 
	
	feedreader.js

	The following are test suites which makes sure
	the application runs error free.
	
*/

// Delay function till DOM is loaded.
$(function() {
	describe('RSS Feeds', function() {
		it('are defined.', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds instanceof Array).toBeTruthy();
			expect(allFeeds.length).not.toBe(0);
		});

		it('and contains objects with a defined url property with a value.', function() {
		 	for (var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url.length).not.toBe(0);
		 	}
		});

		it('and contains objects with a defined name property with a value.', function() {
			for (var i = 0; i < allFeeds.length; i++) {
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name.length).not.toBe(0);
			}
		});
	});

	describe('The menu', function() {
		it('is hidden by default.', function() {
			expect($('body').attr('class').indexOf('menu-hidden')).not.toBe(-1);
		});

		it('is toggeled on click.', function() {
		 	$('.menu-icon-link').click();
			expect($('body').attr('class').indexOf('menu-hidden')).toBe(-1);

		 	$('.menu-icon-link').click();
			expect($('body').attr('class').indexOf('menu-hidden')).not.toBe(-1);
		});
	});

	describe('Initial Entries', function() {
		// Asynchronous tests are delayed for as long as the
		// request takes to respond (maximum 5 seconds before
		// a timeout occur and test fails - from the docs)
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		it('has atleast one entry.', function() {
			expect($('.feed').find('.entry').length).not.toBe(0);
		});
	});

	describe('New Feed Selection', function() {
		var feedOne;
		var feedTwo;

		// Asynchronous
		// first load feed one, and then replace with feed 2
		beforeEach(function(done) {
			loadFeed(1, function() {
				feedOne = $('.feed').html();
				

				loadFeed(2, function() {
					feedTwo = $('.feed').html();
					
					done();
				});
			});
		});

		it('The feed returned from ' + allFeeds[1].name + ' is not the same as the feed returned from ' + allFeeds[2].name + '.', function() {
			expect(feedOne).not.toEqual(feedTwo);
		});
	});
}());
