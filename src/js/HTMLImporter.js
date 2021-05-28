function HTMLImporter() {}

HTMLImporter.import = function(url, element, callback=function(){}) {

  var error, http_request, load, script;

  script = callback;

  load = function(event) {

    var attribute, index, index1, new_script, old_script, scripts, wrapper;
    
    
    if (document.getElementById(element)) {
      wrapper = document.getElementById(element);
    }
    else {

      wrapper = document.createElement("div");
    }
    wrapper.innerHTML = this.responseText;

    scripts = wrapper.getElementsByTagName("SCRIPT");

    for (index = scripts.length - 1; index > -1; -- index) {

      old_script = scripts[index];

      new_script = document.createElement("script");
      new_script.innerHTML = old_script.innerHTML;

      for (index1 = old_script.attributes.length - 1; index1 > -1; -- index1) {

        attribute = old_script.attributes[index1];
        new_script.setAttribute(attribute.name, attribute.value);

      }

      old_script.parentNode.replaceChild(new_script, old_script);

    }

    // while(wrapper.firstChild) {

    //   script.parentNode.insertBefore(wrapper.removeChild(wrapper.firstChild), script);

    // }

    // script.parentNode.removeChild(script);

    this.removeEventListener("error", error);
    this.removeEventListener("load", load);

    callback();
  };

  error = function(event) {

    this.removeEventListener("error", error);
    this.removeEventListener("load", load);

    alert("there was an error!");

  };

  http_request = new XMLHttpRequest();
  http_request.addEventListener("error", error);
  http_request.addEventListener("load", load);
  http_request.open("GET", url);
  http_request.send();
};

export {HTMLImporter};