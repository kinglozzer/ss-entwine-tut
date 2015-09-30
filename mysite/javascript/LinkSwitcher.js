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
					form = this.closest('form'),
					selectedId = form.find('input[name=LinkType]:checked').val(),
					baseId = form.attr('id');

				// Rough match - ID may be #FormName_FieldName or #FormName_FieldName_Holder
				if (!id.match(baseId + '_' + selectedId)) {
					this.hide();
				}

				this._super();
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
					form = this.closest('form'),
					baseId = form.attr('id'),
					switchableFields = form.find('.field.switchable');

				switchableFields.hide();
				switchableFields.filter(function() {
					// Rough match - ID may be #FormName_FieldName or #FormName_FieldName_Holder
					return this.id.match(baseId + '_' + id);
				}).show();

				this._super();
			}
		});
	});
})(jQuery);
