/**
 * File: LinkSwitcher.js
 */

(function($) {
	$.entwine(function($) {
		/**
		 * Class: .cms-edit-form .field.switchable
		 *
		 * Hide each switchable field except for the currently selected link type
		 */
		$('.cms-edit-form .field.switchable').entwine({
			onmatch: function() {
				var id = this.attr('id'),
					form = this.closest('form');
				
				if(form.find('input[name=LinkType]:checked').val() !== id) {
					this.hide();
				}

				this._super();
			},
			disappear: function() {
				this.slideUp(500);
			},
			reappear: function() {
				this.slideDown(500);
			}
		});

		/**
		 * Input: .cms-edit-form input[name=LinkType]
		 *
		 * On click of radio button, show selected field, hide all others
		 */
		$('.cms-edit-form input[name=LinkType]').entwine({
			onclick: function() {
				var id = this.val(),
					form = this.closest('form');

				form.find('.field.switchable').disappear();
				form.find('#' + id).reappear();

				this._super();
			}
		});
	});
})(jQuery);