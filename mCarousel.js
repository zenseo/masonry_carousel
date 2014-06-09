(function($, document, window){
		function MasonryBlocks(options) {
			this.wrapper = options.wrapper;
			this.stepSize = options.stepSize;
			this.animType = options.animType;
			this.visibleBlocks = options.visibleBlocks;
			this.startIndex = options.startIndex || 0; 
			this.endIndex = options.endIndex || this.visibleBlocks; 
			this.blocks = options.blocks || this.wrapper.find('.js-masonry_block');
			this.nav = {
				next: (options.nav && options.nav.next) ? options.next : this.wrapper.find('.masonry_nav-btn--next'),
				prev: (options.nav && options.nav.prev) ? options.prev : this.wrapper.find('.masonry_nav-btn--prev')
			}
			this.init();
		}

		MasonryBlocks.prototype = {
			init: function() {
			// Show blocks
			var self = this,
				blocks = this.blocks,
				start = this.startIndex,
				end = this.endIndex;

				blocks
					.not(blocks.slice(start, end))										
					.hide();

				self.addListeners();
			},
			addListeners: function() {
				var self = this;
				
				self.wrapper.on('click', '.js-nav-btn', { masonryObj: self}, self.onNavClick);
			},
			onNavClick: function(e) {
				var	self = this,
					inst = e.data.masonryObj;

				inst.changeBlocks(self);
				inst.changeNavVisibility(self);
			},
			changeBlocks: function(navEl) {
				var	self = this,
					blocks = self.blocks,
					end = self.endIndex,
					step = self.stepSize,
					changingBlocks;

				if ($(navEl).data('dir') === 'next') {
					changingBlocks = blocks.slice(end, end + step);
					changingBlocks.each(function(index, el) {
						$(el).fadeIn(400);
					});					
					self.endIndex = end = end + step;									
				}
				else {
					changingBlocks = blocks.slice(end - step, end);
					changingBlocks.each(function(index, el) {
						$(el).fadeOut(400);
					});
					self.endIndex -= step;
				}
			},
			changeNavVisibility: function(navEl) {
				var self = this,
					blocks = self.blocks,
					end = self.endIndex,
					visibleBlocks = self.visibleBlocks,
					nav = self.nav;

				if (!blocks.eq(end).next().hasClass('js-masonry_block')) {
					$(navEl).hide().prev().show();
					return;
				}	
				if(end == visibleBlocks) {
					$(navEl).hide().next().show();
					return;
				}
				if (end - visibleBlocks !== 0) {
					$(nav.next).add(nav.prev).show();
					return;
				}
			}
		}
	})(jQuery, document, window);
