$(document).ready(function(){
	$("#genelnk").click(function(){
		$("#facilidepart").hide();
		$("#general").show();
		$("#genelnk").addClass("general").removeClass("facilities");
		$("#facidept").addClass("facilities").removeClass("general");
	});
	$("#facidept").click(function(){
		$("#general").hide();
		$("#facilidepart").show();
		$("#genelnk").addClass("facilities").removeClass("general");
		$("#facidept").addClass("general").removeClass("facilities");
	});
	
	$("#genefaci").click(function(){
		$("#accordionassign").hide();
		$("#accordionfaci").show();
		$("#faciassign").addClass("facilities").removeClass("general");
		$("#genefaci").addClass("general").removeClass("facilities");
	});
	$("#faciassign").click(function(){
		$("#accordionfaci").hide();
		$("#accordionassign").show();
		$("#genefaci").addClass("facilities").removeClass("general");
		$("#faciassign").addClass("general").removeClass("facilities");
	});
	$("#Userss").click(function(){
		$("#UserGroups").hide();
		$("#UserDetails").show();
		 $("#Userss").text("Users");
	});
	$("#UserssGroup").click(function(){
		$("#UserDetails").hide();
		$("#UserGroups").show();
		 $("#Userss").text("User Groups");
	});
	$("#genelnk1").click(function(){
		$("#DocumentsUserGroups").hide();$("#ActivityUserGroups").hide();$("#AppUserGroups").hide();
		$("#QueueUserGroups").hide();
		$("#generalUserGroup").show();
		$("#genelnk1").addClass("general").removeClass("facilities");
		$("#Documents").addClass("facilities").removeClass("general");$("#Activities").addClass("facilities").removeClass("general");
		$("#Queues").addClass("facilities").removeClass("general");$("#Applications").addClass("facilities").removeClass("general");
	});
	$("#Documents").click(function(){
		$("#generalUserGroup").hide();$("#ActivityUserGroups").hide();$("#AppUserGroups").hide();
		$("#QueueUserGroups").hide();
		$("#DocumentsUserGroups").show();
		$("#Documents").addClass("general").removeClass("facilities");
		$("#genelnk1").addClass("facilities").removeClass("general");$("#Activities").addClass("facilities").removeClass("general");
		$("#Queues").addClass("facilities").removeClass("general");$("#Applications").addClass("facilities").removeClass("general");
	});
	$("#Queues").click(function(){
		$("#generalUserGroup").hide();$("#ActivityUserGroups").hide();$("#AppUserGroups").hide();
		$("#DocumentsUserGroups").hide();
		$("#QueueUserGroups").show();
		$("#Queues").addClass("general").removeClass("facilities");
		$("#genelnk1").addClass("facilities").removeClass("general");$("#Activities").addClass("facilities").removeClass("general");
		$("#Documents").addClass("facilities").removeClass("general");$("#Applications").addClass("facilities").removeClass("general");
	});
	$("#Activities").click(function(){
		$("#generalUserGroup").hide();$("#QueueUserGroups").hide();$("#AppUserGroups").hide();
		$("#DocumentsUserGroups").hide();
		$("#ActivityUserGroups").show();
		$("#Activities").addClass("general").removeClass("facilities");
		$("#genelnk1").addClass("facilities").removeClass("general");
		$("#Documents").addClass("facilities").removeClass("general");
		$("#Queues").addClass("facilities").removeClass("general");$("#Applications").addClass("facilities").removeClass("general");
	});
	$("#Applications").click(function(){
		$("#generalUserGroup").hide();$("#QueueUserGroups").hide();$("#ActivityUserGroups").hide();
		$("#DocumentsUserGroups").hide();
		$("#AppUserGroups").show();
		$("#Activities").addClass("facilities").removeClass("general");
		$("#genelnk1").addClass("facilities").removeClass("general");
		$("#Documents").addClass("facilities").removeClass("general");
		$("#Queues").addClass("facilities").removeClass("general");$("#Applications").addClass("general").removeClass("facilities");
	});
    	/*Menu-toggle*/

});