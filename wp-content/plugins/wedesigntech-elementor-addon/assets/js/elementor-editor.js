/**
 * Used in Image Hotspots
 * To set Hotspot Repeater title
 */
 function wdtGetHotspotType( type ) {
	return ElementorConfig.wdtHotspots[type];
}

/**
 * Used to get social icon name for Team Member Widget
 */
function wdtGetSocialIconName( $obj ) {
	return ElementorConfig.wdtTeamSocial[$obj.name];
}

/**
 * Used to get repeater content title
 */
function wdtGetRepeaterContentTitle( $obj ) {
	return ElementorConfig[$obj.module][$obj.element_value];
}

/**
 * Used to get pricing table items
 */
function wdtGetPricingTableItems( $obj ) {
	return ElementorConfig.wdtPricingTableItems[$obj.element_value];
}

/**
 * Used to get header items
 */
function wdtGetHeaderItems( $obj ) {
	return ElementorConfig.wdtHeaderItems[$obj.element_value];
}