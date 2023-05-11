class Portifolio {
  constructor() {
    this.bio = document.querySelector("#bio");
    this.pic = document.querySelector("#pic");
    this.about = document.querySelector("#about-content");
    this.projects = document.querySelector(".projects");
    this.jobs = document.querySelector(".jobs");
    this.modalBox = document.querySelectorAll(".modal-box");
    this.modalBoxContents = document.querySelector(".modal-box-contents");
    this.modalBoxClose = document.querySelectorAll(".modal-box-close");
  };

  async init() {
    // alert("Esse site ainda está sendo construido, então pode ter alguns bugs ou informações incompletas.")
    this.setBio();
    this.setPic();
    this.setProjects();
    this.setJobs();
    this.setContacts();
  };

  setBlockScroll(){
    document.getElementsByTagName("body")[0].style = `
    overflow-x: hidden;
    margin: 0;
    height: 100%;
    overflow: hidden;`
  }

  unsetBlockScroll(){
    document.getElementsByTagName("body")[0].style = `
    overflow-x: visible;
    margin: auto;
    height: auto;
    overflow: visible;`
  }

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
        this.setModalBox("projects", 0);

        // Set data to modalboxes
        let projectsLength = document.querySelectorAll(".projects")[0].children.length;
        let modalBox = this.modalBox[0];

        for(let i = 0; i <= projectsLength - 1; i++){
          let projectsAll = document.querySelectorAll(".projects")[0].children[i];

          projectsAll.onclick = () => {
            this.setBlockScroll();
            modalBox.style.display = "block";

            for(let project in projects){
              if(projects[project].name == projectsAll.children[0].innerHTML){
                document.querySelector(".tittle-project-modalBox").innerHTML = projects[project].name;
                document.querySelector(".about-project-modalBox").innerHTML = projects[project].about;
                document.querySelector(".learned-modalBox").innerHTML = projects[project].lerned;
                document.querySelector(".languages-modalBox").innerHTML = projects[project].language;

                // for doesn't repeat links
                var links = document.querySelectorAll(".link");
                links.forEach(link => {
                  link.remove();
                })

                for(let link in projects[project].links){
                  var a = document.createElement("a");
                  var img = document.createElement("img");
                  a.className = "link";
                  img.className = "link";
                  a.setAttribute('href', projects[project].links[link].link);
                  img.setAttribute('src', `linkimg/${projects[project].links[link].linkname}.png`);
                  img.style.height = "7vh";
                  img.style.width = "7vh";
                  a.target = "_blank";
                  a.appendChild(img);
                  document.querySelector(".links").appendChild(a);
                  // var br = document.createElement("br");
                  // br.className = "link"
                  // document.querySelector(".links").appendChild(br);

                };
              };
            };
          };
        };
      }))
    // return new Promise((resolve, reject)=>{
    //   setTimeout(()=>{
    //     this.setModalBox()
    //   }, Math.random() * 2000)
    // })
  };

  async setModalBox(id, idModal){
    let projectsLength = document.querySelectorAll(`.${id}`)[0].children.length;
    let modalBox = this.modalBox[idModal];

    // Close Modal Box, when click at "X"
    this.modalBoxClose[idModal].onclick = () =>{
      modalBox.style.display = "None";
      this.unsetBlockScroll(); // to call this in a anonymous function use arrow function
    };

    // Close Modal Box, when press esc key
    document.addEventListener("keydown", (event) => {
      if(event.key == "Escape"){
        modalBox.style.display = "None";
        this.unsetBlockScroll();
      }
    });

    // Close Modal Box, when click out of Modal Box
    document.addEventListener("click", (event) => {
      if(event.target == modalBox){
        modalBox.style.display = "None";
        this.unsetBlockScroll();
      };
    })
  };

  async setJobs(){
    let response_promise = fetch("contents/jobs.json")

    response_promise.then(response => response.json().then(jobs => {
      for(let job in jobs){
        // Div job
        var div = document.createElement("div");
        div.className = "job";
        div.id = `job-${jobs[job].name}`
        document.querySelector(".jobs").appendChild(div);

        // Tittle job
        var h1 = document.createElement("h1");
        h1.className = "tittle-job";
        h1.id = jobs[job].name;
        let tittle = jobs[job].name;
        h1.innerHTML = tittle.replace(/-/g, " ");
        document.querySelector(`#job-${jobs[job].name}`).appendChild(h1);

        // Paragraph job
        var p = document.createElement("p");
        p.className = "about-job";
        p.innerHTML = jobs[job].about;
        document.querySelector(`#job-${jobs[job].name}`).appendChild(p);
      }
      this.setModalBox("jobs", 1);

      // Set data to modalboxes
      let jobsLength = document.querySelectorAll(".jobs")[0].children.length;
      let modalBox = this.modalBox[1];

      for(let i = 0; i <= jobsLength - 1; i++){
        let jobsAll = document.querySelectorAll(".jobs")[0].children[i];

        jobsAll.onclick = () => {
            this.setBlockScroll();
            modalBox.style.display = "block";

            for(let job in jobs){
              if(jobs[job].name == jobsAll.children[0].id){
                document.querySelector(".tittle-job-modalBox").innerHTML = (jobs[job].name).replace(/-/g, " ");
                document.querySelector(".about-job-modalBox").innerHTML = jobs[job].about;
                document.querySelector(".function-modalBox").innerHTML = jobs[job].function;
                document.querySelector(".learned-job-modalBox").innerHTML = jobs[job].learned;
                document.querySelector(".time-modalBox").innerHTML = jobs[job].time;
              };
            };
          }
      }
    }))
  };

  async setContacts(){
    document.addEventListener("click", function(event){
      if(event.target.id == "whatsappButton"){
        navigator.clipboard.writeText("14997723162");

        alert("Copiado")
      }
    })
  }
}

const portifolio = new Portifolio();
portifolio.init()
