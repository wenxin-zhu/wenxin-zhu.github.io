/* Academic homepage rendering */

document.addEventListener('DOMContentLoaded', function() {
    renderAcademicProfile();
});

/**
 * Render the editable data from content.js.
 */
function renderAcademicProfile() {
    var profile = window.academicProfile;
    if (!profile) {
        console.error('Academic profile data was not found.');
        return;
    }

    if (profile.pageTitle) {
        document.title = profile.pageTitle;
    }

    var nameEl = document.getElementById('profile-name');
    var hasName = Boolean(profile.name);
    document.getElementById('profile-header').hidden = !hasName;
    if (hasName) {
        nameEl.textContent = profile.name;
    }

    var aboutEl = document.getElementById('about-text');
    var hasAbout = Boolean(profile.about);
    setAcademicSectionVisibility(aboutEl, hasAbout);
    if (hasAbout) {
        aboutEl.textContent = profile.about;
    }

    var interestsEl = document.getElementById('research-interests');
    var interests = Array.isArray(profile.researchInterests) ? profile.researchInterests : [];
    setAcademicSectionVisibility(interestsEl, interests.length > 0);
    interests.forEach(function(interest) {
        var tag = document.createElement('span');
        tag.textContent = interest;
        interestsEl.appendChild(tag);
    });

    var newsEl = document.getElementById('news-list');
    var news = Array.isArray(profile.news) ? profile.news : [];
    setAcademicSectionVisibility(newsEl, news.length > 0);
    news.forEach(function(item) {
        var row = document.createElement('li');
        var date = document.createElement('time');
        var text = document.createElement('span');
        date.dateTime = item.datetime;
        date.textContent = item.date;
        text.textContent = item.text;
        row.append(date, text);
        newsEl.appendChild(row);
    });

    var publicationsEl = document.getElementById('publication-list');
    var publications = Array.isArray(profile.publications) ? profile.publications : [];
    setAcademicSectionVisibility(publicationsEl, publications.length > 0);
    publications.forEach(function(publication) {
        var item = document.createElement('li');
        var title = document.createElement('p');
        var citation = document.createElement('p');
        var venue = document.createElement('em');
        var links = document.createElement('div');

        title.className = 'publication-title';
        title.textContent = publication.title;
        citation.append(document.createTextNode(publication.authors + '. '));
        venue.textContent = publication.venue;
        citation.append(venue, document.createTextNode(', ' + publication.year + '.'));
        links.className = 'publication-links';
        links.append(
            createPublicationLink('Paper', publication.paperUrl),
            createPublicationLink('Code', publication.codeUrl)
        );
        item.append(title, citation, links);
        publicationsEl.appendChild(item);
    });

    var educationEl = document.getElementById('education-list');
    var educationItems = Array.isArray(profile.education) ? profile.education : [];
    setAcademicSectionVisibility(educationEl, educationItems.length > 0);
    educationItems.forEach(function(education) {
        var item = document.createElement('li');
        var description = document.createElement('span');
        var school = document.createElement('strong');
        var period = document.createElement('time');
        school.textContent = education.school;
        description.append(school, document.createTextNode(' · ' + education.degree));
        period.textContent = education.period;
        item.append(description, period);
        educationEl.appendChild(item);
    });

    var contactsEl = document.getElementById('contact-list');
    var contacts = Array.isArray(profile.contacts) ? profile.contacts : [];
    document.getElementById('contact-section').hidden = contacts.length === 0;
    contacts.forEach(function(contact) {
        var link = document.createElement('a');
        var icon = document.createElement('i');
        var label = document.createElement('span');
        link.href = contact.url;
        link.className = 'about-link';
        link.title = contact.label;
        if (contact.url.indexOf('http') === 0) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
        icon.className = 'bi ' + contact.icon;
        icon.setAttribute('aria-hidden', 'true');
        label.textContent = contact.label;
        link.append(icon, label);
        contactsEl.appendChild(link);
    });

    var hasLastUpdated = Boolean(profile.lastUpdated);
    document.getElementById('updated-section').hidden = !hasLastUpdated;
    document.getElementById('updated-divider').hidden = !hasLastUpdated;
    if (hasLastUpdated) {
        document.getElementById('last-updated').textContent = profile.lastUpdated;
    }
}

function setAcademicSectionVisibility(contentElement, isVisible) {
    contentElement.closest('.academic-section').hidden = !isVisible;
}

function createPublicationLink(label, url) {
    var element = document.createElement(url ? 'a' : 'span');
    element.textContent = label;
    if (url) {
        element.href = url;
        element.target = '_blank';
        element.rel = 'noopener noreferrer';
        element.className = 'publication-link';
    } else {
        element.className = 'disabled-link';
    }
    return element;
}

