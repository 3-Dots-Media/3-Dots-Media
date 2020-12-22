import $ from "jquery";
import { getTranslation } from "./translation";

let baseUrl = "https://backoffice.3dotsmedia.ro/";

export function getCategories() {
  fetch(baseUrl + "api/category.php", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      buildCategorySection(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function buildCategorySection(categories) {
  let contor = 0;
  let half = Math.floor(categories.length / 2);
  let tab = $("#pills-tab");
  let tabContent = $("#pills-tabContent");
  categories.forEach((category) => {
    let isActive = contor === half;
    contor++;
    tab.append(
      '<li class="nav-item d-inline-block">' +
        '<a class="nav-link' +
        (isActive ? " active" : "") +
        '" id="pills-' +
        category.id +
        '-tab" data-toggle="pill" href="#pills-' +
        category.id +
        '" role="tab" aria-controls="pills-' +
        category.id +
        '" aria-selected="false">' +
        category.name +
        "</a>" +
        "</li>"
    );
    tabContent.append(
      '<div class="tab-pane fade' +
        (isActive ? " show active" : "") +
        '" id="pills-' +
        category.id +
        '" role="tabpanel" aria-labelledby="pills-' +
        category.id +
        '-tab">' +
        '<div class="row">' +
        "</div>" +
        "</div>"
    );
  });
}

export function getProjects() {
  fetch(baseUrl + "api/project.php", {
    method: "POST",
  })
    .then((response) => response.json())
    .then((data) => {
      buildProjectSection(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function buildProjectSection(projects) {
  let parent = $("#pills-tabContent");
  let col = parent.data("row");
  let effect = parent.data("effect") ? " img-effect" : " img-border-radius";
  let hasLimit = parent.data("max-items") ? true : false;
  let maxItems = parent.data("max-items");

  var categoryDictionary = {};
  for (var i = 0; i < projects.length; i++) {
    var idCategory = projects[i].idCategory;
    categoryDictionary[idCategory] = categoryDictionary[idCategory]
      ? categoryDictionary[idCategory]
      : 0;
  }

  projects.forEach((project) => {
    if (hasLimit && categoryDictionary[project.idCategory] >= maxItems) {
      return;
    }
    categoryDictionary[project.idCategory] =
      categoryDictionary[project.idCategory] + 1;
    let container = $("#pills-" + project.idCategory + ">.row");
    container.append(
      '<div class="col-md-' +
        col +
        ' col-12 p-2 project" data-id=' +
        project.id +
        ">" +
        '<img class="img-fluid img-shadow ' +
        effect +
        '" src="data:image;base64,' +
        project.image +
        '" alt="' +
        project.projectName +
        '">' +
        "</div>"
    );
  });

  $(document).on("click", ".project", function (event) {
    let project = projects.find(
      (project) => project.id == event.currentTarget.dataset.id
    );
    openProject(project);
  });
}

function openProject(project) {
  let currentLanguage = !document
    .querySelector(".switch-container")
    .classList.value.includes(" on")
    ? 1
    : 2;

  let translation = project.translation.find(
    (translation) => translation.idLanguage == currentLanguage
  );

  let container = $("#project-container");

  container.empty();

  $("#modal-fullscreen").modal("show");

  let url =
    project.url != ""
      ? '<h5 class="project-url"><a class="link" target="_blank" href="' +
        project.url +
        '">' +
        getTranslation("[btnPage]") +
        "</span></a></h5>"
      : "";

  if (!translation) {
    container.append(
      '<div class="row">' +
        '<div class="col-md-6 col-12">' +
        '<img class="img-fluid" src="data:image;base64,' +
        project.image +
        '" alt="' +
        project.projectName +
        '">' +
        "</div>" +
        '<div class="col-md-6 col-12 project-details text-md-right text-center">' +
        '<h1 class="project-title">' +
        project.projectName +
        "</h1>" +
        '<h5 class="project-description">' +
        getTranslation("[lblNoTranslation]") +
        "</h5>" +
        url +
        "</div>" +
        "</div>"
    );
  } else {
    container.append(
      '<div class="row">' +
        '<div class="col-md-6 col-12">' +
        '<img class="img-fluid" src="data:image;base64,' +
        project.image +
        '" alt="' +
        project.projectName +
        '">' +
        "</div>" +
        '<div class="col-md-6 col-12 project-details text-md-right text-center">' +
        '<h1 class="project-title">' +
        project.projectName +
        "</h1>" +
        '<h3 class="project-activity">' +
        translation.activity +
        "</h3>" +
        '<h5 class="project-description">' +
        translation.description +
        "</h5>" +
        url +
        "</div>" +
        "</div>"
    );
  }
}
