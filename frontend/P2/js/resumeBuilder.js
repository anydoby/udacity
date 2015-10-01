var lorem = 'Mauris fermentum non mauris in blandit. Nullam congue eleifend nisl quis feugiat. Donec maximus condimentum lorem a consectetur. Suspendisse in arcu ac nulla ullamcorper auctor. Etiam tincidunt diam nisi, eu pulvinar justo rutrum non. Cras consectetur mi ut dapibus cursus. Nulla efficitur orci est. Sed mollis augue a mauris congue viverra sit amet nec magna! Mauris at imperdiet est, nec efficitur sapien. Vivamus consequat augue non metus rutrum, quis tristique purus suscipit. Nulla facilisi. Etiam vestibulum non metus eget porta? Curabitur quis odio nisi.Pellentesque in metus cursus mi aliquam lobortis vel eu lorem. Nulla fermentum sodales scelerisque. In id ante eu tellus fermentum molestie. Maecenas mattis sagittis metus, sit amet suscipit libero. Quisque lectus magna, dapibus eu iaculis vel, vulputate sit amet lacus.';
var bio = {
    "name" : "Sergey Zolotaryov",
    "role" : "Java Tech Lead",
    "contacts" : {
        "mobile" : "+31616321751",
        "email" : "anydoby@gmail.com",
        "github" : "anydoby",
        "location" : "Drachten"
    },
    "welcomeMessage" : "Welcome and have a look at my resume",
    "skills" : [ "java of all sorts", 'solving simple problems',
            'solving complex problems', 'not solving unsolvable problems',
            "saving the universe" ],
    "biopic" : "images/me.jpg",
    "location" : 'Drachten, NL',
    "display" : function(panel) {
        panel.append(HTMLheaderName.replace('%data%', this.name));
        panel.append(HTMLheaderRole.replace('%data%', this.role));
        panel.append(HTMLskillsStart);
        if (this.skills) {
            this.skills.forEach(function(skill) {
                $('#skills').append(HTMLskills.replace('%data%', skill));
            });
        }
    }
};

var education = {
    "schools" : [ {
        "name" : "University of Kyiv-Mohyla Academy",
        "location" : "Kiev",
        "degree" : "Bachelor",
        "majors" : [ 'Physics' ],
        "dates" : 2005,
        "url" : 'http://www.ukma.edu.ua/'
    } ],
    "onlineCourses" : [
            {
                "title" : "Web Front End Developer",
                "school" : 'Udacity',
                "date" : 2015,
                "url" : 'https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001'
            }, {
                "title" : "Sun Certified Business Components Developer",
                "school" : "Sun Microsystems",
                "date" : 2008,
                "url" : 'http://java.sun.com'
            }, {
                "title" : "Sun Certified Web Component Developer",
                "school" : "Sun Microsystems",
                "date" : 2007,
                "url" : 'http://java.sun.com'
            }, {
                "title" : "Sun Certified Java Developer",
                "school" : "Sun Microsystems",
                "date" : 2006,
                "url" : 'http://java.sun.com'
            }, {
                "title" : "Sun Certified Java Programmer",
                "school" : "Sun Microsystems",
                "date" : 2005,
                "url" : 'http://java.sun.com'
            }, ],
    "display" : function(panel) {

    }
};

var work = {
    "jobs" : [ {
        "employer" : "Mirasoft",
        "dates" : '2004-07-01 - 2005-10-01',
        "title" : "Java Developer",
        "location" : "Kiev",
        "description" : lorem
    }, {
        "employer" : "Ciklum",
        "dates" : '2005-10-01 - 2006-12-01',
        "title" : "Senior Java Developer",
        "location" : "Kiev",
        "description" : lorem
    }, {
        "employer" : "Luxoft",
        "dates" : '2007-02-01 - 2007-12-01',
        "title" : "Senior Java Developer",
        "location" : "Kiev",
        "description" : lorem
    }, {
        "employer" : "Mirasoft",
        "dates" : '2007-12-01 - 2009-04-01',
        "title" : "Java Architect",
        "location" : "Kiev",
        "description" : lorem
    }, {
        "employer" : "Asset Control",
        "dates" : '2009-04-01 -  now',
        "title" : "Tech Lead",
        "location" : "Heerenveen",
        "description" : lorem
    }, ],
    "display" : function(panel) {
        function displayWork(job) {
            panel.append(HTMLworkStart);
            $('.work-entry:last').append(
                    HTMLworkEmployer.replace('%data%', job.employer));
            $('.work-entry:last').append(
                    HTMLworkTitle.replace('%data%', job.title));
            $('.work-entry:last').append(
                    HTMLworkDates.replace('%data%', job.dates));
            $('.work-entry:last').append(
                    HTMLworkLocation.replace('%data%', job.location));
            $('.work-entry:last').append(
                    HTMLworkDescription.replace('%data%', job.description));
        }
        if (this.jobs) {
            this.jobs.forEach(displayWork);
        }
    }
};

var projects = {
    "projects" : [ {
        "title" : 'Sample Project 1',
        "dates" : 2014,
        "description" : lorem,
        "images" : [ 'https://s3.amazonaws.com/content.udacity-data.com/site-svgs/upsell_icon.svg' ]
    } ]
};

projects.display = function() {
    if (this.projects) {
        this.projects.forEach(function(project) {
            $('#projects').append(HTMLprojectStart);
            $('.project-entry:last').append(
                    HTMLprojectTitle.replace('%data%', project.title));
            $('.project-entry:last').append(
                    HTMLprojectDates.replace('%data%', project.dates));
            $('.project-entry:last').append(
                    HTMLprojectDescription.replace('%data%',
                            project.description));
            project.images.forEach(function(img) {
                $('.project-entry:last').append(
                        HTMLprojectImage.replace('%data%', img));
            });
        });
    }
};

function inName() {
    var n = bio.name.split(" ");
    return n[0].slice(0, 1).toUpperCase() + n[0].slice(1) + " "
            + n[1].toUpperCase();
}

function buildResume() {
    if (document.getElementsByClassName('flex-item').length === 0) {
        document.getElementById('topContacts').style['background-color'].display = 'none';
    }
    if (document.getElementsByTagName('h1').length === 0) {
        document.getElementById('header').style['background-color'].display = 'none';
    }
    if (document.getElementsByClassName('work-entry').length === 0) {
        document.getElementById('workExperience').style['background-color'].display = 'none';
    }
    if (document.getElementsByClassName('project-entry').length === 0) {
        document.getElementById('projects').style['background-color'].display = 'none';
    }
    if (document.getElementsByClassName('education-entry').length === 0) {
        document.getElementById('education').style['background-color'].display = 'none';
    }
    if (document.getElementsByClassName('flex-item').length === 0) {
        document.getElementById('lets-connect').style['background-color'].display = 'none';
    }
    if (document.getElementById('map') === null) {
        document.getElementById('mapDiv').style['background-color'].display = 'none';
    }

    bio.display($('#header'));
    work.display($('#workExperience'));
    projects.display();
    education.display($('#education'));

    $('#mapDiv').append(googleMap);
}

$(buildResume);