(function() {
//отправка формы
  if (!("FormData" in window)) {
  return;
  }
  var queue = [];
  var form = document.querySelector(".writing_comment");
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    var data = new FormData(form);

    queue.forEach(function(element) {
      data.append("images", element.file);
    });

    request(data, function(response) {
      console.log(response);
    });
  });
  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "/send?" + (new Date()).getTime());
    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });
    xhr.send(data);
  }
//добовление фотографий
  if ("FileReader" in window) {

    var area = form.querySelector(".upload_images__list");
    var template = document.querySelector("#image_template").innerHTML;
    form.querySelector("#upload_photo").addEventListener("change", function() {
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      }
      this.value = "";
    });
    function preview(file) {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();
        reader.addEventListener("load", function(event) {
          var html = Mustache.render(template, {
            "image": event.target.result,
            "name": file.name
          });

          var li = document.createElement("li");
          li.classList.add("upload_images__item");
          li.innerHTML = html;
          area.appendChild(li);

          li.querySelector(".upload_images__del_link").addEventListener("click",
          function(event) {
            event.preventDefault();
            removePreview(li);
          });
          queue.push({
            "file": file,
            "li": li
          });
        });
        reader.readAsDataURL(file);
      }
    }
    function removePreview(li) {
      queue = queue.filter(function(element) {
        return element.li != li;
      });
      li.parentNode.removeChild(li);
    }
  }
})();
