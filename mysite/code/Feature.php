<?php

class Feature extends DataObject {

	private static $db = array(
		"Title" => "Varchar(255)",
		"ExternalURL" => "Text"
	);

	private static $has_one = array(
		"InternalURL" => "SiteTree"
	);

	/**
	 * @return FieldList 
	 */
	public function getCMSFields() {
		$fields = parent::getCMSFields();

		// Include link switcher JavaScript
		Requirements::javascript('mysite/javascript/LinkSwitcher.js');

		// Firstly. remove the old fields
		$fields->removeByName("ExternalURL");
		$fields->removeByName("InternalURLID"); // Note 'ID' on the end of the field name as this is a has_one

		// The two options for which type of link to add
		$linkOptions = array("ExternalURL" => "Link to an external page", "InternalURLID" => "Link to an internal page");
		// If we've set an internal link already, then that option should be pre-selected
		$selectedOption = ($this->InternalURLID) ? "InteralURLID" : "ExternalURL";
		$linkTypeField = OptionsetField::create("LinkType", "", $linkOptions, $selectedOption);

		$externalURLField = TextField::create("ExternalURL", "Link to external page")
			->addExtraClass('switchable');
		$internalURLField = TreeDropdownField::create("InternalURLID", "Choose a page to link to", "SiteTree")
			->addExtraClass('switchable');

		$fields->addFieldsToTab('Root.Main', array($linkTypeField, $externalURLField, $internalURLField));

		return $fields;
	}

	/**
	 * @return void
	 */
	public function onBeforeWrite() {
		// If we've set an external link unset any existing internal link
		if($this->ExternalURL && $this->isChanged('ExternalURL')) {
			$this->InternalURLID = false;
		// Otherwise, if we've set an internal link unset any existing external link
		} elseif($this->InternalURLID && $this->isChanged('InternalURLID')) {
			$this->ExternalURL = false;
		}

		parent::onBeforeWrite();
	}

	/**
	 * Fetch the current link, use with $Link in templates
	 * @return string|false
	 */
	public function getLink() {
		if($this->ExternalURL) {
			return $this->ExternalURL;
		} elseif($this->InternalURL() && $this->InternalURL()->exists()) {
			return $this->InternalURL()->Link();
		}

		return false;
	}

}