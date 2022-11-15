(function () {
	"use strict";


	$(".add-sub").on('click', function(){
		var elmt =  $("#fiuop").clone();

		var elmtc = $("#sortable .ui-state-default").length + 1;

		var type = $("#linkForm").attr('data-id');

		if (type == 'editForm') {
			elmt.find('.sublink').attr('name', 'sub['+elmtc+'][file]');
		}

		elmt.removeAttr('id');
		elmt.removeClass('d-none');
		elmt.find('.subLabel').attr('name','sub['+elmtc+'][label]');
		elmt.find('.subFile').attr('name','sub['+elmtc+'][file]');

		$("#sortable").append(elmt);

	});

	$("#addVastTag").on('click', function(){
		var elmt =  $("#vastItem").clone();

		var elmtc = $("#vastAds .ui-state-default").length + 1;



		elmt.removeAttr('id');
		elmt.removeClass('d-none');
		elmt.find('.vastTag').attr('name','vast['+elmtc+'][tag]');
		elmt.find('.vastOffset').attr('name','vast['+elmtc+'][offset]');

		$("#vastAds").append(elmt);

	});




	$("#save-link").on('click', function () {
		var i = 0;
		var $this = $(this);
		var data = $('#form-link').serialize();
		data += '&type=add_link';
		$.ajax({
			type: "GET",
			url: PROOT + '/ajax',
			data: data,
			cache: false,
			beforeSend: function () {
				// setting a timeout
				$('#form-link #alert').html(' ');
				$this.text('Processing...');
				$this.addClass('disabled');
				i++;
			},
			success: function (data) {
				if (data.success) {
					createAlert('success', 'Link Saved Successfully !', '#form-link');
					if (!$("#modal-link").hasClass('editModal')) {
						$('#form-link').trigger("reset");
					} else {
						setTimeout(function () {
							location.reload();
						}, 2000);
					}
				} else {
					createAlert('danger', data.msg, '#form-link');
				}


			},
			error: function (xhr) { // if error occured
				alert("Error occured.please try again");
				$this.text('Save Link');
				$this.removeClass('loading');
			},
			complete: function () {
				i--;
				if (i <= 0) {
					$this.text('Save Link');
					$this.removeClass('disabled');
				}
			}

		});

		$("#modal-link").modal('show');
	});

	$("#save-user").on('click', function () {
		var i = 0;
		var $this = $(this);
		var data = $('#form-user').serialize();
		data += '&type=save_user';

		$.ajax({
			type: "GET",
			url: PROOT + '/ajax',
			data: data,
			cache: false,
			beforeSend: function () {
				// setting a timeout
				$('#form-user #alert').html(' ');
				$this.text('Processing...');
				$this.addClass('disabled');
				i++;
			},
			success: function (data) {
				if (data.success) {
					createAlert('success', 'User Saved Successfully !', '#form-user');
					if (!$("#form-user").hasClass('editUser')) {
						$('#form-user').trigger("reset");
					} else {
						setTimeout(function () {
							window.location.href = PROOT+'/users';
						}, 1000);
					}
				} else {
					createAlert('danger', data.msg, '#form-user');
				}

			},
			error: function (xhr, status, error) { // if error occured
				alert(xhr.responseText);
				$this.text('Save User');
				$this.removeClass('loading');
			},
			complete: function () {
				i--;
				if (i <= 0) {
					$this.text('Save Link');
					$this.removeClass('disabled');
				}
			}

		});

	});

	$(".add-link").on('click', function () {
		$("#modal-link").modal('show');
	});


$(document).on('click', '.removeSub', function () {
		if (confirm('Are you sure ?')) {
			$(this).parent().parent().parent().remove();
		}
});
$(document).on('click', '.removeVast', function () {
		if (confirm('Are you sure ?')) {
			$(this).parent().parent().remove();
		}
});




	$(document).on('click', '.save-settings', function () {

		var i = 0;
		var $this = $(this);



			var data = $('#form-settings').serialize();
			data += '&type=save_settings';

			$.ajax({
				type: "GET",
				url: PROOT + '/ajax',
				data: data,
				cache: false,
				beforeSend: function () {
					// setting a timeout
					$('#form-settings #alert').html(' ');
					$this.text('Saving...');
					$this.addClass('disabled');
					i++;
				},
				success: function (data) {
					console.log(data);
					if (data.success) {

							createAlert('success', 'Settings is saved Successfully !', '#form-settings');
							setTimeout(function () {
								location.reload();
							}, 1000);
					}
				},
				error: function (xhr) { // if error occured
					alert("Error occured.please try again");
				},complete: function () {
					i--;
					if (i <= 0) {
						$this.text('Save Changes');
						$this.removeClass('disabled');
					}
				}


			});



	});

	$(document).on('click', '.edit-link', function () {

		var tr = $(this).parent().parent().parent();

		var title = tr.find('.title').text();
		var id = tr.attr('data-id');
		var gid = $(this).attr('data-gid');

		$("#title").val(title);
		$("#gurl").text(gid);
		$("#id").val(id);

		if (!$("#modal-link").hasClass('editModal')) {
			$("#modal-link").addClass('editModal');
		}


		$("#modal-link").modal('show');


	});

	$('#modal-link').on('hidden.bs.modal', function (e) {
		$('#form-link').trigger("reset");
	});


	$(document).on('click', '.delete-link', function () {

		var tr = $(this).parent().parent().parent();
		var dataType = $(this).attr('data-type');


		if (dataType == '0') {
			var msg = 'Are you sure you are not able to recovery this link again ?';
		} else {
			var msg = 'Are you sure you want to delete this link ?';
		}

		if (confirm(msg)) {


			var linkId = tr.attr('data-id');
			var data = 'ids=' + linkId + '&type=delete_link&soft=' + dataType;

			$.ajax({
				type: "GET",
				url: PROOT + '/ajax',
				data: data,
				cache: false,
				success: function (data) {
					if (data.success) {
						alert('Link is Deleted Successfully !');
						tr.remove();
					} else {
						alert('Can not delete this link !');
					}
				},
				error: function (xhr) { // if error occured
					alert("Error occured.please try again");
				}


			});

		}

	});

	$(document).on('click', '.copy-link', function () {
		var text = $(this).attr('data-url');
		copyToClipboard(text);
		alert('Link copied to clipboard !');
	});



	$(document).on('click', '.restore-link', function () {

		if (confirm('Are you sure you want to restore this link ?')) {

			var tr = $(this).parent().parent().parent();

			var linkId = tr.attr('data-id');
			var data = 'id=' + linkId + '&type=restore_link';

			$.ajax({
				type: "GET",
				url: PROOT + '/ajax',
				data: data,
				cache: false,
				success: function (data) {
					if (data.success) {
						alert('List is restored Successfully !');
						tr.remove();
					} else {
						alert('Can not restore this link !');
					}
				},
				error: function (xhr) { // if error occured
					alert("Error occured.please try again");
				}


			});

		}


	});


	$(document).on('click', '.delete-user', function () {

		if (confirm('Are you sure you want to delete this user ?')) {

			var tr = $(this).parent().parent().parent();

			var userId = tr.attr('data-id');
			var data = 'id=' + userId + '&type=delete_user';

			$.ajax({
				type: "GET",
				url: PROOT + '/ajax',
				data: data,
				cache: false,
				success: function (data) {
					if (data.success) {
						alert('User is deleted Successfully !');
						tr.remove();
					} else {
						alert('Can not delete this user !');
					}
				},
				error: function (xhr) { // if error occured
					alert("Error occured.please try again");
				}


			});

		}


	});

	$(document).on('click', '.no-access', function () {
		alert("You haven't permission to this action ! ");
	});



	$(document).on('change', '.delete-item' ,function() {
		if($(this).prop('checked')) {
				$(this).parent().parent().addClass('selected-for-delete');
		} else {
				$(this).parent().parent().removeClass('selected-for-delete');
		}
		upDel();

	});


	function upDel(){
		var selected = 0;
		selected = $(".selected-for-delete").length;
		if(selected != 0){
				$(".delete-selecetd-items").removeClass('d-none');
		}else{
				$(".delete-selecetd-items").addClass('d-none');
		}
		$(".delete-selecetd-items b").text(selected);
	}
	$(document).on('click', '.delete-selecetd-items' ,function() {
			var ids = '';
			$('.selected-for-delete').each(function(i, obj) {
					ids += $(this).attr('data-id') + ',';
			});
	console.log(ids);

			var dataType = $(this).attr('data-type');


			if (dataType == '0') {
				var msg = 'Are you sure you are not able to recovery this links again ?';
			} else {
				var msg = 'Are you sure you want to delete this links ?';
			}

			if (confirm(msg)) {


				var data = 'ids=' + ids + '&type=delete_link&soft=' + dataType;

				$.ajax({
					type: "GET",
					url: PROOT + '/ajax',
					data: data,
					cache: false,
					success: function (data) {
						if (data.success) {
							alert('Link is Deleted Successfully !');
							location.reload();
						} else {
							alert('Can not delete this link !');
						}
					},
					error: function (xhr) { // if error occured
						alert("Error occured.please try again");
					}


				});

			}




	});

	$("#bulkImport").on('click', function(){
		var links = $('#linkList').val();
		var $this = $(this);
		if (links.length > 0) {
			$this.text('Saving...');
			$this.addClass('disabled');
			$('#linkList').attr('disabled','disabled');
			var data = 'links=' + links + '&type=bulk_insert';
			$.ajax({
				type: "GET",
				url: PROOT + '/ajax',
				data: data,
				cache: false,
				success: function (data) {
					console.log(data);
					if (data.success) {

						$(".lstatus .tl b").text(data.result.success + data.result.faild);
						$(".lstatus .sl b").text(data.result.success);
						$(".lstatus .fl b").text(data.result.faild);
						$(".lstatus").parent().removeClass('d-none');

						if (data.result.faild != 0) {
							$(".flinks ul").html('');
							var linksList = data.result.fail_links;
							linksList.forEach(function (item, index) {
								$(".flinks ul").append('<li>'+item+'</li>');
							});
							$(".flinks").removeClass('d-none');
						}
$('#linkList').val('');
						// location.reload();
					} else {


						alert('Can not delete this link !');
					}
					$this.text('Import Now');
					$this.removeClass('disabled');
								$('#linkList').removeAttr('disabled','disabled');
				},
				error: function (xhr) { // if error occured
					$this.text('Import Now');
					$this.removeClass('disabled');
					$('#linkList').removeAttr('disabled','disabled');
					alert("Error occured.please try again");
				}
			});

		}else{
			alert('Enter Google Drive Link List');
		}

	});

	$("#select_all").change(function() {

			// var movieId = $(this).attr('data-movie-id');

			$('.delete-item').parent().parent().removeClass('selected-for-delete');
			if($(this).prop('checked')) {
					$('.delete-item').prop('checked', true);
					$('.delete-item').parent().parent().addClass('selected-for-delete');

			} else {
					$('.delete-item').prop('checked', false);

			}
			upDel();
	});


	$('.datatable').DataTable();


	$("#firewall").click(function () {
	    $(this).change(function(){
	        if (this.checked) {
						$("#allowed_domains").removeAttr('disabled');

	        } else {
$("#allowed_domains").attr('disabled','disabled');
	        }
	    });
	});

})();


function createAlert(type, msg, elmt) {
	var index, len;
	var msg, html = '';
	if(!Array.isArray(msg)){ msg = [msg] }
	for (index = 0, len = msg.length; index < len; ++index) {
			html += '<div class="alert alert-' + type + '" role="alert">';
			// set alert icon
			if (type == 'success') {
				html += '<svg xmlns="http://www.w3.org/2000/svg" class="icon mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><polyline points="20 7 10 17 5 12"></polyline></svg>';
			} else if (type == 'danger') {
				html += '<svg xmlns="http://www.w3.org/2000/svg" class="icon mr-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><circle cx="12" cy="12" r="9"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
			}
			html += '<span class="msg">' + msg[index] + '</span></div>';


	}

	var elmt = elmt + ' #alert';
	$(elmt).html(html);

}

function copyToClipboard(text) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val(text).select();
		document.execCommand("copy");
		$temp.remove();
	}


// asdas
