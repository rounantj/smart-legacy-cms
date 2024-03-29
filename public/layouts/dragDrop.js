function eventPrepare(elementArea, elementTarget, uploadAndUpdateFile) {
  const image_drop_area = document.querySelector(elementArea);
  var uploaded_image;

  // Event listener for dragging the image over the div
  image_drop_area.addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
    // Style the drag-and-drop as a "copy file" operation.
    event.dataTransfer.dropEffect = "copy";
  });

  // Event listener for dropping the image inside the div
  image_drop_area.addEventListener("drop", (event) => {
    event.stopPropagation();
    event.preventDefault();
    fileList = event.dataTransfer.files;
    console.log(fileList);
    $(elementTarget)[0].files = fileList;

    uploadAndUpdateFile($(elementTarget));
    //document.querySelector("#file_name").textContent = fileList[0].name;

    //  readImage(fileList[0]);
  });

  // Converts the image into a data URI
  readImage = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      uploaded_image = event.target.result;

      document.querySelector(
        "#image_drop_area"
      ).style.backgroundImage = `url(${uploaded_image})`;
    });
    reader.readAsDataURL(file);
  };
}
