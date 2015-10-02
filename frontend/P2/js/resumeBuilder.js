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
    "welcomeMessage" : "Welcome and have a look at my resume.",
    "skills" : [ "java of all sorts", 'solving simple problems',
            'solving complex problems', 'web front end development'],
    "biopic" : "http://anydoby.com/udacity/frontend/P0/images/my_picture.jpg",
    "location" : 'Drachten, The Netherlands',
    "display" : function() {
        var contacts = this.contacts;
        var panel = $('#header');
        
        function addContacts(panel){
            panel.append(formatContact("mobile"));
            panel.append(formatContact("email"));
            panel.append(formatContact("github"));
            panel.append(formatContact("location"));
        }
        function formatContact(type) {
            return HTMLcontactGeneric.replace("%contact%", type).replace("%data%", contacts[type]);
        }
        
        panel.prepend(HTMLwelcomeMsg.replace('%data%', this.welcomeMessage));
        panel.prepend(HTMLbioPic.replace('%data%', this.biopic));
        panel.prepend(HTMLheaderRole.replace('%data%', this.role));
        panel.prepend(HTMLheaderName.replace('%data%', this.name));
        addContacts($("#topContacts"));
        panel.append(HTMLskillsStart);
        
        addContacts($("#footerContacts"));        
        
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
        "location" : "Kiev, Ukraine",
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
    "display" : function() {
        var panel = $('#education');
        if (this.schools) {
            this.schools.forEach(function(school) {
                panel.append(HTMLschoolStart);
                var entry = $('.education-entry:last');
                entry.append(HTMLschoolName.replace("%data%", school.name).replace("%url%", school.url));
                entry.append(HTMLschoolDegree.replace("%data%", school.degree));
                entry.append(HTMLschoolDates.replace("%data%", school.dates));
                entry.append(HTMLschoolLocation.replace("%data%", school.location));
                school.majors.forEach(function(m) {                    
                    entry.append(HTMLschoolMajor.replace("%data%", m));
                });
            });
        }      
        if (this.onlineCourses) {
            panel.append(HTMLonlineClasses);
            this.onlineCourses.forEach(function(course) {
                panel.append(HTMLschoolStart);
                var entry = $('.education-entry:last');
                entry.append(HTMLonlineTitle.replace("%data%", course.title));
                entry.append(HTMLonlineSchool.replace("%data%", course.school));
                entry.append(HTMLonlineDates.replace("%data%", course.date));
                entry.append(HTMLonlineURL.replace("%data%", course.url));                
            });
        }
    }
};

var work = {
    "jobs" : [ {
        "employer" : "Mirasoft",
        "dates" : '2004-07-01 - 2005-10-01',
        "title" : "Java Developer",
        "location" : "Kiev, Ukraine",
        "description" : "My first job. Started as a tester finished as a junior java developer. A lot of UI testing at the beginning. Took part in a web service aggregation project."
    }, {
        "employer" : "Ciklum",
        "dates" : '2005-10-01 - 2006-12-01',
        "title" : "Senior Java Developer",
        "location" : "Kiev, Ukraine",
        "description" : "Building a mobile media platform."
    }, {
        "employer" : "Luxoft",
        "dates" : '2007-02-01 - 2007-12-01',
        "title" : "Senior Java Developer",
        "location" : "Kiev, Ukraine",
        "description" : "Building some trade processing/monitoring web application"
    }, {
        "employer" : "Mirasoft",
        "dates" : '2007-12-01 - 2009-04-01',
        "title" : "Java Architect",
        "location" : "Kiev, Ukraine",
        "description" : "Took part in redesign and implementation of a healthcare patient tracking application for a big-big company."
    }, {
        "employer" : "Asset Control",
        "dates" : '2009-04-01 -  now',
        "title" : "Tech Lead",
        "location" : "Heerenveen, The Netherlands",
        "description" : "Building in-house asset management system. Designing and implementing the distribution/monitoring layer."
    }, ],
    "display" : function() {
        var panel = $('#workExperience');
        function displayWork(job) {
            panel.append(HTMLworkStart);
            var entry = $('.work-entry:last');
            entry.append(HTMLworkEmployer.replace('%data%', job.employer));
            entry.append(HTMLworkTitle.replace('%data%', job.title));
            entry.append(HTMLworkDates.replace('%data%', job.dates));
            entry.append(HTMLworkLocation.replace('%data%', job.location));
            entry.append(HTMLworkDescription.replace('%data%', job.description));
        }
        if (this.jobs) {
            this.jobs.reverse();
            this.jobs.forEach(displayWork);
        }
    }
};

var projects = {
    "projects" : [ 
    {
        "title" : "Static personal page",
        "dates" : "2015",
        "description" : "A simple static page with personal information.",
        "images" : [ 'http://anydoby.com/udacity/frontend/P0/images/my_picture.jpg' ]
    },
    {
        "title" : "Bootstrap demo",
        "dates" : "2015",
        "description" : "A more advanced web page featuring usage of the Bootstrap framework to layout elements.",
        "images" : [ 'http://anydoby.com/udacity/frontend/P1/img/appify.png',
                     'http://anydoby.com/udacity/frontend/P1/img/sunflower.png',
                     'http://anydoby.com/udacity/frontend/P1/img/bokeh.png' ]
    },
    ],
    "display" : function() {
        if (this.projects) {
            var panel = $('#projects');
            this.projects.forEach(function(project) {
                panel.append(HTMLprojectStart);
                $('.project-entry:last').append(HTMLprojectTitle.replace('%data%', project.title));
                $('.project-entry:last').append(HTMLprojectDates.replace('%data%', project.dates));
                $('.project-entry:last').append(HTMLprojectDescription.replace('%data%',project.description));
                project.images.forEach(function(img) {
                    $('.project-entry:last').append(HTMLprojectImage.replace('%data%', img));
                });
            });
        }
    } 
};

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

    bio.display();
    work.display();
    projects.display();
    education.display();

    $('#mapDiv').append(googleMap);
}

$(buildResume);