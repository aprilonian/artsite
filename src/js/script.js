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

let blogName = "";
let authorName = "April Jane";
let authorLink = "https://www.twitter.com/aprilonian"; // Enter your website, social media, etc. Some way for people to tell you they like your blog! (Leaving it empty is okay too)
let lastUpdated = "2021";
let relativePath = ".";

let recentPostsCutoff = 3; //Hey YOU! Change this number to set how many recent posts to show before cutting it off with a "more posts" link.
let footerHTML  = "<hr>"
                +"<p>" 
                + blogName 
                + "Written and created by <a href='"+authorLink+"' target='_blank'>" 
                + authorName 
                + "</a>, "
                + "built on top of <a href='https://zonelets.net/' target='_blank'>Zonelets</a> "
                + "and <a href='https://threejs.org/' target='_blank'>Three.js</a>. "
                + "Website hosted by <a href='https://neocities.org/' target='_blank'>Neocities</a>. " 
                + "<a href='https://web.archive.org/web/20191105090859/http://www.uzine.net/article63.html' target='_blank'>What the heck is The Indie Web</a>." 
                + " Last updated " + lastUpdated +".</p>";

  //#endregion
  
///////////////////////
// PROJECT VARIABLES //
///////////////////////
  //#region 

let pages = [
  ["home"],
  ["archive",encodeURI( 'postings Archive!' ),encodeURI( 'postings' )],
  ["experiments"],
  ["about"]
]

let posts = [
  ["2021-06-28-Happy-Pride"],
  ["2021-06-17-Sticker-Me-BB-dot-html"],
  ["2021-05-20-Animated-Turnips"],
  ["2021-05-17-More-Outlines"],
  ["2021-05-13-Adding-The-Experiments"],
  ["2021-05-12-Dot-Brand!pinned"],
]

let projectUrls = [
  [ "experiments/coffeetv/index.html" ],
  [ "experiments/infinisequence/index.html" ],
  [ "experiments/scrambledeggs/index.html" ],
  [ "experiments/thunderbirdexpress/index.html" ],
];

let stickers = [
  {
    location:   "../images/stickers/",
    file:       "buttercupsndaisies-blue",
    ext:        ".png",
    transform:  "rotate(12deg) scale(1.3)",
    href:       "../images/stickers/buttercupsndaisies-blue.png",
    id:         "sticker-gorge",
    parentid:   "content",
    alignH:     "left",
    alignV:     "top",
    offsetX:    -55,
    offsetY:    44,
  },{
    location:   "../images/stickers/",
    file:       "spacecatplanets-nobg",
    ext:        ".png",
    transform:  "rotate(10deg) scale(1.3)",
    href:       "../images/stickers/spacecatplanets-nobg.png",
    id:         "sticker-spacecat",
    parentid:   "content",
    alignH:     "right",
    alignV:     "middle",
    offsetX:    55,
    offsetY:    -100
  },
  {
    location:   "../images/stickers/",
    file:       "approaches",
    ext:        ".png",
    transform:  "rotate(-10deg) scale(1.1)",
    href:       "../images/stickers/approaches.png",
    id:         "sticker-approaches",
    parentid:   "content-colorborder",
    alignH:     "right",
    alignV:     "bottom",
    offsetX:    -180,
    offsetY:    -30
  },
  {
    location:   "../images/stickers/",
    file:       "inclusiveprideflag",
    ext:        ".jpg",
    transform:  "rotate(2deg)",
    href:       "https://twitter.com/ValentinoInter/status/1404048013773967360",
    id:         "sticker-pride",
    parentid:   "content",
    alignH:     "right",
    alignV:     "top",
    offsetX:    -0,
    offsetY:    -0
  },
]

//The date format to look for is 4 digits, hyphen, 2 digits, hyphen, 2 digits, hyphen. 
const postDateFormat = /\d{4}\-\d{2}\-\d{2}\-/;

let navScrollTop = 122;
let currentPage = pages[0][0]; // prefilled by server in this case, as "home" at pages[0][0]
// let currentPage = "";
let animatedTags = [];
let animatedLetters = [];

  //#endregion

//////////////////
// LOAD CONTENT //
//////////////////
  //#region 
function reloadContent() {

  console.log("reload");

  // Get the URL so we can use the variables that are store in there by the PUSHING PAGES section
  let url = window.location.href;

  
  // Below we check if each relevant div exists. If so, we inject the correct HTML!
  // 
  // NOTE: 
  // All of these sections are optional to use on any given page. For example, if there's 
  // one particular blog post where we don't want the footer to appear, 
  // we simply don't put a <div id="footer"> on that page.
  
  // ID SEARCH LIST:
    // nextprev
    // experimentslistdiv
    // postlistdiv
    // postlistdiv
    // pinnedpostlistdiv
    // recentpostlistdiv
    // allposts
    // postTitleH1
    // postDate

  if (document.getElementById("experimentslistdiv")) {
    
    let experimentsListHTML = "<ul>";
    for ( let i = 0; i < projectUrls.length; i++ ) {
      var experimentsName = projectUrls[i][0].split("/")[1];
      experimentsListHTML += '<li><a href="' + relativePath + '/'+ projectUrls[i][0] +'">' +experimentsName+ '</a></li>';
    }
    experimentsListHTML += "</ul>";

    document.getElementById("experimentslistdiv").innerHTML = experimentsListHTML;
  }
  if (document.getElementById("postlistdiv")) {  

    let postListHTML = "<ul>";
    for ( let i = 0; i < posts.length; i++ ) {
      if(!(posts[i][0].slice(11).replace(/-/g," ").split("!")[1] === "testing"))
      {
        postListHTML += '<li><a id="'+posts[i][0].split("!")[0]+'">' + formatPostTitle(posts[i], undefined, " ??? ", true, true, undefined) + '</a></li>';
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
        let pinnedPost = '<li><a id="'+posts[i][0].split("!")[0]+'">' + formatPostTitle(posts[i], undefined, undefined, true, true) + '</a></li>';
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

  if(stickers !== undefined) {
    for(let i=0; i<stickers.length; i++) {
      let sticker = stickers[i];
      let parent = document.getElementById(sticker.parentid);     
      
      if(parent) {
        if(!(document.getElementById(stickers[i].id)))
        {
          let stickerHref = (!(sticker.href===""))?"<a href='"+sticker.href+"' target='_blank'></a>":"";
          let stickerHTML =       
            "<div id='"+sticker.id+"' class='sticker'>"+stickerHref+"</div>"
            +"<style>#"+sticker.id+" {"
            +"background-image: url('"+ sticker.location+sticker.file+sticker.ext +"');"
            +"transform: "+sticker.transform+";}"
            +"#"+sticker.id+" a {"
            +"mask-image:url('"+ sticker.location+sticker.file+sticker.ext +"');"
            +"}</style>";
          document.getElementById("container").innerHTML += stickerHTML;
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

  // ASSIGN BUTTONS FOR NEXT & PREVIOUS POSTS & All POSTS
  if (document.getElementById("nextprev")) {

    updateNav();

    // //Generate the Next and Previous Post Links HTML
    let nextprevHTML = "";

    // Using the URL bar, we can s
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
        goToPage(pages[0][0], capitalize(pages[0][0]), "content", "pages", "page"); 
      });
    }
    
  }

  let nextprevBtns = document.getElementsByClassName("navpost");
  for ( let i = 0; i < nextprevBtns.length; i++ ) {
    let post = nextprevBtns[i].getAttribute('location');
    let title = formatPostTitle([post]);
    let div = "content";

    nextprevBtns[i].addEventListener("click", function() {  
      goToPage(post, title, div,"postings","post"); 
    });
  }

  if(document.getElementById("allposts")){
    document.getElementById("allposts").addEventListener("click", function() {  
      goToPage(pages[1][0], capitalize(decodeURI(pages[1][1])), "content", "pages", "page"); 
    });
  }

  ///////////////////////////////
  // HEADER NAVIGATION BUTTONS //
  ///////////////////////////////
  for(var i=0; i<pages.length; i++) {   

    let page = pages[i][0];
    let title;
    if(pages[i].length > 1){
      title = capitalize(decodeURI(pages[i][1]));
    }
    else {
      title = capitalize(page);
    }
    let div = "content";

    let element = document.getElementById(page);
    if(!(element.getAttribute('listener'))) {
      console.log(page);
      element.addEventListener("click", function() {       
        console.log("go!")
        goToPage(page, title, div, "pages", "page"); 
      });
      element.setAttribute('listener', 'true');
    }
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
  console.log("preload");
    
  /////////////////
  // HEADER FILL //
  /////////////////
  if (document.getElementById("header")) {    
    let headerHTML = "<ul>";
    for(var i=0; i<pages.length; i++) {  
      let page = pages[i][0];
      let title;
      if(pages[i].length > 2){
        title = capitalize(decodeURI(pages[i][2]));
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
  // reloadContent();
  
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
    window.history.pushState(currentPage, title, "?post="+currentPage);  
  }
  else {
    let page = pages[0];
    let title = capitalize(page[0]);
    let element = "content";
    setupPage(page, title, element, "pages", "page");
    window.history.pushState(page[0], title, "?page="+currentPage); 
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
  console.log("postload");  
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
  currentPage = page;
  HTMLImporter.import("../"+location+"/"+page+".html", element, reloadContent, HTML404Redirect);
  document.title = title;
}
function HTML404Redirect() {
  setTimeout(function(){ window.location.href="/?page=home"; }, 2000);  
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

      for(let i=0; i<stickers.length;i++){
        anchor(stickers[i].id, stickers[i].parentid, stickers[i].alignH, stickers[i].alignV, stickers[i].offsetX, stickers[i].offsetY);        
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

  if(document.getElementById("content"))
  {
    navScrollTop = document.getElementById("content").offsetTop;
  }
    
}
  //#endregion

///////////////////////
// UTILITY FUNCTIONS //
///////////////////////
  //#region 

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

function formatPostTitle(post, capitalized=true, spacer=" ??? ", withDate=false, formattedDate=false, onlyDate=false) {
  
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