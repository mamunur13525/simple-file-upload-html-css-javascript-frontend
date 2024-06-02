const fileInput = document.querySelector(".file_input");
const fileInputBox = document.querySelector(".file_input_box");
const fileInputBrowse = document.querySelector(".browse");
const fileInputText = document.querySelector(".file_input_text");
const fileList = document.querySelector(".file_list");
const fileHeaderCount = document.querySelector(".file_header_count");

fileInput.addEventListener("change", (e) => {
  handleFileChange(e.target.files);
});

fileInputBrowse.addEventListener("click", () => {
  fileInput.click();
});

fileInputBox.addEventListener("drop", (e) => {
  e.preventDefault();
  handleFileChange(e.dataTransfer.files);
  fileInputText.innerText = "Drag files here or";
  fileInputBox.classList.remove("active");
});

fileInputBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  fileInputBox.classList.add("active");
  fileInputText.innerText = "Release to upload or";
});

fileInputBox.addEventListener("dragleave", () => {
  fileInputText.innerText = "Drag files here or";
  fileInputBox.classList.remove("active");
});

const handleFileChange = ([...files]) => {
  if (files.length === 0) return;

  fileHeaderCount.innerText = `${files.length} files`;
  files.forEach((file, index) => {
    const unicId = Date.now() * index;

    const li = createLiTag(file, unicId);
    fileList.appendChild(li);
    const closeBtn = document.querySelector(`#file_close_btn_${unicId}`);
    const currentLi = document.querySelector(`#file_list_li_${unicId}`);
    closeBtn.addEventListener("click", () => {
      closeBtn.remove();
      currentLi.remove();
      const totalList = document.getElementsByClassName("file_list_li")?.length;
      console.log({ totalList });
      fileHeaderCount.innerText = totalList ? `${totalList} files` : "";
    });
  });
};

const createLiTag = (file, unicId) => {
  let { name, type, size } = file;
  type = type.split(".")[1];
  size = formatFileSize(size);
  const li = document.createElement("li");
  li.classList.add(`file_list_li`);
  li.setAttribute("id", `file_list_li_${unicId}`);
  li.innerHTML = `
    <span class="file_list_type">${type}</span>
    <div class="file_name_close_div">
      <div class="file_name_size">
        <p class="file_name">${name}</p>
        <p class="file_size">
          <span class='uploading_size'>244 KB </span> / <span >${size}</span>
          <span class="file_upload_status">Uploading...</span>
        </p>
      </div>
      <span class='file_close_btn' id='file_close_btn_${unicId}'>x</span>
      <span class="file_upload_loading_bar">
        <span class="file_upload_loading_bar_complete"></span>
      </span>
    </div>
  `;
  return li;
};

const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  const unit = sizes[i];

  return `${value} ${unit}`;
};
