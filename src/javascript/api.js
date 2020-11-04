import $ from 'jquery';

let baseUrl = "https://backoffice.3dotsmedia.ro/";

export function getCategories() {
    fetch(baseUrl + 'api/category.php', {
        method: "POST"
    })
        .then(response => response.json())
        .then(data => {
            buildCategorySection(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function buildCategorySection(categories) {
    let contor = 0;
    let half = Math.floor(categories.length / 2);
    let tab = $("#pills-tab");
    let tabContent = $("#pills-tabContent");
    categories.forEach(category => {
        let isActive = contor === half;
        contor++;
        tab.append(
            '<li class="nav-item">' +
            '<a class="nav-link' + (isActive ? ' active' : '') + '" id="pills-' + category.id + '-tab" data-toggle="pill" href="#pills-' + category.id + '" role="tab" aria-controls="pills-' + category.id + '" aria-selected="false">' + category.name + '</a>' +
            '</li>'
        );
        tabContent.append(
            '<div class="tab-pane fade' + (isActive ? ' show active' : '') + '" id="pills-' + category.id + '" role="tabpanel" aria-labelledby="pills-' + category.id + '-tab">' +
            '<div class="row">' +
            '</div>' +
            '</div>'
        );
    });
}

export function getProjects() {
    fetch(baseUrl + 'api/project.php', {
        method: "POST"
    })
        .then(response => response.json())
        .then(data => {
            buildProjectSection(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function buildProjectSection(projects) {
    let parent = $("#pills-tabContent");
    let col = parent.data("row");
    let effect = parent.data("effect") ? ' img-effect' : '';
    let hasLimit = parent.data("max-items") ? true : false;
    let maxItems = parent.data("max-items");

    var categoryDictionary = {};
    for (var i = 0; i < projects.length; i++) {
        var id_category = projects[i].id_category;
        categoryDictionary[id_category] = categoryDictionary[id_category] ? categoryDictionary[id_category] : 0;
    }

    projects.forEach(project => {
        if (hasLimit && categoryDictionary[project.id_category] >= maxItems) {
            return;
        }
        categoryDictionary[project.id_category] = categoryDictionary[project.id_category] + 1;
        let container = $('#pills-' + project.id_category + '>.row');
        container.append(
            '<div class="col-md-' + col + ' col-12 p-1">' +
            '<img class="img-fluid' + effect + '" src="data:image;base64,' + project.image + '" alt="' + project.projectName + '">' +
            '</div>');
    });
}