class Portifolio {
  constructor() {
    this.bio = document.querySelector("#bio");
    this.pic = document.querySelector("#pic");
    this.about = document.querySelector("#about-content");
    this.projects = document.querySelector(".projects");
    this.modalBox = document.querySelector(".modal-box");
    this.modalBoxContents = document.querySelector(".modal-box-contents");
    this.modalBoxClose = document.querySelector(".modal-box-close")
  };

  async init() {
    let title = document.title;

    if (title == "Projetos - Vitor Hugo's Portifolio" || title == "Projects - Vitor Hugo's Portfolio") {
      this.setProjects();
      // this.setModalBox();
    };
    if (title == "Home - Vitor Hugo's Portifolio" || title == "Home - Vitor Hugo's Portfolio") {
      this.setBio();
      this.setPic();
      alert("Esse site ainda está sendo construido, então pode ter alguns bugs ou informações incompletas.")
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
        this.setModalBox();

        // setting dynamic information for opened modal boxes
        // let projectsAll = document.querySelectorAll(".projects")[0].onclick = function(){
        //   console.log(projectsAll)
        // }

        // Set data to modalboxes
        let projectsLength = document.querySelectorAll(".projects")[0].children.length;
        let modalBox = this.modalBox;

        for(let i = 0; i <= projectsLength - 1; i++){
          let projectsAll = document.querySelectorAll(".projects")[0].children[i];

          projectsAll.onclick = function(){
            modalBox.style.display = "block"

            for(let project in projects){
              if(projects[project].name == projectsAll.children[0].innerHTML){
                document.querySelectorAll(".modal-box").innerHTML = projects[project].name;

              }
            }
          };
        };

      }))
    // return new Promise((resolve, reject)=>{
    //   setTimeout(()=>{
    //     this.setModalBox()
    //   }, Math.random() * 2000)
    // })
  };

  async setModalBox(){
    let projectsLength = document.querySelectorAll(".projects")[0].children.length;
    let modalBox = this.modalBox;

    for(let i = 0; i <= projectsLength - 1; i++){
      let projectsAll = document.querySelectorAll(".projects")[0].children[i];

      // Open Modal Box
      projectsAll.onclick = function(){
        modalBox.style.display = "block"
        // console.log(projectsAll)
      };
    };
    // Close Modal Box, when click at "X"
    this.modalBoxClose.onclick = function(){
      modalBox.style.display = "None"
    };

    // Close Modal Box, when click out of Modal Box
    window.onclick = function(){
      if(event.target == modalBox){
        modalBox.style.display = "None"
      }
    }

    // Close Modal Box, when press esc key
    document.addEventListener("keydown", function(event){
      if(event.key == "Escape"){
        modalBox.style.display = "None"
      }
    })
  }
}

const portifolio = new Portifolio();
portifolio.init()
