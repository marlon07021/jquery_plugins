/**
 * Jquery AlphaPagination
 * @authors AlphaDev - Software Engineers
 * @version 1.0
 */
(function($) {
	$.extend({
		fnsAlphaPagination : {
			params : {
				currentPage : 1
			},
			countPages : function() {
				var items = this.params.items.size();
				var itemsPerPage = this.params.itemsPerPage;
				return Math.ceil(items / itemsPerPage);
			},
			makePages : function() {
				var parent = this.params.parent;
				var page = 1;
				parent.empty();
				parent.append($('<div class="paginationPages paginationPage1">'));
				var count = 0;
				for(var i = 1; i <= this.params.items.size(); i++) {
					var index = i - 1;
					if(count == this.params.itemsPerPage) {
						page++;
						parent.append($('<div class="paginationPages paginationPage' + page + '">'));
						parent.find('div.paginationPage'+page).append(this.params.items[index]);
						count = 0;
					} else {
						parent.find('div.paginationPage'+page).append(this.params.items[index]);
					}
					count++;
				}
			},
			makePaginator : function() {
				var contentPaginator = '<div class="paginationPaginator">';
				if(this.countPages() > 10) {
					var pages = 10;
				} else {
					var pages = this.countPages();
				}
				contentPaginator += '<div><a href="paginationPage1" class="paginationGoToFirstPage">' + this.params.firstLabel + '</a><a href="paginationPrev" class="paginationPrev">' + this.params.prevLabel + '</a></div>';
				contentPaginator += '<ul>';
				for(var i = 1; i <= pages; i++) {
					contentPaginator += '<li class="paginationPageId' + i + '"><a href="paginationPage' + i + '" class="paginationIndex">' + i + '</a></li>';
				}
				contentPaginator += '</ul>';
				contentPaginator += '<div><a href="paginationNext" class="paginationNext">' + this.params.nextLabel + '</a><a href="paginationPage' + this.countPages() + '" class="paginationGoToLastPage">' + this.params.lastLabel + '</a></div>';
				contentPaginator += '</div>';
				return contentPaginator;
			},
			goNext : function() {
				var countPages = this.countPages();
				var parent = this.params.parent;
				var pages = parent.find('div.paginationPages');
				var params = this.params;
				parent.find('a.paginationNext').on('click', function(e) {
					e.preventDefault();
					params.currentPage++;
					if(params.currentPage > countPages){
						params.currentPage = 1;
					}
					pages.hide();
					parent.find('div.paginationPage'+params.currentPage).fadeIn('slow');
					parent.find('div.paginationPaginator ul li').removeClass('paginationCurrentPaginator');
					var pageId = params.currentPage;
					if(countPages > 10) {
						//parent.find('div.paginationPaginator ul').empty();
						if(pageId > countPages - 9) {
							pageId = countPages - 9;
						}
                        $('div.paginationPaginator ul li').each(function(index, element){
                            $(element).attr('class',"paginationPageId" + pageId)
                                .children('a.paginationIndex').attr('href',"paginationPage" + pageId).text(pageId);
                            pageId++;
                        });
					}
					parent.find('li.paginationPageId'+params.currentPage+'').addClass('paginationCurrentPaginator');
				});
			},
			goPrev : function() {
				var countPages = this.countPages();
				var parent = this.params.parent;
				var pages = parent.find('div.paginationPages');
				var params = this.params;
				parent.find('a.paginationPrev').on('click', function(e) {
					e.preventDefault();
					params.currentPage--;
					if(params.currentPage < 1){
						params.currentPage = countPages;
					}
					pages.hide();
					parent.find('div.paginationPage'+params.currentPage).fadeIn('slow');
					parent.find('div.paginationPaginator ul li').removeClass('paginationCurrentPaginator');
					var pageId = params.currentPage;
					if(countPages > 10) {
						//parent.find('div.paginationPaginator ul').empty();
						if(pageId > countPages - 9) {
							pageId = countPages - 9;
						}
                        $('div.paginationPaginator ul li').each(function(index, element){
                            $(element).attr('class',"paginationPageId" + pageId)
                                .children('a.paginationIndex').attr('href',"paginationPage" + pageId).text(pageId);
                            pageId++;
                        });
					}
					parent.find('li.paginationPageId'+params.currentPage+'').addClass('paginationCurrentPaginator');
				});
			},
			goToPage : function() {
				var parent = this.params.parent;
				var pages = parent.find('div.paginationPages');
				var params = this.params;
				var countPages = this.countPages();
				parent.find('a.paginationIndex').on('click', function(e) {
					e.preventDefault();
					var page = $(this).attr('href');
					pages.hide();
					parent.find('div.'+page).fadeIn('slow');
					parent.find('div.paginationPaginator ul li').removeClass('paginationCurrentPaginator');

					var pageId = parseInt(page.replace('paginationPage', ''));
					params.currentPage = pageId;
					if(countPages > 10) {
						//parent.find('div.paginationPaginator ul').empty();
						if(pageId > countPages - 9) {
							pageId = countPages - 9;
						}
                        $('div.paginationPaginator ul li').each(function(index, element){
                            $(element).attr('class',"paginationPageId" + pageId)
                             .children('a.paginationIndex').attr('href',"paginationPage" + pageId).text(pageId);
                            pageId++;
                        });
					}
					parent.find('li.paginationPageId'+params.currentPage+'').addClass('paginationCurrentPaginator');
				});
			},
			goToFirstPage : function() {
				var parent = this.params.parent;
				var pages = parent.find('div.paginationPages');
				var params = this.params;
				var numpages = this.countPages();
				parent.find('a.paginationGoToFirstPage').on('click', function(e) {
					e.preventDefault();
					var page = $(this).attr('href');
					pages.hide();
					parent.find('div.'+page).fadeIn('slow');
					parent.find('div.paginationPaginator ul li').removeClass('paginationCurrentPaginator');
					parent.find('div.paginationPaginator ul li:first').addClass('paginationCurrentPaginator');
					parent.find('div.paginationPaginator ul li:eq('+numpages+')').addClass('paginationCurrentPaginator');
					params.currentPage = 1;
					if(numpages > 10) {
                        var pageId = 1;
                        $('div.paginationPaginator ul li').each(function(index, element){
                            $(element).attr('class',"paginationPageId" + (++index))
                                .children('a.paginationIndex').attr('href',"paginationPage" + index).text(index);
                            pageId++;
                        });
					}
					parent.find('li.paginationPageId'+params.currentPage+'').addClass('paginationCurrentPaginator');
				});
			},
			goToLastPage : function() {
				var parent = this.params.parent;
				var pages = parent.find('div.paginationPages');
				var params = this.params;
				var numpages = this.countPages();
				parent.find('a.paginationGoToLastPage').on('click', function(e) {
					e.preventDefault();
					var page = $(this).attr('href');
					pages.hide();
					parent.find('div.'+page).fadeIn('slow');
					parent.find('div.paginationPaginator ul li').removeClass('paginationCurrentPaginator');
					parent.find('div.paginationPaginator ul li:last').addClass('paginationCurrentPaginator');
					parent.find('div.paginationPaginator ul li:eq('+(numpages - 1)+')').addClass('paginationCurrentPaginator');
					params.currentPage = numpages + 1;
					if(numpages > 10) {
                        var pageId = numpages - 9;
						//parent.find('div.paginationPaginator ul').empty();
                        $('div.paginationPaginator ul li').each(function(index, element){
                            $(element).attr('class',"paginationPageId" + pageId)
                                .children('a.paginationIndex').attr('href',"paginationPage" + pageId).text(pageId);
                            pageId++;
                        });
					}
					parent.find('li.paginationPageId'+params.currentPage+'').addClass('paginationCurrentPaginator');
				});
			},
			makeFullContent : function() {
				var parent = this.params.parent;
				this.makePages();
				var numpages = this.countPages();
				parent.append(this.makePaginator());
				parent.find('div.paginationPage1').css('display', 'block');
				parent.find('div.paginationPaginator ul li:first').addClass('paginationCurrentPaginator');
				parent.find('div.paginationPaginator ul li:eq('+numpages+')').addClass('paginationCurrentPaginator');
			},
			execute : function() {
				this.makeFullContent();
				this.goNext();
				this.goPrev();
				this.goToPage();
				this.goToFirstPage();
				this.goToLastPage();
			}
		}
	});

	$.fn.alphaPagination = function(options) {
		var parentFunction = $.fnsAlphaPagination;
		var params = parentFunction.params;
		params.parent = $(this);
		params.items = $(this).children();
		if(options.itemsPerPage) {
			params.itemsPerPage = options.itemsPerPage;
		} else {
			params.itemsPerPage = 5;
		}
		if(options.firstLabel) {
			params.firstLabel = options.firstLabel;
		} else {
			params.firstLabel = 'First';
		}
		if(options.lastLabel) {
			params.lastLabel = options.lastLabel;
		} else {
			params.lastLabel = 'Last';
		}
		if(options.prevLabel) {
			params.prevLabel = options.prevLabel;
		} else {
			params.prevLabel = 'Prev';
		}
		if(options.nextLabel) {
			params.nextLabel = options.nextLabel;
		} else {
			params.nextLabel = 'Next';
		}
		return parentFunction.execute();
	}
})(jQuery);