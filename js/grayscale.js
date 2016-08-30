$(window).scroll(collapseNavbar);
$(window).resize(continuallyAdjust);
$(document).ready(collapseNavbar);
$(document).ready(adjustForMobile);

function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$('.navbar-collapse ul li a').click(function () {
    $(this).closest('.collapse').collapse('toggle');
});

function continuallyAdjust() {
    var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
    if (screenWidth > screenHeight && document.isPortrait) {
        document.isPortrait = false;
    } else if (screenWidth < screenHeight && !document.isPortrait) {
        document.isPortrait = true;
    } else {
        return null;
    }

    if (document.templateHTML && document.projectsObjects) {
        var projectsObjects = document.projectsObjects;
        var tableSelector = $("#projects-html");
        var newElement;
        var appended = "";
        if (screenHeight > screenWidth) {
            tableSelector.css('margin-left', '0px');
            appended += "<tr><th>";
            for (var j = 0; j < projectsObjects.length; j++) {
                newElement = document.templateHTML;
                newElement = newElement.replace('PROJECT-TEMPLATE-HEADING', projectsObjects[j].heading);
                newElement = newElement.replace('PROJECT-TEMPLATE-TEXT', projectsObjects[j].text);
                newElement = newElement.replace('PROJECT-TEMPLATE-URL', projectsObjects[j].url);
                newElement = newElement.replace('PROJECT-TEMPLATE-IMG', projectsObjects[j].image);
                appended += newElement + "<br/>";
            }
            appended += "</th></tr>";
        } else {
            tableSelector.css('margin-left', '-150px');
            appended += "<tr>";
            var p, q, temp_array, chunk = parseInt(projectsObjects.length / 3);
            for (p = 0, q = projectsObjects.length; p < q; p += chunk) {
                temp_array = projectsObjects.slice(p, p + chunk);

                appended += "<th>";
                for (var k = 0; k < temp_array.length; k++) {
                    newElement = document.templateHTML;
                    newElement = newElement.replace('PROJECT-TEMPLATE-HEADING', temp_array[k].heading);
                    newElement = newElement.replace('PROJECT-TEMPLATE-TEXT', temp_array[k].text);
                    newElement = newElement.replace('PROJECT-TEMPLATE-URL', temp_array[k].url);
                    newElement = newElement.replace('PROJECT-TEMPLATE-IMG', temp_array[k].image);
                    appended += newElement + "<br/>";
                }
                appended += "</th>";
            }
            appended += "</tr>";
        }
        tableSelector.html(appended);
    }
}

function adjustForMobile() {
    var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
    document.isPortrait = screenWidth <= screenHeight;

    $.ajax({
        url: 'js/project-template.html',
        success: function (templateHTML) {
            document.templateHTML = templateHTML;
            $.ajax({
                url: 'js/projects.txt',
                success: function (projectsString) {
                    var projectsArray = projectsString.split('\n');
                    var projectsObjects = [];

                    var appended = "";

                    var tableSelector = $("#projects-html");

                    for (var i = 0; i < projectsArray.length - 1; i += 4) {
                        projectsObjects.push({
                            heading: projectsArray[i], text: projectsArray[i + 1],
                            image: projectsArray[i + 2], url: projectsArray[i + 3]
                        });
                    }

                    document.projectsObjects = projectsObjects;

                    var newElement;

                    if (screenHeight > screenWidth) {
                        tableSelector.css('margin-left', '0px');

                        appended += "<tr><th>";
                        for (var j = 0; j < projectsObjects.length; j++) {
                            newElement = templateHTML;
                            newElement = newElement.replace('PROJECT-TEMPLATE-HEADING', projectsObjects[j].heading);
                            newElement = newElement.replace('PROJECT-TEMPLATE-TEXT', projectsObjects[j].text);
                            newElement = newElement.replace('PROJECT-TEMPLATE-URL', projectsObjects[j].url);
                            newElement = newElement.replace('PROJECT-TEMPLATE-IMG', projectsObjects[j].image);
                            appended += newElement + "<br/>";
                        }
                        appended += "</th></tr>";
                    } else {
                        tableSelector.css('margin-left', '-150px');

                        appended += "<tr>";

                        var p, q, temp_array, chunk = parseInt(projectsObjects.length / 3);
                        for (p = 0, q = projectsObjects.length; p < q; p += chunk) {
                            temp_array = projectsObjects.slice(p, p + chunk);

                            appended += "<th>";
                            for (var k = 0; k < temp_array.length; k++) {
                                newElement = templateHTML;
                                newElement = newElement.replace('PROJECT-TEMPLATE-HEADING', temp_array[k].heading);
                                newElement = newElement.replace('PROJECT-TEMPLATE-TEXT', temp_array[k].text);
                                newElement = newElement.replace('PROJECT-TEMPLATE-URL', temp_array[k].url);
                                newElement = newElement.replace('PROJECT-TEMPLATE-IMG', temp_array[k].image);
                                appended += newElement + "<br/>";
                            }
                            appended += "</th>";
                        }

                        appended += "</tr>";
                    }

                    tableSelector.html(appended);
                }
            });
        }
    });


}