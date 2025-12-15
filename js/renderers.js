/**
 * Renderers Module
 * 
 * Contains rendering functions for each section of the profile page.
 * Each function maps to a specific Figma component.
 */

const Renderers = (function() {
    'use strict';
    
    // DOM element cache
    const elements = {
        profilePhoto: document.getElementById('profile-photo'),
        facultyName: document.getElementById('faculty-name'),
        facultyTitle: document.getElementById('faculty-title'),
        facultyAffiliation: document.getElementById('faculty-affiliation'),
        facultyTagline: document.getElementById('faculty-tagline'),
        contactInfo: document.getElementById('contact-info'),
        socialLinks: document.getElementById('social-links'),
        aboutContent: document.getElementById('about-content'),
        teachingList: document.getElementById('teaching-list'),
        researchSummary: document.getElementById('research-summary'),
        publicationsList: document.getElementById('publications-list'),
        studentsList: document.getElementById('students-list'),
        projectsList: document.getElementById('projects-list'),
        serviceList: document.getElementById('service-list'),
        awardsList: document.getElementById('awards-list'),
        footerDepartment: document.getElementById('footer-department'),
        footerLocation: document.getElementById('footer-location'),
        footerUpdated: document.getElementById('footer-updated')
    };
    
    /**
     * Utility: Create DOM element
     */
    function createElement(tag, className, content) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.innerHTML = content;
        return element;
    }
    
    /**
     * Render: Profile Header
     * Figma: Component/Profile/Header
     */
    function renderHeader(data) {
        // Profile photo
        if (data.image) {
            const img = document.createElement('img');
            img.src = data.image;
            img.alt = data.name;
            img.onerror = function() {
                console.warn('Failed to load profile image, showing default avatar');
            };
            
            const avatar = elements.profilePhoto.querySelector('.default-avatar');
            if (avatar) {
                elements.profilePhoto.replaceChild(img, avatar);
            }
        }
        
        elements.facultyName.textContent = `${data.name}, ${data.degree}`;
        elements.facultyTitle.textContent = `${data.title}, ${data.department}`;
        elements.facultyAffiliation.textContent = `${data.university}, ${data.location}`;
        elements.facultyTagline.textContent = data.tagline;
    }
    
    /**
     * Render: Contact Section
     * Figma: Component/Profile/ContactCard
     */
    function renderContact(data) {
        // Contact information
        const contactItems = [
            { label: 'Email', value: `<a href="mailto:${data.contact.email}">${data.contact.email}</a>` },
            { label: 'Office', value: data.contact.office },
            { label: 'Phone', value: data.contact.phone }
        ];
        
        contactItems.forEach(item => {
            const contactItem = createElement('div', 'contact-item');
            contactItem.innerHTML = `<strong>${item.label}:</strong><span>${item.value}</span>`;
            elements.contactInfo.appendChild(contactItem);
        });
        
        // Social links
        const socialLinksData = [
            { icon: '🎓', label: 'Google Scholar', url: data.links.scholar },
            { icon: '🆔', label: 'ORCID', url: data.links.orcid },
            { icon: '💼', label: 'LinkedIn', url: data.links.linkedin },
            { icon: '🌐', label: 'Website', url: data.links.website }
        ];
        
        socialLinksData.forEach(link => {
            const a = createElement('a', 'social-link');
            a.href = link.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = `${link.icon} ${link.label}`;
            elements.socialLinks.appendChild(a);
        });
    }
    
    /**
     * Render: About Section
     * Figma: Component/Profile/AboutSection
     */
    function renderAbout(data) {
        data.about.forEach(paragraph => {
            const p = createElement('p', '', paragraph);
            elements.aboutContent.appendChild(p);
        });
    }
    
    /**
     * Render: Teaching Section
     * Figma: Component/Profile/TeachingTable
     */
    function renderTeaching(data) {
        data.teaching.forEach(course => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${course.code}</td>
                <td>${course.title}</td>
                <td>${course.level}</td>
                <td>${course.semester}</td>
            `;
            elements.teachingList.appendChild(tr);
        });
    }
    
    /**
     * Render: Research & Publications Section
     * Figma: Component/Profile/ResearchSection
     */
    function renderResearch(data) {
        elements.researchSummary.textContent = data.research.summary;
        
        data.research.publications.forEach(pub => {
            const pubItem = createElement('div', 'publication-item');
            
            const title = pub.url 
                ? `<a href="${pub.url}" target="_blank" rel="noopener noreferrer">"${pub.title}."</a>`
                : `"${pub.title}."`;
            
            pubItem.innerHTML = `
                <div class="pub-authors">${pub.authors}</div>
                <div class="pub-title">${title}</div>
                <div class="pub-venue">${pub.venue}, ${pub.year}.</div>
            `;
            elements.publicationsList.appendChild(pubItem);
        });
    }
    
    /**
     * Render: Students Section
     * Figma: Component/Profile/StudentsSection
     */
    function renderStudents(data) {
        data.students.forEach(student => {
            const studentItem = createElement('div', 'student-item');
            studentItem.innerHTML = `
                <div class="student-name">${student.name}</div>
                <div class="student-program">${student.program} (${student.year})</div>
                <div class="student-thesis">Topic: "${student.topic}"</div>
            `;
            elements.studentsList.appendChild(studentItem);
        });
    }
    
    /**
     * Render: Projects Section
     * Figma: Component/Profile/ProjectsSection
     */
    function renderProjects(data) {
        data.ongoingProjects.forEach(project => {
            const projectItem = createElement('div', 'project-item');
            
            let metaHTML = '<div class="project-meta">';
            
            if (project.fundingAgency) {
                metaHTML += `
                    <div class="project-meta-item">
                        <strong>Funding:</strong>
                        <span>${project.fundingAgency}</span>
                    </div>
                `;
            }
            
            if (project.amount) {
                metaHTML += `
                    <div class="project-meta-item">
                        <strong>Amount:</strong>
                        <span class="project-amount">${project.amount}</span>
                    </div>
                `;
            }
            
            if (project.duration) {
                metaHTML += `
                    <div class="project-meta-item">
                        <strong>Duration:</strong>
                        <span>${project.duration}</span>
                    </div>
                `;
            }
            
            metaHTML += '</div>';
            
            projectItem.innerHTML = `
                <div class="project-title">${project.title}</div>
                ${metaHTML}
                <div class="project-description">${project.description}</div>
            `;
            elements.projectsList.appendChild(projectItem);
        });
    }
    
    /**
     * Render: Service & Awards Section
     * Figma: Component/Profile/ServiceSection
     */
    function renderService(data) {
        data.service.academic.forEach(service => {
            const li = createElement('li', '', service);
            elements.serviceList.appendChild(li);
        });
        
        data.service.awards.forEach(award => {
            const li = createElement('li', '', award);
            elements.awardsList.appendChild(li);
        });
    }
    
    /**
     * Render: Footer
     * Figma: Component/Profile/Footer
     */
    function renderFooter(data) {
        elements.footerDepartment.textContent = data.department;
        elements.footerLocation.textContent = `${data.university}, ${data.location}`;
        elements.footerUpdated.textContent = `Last updated: ${data.lastUpdated}`;
    }
    
    /**
     * Render all sections
     */
    function renderAll(data) {
        renderHeader(data);
        renderContact(data);
        renderAbout(data);
        renderTeaching(data);
        renderResearch(data);
        renderStudents(data);
        renderProjects(data);
        renderService(data);
        renderFooter(data);
    }
    
    // Public API
    return {
        renderAll,
        renderHeader,
        renderContact,
        renderAbout,
        renderTeaching,
        renderResearch,
        renderStudents,
        renderProjects,
        renderService,
        renderFooter
    };
})();

// Make Renderers globally available
window.Renderers = Renderers;
