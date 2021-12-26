class Portifolio{
  constructor(){
    this.bio = document.querySelector("#bio");
    this.pic = document.querySelector("#pic");
    this.about = document.querySelector("#about-content");
  };

  async setPic() {
    try{
      let response = await fetch("https://api.github.com/users/vitorhugo1207");
      let responseJson = await response.json();
      this.pic.src = responseJson.avatar_url;
    }
    catch{
      this.pic.src = "error_img.jpg"
      this.pic.style = "border-radius: 0%;"
    }
  };

  async setBio(){
    try{
      let response = await fetch("contents/bio_home.txt");
      let responseText = await response.text();
      this.bio.innerHTML = responseText;
    }
    catch{
      this.bio.innerHTML = "Error! Tente ativar o JavaScript do seu navedador.";
    }
  };

  async setAbout(){
    try{
      let response = await fetch("../contents/about_me.txt");
      let responseText = await response.text();
      this.about.innerHTML = responseText;
    }
    catch{
      this.about.innerHTML = "Error! Tente ativar o JavaScript do seu navedador.";
    }
  }
}
