<!-- function findRemainingTextAfterPageBreak(text) {
    var page = document.getElementById('page');
    page.innerHTML = '';

    var words = text.split(' ');
    var currentPageText = '';

    for (var i = 0; i < words.length; i++) {
        page.innerHTML = currentPageText + words[i] + ' ';
        if (page.scrollHeight > page.offsetHeight) {
            // 返回从当前单词开始到文本结束的部分
            return words.slice(i).join(' ');
        }
        currentPageText += words[i] + ' ';
    }
    return ''; // 如果整个文本都适合一页，则没有剩余的文本
} -->
