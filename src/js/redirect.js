if(window.location.href.includes("postings/")) {
    console.log("OLD POST REDIRCTING!")
    let post = window.location.href.split("postings")[1].split("/")[1].split(".")[0];
    window.location.href="/?post="+post;
} else if(window.location.href.includes("pages/")) {
    console.log("OLD PAGE REDIRCTING!")
    let page = window.location.href.split("pages")[1].split("/")[1].split(".")[0];
    window.location.href="/?page="+page;
} else if(window.location.href.includes(".html")) {
    console.log("WRONG PAGE REDIRCTING!")
    window.location.href="/?page=home";
}