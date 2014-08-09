// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {
	var main_form = $("form#main_linker_form");
	var main_form_div = $("form#main_linker_form div");
	var edit_form = $("pre#edit_input_form");
	var authenticity_token = $("input[name='authenticity_token']").clone().wrap('<p>').parent().html();
	var num = 1;
	$("input[name='authenticity_token']").remove();
	main_form.attr("method","get");
  $("#link").change(function(){
      main_form.attr("action",$("#link").val());
  });
  $("#mtd").change(function(){
    if ($("#mtd").val() === "get") { 
        main_form.attr("method","get");
        $("input[name='_method']").remove();
        $("input[name='authenticity_token']").remove();
    } else {
      	set_post_method($("#mtd").val());
    }
  });
  $("input#main_linker_form_submit").click(function(){
		main_form.submit(); 
  });
  $("input#new_input_submit").click(function(){
  	var name = $("input#new_input_name").val();
  	var type = $("select#new_input_type").val();
  	var str = '<span id="input_name">' + name + '</span> ' + '<input id="' + name + '" name="' + name + '" type="' + type + '">' + '<input id="' + num + '" name="edit_input" value="edit" type="button">'+ '<input id="' + num + '" name="delete_input" value="delete" type="button">';
  	if (main_form.children().length > 1) {
  		str = '<hr>' + str;
  	}
  	str = '<div id="' + num + '">' + str + "</div";
  	main_form.append(str);
  	num = num + 1;
  	$("input[name='delete_input'").unbind("click").click(function(){
  		if ($(this).attr("id") === main_form.children().first().next().attr("id")) {
  			$(this).parent().next().find("hr").remove();
  		}
  		if ($(this).parent().attr("id") === edit_form.val()){
  			edit_form.hide();
  		}
	  	$(this).parent().remove();
	  });
	  $("input[name='edit_input'").unbind("click").click(function(){
  		if( edit_form.css("display") == "none" ) {
      	edit_form.show();
      	edit_form_method($(this).attr("id"));
      } else {
      	if (edit_form.val() != $(this).attr("id")){
      		edit_form_method($(this).attr("id"));
      	} else {
      		edit_form.hide();
      	}
      }
      set_listener();
	  });
  });
  $("input#new_input_clear").click(function(){
  	$("input#new_input_name").val("");
  	$("select#new_input_type").val("text");
  });
  $("input#new_input_delete_all").click(function(){
  	var block_html = $("form#main_linker_form div").clone().wrap('<p>').parent().html();
  	main_form.empty();
  	main_form.append(block_html);
  	main_form_div = $("form#main_linker_form div");
  });
  
  function set_post_method(method_name){
		main_form.attr("method","post");
	  if (method_name == "post"){
	  	$("input[name='_method']").remove();
	  } else {
		  if (!$("input[name='_method']").length) {
		      main_form_div.append('<input name="_method" type="hidden" value="' + method_name + '">');
		  } else {
		      $("input[name='_method']").val(method_name);
		  }
	  }
	  if (!$("input[name='authenticity_token']").length) {
			main_form_div.append(authenticity_token);
		}
	}
	
	function edit_form_method(input_id){
		edit_form.empty();
		var el = find_my(input_id);
		var nodes=[], values=[];
		
		for (var attr, i=0, attrs=el[0].attributes, l=attrs.length; i<l; i++){
		    attr = attrs.item(i);
		    nodes.push(attr.nodeName);
		    values.push(attr.nodeValue);
		}
		var str = "<table border='1' class='table'><tr>";
		nodes.forEach(function(entry) {
	    str = str + "<th>" + entry + "</th>";
		});
		str = str + "</tr><tr>";
		values.forEach(function(entry) {
	    str = str + "<td>" + entry + "</td>";
		});
		str = str + "</tr></table>";
		str = str + 'Атрибут : Значение<br><input id="edit_form_attr" type="text"> : <input id="edit_form_val" type="text">';
		edit_form.append(str + '<input id="update_input" type="button" value="Обновить">');
		edit_form.val(input_id);
	}
	
	function find_my(input_id){
		var el = $("div#" + input_id).children().first().next();
		if (el.is("span")) {
			el = el.next();
		}
		return el;
	}
	
	function set_listener(){
		$("input#update_input").unbind("click").click(function(){
	  	var el = find_my(edit_form.val());
	  	el.attr($("#edit_form_attr").val(),$("#edit_form_val").val());
	  	if ($("#edit_form_attr").val() == "name"){
	  		el.prev().html($("#edit_form_val").val());
	  	}
	  	edit_form_method(edit_form.val());
	  	set_listener();
	  });
	}
});