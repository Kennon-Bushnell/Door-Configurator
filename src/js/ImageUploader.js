import Cropper from "cropperjs";

const fileInput = document.getElementById('customPhoto');
const gallery = document.getElementById('gallery')

let dropArea = document.getElementById('drop-area');
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});
  
function preventDefaults (e) {
    e.preventDefault()
    e.stopPropagation()
};
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
});
  
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
});
  
function highlight(e) {
    dropArea.classList.add('highlight')
};
  
function unhighlight(e) {
    dropArea.classList.remove('highlight')
};
dropArea.addEventListener('drop', handleDrop, false);
fileInput.addEventListener('change', handleFileSelect);

function handleDrop(e) {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    previewFile(files);
  }
  
 function handleFileSelect(e) {
    const files = e.target.files;
    previewFile(files);
}

var aspectRatio

function previewFile(files) {
    for (const file of files) {
        var extension = file.name.split('.').pop()
        if (extension == "jpg" || extension == "png" ) {
            const reader = new FileReader();
            reader.onload = function () {
                const dataURL = reader.result;
                const img = new Image();
                img.src = dataURL;
                gallery.innerHTML = ''
                gallery.appendChild(img)
                for (const child of gallery.children) {
                    child.id = "userImage"
                }
                var userImage = document.getElementById('userImage')
                aspectRatio = img.clientWidth/img.clientHeight
                if (aspectRatio >= 215/300){
                    userImage.style.height = '300px'
                    userImage.style.width = '100%'
                    gallery.style.width = (aspectRatio*300).toString().concat('px')
                } else {
                    //userImage.style.height = (aspectRatio*300).toString().concat('px')
                    userImage.style.width = '100%'
                    gallery.style.width = '215px'
                }
                userImage.style.display = 'block'
                
                cropperFun(document.getElementById('userImage'))
            };
            reader.readAsDataURL(file);
        } else{
            gallery.innerHTML = ''
            gallery.appendChild(document.createTextNode("File not of supported type"))  
        }
    }
};

function cropperFun(image){
    const cropper = new Cropper(image, {
        aspectRatio:  215/300,
        dragMode: 'none',
        minCropBoxWidth: 215,
        minCropBoxHeight: 300,
        zoomable: false,
        responsive: false,
        guides: false,
        center: false,
        highlight: false,
        cropBoxResizable: false,
        background: false,
        movable: false,
        ready(){
            document.getElementById("ShowDoor").click()
        },
        crop(event){
            global.croppedImageURL = cropper.getCroppedCanvas().toDataURL("image/jpg");
        },
    });
};