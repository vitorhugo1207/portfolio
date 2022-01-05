class Portifolio{
  constructor(){
    this.bio = document.querySelector("#bio");
    this.pic = document.querySelector("#pic");
    this.about = document.querySelector("#about-content");
  };

  async init(){
    let title = document.title;

    if (title == "Projetos - Vitor Hugo's Portifolio" || title == "Projects - Vitor Hugo's Portfolio"){
      this.setProjects()
    };
    if (title == "Home - Vitor Hugo's Portifolio" || title == "Home - Vitor Hugo's Portfolio"){
      alert("Esse site ainda está sendo construido, então pode ter alguns bugs ou informações incompletas.");
      this.setBio();
      this.setPic()
    };
    if (title == "Sobre - Vitor Hugo's Portifolio" || title == "About - Vitor Hugo's Portfolio"){
      this.setAbout()
    };
  };

  async setPic() {
    try{
      let response = await fetch("https://api.github.com/users/vitorhugo1207");
      let responseJson = await response.json();
      this.pic.src = responseJson.avatar_url;
    }
    catch{
      this.pic.src = "error_img.jpg";
      this.pic.style = "border-radius: 0%;";
    }
  };

  async setBio(){
    try{
      let response = await fetch("contents/bio_home.txt");
      let responseText = await response.text();
      this.bio.innerHTML = responseText;
    }
    catch{
      this.bio.innerHTML = "Error! Tente ativar o JavaScript do seu navedador."
    }
  };

  async setAbout(){
    try{
      let response = await fetch("contents/about_me.txt");
      let responseText = await response.text();
      this.about.innerHTML = responseText;
    }
    catch{
      this.about.innerHTML = "Error! Tente ativar o JavaScript do seu navedador.";
    }
  };

  setProjects() {
    document.addEventListener("DOMContentLoaded", function() {
      response_promise.then(response => response.json().then(responseJson => {
        var p = document.createElement('p');

        p.innerHTML = responseJson.one.bio;
        p.id = "bio-project";
        // p.style.cssText = 'border-left: 8px solid aqua;';

        document.querySelector(".projeto-contents").appendChild(p);
      }))
    }, false)
  }
}

const portifolio = new Portifolio();
portifolio.init();
