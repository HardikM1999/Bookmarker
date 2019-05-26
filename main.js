document.getElementById('siteForm').addEventListener('submit',saveBookmark);
function saveBookmark(e){
    let SiteName = document.getElementById('SiteName').value;
    let SiteUrl = document.getElementById('SiteUrl').value;
    if(!Validate(SiteName,SiteUrl))
    {
        return false;
    }
    let bookmark = {
        name: SiteName,
        url: SiteUrl
    }
    if(localStorage.getItem('bookmarks') === null)
    {
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    else
    {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    document.getElementById('siteForm').reset();
    fetchBookmarks();
    console.log(bookmark);
    e.preventDefault();
}
function deleteBookmark(url){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(let i=0;i<bookmarks.length;i++)
    {
        if(bookmarks[i].url==url)
        {
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    fetchBookmarks();
}
function Validate(SiteName,SiteUrl){
    if(!SiteName || !SiteUrl)
    {
        alert('Please fill in the Form');
        return false;
    }
    const exp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(exp);
    if(!SiteUrl.amtch(regex))
    {
        alert('Please add a Valid Url');
        return false;
    }
    return true;
}
function fetchBookmarks(){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarksResults = document.getElementById('bookmarksResults')
    bookmarksResults.innerHTML = '';
    for(let i=0;i<bookmarks.length;i++)
    {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        bookmarksResults.innerHTML += ('<div class="card bg-light text-dark card-body border"> '+' <h2> '+name+' <a class="btn btn-primary" target="_blank" href="'+url+'" > Visit </a> '+
        '<a onClick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"> Delete </a> ' +
        '</h2>'+
        '</div>');

    }
}