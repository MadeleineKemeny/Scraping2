$("#submit").on("click",
function () {
    $.ajax({
        url: "/api/scrape",
        method: "POST"
    }).then(function (response) {
        alert("Get ready... " + response.count + " news items are saved to your database");
        location.reload();
    });
}
)

function deleteComment(newsId, commentId) {
    $.ajax({
        url: '/news/' + newsId + '/comments/' + commentId,
        method: 'DELETE'
    }).then(function (response) {
        location.reload();
    });
}