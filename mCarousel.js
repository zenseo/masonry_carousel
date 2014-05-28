function MasonryBlocks(options) {
			this.wrapper = options.wrapper;
			this.stepSize = options.stepSize;
			this.animType = options.animType;
			this.visibleBlocks = options.visibleBlocks;
			this.startIndex = options.startIndex || 0; 
			this.endIndex = options.endIndex || this.visibleBlocks; 
			this.blocks = this.wrapper.find('.js-masonry_block');
			this.nav = {
				next: this.wrapper.find('.masonry_nav-btn--next'),
				prev: this.wrapper.find('.masonry_nav-btn--prev')
			}
			this.init();
		}

		MasonryBlocks.prototype = {
			init: function() {
			// Show blocks
				this.blocks
					.not(this.blocks.slice(this.startIndex, this.endIndex))										
					.hide();

				this.addListeners();
			},
			addListeners: function() {
				this.wrapper.on('click', '.js-nav-btn', { masonryObj: this}, this.onNavClick);
			},
			onNavClick: function(e) {
				var	inst = e.data.masonryObj;
				inst.changeBlocks(this);
				inst.changeNavVisibility(this);
			},
			changeBlocks: function(navEl) {
				var	blocks = this.blocks,
					end = this.endIndex,
					step = this.stepSize,
					changingBlocks;

				if ($(navEl).data('dir') === 'next') {
					changingBlocks = blocks.slice(end, end + step);
					changingBlocks.each(function(index, el) {
						$(el).fadeIn(400);
					});					
					this.endIndex = end = end + step;									
				}
				else {
					changingBlocks = this.blocks.slice(end - step, end);
					changingBlocks.each(function(index, el) {
						$(el).fadeOut(400);
					});
					this.endIndex -= step;
				}
			},
			changeNavVisibility: function(navEl) {
				if (!this.blocks.eq(this.endIndex).next().hasClass('js-masonry_block')) {
					$(navEl).hide().prev().show();
					return;
				}	
				if(this.endIndex == this.visibleBlocks) {
					$(navEl).hide().next().show();
					return;
				}
				if (this.endIndex - this.visibleBlocks !== 0) {
					$(this.nav.next).add(this.nav.prev).show();
					return;
				}
			}
		}
