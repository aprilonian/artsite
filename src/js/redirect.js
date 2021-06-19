let url = window.location.href

if(url.includes("postings/")) {
    console.log("OLD POST REDIRCTING!")
    let post = url.split("postings")[1].split("/")[1].split(".")[0];
    window.location.href="/?post="+post;
} else if(url.includes("pages/")) {
    console.log("OLD PAGE REDIRCTING!")
    let page = url.split("pages")[1].split("/")[1].split(".")[0];
    window.location.href="/?page="+page;
} else if(url.includes(".html")) {
    console.log("WRONG PAGE REDIRCTING!")
    window.location.href="/?page=home";
}