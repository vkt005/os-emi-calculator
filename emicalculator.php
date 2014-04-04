<?php
/*
Plugin Name: EMI Calculator
Description: Use short code [emicalc format="full"][/emicalc] OR [emicalc format="sidebar"][/emicalc] to place calculator in post
Plugin URI:  http://opensum.com/
Version:     1.0
Author: vivek kumar tripathi
Author URI: http://opensum.com
USAGE:
Use [emicalc format="full"][/emicalc] OR [emicalc format="sidebar"][/emicalc] shortcode in your post content or widget area to show the EMI calculator.
* EXAMPLE:
[emicalc format="full"][/emicalc] OR [emicalc format="sidebar"][/emicalc]
*/
/*  Copyright YEAR  vivek kumar tripathi  (email : vivek@opensum.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as 
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/
define('EMI_CALC_URL', plugin_dir_url( __FILE__ ));
function calc_admin()
{
	global $wpdb;
	include('emi-help.php');
}
function emi_add_to_menu() 
{
	if (is_admin()) 
	{
		add_options_page( __('Emi Calculator', 'emi-calculator'),	__('Emi Calculator', 'emi-calculator'), 'manage_options', 'emi-help', 'calc_admin' );
	}
}
function emicalc_shortcode($atts, $content = null) {
        extract(shortcode_atts(array('format' => 'sidebar'), $atts));
        wp_register_style( 'emicss', EMI_CALC_URL.'css/emicalc.css', $deps, $ver, $media ); 
        wp_register_style( 'jquery-ui-css', EMI_CALC_URL.'css/jquery-ui.css', $deps, $ver, $media ); 
	wp_register_script('osemicode', EMI_CALC_URL.'js/osemicode.js');
	wp_register_script('googlecharts', 'https://www.google.com/jsapi');
    	wp_enqueue_script('jquery');
        wp_enqueue_script('jquery-ui-slider');
        wp_enqueue_script('googlecharts');
	wp_enqueue_script('osemicode');
	wp_enqueue_style('jquery-ui-css');
	wp_enqueue_style('emicss');
	if ($format === 'sidebar')
	{ 
	return '<div class="emi-container"></div><div class="clear-style"></div>';
        }else{
         return '<div class="entry"><div class="emi-container" id="emi-container-full"></div><div class="clear-style"></div><div id="emipaymenttable"></div></div>';
        }
}
add_action('admin_menu','emi_add_to_menu' );
add_filter('emicalc', 'emicalc_shortcode');
@add_shortcode('emicalc','emicalc_shortcode');
?>