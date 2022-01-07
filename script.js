class Portifolio {
  constructor() {
    this.bio = document.querySelector("#bio");
    this.pic = document.querySelector("#pic");
    this.about = document.querySelector("#about-content");
  };

  async init() {
    let title = document.title;

    if (title == "Projetos - Vitor Hugo's Portifolio" || title == "Projects - Vitor Hugo's Portfolio") {
      this.setProjects()
    };
    if (title == "Home - Vitor Hugo's Portifolio" || title == "Home - Vitor Hugo's Portfolio") {
      this.setBio();
      this.setPic()
      alert("Esse site ainda está sendo construido, então pode ter alguns bugs ou informações incompletas.");
    };
    if (title == "Sobre - Vitor Hugo's Portifolio" || title == "About - Vitor Hugo's Portfolio") {
      this.setAbout()
    };
  };

  async setPic() {
    try {
      let response = await fetch("https://api.github.com/users/vitorhugo1207");
      let responseJson = await response.json();
      this.pic.src = responseJson.avatar_url;
    }
    catch {
      this.pic.src = "error_img.jpg";
      this.pic.style = "border-radius: 0%;";
    }
  };

  async setBio() {
    try {
      let response = await fetch("contents/bio_home.txt");
      let responseText = await response.text();
      this.bio.innerHTML = responseText;
    }
    catch {
      this.bio.innerHTML = "Error! Tente ativar o JavaScript do seu navedador."
    }
  };

  async setAbout() {
    try {
      let response = await fetch("contents/about_me.txt");
      let responseText = await response.text();
      this.about.innerHTML = responseText;
    }
    catch {
      this.about.innerHTML = "Error! Tente ativar o JavaScript do seu navedador.";
    }
  };

  async setProjects() {
    let response_promise = fetch("contents/projects.json")

    document.addEventListener("DOMContentLoaded", function() {
      response_promise.then(response => response.json().then(projects => {
        // ? Gradient in border for each color language

        for(let project in projects){
          // Div project
          var div = document.createElement("div");
          div.className = "project";
          div.id = `project-${projects[project].name}`
          document.querySelector(".projects").appendChild(div);

          // Tittle project
          var h1 = document.createElement("h1");
          h1.className = "tittle-project";
          h1.innerHTML = projects[project].name;
          document.querySelector(`#project-${projects[project].name}`).appendChild(h1);

          // Paragraph project
          var p = document.createElement("p");
          p.className = "about-project";
          p.innerHTML = projects[project].about;
          document.querySelector(`#project-${projects[project].name}`).appendChild(p);
        }
      }))
    }, false)
  }
}

const portifolio = new Portifolio();
portifolio.init();
