function deleteComment(newsId, commentId) {
    $.ajax({
        url: '/news/' + newsId + '/comments/' + commentId,
        method: 'DELETE'
    }).then(function (response) {
        location.reload();
    });
}