let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
let token = "";
let query = "";
let result = null;
let hint = null;
let search = null;

$(document).ready(function () {
    hint = $("#result");
    search = $("#search");
    hint.hide();

    search.keydown(function (k) {
        query = search.val();
        getData();
    });

    $('html').click(function() {
        hint.hide();
    });

    search.click(function(event) {
        hint.show();
        event.stopPropagation();
    });

});
function getData() {
    $.ajax({
        url: url,
        method: 'post',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token,
            "count": 10
        },
        data: JSON.stringify({query: query}),
        success: function (msg) {
            result = msg;

            hint.html("").show();
            for (let i in result.suggestions) {
                hint.append("<div class='advice'>"+ result.suggestions[i].value +"</div>")
            }
            $(".advice").click(function() {
                search.val($(this).text());
                query = $(this).text();
            });

        }
    })
}