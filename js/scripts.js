
document.addEventListener("DOMContentLoaded", function () {
    fetch('./data/aboutMeData.json')
      .then(response => response.json())
      .then(data => {
        const aboutMeContainer = document.getElementById('aboutMe');
  
        const bio = data.aboutMe || 'No bio available';
        const headshot = data.headshot ? `./images/${data.headshot}` : './images/default_image.jpg';
  
       
        const fragment = document.createDocumentFragment();
  
        
        const bioElement = document.createElement('p');
        bioElement.textContent = bio;
  
       
        const headshotContainer = document.createElement('div');
        headshotContainer.classList.add('headshotContainer');
        const imgElement = document.createElement('img');
        imgElement.src = headshot;
        imgElement.alt = 'Headshot Image';
        headshotContainer.appendChild(imgElement);
  
       
        fragment.appendChild(headshotContainer);
        fragment.appendChild(bioElement);
  
        aboutMeContainer.appendChild(fragment);
      })
      .catch(error => {
        console.error('Error loading About Me data:', error);
      });
  });
  


  document.addEventListener("DOMContentLoaded", function () {
    fetch('./data/projectsData.json')
      .then(response => response.json())
      .then(projectsData => {
        const projectList = document.getElementById("projectList");
        const spotlight = document.getElementById("projectSpotlight");
        const spotlightTitles = document.getElementById("spotlightTitles");
  
       
        function getImageUrl(imageName, defaultImage) {
          return `./images/${imageName || defaultImage}`;
        }
  
        projectsData.forEach((project, index) => {
          const projectCard = document.createElement("div");
          projectCard.classList.add("projectCard");
          projectCard.id = project.project_id;
  
          const cardImage = getImageUrl(project.card_image, 'default_card.webp');
          projectCard.style.backgroundImage = `url(${cardImage})`;
          projectCard.style.backgroundSize = "cover";
          projectCard.style.backgroundPosition = "center";
  
          const projectTitle = document.createElement("h4");
          projectTitle.textContent = project.project_name || "Project Name";
  
          const shortDesc = document.createElement("p");
          shortDesc.textContent = project.short_description || 'No short description available';
  
          projectCard.appendChild(projectTitle);
          projectCard.appendChild(shortDesc);
          projectList.appendChild(projectCard);
  
          projectCard.addEventListener("click", () => {
            const spotlightImage = getImageUrl(project.spotlight_image, 'default_spotlight.webp');
            spotlight.style.backgroundImage = `url(${spotlightImage})`;
  
            spotlightTitles.innerHTML = `
              <h3>${project.project_name}</h3>
              ${project.long_description ? `<p>${project.long_description}</p>` : '<p>No description available.</p>'}
              ${project.url ? `<a href="${project.url}" target="_blank">See Project</a>` : ''}
            `;
          });
  
          
          if (index === 0) {
            const spotlightImage = getImageUrl(project.spotlight_image, 'default_spotlight.webp');
            spotlight.style.backgroundImage = `url(${spotlightImage})`;
  
            spotlightTitles.innerHTML = `
              <h3>${project.project_name}</h3>
              <p>${project.long_description || 'No description available.'}</p>
              ${project.url ? `<a href="${project.url}" target="_blank">See Project</a>` : ''}
            `;
          }
        });
  
        const leftArrow = document.querySelector('.arrow-left');
        const rightArrow = document.querySelector('.arrow-right');
  
        function isDesktopView() {
          return window.innerWidth >= 1024;
        }
  
        
        let scrollInterval;
        leftArrow.addEventListener('mousedown', () => {
          scrollInterval = setInterval(() => {
            if (isDesktopView()) {
              projectList.scrollBy({ top: -200, behavior: 'smooth' });
            } else {
              projectList.scrollBy({ left: -200, behavior: 'smooth' });
            }
          }, 50); 
        });
  
        rightArrow.addEventListener('mousedown', () => {
          scrollInterval = setInterval(() => {
            if (isDesktopView()) {
              projectList.scrollBy({ top: 200, behavior: 'smooth' });
            } else {
              projectList.scrollBy({ left: 200, behavior: 'smooth' });
            }
          }, 50); 
        });
  
        document.addEventListener('mouseup', () => {
          clearInterval(scrollInterval);
        });
  
       
        leftArrow.addEventListener('click', () => {
          if (isDesktopView()) {
            projectList.scrollBy({ top: -200, behavior: 'smooth' });
          } else {
            projectList.scrollBy({ left: -200, behavior: 'smooth' });
          }
        });
  
        rightArrow.addEventListener('click', () => {
          if (isDesktopView()) {
            projectList.scrollBy({ top: 200, behavior: 'smooth' });
          } else {
            projectList.scrollBy({ left: 200, behavior: 'smooth' });
          }
        });
  
      });
  });
  

  document.addEventListener("DOMContentLoaded", function () { 
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const charactersLeft = document.getElementById('charactersLeft');
    const form = document.getElementById('formSection');
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidCharsRegex = /[^a-zA-Z0-9@._-]/; 
  

    messageInput.addEventListener('input', function () {
      const currentLength = messageInput.value.length;
      charactersLeft.textContent = `Characters: ${Math.max(0, currentLength)}/300`; 
  
      if (invalidCharsRegex.test(messageInput.value)) {
        messageError.textContent = "Message contains invalid characters (only letters, numbers, @ . _ - allowed).";
      } else if (currentLength > 300) {
        messageError.textContent = "Message must be less than or equal to 300 characters.";
      } else {
        messageError.textContent = "";
      }
    });
  
    
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      let valid = true;
      emailError.textContent = "";
      messageError.textContent = "";
  
      const emailVal = emailInput.value.trim();
      const messageVal = messageInput.value.trim();
  
      
      if (emailVal === "") {
        emailError.textContent = "Email field cannot be empty.";
        valid = false;
      } else if (!emailRegex.test(emailVal)) {
        emailError.textContent = "Please enter a valid email address (example@example.com).";
        valid = false;
      } else if (invalidCharsRegex.test(emailVal)) {
        emailError.textContent = "Email contains invalid characters.";
        valid = false;
      }
  
     
      if (messageVal === "") {
        messageError.textContent = "Message field cannot be empty.";
        valid = false;
      } else if (invalidCharsRegex.test(messageVal)) {
        messageError.textContent = "Message contains invalid characters (only letters, numbers, @ . _ - allowed).";
        valid = false;
      } else if (messageVal.length > 300) {
        messageError.textContent = "Message must be less than or equal to 300 characters.";
        valid = false;
      }
  
      if (valid) {
        alert("Form submitted successfully!"); 
        form.reset();
        charactersLeft.textContent = "Characters: 0/300"; 
      }
    });
  });
  