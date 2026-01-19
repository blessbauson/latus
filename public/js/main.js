$(document).ready(function() {

    if ($('.dataTable').length) {
        $('.dataTable').each(function() {
            let $this = $(this);
            let dom='<"dt-top"l>rt<"dt-bottom"ip><"clear">';
            if($this.data("enable_search")){
                dom =  '<"dt-top"lf>rt<"dt-bottom"ip><"clear">';
            }
            $this.DataTable({
                processing: true,
                serverSide: true,
                lengthMenu: [10, 25, 50, 100],
                oLanguage: {
                    sLengthMenu: "<span class='dt-pagemenu llabel'>Show</span> _MENU_ " 
                        + "<span class='dt-pagemenu rlabel'>entries</span>",
                },
                ajax:{
                        url:$this.data('source'),
                        error: function(err) {
                            if (err.status == 401) {
                                window.location = '/';
                            } else if ($this.data('ctmevent')) {
                                $this.trigger({
                                    type: 'dt.ctmerr',
                                    err: err
                                });

                            } else{
                                alert("error processing request");
                            }
                        }
                } ,
                columns: $this.data('columns'),
                dom: dom,
                order: [],
                buttons: [
                    'pageLength'
                ],
                "fnInitComplete": function (oSettings, json) {
                    initSearch($(this).DataTable());
                }
            });
        });
    }

    if ($('.datatablePrelist').length) {
        $('.datatablePrelist').each(function() {
            let $this = $(this);
            $this.DataTable({
                processing: true,
                serverSide: false,
                columns: $this.data('columns'),
                dom: 'Bfrtip',
                order: [],
                buttons: [
                    'csv'
                ]
            });
        });
    }

    if ($('select:not(".item-search")').length) {
        $('select:not(".item-search")').select2({
            theme: 'bootstrap'
        });
    }

    if ($('#filterForm').length
        && $('#filterForm').find('input,select,textarea').length == 0
    ) {
        let filterContainer = $('#filterForm').closest('div');
        $('#filterForm').remove();

        const headerText = $('#content').find('h1').first().text();
        filterContainer.find('br').remove();
        filterContainer.find('h6').text('All ' + headerText);
    }

    $('body').on('click', '.deleteIcon', function () {
        const url = $(this).data('url');
        $('#deleteForm').attr('action', url);
    });
});

function showSpinner(input, is_loading, spinner_class, input_class) {
    $(is_loading ? '.' + spinner_class : '.' + input_class)
        .removeClass('invisible')
        .removeClass('d-none')
        .addClass('visible');

    $(is_loading ? '.' + input_class : '.' + spinner_class)
        .removeClass('visible')
        .addClass('d-none')
        .addClass('invisible');

    $('#' + input).next(".select2-container").toggle();
}


function toggleElement(elid, is_visible = false) {
    if (is_visible) {
        $('#'+ elid)
            .removeClass('d-none')
            .removeClass('invisible')
            .addClass('visible');

        return;
    }

    $('#'+ elid)
        .addClass('d-none')
        .addClass('invisible')
        .removeClass('visible');
}

function initSearch(mtable) {
    $('.dataTables_filter input')
        .unbind()
        .bind('keyup keypress input', function (e) {

        if (this.value.length >= 4 || e.keyCode == 13) {
            mtable.search(this.value).draw();
        }

        if (this.value == '') {
            mtable.search('').draw();
        }
    });
}


function handleTrxTypeChange() {
    if ($('#trx_type').val() == 'rebate') {
        $('#org_points_type').prop('disabled', true);
        $('#org_points_type').val('none');
        handlePointTypeChange('none', 'org_points_amount', 'org_points_op');

        return;
    }
    
    $('#org_points_type').prop('disabled', false);
}


function handlePointTypeChange(val, el_points_amount = 'user_points_amount', el_op = 'user_points_op') {
    $('#'+ el_op).html(getOrgTypePointsOperator(val));

    if (val == 'none') {
        $('#'+ el_points_amount).val('0.00');
        $('#'+ el_points_amount).prop('disabled', true);
    } else {
        $('#'+ el_points_amount).prop('disabled', false);
    }
}


function handleLimitBranchChange() {
    if ($('#limit_to_branch_flag').is(':checked')) {
        $('.chk_branches').prop('disabled', false);
    } else {
        $('.chk_branches').prop('disabled', true);
        $('.chk_branches').prop('checked', false);
    }
}


function getOrgTypePointsOperator(val) {
    if (val == 'by_liter') {
        return 'x';
    }
    
    if (val == 'by_trx_amount') {
        return '/'
    }

    return ' ';
}


function handleSearchAjaxError(details, table_id) {
    const err = details.err;

    $('#'+ table_id +'_processing').hide();
    $('#div_errors').empty();

    if (err.status == 422) {
        const el_ul = $('<ul>');
        const error_messages = err.responseJSON.errors;

        for (const field in error_messages) {
            const field_errs = error_messages[field];
            for (const idx in field_errs) {
                el_ul.append(
                    $('<li>').html(field_errs[idx])
                );
            }
        }

        $('#div_errors').append(el_ul);
        toggleDivErrors(true);

        return;
    }
    
    alert("Sorry, there seems to be a problem processing your request.");
}

function toggleDivErrors(show = false) {
    if (show) {
        $('#div_errors').removeClass('d-none').addClass('visible');
        hideAlertPanel();
        return;
    }

    $('#div_errors').empty();
    $('#div_errors').removeClass('visible').addClass('d-none');
}


function hideAlertPanel() {
    setTimeout(() => {
        toggleDivErrors();
    }, 5000);
}
