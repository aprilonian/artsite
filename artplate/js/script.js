/*"Welcome to the script file! Your 1st time here, you should update
  the basic info section to include your name and website/social 
  media link (if desired). Most of the time, you will just come
  here to update the posts array. However, you can also edit or
  add your own scripts to do whatever you like!" 
  
  --Originally added by Marina Kittaka
*/

/*
  what aprilonian is using:
    - EDITOR:     Visual Studio Code
    - TESTING:    Firefox/Chrome/Safari/Android
    - FRONTEND:   Zonelets, npm, npm reload, git, 
    - SCRIPTS:    script.js, three.js, HTMLImporter.js
    - HOSTING:    Neocities
*/

///////////////////////
// TABLE OF CONTENTS //
///////////////////////
  // BASIC INFO
  // PROJECT CONTENT
  // PROJECT VARIABLES
  // LOAD CONTENT
  // PRELOAD CONTENT
  // POSTLOAD CONTENT
  // PUSHING PAGES
  // SCROLLING EVENTS
  // ANIMATING EVENTS
  // RESIZING EVENTS
  //
  // Utility Functions
  // Export Module Functions

// Check out the HTMLImporter file for more info on what this is doing 
// to "hotswap" html code into the page.
import {HTMLImporter} from "./HTMLImporter.js";


////////////////
// BASIC INFO //
////////////////
  //#region 

// FILL THIS OUT WITH YOUR INFORMATION

let artBlogTitle = "Jane Doe"; // set this to "" if you don't want a title at the top above the nav bar
let authorName = "Jane Doe";
let authorLink = "https://aprilonian.art"; // Enter your website, social media, etc. Some way for people to tell you they like your blog! (Leaving it empty is okay too)
let lastUpdated = "2021";


let recentPostsCutoff = 2; //Hey YOU! Change this number to set how many recent posts to show before cutting it off with a "more posts" link.
let footerHTML  = "<hr>"
                +"<p>" 
                + "Written and created by <a href='"+authorLink+"' target='_blank'>" 
                + authorName 
                + "</a>, "
                + "built on top of <a href='https://zonelets.net/' target='_blank'>Zonelets</a>. "
                + "Website hosted by <a href='https://neocities.org/' target='_blank'>Neocities</a>. " 
                + "<a href='https://web.archive.org/web/20191105090859/http://www.uzine.net/article63.html' target='_blank'>The Indie Web</a>." 
                + " Last updated " + lastUpdated +".</p>";

  //#endregion
  
/////////////////////
// PROJECT CONTENT //
/////////////////////
  //#region 

// ADD YOUR PROJECT CONTENT: 
  // PAGES, 
  // ART, 
  // POSTS, 
  // PROJECT LINKS, 
  // & STICKERS

let pages = [
  {
    pageName: "home",                   // filenameUnderPagesFolder, no extention
    tabTitle: encodeURI( 'Welcome' ),   // encodeURI( 'browserTabtitle' )    !Note: encoudURI is used for special characters and is required here
    navTitle: encodeURI( 'Art' )        // encodeURI( 'navbarTitle' )]       !Note: and here
  },{
    pageName: "archive",                   
    tabTitle: encodeURI( 'Art posts!' ),
    navTitle: encodeURI( 'posts' )        
  },{
    pageName: "projects",                   
    tabTitle: "",  
    navTitle: ""        
  },{
    pageName: "about",    
    tabTitle: "",  
    navTitle: ""
  },
]

let art = [
  {
    folder:   "../art/",                  // location of the file
    name:     "bird_01",                  // name of the file
    ext:      ".jpg",                     // extention if any
    title:    "Birds Fly",                // title of the art work
    altText:  "this is a bird",           // accessibility text for your art
    postref:  "2021-05-12-First-Post",    // what post did you mention it in if you any
    id:       ""                          // leave this empty
  },{
    folder:   "../art/",
    name:     "bird_02",
    ext:      ".jpg",
    title:    "Birds Fly",
    altText:  "this is a bird",
    postref:  "",
    id:       ""
  },{
    folder:   "../art/",
    name:     "bird_03",
    ext:      ".jpg",
    title:    "Birds Fly",
    altText:  "this is a bird",
    postref:  "",
    id:       ""
  },{
    folder:   "../art/",
    name:     "birdart_06",
    ext:      ".jpg",
    title:    "Birds Fly",
    altText:  "this is a bird",
    postref:  "",
    id:       ""
  },{
    folder:   "../art/",
    name:     "bird_05",
    ext:      ".jpg",
    title:    "Birds Fly",
    altText:  "this is a bird",
    postref:  "",
    id:       ""
  },{
    folder:   "../art/",
    name:     "birdart_03",
    ext:      ".jpg",
    title:    "Birds Fly",
    altText:  "this is a bird",
    postref:  "",
    id:       ""
  },{
    folder:   "../art/",
    name:     "birdart_02",
    ext:      ".jpg",
    title:    "Birds Fly",
    altText:  "this is a bird",
    postref:  "",
    id:       ""
  },{
    folder:   "../art/",
    name:     "bird_04",
    ext:      ".jpg",
    title:    "Birds Fly",
    altText:  "this is a bird",
    postref:  "",
    id:       ""
  },{
    folder:   "../art/",
    name:     "birdart_05",
    ext:      ".jpg",
    title:    "Birds Fly",
    altText:  "this is a bird",
    postref:  "",
    id:       ""
  },
]

let posts = [
  ["2021-05-13-Second-Post"], // !testing will be uploaded at unlisted and wont show up in any lists, great for testing or pre-writing
  ["2021-05-12-First-Post!pinned"], // !pinned will always show up on the home page and where pinnedpostsdiv is
  ["2020-11-10-HTML-cheat-sheet"], // this is how it will normally look when you make a new post
]

let projectUrls = [
  [ "https://www.twitter.com", "project title" ],
];

// set this to undefined or [] if you don't want stickers
let stickers = [ 
  {
    location:   "../images/stickers/",
    file:       "cardinal",
    ext:        ".png",
    transform:  "rotateZ(22deg) scale(1.2)",
    href:       "", // optional href
    id:         "sticker-cardinal", // Unique id, can't be the same as other sticker ids
    parentid:   "content",
    alignH:     "left",
    alignV:     "top",
    offsetX:    -50,
    offsetY:    44,
  },
  {
    location:   "../images/stickers/",
    file:       "starling",
    ext:        ".png",
    transform:  "rotateZ(-10deg) scaleX(-1.2) scaleY(1.2)",
    href:       "http://aprilonian.art",
    id:         "sticker-cardinal2",
    parentid:   "content",
    alignH:     "right",
    alignV:     "middle",
    offsetX:    45,
    offsetY:    -120
  },
  {
    location:   "../images/stickers/",
    file:       "yellowbelliedfinch",
    ext:        ".png",
    transform:  "rotateZ(-12deg) scaleX(-1)",
    href:       "https://lu.tiny-universes.net/index2.html",
    id:         "sticker-finch",
    parentid:   "content",
    alignH:     "center",
    alignV:     "bottom",
    offsetX:    45,
    offsetY:    -60
  },
]
  //#endregion

///////////////////////
// PROJECT VARIABLES //
///////////////////////
  //#region 
//The date format to look for is 4 digits, hyphen, 2 digits, hyphen, 2 digits, hyphen. 
const postDateFormat = /\d{4}\-\d{2}\-\d{2}\-/;

let navScrollTop = 112;
let currentPage = pages[0].pageName;
let currentPost = "";
let animatedTags = [];
let animatedLetters = [];
let currentGalleryArt = undefined;
let currentArtFocus = undefined;
let nextArtFocus = undefined;
let prevArtFocus = undefined;

  //#endregion

//////////////////
// LOAD CONTENT //
//////////////////
  //#region 
function reloadContent() {

  // Get the URL so we can use the variables that are store in there by the PUSHING PAGES section
  let url = window.location.href;

  
  // Below we check if each relevant div exists. If so, we inject the correct HTML!
  // 
  // NOTE: 
  // All of these sections are optional to use on any given page. For example, if there's 
  // one particular blog post where we don't want the footer to appear, 
  // we simply don't put a <div id="footer"> on that page.
  
  // ID SEARCH LIST:
    // artblogtitle
    // nextprev
    // projectslist
    // postlistdiv
    // postlistdiv
    // pinnedpostlistdiv
    // recentpostlistdiv
    // allposts
    // postTitleH1
    // postDate
    // gallery
  
  if (document.getElementById("artblogtitle")) {
    document.getElementById("artblogtitle").innerHTML = artBlogTitle;
  }
  if (document.getElementById("projectslist")) {
    
    let experimentsListHTML = "<ul>";
    for ( let i = 0; i < projectUrls.length; i++ ) {
      var experimentsName = projectUrls[i][1];
      experimentsListHTML += '<li><a href="' + projectUrls[i][0] +'">' +experimentsName+ '</a></li>';
    }
    experimentsListHTML += "</ul>";

    document.getElementById("projectslist").innerHTML = experimentsListHTML;
  }
  if (document.getElementById("postlistdiv")) {  

    let postListHTML = "<ul>";
    for ( let i = 0; i < posts.length; i++ ) {
      if(!(posts[i][0].slice(11).replace(/-/g," ").split("!")[1] === "testing"))
      {
        postListHTML += '<li><a id="'+posts[i][0].split("!")[0]+'">' + formatPostTitle(posts[i], undefined, " ⬩ ", true, true, undefined) + '</a></li>';
      }
    }
    postListHTML += "</ul>";

    document.getElementById("postlistdiv").innerHTML = postListHTML;
  }
  if (document.getElementById("pinnedpostlistdiv")) {
    
    // Generate list of pinned posts
    let pinnedPostListHTML = "<h2>Pinned:</h2><ul>";
    for ( let i = 0; i < posts.length; i++ ) {
      if(posts[i][0].slice(11).replace(/-/g," ").split("!")[1] === "pinned")
      {
        let pinnedPost = '<li><a id="'+posts[i][0]+'">' + formatPostTitle(posts[i], undefined, undefined, true, true) + '</a></li>';
        pinnedPostListHTML += pinnedPost;
      }
        
    }
    pinnedPostListHTML += "</ul>";

    document.getElementById("pinnedpostlistdiv").innerHTML = pinnedPostListHTML;
  }
  if (document.getElementById("recentpostlistdiv")) {
    // // Generate the Recent Post List HTML, which can be shown on the home page (or wherever you want!)
    let recentPostListHTML = "<h2>Newest Posts:</h2><ul>";
    let recentPostsCutoffLocal = recentPostsCutoff;
    let numberOfRecentPosts = Math.min( recentPostsCutoffLocal, posts.length );
    for ( let i = 0; i < numberOfRecentPosts; i++ ) {
      if((posts[i][0].slice(11).replace(/-/g," ").split("!")[1] === "testing"))
      {
        numberOfRecentPosts++; recentPostsCutoffLocal++;
      } else {
        let recentPost = '<li><a id="'+posts[i][0].split("!")[0]+'">' + formatPostTitle(posts[i], undefined, undefined, true, true) + '</a></li>';
        recentPostListHTML += recentPost;        
      }
    }
    /*If you've written more posts than can fit in the Recent Posts List,
      then we'll add a link to the archive so readers can find the rest of
      your wonderful posts and be filled with knowledge.*/
    if ( posts.length > recentPostsCutoffLocal ) {
      recentPostListHTML += '<li class="moreposts"><a id="allposts">all postings</a></li>';
      
    }  
    recentPostListHTML += "</ul>";

    document.getElementById("recentpostlistdiv").innerHTML = recentPostListHTML;
    
  }  
  if (document.getElementById("postTitleH1")) {
    
    // console.log("BLOGTITLE")
    let postTitle = "Post Title"
    if(url.split("?")[1]?.split("=")[0] == "post"){
      let post = url.split("=")[1];
      postTitle = formatPostTitle([post]);
    }
    document.getElementById("postTitleH1").innerHTML = postTitle;
  }
  if (document.getElementById("postDate")) {

    let postDate = "";
    
    // NICE DATE
    if(url.split("?")[1]?.split("=")[0] == "post"){
      let post = url.split("=")[1];
      postDate = formatPostDate(post);
    }

    document.getElementById("postDate").innerHTML = postDate;
  }
  if(document.getElementById("gallery")) {
    let galleryHTML = document.getElementById("gallery");
    for(let i=0; i<art.length; i++){
      art[i].id = (art[i].title.replace(" ", "")+i);
      let artDiv = "<div class='art-container art-container-grid' ><img src='"+art[i].folder+art[i].name+art[i].ext+"' alt='"+art[i].altText+"' id='"+art[i].id+"'></div>"
      galleryHTML.innerHTML += artDiv;
    }
    galleryHTML.parentElement.innerHTML += "<div id='galleryview' class='hidden invisible'></div><div id='galleryview-left'  class='hidden invisible galleryview-button'></div><div id='galleryview-right'  class='hidden invisible galleryview-button'></div>";
  }

  if(stickers !== undefined) {
    for(let i=0; i<stickers.length; i++) {
      let sticker = stickers[i];
      let parent = document.getElementById(sticker.parentid);
      let stickerHref = (!(sticker.href===""))?"<a href='"+sticker.href+"' target='_blank'></a>":"";
      let stickerHTML =       
        "<div id='"+sticker.id+"' class='sticker'>"+stickerHref+"</div>"
        +"<style>#"+sticker.id+" {"
        +"background-image: url('"+ sticker.location+sticker.file+sticker.ext +"');"
        +"transform: "+sticker.transform+"; }</style>";
      
      if(parent) {
        if(!(document.getElementById(stickers[i].id)))
        {
          parent.innerHTML += stickerHTML;
        }  
      }      
    }
  }
  
  animatedTags = document.getElementsByClassName("wavy");
  for(let i=0; i<animatedTags.length; i++) {
    animatedTags[i].innerHTML = createElementsFromString(animatedTags[i].innerHTML, "wavyLetter_"+i);
    let animatedTagLetterArray = document.getElementsByClassName("wavyLetter_"+i);
    animatedLetters.push(animatedTagLetterArray)
  }

  // ASSIGN BUTTONS FOR RECENT POSTS
  // For every post, if there is a button element with an "id=postname" matching the post
  // and add a click event to PUSH a page to window history
  for(var i=0; i<posts.length; i++) {   

    if(!(posts[i][0].split("!")[1]==="testing")) {
      let post = posts[i][0].split("!")[0];
      let title = formatPostTitle(posts[i]);
      let div = "content";

      if(document.getElementById(post)) {
        document.getElementById(post).addEventListener("click", function() {  
          console.log("Go to new post: " + title);     
          goToPage(post, title, div,"postings","post"); 
        });
      }  
    }
        
  }

  // ASSIGN BUTTONS FOR PINNED POSTS
  for(var i=0; i<posts.length; i++) {   

    let post = posts[i][0];
    let title = formatPostTitle(posts[i]);
    let div = "content";
    if(document.getElementById(post)) {
      if(post.split("!")[1]==="pinned") {
        document.getElementById(post).removeEventListener("click", function(){}, false);
        document.getElementById(post).addEventListener("click", function() {  
          console.log("Go to new post: " + title);     
          goToPage(post.split("!")[0], title, div,"postings","post"); 
        });
      }      
    }      
  }

  // ASSIGN BUTTONS FOR THE GALLERY
  for(var i=0; i<art.length; i++){
    if(document.getElementById(art[i].id)) {
      let artDiv = document.getElementById(art[i].id)
      let artPiece = art[i];
      let artTitle = art[i].title;
      artDiv.addEventListener('click', function() { 
        let artFocus = document.getElementsByClassName("artfocus");
        for(var i=0; i<artFocus.length; i++){
          let artElement = artFocus[i];
          console.log(artElement)

          artElement.parentNode.removeChild(artElement);
        }

        currentGalleryArt = artDiv;
        currentArtFocus = artDiv.cloneNode();
        currentArtFocus.classList.add("artfocus");

        document.body.appendChild(currentArtFocus);
        document.getElementById("galleryview").classList.remove("invisible")
        document.getElementById("galleryview").classList.remove("hidden")
        document.getElementById("galleryview-left").classList.remove("invisible")
        document.getElementById("galleryview-left").classList.remove("hidden")
        document.getElementById("galleryview-right").classList.remove("invisible")
        document.getElementById("galleryview-right").classList.remove("hidden")

        reloadArtFocus();
        // goToPage(post.split("!")[0], title, div,"postings","post"); 
      });
    }
  }
  if(document.getElementById("galleryview")){
    document.getElementById("galleryview").addEventListener('click', function() {
      let artFocus = document.getElementsByClassName("artfocus");
      if(artFocus.length>0){
        for(var i=0; i<artFocus.length; i++){
          let artElement = artFocus[i];
    
          artElement.parentNode.removeChild(artElement);
          document.getElementById("galleryview").classList.add("invisible")
          document.getElementById("galleryview").classList.add("hidden")
          document.getElementById("galleryview-left").classList.add("invisible")
          document.getElementById("galleryview-left").classList.add("hidden")
          document.getElementById("galleryview-right").classList.add("invisible")
          document.getElementById("galleryview-right").classList.add("hidden")
        }
      }
    });
  }
  if(document.getElementById("galleryview-left")){
    document.getElementById("galleryview-left").addEventListener('click', function() {
      focusArt(prevArtFocus);
    });
  }
  if(document.getElementById("galleryview-right")){
    document.getElementById("galleryview-right").addEventListener('click', function() {
      focusArt(nextArtFocus);
    });
  }

  // ASSIGN BUTTONS FOR GALLERY GRID TYPES
  if(document.getElementById("gallery-type-grid")) {
    let btnGrid = document.getElementById("gallery-type-grid");
    let btnSingle = document.getElementById("gallery-type-single");
    btnGrid.addEventListener('click', function() {
      btnGrid.classList.add('active');
      btnSingle.classList.remove('active');

      let artContainers = document.getElementsByClassName("art-container");
      for(let i=0; i<artContainers.length; i++) {
        artContainers[i].classList.add('art-container-grid');
        artContainers[i].classList.remove('art-container-single');
      }
    });
  }
  if(document.getElementById("gallery-type-single")) {
    let btnGrid = document.getElementById("gallery-type-grid");
    let btnSingle = document.getElementById("gallery-type-single");
    btnSingle.addEventListener('click', function() {
      btnSingle.classList.add('active');
      btnGrid.classList.remove('active');

      let artContainers = document.getElementsByClassName("art-container");
      for(let i=0; i<artContainers.length; i++) {
        artContainers[i].classList.remove('art-container-grid');
        artContainers[i].classList.add('art-container-single');
      }
    });
  }

  // ASSIGN BUTTONS FOR NEXT & PREVIOUS POSTS & All POSTS
  if (document.getElementById("nextprev")) {

    updateNav();

    // //Generate the Next and Previous Post Links HTML
    let nextprevHTML = "";

    // Find what post we are on
    let postIndex = 0;
    for ( let i = 0; i < posts.length; i++ ) {
      // console.log(url.split("?")[1]?.split("=")[1])
      if(posts[i][0].split("!")[0] == url.split("?")[1]?.split("=")[1])
      {
         postIndex = i;
      }
    }

    // If you're on the newest blog post, there's no point to
    // a "Next Post" link, right? And vice versa with the oldest 
    // post! That's what the following code handles.

    let homeButton = ' | ';
    
    let nextButton = (posts.length<2) ? '<a class="invisible">\u00AB Next Post</a>' : ((postIndex===0) ? '<a class="invisible">\u00AB Next Post</a>' : (posts[postIndex-1][0].split("!")[1]=="testing")? '<a class="invisible">\u00AB Next Post</a>' : '<a class="navpost" location="'+posts[postIndex-1][0].split("!")[0]+'">\u00AB Next Post</a>');
    
    let prevButton = (posts.length<2) ? '<a class="invisible">Previous Post \u00BB</a>' : ((postIndex===posts.length-1) ? '<a class="invisible">Previous Post \u00BB</a>' : '<a class="navpost" location="'+posts[postIndex+1][0].split("!")[0]+'">Previous Post \u00BB</a>');

    nextprevHTML = nextButton + homeButton + prevButton;
    
    // INJECT THE CODE!!
    document.getElementById("nextprev").innerHTML = nextprevHTML;

    // NOW search for the new home button we added 
    // and add a click event to PUSH a page to window history
    if(document.getElementById("postingshome")){
      document.getElementById("postingshome").addEventListener("click", function() {       
        goToPage(pages[0].pageName, capitalize(pages[0].pageName), "content", "pages", "page"); 
      });
    }
    
  }


  let nextprevBtns = document.getElementsByClassName("navpost");
  for ( let i = 0; i < nextprevBtns.length; i++ ) {
    let post = nextprevBtns[i].getAttribute('location');
    let title = formatPostTitle([post]);
    let div = "content";

    nextprevBtns[i].addEventListener("click", function() {  
      console.log("Go to new post: " + title);     
      goToPage(post, title, div,"postings","post"); 
    });
  }

  if(document.getElementById("allposts")){
    document.getElementById("allposts").addEventListener("click", function() {  
      goToPage(pages[1].pageName, capitalize(decodeURI(pages[1].tabTitle)), "content", "pages", "page"); 
    });
  }
  

  resizeAll();
}
  //#endregion

//////////////
// PRELOAD  //
//////////////
  //#region 
// The moment that this script is called, this function fires
function preload() {  
    
  /////////////////
  // HEADER FILL //
  /////////////////
  if (document.getElementById("header")) {    
    let headerHTML = "<ul>";
    for(var i=0; i<pages.length; i++) {  
      let page = pages[i].pageName;
      let title;
      if(pages[i].tabTitle != ""){
        title = capitalize(decodeURI(pages[i].navTitle));
      }
      else {
        title = capitalize(page);
      }
      headerHTML +='<li><a id="'+page+'">'+title+'</a></li>'
    }
    headerHTML +="</ul>"

    document.getElementById("header").innerHTML = headerHTML;
  }  

  /////////////////
  // FOOTER FILL //
  /////////////////
  if (document.getElementById("footer")) {    
    document.getElementById("footer").innerHTML = footerHTML;
  }
  
  ///////////////////////////
  // LOAD & RELOAD CONTENT //
  ///////////////////////////
  reloadContent();

  ///////////////////////////////
  // HEADER NAVIGATION BUTTONS //
  ///////////////////////////////
  for(var i=0; i<pages.length; i++) {   

    let page = pages[i].pageName;
    let title;
    if(pages[i].tabTitle != ""){
      title = capitalize(decodeURI(pages[i].tabTitle));
    }
    else {
      title = capitalize(page);
    }
    let div = "content";

    document.getElementById(page).addEventListener("click", function() {       
      goToPage(page, title, div, "pages", "page"); 
    });
  }
  
  /////////////////////////////////
  // PAGE PUSHING TO THE URL BAR //
  /////////////////////////////////
  // Okay this was complcated for me at first, but essencially: store values in the URL bar 
  // and use those values to determine what page we are on and push it into the history of the
  // browser. This allows for hotswapping *pages* and *posts* on the fly rather than using 
  // separate index files. The hotswapping is done with AJAX, so it should be pretty reliable
  // long term.
  let url = window.location.href
  if(url.includes("posts/")) {
    console.log("OLD POST REDIRCTING!")
    let post = url.split("posts")[1].split("/")[1].split(".")[0];
    window.location.href="/?post="+post;
  }
  else if(url.split("?")[1]?.split("=")[0] == "page"){
    let page = url.split("=")[1];
    let title = capitalize(page);
    let element = "content";
    setupPage(page, title, element, "pages", "page");
    window.history.pushState(currentPage, title, "?page="+currentPage);  
  }
  else if(url.split("?")[1]?.split("=")[0] == "post"){
    let post = url.split("=")[1];
    let title = formatPostTitle([post]);
    let element = "content";
    setupPage(post, title, element, "postings", "post");
    window.history.pushState(currentPost, title, "?post="+currentPost);  
  }
  else {
    let page = pages[0].pageName;
    let title = capitalize(pages[0].pageName);
    let element = "content";
    setupPage(page, title, element, "pages", "page");
    window.history.pushState(page[0].pageName, title, "?page="+currentPage); 
  }
   
}
preload(); // Happens when the DOM is loaded
  //#endregion

//////////////
// POSTLOAD //
//////////////
  //#region 

// POST LOAD when everything is ready
function postload() {
  resizeAll();
  animate(0);
}
window.onload = function() {
  postload();
};
  //#endregion

///////////////////
// PUSHING PAGES //
///////////////////
  //#region 

function goToPage(page, title, element, location, locationTitle) {
  setupPage(page, title, element, location);
  window.history.pushState(currentPage, title, "?"+locationTitle+"="+currentPage);
}
function setupPage(page, title, element, location) {
  currentPage = page;
  currentPost = page;
  HTMLImporter.import("../"+location+"/"+page+".html", element, reloadContent);
  document.title = title;
}

window.onpopstate = function(event) {
  if(event) {
    let page = event.state;
    let pageTitle = capitalize(page);
    
    let url = window.location.href

    if(url.includes("?page=")) {
      setupPage(page, pageTitle, "content", "pages", "page");
    }
    else if(url.includes("?post=")) {      
      setupPage(page, pageTitle, "content", "postings", "page");
    }
  }
  else {
    console.log("No page found!")
  }
}
  //#endregion

//////////////
// SCROLLIN //
//////////////
  //#region 
// Function for when the DOM is scrolling
window.onscroll = function() {
}
  //#endregion

///////////////
// ANIMATING //
///////////////
  //#region 

// Like a game loop, animate every from when available (i.e. when focused on this tab)

let last = 0; // timestamp of the last update() call
let deltaTime = 0;
let worldPaused = false;
function animate(now) {
  updateNav();
  updateArtFocus();

  if(!last || now - last >= 10) {
    last = now;
    if(!worldPaused)
    {
  
      if(animatedLetters.length>0 && animatedLetters != undefined) 
      {

        for(let i=0; i<animatedLetters.length; i++) {
          if(animatedLetters[i][0]) {
            let speed     = undefined;
            let amplitude = undefined;
            let offset    = undefined;
            let waveType  = undefined;
            let currentLetter = animatedLetters[i][0];
            if(currentLetter.parentNode.hasAttribute("wavy-speed")) {      
              speed=currentLetter.parentNode.getAttribute("wavy-speed");
            }
            if(currentLetter.parentNode.hasAttribute("wavy-amplitude")) {      
              amplitude=currentLetter.parentNode.getAttribute("wavy-amplitude");
            }
            if(currentLetter.parentNode.hasAttribute("wavy-offset")) {      
              offset=currentLetter.parentNode.getAttribute("wavy-offset");
            }
            if(currentLetter.parentNode.hasAttribute("wavy-type")) {      
              waveType=currentLetter.parentNode.getAttribute("wavy-type");
            }


            wavyElements(animatedLetters[i], amplitude, offset, speed, waveType);
          }
          
        }
      }

      if(stickers !== undefined) {
        for(let i=0; i<stickers.length;i++){
          anchor(stickers[i].id, stickers[i].parentid, stickers[i].alignH, stickers[i].alignV, stickers[i].offsetX, stickers[i].offsetY);        
        }
      }
      
      // step in deltaTime
      deltaTime++;
    }
  }

  requestAnimationFrame(animate);
}

// Stick the next/prev button bar to the top when we scroll down far enough
function updateNav() {
  if(document.getElementById("nextprev"))
  {
    let nav = document.getElementById("nextprev");
    let content = document.getElementById("content");
    let contentborder = document.getElementById("content-colorborder");

    let doc = document.documentElement;
    let top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

    if(top >= navScrollTop) {
      if(!(nav.classList.contains("navfixed"))) {
        nav.classList.add("navfixed");
        content.classList.add("navspacer");
      }
    } else if (top < navScrollTop) {
      if(nav.classList.contains("navfixed")) {
        nav.classList.remove("navfixed");
      }
      content.classList.remove("navspacer");
    } else {
      content.classList.remove("navspacer");
    }
    nav.style.width = contentborder.offsetWidth + "px"
  } else {

    let content = document.getElementById("content");
    content.classList.add("navspacer");

  }
}

function updateArtFocus() {
  let artFocus = document.getElementsByClassName("artfocus");
  if(artFocus.length>0) {
    artFocus = artFocus[0];
    // console.log(artFocus)
    
    artFocus.style.top = ((window.innerHeight/2) - (artFocus.offsetHeight/2))+"px";
    artFocus.style.left = ((window.innerWidth/2) - (artFocus.offsetWidth/2))+"px";
  }
}
  //#endregion

//////////////
// RESIZING //
//////////////
  //#region 
window.addEventListener( 'resize', blogWindowResize );

function blogWindowResize() {
  resizeAll();
}

function resizeAll() {
  let tjs_embed = document.getElementsByClassName("threejs-embed");

  let i;
  for(i=0; i < tjs_embed.length; i++) {
    if(tjs_embed[i])
    {
      tjs_embed[i].setAttribute("height", tjs_embed[i].scrollWidth)      
    }
  }

}
  //#endregion

///////////////////////
// UTILITY FUNCTIONS //
///////////////////////
  //#region 

// GALLERY function to reassign sibliings in the gallery, properly display artwork, and reload buttons
function reloadArtFocus() {

  // NEXT ART to get ready for display
  // If the next is null, the current art is the last in the gallery, so the next art is the first in the gallery
  nextArtFocus = (currentGalleryArt.parentNode.nextSibling==null)?currentGalleryArt.parentNode.parentNode.firstChild.firstChild:currentGalleryArt.parentNode.nextSibling.firstChild;

  // PREVIOUS ART to get ready for display
  // If the previous is null, the current art is the first in the gallery, so the previous art is the last in the gallery
  prevArtFocus = (currentGalleryArt.parentNode.previousSibling==null)?currentGalleryArt.parentNode.parentNode.lastChild.lastChild:currentGalleryArt.parentNode.previousSibling.firstChild;

  // Depending on if the ratio is tall or wide, set up the correct class to responsively size the image correctly
  if(currentArtFocus.offsetWidth < currentArtFocus.offsetHeight)
  {          
    currentArtFocus.classList.add("artfocus-tall");
  }else {
    currentArtFocus.classList.add("artfocus-wide");
  }

  // ADD BUTTONS to the current art
  currentArtFocus.addEventListener('click', function(event) {
    let artCenter = ((currentArtFocus.getBoundingClientRect().width)/2);
    let mouseX = event.clientX-(currentArtFocus.getBoundingClientRect().x);
    let setArtFocus = (mouseX >= artCenter)?nextArtFocus:prevArtFocus;
    console.log(setArtFocus)
    
    focusArt(setArtFocus);
  });
  currentArtFocus.addEventListener('dblclick', function() {
    
  });
}

// GALLERY function to display the target art in the gallery
function focusArt(artToFocus) {
  currentGalleryArt = artToFocus ;
  
  artToFocus  = artToFocus.cloneNode();
  artToFocus .classList.add("artfocus");
  currentArtFocus.parentElement.replaceChild(artToFocus , currentArtFocus);

  currentArtFocus = artToFocus ;

  reloadArtFocus();
}

// Creates a <p> tag around every letter in a string and returns the html string
// Additionally, <div> tags separate words to make sure flex works
function createElementsFromString(stringP, elementClassName) {
  var sPArray = stringP.split("");
  var returnString = "";
  for(var i = 0; i < sPArray.length; i++) {
    if(sPArray[i] == " ") // every space
    {
      returnString += "<span class='"+elementClassName+" invisible'>_</span>";
    }
    else {
      returnString += "<span class='"+elementClassName+"'>" + sPArray[i] + "</span>";
    }
  }
  returnString += "";
  return returnString
}
// wavyElements utilizes elements in an array to transform them in a sine wave
function wavyElements(elementArray = [], amplitude = 2, offsetwave = -2, speed = 1, waveType = "sine") {
  

  for(var i = 0; i < elementArray.length; i++){
    let sineWave    = Math.sin( (deltaTime/30*speed)+ i*5);
    let squareWave  = Math.sign( Math.sin( (deltaTime/30*speed)+ i*5));
    let targetWave = (waveType=="sine")?sineWave:(waveType=="square")?squareWave:sineWave;
    elementArray[i].style.transform = "translateY(" + (targetWave *amplitude + offsetwave) + "px)"; 
  }
}

function anchor(elementID, anchorToID, alignHori="center", alignVert="top", offsetX=0, offsetY=0) {

  if(document.getElementById(elementID) && document.getElementById(anchorToID))
  {
    elementID   = document.getElementById(elementID);
    anchorToID  = document.getElementById(anchorToID);
    let left    = anchorToID.getBoundingClientRect().left;
    let center  = anchorToID.getBoundingClientRect().width/2 + left;
    let right   = anchorToID.getBoundingClientRect().right;
    let top     = anchorToID.getBoundingClientRect().top +window.scrollY
    let middle  = anchorToID.getBoundingClientRect().height/2 + top;
    let bottom  = anchorToID.getBoundingClientRect().bottom +window.scrollY;
    offsetX     = offsetX - elementID.offsetWidth/2;
    offsetY     = offsetY - elementID.offsetHeight/2;

    alignHori = (alignHori==="left")?left:(alignHori==="center")?center:(alignHori==="right")?right:"no align selected";
    alignVert = (alignVert==="top")?top:(alignVert==="middle")?middle:(alignVert==="bottom")?bottom:"no align selected";

    elementID.style.top  = (alignVert+offsetY)+ "px";
    elementID.style.left = (alignHori+offsetX) + "px";

  }  
}

function capitalize (value) {
  if(value) {
    var textArray = value.split(' ')
    var capitalizedText = ''
    var conjunctions = ['the', 'of', 'a']
    for (var i = 0; i < textArray.length; i++) {
      if (conjunctions.includes(textArray[i])) {
        continue
      }
      capitalizedText += textArray[i].charAt(0).toUpperCase() + textArray[i].slice(1) + ' ';
    }
  
    return capitalizedText.trim();
  }
  
}

function formatPostTitle(post, capitalized=true, spacer=" ⬩ ", withDate=false, formattedDate=false, onlyDate=false) {
  
  let title;
  if(post.length > 1){
    title = decodeURI(post[1]);
  }
  else {
    title = post[0];
  }
  
  //If there is no alternate post title, check if the post uses the date format or not, and return the proper title
  if (  postDateFormat.test ( title.slice( 0,11 ) ) ) {
    let postDate = title.split("!")[0].slice(0,10);
    let postTitle = title.split("!")[0].slice(11).replace(/-/g," ");

    postDate = (formattedDate? formatPostDate(title):postDate);
    postTitle = (capitalized?capitalize(postTitle):postTitle);

    let formatted = (withDate ? postDate+spacer+postTitle : postTitle)    
    return onlyDate ? postDate : formatted;
  } 
  else {
    let postTitle = title.split("!")[0].replace(/-/g," ");
    postTitle = (capitalized?capitalize(postTitle):postTitle);

    let formatted = postTitle;
    return formatted;
  }
}

function formatPostDate(post) {
  // //Get the current post title and date (if we are on a post page)

  let postDateSlice = post.slice( 0,11 );
  if (  postDateFormat.test (postDateSlice)) {
    let monthSlice = postDateSlice.slice( 5,7 );
    let month = "";
    if ( monthSlice === "01") { month = "Jan";}
    else if ( monthSlice === "02") { month = "Feb";}
    else if ( monthSlice === "03") { month = "Mar";}
    else if ( monthSlice === "04") { month = "Apr";}
    else if ( monthSlice === "05") { month = "May";}
    else if ( monthSlice === "06") { month = "Jun";}
    else if ( monthSlice === "07") { month = "Jul";}
    else if ( monthSlice === "08") { month = "Aug";}
    else if ( monthSlice === "09") { month = "Sep";}
    else if ( monthSlice === "10") { month = "Oct";}
    else if ( monthSlice === "11") { month = "Nov";}
    else if ( monthSlice === "12") { month = "Dec";}
    let niceDate = postDateSlice.slice( 8,10 ) + " " + month + ", " + postDateSlice.slice( 0,4 );
    return niceDate;
  }
}
  //#endregion

/////////////////////////////
// EXPORT MODULE FUNCTIONS //
/////////////////////////////
// export these fucntions if we want to use them in another script. 
// lookup using "module type" syntax if you're curious how this works.
export {preload, reloadContent, postload};